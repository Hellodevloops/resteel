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
            icon: '⚙️',
        },
        {
            title: 'On-Time Delivery',
            description: 'Rigorous project management ensures deadlines are always met',
            icon: '🚀',
        },
        {
            title: 'Sustainable Solutions',
            description: 'Eco-friendly processes and materials for a greener future',
            icon: '🌱',
        },
    ];

    return (
        <div style={{ backgroundColor: '#F8F7F4' }}>
            {/* Navigation */}

            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Background with RAL 5005 Signal Blue as base */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, #1E4C8A 0%, #154080 50%, #0D3466 100%)`,
                        transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
                    }}
                >
                    {/* Steel beam pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `linear-gradient(45deg, rgba(74, 83, 99, 0.3) 1px, transparent 1px), 
                                 linear-gradient(-45deg, rgba(74, 83, 99, 0.3) 1px, transparent 1px)`,
                                backgroundSize: '40px 40px',
                            }}
                        ></div>
                    </div>

                    {/* Accent color highlights */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(244, 70, 17, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(244, 70, 17, 0.1) 0%, transparent 50%)`,
                        }}
                    ></div>
                </div>

                {/* Hero image integration */}
                <div className="absolute inset-0 opacity-30">
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjMUU0QzhBIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8IS0tIFN0ZWVsIEZyYW1lIFN0cnVjdHVyZSAtLT4KPHN2ZyB4PSI1MCIgeT0iNDAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIj4KICA8IS0tIE1haW4gQmVhbXMgLS0+CiAgPHJlY3QgeD0iMCIgeT0iMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iOCIgZmlsbD0iIzRBNTM2MyIgb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iMCIgeT0iNjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iOCIgZmlsbD0iIzRBNTM2MyIgb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iMCIgeT0iMTAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgiIGZpbGw9IiM0QTUzNjMiIG9wYWNpdHk9IjAuOCIvPgogIDxyZWN0IHg9IjAiIHk9IjE0MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEE1MzYzIiBvcGFjaXR5PSIwLjgiLz4KICA8IS0tIFZlcnRpY2FsIFN1cHBvcnRzIC0tPgogIDxyZWN0IHg9IjIwIiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiM0QTUzNjMiIG9wYWNpdHk9IjAuOCIvPgogIDxyZWN0IHg9IjEwMCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iMTYwIiBmaWxsPSIjNEE1MzYzIiBvcGFjaXR5PSIwLjgiLz4KICA8cmVjdCB4PSIxODAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjE2MCIgZmlsbD0iIzRBNTM2MyIgb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iMjYwIiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiM0QTUzNjMiIG9wYWNpdHk9IjAuOCIvPgogIDwhLS0gQWNjZW50IEVsZW1lbnRzIC0tPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjMiIGZpbGw9IiNGNDQ2MTEiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSI4MCIgcj0iMyIgZmlsbD0iI0Y0NDYxMSIvPgogIDxjaXJjbGUgY3g9IjI1MCIgY3k9IjEyMCIgcj0iMyIgZmlsbD0iI0Y0NDYxMSIvPgo8L3N2Zz4KPC9zdmc+"
                        alt="Steel Structure"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Floating geometric elements */}
                <div
                    className="absolute top-20 left-10 h-16 w-16 animate-bounce rounded-lg opacity-20"
                    style={{
                        backgroundColor: '#F44611',
                        animationDuration: '6s',
                        animationDelay: '0s',
                    }}
                ></div>
                <div
                    className="absolute top-40 right-20 h-12 w-12 animate-bounce rounded-full opacity-15"
                    style={{
                        backgroundColor: '#4A5363',
                        animationDuration: '6s',
                        animationDelay: '-2s',
                    }}
                ></div>
                <div
                    className="absolute bottom-40 left-20 h-20 w-20 animate-bounce rounded-lg opacity-10"
                    style={{
                        backgroundColor: '#F44611',
                        animationDuration: '6s',
                        animationDelay: '-4s',
                    }}
                ></div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="text-white">
                            <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                                <div
                                    className="mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm"
                                    style={{
                                        backgroundColor: 'rgba(74, 83, 99, 0.2)',
                                        color: '#F8F7F4',
                                        border: '1px solid rgba(244, 70, 17, 0.3)',
                                    }}
                                >
                                    <span className="mr-2 h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: '#F44611' }}></span>
                                    Industrial Excellence Since 1985
                                </div>
                            </div>

                            <h1
                                className={`mb-6 text-5xl leading-tight font-bold transition-all delay-200 duration-1000 lg:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                style={{ color: '#F8F7F4' }}
                            >
                                Engineering
                                <span
                                    className="block bg-gradient-to-r bg-clip-text text-transparent"
                                    style={{ backgroundImage: 'linear-gradient(45deg, #F44611, #FF8A50)' }}
                                >
                                    Tomorrow's
                                </span>
                                Infrastructure
                            </h1>

                            <p
                                className={`mb-8 text-xl leading-relaxed transition-all delay-400 duration-1000 lg:text-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                style={{ color: 'rgba(248, 247, 244, 0.9)' }}
                            >
                                Delivering world-class steel fabrication and construction solutions with precision, innovation, and unwavering
                                commitment to excellence.
                            </p>

                            <div
                                className={`flex flex-col gap-4 transition-all delay-600 duration-1000 sm:flex-row ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                <button
                                    className="rounded-xl px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    style={{
                                        backgroundColor: '#F44611',
                                        boxShadow: '0 10px 30px rgba(244, 70, 17, 0.3)',
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#E03D0F')}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#F44611')}
                                >
                                    Start Your Project
                                </button>
                                <button
                                    className="rounded-xl px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                                    style={{
                                        border: '2px solid rgba(74, 83, 99, 0.4)',
                                        color: '#F8F7F4',
                                    }}
                                >
                                    View Portfolio
                                </button>
                            </div>

                            {/* Stats */}
                            <div
                                className={`mt-12 grid grid-cols-3 gap-8 transition-all delay-800 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="mb-1 text-3xl font-bold" style={{ color: '#F44611' }}>
                                            {stat.number}
                                        </div>
                                        <div className="text-sm" style={{ color: 'rgba(248, 247, 244, 0.8)' }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content - Enhanced Steel Structure */}
                        <div
                            className={`relative transition-all delay-1000 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                        >
                            <div className="relative">
                                {/* Main Steel Structure Visualization */}
                                <div
                                    className="relative h-96 w-full overflow-hidden rounded-3xl backdrop-blur-sm lg:h-[500px]"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(74, 83, 99, 0.2), rgba(30, 76, 138, 0.3))',
                                        border: '1px solid rgba(248, 247, 244, 0.2)',
                                    }}
                                >
                                    {/* Technical grid pattern */}
                                    <div
                                        className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(248, 247, 244, 0.1) 1px, transparent 1px), 
                                       linear-gradient(90deg, rgba(248, 247, 244, 0.1) 1px, transparent 1px)`,
                                            backgroundSize: '20px 20px',
                                        }}
                                    ></div>

                                    {/* Steel Frame Animation */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            {/* Horizontal Steel Beams */}
                                            <div
                                                className={`h-6 w-64 rounded-lg shadow-lg transition-all delay-1200 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                                style={{ background: 'linear-gradient(90deg, #4A5363, #5A636F)' }}
                                            ></div>
                                            <div
                                                className={`mt-12 ml-8 h-6 w-48 rounded-lg shadow-lg transition-all delay-1400 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                                style={{ background: 'linear-gradient(90deg, #4A5363, #5A636F)' }}
                                            ></div>
                                            <div
                                                className={`mt-12 -ml-4 h-6 w-56 rounded-lg shadow-lg transition-all delay-1600 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                                style={{ background: 'linear-gradient(90deg, #4A5363, #5A636F)' }}
                                            ></div>

                                            {/* Vertical Steel Supports */}
                                            <div
                                                className={`absolute -top-16 left-12 h-40 w-6 rounded-lg shadow-lg transition-all delay-1800 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                                style={{ background: 'linear-gradient(180deg, #1E4C8A, #4A5363)' }}
                                            ></div>
                                            <div
                                                className={`absolute -top-16 right-12 h-40 w-6 rounded-lg shadow-lg transition-all delay-2000 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                                                style={{ background: 'linear-gradient(180deg, #1E4C8A, #4A5363)' }}
                                            ></div>

                                            {/* Connection Points */}
                                            <div
                                                className="absolute top-3 left-16 h-4 w-4 animate-pulse rounded-full"
                                                style={{ backgroundColor: '#F44611' }}
                                            ></div>
                                            <div
                                                className="absolute top-3 right-16 h-4 w-4 animate-pulse rounded-full"
                                                style={{
                                                    backgroundColor: '#F44611',
                                                    animationDelay: '0.5s',
                                                }}
                                            ></div>
                                            <div
                                                className="absolute top-15 left-20 h-3 w-3 animate-pulse rounded-full"
                                                style={{
                                                    backgroundColor: '#F44611',
                                                    animationDelay: '1s',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quality Badges */}
                                <div
                                    className="absolute -top-4 -right-4 animate-bounce rounded-2xl p-4 shadow-2xl backdrop-blur-sm"
                                    style={{
                                        backgroundColor: 'rgba(248, 247, 244, 0.95)',
                                        animationDuration: '4s',
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#1E4C8A' }}></div>
                                        <div>
                                            <div className="text-xs font-semibold" style={{ color: '#4A5363' }}>
                                                Quality Assured
                                            </div>
                                            <div className="text-xs" style={{ color: '#4A5363', opacity: 0.7 }}>
                                                ISO 9001 Certified
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="absolute -bottom-4 -left-4 animate-bounce rounded-2xl p-4 shadow-2xl backdrop-blur-sm"
                                    style={{
                                        backgroundColor: 'rgba(248, 247, 244, 0.95)',
                                        animationDuration: '4s',
                                        animationDelay: '-2s',
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="h-3 w-3 animate-pulse rounded-full" style={{ backgroundColor: '#F44611' }}></div>
                                        <div>
                                            <div className="text-xs font-semibold" style={{ color: '#4A5363' }}>
                                                Real-time Updates
                                            </div>
                                            <div className="text-xs" style={{ color: '#4A5363', opacity: 0.7 }}>
                                                Project Progress
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                    <div className="flex h-10 w-6 justify-center rounded-full border-2" style={{ borderColor: 'rgba(248, 247, 244, 0.4)' }}>
                        <div className="mt-2 h-3 w-1 animate-pulse rounded-full" style={{ backgroundColor: 'rgba(248, 247, 244, 0.8)' }}></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20" style={{ backgroundColor: '#F8F7F4' }}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold" style={{ color: '#4A5363' }}>
                            Why Choose Resteel Solutions?
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl" style={{ color: '#4A5363', opacity: 0.8 }}>
                            Combining decades of expertise with cutting-edge technology to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(248, 247, 244, 1), rgba(255, 255, 255, 0.9))',
                                    border: '1px solid rgba(74, 83, 99, 0.1)',
                                    boxShadow: '0 4px 20px rgba(74, 83, 99, 0.08)',
                                }}
                            >
                                <div
                                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                                    style={{
                                        backgroundColor:
                                            index === 0 ? 'rgba(244, 70, 17, 0.1)' : index === 1 ? 'rgba(30, 76, 138, 0.1)' : 'rgba(74, 83, 99, 0.1)',
                                    }}
                                >
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>
                                <h3 className="mb-4 text-xl font-semibold" style={{ color: '#4A5363' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#4A5363', opacity: 0.8 }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResteelHero;
