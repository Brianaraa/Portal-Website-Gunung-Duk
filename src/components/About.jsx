import { useSiteData } from '../context/SiteDataContext';

export default function About() {
  const { about } = useSiteData();

  return (
    <section id="tentang" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        {/* Logos */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
          <img
            src="/images/LogoKulonProgo.jpg"
            alt="Logo Kabupaten Kulon Progo"
            className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm"
          />
          {/* <img
            src="/images/LogoUPNYogyakarta.png"
            alt="Logo UPN Veteran Yogyakarta"
            className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm"
          /> */}
          <img
            src="/images/LOGOKKNGILING.PNG"
            alt="Logo KKN"
            className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm"
          />
        </div>

        <span className="inline-block py-1 px-3 rounded-full bg-sunset-50 text-sunset-600 text-xs font-bold uppercase tracking-widest mb-4">
          Profil Dusun & Kalurahan
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {about.title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
          {about.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        {/* Sejarah & Identitas */}
        <div className="bg-warm-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sunset-500 text-white flex items-center justify-center shadow-lg shadow-sunset-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Sejarah & Identitas</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-base">
              {about.sejarah}
            </p>
          </div>
        </div>

        {/* Visi & Misi Tuksono */}
        <div className="bg-warm-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-twilight-600 text-white flex items-center justify-center shadow-lg shadow-twilight-600/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Visi & Misi</h3>
                <span className="text-xs text-twilight-600 font-semibold uppercase tracking-wider">Kalurahan Tuksono</span>
              </div>
            </div>
            {about.visi && (
              <p className="text-gray-800 font-semibold text-base mb-4 leading-relaxed">
                "{about.visi}"
              </p>
            )}
            {about.misi && (
              <ul className="space-y-3">
                {about.misi.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-sunset-400 mt-2"></span>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
