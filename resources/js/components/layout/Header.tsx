import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ChevronDown, Globe, Menu, X, Youtube } from 'lucide-react';
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

    // Initialize current locale
    useEffect(() => {
        setCurrentLocale(locale);
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
            if (!target.closest('.language-dropdown') && !target.closest('.mobile-language-dropdown')) {
                setIsLanguageDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
                setIsLanguageDropdownOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLanguageChange = async (newLocale: string) => {
        console.log('Language change requested:', newLocale, 'Current:', currentLocale);
        if (newLocale === currentLocale) return;

        setIsLanguageDropdownOpen(false);
        setIsMenuOpen(false); // Close mobile menu on language change

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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-3 sm:py-4">
                        {/* Logo */}
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/" className="group flex items-center gap-2 sm:gap-3">
                                <img
                                    src="/assets/ResteelSolutionsLogo.png"
                                    alt="Resteel Solutions Logo"
                                    className="h-8 w-auto transition-all duration-300 sm:h-10 md:h-12 lg:h-14"
                                />
                            </Link>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
                            {/* Mobile YouTube Button */}
                            <a
                                href="https://www.youtube.com/@Resteel-Solutions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 sm:h-10 sm:w-10 sm:rounded-xl ${
                                    isScrolled ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-red-100 text-red-600 hover:bg-red-200'
                                }`}
                                aria-label="Visit our YouTube channel"
                            >
                                <Youtube size={18} className="sm:h-5 sm:w-5" />
                            </a>

                            {/* Mobile Language Button */}
                            <div className="mobile-language-dropdown relative">
                                <button
                                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 sm:h-10 sm:w-10 sm:rounded-xl ${
                                        isScrolled
                                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    } ${isLanguageDropdownOpen ? 'bg-orange-100 text-orange-600' : ''}`}
                                    aria-label="Change language"
                                >
                                    <span className="text-sm sm:text-base">{flagEmojis[currentLocale]}</span>
                                </button>

                                {/* Mobile Language Dropdown */}
                                {isLanguageDropdownOpen && (
                                    <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
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
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className={`mobile-menu-button flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 sm:h-10 sm:w-10 sm:rounded-xl ${
                                    isScrolled ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <X size={18} className="sm:h-5 sm:w-5" /> : <Menu size={18} className="sm:h-5 sm:w-5" />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center space-x-2 xl:space-x-4">
                                {[
                                    { href: '/', label: t('home') },
                                    { href: '/about', label: t('about_us') },
                                    { href: '/buildings', label: t('buildings') },
                                ].map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`group relative px-3 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 xl:px-4 xl:text-base ${
                                                isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-slate-700 hover:text-orange-400'
                                            }`}
                                        >
                                            {label}
                                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-3 group-hover:w-6 xl:group-hover:left-4 xl:group-hover:w-8" />
                                        </Link>
                                    </li>
                                ))}

                                {/* Desktop YouTube Button */}
                                <li>
                                    <a
                                        href="https://www.youtube.com/@Resteel-Solutions"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/25 xl:rounded-xl xl:px-4 xl:text-base"
                                        aria-label="Visit our YouTube channel"
                                    >
                                        <Youtube className="h-4 w-4 xl:h-5 xl:w-5" />
                                        <span className="relative z-10">YouTube</span>
                                        <div className="absolute inset-0 rounded-lg bg-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 xl:rounded-xl" />
                                    </a>
                                </li>

                                {/* Desktop Contact Button */}
                                <li>
                                    <Button
                                        asChild
                                        className="shadow-glow relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-md hover:shadow-orange-500/25 xl:rounded-xl xl:px-6 xl:py-3 xl:text-base"
                                    >
                                        <Link href="/contact">
                                            <span className="relative z-10">{t('contact_us')}</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </Link>
                                    </Button>
                                </li>

                                {/* Desktop Language Selector */}
                                <li className="language-dropdown relative">
                                    <button
                                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                        className={`flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 ${
                                            isLanguageDropdownOpen ? 'border-orange-300 bg-orange-50' : ''
                                        }`}
                                        aria-label={t('language')}
                                    >
                                        <Globe className="h-4 w-4" />
                                        <span className="hidden xl:inline">{flagEmojis[currentLocale]}</span>
                                        <span className="uppercase">{currentLocale}</span>
                                        <ChevronDown
                                            className={`h-3 w-3 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Desktop Language Dropdown */}
                                    {isLanguageDropdownOpen && (
                                        <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
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
                    <div
                        className={`mobile-menu-container overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
                            isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0 pb-0'
                        }`}
                    >
                        <div className="space-y-3 border-t border-slate-200/50 pt-4">
                            {/* Mobile Navigation Links */}
                            <div className="space-y-2">
                                {[
                                    { href: '/', label: t('home') },
                                    { href: '/about', label: t('about_us') },
                                    { href: '/buildings', label: t('buildings') },
                                    { href: '/contact', label: t('contact_us') },
                                ].map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="block rounded-lg px-3 py-2 font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile YouTube Link */}
                            <div className="border-t border-slate-200/50 pt-3">
                                <a
                                    href="https://www.youtube.com/@Resteel-Solutions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-red-600 transition-colors duration-200 hover:bg-red-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Youtube className="h-5 w-5" />
                                    <span>YouTube Channel</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Overlay for mobile menu */}
            {isMenuOpen && <div className="fixed inset-0 z-[99] bg-black/20 lg:hidden" onClick={() => setIsMenuOpen(false)} />}
        </>
    );
};

export default Header;
