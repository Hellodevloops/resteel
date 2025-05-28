import { Link } from '@inertiajs/react';
import { ArrowRight, Instagram, Mail, MapPin, MessageCircle, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 40% 40%, rgba(74, 83, 99, 0.1) 0%, transparent 50%)`,
                    }}
                ></div>
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), 
                       linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                    }}
                ></div>
            </div>

            <div className="relative container mx-auto px-4 py-6 md:py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="mb-3 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-xl font-bold text-transparent">
                                Resteel.
                            </h3>
                            <p className="mb-3 max-w-md text-sm leading-relaxed text-slate-300">
                                Resteel. handles industrial projects of all sizes, unrestricted by industry or borders.
                            </p>

                            {/* Social Links */}
                            <div className="flex space-x-2">
                                <a
                                    href="https://twitter.com/2ndhandtrading"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/20"
                                >
                                    <Twitter size={16} className="transition-colors group-hover:text-orange-400" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a
                                    href="https://www.instagram.com/2ndhandtrading"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/20"
                                >
                                    <Instagram size={16} className="transition-colors group-hover:text-orange-400" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/20"
                                >
                                    <Youtube size={16} className="transition-colors group-hover:text-orange-400" />
                                    <span className="sr-only">YouTube Channel</span>
                                </a>
                            </div>
                        </div>
                        <div className="mt-4 flex">
                            <a
                                href="https://wa.me/31651062354"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center text-sm text-slate-300 transition-all duration-300 hover:text-green-400"
                            >
                                <MessageCircle
                                    size={12}
                                    className="mr-2 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                />
                                <span className="transition-transform duration-300 group-hover:translate-x-2">WhatsApp +31 06 51 06 23 54</span>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center text-sm text-slate-300 transition-all duration-300 hover:text-red-400"
                            >
                                <Youtube
                                    size={12}
                                    className="mr-2 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                />
                                <span className="transition-transform duration-300 group-hover:translate-x-2">Our YouTube channel</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="relative mb-4 text-xl font-semibold">
                            Quick Links
                            <div className="absolute -bottom-1 left-0 h-0.5 w-10 bg-gradient-to-r from-orange-500 to-transparent"></div>
                        </h3>
                        <nav>
                            <ul className="space-y-2">
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
                                            className="group flex items-center text-sm text-slate-300 transition-all duration-300 hover:text-orange-400"
                                        >
                                            <ArrowRight
                                                size={12}
                                                className="mr-2 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                            />
                                            <span className="transition-transform duration-300 group-hover:translate-x-2">{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* WhatsApp and YouTube Links */}
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="relative mb-4 text-xl font-semibold">
                            Contact Us
                            <div className="absolute -bottom-1 left-0 h-0.5 w-10 bg-gradient-to-r from-blue-600 to-transparent"></div>
                        </h3>
                        <address className="space-y-2 not-italic">
                            <div className="group flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:bg-white/10">
                                <MapPin size={16} className="mt-1 shrink-0 text-slate-400 transition-colors group-hover:text-orange-400" />
                                <span className="text-sm text-slate-300 transition-colors group-hover:text-white">
                                    Waterbeemd 2B, 5705 DN Helmond
                                </span>
                            </div>
                            <div className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:bg-white/10">
                                <Mail size={16} className="text-slate-400 transition-colors group-hover:text-orange-400" />
                                <a
                                    href="mailto:info@resteel-solutions.com"
                                    className="text-sm text-slate-300 transition-colors hover:text-orange-400"
                                >
                                    info@resteel-solutions.com
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="text-xs text-slate-400">Copyright © 2025 Resteel - Gerealiseerd door Maykel Leijsten Computers</p>
                        <div className="mt-2 flex space-x-4 md:mt-0">
                            <Link href="/terms" className="group text-xs text-slate-400 transition-colors hover:text-orange-400">
                                <span className="group-hover:underline">Terms of Service</span>
                            </Link>
                            <Link href="/privacy" className="group text-xs text-slate-400 transition-colors hover:text-orange-400">
                                <span className="group-hover:underline">Privacy Policy</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
