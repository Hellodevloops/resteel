import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Building, Building2, ExternalLink, Eye, Factory, Play, Ruler, Square, SquareStack, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';

// Utility function to truncate text with responsive word count
const truncateText = (text: string, maxWords: number) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
};

// Enhanced responsive hook with multiple breakpoints
const useResponsiveBreakpoints = () => {
    const [breakpoint, setBreakpoint] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            setBreakpoint({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    return breakpoint;
};

// Interface for building data
interface Building {
    id: number;
    title: string;
    status: string;
    type: string;
    category: string;
    construction: string;
    image: string;
    specifications: Array<{
        name: string;
        dimensions: string;
        area: string;
    }>;
    totalArea: string;
    hasVideo: boolean;
    videoUrls?: string[];
    featured: boolean;
    year_built?: string;
    location?: string;
    description?: string;
}

const Buildings = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [filter, setFilter] = useState('all');
    const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        setTimeout(() => setIsVisible(true), 100);

        // Fetch warehouse data from the backend
        const fetchWarehouses = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/featured-warehouses');
                if (response.data && response.data.warehouses) {
                    setBuildings(response.data.warehouses);
                } else {
                    setError('No warehouses found');
                }
            } catch (err) {
                console.error('Error fetching warehouses:', err);
                setError('Failed to load warehouses');
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouses();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const buildingTypes = [
        { id: 'all', label: 'All Buildings', shortLabel: 'All', icon: Building2, color: 'from-slate-600 to-slate-700' },
        { id: 'warehouses', label: 'Warehouses', shortLabel: 'Warehouse', icon: Warehouse, color: 'from-orange-500 to-orange-600' },
        { id: 'commercial', label: 'Commercial', shortLabel: 'Commercial', icon: Factory, color: 'from-blue-600 to-blue-700' },
        { id: 'industrial', label: 'Industrial', shortLabel: 'Industrial', icon: SquareStack, color: 'from-teal-500 to-teal-600' },
    ];

    const filteredBuildings = filter === 'all' ? buildings : buildings.filter((building) => building.type === filter);

    const getTextTruncation = () => ({
        title: isMobile ? 6 : isTablet ? 10 : 15,
        construction: isMobile ? 8 : isTablet ? 12 : 20,
        specsToShow: isMobile ? 1 : 2,
    });

    const BuildingCard = ({ building, index }: { building: Building; index: number }) => {
        const truncation = getTextTruncation();

        return (
            <div
                className={`group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-700 hover:shadow-2xl hover:shadow-slate-900/20 ${isMobile ? 'min-h-[420px] hover:-translate-y-1' : 'min-h-[500px] hover:-translate-y-2'} md:rounded-2xl lg:min-h-[550px] lg:rounded-3xl lg:hover:-translate-y-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ animationDelay: `${800 + index * 100}ms` }}
            >
                {/* Mobile-optimized Image Section */}
                <div className={`relative overflow-hidden ${isMobile ? 'h-36' : 'h-48 md:h-56 lg:h-64'}`}>
                    <img
                        src={building.image}
                        alt={building.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                    {/* Mobile-optimized Status Badge */}
                    <div className={`absolute ${isMobile ? 'top-2 left-2' : 'top-3 left-3 lg:top-4 lg:left-4'}`}>
                        <div
                            className={`flex items-center rounded-full bg-orange-500 font-bold text-white shadow-lg ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm lg:px-4 lg:py-2'}`}
                        >
                            <span
                                className={`mr-1 animate-pulse rounded-full bg-white ${isMobile ? 'h-1 w-1' : 'mr-1.5 h-1.5 w-1.5 lg:mr-2 lg:h-2 lg:w-2'}`}
                            ></span>
                            {building.status}
                        </div>
                    </div>

                    {/* Mobile-optimized Video Badge */}
                    {building.hasVideo && (
                        <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-3 right-3 lg:top-4 lg:right-4'}`}>
                            <div
                                className={`flex items-center rounded-full bg-blue-600/90 font-semibold text-white backdrop-blur-sm ${isMobile ? 'px-2 py-1 text-xs' : 'px-2.5 py-1.5 text-sm lg:px-3 lg:py-2'}`}
                            >
                                <Play className={`${isMobile ? 'h-2.5 w-2.5' : 'mr-1 h-3 w-3 lg:h-4 lg:w-4'}`} />
                                {!isMobile && <span className="ml-0.5">Video</span>}
                            </div>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className={`absolute ${isMobile ? 'bottom-2 left-2' : 'bottom-3 left-3 lg:bottom-4 lg:left-4'}`}>
                        <div
                            className={`rounded-lg bg-white/10 font-medium text-white backdrop-blur-sm ${isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}
                        >
                            {building.category}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={`flex flex-col ${isMobile ? 'p-3' : 'p-4 lg:p-6'}`}>
                    {/* Title with responsive truncation */}
                    <h3
                        className={`mb-2 font-bold text-slate-800 transition-colors group-hover:text-orange-500 ${isMobile ? 'text-base' : 'text-lg lg:text-xl'}`}
                    >
                        {truncateText(building.title, truncation.title)}
                    </h3>

                    {/* Total Area Display */}
                    <div className={`mb-3 flex items-center justify-between rounded-lg bg-slate-50 ${isMobile ? 'p-2' : 'p-3 lg:p-4'}`}>
                        <div className="flex items-center">
                            <Square className={`text-orange-500 ${isMobile ? 'mr-1.5 h-4 w-4' : 'mr-2 h-5 w-5'}`} />
                            <span className={`font-medium text-slate-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Total Area</span>
                        </div>
                        <span className={`font-bold text-slate-800 ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>{building.totalArea}</span>
                    </div>

                    {/* Construction Info with responsive truncation */}
                    <div className={`mb-3 ${isMobile ? 'flex-none' : 'flex-1'}`}>
                        <div className="mb-1 flex items-center">
                            <Building className={`text-slate-500 ${isMobile ? 'mr-1.5 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                            <span className={`font-semibold text-slate-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Construction</span>
                        </div>
                        <p className={`leading-relaxed text-slate-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {truncateText(building.construction, truncation.construction)}
                        </p>
                    </div>

                    {/* Specifications Preview */}
                    <div className="mb-4">
                        <div className="mb-1 flex items-center">
                            <Ruler className={`text-slate-500 ${isMobile ? 'mr-1.5 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                            <span className={`font-semibold text-slate-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Specifications</span>
                        </div>
                        <div className="space-y-1">
                            {building.specifications.slice(0, truncation.specsToShow).map((spec, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <span className={`font-medium text-slate-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                        {truncateText(spec.name, truncation.title)}
                                    </span>
                                    <span className={`text-slate-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>{spec.dimensions}</span>
                                </div>
                            ))}
                            {building.specifications.length > truncation.specsToShow && (
                                <div className={`font-medium text-orange-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                    +{building.specifications.length - truncation.specsToShow} more...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2">
                        <Button
                            asChild
                            className={`flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-slate-600 to-slate-700 font-semibold text-white transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600 hover:scale-105 hover:shadow-lg ${isMobile ? 'py-2 text-xs' : 'py-2.5 text-sm'}`}
                        >
                            <Link href={`/buildingsdetails?id=${building.id}`}>
                                <Eye className={`${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                                View Details
                            </Link>
                        </Button>
                        {building.hasVideo && building.videoUrls && building.videoUrls.length > 0 && (
                            <button
                                onClick={() => window.open(building.videoUrls![0], '_blank')}
                                className={`flex items-center justify-center rounded-lg border-2 border-blue-600 font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white ${isMobile ? 'px-2 py-2 text-xs' : 'px-3 py-2.5 text-sm'}`}
                            >
                                <Play className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                            </button>
                        )}
                        <button
                            className={`flex items-center justify-center rounded-lg border-2 border-orange-500 font-semibold text-orange-500 transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white ${isMobile ? 'px-2 py-2 text-xs' : 'px-3 py-2.5 text-sm'}`}
                        >
                            <ExternalLink className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        </button>
                    </div>
                </div>

                {/* Hover effect line */}
                <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 transform bg-gradient-to-r from-orange-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile-optimized Hero Section */}
            <section
                className={`relative flex items-center justify-center overflow-hidden ${isMobile ? 'min-h-[50vh]' : 'min-h-[70vh] lg:min-h-screen'}`}
            >
                <Header />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-700 to-blue-800"
                    style={{ transform: isMobile ? 'none' : `translate3d(0, ${scrollY * 0.3}px, 0)` }}
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

                <div className={`relative z-10 w-full max-w-7xl px-4 ${isMobile ? 'pt-6' : 'pt-12 lg:pt-20'}`}>
                    <div className="text-center text-white">
                        <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                            <div
                                className={`inline-flex items-center rounded-full bg-white/10 font-medium text-white/90 backdrop-blur-sm ${isMobile ? 'mb-3 px-3 py-1.5 text-xs' : 'mb-4 px-4 py-2 text-sm lg:mb-6'}`}
                            >
                                <span
                                    className={`mr-1.5 animate-pulse rounded-full bg-orange-500 ${isMobile ? 'h-1.5 w-1.5' : 'mr-2 h-2 w-2'}`}
                                ></span>
                                {isMobile ? 'Premium Buildings' : 'Premium Industrial Buildings'}
                            </div>
                        </div>

                        <h1
                            className={`leading-tight font-bold transition-all delay-200 duration-1000 ${isMobile ? 'mb-3 text-2xl' : 'mb-4 text-3xl md:text-4xl lg:mb-6 lg:text-5xl xl:text-6xl'} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            Available
                            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Buildings</span>
                        </h1>

                        <p
                            className={`leading-relaxed text-white/80 transition-all delay-400 duration-1000 ${isMobile ? 'mb-4 px-2 text-sm' : 'mb-6 text-base lg:mb-8 lg:text-lg xl:text-xl'} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            {isMobile
                                ? 'Discover industrial buildings ready for purchase and relocation.'
                                : 'Discover our extensive inventory of second-hand industrial buildings, warehouses, and commercial structures ready for purchase and relocation.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mobile-optimized Filter Section */}
            <section
                className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 ${isMobile ? 'py-6' : 'py-12 lg:py-16'}`}
            >
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-600/5"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className={`flex flex-col items-center ${isMobile ? 'gap-4' : 'gap-6 lg:gap-8'}`}>
                        <div className="text-center">
                            <h2 className={`font-bold text-slate-800 ${isMobile ? 'mb-1 text-lg' : 'mb-2 text-2xl lg:text-3xl'}`}>
                                Filter Buildings
                            </h2>
                            <p className={`text-slate-600 ${isMobile ? 'text-sm' : 'text-base'}`}>Find the perfect building for your needs</p>
                        </div>

                        <div className="w-full max-w-4xl">
                            <div className={`flex flex-wrap justify-center ${isMobile ? 'gap-2' : 'gap-3 lg:gap-4'}`}>
                                {buildingTypes.map((type, index) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setFilter(type.id)}
                                        className={`flex items-center rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm lg:px-6 lg:py-3'} ${
                                            filter === type.id
                                                ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                                                : 'border-2 border-white/50 bg-white/80 text-slate-600 backdrop-blur-sm hover:border-orange-500 hover:text-orange-500'
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <type.icon className={`flex-shrink-0 ${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                                        <span className="whitespace-nowrap">{isMobile ? type.shortLabel : type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile-optimized Buildings Grid */}
            <section className={`bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 ${isMobile ? 'py-6' : 'py-12 lg:py-20'}`}>
                <div className="mx-auto max-w-11/12 px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className={`text-center ${isMobile ? 'px-4 py-8' : 'py-20'}`}>
                            <div
                                className={`mx-auto flex items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm ${isMobile ? 'mb-4 h-16 w-16' : 'mb-6 h-20 w-20 lg:h-24 lg:w-24'}`}
                            >
                                <Building className={`text-slate-400 ${isMobile ? 'h-8 w-8' : 'h-10 w-10 lg:h-12 lg:w-12'}`} />
                            </div>
                            <h3 className={`font-bold text-slate-700 ${isMobile ? 'mb-2 text-lg' : 'mb-3 text-xl lg:mb-4 lg:text-2xl'}`}>
                                Loading...
                            </h3>
                        </div>
                    ) : error ? (
                        <div className={`text-center ${isMobile ? 'px-4 py-8' : 'py-20'}`}>
                            <div
                                className={`mx-auto flex items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm ${isMobile ? 'mb-4 h-16 w-16' : 'mb-6 h-20 w-20 lg:h-24 lg:w-24'}`}
                            >
                                <Building className={`text-slate-400 ${isMobile ? 'h-8 w-8' : 'h-10 w-10 lg:h-12 lg:w-12'}`} />
                            </div>
                            <h3 className={`font-bold text-slate-700 ${isMobile ? 'mb-2 text-lg' : 'mb-3 text-xl lg:mb-4 lg:text-2xl'}`}>{error}</h3>
                            <button
                                onClick={() => setFilter('all')}
                                className={`rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 font-semibold text-white transition-all duration-300 hover:scale-105 ${isMobile ? 'px-6 py-2.5 text-sm' : 'px-8 py-3 text-base'}`}
                            >
                                Show All Buildings
                            </button>
                        </div>
                    ) : filteredBuildings.length > 0 ? (
                        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12'}`}>
                            {filteredBuildings.map((building, index) => (
                                <BuildingCard key={building.id} building={building} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center ${isMobile ? 'px-4 py-8' : 'py-20'}`}>
                            <div
                                className={`mx-auto flex items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm ${isMobile ? 'mb-4 h-16 w-16' : 'mb-6 h-20 w-20 lg:h-24 lg:w-24'}`}
                            >
                                <Building className={`text-slate-400 ${isMobile ? 'h-8 w-8' : 'h-10 w-10 lg:h-12 lg:w-12'}`} />
                            </div>
                            <h3 className={`font-bold text-slate-700 ${isMobile ? 'mb-2 text-lg' : 'mb-3 text-xl lg:mb-4 lg:text-2xl'}`}>
                                No buildings found
                            </h3>
                            <p className={`text-slate-500 ${isMobile ? 'mb-4 text-sm' : 'mb-6 text-base'}`}>
                                Try adjusting your filter to see more results
                            </p>
                            <button
                                onClick={() => setFilter('all')}
                                className={`rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 font-semibold text-white transition-all duration-300 hover:scale-105 ${isMobile ? 'px-6 py-2.5 text-sm' : 'px-8 py-3 text-base'}`}
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
