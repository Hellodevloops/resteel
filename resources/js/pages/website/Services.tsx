import { Building2, Handshake, MapPin, Package, Truck, Users, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

const Services = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

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
            description:
                'Expert buying and selling of second-hand agricultural and industrial halls, plus used steel constructions across all sectors.',
            icon: Building2,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Agricultural Halls', 'Industrial Buildings', 'Steel Constructions', 'Cross-Border Trading'],
        },
        {
            id: 2,
            title: 'Assembly & Disassembly',
            description: 'Professional dismantling and reconstruction services with experienced teams handling projects of all sizes.',
            icon: Wrench,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Expert Dismantling', 'Careful Reconstruction', 'Site Management', 'Quality Assurance'],
        },
        {
            id: 3,
            title: 'Transport & Logistics',
            description: 'Complete transportation solutions throughout Europe and beyond, managing shipping outside the EU with ease.',
            icon: Truck,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Europe-wide Transport', 'International Shipping', 'Logistics Management', 'Safe Delivery'],
        },
        {
            id: 4,
            title: 'Equipment Trading',
            description: 'Comprehensive trading in machinery, forklifts, racks, and construction materials with extensive industry connections.',
            icon: Package,
            gradient: 'from-blue-600 to-slate-700',
            accentColor: 'bg-blue-600',
            hoverGlow: 'hover:shadow-blue-500/25',
            features: ['Machinery Trading', 'Forklift Sales', 'Storage Racks', 'Construction Materials'],
        },
    ];

    const additionalServices = [
        {
            title: 'European Coverage',
            description: 'Active throughout Europe with no project boundaries',
            icon: MapPin,
            color: 'text-blue-600',
        },
        {
            title: 'Buyer Matching',
            description: 'Finding suitable buyers for your trade objects',
            icon: Handshake,
            color: 'text-orange-500',
        },
        {
            title: 'Sales Partnership',
            description: 'Opportunities to become a sales manager in your country',
            icon: Users,
            color: 'text-teal-500',
        },
    ];

    return (
        <section id="services-section" className="relative overflow-hidden bg-slate-50">
            {/* Background with Gradient and Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
                {/* Mesh Pattern Overlay */}
                <div className="absolute inset-0 opacity-30">
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

            <div className="relative z-10 py-16 md:py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Header Section */}
                    <div className="mx-auto mb-20 max-w-4xl text-center">
                        <h2
                            className={`mb-6 translate-y-0 text-4xl leading-tight font-bold text-cyan-600 opacity-100 transition-all delay-200 duration-1000 md:text-5xl lg:text-6xl`}
                        >
                            What
                            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> We Do</span>
                        </h2>

                        <p
                            className={`mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 transition-all delay-400 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            We take care of the purchase, sale, assembly, disassembly and transport and are active throughout Europe. Our core
                            business is 2nd hand buildings alongside all common trade operations.
                        </p>

                        {/* Decorative Line */}
                        <div
                            className={`mx-auto mt-8 h-1 w-24 bg-gradient-to-r from-orange-500 to-cyan-600 transition-all delay-600 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                        />
                    </div>

                    {/* Main Services Grid */}
                    <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                        {mainServices.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <div
                                    key={service.id}
                                    className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl ${service.hoverGlow} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                                    style={{
                                        animationDelay: `${index * 200}ms`,
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                    onMouseEnter={() => setHoveredCard(service.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Background Gradient Effect */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                    />

                                    {/* Icon Container */}
                                    <div className="relative mb-6">
                                        <div
                                            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                        >
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="mb-4 text-xl font-bold text-cyan-600 transition-colors group-hover:text-cyan-700">
                                        {service.title}
                                    </h3>

                                    <p className="mb-6 leading-relaxed text-slate-600 transition-colors group-hover:text-slate-700">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="mb-6 space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-slate-600">
                                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Grid Pattern Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
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

                    {/* Call to Action */}
                    <div
                        className={`text-center transition-all delay-1000 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    ></div>
                </div>
            </div>
        </section>
    );
};

export default Services;
