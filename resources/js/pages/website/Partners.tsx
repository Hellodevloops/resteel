import { Link } from '@inertiajs/react';
import { ArrowRight, Award, Building, CheckCircle, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const partners = [
    {
        id: 1,
        name: 'Industrial Group A',
        category: 'Manufacturing',
        projects: '50+ Projects',
        specialization: 'Heavy Steel Fabrication',
    },
    {
        id: 2,
        name: 'Construction Co. B',
        category: 'Construction',
        projects: '75+ Projects',
        specialization: 'Commercial Buildings',
    },
    {
        id: 3,
        name: 'Building Solutions C',
        category: 'Architecture',
        projects: '40+ Projects',
        specialization: 'Residential Complexes',
    },
    {
        id: 4,
        name: 'Engineering Firm D',
        category: 'Engineering',
        projects: '60+ Projects',
        specialization: 'Infrastructure Solutions',
    },
    {
        id: 5,
        name: 'Agricultural Systems E',
        category: 'Agriculture',
        projects: '30+ Projects',
        specialization: 'Agricultural Structures',
    },
];

const partnershipBenefits = [
    {
        icon: Award,
        title: 'Quality Assurance',
        description: 'ISO 9001 certified processes ensure exceptional standards',
    },
    {
        icon: Users,
        title: 'Collaborative Approach',
        description: 'Seamless integration with your existing workflows',
    },
    {
        icon: CheckCircle,
        title: 'Proven Track Record',
        description: '500+ successful projects across diverse industries',
    },
];

const Partners = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredPartner, setHoveredPartner] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // Trigger animations on mount
        setTimeout(() => setIsVisible(true), 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-28">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(244, 70, 17, 0.1) 0%, transparent 50%), 
                                     radial-gradient(circle at 75% 75%, rgba(30, 76, 138, 0.1) 0%, transparent 50%)`,
                    transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-20 text-center">
                    <div
                        className={`inline-flex items-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-1000 ${
                            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                        }`}
                    >
                        <span className="mr-3 h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                        Strategic Partnerships
                    </div>

                    <h2
                        className={`mt-6 mb-6 text-4xl leading-tight font-bold text-slate-700 transition-all delay-200 duration-1000 lg:text-6xl ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                    >
                        Trusted by Industry
                        <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Leaders</span>
                    </h2>

                    <p
                        className={`mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 transition-all delay-400 duration-1000 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                    >
                        We collaborate with Europe's most innovative companies to deliver world-class building solutions that shape tomorrow's
                        infrastructure.
                    </p>
                </div>

                {/* Partnership Benefits */}
                <div
                    className={`mb-20 grid grid-cols-1 gap-8 transition-all delay-600 duration-1000 md:grid-cols-3 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                >
                    {partnershipBenefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200"
                            >
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    <Icon size={24} />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-slate-700">{benefit.title}</h3>
                                <p className="text-slate-600">{benefit.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Partners Grid */}
                <div className="mb-16">
                    <h3
                        className={`mb-12 text-center text-2xl font-semibold text-slate-700 transition-all delay-800 duration-1000 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                    >
                        Our Partners
                    </h3>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {partners.map((partner, index) => (
                            <div
                                key={partner.id}
                                className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-200 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                                style={{ transitionDelay: `${800 + index * 100}ms` }}
                                onMouseEnter={() => setHoveredPartner(partner.id)}
                                onMouseLeave={() => setHoveredPartner(null)}
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative z-10">
                                    {/* Icon/Logo Area */}
                                    <div className="mb-6 flex items-center space-x-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-400">
                                            <Building size={24} className="text-slate-600 transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-medium tracking-wider text-orange-500 uppercase">{partner.category}</div>
                                            <h4 className="text-lg font-bold text-slate-700 transition-colors duration-300 group-hover:text-slate-800">
                                                {partner.name}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Partner Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-500">Projects:</span>
                                            <span className="text-sm font-semibold text-slate-700">{partner.projects}</span>
                                        </div>
                                        <div className="border-t border-slate-200 pt-3">
                                            <p className="text-sm text-slate-600">{partner.specialization}</p>
                                        </div>
                                    </div>

                                    {/* Hover Effect Indicator */}
                                    <div
                                        className={`mt-4 flex items-center text-orange-500 transition-all duration-300 ${
                                            hoveredPartner === partner.id ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-0'
                                        }`}
                                    >
                                        <span className="text-sm font-medium">View Details</span>
                                        <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </div>

                                {/* Animated Border */}
                                <div
                                    className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-orange-500 via-blue-600 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                                    style={{ padding: '2px' }}
                                >
                                    <div className="h-full w-full rounded-3xl bg-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div
                    className={`text-center transition-all delay-1000 duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-12 shadow-xl">
                        <h3 className="mb-4 text-3xl font-bold text-slate-700">Ready to Partner with Us?</h3>
                        <p className="mb-8 text-lg text-slate-600">Join our network of trusted partners and unlock new opportunities for growth.</p>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/partnerships"
                                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
                            >
                                Become a Partner
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50"
                            >
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            {/* <div
                className="absolute top-20 left-10 h-16 w-16 animate-bounce rounded-full bg-orange-500/10"
                style={{ animationDuration: '6s', animationDelay: '0s' }}
            />
            <div
                className="absolute top-40 right-20 h-12 w-12 animate-bounce rounded-full bg-blue-600/10"
                style={{ animationDuration: '6s', animationDelay: '-2s' }}
            />
            <div
                className="absolute bottom-40 left-20 h-10 w-10 animate-bounce rounded-full bg-orange-500/15"
                style={{ animationDuration: '6s', animationDelay: '-4s' }}
            /> */}
        </section>
    );
};

export default Partners;
