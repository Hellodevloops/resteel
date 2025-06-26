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
            <div className="rounded-xl bg-white p-4 pt-10 shadow-md transition-all hover:shadow-lg">
                <img src={building.image} alt={building.title} className="mb-4 h-48 w-full rounded-md object-cover" />
                <h3 className="mb-1 text-lg font-bold">{truncateText(building.title, truncation.title)}</h3>
                <p className="mb-2 text-sm text-gray-600">{truncateText(building.construction, truncation.construction)}</p>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                    {t('total_area')}: {building.totalArea}
                </p>
                <div className="mb-4 space-y-1 text-sm text-gray-700">
                    {building.specifications.slice(0, truncation.specsToShow).map((spec, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{spec.name}</span>
                            <span>{spec.dimensions}</span>
                        </div>
                    ))}
                    {building.specifications.length > truncation.specsToShow && (
                        <div className="text-orange-500">
                            +{building.specifications.length - truncation.specsToShow} {t('more')}...
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href={`/building-details/${building.id}`}>
                            <Eye className="mr-1 h-4 w-4" />
                            {t('view')}
                        </Link>
                    </Button>
                    {building.hasVideo && building.videoUrls?.[0] && (
                        <Button variant="outline" onClick={() => window.open(building.videoUrls[0], '_blank')}>
                            <Play className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <main className="mx-auto max-w-7xl px-4 py-8 pt-10">
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="mb-4 text-4xl">⏳</div>
                            <p className="text-gray-600">{t('loading')}</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <main className="mx-auto max-w-7xl px-4 py-8 pt-10">
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="mb-4 text-4xl">❌</div>
                            <p className="text-red-600">{error}</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <Layout title={`Resteel | ${t('hero_title')}`}>
            {/* <div className="min-h-screen bg-slate-50"> */}
            <main className="mt-20 min-h-screen sm:mt-30">
                <h1 className="mb-6 text-3xl font-bold">{t('available_buildings')}</h1>

                <div className="mb-8 flex flex-wrap gap-4">
                    {buildingTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setFilter(type.id)}
                            className={`rounded-full px-4 py-2 font-semibold ${
                                filter === type.id ? 'bg-orange-500 text-white' : 'border border-gray-300 bg-white text-gray-600'
                            }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {filteredBuildings.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mb-4 text-6xl opacity-50">🏗️</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">{t('no_buildings_found')}</h3>
                        <p className="text-gray-600">{t('try_different_filter')}</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredBuildings.map((building) => (
                            <BuildingCard key={building.id} building={building} />
                        ))}
                    </div>
                )}
            </main>
            {/* </div> */}
        </Layout>
    );
};

export default Buildings;
