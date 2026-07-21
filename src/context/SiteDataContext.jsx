import { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../data/siteData';
import { API_CONFIG } from '../data/apiConfig';

const SiteDataContext = createContext(null);

/* ═══════════════════════════════════════════════════════════
   Google Sheets Response Parser
   ═══════════════════════════════════════════════════════════
   Google Sheets gviz/tq mengembalikan format JSONP:
   google.visualization.Query.setResponse({...});

   Parser ini menangani kasus-kasus khusus:
   1. parsedNumHeaders=0 → baris pertama = header, bukan data
   2. Kolom bertipe number (misal WhatsApp) → pakai formatted value
   3. Cell null → default ke empty string
   ═══════════════════════════════════════════════════════════ */
function parseGoogleSheetsResponse(text) {
  // Extract JSON dari wrapper JSONP
  const match = text.match(
    /google\.visualization\.Query\.setResponse\(({.*})\)/s
  );
  if (!match) {
    throw new Error('Format response Google Sheets tidak valid');
  }

  const json = JSON.parse(match[1]);
  const table = json.table;

  // ── Tentukan nama kolom (header) ──
  // Cek apakah Google Sheets mendeteksi header otomatis
  const hasAutoHeaders = table.cols.some((col) => col.label && col.label.trim() !== '');

  let cols;
  let dataRows;

  if (hasAutoHeaders) {
    // Google mendeteksi header → ambil dari cols.label
    cols = table.cols.map((col) => (col.label || '').trim());
    dataRows = table.rows;
  } else {
    // parsedNumHeaders=0 → baris pertama adalah header
    // Ambil nama kolom dari row pertama
    cols = table.rows[0].c.map((cell) =>
      cell ? String(cell.v || '').trim() : ''
    );
    dataRows = table.rows.slice(1); // Skip baris header
  }

  // ── Konversi setiap baris menjadi object { NamaKolom: nilai } ──
  return dataRows
    .filter((row) => row && row.c) // Skip null rows
    .map((row) => {
      const obj = {};
      cols.forEach((colName, i) => {
        if (!colName) return;

        const cell = row.c[i];
        if (!cell || cell.v == null) {
          obj[colName] = '';
          return;
        }

        // Gunakan formatted value (f) jika ada, agar angka seperti
        // nomor WhatsApp (6.285E12) tetap tampil benar ("6285158424337")
        if (cell.f != null) {
          obj[colName] = String(cell.f);
        } else {
          obj[colName] = cell.v;
        }
      });
      return obj;
    })
    .filter((row) => {
      // Filter baris kosong (semua value empty string)
      return Object.values(row).some((v) => v !== '');
    });
}

/* ═══════════════════════════════════════════════════════════
   localStorage Cache — Mengurangi fetch & mempercepat load
   ═══════════════════════════════════════════════════════════ */
const CACHE_PREFIX = 'padukuhan_v2_';
const CACHE_DURATION = 0; // 0 untuk selalu mengambil data terbaru (live)

function getCached(key) {
  if (CACHE_DURATION <= 0) return null;
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_DURATION) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null; // Cache expired
    }
    return data;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, ts: Date.now() })
    );
  } catch {
    // localStorage penuh atau tidak tersedia — abaikan
  }
}

/**
 * Mengubah URL Google Drive sharing menjadi URL gambar langsung.
 *
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://lh3.googleusercontent.com/d/FILE_ID
 *
 * Jika bukan URL Google Drive, dikembalikan apa adanya.
 */
function toDirectImageUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim();

  // Pattern: drive.google.com/file/d/{FILE_ID}/...
  const driveMatch = cleanUrl.match(
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/
  );
  if (driveMatch) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }

  // Pattern: drive.google.com/open?id={FILE_ID}
  const openMatch = cleanUrl.match(
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/
  );
  if (openMatch) {
    return `https://lh3.googleusercontent.com/d/${openMatch[1]}`;
  }

  // Link folder Google Drive tidak bisa dijadikan src <img> langsung
  if (cleanUrl.includes('drive.google.com/drive/folders')) {
    return null;
  }

  return cleanUrl;
}

/* ── Helper fleksibel untuk mengambil nilai dari row ── */
function parseCoordinates(str) {
  if (!str || typeof str !== 'string') return null;
  const parts = str.split(',').map((p) => parseFloat(p.trim()));
  if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return [parts[0], parts[1]];
  }
  return null;
}

function getRowValue(row, ...possibleKeys) {
  if (!row || typeof row !== 'object') return '';
  
  // 1. Cek exact match
  for (const key of possibleKeys) {
    if (row[key] !== undefined && row[key] !== null) {
      return String(row[key]).trim();
    }
  }
  
  // 2. Cek match tanpa memedulikan spasi & huruf besar/kecil
  const normalizedRow = {};
  for (const k of Object.keys(row)) {
    normalizedRow[k.trim().toLowerCase()] = row[k];
  }
  
  for (const key of possibleKeys) {
    const normKey = key.trim().toLowerCase();
    if (normalizedRow[normKey] !== undefined && normalizedRow[normKey] !== null) {
      return String(normalizedRow[normKey]).trim();
    }
  }
  
  return '';
}

