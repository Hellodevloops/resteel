import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';

interface SiteSettings {
    contact_email?: string;
    contact_phone?: string | number;
    contact_address?: string;
    company_name?: string;
    social_twitter?: string;
    social_instagram?: string;
    social_youtube?: string;
    social_facebook?: string;
    social_linkedin?: string;
    social_website?: string;
}

const Footer = () => {
    const { t } = useTranslation();
    const { siteSettings } = usePage().props as unknown as { siteSettings: SiteSettings };

    // Social media links configuration
    const socialLinks = [
        {
            icon: <Twitter size={20} />,
            href: siteSettings?.social_twitter || '',
            hover: 'hover:text-blue-400',
            show: !!siteSettings?.social_twitter,
        },
        {
            icon: <Instagram size={20} />,
            href: siteSettings?.social_instagram || '',
            hover: 'hover:text-pink-400',
            show: !!siteSettings?.social_instagram,
        },
        {
            icon: <Youtube size={20} />,
            href: siteSettings?.social_youtube || '',
            hover: 'hover:text-red-500',
            show: !!siteSettings?.social_youtube,
        },
        {
            icon: <Facebook size={20} />,
            href: siteSettings?.social_facebook || '',
            hover: 'hover:text-blue-600',
            show: !!siteSettings?.social_facebook,
        },
        {
            icon: <Linkedin size={20} />,
            href: siteSettings?.social_linkedin || '',
            hover: 'hover:text-blue-700',
            show: !!siteSettings?.social_linkedin,
        },
        {
            icon: <img src="/assets/Over_Marktplaats.png" alt="Marktplaats" width={20} height={30} className="text-white" />,
            href: siteSettings?.social_website ? `https://${siteSettings.social_website.replace(/^https?:\/\//, '')}` : '',
            hover: 'hover:text-green-600',
            show: !!siteSettings?.social_website,
        },
    ].filter((link) => link.show); // Only show links that have URLs

    return (
        <footer className="relative overflow-hidden bg-slate-900 text-white">
            {/* Top shimmer gradient */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />

            <div className="relative z-10 container mx-auto max-w-7xl px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-2xl font-bold text-transparent">
                            {siteSettings?.company_name || t('resteel_solutions')}
                        </h3>
                        <p className="mb-6 max-w-md text-slate-300">{t('footer_company_desc')}</p>
                        {socialLinks.length > 0 && (
                            <div className="flex space-x-3">
                                {socialLinks.map(({ icon, href, hover }, i) => (
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
                        )}
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
                                    <span className="font-bold md:block">Resteel-Solutions B.V</span>
                                    <span className="block md:hidden">{siteSettings?.contact_address?.split(',')[0] || 'Helmond, Netherlands'}</span>
                                    <span className="hidden md:block">
                                        {siteSettings?.contact_address || 'Westerbeemd 2B, 5705 DN Helmond, Netherlands'}
                                    </span>
                                </span>
                            </div>
                            {siteSettings?.contact_phone && (
                                <div className="flex items-center gap-3">
                                    <FaWhatsapp size={20} className="text-slate-400" />
                                    <a
                                        href={`https://wa.me/${String(siteSettings.contact_phone).replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-orange-400"
                                    >
                                        {siteSettings.contact_phone}
                                    </a>
                                </div>
                            )}
                            {siteSettings?.contact_email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={20} className="text-slate-400" />
                                    <a href={`mailto:${siteSettings.contact_email}`} className="transition-colors hover:text-orange-400">
                                        {siteSettings.contact_email}
                                    </a>
                                </div>
                            )}
                        </address>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:space-y-0">
                    <p className="text-center md:text-left">
                        © {new Date().getFullYear()} {siteSettings?.company_name || t('resteel_solutions')}. {t('all_rights_reserved')}{' '}
                        {t('engineering_excellence_since')}
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
