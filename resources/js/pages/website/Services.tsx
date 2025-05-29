import { ArrowRight, Building2, Handshake, MapPin, Package, Truck, Users, Wrench } from 'lucide-react';
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
            gradient: 'from-orange-500 to-orange-600',
            accentColor: 'bg-orange-500',
            hoverGlow: 'hover:shadow-orange-500/25',
            features: ['Expert Dismantling', 'Careful Reconstruction', 'Site Management', 'Quality Assurance'],
        },
        {
            id: 3,
            title: 'Transport & Logistics',
            description: 'Complete transportation solutions throughout Europe and beyond, managing shipping outside the EU with ease.',
            icon: Truck,
            gradient: 'from-teal-500 to-teal-600',
            accentColor: 'bg-teal-500',
            hoverGlow: 'hover:shadow-teal-500/25',
            features: ['Europe-wide Transport', 'International Shipping', 'Logistics Management', 'Safe Delivery'],
        },
        {
            id: 4,
            title: 'Equipment Trading',
            description: 'Comprehensive trading in machinery, forklifts, racks, and construction materials with extensive industry connections.',
            icon: Package,
            gradient: 'from-purple-600 to-purple-700',
            accentColor: 'bg-purple-600',
            hoverGlow: 'hover:shadow-purple-500/25',
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
        <section id="services-section" className="relative mt-22 overflow-hidden bg-slate-50">
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

            {/* Floating Elements */}
            <div
                className="absolute top-20 left-10 h-20 w-20 animate-bounce rounded-full bg-orange-500/10"
                style={{ animationDuration: '6s', animationDelay: '0s' }}
            />
            <div
                className="absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full bg-blue-600/10"
                style={{ animationDuration: '6s', animationDelay: '-2s' }}
            />
            <div
                className="absolute bottom-40 left-20 h-12 w-12 animate-bounce rounded-full bg-teal-500/10"
                style={{ animationDuration: '6s', animationDelay: '-4s' }}
            />

            <div className="relative z-10 py-16 md:py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Header Section */}
                    <div className="mx-auto mb-20 max-w-4xl text-center">
                        <h2
                            className={`mb-6 translate-y-0 text-4xl leading-tight font-bold text-slate-700 opacity-100 transition-all delay-200 duration-1000 md:text-5xl lg:text-6xl`}
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
                            className={`mx-auto mt-8 h-1 w-24 bg-gradient-to-r from-orange-500 to-blue-600 transition-all delay-600 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
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

                                        {/* Floating Indicator */}
                                        {hoveredCard === service.id && (
                                            <div className="absolute -top-2 -right-2 h-4 w-4 animate-pulse rounded-full bg-orange-500" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <h3 className="mb-4 text-xl font-bold text-slate-700 transition-colors group-hover:text-slate-800">
                                        {service.title}
                                    </h3>

                                    <p className="mb-6 leading-relaxed text-slate-600 transition-colors group-hover:text-slate-700">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="mb-6 space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-slate-600">
                                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Link */}
                                    <button className="group/link relative inline-flex items-center font-semibold text-slate-700 transition-all duration-300 hover:text-orange-500">
                                        Learn more
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-blue-600 transition-all duration-300 group-hover/link:w-full" />
                                    </button>

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

                    {/* What We Do Section */}
                    {/* <div
                        className={`mb-20 rounded-3xl border border-white/20 bg-white/80 p-12 backdrop-blur-sm transition-all delay-800 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        <div className="mb-12 text-center">
                            <h3 className="mb-4 text-3xl font-bold text-slate-700">What We Do</h3>
                            <p className="mx-auto max-w-3xl text-lg text-slate-600"></p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {additionalServices.map((service, index) => {
                                const IconComponent = service.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/60 hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex justify-center">
                                            <div
                                                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-white`}
                                            >
                                                <IconComponent className={`h-6 w-6 ${service.color}`} />
                                            </div>
                                        </div>
                                        <h4 className="mb-2 text-lg font-semibold text-slate-700">{service.title}</h4>
                                        <p className="text-sm text-slate-600">{service.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div> */}

                    {/* Call to Action */}
                    <div
                        className={`text-center transition-all delay-1000 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800 p-12 text-white backdrop-blur-sm">
                            <h3 className="mb-4 text-3xl font-bold">Ready to Start Trading?</h3>
                            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                                We can almost always find a suitable buyer for your trade objects. Contact us for both small and large industrial
                                projects.
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <button className="group rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25">
                                    Contact Us
                                    <ArrowRight className="ml-2 inline h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>

                                <button className="rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                                    Become Sales Manager
                                </button>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-8 text-sm text-white/70">
                                <p>Want to become a sales manager in your country? Contact us today!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
