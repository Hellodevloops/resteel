import { Link } from '@inertiajs/react';

import { ArrowRight, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, rgba(74, 83, 99, 0.1) 0%, transparent 50%)`,
                    }}
                ></div>
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                ></div>
            </div>

            <div className="relative container mx-auto px-4 py-8 md:py-16 lg:py-20">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-4 lg:gap-16">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="mb-6 md:mb-8">
                            <h3 className="mb-4 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-2xl font-bold text-transparent md:mb-6 md:text-3xl">
                                Resteel
                            </h3>
                            <p className="mb-4 max-w-md text-base leading-relaxed text-slate-300 md:mb-6 md:text-lg">
                                Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience.
                            </p>

                            {/* Social Links */}
                            <div className="flex space-x-3 md:space-x-4">
                                <a
                                    href="https://twitter.com/resteel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/20 md:h-12 md:w-12"
                                >
                                    <Twitter size={18} className="transition-colors group-hover:text-orange-400 md:h-5 md:w-5" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a
                                    href="https://www.instagram.com/resteel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/20 md:h-12 md:w-12"
                                >
                                    <Instagram size={18} className="transition-colors group-hover:text-orange-400 md:h-5 md:w-5" />
                                    <span className="sr-only">Instagram</span>
                                </a>

                                {/* Highlighted YouTube Link */}
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-red-500/50 bg-gradient-to-br from-red-600/20 to-red-500/10 transition-all duration-300 hover:scale-110 hover:border-red-400 hover:bg-gradient-to-br hover:from-red-500/30 hover:to-red-400/20 hover:shadow-lg hover:shadow-red-500/25 md:h-12 md:w-12"
                                >
                                    <Youtube size={18} className="text-red-400 transition-colors group-hover:text-red-300 md:h-5 md:w-5" />
                                    <span className="sr-only">YouTube</span>
                                    {/* Accent glow effect */}
                                    <div className="absolute inset-0 rounded-xl bg-red-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links - Hidden on mobile */}
                    <div className="hidden md:block">
                        <h3 className="relative mb-6 text-xl font-semibold">
                            Quick Links
                            <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
                        </h3>
                        <nav>
                            <ul className="space-y-3">
                                {[
                                    { href: '/', label: 'Home' },
                                    { href: '/buildings', label: 'Buildings' },
                                    { href: '/services', label: 'Services' },
                                    { href: '/about', label: 'About Us' },
                                    { href: '/contact', label: 'Contact' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center text-slate-300 transition-all duration-300 hover:text-orange-400"
                                        >
                                            <ArrowRight
                                                size={14}
                                                className="mr-2 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                            />
                                            <span className="transition-transform duration-300 group-hover:translate-x-2">{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="relative mb-4 text-lg font-semibold md:mb-6 md:text-xl">
                            Contact Us
                            <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-600 to-transparent"></div>
                        </h3>
                        <address className="space-y-3 not-italic md:space-y-4">
                            {/* Address - Simplified on mobile */}
                            <div className="group flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:bg-white/10 md:p-3">
                                <MapPin
                                    size={16}
                                    className="mt-1 shrink-0 text-slate-400 transition-colors group-hover:text-orange-400 md:h-5 md:w-5"
                                />
                                <span className="text-sm text-slate-300 transition-colors group-hover:text-white md:text-base">
                                    <span className="block md:hidden">Helmond, Netherlands</span>
                                    <span className="hidden md:block">Westerbeemd 2B, 5705 DN Helmond, Netherlands</span>
                                </span>
                            </div>
                            <div className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:bg-white/10 md:p-3">
                                <Phone size={16} className="text-slate-400 transition-colors group-hover:text-orange-400 md:h-5 md:w-5" />
                                <a href="tel:+31123456789" className="text-sm text-slate-300 transition-colors hover:text-orange-400 md:text-base">
                                    +31 (0) 123 456 789
                                </a>
                            </div>
                            <div className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:bg-white/10 md:p-3">
                                <Mail size={16} className="text-slate-400 transition-colors group-hover:text-orange-400 md:h-5 md:w-5" />
                                <a
                                    href="mailto:2ndhand@tradingbv.com"
                                    className="text-sm break-all text-slate-300 transition-colors hover:text-orange-400 md:text-base"
                                >
                                    2ndhand@tradingbv.com
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Stats Section - Simplified on mobile */}
                <div className="mt-8 border-t border-white/10 pt-6 md:mt-16 md:pt-12">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                        {[
                            { number: '500+', label: 'Projects' },
                            { number: '38', label: 'Years Exp.' },
                            { number: '99%', label: 'Satisfaction' },
                            { number: '24/7', label: 'Support' },
                        ].map((stat, index) => (
                            <div key={index} className="group text-center">
                                <div className="mb-1 text-xl font-bold text-orange-500 transition-transform duration-300 group-hover:scale-110 md:mb-2 md:text-3xl">
                                    {stat.number}
                                </div>
                                <div className="text-xs text-slate-400 transition-colors group-hover:text-slate-300 md:text-sm">
                                    <span className="block md:hidden">{stat.label}</span>
                                    <span className="hidden md:block">
                                        {stat.label === 'Projects'
                                            ? 'Projects Completed'
                                            : stat.label === 'Years Exp.'
                                              ? 'Years Experience'
                                              : stat.label === 'Satisfaction'
                                                ? 'Client Satisfaction'
                                                : 'Support Available'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-white/10 pt-6 md:mt-12 md:pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-center text-xs text-slate-400 md:text-left md:text-sm">
                            <span className="block md:hidden">© {new Date().getFullYear()} Resteel. All rights reserved.</span>
                            <span className="hidden md:block">
                                © {new Date().getFullYear()} Resteel. All rights reserved. Engineering Excellence Since 1985.
                            </span>
                        </p>
                        <div className="flex space-x-4 md:space-x-6">
                            <Link href="/terms" className="group text-xs text-slate-400 transition-colors hover:text-orange-400 md:text-sm">
                                <span className="group-hover:underline">Terms</span>
                            </Link>
                            <Link href="/privacy" className="group text-xs text-slate-400 transition-colors hover:text-orange-400 md:text-sm">
                                <span className="group-hover:underline">Privacy</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
        </footer>
    );
};

export default Footer;
