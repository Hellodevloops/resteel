import { Link } from '@inertiajs/react';
import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isScrolled, setIsScrolled] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            // if (window.scrollY > 50) {
            //     setIsScrolled(true);
            // } else {
            //     setIsScrolled(false);
            // }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Enhanced inline SVG logo component
    const ResteelLogo = ({ className = 'h-12 w-auto' }) => (
        <svg viewBox="0 0 1200 600" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E88B8" />
                    <stop offset="50%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
                <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7BA7BC" />
                    <stop offset="50%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
                </filter>
            </defs>

            {/* House outline with enhanced styling */}
            <path
                d="M950 150 L1150 250 L1150 500 L950 500 L950 380 L1050 380 L1050 300 L950 300 Z"
                fill="none"
                stroke="url(#houseGradient)"
                strokeWidth="28"
                strokeLinejoin="round"
                filter="url(#shadow)"
            />
            <path
                d="M750 200 L950 150 L1150 250 L950 300"
                fill="none"
                stroke="url(#houseGradient)"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#shadow)"
            />

            {/* RESTEEL text with gradient */}
            <text
                x="50"
                y="380"
                fontSize="140"
                fontWeight="900"
                fill="url(#logoGradient)"
                fontFamily="system-ui, -apple-system, sans-serif"
                filter="url(#shadow)"
            >
                RESTEEL
            </text>

            {/* SOLUTIONS text */}
            <text
                x="90"
                y="480"
                fontSize="58"
                fontWeight="600"
                fill="url(#logoGradient)"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="12"
                opacity="0.9"
            >
                SOLUTIONS
            </text>
        </svg>
    );

    const navigationItems = [
        {
            href: '/',
            label: 'Home',
            hasDropdown: false,
        },
        {
            href: '/services',
            label: 'Services',
            hasDropdown: true,
            dropdownItems: [
                { href: '/services/steel-fabrication', label: 'Steel Fabrication' },
                { href: '/services/construction', label: 'Construction' },
                { href: '/services/maintenance', label: 'Maintenance' },
                { href: '/services/consulting', label: 'Consulting' },
            ],
        },
        {
            href: '/projects',
            label: 'Projects',
            hasDropdown: true,
            dropdownItems: [
                { href: '/projects/industrial', label: 'Industrial Buildings' },
                { href: '/projects/commercial', label: 'Commercial Projects' },
                { href: '/projects/residential', label: 'Residential Complex' },
                { href: '/projects/infrastructure', label: 'Infrastructure' },
            ],
        },
        {
            href: '/about',
            label: 'About',
            hasDropdown: false,
        },
        {
            href: '/contact',
            label: 'Contact',
            hasDropdown: false,
        },
    ];

    return (
        <>
            {/* Main Header */}
            <header
                className={`shadow-luxury backdrop-blur-2xl' fixed top-0 left-0 z-50 w-full border-b border-gray-200/30 bg-white/97 transition-all duration-700`}
                style={{ marginTop: '0' }}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo Section */}
                        <Link href="/" className="group relative flex items-center">
                            <div className="relative overflow-hidden rounded-2xl p-2">
                                <img src="/assets/ResteelSolutionsLogo.png" className="h-16 w-auto px-15" />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-orange-500/10 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"></div>
                                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
                            </div>
                        </Link>

                        {/* Premium Contact Info */}
                        {/* <div className="hidden items-center gap-8 xl:flex">
                            <div className="flex items-center gap-6">
                                <a
                                    href="tel:+31123456789"
                                    className={`group text-resteel-secondary hover:text-resteel-primary hover:shadow-soft hover:to-blue-100/40' } flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-50/80`}
                                >
                                    <div
                                        className={`group-hover:scale-110shadow-soft group-hover:shadow-card flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 transition-all duration-300`}
                                    >
                                        <Phone size={20} className={`${isScrolled ? 'text-resteel-primary' : 'text-white'}`} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold opacity-75">Call Now</div>
                                        <div className="font-bold">+31 (0) 123 456 789</div>
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@resteel.com"
                                    className={`group text-resteel-secondary hover:text-resteel-accent hover:shadow-soft hover:to-orange-100/40' flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-orange-50/80`}
                                >
                                    <div
                                        className={`shadow-soft group-hover:shadow-card flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/60 transition-all duration-300 group-hover:scale-110`}
                                    >
                                        <Mail size={20} className={`'text-resteel-accent'`} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold opacity-75">Email Us</div>
                                        <div className="font-bold">info@resteel.com</div>
                                    </div>
                                </a>
                            </div>
                        </div> */}

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center space-x-2">
                                {navigationItems.map((item, index) => (
                                    <li key={index} className="relative">
                                        <div
                                            onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                                            onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                                            className="relative"
                                        >
                                            <Link
                                                href={item.href}
                                                className={`group text-resteel-secondary hover:text-resteel-accent hover:shadow-soft relative flex items-center gap-1 rounded-xl px-6 py-4 text-sm font-bold transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-orange-50/30`}
                                            >
                                                {item.label}
                                                {item.hasDropdown && (
                                                    <ChevronDown
                                                        size={16}
                                                        className={`transition-transform duration-300 ${
                                                            activeDropdown === index ? 'rotate-180' : ''
                                                        }`}
                                                    />
                                                )}

                                                {/* Enhanced underline effect */}
                                                <span
                                                    className={`from-resteel-accent via-resteel-secondary to-resteel-accent bg-gradient-to-r' absolute right-6 bottom-1 left-6 h-0.5 scale-x-0 transition-all duration-300 group-hover:scale-x-100`}
                                                ></span>

                                                {/* Subtle background glow */}
                                                <span
                                                    className={`group-hover:opacity-100' absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-orange-500/5 to-blue-500/0 opacity-0 transition-all duration-300 group-hover:scale-110`}
                                                ></span>
                                            </Link>

                                            {/* Dropdown Menu */}
                                            {item.hasDropdown && activeDropdown === index && (
                                                <div className="shadow-luxury absolute top-full left-0 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200/30 bg-white/98 backdrop-blur-2xl">
                                                    <div className="p-2">
                                                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                            <Link
                                                                key={dropdownIndex}
                                                                href={dropdownItem.href}
                                                                className="text-resteel-secondary hover:text-resteel-accent block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 hover:translate-x-1 hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-orange-50/40"
                                                            >
                                                                {dropdownItem.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}

                                {/* Premium CTA Button */}
                                <li className="ml-4">
                                    <Link
                                        href="/quote"
                                        className="hover:shadow-glow group relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105"
                                    >
                                        <span className="relative z-10">Contact Us</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Enhanced Mobile Menu Button */}
                        <button
                            className={`text-resteel-secondary hover:text-resteel-primary shadow-soft hover:shadow-card relative rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/60 p-3 transition-all duration-300 hover:scale-110 lg:hidden`}
                            aria-label={'Open Menu'}
                        >
                            <div className="relative">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</div>
                        </button>
                    </div>
                </div>

                {/* Enhanced Mobile Menu */}
                {isMenuOpen && (
                    <div className="shadow-luxury absolute w-full border-t border-gray-200/30 bg-white/98 backdrop-blur-2xl lg:hidden">
                        <div className="container mx-auto px-4 py-8">
                            <nav>
                                <ul className="flex flex-col space-y-2">
                                    {navigationItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="group text-resteel-secondary hover:text-resteel-accent hover:shadow-soft relative flex items-center justify-between rounded-2xl px-6 py-4 text-lg font-bold transition-all duration-300 hover:translate-x-2 hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-orange-50/40"
                                            >
                                                <span>{item.label}</span>
                                                {item.hasDropdown && <ChevronDown size={20} className="text-gray-400" />}
                                                <span className="from-resteel-accent to-resteel-secondary absolute top-1/2 left-0 h-0 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b transition-all duration-300 group-hover:h-12"></span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Enhanced Mobile Contact Info */}
                            <div className="mt-8 space-y-4 border-t border-gray-200/50 pt-8">
                                <a
                                    href="tel:+31123456789"
                                    className="hover:shadow-soft text-resteel-secondary hover:text-resteel-primary flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-blue-100/40"
                                >
                                    <div className="shadow-soft flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/60">
                                        <Phone size={24} className="text-resteel-primary" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold">+31 (0) 123 456 789</div>
                                        <div className="text-sm font-medium text-gray-500">Call us directly</div>
                                    </div>
                                </a>
                                <a
                                    href="mailto:info@resteel.com"
                                    className="hover:shadow-soft text-resteel-secondary hover:text-resteel-accent flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-orange-50/60 hover:to-orange-100/40"
                                >
                                    <div className="shadow-soft flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/60">
                                        <Mail size={24} className="text-resteel-accent" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold">info@resteel.com</div>
                                        <div className="text-sm font-medium text-gray-500">Send us an email</div>
                                    </div>
                                </a>
                            </div>

                            {/* Mobile CTA */}
                            <div className="mt-6">
                                <Link
                                    href="/quote"
                                    className="hover:shadow-glow flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 font-bold text-white transition-all duration-300 hover:scale-105"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
