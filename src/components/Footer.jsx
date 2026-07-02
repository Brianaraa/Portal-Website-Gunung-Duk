import { useSiteData } from '../context/SiteDataContext';

const footerNav = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Demografi', href: '#demografi' },
  { label: 'UMKM', href: '#umkm' },
  { label: 'Peta', href: '#peta' },
];

export default function Footer() {
  const { padukuhan, contact, leadership } = useSiteData();
  const year = new Date().getFullYear();

  return (
    <footer id="kontak" className="bg-leaf-950 text-white">
      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* ── Column 1 : About ── */}
          <div>
            <p className="text-lg font-semibold mb-4">
              Padukuhan {padukuhan.name}
            </p>
            <p className="text-leaf-200/60 text-sm leading-relaxed">
              Portal informasi resmi Padukuhan {padukuhan.name}, Desa{' '}
              {padukuhan.desa}, Kecamatan {padukuhan.kecamatan}, Kabupaten{' '}
              {padukuhan.kabupaten}, {padukuhan.provinsi}.
            </p>
          </div>

          {/* ── Column 2 : Navigation + Perangkat ── */}
          <div>
            <h3 className="text-xs font-semibold text-leaf-400 uppercase tracking-widest mb-5">
              Navigasi
            </h3>
            <ul className="space-y-3 mb-10">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-leaf-200/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {leadership.length > 0 && (
              <>
                <h3 className="text-xs font-semibold text-leaf-400 uppercase tracking-widest mb-5">
                  Perangkat Desa
                </h3>
                <ul className="space-y-3">
                  {leadership.map((leader, idx) => (
                    <li key={idx} className="text-sm text-leaf-200/60">
                      <span className="text-white/90 font-medium">
                        {leader.position}
                      </span>
                      <br />
                      {leader.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* ── Column 3 : Contact ── */}
          <div>
            <h3 className="text-xs font-semibold text-leaf-400 uppercase tracking-widest mb-5">
              Kontak
            </h3>
            <ul className="space-y-5">
              {/* Address */}
              <li className="flex items-start gap-3 text-sm text-leaf-200/60">
                <svg
                  className="w-5 h-5 text-leaf-500 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>{contact.address}</span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3 text-sm text-leaf-200/60">
                <svg
                  className="w-5 h-5 text-leaf-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <span>{contact.phone}</span>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3 text-sm text-leaf-200/60">
                <svg
                  className="w-5 h-5 text-leaf-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-leaf-200/40">
            &copy; {year} Padukuhan {padukuhan.name}, Desa {padukuhan.desa}
          </p>
        </div>
      </div>
    </footer>
  );
}
