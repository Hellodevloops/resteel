import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Building, Building2, Eye, Factory, Play, SquareStack, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

// Utility function to truncate text
const truncateText = (text: string, maxWords: number) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

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

interface Building {
    id: number;
    title: string;
    status: string;
    type: string;
    category: string;
    construction: string;
    image: string;
    specifications: {
        name: string;
        dimensions: string;
        area: string;
    }[];
    totalArea: string;
    hasVideo: boolean;
    videoUrls?: string[];
    featured: boolean;
    year_built?: string;
    location?: string;
    description?: string;
}

const Buildings = () => {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [filter, setFilter] = useState('all');
    const { isMobile, isTablet } = useResponsiveBreakpoints();
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const buildingTypes = [
        { id: 'all', label: t('all_buildings'), icon: Building2 },
        { id: 'warehouses', label: t('warehouses'), icon: Warehouse },
        { id: 'commercial', label: t('commercial'), icon: Factory },
        { id: 'industrial', label: t('industrial'), icon: SquareStack },
    ];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        setTimeout(() => setIsVisible(true), 100);

        const fetchWarehouses = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/warehouses');
                if (response.data && response.data.data) {
                    const transformed: Building[] = response.data.data.map((item: any) => ({
                        id: item.id,
                        title: item.name || t('untitled'),
                        status: item.status || t('unknown'),
                        type: item.type || t('unknown'),
                        category: item.category || t('not_available'),
                        construction: item.construction || t('not_available'),
                        image: item.image_path
                            ? item.image_path.startsWith('/storage')
                                ? `${location.origin}${item.image_path}`
                                : item.image_path
                            : 'https://via.placeholder.com/600x400?text=No+Image',
                        totalArea: item.total_area ? `${item.total_area} ${item.unit_of_measurement || ''}` : t('not_available'),
                        hasVideo: item.has_video || false,
                        videoUrls: (item.video_urls || []).filter((v: string | null) => !!v),
                        featured: false,
                        year_built: item.year_built || '',
                        location: item.location || '',
                        description: item.description || '',
                        specifications: [
                            {
                                name: t('main_hall'),
                                dimensions: item.main_hall_dimensions || t('not_available'),
                                area: item.main_hall_area || t('not_available'),
                            },
                            {
                                name: t('office_space'),
                                dimensions: item.office_space_dimensions || t('not_available'),
                                area: item.office_space_area || t('not_available'),
                            },
                            {
                                name: t('loading_dock'),
                                dimensions: item.loading_dock_dimensions || t('not_available'),
                                area: item.loading_dock_area || t('not_available'),
                            },
                        ].filter((spec) => spec.dimensions !== t('not_available') || spec.area !== t('not_available')),
                    }));

                    setBuildings(transformed);
                } else {
                    setError(t('no_buildings_found'));
                }
            } catch (err) {
                console.error('Error fetching buildings:', err);
                setError(t('failed_to_load_buildings'));
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouses();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [t]);

    const filteredBuildings = filter === 'all' ? buildings : buildings.filter((b) => b.type === filter);

    const getTextTruncation = () => ({
        title: isMobile ? 6 : isTablet ? 10 : 15,
        construction: isMobile ? 8 : isTablet ? 12 : 20,
        specsToShow: isMobile ? 1 : 2,
    });

    const BuildingCard = ({ building }: { building: Building }) => {
        const truncation = getTextTruncation();

        return (
            <div className="flex flex-col h-full rounded-xl bg-white p-4 pt-10 shadow-md transition-all hover:shadow-lg">
                {/* Image Container with Fixed Height */}
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
                    <img 
                        src={building.image} 
                        alt={building.title} 
                        className="h-full w-full object-cover" 
                    />
                </div>

                {/* Content Container with Flex Grow */}
                <div className="flex flex-col flex-grow">
                    {/* Title with Fixed Height */}
                    <div className="mb-2 min-h-[2.5rem]">
                        <h3 className="text-lg font-bold line-clamp-2">{truncateText(building.title, truncation.title)}</h3>
                    </div>

                    {/* Description with Fixed Height */}
                    <div className="mb-2 min-h-[2.5rem]">
                        <p className="text-sm text-gray-600 line-clamp-2">{truncateText(building.construction, truncation.construction)}</p>
                    </div>

                    {/* Total Area with Fixed Height */}
                    <div className="mb-4 min-h-[1.5rem]">
                        <p className="text-sm font-semibold text-gray-700">
                            {t('total_area')}: {building.totalArea}
                        </p>
                    </div>

                    {/* Specifications with Fixed Height */}
                    <div className="mb-4 flex-grow min-h-[4rem]">
                        <div className="space-y-1 text-sm text-gray-700">
                            {building.specifications.slice(0, truncation.specsToShow).map((spec, i) => (
                                <div key={i} className="flex justify-between">
                                    <span className="truncate">{spec.name}</span>
                                    <span className="truncate ml-2">{spec.dimensions}</span>
                                </div>
                            ))}
                            {building.specifications.length > truncation.specsToShow && (
                                <div className="text-orange-500">
                                    +{building.specifications.length - truncation.specsToShow} {t('more')}...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons - Always at Bottom */}
                    <div className="flex gap-2 mt-auto">
                        <Button asChild className="flex-1">
                            <Link href={`/building-details/${building.id}`}>
                                <Eye className="mr-1 h-4 w-4" />
                                {t('view')}
                            </Link>
                        </Button>
                        {building.hasVideo && building.videoUrls && building.videoUrls[0] && (
                            <Button variant="outline" onClick={() => window.open(building.videoUrls![0], '_blank')}>
                                <Play className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <Layout title={`Resteel | ${t('hero_title')}`}>
                <div className="relative bg-gradient-to-br from-slate-50 via-white to-orange-50 min-h-screen">
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                    <Header />
                    <main className="relative mx-auto max-w-7xl px-4 py-8 pt-32 sm:px-6 lg:px-8">
                        <div className="text-center">
                            {/* Loading Header */}
                            <div className="mb-8">
                                <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl mb-4">
                                    {t('our_properties') || 'Our Properties'}
                                </h1>
                                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                            </div>
                            
                            {/* Loading Animation */}
                            <div className="flex items-center justify-center py-16">
                                <div className="text-center">
                                    <div className="relative mb-6">
                                        <div className="h-16 w-16 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin mx-auto"></div>
                                        <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-orange-400 animate-ping opacity-20"></div>
                                    </div>
                                    <p className="text-lg font-medium text-slate-700">{t('loading_properties') || 'Loading Properties...'}</p>
                                    <p className="text-sm text-slate-500 mt-2">{t('fetching_latest_listings') || 'Fetching the latest property listings for you'}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title={`Resteel | ${t('hero_title')}`}>
                <div className="relative bg-gradient-to-br from-slate-50 via-white to-orange-50 min-h-screen">
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                    <Header />
                    <main className="relative mx-auto max-w-7xl px-4 py-8 pt-32 sm:px-6 lg:px-8">
                        <div className="text-center">
                            {/* Error Header */}
                            <div className="mb-8">
                                <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl mb-4">
                                    {t('our_properties') || 'Our Properties'}
                                </h1>
                                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                            </div>
                            
                            {/* Error Content */}
                            <div className="flex items-center justify-center py-16">
                                <div className="text-center max-w-md">
                                    <div className="mb-6">
                                        <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                            <div className="text-4xl">⚠️</div>
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold text-slate-900">{t('unable_to_load_properties') || 'Unable to Load Properties'}</h3>
                                    <p className="text-red-600 mb-6">{error}</p>
                                    <Button 
                                        onClick={() => window.location.reload()} 
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                                    >
                                        {t('refresh_page') || 'Refresh Page'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`Resteel | ${t('hero_title')}`}>
            {/* Hero Section with Enhanced Header */}
            <div className="relative bg-gradient-to-br from-slate-50 via-white to-orange-50">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                
                <main className="relative mt-20 min-h-screen sm:mt-30">
                    {/* Hero Header Section */}
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            {/* Main Title */}
                            <div className="mb-6">
                                <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                                    {t('our_properties') || 'Our Properties'}
                                </h1>
                                <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                            </div>
                            
                           
                           
                            
                         
                        </div>
                    </div>

                    {/* Enhanced Filter Section */}
                    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                           
                            <div className="flex flex-wrap justify-center gap-3">
                                {buildingTypes.map((type) => {
                                    const IconComponent = type.icon;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => setFilter(type.id)}
                                            className={`group relative flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                                                filter === type.id 
                                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 scale-105' 
                                                    : 'border-2 border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:scale-105'
                                            }`}
                                        >
                                            <IconComponent className={`h-5 w-5 transition-colors ${
                                                filter === type.id ? 'text-white' : 'text-slate-500 group-hover:text-orange-600'
                                            }`} />
                                            {type.label}
                                            {filter === type.id && (
                                                <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-400 rounded-full animate-pulse"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        {filteredBuildings.length === 0 ? (
                            <div className="py-16 text-center">
                                <div className="mb-6">
                                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                        <div className="text-4xl">🏗️</div>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-2xl font-bold text-slate-900">{t('no_buildings_found')}</h3>
                                <p className="text-slate-600 max-w-md mx-auto">{t('try_different_filter') || 'Try selecting a different filter to see more options'}</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
                                {filteredBuildings.map((building) => (
                                    <BuildingCard key={building.id} building={building} />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default Buildings;
