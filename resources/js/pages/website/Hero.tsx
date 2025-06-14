import Header from '@/components/layout/Header';
import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

const ResteelHero = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // Trigger animations on mount
        setTimeout(() => setIsVisible(true), 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            title: 'Precision Engineering',
            description: 'Advanced CAD/CAM systems ensure millimeter-perfect fabrication',
            color: 'bg-orange-500',
        },
        {
            title: 'On-Time Delivery',
            description: 'Rigorous project management ensures deadlines are always met',
            color: 'bg-blue-600',
        },
        {
            title: 'Sustainable Solutions',
            description: 'Eco-friendly processes and materials for a greener future',
            color: 'bg-teal-500',
        },
    ];

    return (
        <div className="mt-12 bg-slate-50 sm:mt-16 md:mt-20">
            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    <Header />
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden sm:min-h-screen">
                {/* Background Image with parallax - disabled on mobile for better performance */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/assets/hero.jpg')`,
                        transform: `translate3d(0, ${window.innerWidth > 640 ? scrollY * 0.5 : 0}px, 0)`,
                    }}
                ></div>

                {/* Gradient overlay - Simplified for mobile */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-600/90 via-slate-700/80 to-blue-800/90"
                    style={{ transform: `translate3d(0, ${window.innerWidth > 640 ? scrollY * 0.3 : 0}px, 0)` }}
                >
                    {/* Mesh Pattern Overlay - Hidden on mobile */}
                    <div className="absolute inset-0 hidden opacity-30 sm:block">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-600/10"></div>
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 40% 40%, rgba(74, 83, 99, 0.1) 0%, transparent 50%)`,
                            }}
                        ></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
                    <div className="grid grid-cols-1 items-center gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left Content */}
                        <div className="order-1 text-center text-white lg:order-1 lg:text-left">
                            <h1
                                className={`mb-4 text-2xl leading-tight font-bold text-cyan-600 transition-all delay-200 duration-1000 sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                Engineering
                                <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Tomorrow's</span>
                                Infrastructure
                            </h1>

                            <p
                                className={`mx-auto mb-6 max-w-2xl text-base leading-relaxed text-white/80 transition-all delay-400 duration-1000 sm:mb-10 sm:text-xl lg:mx-0 lg:text-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                Delivering world-class steel fabrication and construction solutions with precision and innovation.
                            </p>

                            <div
                                className={`flex flex-col items-center gap-4 transition-all delay-600 duration-1000 sm:gap-6 lg:items-start ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                <a href="tel:+31 (0) 123 456 789" className="w-full sm:w-auto">
                                    <button className="flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-cyan-600 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:min-h-[60px] sm:rounded-xl sm:px-8 sm:py-4 sm:text-base">
                                        <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="whitespace-nowrap">+31 (0) 123 456 789</span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - Hidden on mobile */}
                <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform animate-bounce sm:bottom-8 sm:flex">
                    <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white/30 sm:h-10 sm:w-6">
                        <div className="mt-1.5 h-2 w-0.5 animate-pulse rounded-full bg-white/60 sm:mt-2 sm:h-3 sm:w-1"></div>
                    </div>
                </div>
            </section>

            {/* Features Preview Section */}
            {/* <section className="relative bg-white py-8 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 xl:px-16">
                    <div className="mb-8 text-center sm:mb-16 lg:mb-20">
                        <h2 className="mb-3 text-xl font-bold text-cyan-600 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                            Why Choose
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent sm:ms-4 sm:inline">
                                Resteel Solutions?
                            </span>
                        </h2>

                        <p className="mx-auto max-w-3xl text-sm text-slate-600 sm:text-lg md:text-xl lg:text-2xl">
                            Combining expertise with cutting-edge technology
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-2xl sm:p-8 lg:p-10"
                            >
                                <div
                                    className={`h-10 w-10 sm:h-16 sm:w-16 lg:h-20 lg:w-20 ${feature.color}/10 mx-auto mb-4 flex items-center justify-center rounded-lg sm:mb-8 sm:rounded-2xl`}
                                >
                                    <div className={`h-5 w-5 sm:h-8 sm:w-8 lg:h-10 lg:w-10 ${feature.color} rounded-lg`}></div>
                                </div>
                                <h3 className="mb-2 text-base font-semibold text-cyan-600 sm:mb-6 sm:text-xl lg:text-2xl">{feature.title}</h3>
                                <p className="text-xs text-slate-600 sm:text-base lg:text-lg">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default ResteelHero;
