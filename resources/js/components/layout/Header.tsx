//rescource/js/components/layout/Header.tsx
import { Menu, X } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SharedProps {
  locale: string;
  supported_locales: string[];
}

const labels: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const { t } = useTranslation();
  const { locale, supported_locales } = usePage<{ props: SharedProps }>().props;

  useEffect(() => {
    const handleScroll = () => {
      // if (window.scrollY > 80) {
      //     setIsScrolled(true);
      // } else {
      //     setIsScrolled(false);
      // }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'shadow-luxury border-b border-slate-200/50 bg-white/95 backdrop-blur-xl'
            : 'border-b border-white/10 bg-white/10 backdrop-blur-sm'
        } ${!isScrolled ? 'lg:top-8' : ''}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3">
                <img src={'/assets/ResteelSolutionsLogo.png'} className="h-14 px-10" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link
                    href="/"
                    className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                      isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                    }`}
                  >
                    {t('Home')}
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webshops"
                    className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                      isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                    }`}
                  >
                    {t('Web Shop')}
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                      isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                    }`}
                  >
                    {t('Career')}
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                      isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                    }`}
                  >
                    {t('Cart')} 🛒
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contactpage"
                    className="group shadow-glow relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
                  >
                    <span className="relative z-10">{t('Contact Us')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </li>
                {/* Language Switcher */}
                <li>
                  <select
                    value={locale}
                    onChange={e =>
                      Inertia.get(
                        route('locale.change', e.target.value),
                        {},
                        { preserveState: true, preserveScroll: true }
                      )
                    }
                    className="border rounded p-2 bg-white text-sm"
                  >
                    {supported_locales.map(loc => (
                      <option key={loc} value={loc}>
                        {labels[loc] || loc}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 lg:hidden ${
                isScrolled ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <div className="relative">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
