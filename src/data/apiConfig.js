/**
 * ═══════════════════════════════════════════════════════════════
 *  KONFIGURASI API — Google Sheets via SheetDB
 * ═══════════════════════════════════════════════════════════════
 *
 *  CARA SETUP (Cukup Pakai 1 Link Spreadsheet):
 *
 *  Spreadsheet Anda memiliki 2 tab (sheet): "UMKM" dan "Statistik".
 *  Hubungkan link spreadsheet Anda ke SheetDB.io untuk mendapatkan 1 API URL.
 *  Misalnya API URL Anda dari SheetDB adalah:
 *  https://sheetdb.io/api/v1/abc123xyz
 *
 *  Cara memisahkan datanya di bawah cukup tambahkan parameter:
 *  - Tab UMKM      -> tambahkan "?sheet=UMKM" di ujung URL
 *  - Tab Statistik -> tambahkan "?sheet=Statistik" di ujung URL
 *
 *  Contoh pengisian di variabel API_CONFIG di bawah:
 *  umkm: 'https://sheetdb.io/api/v1/abc123xyz?sheet=UMKM',
 *  stats: 'https://sheetdb.io/api/v1/abc123xyz?sheet=Statistik'
 *
 * ═══════════════════════════════════════════════════════════════
 */

export const API_CONFIG = {
  /**
   * URL API SheetDB untuk data UMKM (Tab: UMKM).
   * Ganti null dengan URL Anda + '?sheet=UMKM' jika ingin menggunakan live data.
   */
  umkm: 'https://sheetdb.io/api/v1/l125bb9d7nfqh?sheet=UMKM',

  /**
   * URL API SheetDB untuk data statistik demografi (Tab: Statistik).
   * Ganti null dengan URL Anda + '?sheet=Statistik' jika ingin menggunakan live data.
   */
  stats: 'https://sheetdb.io/api/v1/l125bb9d7nfqh?sheet=Statistik',
};
