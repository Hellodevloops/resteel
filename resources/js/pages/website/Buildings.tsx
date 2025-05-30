import { ArrowRight, Building, Building2, ExternalLink, Eye, Factory, Play, Ruler, Square, SquareStack, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Buildings = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        setTimeout(() => setIsVisible(true), 100);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Add your buildings data here
    const buildingsData = [
        {
            id: 1,
            title: '3 Warehouses',
            status: 'SALE',
            type: 'warehouses',
            category: 'Industrial Warehouses',
            construction: 'Steel construction',
            images: ['/assets/3_Warehouses.png'],
            specifications: [
                { name: 'Warehouse 1', dimensions: '44 x 88 m²', area: '3,872 m²' },
                { name: 'Warehouse 2', dimensions: '50 x 50 m²', area: '2,500 m²' },
                { name: 'Warehouse 3', dimensions: '20 x 50 m²', area: '1,000 m²' },
            ],
            totalArea: '7,372 m²',
            hasVideo: false,
            featured: true,
        },
        {
            id: 2,
            title: '3 Business Premises',
            status: 'SALE',
            type: 'business-premises',
            category: 'Industrial Buildings',
            construction: 'Steel construction, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Possibly Ytong concrete wall panels',
            images: ['/assets/3_Business_Premises.png'],
            specifications: [
                {
                    name: 'Hall No.1',
                    dimensions: '75 x 225 m',
                    area: '16,875 m²',
                    gutterHeight: '8.80 meters',
                    ridgeHeight: '12.5 meters',
                },
                {
                    name: 'Hall No.2',
                    dimensions: '50 x 90 m',
                    area: '4,500 m²',
                    gutterHeight: '8.80 meters',
                    ridgeHeight: '12.5 meters',
                },
                {
                    name: 'Hall No.3',
                    dimensions: '75 x 190 m',
                    area: '14,250 m²',
                    gutterHeight: '8.80 meters',
                    ridgeHeight: '12.5 meters',
                },
            ],
            totalArea: '35,625 m²',
            hasVideo: true,
            videoLinks: ['https://youtu.be/OFdFeEPyapU?si=q3J5k0PIjzAp2wH2', 'https://youtu.be/hP-YuahiFBQ?si=VaFagc0fpMFYSKYF'],
            featured: true,
        },
        {
            id: 3,
            title: 'Mystery Box: 37.000m2 (3 warehouses available soon)',
            status: 'SALE',
            type: 'mystery-warehouses',
            category: 'Industrial Warehouses',
            construction: 'Steel construction, Sandwich wall panels and glass, Isolated roof panels, Windows and doors included',
            images: ['/assets/Mystery_Box.webp'],
            specifications: [
                {
                    name: 'Hall No.1',
                    dimensions: '75 x 225 m',
                    area: '16,875 m²',
                    gutterHeight: '8.80 meters',
                    ridgeHeight: '12.5 meters',
                },
                {
                    name: 'Hall No.2',
                    dimensions: '50 x 90 m',
                    area: '4,500 m²',
                    gutterHeight: '8.80 meters',
                    ridgeHeight: '12.5 meters',
                },
                {
                    name: 'Hall No.3',
                    dimensions: '75 x 190 m',
                    area: '14,250 m²',
                    gutterHeight: '8.80 meters',
                    ridgeHeight: '12.5 meters',
                },
            ],
            totalArea: '37,000 m²',
            hasVideo: false,
            featured: true,
        },
    ];

    const buildingTypes = [
        { id: 'all', label: 'All Buildings', icon: Building2, color: 'from-slate-600 to-slate-700' },
        { id: 'warehouses', label: 'Warehouses', icon: Warehouse, color: 'from-orange-500 to-orange-600' },
        { id: 'commercial', label: 'Commercial', icon: Factory, color: 'from-blue-600 to-blue-700' },
        { id: 'industrial', label: 'Industrial', icon: SquareStack, color: 'from-teal-500 to-teal-600' },
    ];

    const filteredBuildings = buildingsData.filter((building) => filter === 'all' || building.type === filter);

    const BuildingCard = ({ building, index }) => {
        return (
            <div
                className={`group relative mt-22 overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-900/20 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
            >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                    <img
                        src={building.images[0]}
                        alt={building.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white"></span>
                            {building.status}
                        </div>
                    </div>

                    {/* Video Badge */}
                    {building.hasVideo && (
                        <div className="absolute top-4 right-4">
                            <div className="flex items-center rounded-full bg-blue-600/90 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                                <Play className="mr-1 h-3 w-3" />
                                Video Available
                            </div>
                        </div>
                    )}

                    {/* Category Label */}
                    <div className="absolute bottom-4 left-4">
                        <div className="rounded-lg bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">{building.category}</div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="mb-4 text-xl font-bold text-slate-800 transition-colors group-hover:text-orange-500">{building.title}</h3>

                    {/* Total Area Display */}
                    <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <div className="flex items-center">
                            <Square className="mr-2 h-5 w-5 text-orange-500" />
                            <span className="text-sm font-medium text-slate-600">Total Area</span>
                        </div>
                        <span className="text-lg font-bold text-slate-800">{building.totalArea}</span>
                    </div>

                    {/* Construction Info */}
                    <div className="mb-6">
                        <div className="mb-2 flex items-center">
                            <Building className="mr-2 h-4 w-4 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-600">Construction</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">{building.construction}</p>
                    </div>

                    {/* Specifications Preview */}
                    <div className="mb-6">
                        <div className="mb-3 flex items-center">
                            <Ruler className="mr-2 h-4 w-4 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-600">Specifications</span>
                        </div>
                        <div className="space-y-2">
                            {building.specifications.slice(0, 2).map((spec, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700">{spec.name}</span>
                                    <span className="text-slate-600">{spec.dimensions}</span>
                                </div>
                            ))}
                            {building.specifications.length > 2 && (
                                <div className="text-sm font-medium text-orange-500">+{building.specifications.length - 2} more...</div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Link
                            to={`/buildingsdetails`}
                            className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600 hover:scale-105 hover:shadow-lg"
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Link>

                        {building.hasVideo && (
                            <button
                                onClick={() => building.videoLinks && window.open(building.videoLinks[0], '_blank')}
                                className="flex items-center justify-center rounded-xl border-2 border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white"
                            >
                                <Play className="h-4 w-4" />
                            </button>
                        )}

                        <button className="flex items-center justify-center rounded-xl border-2 border-orange-500 px-4 py-3 text-sm font-semibold text-orange-500 transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white">
                            <ExternalLink className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Hover Effect Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 transform bg-gradient-to-r from-orange-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Background with parallax */}
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

                {/* Hero Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                                Premium Industrial Buildings
                            </div>
                        </div>

                        <h1
                            className={`mb-6 text-5xl leading-tight font-bold transition-all delay-200 duration-1000 lg:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Available
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Buildings</span>
                        </h1>

                        <p
                            className={`mb-8 text-xl leading-relaxed text-white/80 transition-all delay-400 duration-1000 lg:text-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Discover our extensive inventory of second-hand industrial buildings, warehouses, and commercial structures ready for
                            purchase and relocation.
                        </p>

                        <div
                            className={`flex flex-col gap-4 transition-all delay-600 duration-1000 sm:flex-row sm:justify-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <button className="animate-pulse rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25">
                                Browse Inventory
                            </button>
                            <button className="rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                                Contact Sales Team
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-16">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    {/* Floating Elements */}
                    <div
                        className="absolute top-20 left-10 h-20 w-20 animate-bounce rounded-full bg-orange-500/10"
                        style={{ animationDuration: '8s', animationDelay: '0s' }}
                    ></div>
                    <div
                        className="absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full bg-blue-600/10"
                        style={{ animationDuration: '8s', animationDelay: '-3s' }}
                    ></div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-600/5"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4">
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-center">
                            <h2 className="mb-2 text-3xl font-bold text-slate-800">Filter Buildings</h2>
                            <p className="text-slate-600">Find the perfect building for your needs</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            {buildingTypes.map((type, index) => (
                                <button
                                    key={type.id}
                                    onClick={() => setFilter(type.id)}
                                    className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 ${
                                        filter === type.id
                                            ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                                            : 'border-2 border-white/50 bg-white/80 text-slate-600 backdrop-blur-sm hover:border-orange-500 hover:text-orange-500'
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <type.icon className="mr-2 inline h-4 w-4" />
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Buildings Grid */}
            <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-20">
                <div className="mx-auto max-w-7xl px-4">
                    {filteredBuildings.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredBuildings.map((building, index) => (
                                <BuildingCard key={building.id} building={building} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm">
                                <Building className="h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-slate-700">No buildings found</h3>
                            <p className="mb-6 text-slate-500">Try adjusting your filter to see more results</p>
                            <button
                                onClick={() => setFilter('all')}
                                className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
                            >
                                Show All Buildings
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800 py-20">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(244, 70, 17, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(30, 76, 138, 0.3) 0%, transparent 50%)`,
                        }}
                    ></div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
                    <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
                        Ready to Start
                        <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Your Project?</span>
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-white/80">
                        Our team of experts is ready to help you find the perfect building solution. Contact us today for personalized assistance.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <button className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                            <ArrowRight className="mr-2 inline h-5 w-5" />
                            Get Started Today
                        </button>
                        <button className="rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                            Schedule Consultation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Buildings;