/* ── Mapper: row → format UMKM app ── */
function mapUmkmRow(row, index) {
  const rawImage = getRowValue(row, 'Foto', 'foto', 'Gambar', 'gambar');
  const coordStr = getRowValue(row, 'Koordinat', 'koordinat', 'Lat,Lng', 'lat,lng');

  return {
    id: index + 1,
    name: getRowValue(row, 'Nama', 'nama', 'Nama UMKM', 'nama umkm', 'Nama Usaha', 'nama usaha'),
    description: getRowValue(row, 'Deskripsi', 'deskripsi', 'Keterangan', 'keterangan'),
    image: toDirectImageUrl(rawImage),
    qris: getRowValue(row, 'QRIS', 'qris').toLowerCase() === 'ya',
    whatsapp: getRowValue(row, 'WhatsApp', 'whatsapp', 'WA', 'wa', 'No HP', 'no hp', 'Kontak', 'kontak'),
    category: getRowValue(row, 'Kategori', 'kategori') || 'Lainnya',
    gmaps: getRowValue(row, 'Gmaps', 'gmaps', 'Maps', 'maps', 'Peta', 'peta') || null,
    coordinates: parseCoordinates(coordStr),
  };
}

/* ── Mapper: row → format statistik app ── */
function mapStatsRow(row) {
  const val = getRowValue(row, 'Nilai', 'nilai', 'Jumlah', 'jumlah', 'Value', 'value');
  return {
    id: getRowValue(row, 'ID', 'id', 'Label', 'label').toLowerCase(),
    label: getRowValue(row, 'Label', 'label', 'Nama', 'nama'),
    value: parseInt(val || 0, 10),
    description: getRowValue(row, 'Deskripsi', 'deskripsi', 'Keterangan', 'keterangan'),
    icon: getRowValue(row, 'Icon', 'icon').toLowerCase() || 'home',
  };
}

/* ── Mapper: row → format fasilitas app ── */
function mapFasilitasRow(row, index) {
  const rawImage = getRowValue(row, 'Foto', 'foto', 'Gambar', 'gambar');
  const coordStr = getRowValue(row, 'Koordinat', 'koordinat', 'Lat,Lng', 'lat,lng');

  return {
    id: index + 1,
    name: getRowValue(row, 'Nama Fasilitas', 'nama fasilitas', 'Nama', 'nama', 'Fasilitas', 'fasilitas'),
    description: getRowValue(row, 'Deskripsi', 'deskripsi', 'Keterangan', 'keterangan'),
    category: getRowValue(row, 'Kategori', 'kategori') || 'Umum',
    gmaps: getRowValue(row, 'Maps', 'maps', 'Gmaps', 'gmaps', 'Peta', 'peta') || null,
    image: toDirectImageUrl(rawImage),
    coordinates: parseCoordinates(coordStr),
  };
}

/**
 * Fetch data dari Google Sheets langsung.
 * Cek cache dulu → kalau ada & belum expired, pakai cache.
 * Kalau tidak ada / expired → fetch dari Google Sheets → simpan cache.
 */
async function fetchGoogleSheet(url, cacheKey) {
  // 1. Cek cache
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // 2. Fetch dari Google Sheets
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Sheets: HTTP ${res.status}`);

  const text = await res.text();
  const rows = parseGoogleSheetsResponse(text);

  // 3. Simpan ke cache
  setCache(cacheKey, rows);

  return rows;
}

/**
 * SiteDataProvider — React Context yang:
 * 1. Mulai dengan data statis dari siteData.js (instant, tanpa loading)
 * 2. Jika API URL dikonfigurasi di apiConfig.js → fetch & replace data
 * 3. Jika fetch gagal → tetap tampilkan data statis (fallback)
 */
export function SiteDataProvider({ children }) {
  const [data, setData] = useState(siteConfig);
  const [loading, setLoading] = useState(() =>
    Boolean(API_CONFIG.umkm || API_CONFIG.stats || API_CONFIG.fasilitas)
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tidak ada API URL? Langsung pakai data statis.
    if (!API_CONFIG.umkm && !API_CONFIG.stats && !API_CONFIG.fasilitas) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAll() {
      try {
        const updates = {};

        // Fetch UMKM dari Google Sheets
        if (API_CONFIG.umkm) {
          const rows = await fetchGoogleSheet(API_CONFIG.umkm, 'umkm');
          if (Array.isArray(rows) && rows.length > 0) {
            updates.umkm = rows.map(mapUmkmRow);
          }
        }

        // Fetch Statistik dari Google Sheets
        if (API_CONFIG.stats) {
          const rows = await fetchGoogleSheet(API_CONFIG.stats, 'stats');
          if (Array.isArray(rows) && rows.length > 0) {
            updates.stats = rows.map(mapStatsRow);
          }
        }

        // Fetch Fasilitas dari Google Sheets
        if (API_CONFIG.fasilitas) {
          const rows = await fetchGoogleSheet(API_CONFIG.fasilitas, 'fasilitas');
          if (Array.isArray(rows) && rows.length > 0) {
            updates.fasilitas = rows.map(mapFasilitasRow);
          }
        }

        if (!cancelled) {
          setData((prev) => ({ ...prev, ...updates }));
        }
      } catch (err) {
        console.error('⚠️ Gagal memuat data dari Google Sheets:', err);
        if (!cancelled) setError(err.message);
        // Data statis dari siteData.js tetap tampil sebagai fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteDataContext.Provider value={{ ...data, loading, error }}>
      {children}
    </SiteDataContext.Provider>
  );
}

/**
 * Hook untuk mengakses data site dari context.
 * Gunakan di semua komponen yang butuh data:
 *
 *   const { umkm, stats, loading } = useSiteData();
 */
export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData() harus digunakan di dalam <SiteDataProvider>');
  }
  return ctx;
}
