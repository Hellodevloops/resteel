import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ChevronDown, Globe, Menu, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Set up axios defaults for CSRF
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const labels: Record<string, string> = {
    en: 'English',
    nl: 'Nederlands',
    de: 'Deutsch',
};

const flagEmojis: Record<string, string> = {
    en: '🇬🇧',
    nl: '🇳🇱',
    de: '🇩🇪',
};

interface PageProps {
    locale?: string;
    supported_locales?: string[];
    [key: string]: unknown;
}

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(true);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState<string>('en');
    const { t, i18n } = useTranslation();
    const pageProps = usePage().props as PageProps;
    const locale = pageProps?.locale || 'en';
    const supported_locales = pageProps?.supported_locales || ['en', 'de', 'nl'];

    // Debug logging
    console.log('Header component - Page props:', pageProps);
    console.log('Header component - Current locale:', locale);
    console.log('Header component - Supported locales:', supported_locales);
    console.log('Header component - i18n current language:', i18n.language);

    // Initialize current locale
    useEffect(() => {
        setCurrentLocale(locale);
        console.log('Header component - Setting current locale to:', locale);
    }, [locale]);

    // Cart functionality
    const { getCartItemsCount } = useCart();
    const cartItemsCount = getCartItemsCount();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.language-dropdown')) {
                setIsLanguageDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = async (newLocale: string) => {
        console.log('Language change requested:', newLocale, 'Current:', currentLocale);
        if (newLocale === currentLocale) return;

        setIsLanguageDropdownOpen(false);

        try {
            console.log('Updating session in backend...');
            // First, update session in backend
            const sessionResponse = await axios.post(
                '/locale/change',
                {
                    locale: newLocale,
                },
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    },
                },
            );

            console.log('Session response:', sessionResponse.data);

            if (sessionResponse.data.success) {
                console.log('Fetching translations for new locale...');
                // Fetch translations for the new language
                const translationsResponse = await axios.get(`/locale/translations/${newLocale}`, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Accept: 'application/json',
                    },
                });

                console.log('Translations response:', translationsResponse.data);

                // Update i18n with new translations
                if (translationsResponse.data && translationsResponse.data.translations) {
                    const newTranslations = translationsResponse.data.translations.messages || {};
                    console.log('New translations:', newTranslations);
                    
                    // Add the new translations to i18n resources
                    i18n.addResourceBundle(newLocale, 'translation', newTranslations, true, true);
                }

                // Update the frontend i18n for instant UI change
                console.log('Changing i18n language to:', newLocale);
                await i18n.changeLanguage(newLocale);
                setCurrentLocale(newLocale);

                // Reload the page to ensure all components get the new locale
                console.log('Reloading page...');
                window.location.reload();
            } else {
                throw new Error('Failed to update session');
            }
        } catch (error) {
            console.error('Failed to change language:', error);
            // Revert on error
            await i18n.changeLanguage(locale);
            setCurrentLocale(locale);
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
                    isScrolled
                        ? 'shadow-luxury border-b border-slate-200/50 bg-white text-slate-700 backdrop-blur-xl'
                        : 'border-b border-white/90 bg-white text-slate-700 backdrop-blur-sm'
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
                                    className="h-10 px-2 transition-all duration-300 sm:h-12 sm:px-4 md:h-14 lg:h-14"
                                />
                            </Link>
                        </div>

                        {/* Mobile Webshop + Cart */}
                        <div className="flex items-center space-x-4 lg:hidden">
                            <Link href="/webshops" className="text-sm font-medium text-slate-700 hover:text-orange-500">
                                {t('shop')}
                            </Link>
                            <Link href="/cart" aria-label={t('cart')} className="relative">
                                <ShoppingCart className="h-5 w-5 text-slate-700 hover:text-orange-500" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                                        {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                                    isScrolled ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                                    { href: '/', label: t('home') },
                                    { href: '/about', label: t('about_us') },
                                    { href: '/webshops', label: t('shop') },
                                ].map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                                isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-slate-700 hover:text-orange-400'
                                            }`}
                                        >
                                            {label}
                                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8" />
                                        </Link>
                                    </li>
                                ))}
                                {/* Cart with indicator */}
                                <li>
                                    <Link
                                        href="/cart"
                                        className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                            isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-slate-700 hover:text-orange-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <ShoppingCart className="h-5 w-5" />
                                            <span>{t('cart')}</span>
                                            {cartItemsCount > 0 && (
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                                                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                                </span>
                                            )}
                                        </div>
                                        <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8" />
                                    </Link>
                                </li>
                                <li>
                                    <Button
                                        asChild
                                        className="shadow-glow relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-md hover:shadow-orange-500/25"
                                    >
                                        <Link href="/contact">
                                            <span className="relative z-10">{t('contact_us')}</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </Link>
                                    </Button>
                                </li>
                                {/* Enhanced Language Selector */}
                                <li className="language-dropdown relative">
                                    <button
                                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                        className={`flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 ${
                                            isLanguageDropdownOpen ? 'border-orange-300 bg-orange-50' : ''
                                        }`}
                                        aria-label={t('language')}
                                    >
                                        <Globe className="h-4 w-4" />
                                        <span className="hidden md:inline">{flagEmojis[currentLocale]}</span>
                                        <span className="uppercase">{currentLocale}</span>
                                        <ChevronDown
                                            className={`h-3 w-3 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Language Dropdown */}
                                    {isLanguageDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                                            <div className="py-1">
                                                {supported_locales.map((loc: string) => (
                                                    <button
                                                        key={loc}
                                                        onClick={() => handleLanguageChange(loc)}
                                                        className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-orange-50 ${
                                                            currentLocale === loc ? 'bg-orange-50 text-orange-600' : 'text-slate-700'
                                                        }`}
                                                    >
                                                        <span className="text-lg">{flagEmojis[loc]}</span>
                                                        <span>{labels[loc] || loc}</span>
                                                        {currentLocale === loc && <span className="ml-auto text-orange-500">✓</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Mobile Menu Content */}
                    {isMenuOpen && (
                        <div className="mt-2 mb-5 space-y-4 lg:hidden">
                            <Link href="/" className="block font-medium text-slate-700">
                                {t('home')}
                            </Link>
                            <Link href="/about" className="block font-medium text-slate-700">
                                {t('about_us')}
                            </Link>
                            <Link href="/webshops" className="block font-medium text-slate-700">
                                {t('shop')}
                            </Link>
                            <Link href="/contact" className="block font-medium text-slate-700">
                                {t('contact_us')}
                            </Link>

                            {/* Mobile Language Selector */}
                            <div className="border-t pt-4">
                                <div className="mb-2 text-sm font-medium text-slate-500">{t('language')}</div>
                                <div className="flex flex-wrap gap-2">
                                    {supported_locales.map((loc: string) => (
                                        <button
                                            key={loc}
                                            onClick={() => handleLanguageChange(loc)}
                                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                                                currentLocale === loc
                                                    ? 'border-orange-300 bg-orange-50 text-orange-600'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50'
                                            }`}
                                        >
                                            <span>{flagEmojis[loc]}</span>
                                            <span>{labels[loc] || loc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
