import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Building, Building2, Eye, Factory, Play, Warehouse } from 'lucide-react';
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

interface ApiWarehouse {
    id: number;
    name?: string;
    status?: string;
    type?: string;
    category?: string;
    construction?: string;
    image_path?: string;
    total_area?: string;
    unit_of_measurement?: string;
    has_video: boolean;
    video_urls?: string[];
    year_built?: string;
    location?: string;
    description?: string;
    area_dimensions?: Array<{
        name: string;
        dimensions: string;
        area: string;
    }>;
    // OLD FIELDS - for backward compatibility
    main_hall_dimensions?: string;
    main_hall_area?: string;
    office_space_dimensions?: string;
    office_space_area?: string;
    loading_dock_dimensions?: string;
    loading_dock_area?: string;
}

const Buildings = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('all');
    const { isMobile, isTablet } = useResponsiveBreakpoints();
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const buildingTypes = [
        { id: 'all', label: t('all_buildings'), icon: Building2 },
        { id: 'warehouses', label: t('warehouses'), icon: Warehouse },
        { id: 'steelconstructions', label: t('steel_constructions'), icon: Factory },
        { id: 'other', label: t('other') },
        // { id: 'industrial', label: t('industrial'), icon: SquareStack },
    ];

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/warehouses');
                if (response.data && response.data.data) {
                    const transformed: Building[] = response.data.data.map((item: ApiWarehouse) => {
                        // Convert area_dimensions array or fall back to old fields
                        let specifications: Array<{ name: string; dimensions: string; area: string }> = [];

                        if (item.area_dimensions && item.area_dimensions.length > 0) {
                            // Use new area_dimensions array
                            specifications = item.area_dimensions.filter((dim) => dim.name || dim.dimensions || dim.area);
                        } else {
                            // Fall back to old fields for backward compatibility
                            specifications = [
                                {
                                    name: t('main_hall'),
                                    dimensions: item.main_hall_dimensions || 'Not Available',
                                    area: item.main_hall_area || 'Not Available',
                                },
                                {
                                    name: t('office_space'),
                                    dimensions: item.office_space_dimensions || 'Not Available',
                                    area: item.office_space_area || 'Not Available',
                                },
                                {
                                    name: t('loading_dock'),
                                    dimensions: item.loading_dock_dimensions || 'Not Available',
                                    area: item.loading_dock_area || 'Not Available',
                                },
                            ].filter((spec) => spec.dimensions !== 'Not Available' || spec.area !== 'Not Available');
                        }

                        return {
                            id: item.id,
                            title: item.name || t('untitled'),
                            status: item.status || t('unknown'),
                            type: item.type || t('unknown'),
                            category: item.category || 'Not Available',
                            construction: item.construction || 'Not Available',
                            image: item.image_path
                                ? item.image_path.startsWith('/storage')
                                    ? `${location.origin}${item.image_path}`
                                    : item.image_path
                                : 'https://via.placeholder.com/600x400?text=No+Image',
                            totalArea: item.total_area ? `${item.total_area} ${item.unit_of_measurement || ''}` : 'Not Available',
                            hasVideo: item.has_video || false,
                            videoUrls: (item.video_urls || []).filter((v: string | null) => !!v),
                            featured: false,
                            year_built: item.year_built || '',
                            location: item.location || '',
                            description: item.description || '',
                            specifications: specifications,
                        };
                    });

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
    }, [t]);

    const filteredBuildings = filter === 'all' ? buildings : buildings.filter((b) => b.type === filter);

    const getTextTruncation = () => ({
        title: isMobile ? 6 : isTablet ? 10 : 15,
        construction: isMobile ? 8 : isTablet ? 12 : 20,
        specsToShow: isMobile ? 1 : 2,
    });

    const BuildingCard = ({ building }: { building: Building }) => {
        const truncation = getTextTruncation();

        // Function to format status display
        const formatStatusDisplay = (status: string) => {
            const statusUpper = status.toUpperCase();
            if (statusUpper === 'SOLD') {
                return { label: t('SOLD'), bgColor: 'bg-gray-500', pulseColor: 'bg-white/60', textColor: 'text-white' };
            } else if (statusUpper === 'SALE') {
                return { label: t('SALE'), bgColor: 'bg-orange-500', pulseColor: 'bg-white', textColor: 'text-white' };
            } else if (statusUpper === 'ACTIVE') {
                return { label: t('ACTIVE'), bgColor: 'bg-orange-500', pulseColor: 'bg-white', textColor: 'text-white' };
            } else if (statusUpper === 'LEASED') {
                return { label: t('LEASED'), bgColor: 'bg-blue-500', pulseColor: 'bg-white', textColor: 'text-white' };
            } else if (statusUpper === 'UNDER_MAINTENANCE') {
                return { label: 'UNDER MAINTENANCE', bgColor: 'bg-yellow-500', pulseColor: 'bg-white', textColor: 'text-white' };
            } else if (statusUpper === 'COMING_SOON') {
                return { label: 'COMING SOON', bgColor: 'bg-purple-500', pulseColor: 'bg-white', textColor: 'text-white' };
            } else if (statusUpper === 'INACTIVE') {
                return { label: t('INACTIVE'), bgColor: 'bg-red-500', pulseColor: 'bg-white', textColor: 'text-white' };
            } else {
                return { label: statusUpper, bgColor: 'bg-gray-500', pulseColor: 'bg-white', textColor: 'text-white' };
            }
        };

        const statusDisplay = formatStatusDisplay(building.status);

        return (
            <div className="flex h-full flex-col rounded-xl bg-white p-3 shadow-md transition-all hover:shadow-lg sm:p-4 sm:pt-10">
                {/* Image Container with Fixed Height */}
                <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md sm:mb-4 sm:h-48">
                    <img src={building.image} alt={building.title} className="h-full w-full object-cover" />
                    {/* Status Badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${statusDisplay.textColor} sm:px-3 sm:py-1 ${statusDisplay.bgColor}`}
                        >
                            <span className={`mr-1 h-1.5 w-1.5 animate-pulse rounded-full sm:mr-2 sm:h-2 sm:w-2 ${statusDisplay.pulseColor}`} />
                            <span className="text-xs sm:text-xs">{statusDisplay.label}</span>
                        </span>
                    </div>
                    {/* Video Badge */}
                    {building.hasVideo && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                            <span className="inline-flex items-center rounded-full bg-blue-500/90 px-2 py-1 text-xs font-semibold text-white sm:px-3 sm:py-1">
                                <Play className="mr-1 h-3 w-3" />
                                <span className="text-xs sm:text-xs">{t('video')}</span>
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Container with Flex Grow */}
                <div className="flex flex-grow flex-col">
                    {/* Title with Fixed Height */}
                    <div className="mb-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        <h3 className="line-clamp-2 text-base font-bold sm:text-lg">{truncateText(building.title, truncation.title)}</h3>
                    </div>

                    {/* Total Area with Fixed Height */}
                    <div className="mb-3 min-h-[1.5rem] sm:mb-4">
                        <p className="text-xs font-semibold text-gray-700 sm:text-sm">
                            {t('total_area')}: {building.totalArea}
                        </p>
                    </div>

                    {/* Specifications with Fixed Height */}
                    <div className="mb-3 min-h-[3rem] flex-grow sm:mb-4 sm:min-h-[4rem]">
                        <div className="space-y-1 text-xs text-gray-700 sm:text-sm">
                            {building.specifications.slice(0, truncation.specsToShow).map((spec, i) => (
                                <div key={i} className="flex justify-between">
                                    <span className="truncate">{spec.name}</span>
                                    <span className="ml-2 truncate">{spec.dimensions}</span>
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
                    <div className="mt-auto flex gap-2">
                        <Button asChild className="flex-1 text-xs sm:text-sm">
                            <Link href={`/building-details/${building.id}`}>
                                <Eye className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                {t('details')}
                            </Link>
                        </Button>
                        {building.hasVideo && building.videoUrls && building.videoUrls[0] && (
                            <Button
                                variant="outline"
                                onClick={() => window.open(building.videoUrls![0], '_blank')}
                                className="h-8 w-8 p-0 sm:h-10 sm:w-10"
                            >
                                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
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
                <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
                    <div className="bg-grid-slate-100 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                    <Header />
                    <main className="relative mx-auto max-w-7xl px-4 py-6 pt-24 sm:px-6 sm:py-8 sm:pt-32 lg:px-8">
                        <div className="text-center">
                            {/* Loading Header */}
                            <div className="mb-6 sm:mb-8">
                                <h1 className="mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:mb-4 sm:text-4xl lg:text-6xl">
                                    {t('our_properties') || 'Our Properties'}
                                </h1>
                                <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 sm:w-24"></div>
                            </div>

                            {/* Loading Animation */}
                            <div className="flex items-center justify-center py-12 sm:py-16">
                                <div className="text-center">
                                    <div className="relative mb-4 sm:mb-6">
                                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600 sm:h-16 sm:w-16"></div>
                                        <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-transparent border-t-orange-400 opacity-20 sm:h-16 sm:w-16"></div>
                                    </div>
                                    <p className="text-base font-medium text-slate-700 sm:text-lg">
                                        {t('loading_properties') || 'Loading Properties...'}
                                    </p>
                                    <p className="mt-2 text-sm text-slate-500">
                                        {t('fetching_latest_listings') || 'Fetching the latest property listings for you'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* <Footer /> */}
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title={`Resteel | ${t('hero_title')}`}>
                <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
                    <div className="bg-grid-slate-100 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                    <Header />
                    <main className="relative mx-auto max-w-7xl px-4 py-6 pt-24 sm:px-6 sm:py-8 sm:pt-32 lg:px-8">
                        <div className="text-center">
                            {/* Error Header */}
                            <div className="mb-6 sm:mb-8">
                                <h1 className="mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:mb-4 sm:text-4xl lg:text-6xl">
                                    {t('our_properties') || 'Our Properties'}
                                </h1>
                                <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 sm:w-24"></div>
                            </div>

                            {/* Error Content */}
                            <div className="flex items-center justify-center py-12 sm:py-16">
                                <div className="max-w-md text-center">
                                    <div className="mb-4 sm:mb-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 sm:h-24 sm:w-24">
                                            <div className="text-2xl sm:text-4xl">⚠️</div>
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-slate-900 sm:mb-3 sm:text-2xl">
                                        {t('unable_to_load_properties') || 'Unable to Load Properties'}
                                    </h3>
                                    <p className="mb-4 text-sm text-red-600 sm:mb-6 sm:text-base">{error}</p>
                                    <Button
                                        onClick={() => window.location.reload()}
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-sm text-white hover:from-orange-600 hover:to-orange-700 sm:text-base"
                                    >
                                        {t('refresh_page') || 'Refresh Page'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* <Footer /> */}
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`Resteel | ${t('hero_title')}`}>
            {/* Hero Section with Enhanced Header */}
            <div className="relative bg-gradient-to-br from-slate-50 via-white to-orange-50">
                {/* Background Pattern */}
                <div className="bg-grid-slate-100 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

                <main className="relative mt-16 min-h-screen sm:mt-20 lg:mt-30">
                    {/* Hero Header Section */}
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="text-center">
                            {/* Main Title */}
                            <div className="mb-4 sm:mb-6">
                                <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-6xl">
                                    {t('our_properties') || 'Our Properties'}
                                </h1>
                                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 sm:mt-4 sm:w-24"></div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Filter Section */}
                    <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
                        <div className="mb-6 flex justify-center sm:mb-8">
                            <div className="grid w-auto max-w-full grid-cols-2 gap-1 rounded-lg bg-gray-200 p-1 sm:flex sm:max-w-2xl sm:gap-2 sm:p-1.5 lg:gap-3 lg:p-2">
                                {buildingTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setFilter(type.id)}
                                        className={`flex min-h-[36px] items-center justify-center rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 transition-all hover:bg-gray-300 sm:min-h-[40px] sm:px-4 sm:py-2 sm:text-sm lg:px-10 lg:py-2.5 lg:text-base ${
                                            filter === type.id ? 'bg-orange-500 text-white' : ''
                                        }`}
                                    >
                                        <span className="truncate text-center">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
                        {filteredBuildings.length === 0 ? (
                            <div className="py-12 text-center sm:py-16">
                                <div className="mb-4 sm:mb-6">
                                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 sm:mb-4 sm:h-24 sm:w-24">
                                        <div className="text-2xl sm:text-4xl">🏗️</div>
                                    </div>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-slate-900 sm:mb-3 sm:text-2xl">{t('no_buildings_found')}</h3>
                                <p className="mx-auto max-w-md text-sm text-slate-600 sm:text-base">
                                    {t('try_different_filter') || 'Try selecting a different filter to see more options'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
