import { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';

export default function Navbar() {
  const { padukuhan } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Tentang', href: '#tentang' },
    { name: 'Fasilitas', href: '#fasilitas' },
    { name: 'UMKM', href: '#umkm' },
    { name: 'Peta', href: '#peta' },
    { name: 'Alamat', href: '#alamat' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className={`px-4 transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}>
        <nav
          className={`mx-auto max-w-5xl rounded-full transition-all duration-300 pointer-events-auto ${
            scrolled
              ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-twilight-900/5 border border-gray-100 py-3 px-6'
              : 'bg-transparent py-4 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <a
              href="#beranda"
              className={`font-bold tracking-tight text-lg transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-gray-800'
              }`}
            >
              Padukuhan {padukuhan.name}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-600 hover:text-sunset-600 hover:bg-sunset-50'
                      : 'text-gray-600 hover:text-sunset-600 hover:bg-white/50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl shadow-twilight-900/10 border border-gray-100 overflow-hidden transition-all duration-300 origin-top pointer-events-auto ${
          isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="py-2 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-3.5 text-gray-700 hover:bg-sunset-50 hover:text-sunset-600 font-medium text-sm transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
