'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Eye, Factory, Play, Ruler, Square, SquareStack, Warehouse } from 'lucide-react';
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

    const buildingTypes = [
        { id: 'all', label: t('all'), icon: Building2 },
        { id: 'warehouses', label: t('warehouses'), icon: Warehouse },
        { id: 'Steelconstructions', label: t('steel_constructions'), icon: Factory },
        { id: 'other', label: t('other'), icon: SquareStack },
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
                            type: 'warehouses',
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
            className="group relative flex h-[520px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Image Section - Fixed Height */}
            <div className="relative h-48 flex-shrink-0 overflow-hidden">
                <img
                    src={building.image}
                    alt={building.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${building.status === 'SOLD' ? 'bg-gray-500' : 'bg-orange-500'}`}
                    >
                        <span className={`mr-2 h-2 w-2 animate-pulse rounded-full ${building.status === 'SOLD' ? 'bg-white/60' : 'bg-white'}`} />
                        {building.status === 'SALE'
                            ? t('sale').toUpperCase()
                            : building.status === 'SOLD'
                              ? t('sold').toUpperCase()
                              : building.status}
                    </span>
                </div>
                {building.hasVideo && (
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center rounded-full bg-blue-500/90 px-3 py-1 text-xs font-semibold text-white">
                            <Play className="mr-1 h-3 w-3" />
                            {t('video')}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section - Flexible with proper height management */}
            <div className="flex min-h-0 flex-1 flex-col p-4">
                {/* Title - Fixed Height */}
                <div className="mb-3 h-7 flex-shrink-0">
                    <h3
                        className="line-clamp-1 overflow-hidden text-lg font-semibold text-gray-900 group-hover:text-orange-600"
                        title={building.title}
                    >
                        {building.title}
                    </h3>
                </div>

                {/* Area Info - Fixed Height */}
                <div className="mb-3 flex-shrink-0">
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                        <div className="flex items-center">
                            <Square className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                            <span className="text-sm text-gray-600">{t('total_area')}</span>
                        </div>
                        <span className="ml-2 truncate text-sm font-semibold text-gray-900" title={building.totalArea}>
                            {building.totalArea}
                        </span>
                    </div>
                </div>

                {/* Specifications - Flexible with scrolling */}
                <div className="mb-3 min-h-0 flex-1">
                    <div className="mb-2 flex flex-shrink-0 items-center">
                        <Ruler className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">{t('specifications')}</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div
                            className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 h-full max-h-[120px] overflow-y-auto pr-2"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#d1d5db #f3f4f6',
                            }}
                        >
                            <div className="space-y-2">
                                {building.specifications.length > 0 ? (
                                    building.specifications.map((spec: Specification, idx: number) => (
                                        <div key={idx} className="flex items-start justify-between gap-2 text-sm">
                                            <span className="min-w-0 flex-1 truncate text-gray-700" title={spec.name}>
                                                {spec.name}
                                            </span>
                                            <span className="max-w-[80px] flex-shrink-0 truncate text-xs text-gray-500" title={spec.dimensions}>
                                                {spec.dimensions}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-2 text-center text-sm text-gray-500 italic">{t('no_specifications_available')}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Fixed at Bottom */}
                <div className="flex flex-shrink-0 gap-2">
                    <Button asChild className="h-10 flex-1 rounded-lg bg-[#0076A8] text-white hover:bg-[#00628D]">
                        <a href={`/building-details/${building.id}`} className="flex items-center justify-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <span className="truncate">{t('details')}</span>
                        </a>
                    </Button>

                    {building.hasVideo && (
                        <Button
                            variant="outline"
                            className="h-10 w-10 flex-shrink-0 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                            onClick={() => window.open(building.videoUrls?.[0], '_blank')}
                        >
                            <Play className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <section className="bg-slate-200/80 py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mt-4 text-4xl font-bold md:text-5xl" style={{ color: charcoal }}>
                        {t('featured')}{' '}
                        <span className="text-orange-500" style={{ color: steelBlue }}>
                            {t('buildings')}
                        </span>
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600 sm:text-lg">{t('featured_buildings_subtitle')}</p>
                </motion.div>

                <Tabs defaultValue="all" className="w-full">
                    <div className="mb-8 flex justify-center">
                        <TabsList className="inline-flex rounded-xl bg-gray-200 p-2 py-6">
                            {buildingTypes.map((type) => (
                                <TabsTrigger
                                    key={type.id}
                                    value={type.id}
                                    className="text-md text-tight mx-1 flex items-center rounded-lg px-4 py-4 font-medium text-gray-700 transition-all hover:bg-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                                >
                                    {type.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {buildingTypes.map((type) => {
                        const filtered = type.id === 'all' ? warehouses : warehouses.filter((b) => b.type === type.id);

                        return (
                            <TabsContent key={type.id} value={type.id} className="mt-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={type.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                                    >
                                        {filtered.length > 0 ? (
                                            filtered.slice(0, 6).map((building) => <BuildingCard key={building.id} building={building} />)
                                        ) : (
                                            <div className="col-span-full py-16 text-center">
                                                <div className="text-6xl opacity-50">🏗️</div>
                                                <h3 className="mt-4 text-xl font-semibold text-gray-900">{t('no_buildings_found')}</h3>
                                                <p className="mt-2 text-gray-600">{t('check_back_later')}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>
                        );
                    })}
                </Tabs>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
                    >
                        <Link href="/buildings">
                            {t('view_all_buildings')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBuildings;
