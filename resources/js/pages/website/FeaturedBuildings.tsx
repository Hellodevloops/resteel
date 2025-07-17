'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Eye, Factory, Play, Ruler, Square, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Specification {
    name: string;
    dimensions: string;
    area: string;
}

interface Warehouse {
    id: number;
    title: string;
    status: string;
    type: string;
    category: string;
    totalArea: string;
    construction: string;
    image: string;
    hasVideo: boolean;
    videoUrls: string[];
    specifications: Specification[];
}

interface WarehouseApiItem {
    id: number;
    name: string;
    category?: string;
    type?: string;
    total_area?: string;
    unit_of_measurement?: string;
    construction?: string;
    image_path?: string;
    has_video: boolean;
    video_urls?: string[];
    area_dimensions?: Array<{
        name: string;
        dimensions: string;
        area: string;
    }>;
    // OLD FIELDS - for backward compatibility
    main_hall_dimensions?: string;
    main_hall_area?: string;
    status?: string;
}

const steelBlue = '#0076A8';
const charcoal = '#3C3F48';

const FeaturedBuildings = () => {
    const { t } = useTranslation();
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [filter, setFilter] = useState('all');

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
                const res = await fetch('/api/warehouses');
                const json = await res.json();
                if (json.status === 'success') {
                    const formatted = json.data.map((item: WarehouseApiItem) => {
                        // Convert area_dimensions array or fall back to old fields
                        let specifications: Specification[] = [];

                        if (item.area_dimensions && item.area_dimensions.length > 0) {
                            // Use new area_dimensions array
                            specifications = item.area_dimensions.filter((dim) => dim.name || dim.dimensions || dim.area);
                        } else if (item.main_hall_dimensions || item.main_hall_area) {
                            // Fall back to old fields for backward compatibility
                            specifications = [
                                {
                                    name: t('main_hall'),
                                    dimensions: item.main_hall_dimensions || t('not_available'),
                                    area: item.main_hall_area || t('not_available'),
                                },
                            ];
                        }

                        return {
                            id: item.id,
                            title: item.name,
                            status: (item.status || 'sale').toUpperCase(),
                            type: item.type || 'warehouses', // Use actual type from database, fallback to 'warehouses'
                            category: item.category || t('uncategorized'),
                            totalArea: item.total_area ? `${item.total_area} ${item.unit_of_measurement}` : t('not_available'),
                            construction: item.construction || t('not_specified'),
                            image: item.image_path || '/placeholder.jpg',
                            hasVideo: item.has_video,
                            videoUrls: (item.video_urls || []).filter(Boolean),
                            specifications: specifications,
                        };
                    });
                    setWarehouses(formatted);
                }
            } catch (error) {
                console.error('Failed to load warehouses:', error);
            }
        };

        fetchWarehouses();
    }, [t]);

    const BuildingCard = ({ building }: { building: Warehouse }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="group relative flex h-[480px] w-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl sm:h-[520px] sm:rounded-2xl"
        >
            {/* Image Section - Responsive Height */}
            <div className="relative h-40 flex-shrink-0 overflow-hidden sm:h-48">
                <img
                    src={building.image}
                    alt={building.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white sm:px-3 sm:py-1 ${building.status === 'SOLD' ? 'bg-gray-500' : 'bg-orange-500'}`}
                    >
                        <span
                            className={`mr-1 h-1.5 w-1.5 animate-pulse rounded-full sm:mr-2 sm:h-2 sm:w-2 ${building.status === 'SOLD' ? 'bg-white/60' : 'bg-white'}`}
                        />
                        <span className="text-xs sm:text-xs">
                            {building.status === 'SALE'
                                ? t('sale').toUpperCase()
                                : building.status === 'SOLD'
                                  ? t('sold').toUpperCase()
                                  : building.status}
                        </span>
                    </span>
                </div>
                {building.hasVideo && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                        <span className="inline-flex items-center rounded-full bg-blue-500/90 px-2 py-1 text-xs font-semibold text-white sm:px-3 sm:py-1">
                            <Play className="mr-1 h-3 w-3" />
                            <span className="text-xs sm:text-xs">{t('video')}</span>
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section - Flexible with proper height management */}
            <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4">
                {/* Title - Responsive Height */}
                <div className="mb-2 h-6 flex-shrink-0 sm:mb-3 sm:h-7">
                    <h3
                        className="line-clamp-1 overflow-hidden text-base font-semibold text-gray-900 group-hover:text-orange-600 sm:text-lg"
                        title={building.title}
                    >
                        {building.title}
                    </h3>
                </div>

                {/* Area Info - Responsive Height */}
                <div className="mb-2 flex-shrink-0 sm:mb-3">
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                        <div className="flex items-center">
                            <Square className="mr-2 h-3 w-3 flex-shrink-0 text-orange-500 sm:h-4 sm:w-4" />
                            <span className="text-xs text-gray-600 sm:text-sm">{t('total_area')}</span>
                        </div>
                        <span className="ml-2 truncate text-xs font-semibold text-gray-900 sm:text-sm" title={building.totalArea}>
                            {building.totalArea}
                        </span>
                    </div>
                </div>

                {/* Specifications - Flexible with scrolling */}
                <div className="mb-2 min-h-0 flex-1 sm:mb-3">
                    <div className="mb-1 flex flex-shrink-0 items-center sm:mb-2">
                        <Ruler className="mr-2 h-3 w-3 text-gray-500 sm:h-4 sm:w-4" />
                        <span className="text-xs font-medium text-gray-600 sm:text-sm">{t('specifications')}</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div
                            className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 h-full max-h-[100px] overflow-y-auto pr-2 sm:max-h-[120px]"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#d1d5db #f3f4f6',
                            }}
                        >
                            <div className="space-y-1 sm:space-y-2">
                                {building.specifications.length > 0 ? (
                                    building.specifications.map((spec: Specification, idx: number) => (
                                        <div key={idx} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                                            <span className="min-w-0 flex-1 truncate text-gray-700" title={spec.name}>
                                                {spec.name}
                                            </span>
                                            <span
                                                className="max-w-[60px] flex-shrink-0 truncate text-xs text-gray-500 sm:max-w-[80px]"
                                                title={spec.dimensions}
                                            >
                                                {spec.dimensions}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-2 text-center text-xs text-gray-500 italic sm:text-sm">{t('no_specifications_available')}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Fixed at Bottom */}
                <div className="flex flex-shrink-0 gap-2">
                    <Button asChild className="h-8 flex-1 rounded-lg bg-[#0076A8] text-white hover:bg-[#00628D] sm:h-10">
                        <a href={`/building-details/${building.id}`} className="flex items-center justify-center">
                            <Eye className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="truncate text-xs sm:text-sm">{t('details')}</span>
                        </a>
                    </Button>

                    {building.hasVideo && (
                        <Button
                            variant="outline"
                            className="h-8 w-8 flex-shrink-0 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white sm:h-10 sm:w-10"
                            onClick={() => window.open(building.videoUrls?.[0], '_blank')}
                        >
                            <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <section className="bg-slate-200/80 py-8 sm:py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 text-center sm:mb-12"
                >
                    <h2 className="mt-2 text-2xl font-bold sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl" style={{ color: charcoal }}>
                        {t('featured')}{' '}
                        <span className="text-orange-500" style={{ color: steelBlue }}>
                            {t('buildings')}
                        </span>
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:mt-3 sm:text-base lg:text-lg">{t('featured_buildings_subtitle')}</p>
                </motion.div>
                {/* Enhanced Filter Section */}
                <div className="mb-4 flex justify-center sm:mb-6">
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

                {/* Content Section */}
                <div className="mt-6 sm:mt-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                        >
                            {(() => {
                                const filtered = filter === 'all' ? warehouses : warehouses.filter((b) => b.type === filter);
                                return filtered.length > 0 ? (
                                    filtered.slice(0, 6).map((building) => <BuildingCard key={building.id} building={building} />)
                                ) : (
                                    <div className="col-span-full py-12 text-center sm:py-16">
                                        <div className="text-4xl opacity-50 sm:text-6xl">🏗️</div>
                                        <h3 className="mt-3 text-lg font-semibold text-gray-900 sm:mt-4 sm:text-xl">{t('no_buildings_found')}</h3>
                                        <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">{t('check_back_later')}</p>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* View All Button */}
                <div className="mt-8 text-center sm:mt-12">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-xl sm:px-8 sm:py-6 sm:text-lg"
                    >
                        <Link href="/buildings">
                            {t('view_all_buildings')}
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBuildings;
