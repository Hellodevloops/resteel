import { Link } from '@inertiajs/react';
import { ArrowRight, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

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

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 h-16 w-16 animate-bounce rounded-full bg-orange-500/10" style={{ animationDuration: '6s' }}></div>
            <div
                className="absolute top-40 right-20 h-12 w-12 animate-bounce rounded-full bg-blue-600/10"
                style={{ animationDuration: '8s', animationDelay: '-2s' }}
            ></div>
            <div
                className="absolute right-32 bottom-32 h-20 w-20 animate-bounce rounded-full bg-orange-500/5"
                style={{ animationDuration: '7s', animationDelay: '-4s' }}
            ></div>

            <div className="relative container mx-auto px-4 py-16 md:py-20">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <h3 className="mb-6 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-3xl font-bold text-transparent">
                                Resteel
                            </h3>
                            <p className="mb-6 max-w-md text-lg leading-relaxed text-slate-300">
                                Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience in
                                engineering tomorrow's infrastructure.
                            </p>

                            {/* Social Links */}
                            <div className="flex space-x-4">
                                <a
                                    href="https://twitter.com/resteel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/20"
                                >
                                    <Twitter size={20} className="transition-colors group-hover:text-orange-400" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a
                                    href="https://www.instagram.com/resteel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/20"
                                >
                                    <Instagram size={20} className="transition-colors group-hover:text-orange-400" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-700/50 to-slate-600/30 p-6 backdrop-blur-sm">
                            <h4 className="mb-3 text-lg font-semibold text-white">Stay Updated</h4>
                            <p className="mb-4 text-sm text-slate-300">Get the latest news about our projects and industry insights.</p>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
                                />
                                <button className="group flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 transition-colors hover:bg-orange-600">
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
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
                        <h3 className="relative mb-6 text-xl font-semibold">
                            Contact Us
                            <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-600 to-transparent"></div>
                        </h3>
                        <address className="space-y-4 not-italic">
                            <div className="group flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:bg-white/10">
                                <MapPin size={20} className="mt-1 shrink-0 text-slate-400 transition-colors group-hover:text-orange-400" />
                                <span className="text-slate-300 transition-colors group-hover:text-white">
                                    Westerbeemd 2B, 5705 DN Helmond, Netherlands
                                </span>
                            </div>
                            <div className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:bg-white/10">
                                <Phone size={20} className="text-slate-400 transition-colors group-hover:text-orange-400" />
                                <a href="tel:+31123456789" className="text-slate-300 transition-colors hover:text-orange-400">
                                    +31 (0) 123 456 789
                                </a>
                            </div>
                            <div className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:bg-white/10">
                                <Mail size={20} className="text-slate-400 transition-colors group-hover:text-orange-400" />
                                <a href="mailto:info@resteel-solutions.com" className="text-slate-300 transition-colors hover:text-orange-400">
                                    info@resteel-solutions.com
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-16 border-t border-white/10 pt-12">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            { number: '500+', label: 'Projects Completed' },
                            { number: '38', label: 'Years Experience' },
                            { number: '99%', label: 'Client Satisfaction' },
                            { number: '24/7', label: 'Support Available' },
                        ].map((stat, index) => (
                            <div key={index} className="group text-center">
                                <div className="mb-2 text-3xl font-bold text-orange-500 transition-transform duration-300 group-hover:scale-110">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-slate-400 transition-colors group-hover:text-slate-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-white/10 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-slate-400">
                            © {new Date().getFullYear()} Resteel. All rights reserved. Engineering Excellence Since 1985.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="/terms" className="group text-sm text-slate-400 transition-colors hover:text-orange-400">
                                <span className="group-hover:underline">Terms of Service</span>
                            </Link>
                            <Link href="/privacy" className="group text-sm text-slate-400 transition-colors hover:text-orange-400">
                                <span className="group-hover:underline">Privacy Policy</span>
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
