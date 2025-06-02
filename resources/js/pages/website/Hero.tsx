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

    const stats = [
        { number: '500+', label: 'Projects Completed' },
        { number: '38', label: 'Years Experience' },
        { number: '99%', label: 'Client Satisfaction' },
    ];

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
        <div className="mt-16 bg-slate-50 sm:mt-20 md:mt-22">
            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Header />
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Background Image with parallax */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/assets/hero.jpg')`,
                        transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
                    }}
                >
                    {/* Dark overlay for better text readability */}
                    {/* <div className="absolute inset-0 bg-slate-900/70"></div> */}
                </div>

                {/* Gradient overlay - Updated with RAL colors */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-600/80 via-slate-700/70 to-blue-800/80"
                    style={{ transform: `translate3d(0, ${scrollY * 0.3}px, 0)` }}
                >
                    {/* Mesh Pattern Overlay */}
                    <div className="absolute inset-0 opacity-30">
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

                {/* Floating Elements - Reduced for mobile */}
                <div
                    className="absolute top-16 left-4 h-12 w-12 animate-bounce rounded-full bg-orange-500/20 sm:top-20 sm:left-10 sm:h-20 sm:w-20"
                    style={{ animationDuration: '6s', animationDelay: '0s' }}
                ></div>
                <div
                    className="absolute top-32 right-4 h-10 w-10 animate-bounce rounded-full bg-blue-600/20 sm:top-40 sm:right-20 sm:h-16 sm:w-16"
                    style={{ animationDuration: '6s', animationDelay: '-2s' }}
                ></div>
                <div
                    className="absolute bottom-32 left-4 h-8 w-8 animate-bounce rounded-full bg-orange-500/30 sm:bottom-40 sm:left-20 sm:h-12 sm:w-12"
                    style={{ animationDuration: '6s', animationDelay: '-4s' }}
                ></div>
                <div
                    className="absolute right-4 bottom-16 h-16 w-16 animate-bounce rounded-full bg-blue-600/15 sm:right-10 sm:bottom-20 sm:h-24 sm:w-24"
                    style={{ animationDuration: '6s', animationDelay: '-1s' }}
                ></div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
                    <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left Content */}
                        <div className="order-1 text-center text-white lg:order-1 lg:text-left">
                            <h1
                                className={`mb-6 text-3xl leading-tight font-bold text-cyan-600 transition-all delay-200 duration-1000 sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                Engineering
                                <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Tomorrow's</span>
                                Infrastructure
                            </h1>

                            <p
                                className={`mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80 transition-all delay-400 duration-1000 sm:mb-10 sm:text-xl lg:mx-0 lg:text-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                Delivering world-class steel fabrication and construction solutions with precision, innovation, and unwavering
                                commitment to excellence.
                            </p>

                            <div
                                className={`flex flex-col items-center gap-4 transition-all delay-600 duration-1000 sm:gap-6 lg:items-start ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                <a href="tel:+31 (0) 123 456 789" className="w-full sm:w-auto">
                                    <button className="flex min-h-[60px] w-full touch-manipulation items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-cyan-600 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:w-auto sm:px-10 sm:py-5 sm:text-lg">
                                        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                                        <span className="whitespace-nowrap">+31 (0) 123 456 789</span>
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* Right Content - 3D Visual */}
                        <div
                            className={`relative order-2 transition-all delay-1000 duration-1000 lg:order-2 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                        >
                            <div className="relative">
                                {/* Main Steel Structure Visualization */}
                                <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-blue-600/20 to-slate-700/30 backdrop-blur-sm sm:h-80 sm:rounded-3xl md:h-96 lg:h-[500px]">
                                    {/* Grid Pattern */}
                                    <div
                                        className="absolute inset-0 opacity-20"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '15px 15px sm:20px 20px',
                                        }}
                                    ></div>

                                    {/* Steel Beams Animation - Responsive sizing */}
                                    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                                        <div className="relative scale-75 sm:scale-90 lg:scale-100">
                                            {/* Horizontal Beams */}
                                            <div
                                                className={`h-3 w-48 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg transition-all delay-1200 duration-1000 sm:h-4 sm:w-56 lg:w-64 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>
                                            <div
                                                className={`mt-6 ml-6 h-3 w-36 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg transition-all delay-1400 duration-1000 sm:mt-8 sm:ml-8 sm:h-4 sm:w-40 lg:w-48 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>
                                            <div
                                                className={`mt-6 -ml-3 h-3 w-42 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg transition-all delay-1600 duration-1000 sm:mt-8 sm:-ml-4 sm:h-4 sm:w-48 lg:w-56 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>

                                            {/* Vertical Supports */}
                                            <div
                                                className={`absolute -top-8 left-6 h-24 w-3 rounded-lg bg-gradient-to-b from-blue-600 to-slate-600 shadow-lg transition-all delay-1800 duration-1000 sm:-top-12 sm:left-8 sm:h-32 sm:w-4 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>
                                            <div
                                                className={`absolute -top-8 right-6 h-24 w-3 rounded-lg bg-gradient-to-b from-blue-600 to-slate-600 shadow-lg transition-all delay-2000 duration-1000 sm:-top-12 sm:right-8 sm:h-32 sm:w-4 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>

                                            {/* Accent Elements */}
                                            <div className="absolute top-1 left-8 h-2 w-2 animate-pulse rounded-full bg-orange-500 sm:top-2 sm:left-12 sm:h-3 sm:w-3"></div>
                                            <div
                                                className="absolute top-1 right-8 h-2 w-2 animate-pulse rounded-full bg-orange-500 sm:top-2 sm:right-12 sm:h-3 sm:w-3"
                                                style={{ animationDelay: '0.5s' }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Floating Particles */}
                                    <div
                                        className="absolute top-6 left-6 h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500/60 sm:top-10 sm:left-10 sm:h-2 sm:w-2"
                                        style={{ animationDuration: '3s' }}
                                    ></div>
                                    <div
                                        className="absolute top-12 right-10 h-1 w-1 animate-bounce rounded-full bg-white/60 sm:top-20 sm:right-15"
                                        style={{ animationDuration: '4s', animationDelay: '-1s' }}
                                    ></div>
                                    <div
                                        className="absolute bottom-12 left-10 h-1 w-1 animate-bounce rounded-full bg-blue-600/60 sm:bottom-20 sm:left-15 sm:h-1.5 sm:w-1.5"
                                        style={{ animationDuration: '5s', animationDelay: '-3s' }}
                                    ></div>
                                </div>

                                {/* Floating Cards - Responsive positioning and sizing */}
                                <div
                                    className="absolute -top-2 -right-2 animate-bounce rounded-xl bg-white/95 p-2 shadow-2xl backdrop-blur-sm sm:-top-4 sm:-right-4 sm:rounded-2xl sm:p-4"
                                    style={{ animationDuration: '4s' }}
                                >
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-teal-500 sm:h-3 sm:w-3"></div>
                                        <div>
                                            <div className="text-xs font-semibold text-slate-700">Quality Assured</div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="absolute -bottom-2 -left-2 animate-bounce rounded-xl bg-white/95 p-2 shadow-2xl backdrop-blur-sm sm:-bottom-4 sm:-left-4 sm:rounded-2xl sm:p-4"
                                    style={{ animationDuration: '4s', animationDelay: '-2s' }}
                                >
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500 sm:h-3 sm:w-3"></div>
                                        <div>
                                            <div className="text-xs font-semibold text-slate-700">Real-time Updates</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform animate-bounce sm:bottom-8">
                    <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white/30 sm:h-10 sm:w-6">
                        <div className="mt-1.5 h-2 w-0.5 animate-pulse rounded-full bg-white/60 sm:mt-2 sm:h-3 sm:w-1"></div>
                    </div>
                </div>
            </section>

            {/* Features Preview Section */}
            <section className="relative bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 xl:px-16">
                    <div className="mb-12 text-center sm:mb-16 lg:mb-20">
                        <h2 className="mb-4 text-2xl font-bold text-cyan-600 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                            Why Choose
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent sm:ms-4 sm:inline">
                                Resteel Solutions?
                            </span>
                        </h2>

                        <p className="mx-auto max-w-3xl text-base text-slate-600 sm:text-lg md:text-xl lg:text-2xl">
                            Combining decades of expertise with cutting-edge technology to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-2xl sm:p-8 lg:p-10"
                            >
                                <div
                                    className={`h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 ${feature.color}/10 mx-auto mb-6 flex items-center justify-center rounded-xl sm:mb-8 sm:rounded-2xl`}
                                >
                                    <div className={`h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 ${feature.color} rounded-lg`}></div>
                                </div>
                                <h3 className="mb-4 text-lg font-semibold text-cyan-600 sm:mb-6 sm:text-xl lg:text-2xl">{feature.title}</h3>
                                <p className="text-sm text-slate-600 sm:text-base lg:text-lg">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResteelHero;
