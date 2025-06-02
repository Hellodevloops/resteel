import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Building, Building2, ExternalLink, Eye, Factory, Play, Ruler, Square, SquareStack, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';

// Utility function to truncate text to 19 words
const truncateText = (text: string, maxWords: number = 19) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
};

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

    const BuildingCard = ({ building, index }: { building: (typeof buildingsData)[0]; index: number }) => {
        return (
            <div
                className={
                    'group relative min-h-[500px] overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/20 sm:min-h-[600px] sm:rounded-3xl sm:hover:-translate-y-3 ' +
                    (isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0')
                }
                style={{ animationDelay: `${800 + index * 100}ms` }}
            >
                {/* Image Section with responsive height */}
                <div className="relative h-48 overflow-hidden sm:h-56 md:h-72">
                    <img
                        src={building.images[0]}
                        alt={building.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <div className="flex items-center rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg sm:px-4 sm:py-2 sm:text-sm">
                            <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-white sm:mr-2 sm:h-2 sm:w-2"></span>
                            {building.status}
                        </div>
                    </div>
                    {building.hasVideo && (
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                            <div className="flex items-center rounded-full bg-blue-600/90 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-2">
                                <Play className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                <span className="xs:inline hidden">Video Available</span>
                                <span className="xs:hidden">Video</span>
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                        <div className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm sm:px-3 sm:text-sm">
                            {building.category}
                        </div>
                    </div>
                </div>

                {/* Content Section with responsive padding and layout */}
                <div className="flex h-[calc(100%-12rem)] flex-col p-4 sm:h-[calc(100%-14rem)] sm:p-6 md:h-[calc(100%-18rem)]">
                    {/* Title with responsive text size */}
                    <h3 className="mb-3 text-lg leading-tight font-bold text-slate-800 transition-colors group-hover:text-orange-500 sm:mb-4 sm:text-xl">
                        {truncateText(building.title, window.innerWidth < 640 ? 12 : 19)}
                    </h3>

                    {/* Total Area Display with responsive padding */}
                    <div className="mb-3 flex items-center justify-between rounded-lg bg-slate-50 p-3 sm:mb-4 sm:rounded-xl sm:p-4">
                        <div className="flex items-center">
                            <Square className="mr-1.5 h-4 w-4 text-orange-500 sm:mr-2 sm:h-5 sm:w-5" />
                            <span className="text-xs font-medium text-slate-600 sm:text-sm">Total Area</span>
                        </div>
                        <span className="text-base font-bold text-slate-800 sm:text-lg">{building.totalArea}</span>
                    </div>

                    {/* Construction Info with responsive spacing */}
                    <div className="mb-4 flex-1 sm:mb-6">
                        <div className="mb-2 flex items-center">
                            <Building className="mr-1.5 h-3.5 w-3.5 text-slate-500 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="text-xs font-semibold text-slate-600 sm:text-sm">Construction</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                            {truncateText(building.construction, window.innerWidth < 640 ? 15 : 19)}
                        </p>
                    </div>

                    {/* Specifications Preview with responsive layout */}
                    <div className="mb-4 sm:mb-6">
                        <div className="mb-2 flex items-center sm:mb-3">
                            <Ruler className="mr-1.5 h-3.5 w-3.5 text-slate-500 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="text-xs font-semibold text-slate-600 sm:text-sm">Specifications</span>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                            {building.specifications.slice(0, window.innerWidth < 640 ? 1 : 2).map((spec, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                                    <span className="mr-2 flex-1 font-medium text-slate-700">
                                        {truncateText(spec.name, window.innerWidth < 640 ? 10 : 19)}
                                    </span>
                                    <span className="text-right whitespace-nowrap text-slate-600">{spec.dimensions}</span>
                                </div>
                            ))}
                            {building.specifications.length > (window.innerWidth < 640 ? 1 : 2) && (
                                <div className="text-xs font-medium text-orange-500 sm:text-sm">
                                    +{building.specifications.length - (window.innerWidth < 640 ? 1 : 2)} more...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons with responsive layout */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Button
                            asChild
                            className="flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-slate-600 to-slate-700 py-2.5 text-xs font-semibold text-white transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600 hover:scale-105 hover:shadow-lg sm:rounded-xl sm:py-3 sm:text-sm"
                        >
                            <Link href="/buildingsdetails">
                                <Eye className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                                View Details
                            </Link>
                        </Button>

                        <div className="flex gap-2 sm:gap-3">
                            {building.hasVideo && (
                                <button
                                    onClick={() => building.videoLinks && window.open(building.videoLinks[0], '_blank')}
                                    className="flex flex-1 items-center justify-center rounded-lg border-2 border-blue-600 px-3 py-2.5 text-xs font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white sm:flex-none sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
                                >
                                    <Play className="h-3.5 w-3.5 sm:mr-1 sm:h-4 sm:w-4" />
                                    <span className="ml-1 hidden sm:inline">Play</span>
                                </button>
                            )}
                            <button className="flex flex-1 items-center justify-center rounded-lg border-2 border-orange-500 px-3 py-2.5 text-xs font-semibold text-orange-500 transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white sm:flex-none sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">
                                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 transform bg-gradient-to-r from-orange-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with mobile optimizations */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                <Header />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800"
                    style={{ transform: `translate3d(0, ${scrollY * 0.3}px, 0)` }}
                >
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

                <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
                    <div className="text-center text-white">
                        <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                                <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 sm:mr-2 sm:h-2 sm:w-2"></span>
                                Premium Industrial Buildings
                            </div>
                        </div>

                        <h1
                            className={`mb-4 text-3xl leading-tight font-bold transition-all delay-200 duration-1000 sm:mb-6 sm:text-5xl lg:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Available
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Buildings</span>
                        </h1>

                        <p
                            className={`mb-6 px-4 text-base leading-relaxed text-white/80 transition-all delay-400 duration-1000 sm:mb-8 sm:px-0 sm:text-xl lg:text-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Discover our extensive inventory of second-hand industrial buildings, warehouses, and commercial structures ready for
                            purchase and relocation.
                        </p>

                        <div
                            className={`flex flex-col gap-4 transition-all delay-600 duration-1000 sm:flex-row sm:justify-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        ></div>
                    </div>
                </div>
            </section>

            {/* Filter Section with mobile optimizations */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-12 sm:py-16">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-600/5"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4">
                    <div className="flex flex-col items-center gap-6 sm:gap-8">
                        <div className="text-center">
                            <h2 className="mb-2 text-2xl font-bold text-slate-800 sm:text-3xl">Filter Buildings</h2>
                            <p className="text-sm text-slate-600 sm:text-base">Find the perfect building for your needs</p>
                        </div>

                        <div className="flex max-w-full flex-wrap justify-center gap-2 sm:gap-4">
                            {buildingTypes.map((type, index) => (
                                <button
                                    key={type.id}
                                    onClick={() => setFilter(type.id)}
                                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 hover:scale-105 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm ${
                                        filter === type.id
                                            ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                                            : 'border-2 border-white/50 bg-white/80 text-slate-600 backdrop-blur-sm hover:border-orange-500 hover:text-orange-500'
                                    } whitespace-nowrap`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <type.icon className="mr-1 inline h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                                    <span className="xs:inline hidden">{type.label}</span>
                                    <span className="xs:hidden">{type.label.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Buildings Grid with mobile optimizations */}
            <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-12 sm:py-20">
                <div className="mx-auto max-w-7xl px-4">
                    {filteredBuildings.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                            {filteredBuildings.map((building, index) => (
                                <BuildingCard key={building.id} building={building} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-12 text-center sm:py-20">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm sm:mb-6 sm:h-24 sm:w-24">
                                <Building className="h-8 w-8 text-slate-400 sm:h-12 sm:w-12" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-700 sm:mb-4 sm:text-2xl">No buildings found</h3>
                            <p className="mb-4 text-sm text-slate-500 sm:mb-6 sm:text-base">Try adjusting your filter to see more results</p>
                            <button
                                onClick={() => setFilter('all')}
                                className="rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
                            >
                                Show All Buildings
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Buildings;
