import { useSiteData } from '../context/SiteDataContext';

export default function About() {
  const { about } = useSiteData();

  return (
    <section id="tentang" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-sunset-50 text-sunset-600 text-xs font-bold uppercase tracking-widest mb-4">
          Profil Dusun
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {about.title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
          {about.subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-warm-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-sunset-500 text-white flex items-center justify-center shadow-lg shadow-sunset-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Sejarah & Identitas</h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {about.sejarah}
          </p>
        </div>
      </div>
    </section>
  );
}
