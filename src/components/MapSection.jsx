import { useState, lazy, Suspense } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import ImageLightbox from './ImageLightbox';

// Lazy load Leaflet to avoid SSR issues and keep bundle light
const InteractiveMap = lazy(() => import('./InteractiveMap'));

export default function MapSection() {
  const { map, padukuhan, fasilitas = [], umkm = [] } = useSiteData();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Combine coordinates from both Fasilitas and UMKM
  const allMarkers = [
    ...(fasilitas || []).filter((f) => f && f.coordinates),
    ...(umkm || []).filter((u) => u && u.coordinates),
  ];

  return (
    <section id="peta" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Peta Wilayah
          </h2>
          <p className="text-gray-600 font-medium">
            Jelajahi lokasi fasilitas umum dan UMKM di sekitar Padukuhan Gunung Duk. Klik penanda titik untuk membuka petunjuk arah di Google Maps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Peta Wilayah Interaktif (Leaflet) ── */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{map.wilayah.title}</h3>
                <p className="text-gray-500 text-sm">{map.wilayah.description}</p>
              </div>
              {allMarkers.length > 0 && (
                <span className="text-xs font-bold text-sunset-600 bg-sunset-50 border border-sunset-100 px-3 py-1 rounded-full">
                  {allMarkers.length} Titik Lokasi
                </span>
              )}
            </div>

            <Suspense
              fallback={
                <div className="w-full aspect-square rounded-[2rem] bg-warm-50 flex items-center justify-center animate-pulse">
                  <p className="text-sm text-gray-400 font-medium">Memuat peta…</p>
                </div>
              }
            >
              {map.wilayah.embedUrl ? (
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden border border-gray-100">
                  <iframe
                    src={map.wilayah.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <InteractiveMap
                  markers={allMarkers}
                  center={[-7.881, 110.234]}
                  zoom={15}
                  height="480px"
                />
              )}
            </Suspense>

            <p className="text-xs text-gray-400 mt-3 font-medium">
              💡 Klik ikon penanda di peta untuk melihat nama tempat dan membuka rute langsung di Google Maps.
            </p>
          </div>

          {/* ── Peta Administrasi (Zoomable Lightbox) ── */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{map.administrasi.title}</h3>
              <p className="text-gray-500 text-sm">{map.administrasi.description}</p>
            </div>

            {map.administrasi.image ? (
              <>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="group relative w-full aspect-square rounded-[2rem] overflow-hidden border border-gray-100 hover:border-sunset-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sunset-400 focus:ring-offset-2"
                  title="Klik untuk memperbesar peta"
                >
                  <img
                    src={map.administrasi.image}
                    alt={map.administrasi.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-twilight-950/0 group-hover:bg-twilight-950/30 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-bold bg-twilight-900/70 backdrop-blur px-4 py-1.5 rounded-full">
                        Klik untuk Zoom
                      </span>
                    </div>
                  </div>
                </button>

                <p className="text-xs text-gray-400 mt-3 font-medium">
                  💡 Klik gambar untuk membuka tampilan penuh dengan zoom interaktif.
                </p>

                <ImageLightbox
                  isOpen={lightboxOpen}
                  onClose={() => setLightboxOpen(false)}
                  src={map.administrasi.image}
                  alt={map.administrasi.title}
                />
              </>
            ) : (
              <div className="w-full aspect-square rounded-[2rem] bg-warm-50 flex flex-col items-center justify-center text-center px-6">
                <svg className="w-10 h-10 text-twilight-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400 font-medium">Peta administrasi belum tersedia</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
