import { Link } from '@inertiajs/react';
import { ArrowRight, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="relative overflow-hidden bg-slate-900 text-white">
            {/* Top shimmer gradient */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />

            <div className="relative z-10 container mx-auto max-w-7xl px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-2xl font-bold text-transparent">
                            {t('resteel_solutions')}
                        </h3>
                        <p className="mb-6 max-w-md text-slate-300">{t('footer_company_desc')}</p>
                        <div className="flex space-x-3">
                            {[
                                { icon: <Twitter size={20} />, href: 'https://twitter.com/resteel', hover: 'hover:text-blue-400' },
                                { icon: <Instagram size={20} />, href: 'https://instagram.com/resteel', hover: 'hover:text-pink-400' },
                                { icon: <Youtube size={20} />, href: 'https://youtube.com', hover: 'hover:text-red-500' },
                            ].map(({ icon, href, hover }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition-all duration-300 hover:bg-white/20 ${hover}`}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="hidden md:block">
                        <h4 className="mb-4 text-xl font-semibold">{t('quick_links')}</h4>
                        <ul className="space-y-3 text-slate-300">
                            {[
                                { label: t('home'), href: '/' },
                                { label: t('about_us'), href: '/about' },
                                { label: t('browse_structures'), href: '/buildings' },
                                { label: t('contact_us'), href: '/contact' },
                            ].map(({ label, href }) => (
                                <li key={href}>
                                    <Link href={href} className="group flex items-center transition-colors hover:text-orange-400">
                                        <span className="transition-transform group-hover:translate-x-1">{label}</span>
                                        <ArrowRight
                                            size={14}
                                            className="ml-2 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-4 text-xl font-semibold">{t('contact_us')}</h4>
                        <address className="space-y-4 text-slate-300 not-italic">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="mt-1 text-slate-400" />
                                <span>
                                    <span className="block md:hidden">Helmond, Netherlands</span>
                                    <span className="hidden md:block">Westerbeemd 2B, 5705 DN Helmond, Netherlands</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-slate-400" />
                                <a href="tel:+31123456789" className="transition-colors hover:text-orange-400">
                                    +31 (0) 123 456 789
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={20} className="text-slate-400" />
                                <a href="mailto:Info@2ndhandholding.com" className="transition-colors hover:text-orange-400">
                                    Info@2ndhandholding.com
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:space-y-0">
                    <p className="text-center md:text-left">
                        © {new Date().getFullYear()} Resteel. {t('all_rights_reserved')} {t('engineering_excellence_since')}
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/terms" className="transition-colors hover:text-orange-400">
                            {t('terms')}
                        </Link>
                        <Link href="/privacy" className="transition-colors hover:text-orange-400">
                            {t('privacy')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom shimmer gradient */}
            <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />
        </footer>
    );
};

export default Footer;
