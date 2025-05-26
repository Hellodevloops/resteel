import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Header';

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
        <div className="bg-slate-50">
            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
                <Navbar />
            </nav>

            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Background with parallax - Updated with RAL colors */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800"
                    style={{ transform: `translate3d(0, ${scrollY * 0.5}px, 0)` }}
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

                {/* Floating Elements */}
                <div
                    className="absolute top-20 left-10 h-20 w-20 animate-bounce rounded-full bg-orange-500/20"
                    style={{ animationDuration: '6s', animationDelay: '0s' }}
                ></div>
                <div
                    className="absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full bg-blue-600/20"
                    style={{ animationDuration: '6s', animationDelay: '-2s' }}
                ></div>
                <div
                    className="absolute bottom-40 left-20 h-12 w-12 animate-bounce rounded-full bg-orange-500/30"
                    style={{ animationDuration: '6s', animationDelay: '-4s' }}
                ></div>
                <div
                    className="absolute right-10 bottom-20 h-24 w-24 animate-bounce rounded-full bg-blue-600/15"
                    style={{ animationDuration: '6s', animationDelay: '-1s' }}
                ></div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="text-white">
                            <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                                <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                                    <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                                    Industrial Excellence Since 1985
                                </div>
                            </div>

                            <h1
                                className={`mb-6 text-5xl leading-tight font-bold transition-all delay-200 duration-1000 lg:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                Engineering
                                <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Tomorrow's</span>
                                Infrastructure
                            </h1>

                            <p
                                className={`mb-8 text-xl leading-relaxed text-white/80 transition-all delay-400 duration-1000 lg:text-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                Delivering world-class steel fabrication and construction solutions with precision, innovation, and unwavering
                                commitment to excellence.
                            </p>

                            <div
                                className={`flex flex-col gap-4 transition-all delay-600 duration-1000 sm:flex-row ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                <button className="animate-pulse rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25">
                                    Start Your Project
                                </button>
                                <button className="rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                                    View Portfolio
                                </button>
                            </div>

                            {/* Stats */}
                            <div
                                className={`mt-12 grid grid-cols-3 gap-8 transition-all delay-800 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="mb-1 text-3xl font-bold text-orange-500">{stat.number}</div>
                                        <div className="text-sm text-white/70">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content - 3D Visual */}
                        <div
                            className={`relative transition-all delay-1000 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                        >
                            <div className="relative">
                                {/* Main Steel Structure Visualization */}
                                <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-blue-600/20 to-slate-700/30 backdrop-blur-sm lg:h-[500px]">
                                    {/* Grid Pattern */}
                                    <div
                                        className="absolute inset-0 opacity-20"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '20px 20px',
                                        }}
                                    ></div>

                                    {/* Steel Beams Animation */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            {/* Horizontal Beams */}
                                            <div
                                                className={`h-4 w-64 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg transition-all delay-1200 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>
                                            <div
                                                className={`mt-8 ml-8 h-4 w-48 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg transition-all delay-1400 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>
                                            <div
                                                className={`mt-8 -ml-4 h-4 w-56 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg transition-all delay-1600 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>

                                            {/* Vertical Supports */}
                                            <div
                                                className={`absolute -top-12 left-8 h-32 w-4 rounded-lg bg-gradient-to-b from-blue-600 to-slate-600 shadow-lg transition-all delay-1800 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>
                                            <div
                                                className={`absolute -top-12 right-8 h-32 w-4 rounded-lg bg-gradient-to-b from-blue-600 to-slate-600 shadow-lg transition-all delay-2000 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                            ></div>

                                            {/* Accent Elements */}
                                            <div className="absolute top-2 left-12 h-3 w-3 animate-pulse rounded-full bg-orange-500"></div>
                                            <div
                                                className="absolute top-2 right-12 h-3 w-3 animate-pulse rounded-full bg-orange-500"
                                                style={{ animationDelay: '0.5s' }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Floating Particles */}
                                    <div
                                        className="absolute top-10 left-10 h-2 w-2 animate-bounce rounded-full bg-orange-500/60"
                                        style={{ animationDuration: '3s' }}
                                    ></div>
                                    <div
                                        className="absolute top-20 right-15 h-1 w-1 animate-bounce rounded-full bg-white/60"
                                        style={{ animationDuration: '4s', animationDelay: '-1s' }}
                                    ></div>
                                    <div
                                        className="absolute bottom-20 left-15 h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600/60"
                                        style={{ animationDuration: '5s', animationDelay: '-3s' }}
                                    ></div>
                                </div>

                                {/* Floating Cards */}
                                <div
                                    className="absolute -top-4 -right-4 animate-bounce rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-sm"
                                    style={{ animationDuration: '4s' }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="h-3 w-3 rounded-full bg-teal-500"></div>
                                        <div>
                                            <div className="text-xs font-semibold text-slate-700">Quality Assured</div>
                                            <div className="text-xs text-slate-500">ISO 9001 Certified</div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="absolute -bottom-4 -left-4 animate-bounce rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-sm"
                                    style={{ animationDuration: '4s', animationDelay: '-2s' }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="h-3 w-3 animate-pulse rounded-full bg-orange-500"></div>
                                        <div>
                                            <div className="text-xs font-semibold text-slate-700">Real-time Updates</div>
                                            <div className="text-xs text-slate-500">Project Progress</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
                        <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/60"></div>
                    </div>
                </div>
            </section>

            {/* Features Preview Section */}
            <section className="relative bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-slate-700">Why Choose Resteel Solutions?</h2>
                        <p className="mx-auto max-w-3xl text-xl text-slate-600">
                            Combining decades of expertise with cutting-edge technology to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className={`h-16 w-16 ${feature.color}/10 mx-auto mb-6 flex items-center justify-center rounded-2xl`}>
                                    <div className={`h-8 w-8 ${feature.color} rounded-lg`}></div>
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-slate-700">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResteelHero;
