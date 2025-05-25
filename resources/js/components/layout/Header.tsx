import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('header')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    const navItems = [
        { name: 'Home', href: '/' },
        {
            name: 'Buildings',
            href: '/buildings',
            dropdown: [
                { name: 'Steel Structures', href: '/buildings/steel' },
                { name: 'Industrial Buildings', href: '/buildings/industrial' },
                { name: 'Commercial Buildings', href: '/buildings/commercial' },
            ],
        },
        {
            name: 'Services',
            href: '/services',
            dropdown: [
                { name: 'Design & Engineering', href: '/services/design' },
                { name: 'Construction', href: '/services/construction' },
                { name: 'Maintenance', href: '/services/maintenance' },
            ],
        },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const NavLink = ({ item, isMobile = false, onClick }) => {
        const hasDropdown = item.dropdown && item.dropdown.length > 0;

        if (isMobile) {
            return (
                <div className="relative">
                    <a
                        href={item.href}
                        className="group flex items-center justify-between py-3 text-lg font-medium text-gray-800 transition-all duration-300 hover:text-blue-600"
                        onClick={onClick}
                    >
                        <span className="relative">
                            {item.name}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        {hasDropdown && <ChevronDown size={18} className="transform transition-transform duration-200" />}
                    </a>
                    {hasDropdown && (
                        <div className="mt-2 ml-4 space-y-2">
                            {item.dropdown.map((subItem, index) => (
                                <a
                                    key={index}
                                    href={subItem.href}
                                    className="block py-2 text-gray-600 transition-colors duration-200 hover:text-blue-600"
                                    onClick={onClick}
                                >
                                    {subItem.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div
                className="group relative"
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <a
                    href={item.href}
                    className="group relative flex items-center gap-1 py-2 font-medium text-gray-800 transition-all duration-300 hover:text-blue-600"
                >
                    <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    {hasDropdown && (
                        <ChevronDown
                            size={16}
                            className={`transform transition-all duration-200 ${activeDropdown === item.name ? 'rotate-180 text-blue-600' : ''}`}
                        />
                    )}
                </a>

                {hasDropdown && (
                    <div
                        className={`absolute top-full left-0 mt-2 w-56 transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 ${
                            activeDropdown === item.name
                                ? 'pointer-events-auto translate-y-0 opacity-100'
                                : 'pointer-events-none translate-y-2 opacity-0'
                        }`}
                    >
                        <div className="p-2">
                            {item.dropdown.map((subItem, index) => (
                                <a
                                    key={index}
                                    href={subItem.href}
                                    className="group block rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                >
                                    <span className="relative">
                                        {subItem.name}
                                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
                isScrolled ? 'border-b border-gray-100/50 bg-white/90 py-2 shadow-xl backdrop-blur-lg' : 'bg-transparent py-4'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="group flex items-center">
                        <div className="relative">
                            <img
                                src="/api/placeholder/200/64"
                                alt="Resteel Solutions"
                                className="h-14 px-2 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </div>
                    </a>

                    {/* Contact Info - Desktop */}
                    <div className="hidden items-center gap-8 text-sm lg:flex">
                        <a
                            href="tel:+31123456789"
                            className="group flex items-center gap-3 text-gray-700 transition-all duration-300 hover:text-blue-600"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-300 group-hover:scale-110 group-hover:from-blue-200 group-hover:to-purple-200">
                                <Phone size={18} className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className="font-medium">+31 (0) 123 456 789</span>
                        </a>
                        <a
                            href="mailto:info@resteel.com"
                            className="group flex items-center gap-3 text-gray-700 transition-all duration-300 hover:text-blue-600"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-300 group-hover:scale-110 group-hover:from-blue-200 group-hover:to-purple-200">
                                <Mail size={18} className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className="font-medium">info@resteel.com</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink item={item} />
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 transition-all duration-300 hover:scale-110 hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                    >
                        <div className="relative">
                            <Menu
                                size={20}
                                className={`transform transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                            />
                            <X
                                size={20}
                                className={`absolute inset-0 transform transition-all duration-300 ${
                                    isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute w-full border-t border-gray-100/50 bg-white/95 shadow-xl backdrop-blur-lg transition-all duration-500 md:hidden ${
                    isMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
                }`}
            >
                <div className="container mx-auto px-4 py-6">
                    <nav>
                        <ul className="space-y-1">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink item={item} isMobile={true} onClick={() => setIsMenuOpen(false)} />
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-8 space-y-4 border-t border-gray-200/50 pt-6">
                        <a
                            href="tel:+31123456789"
                            className="group flex items-center gap-4 text-gray-700 transition-all duration-300 hover:text-blue-600"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-300 group-hover:from-blue-200 group-hover:to-purple-200">
                                <Phone size={20} className="text-blue-600" />
                            </div>
                            <span className="text-lg font-medium">+31 (0) 123 456 789</span>
                        </a>
                        <a
                            href="mailto:info@resteel.com"
                            className="group flex items-center gap-4 text-gray-700 transition-all duration-300 hover:text-blue-600"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-300 group-hover:from-blue-200 group-hover:to-purple-200">
                                <Mail size={20} className="text-blue-600" />
                            </div>
                            <span className="text-lg font-medium">info@resteel.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
