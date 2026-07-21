import { useState, useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import Modal from './Modal';

export default function Fasilitas() {
  const { fasilitas, loading } = useSiteData();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = useMemo(() => {
    if (!fasilitas) return ['Semua'];
    const cats = new Set(fasilitas.map((item) => item.category));
    return ['Semua', ...Array.from(cats)].filter(Boolean);
  }, [fasilitas]);

  const filteredFasilitas = useMemo(() => {
    if (!fasilitas) return [];
    if (activeCategory === 'Semua') return fasilitas;
    return fasilitas.filter((item) => item.category === activeCategory);
  }, [fasilitas, activeCategory]);

  if (loading) {
    return (
      <section id="fasilitas" className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="h-8 w-48 bg-gray-200 animate-pulse mx-auto rounded-md mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!fasilitas || fasilitas.length === 0) return null;

  return (
    <section id="fasilitas" className="py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Fasilitas & Layanan
            </h2>
            <p className="text-gray-600 font-medium">
              Sarana pendukung yang tersedia untuk melayani kebutuhan warga dan pengunjung padukuhan.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-twilight-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-twilight-300 hover:text-twilight-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFasilitas.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-[2rem] border border-gray-100 p-3 hover:border-sunset-200 hover:shadow-xl hover:shadow-sunset-100/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-5 bg-gray-50">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-medium">Tanpa Foto</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-900 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-twilight-950/0 group-hover:bg-twilight-950/20 transition-all duration-300 flex items-center justify-center rounded-[1.5rem]">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-bold bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                    Lihat Detail
                  </span>
                </div>
              </div>

              <div className="px-3 pb-3">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} maxWidth="max-w-xl">
        {selectedItem && (
          <div className="flex flex-col">
            {/* Image */}
            <div className="w-full aspect-video bg-warm-50">
              {selectedItem.image ? (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <svg className="w-16 h-16 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-twilight-600 bg-twilight-50 px-3 py-1 rounded-full mb-4">
                {selectedItem.category}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 pr-8">
                {selectedItem.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {selectedItem.description}
              </p>
              {selectedItem.gmaps && (
                <a
                  href={selectedItem.gmaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-500 hover:bg-sunset-600 text-white text-sm font-bold rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Buka di Google Maps
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
