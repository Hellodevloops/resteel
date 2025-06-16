import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
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
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
                    isScrolled
                        ? 'text-slate-700 shadow-luxury border-b border-slate-200/50 bg-white/95 backdrop-blur-xl  dark:border-slate-900/50 dark:bg-slate-900/95'
                        : 'text-slate-700 border-b border-white/90 bg-white/90 backdrop-blur-sm dark:border-slate-900/50 dark:bg-slate-900/90'
                }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="group flex items-center gap-3">
                                <img
                                    src="/assets/ResteelSolutionsLogo.png"
                                    alt="Resteel Solutions Logo"
                                    className="h-10 sm:h-12 md:h-14 lg:h-14 px-2 sm:px-4 transition-all duration-300"
                                />
                            </Link>
                        </div>

                        {/* Mobile Webshop + Cart */}
                        <div className="flex items-center space-x-4 lg:hidden">
                            <Link
                                href="/webshops"
                                className="text-sm font-medium text-slate-700 hover:text-orange-500"
                            >
                                {t('Web Shop')}
                            </Link>
                            {/* <Link
                                href="/cart"
                                aria-label="Cart"
                                className="relative"
                            >
                                <ShoppingCart className="h-5 w-5  text-slate-700 hover:text-orange-500" />
                            </Link> */}
                            <button
                                className={`flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-300 ${
                                    isScrolled
                                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center space-x-4">
                                {[
                                    { href: '/', label: t('Home') },
                                    { href: '/about', label: t('About Us') },
                                    { href: '/webshops', label: t('Shop') },
                                    // { href: '/career', label: t('Career') },
                                    // { href: '/cart', label: t('Cart') },
                                ].map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                                isScrolled
                                                    ? 'text-slate-700 hover:text-orange-500'
                                                    : 'text-slate-700 hover:text-orange-400'
                                            }`}
                                        >
                                            {label}
                                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8" />
                                        </Link>
                                    </li>
                                ))}
                               <li>
  <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-glow hover:shadow-md hover:shadow-orange-500/25">
    <Link href="/contact">
      <span className="relative z-10">Contact Us</span>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  </Button>
</li>
                                <li>
                                    <select
                                        value={locale}
                                        onChange={(e) =>
                                            Inertia.get(
                                                route('locale.change', e.target.value),
                                                {},
                                                { preserveState: true, preserveScroll: true }
                                            )
                                        }
                                        className="border rounded p-2 bg-white text-sm"
                                    >
                                        {supported_locales.map((loc) => (
                                            <option key={loc} value={loc}>
                                                {labels[loc] || loc}
                                            </option>
                                        ))}
                                    </select>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Mobile Menu Content */}
                    {isMenuOpen && (
                        <div className="lg:hidden mt-2 space-y-4 mb-5">
                            <Link href="/" className="block text-slate-700 font-medium">
                                {t('Home')}
                            </Link>
                            <Link href="/about" className="block text-slate-700 font-medium">
                                {t('About Us')}
                            </Link>
                            <Link href="/webshops" className="block text-slate-700 font-medium">
                                {t('Shop')}
                            </Link>

                            {/* <Link href="/career" className="block text-slate-700 font-medium">
                                {t('Career')}
                            </Link> */}
                            <Link href="/contact" className="block text-slate-700 font-medium">
                                {t('Contact Us')}
                            </Link>
                        </div>
                        
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
