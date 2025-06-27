'use client';

import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { ArrowLeft, Building, Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Eye, MapPin, Phone, Play, Square } from 'lucide-react';

const BuildingDetails = () => {
    const { t } = useTranslation();
    const { props } = usePage();
    const id = props.id;
    const [building, setBuilding] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const [showFullConstruction, setShowFullConstruction] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                const res = await fetch(`/api/warehouses/${id}`);
                const json = await res.json();
                if (json.status === 'success') {
                    const data = json.data;
                    setBuilding({
                        id: data.id,
                        title: data.name,
                        status: data.status || t('sale'),
                        category: data.category || t('warehouse'),
                        construction: data.construction || t('not_specified'),
                        description: data.description || t('no_description_available'),
                        location: `${data.city || ''}, ${data.country || ''}`,
                        yearBuilt: data.year_built || t('unknown'),
                        price: data.price ? `€${data.price}` : t('contact_for_price'),
                        images: data.additional_images?.length > 0 ? data.additional_images : data.image_path ? [data.image_path] : [],
                        totalArea: data.total_area ? `${data.total_area} ${data.unit_of_measurement || ''}` : t('not_available'),
                        hasVideo: data.has_video,
                        videoUrls: (data.video_urls || []).filter(Boolean),
                        features: (data.features || []).filter(Boolean),
                        specifications: [
                            {
                                name: t('main_hall'),
                                dimensions: data.main_hall_dimensions || t('not_available'),
                                area: data.main_hall_area || t('not_available'),
                            },
                            {
                                name: t('office_space'),
                                dimensions: data.office_space_dimensions || t('not_available'),
                                area: data.office_space_area || t('not_available'),
                            },
                            {
                                name: t('loading_dock'),
                                dimensions: data.loading_dock_dimensions || t('not_available'),
                                area: data.loading_dock_area || t('not_available'),
                            },
                        ].filter((spec) => spec.dimensions !== t('not_available') || spec.area !== t('not_available')),
                    });
                }
            } catch (err) {
                console.error('Failed to fetch building data', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuilding();
    }, [id, t]);

    useEffect(() => {
        if (building && building.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentThumbnailIndex((prev) => (prev + 1) % building.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [building]);

    const handleThumbnailClick = (index: number) => {
        setSelectedImageIndex(index);
        setCurrentThumbnailIndex(index);
    };

    const nextImage = () => {
        if (building) {
            setSelectedImageIndex((prev) => (prev + 1) % building.images.length);
        }
    };

    const prevImage = () => {
        if (building) {
            setSelectedImageIndex((prev) => (prev === 0 ? building.images.length - 1 : prev - 1));
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        if (!text) return '';
        return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + '...';
    };

    if (isLoading) {
        return (
            <Layout title={t('loading_property')}>
                <div className="mt-16 flex min-h-[60vh] items-center justify-center sm:mt-20">
                    <div className="space-y-4 text-center">
                        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
                        <h3 className="text-lg font-semibold text-gray-700">{t('loading_property_details')}</h3>
                        <p className="text-gray-500">{t('please_wait_while_we_fetch')}</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!building) {
        return (
            <Layout title={t('property_not_found')}>
                <div className="mt-16 flex min-h-[60vh] items-center justify-center px-4 sm:mt-20">
                    <Card className="w-full max-w-md">
                        <CardContent className="py-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <Building className="h-8 w-8 text-red-500" />
                            </div>
                            <h1 className="mb-2 text-2xl font-bold text-gray-800">{t('property_not_found')}</h1>
                            <p className="mb-6 text-gray-600">{t('property_not_found_description')}</p>
                            <Button asChild className="bg-orange-500 hover:bg-orange-600">
                                <Link to="/buildings">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    {t('back_to_properties')}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`Resteel | ${building.title}`}>
            <div className="mt-20 bg-gray-50 sm:mt-25">
                {/* Sticky Navigation */}
                <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/buildings">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">{t('back_to_properties')}</span>
                                        <span className="sm:hidden">{t('back')}</span>
                                    </Link>
                                </Button>
                                <div className="hidden h-6 w-px bg-gray-300 sm:block"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Property Header */}
                    <div className="mb-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex-1">
                                <h1 className="mb-2 text-3xl leading-tight font-bold text-gray-900 sm:text-4xl">{building.title}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                                    <div className="flex items-center">
                                        <MapPin className="mr-1 h-4 w-4 text-orange-500" />
                                        <span className="text-sm">{building.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="mr-1 h-4 w-4 text-orange-500" />
                                        <span className="text-sm">
                                            {t('built')} {building.yearBuilt}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Square className="mr-1 h-4 w-4 text-orange-500" />
                                        <span className="text-sm">{building.totalArea}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="mb-1 text-3xl font-bold text-orange-600 sm:text-4xl">{building.price}</p>
                                <p className="text-sm text-gray-500">
                                    {building.totalArea !== t('not_available')
                                        ? `~€${Math.round(parseInt(building.price.replace(/[^0-9]/g, '')) / parseInt(building.totalArea.replace(/[^0-9]/g, '')))} ${t('per_m2')}`
                                        : t('contact_for_details')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                        {/* Image Gallery */}
                        <div className="xl:col-span-2">
                            <Card className="overflow-hidden">
                                <CardContent className="p-0">
                                    {/* Main Image */}
                                    <div className="relative aspect-[4/3] bg-gray-200">
                                        {building.images.length > 0 ? (
                                            <>
                                                <img
                                                    src={building.images[selectedImageIndex]}
                                                    alt={building.title}
                                                    className="h-full w-full object-cover"
                                                />

                                                {/* Image Controls */}
                                                {building.images.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={prevImage}
                                                            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70"
                                                            aria-label="Previous image"
                                                        >
                                                            <ChevronLeft className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={nextImage}
                                                            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70"
                                                            aria-label="Next image"
                                                        >
                                                            <ChevronRight className="h-5 w-5" />
                                                        </button>

                                                        {/* Image Counter */}
                                                        <div className="absolute right-4 bottom-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                                                            {selectedImageIndex + 1} / {building.images.length}
                                                        </div>
                                                    </>
                                                )}

                                                {/* Video Badge */}
                                                {building.hasVideo && (
                                                    <div className="absolute top-4 left-4">
                                                        <Badge className="bg-blue-500 text-white">
                                                            <Play className="mr-1 h-3 w-3" />
                                                            Video Available
                                                        </Badge>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <div className="text-center">
                                                    <Building className="mx-auto mb-2 h-16 w-16 text-gray-400" />
                                                    <p className="text-gray-500">No images available</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Thumbnail Grid */}
                                    {building.images.length > 1 && (
                                        <div className="bg-gray-50 p-4">
                                            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
                                                {building.images.slice(0, 10).map((image, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleThumbnailClick(index)}
                                                        className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                                                            index === selectedImageIndex
                                                                ? 'scale-105 ring-2 ring-orange-500'
                                                                : 'hover:scale-105 hover:ring-2 hover:ring-gray-300'
                                                        }`}
                                                    >
                                                        <img src={image} alt={`View ${index + 1}`} className="h-full w-full object-cover" />
                                                    </button>
                                                ))}
                                                {building.images.length > 10 && (
                                                    <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-200">
                                                        <span className="text-xs font-medium text-gray-600">+{building.images.length - 10}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Property Details Sidebar */}
                        <div className="xl:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* video Actions */}
                                {building.hasVideo && building.videoUrls.length > 0 && (
                                    <Card>
                                        <CardContent className="space-y-3">
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                                                onClick={() => window.open(building.videoUrls[0], '_blank')}
                                            >
                                                <Play className="mr-2 h-4 w-4" />
                                                {t('watch_video_tour')}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Key Features */}
                                <Card>
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg">{t('key_features')}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {building.features.slice(0, 6).map((feature, index) => (
                                                <div key={index} className="flex items-start space-x-3">
                                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
                                                    <span className="text-sm leading-relaxed text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                            {building.features.length > 6 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                                                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                                                >
                                                    {showAllFeatures ? t('show_less') : t('view_all_features', { count: building.features.length })}
                                                    {showAllFeatures ? (
                                                        <ChevronUp className="ml-1 h-4 w-4" />
                                                    ) : (
                                                        <ChevronDown className="ml-1 h-4 w-4" />
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Stats */}
                                <Card>
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg">{t('property_stats')}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">{t('total_area')}</span>
                                            <span className="font-semibold">{building.totalArea}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">{t('year_built')}</span>
                                            <span className="font-semibold">{building.yearBuilt}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">{t('property_type')}</span>
                                            <span className="font-semibold">{building.category}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">{t('status')}</span>
                                            <Badge variant="secondary" className="bg-orange-500 text-xs text-white">
                                                {building.status}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Description & Specifications */}
                    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">{t('property_description')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <div className="max-h-64 overflow-x-hidden overflow-y-auto">
                                        <p className="leading-relaxed break-words whitespace-pre-line text-gray-700">
                                            {showFullDescription ? building.description : truncateText(building.description, 300)}
                                        </p>
                                    </div>
                                    {building.description && building.description.length > 300 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                            className="mt-3 p-0 text-orange-500 hover:text-orange-600"
                                        >
                                            {showFullDescription ? (
                                                <>
                                                    <ChevronUp className="mr-1 h-4 w-4" />
                                                    {t('show_less')}
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="mr-1 h-4 w-4" />
                                                    {t('read_more')}
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="mb-3 font-semibold text-gray-800">{t('construction_details')}</h3>
                                    <div className="max-h-48 overflow-x-hidden overflow-y-auto">
                                        <p className="leading-relaxed break-words whitespace-pre-line text-gray-700">
                                            {showFullConstruction ? building.construction : truncateText(building.construction, 200)}
                                        </p>
                                    </div>
                                    {building.construction && building.construction.length > 200 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowFullConstruction(!showFullConstruction)}
                                            className="mt-3 p-0 text-orange-500 hover:text-orange-600"
                                        >
                                            {showFullConstruction ? (
                                                <>
                                                    <ChevronUp className="mr-1 h-4 w-4" />
                                                    {t('show_less')}
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="mr-1 h-4 w-4" />
                                                    {t('read_more')}
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>

                                {showAllFeatures && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h3 className="mb-4 font-semibold text-gray-800">{t('all_features')}</h3>
                                            <div className="grid max-h-56 grid-cols-1 gap-3 overflow-x-hidden overflow-y-auto sm:grid-cols-2">
                                                {building.features.map((feature, index) => (
                                                    <div key={index} className="flex items-start space-x-3">
                                                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
                                                        <span className="text-sm leading-relaxed break-words text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Specifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">{t('specifications')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {building.specifications.length > 0 ? (
                                    <div className="space-y-6">
                                        {building.specifications.map((spec, index) => (
                                            <div key={index} className="border-l-4 border-orange-500 pl-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-800">{spec.name}</h3>
                                                    <Badge variant="outline" className="border-orange-200 text-orange-600">
                                                        {spec.area}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Dimensions: <span className="font-medium">{spec.dimensions}</span>
                                                </p>
                                            </div>
                                        ))}

                                        <Separator />

                                        <div className="rounded-lg bg-orange-50 p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Square className="h-5 w-5 text-orange-500" />
                                                    <span className="font-semibold text-gray-800">{t('total_building_area')}</span>
                                                </div>
                                                <span className="text-2xl font-bold text-orange-600">{building.totalArea}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <Building className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                                        <p className="text-gray-500">{t('no_specifications_available')}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                        <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
                            <h2 className="mb-2 text-2xl font-bold">{t('interested_title')}</h2>
                            <p className="mb-6 text-orange-100">{t('interested_text')}</p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                                    <Link href="/contact">
                                        <Phone className="mr-2 h-4 w-4" />
                                        {t('contact_us')}
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                                    <Link href="/buildings">
                                        <Eye className="mr-2 h-4 w-4" />
                                        {t('view_similar')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BuildingDetails;
