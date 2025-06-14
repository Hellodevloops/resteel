import { Building2, Package, Truck, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

const Services = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 },
        );

        const section = document.getElementById('services-section');
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

    const mainServices = [
        {
            id: 1,
            title: 'Purchase & Sale',
            description: 'Expert buying and selling of second-hand agricultural and industrial halls.',
            icon: Building2,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Agricultural Halls', 'Industrial Buildings', 'Steel Constructions'],
        },
        {
            id: 2,
            title: 'Assembly & Disassembly',
            description: 'Professional dismantling and reconstruction services for all project sizes.',
            icon: Wrench,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Expert Dismantling', 'Careful Reconstruction', 'Quality Assurance'],
        },
        {
            id: 3,
            title: 'Transport & Logistics',
            description: 'Complete transportation solutions throughout Europe and beyond.',
            icon: Truck,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Europe-wide Transport', 'International Shipping', 'Safe Delivery'],
        },
        {
            id: 4,
            title: 'Equipment Trading',
            description: 'Comprehensive trading in machinery, forklifts, and construction materials.',
            icon: Package,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Machinery Trading', 'Forklift Sales', 'Construction Materials'],
        },
    ];
    return (
        <section id="services-section" className="relative overflow-hidden bg-slate-50">
            {/* Background with Gradient and Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
                {/* Mesh Pattern Overlay - Hidden on mobile */}
                <div className="absolute inset-0 hidden opacity-30 sm:block">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.05) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.05) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(74, 83, 99, 0.05) 0%, transparent 50%)`,
                        }}
                    />
                </div>
            </div>

            <div className="relative z-10 py-8 sm:py-12 md:py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Header Section */}
                    <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-16 md:mb-20">
                        <h2 className={`mb-4 text-2xl font-bold text-cyan-600 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl`}>
                            What
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent sm:ml-2 sm:inline">
                                We Do
                            </span>
                        </h2>

                        <p
                            className={`mx-auto max-w-3xl text-base leading-relaxed text-slate-600 transition-all delay-400 duration-1000 sm:text-xl ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            We take care of the purchase, sale, assembly, disassembly and transport across Europe, specializing in 2nd hand buildings.
                        </p>

                        {/* Decorative Line - Hidden on mobile */}
                        <div
                            className={`mx-auto mt-6 hidden h-1 w-24 bg-gradient-to-r from-orange-500 to-cyan-600 transition-all delay-600 duration-1000 sm:mt-8 sm:block ${
                                isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`}
                        />
                    </div>

                    {/* Main Services Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                        {mainServices.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <div
                                    key={service.id}
                                    className={`group relative overflow-hidden rounded-lg border border-white/20 bg-white/80 p-4 backdrop-blur-sm transition-all duration-500 sm:rounded-2xl sm:p-6 md:p-8 ${
                                        service.hoverGlow
                                    } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} sm:hover:-translate-y-2 sm:hover:scale-105 sm:hover:shadow-xl`}
                                    style={{
                                        animationDelay: `${index * 200}ms`,
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                    onMouseEnter={() => setHoveredCard(service.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Background Gradient Effect - Hidden on mobile */}
                                    <div
                                        className={`absolute inset-0 hidden bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5 sm:block`}
                                    />

                                    {/* Icon Container */}
                                    <div className="relative mb-4 sm:mb-6">
                                        <div
                                            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${
                                                service.gradient
                                            } shadow-lg transition-transform duration-300 sm:h-16 sm:w-16 sm:rounded-2xl ${
                                                hoveredCard === service.id ? 'scale-110 rotate-3' : ''
                                            }`}
                                        >
                                            <IconComponent className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="mb-2 text-lg font-bold text-cyan-600 transition-colors sm:mb-4 sm:text-xl">{service.title}</h3>

                                    <p className="mb-4 text-sm leading-relaxed text-slate-600 transition-colors sm:mb-6 sm:text-base">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-1.5 sm:space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-slate-600 sm:text-sm">
                                                <div className="mr-2 h-1 w-1 rounded-full bg-cyan-600 sm:h-1.5 sm:w-1.5" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Grid Pattern Overlay - Hidden on mobile */}
                                    <div
                                        className="absolute inset-0 hidden opacity-5 transition-opacity duration-300 group-hover:opacity-10 sm:block"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '20px 20px',
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
