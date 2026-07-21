import { useSiteData } from '../context/SiteDataContext';

export default function Hero() {
  const { hero, padukuhan } = useSiteData();

  return (
    <section id="beranda" className="relative bg-warm-50 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left: Text Content */}
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center z-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-sunset-500 rounded-full"></span>
            <span className="text-twilight-600 text-xs font-bold uppercase tracking-widest">
              {padukuhan.desa} · {padukuhan.kecamatan}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-6 tracking-tight">
            {hero.title}
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10 font-medium">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#umkm"
              className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-sunset-500 text-white text-sm font-semibold rounded-full hover:bg-sunset-600 hover:shadow-xl hover:shadow-sunset-500/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              {hero.ctaText}
            </a>
            <a
              href="#tentang"
              className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:border-sunset-300 hover:bg-sunset-50 hover:text-sunset-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Profil Dusun
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-sunset-200 to-twilight-100 rounded-[2.5rem] lg:rounded-[3.5rem] transform lg:translate-x-6 lg:translate-y-6 translate-x-3 translate-y-3 -z-10"></div>
          <img
            src="/images/TuguGiling.jpg"
            alt="Pemandangan Padukuhan"
            className="w-full aspect-[4/3] lg:aspect-[4/3] xl:aspect-[16/10] object-cover rounded-[2.5rem] lg:rounded-[3.5rem] shadow-sm border-4 border-white"
          />
        </div>

      </div>
    </section>
  );
}
