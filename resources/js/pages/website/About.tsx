import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, Award, Building2, Globe2, MapPin, Shield, Users, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

const AboutSection = () => {
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

        const element = document.getElementById('about-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const advantages = [
        { text: 'Over 20 years of industry experience', icon: Award },
        { text: 'Projects from 1,000 m² to 60,000 m²', icon: Building2 },
        { text: 'Operations across Europe and beyond', icon: Globe2 },
        { text: 'Complete service from purchase to assembly', icon: Wrench },
        { text: 'Expertise in industrial and agricultural sectors', icon: Shield },
    ];

    const statCards = [
        {
            title: 'Worldwide Operations',
            description: 'Serving clients in over 25 European countries and beyond',
            icon: Globe2,
            gradient: 'from-blue-500 to-blue-600',
            accent: 'bg-blue-500',
            number: '25+',
            label: 'Countries',
        },
        {
            title: 'Expert Team',
            description: 'Skilled professionals with decades of industry experience',
            icon: Users,
            gradient: 'from-teal-500 to-teal-600',
            accent: 'bg-teal-500',
            number: '50+',
            label: 'Experts',
        },
        {
            title: 'Project Scale',
            description: 'From small 1,000m² buildings to massive 60,000m² complexes',
            icon: Building2,
            gradient: 'from-orange-500 to-orange-600',
            accent: 'bg-orange-500',
            number: '60k',
            label: 'Max m²',
        },
        {
            title: 'Local Knowledge',
            description: 'Based in Helmond, Netherlands with Europe-wide expertise',
            icon: MapPin,
            gradient: 'from-slate-600 to-slate-700',
            accent: 'bg-slate-600',
            number: '20+',
            label: 'Years',
        },
    ];

    return (
        <section id="about-section" className="relative mt-22 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 md:py-32">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-10 h-32 w-32 animate-pulse rounded-full bg-orange-500/5 blur-3xl"></div>
                <div
                    className="absolute bottom-20 left-10 h-40 w-40 animate-pulse rounded-full bg-blue-600/5 blur-3xl"
                    style={{ animationDelay: '-2s' }}
                ></div>
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-slate-600/3 blur-3xl"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-32 left-20 h-4 w-4 animate-bounce rounded-full bg-orange-500/20" style={{ animationDuration: '6s' }}></div>
            <div
                className="absolute top-40 right-32 h-3 w-3 animate-bounce rounded-full bg-blue-600/20"
                style={{ animationDuration: '8s', animationDelay: '-2s' }}
            ></div>
            <div
                className="absolute bottom-40 left-32 h-5 w-5 animate-bounce rounded-full bg-teal-500/20"
                style={{ animationDuration: '7s', animationDelay: '-4s' }}
            ></div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                        <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 shadow-lg">
                            <span className="mr-3 h-2 w-2 animate-pulse rounded-full bg-white"></span>
                            <span className="text-sm font-semibold tracking-wide text-white">WHO WE ARE</span>
                        </div>

                        <h2
                            className={`mb-8 bg-gradient-to-r from-slate-700 via-slate-600 to-blue-600 bg-clip-text text-4xl leading-tight font-bold text-transparent transition-all delay-200 duration-1000 md:text-6xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Resteel
                        </h2>

                        <div
                            className={`mb-10 space-y-6 transition-all delay-400 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <p className="text-lg leading-relaxed text-slate-600">
                                Based in <span className="font-semibold text-slate-700">Helmond, Netherlands</span>, Resteel specializes in buying and
                                selling second-hand buildings and construction materials. With over two decades of experience, we've established
                                ourselves as experts in the field of demountable industrial buildings.
                            </p>
                            <p className="text-lg leading-relaxed text-slate-600">
                                We're <span className="font-semibold text-orange-600">broadly oriented</span> and not bound by specific branches or
                                national borders. Our services extend to purchasing, selling, assembling, disassembling, and transporting second-hand
                                buildings, as well as machines, forklifts, and construction materials.
                            </p>
                        </div>

                        <div
                            className={`mb-10 transition-all delay-600 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <h3 className="mb-6 text-xl font-semibold text-slate-700">Why Choose Us?</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {advantages.map((advantage, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-start rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg"
                                    >
                                        <div className="mt-1 mr-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-2 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                            <advantage.icon className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="font-medium text-slate-700 transition-colors duration-300 group-hover:text-slate-800">
                                            {advantage.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`transition-all delay-800 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <Button
                                asChild
                                className="group rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl hover:shadow-orange-500/25"
                            >
                                <Link href="/about">
                                    Learn More About Us
                                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Enhanced Stats Grid */}
                    <div className={`relative transition-all delay-1000 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                        <div className="grid grid-cols-2 gap-6">
                            {statCards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`group relative cursor-pointer rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                                        index % 2 === 0 ? 'translate-y-4 transform' : '-translate-y-2 transform'
                                    }`}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Gradient Overlay */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                                    ></div>

                                    {/* Icon */}
                                    <div
                                        className={`relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                                    >
                                        <card.icon className="h-6 w-6 text-white" />
                                    </div>

                                    {/* Stats */}
                                    <div className="relative mb-3">
                                        <div className={`bg-gradient-to-r text-3xl font-bold ${card.gradient} bg-clip-text text-transparent`}>
                                            {card.number}
                                        </div>
                                        <div className="text-sm font-medium text-slate-500">{card.label}</div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="relative mb-2 text-lg font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-800">
                                        {card.title}
                                    </h3>
                                    <p className="relative text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
                                        {card.description}
                                    </p>

                                    {/* Hover Effect Indicator */}
                                    <div
                                        className={`absolute top-4 right-4 h-2 w-2 rounded-full ${card.accent} animate-pulse opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                    ></div>
                                </div>
                            ))}
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-8 -right-8 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 blur-xl"></div>
                        <div
                            className="absolute -bottom-8 -left-8 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-600/10 to-slate-600/10 blur-xl"
                            style={{ animationDelay: '-3s' }}
                        ></div>

                        {/* Connecting Lines */}
                        <div className="absolute top-1/2 left-1/2 h-20 w-1 -translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-b from-transparent via-slate-300/50 to-transparent"></div>
                        <div className="absolute top-1/2 left-1/2 h-1 w-20 -translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-r from-transparent via-slate-300/50 to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-blue-600 to-orange-500"></div>
        </section>
    );
};

export default AboutSection;
