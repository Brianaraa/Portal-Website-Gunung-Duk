import { useState, useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import Modal from './Modal';

export default function UMKMDirectory() {
  const { umkm, loading } = useSiteData();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = useMemo(() => {
    if (!umkm) return ['Semua'];
    const cats = new Set(umkm.map((item) => item.category));
    return ['Semua', ...Array.from(cats)].filter(Boolean);
  }, [umkm]);

  const filteredUMKM = useMemo(() => {
    if (!umkm) return [];
    return umkm.filter((item) => {
      const matchCategory = activeCategory === 'Semua' || item.category === activeCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [umkm, activeCategory, searchQuery]);

  if (loading) {
    return (
      <section id="umkm" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="h-8 w-48 bg-gray-100 animate-pulse mx-auto rounded-md mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 bg-gray-50 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!umkm || umkm.length === 0) return null;

  return (
    <section id="umkm" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Direktori UMKM
          </h2>
          <p className="text-gray-600 font-medium">
            Mendukung perekonomian warga dengan membeli produk lokal asli Gunung Duk.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Cari produk atau toko..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-warm-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sunset-200 focus:border-sunset-400 transition-all placeholder:text-gray-400"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-sunset-500 text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-sunset-300 hover:text-sunset-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredUMKM.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUMKM.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group flex flex-col bg-white rounded-3xl border border-gray-100 p-2 hover:border-sunset-200 hover:shadow-xl hover:shadow-sunset-100/40 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full aspect-square rounded-[1.5rem] bg-warm-50 overflow-hidden mb-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                      <svg className="w-10 h-10 mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {item.qris && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md shadow-sm border border-gray-100">
                      <span className="text-[10px] font-black text-twilight-700">QRIS</span>
                    </div>
                  )}
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-twilight-950/0 group-hover:bg-twilight-950/20 transition-all duration-300 flex items-center justify-center rounded-[1.5rem]">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-bold bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                      Lihat Detail
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-3 pb-3 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sunset-500 mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 font-medium">Tidak ada UMKM yang sesuai dengan pencarian Anda.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} maxWidth="max-w-2xl">
        {selectedItem && (
          <div className="flex flex-col md:flex-row">
            {/* Image side */}
            <div className="md:w-64 lg:w-72 flex-shrink-0 bg-warm-50">
              {selectedItem.image ? (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-56 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-56 md:h-full flex items-center justify-center text-gray-200">
                  <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="flex-1 p-8 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-sunset-500 bg-sunset-50 px-3 py-1 rounded-full">
                  {selectedItem.category}
                </span>
                {selectedItem.qris && (
                  <span className="text-[11px] font-bold text-twilight-700 bg-twilight-50 px-3 py-1 rounded-full border border-twilight-100">
                    QRIS ✓
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 pr-8">
                {selectedItem.name}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                {selectedItem.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {selectedItem.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedItem.whatsapp}?text=Halo,%20saya%20melihat%20produk%20${encodeURIComponent(selectedItem.name)}%20di%20website%20Padukuhan%20Gunung%20Duk.%20Apakah%20bisa%20pesan?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Pesan via WhatsApp
                  </a>
                )}
                {selectedItem.gmaps && (
                  <a
                    href={selectedItem.gmaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 hover:border-sunset-300 hover:text-sunset-600 hover:bg-sunset-50 text-sm font-bold rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Lihat di Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
