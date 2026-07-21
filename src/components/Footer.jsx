import { useSiteData } from '../context/SiteDataContext';

export default function Footer() {
  const { padukuhan, contact, leadership } = useSiteData();

  return (
    <footer id="alamat" className="bg-twilight-950 text-white py-20 border-t-8 border-sunset-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-white">
            Padukuhan {padukuhan.name}
          </h2>
          <p className="text-twilight-200 text-sm leading-relaxed mb-8">
            Pusat informasi dan layanan terpadu bagi warga dan pengunjung {padukuhan.name}, {padukuhan.desa}.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-twilight-200">
            <a href="#beranda" className="hover:text-sunset-400 transition-colors">Beranda</a>
            <a href="#tentang" className="hover:text-sunset-400 transition-colors">Profil</a>
            <a href="#fasilitas" className="hover:text-sunset-400 transition-colors">Fasilitas</a>
            <a href="#umkm" className="hover:text-sunset-400 transition-colors">UMKM</a>
            <a href="#peta" className="hover:text-sunset-400 transition-colors">Peta</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-twilight-800">
          <div className="flex flex-col md:items-end text-center md:text-right">
            <h3 className="text-xs font-bold text-sunset-400 uppercase tracking-widest mb-4">Kontak & Alamat</h3>
            <p className="text-sm text-twilight-200 leading-relaxed max-w-xs">
              {contact.address}
            </p>
          </div>
          <div className="flex flex-col md:items-start text-center md:text-left">
            <h3 className="text-xs font-bold text-sunset-400 uppercase tracking-widest mb-4">Kepengurusan</h3>
            <ul className="space-y-3">
              {leadership.map((person, idx) => (
                <li key={idx} className="flex flex-col text-sm">
                  <span className="font-bold text-white">{person.name}</span>
                  <span className="text-twilight-300">{person.position}</span>
                  {person.phone && (
                    <span className="text-twilight-400 mt-1">{person.phone}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xs text-twilight-500 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Padukuhan {padukuhan.name}. KKN UPN "Veteran" Yogyakarta.
          </p>
        </div>
      </div>
    </footer>
  );
}
