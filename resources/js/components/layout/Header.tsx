import { Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // if (window.scrollY > 80) {
            //     setIsScrolled(true);
            // } else {
            //     setIsScrolled(false);
            // }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Main Header */}
            <header
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
                    isScrolled
                        ? 'shadow-luxury border-b border-slate-200/50 bg-white/95 backdrop-blur-xl'
                        : 'border-b border-white/10 bg-white/10 backdrop-blur-sm'
                } ${!isScrolled ? 'lg:top-8' : ''}`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="group flex items-center gap-3">
                                <img src={'/assets/ResteelSolutionsLogo.png'} className="h-14 px-10" />
                            </Link>
                        </div>

                        {/* Desktop Contact Info */}
                        {/* <div className="hidden items-center gap-8 xl:flex">
                            <a
                                href="tel:+31123456789"
                                className={`group flex items-center gap-3 transition-all duration-300 hover:scale-105 ${
                                    isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-white/90 hover:text-orange-400'
                                }`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                                        isScrolled ? 'bg-orange-500/10 group-hover:bg-orange-500/20' : 'bg-white/10 group-hover:bg-white/20'
                                    }`}
                                >
                                    <Phone size={18} className={isScrolled ? 'text-orange-500' : 'text-white'} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium opacity-70">Call Us</span>
                                    <span className="font-semibold">+31 (0) 123 456 789</span>
                                </div>
                            </a>
                            <a
                                href="mailto:info@resteel-solutions.com"
                                className={`group flex items-center gap-3 transition-all duration-300 hover:scale-105 ${
                                    isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-white/90 hover:text-orange-400'
                                }`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                                        isScrolled ? 'bg-orange-500/10 group-hover:bg-orange-500/20' : 'bg-white/10 group-hover:bg-white/20'
                                    }`}
                                >
                                    <Mail size={18} className={isScrolled ? 'text-orange-500' : 'text-white'} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium opacity-70">Email Us</span>
                                    <span className="font-semibold">info@resteel-solutions.com</span>
                                </div>
                            </a>
                        </div> */}

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center space-x-8">
                                <li>
                                    <Link
                                        to="/"
                                        className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                            isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                                        }`}
                                    >
                                        Home
                                        <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/webshop"
                                        className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                            isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                                        }`}
                                    >
                                        Web Shop
                                        <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/services"
                                        className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                            isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                                        }`}
                                    >
                                        Services
                                        <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about"
                                        className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                            isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                                        }`}
                                    >
                                        About
                                        <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/cart"
                                        className={`group relative px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                                            isScrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                                        }`}
                                    >
                                        Cart 🛒
                                        <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:left-4 group-hover:w-8"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="group shadow-glow relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
                                    >
                                        <span className="relative z-10">Contact Us</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 lg:hidden ${
                                isScrolled ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                        >
                            <div className="relative">{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="shadow-luxury absolute top-full w-full border-t border-slate-200/20 bg-white/95 backdrop-blur-xl lg:hidden">
                        <div className="container mx-auto px-4 py-6">
                            <nav>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            to="/"
                                            className="group flex items-center gap-3 rounded-xl p-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-500"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="h-2 w-2 rounded-full bg-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/webshop"
                                            className="group flex items-center gap-3 rounded-xl p-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-500"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="h-2 w-2 rounded-full bg-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                                            Webshop
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/services"
                                            className="group flex items-center gap-3 rounded-xl p-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-500"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="h-2 w-2 rounded-full bg-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/about"
                                            className="group flex items-center gap-3 rounded-xl p-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-500"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="h-2 w-2 rounded-full bg-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/contact"
                                            className="group shadow-glow flex items-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="h-2 w-2 rounded-full bg-white"></div>
                                            Get Quote
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Mobile Contact Info */}
                            <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
                                <a
                                    href="tel:+31123456789"
                                    className="group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-slate-50"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                                        <Phone size={20} className="text-orange-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-500">Call Us</span>
                                        <span className="font-semibold text-slate-700">+31 (0) 123 456 789</span>
                                    </div>
                                </a>
                                <a
                                    href="mailto:info@resteel-solutions.com"
                                    className="group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-slate-50"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                                        <Mail size={20} className="text-orange-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-500">Email Us</span>
                                        <span className="font-semibold text-slate-700">info@resteel-solutions.com</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
