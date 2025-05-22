import { Link } from '@inertiajs/react';
import { Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
                isScrolled ? 'shadow-soft bg-white/95 py-2 backdrop-blur-md' : 'bg-transparent py-4'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <span className="text-resteel-primary font-serif text-2xl font-bold">
                            Resteel<span className="text-resteel-accent">.</span>
                        </span>
                    </Link>

                    {/* Top contact info - visible on medium screens and up */}
                    <div className="hidden items-center gap-6 text-sm lg:flex">
                        <a
                            href="tel:+31123456789"
                            className="text-resteel-secondary hover:text-resteel-primary flex items-center gap-2 transition-colors"
                        >
                            <div className="bg-resteel-light flex h-8 w-8 items-center justify-center rounded-full">
                                <Phone size={16} className="text-resteel-primary" />
                            </div>
                            <span className="font-medium">+31 (0) 123 456 789</span>
                        </a>
                        <a
                            href="mailto:info@resteel.com"
                            className="text-resteel-secondary hover:text-resteel-primary flex items-center gap-2 transition-colors"
                        >
                            <div className="bg-resteel-light flex h-8 w-8 items-center justify-center rounded-full">
                                <Mail size={16} className="text-resteel-primary" />
                            </div>
                            <span className="font-medium">info@resteel.com</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            <li>
                                <Link href="/" className="hover:text-resteel-accent group relative py-2 font-medium transition-colors">
                                    Home
                                    <span className="bg-resteel-accent absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/buildings" className="hover:text-resteel-accent group relative py-2 font-medium transition-colors">
                                    Buildings
                                    <span className="bg-resteel-accent absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-resteel-accent group relative py-2 font-medium transition-colors">
                                    Services
                                    <span className="bg-resteel-accent absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-resteel-accent group relative py-2 font-medium transition-colors">
                                    About
                                    <span className="bg-resteel-accent absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-resteel-accent group relative py-2 font-medium transition-colors">
                                    Contact
                                    <span className="bg-resteel-accent absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="text-resteel-secondary hover:text-resteel-primary transition-colors md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="shadow-soft absolute w-full border-t border-gray-100 bg-white/95 backdrop-blur-md md:hidden">
                    <div className="container mx-auto px-4 py-6">
                        <nav>
                            <ul className="flex flex-col space-y-6">
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-resteel-accent block text-lg font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/buildings"
                                        className="hover:text-resteel-accent block text-lg font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Buildings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/services"
                                        className="hover:text-resteel-accent block text-lg font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="hover:text-resteel-accent block text-lg font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-resteel-accent block text-lg font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
                            <a
                                href="tel:+31123456789"
                                className="text-resteel-secondary hover:text-resteel-accent flex items-center gap-3 transition-colors"
                            >
                                <Phone size={20} className="text-resteel-primary" />
                                <span className="font-medium">+31 (0) 123 456 789</span>
                            </a>
                            <a
                                href="mailto:info@resteel.com"
                                className="text-resteel-secondary hover:text-resteel-accent flex items-center gap-3 transition-colors"
                            >
                                <Mail size={20} className="text-resteel-primary" />
                                <span className="font-medium">info@resteel.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
