import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Eye, Mail, MapPin, Phone, Play, Square } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Building data - this would typically come from an API or context
const buildingsData = {
    1: {
        id: 1,
        title: 'Hall No.1',
        status: 'SALE',
        type: 'halls',
        category: 'Industrial Halls',
        construction: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
        description:
            'This impressive industrial hall features modern steel construction with excellent insulation properties. Perfect for manufacturing, warehousing, or distribution operations. The building includes high-quality sandwich panels and Ytong blocks for optimal thermal performance.',
        location: 'Industrial District, Netherlands',
        yearBuilt: '2018',
        price: 'Contact for Price',
        images: [
            'https://www.tradingbv.com/wp-content/uploads/2025/02/Schermafbeelding-2024-10-16-134435.png',
            'https://www.tradingbv.com/wp-content/uploads/2024/06/20240523_101558000_iOS-2048x1152.jpg',
            'https://www.tradingbv.com/wp-content/uploads/2025/02/4.png',
            'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        ],
        specifications: [
            { name: 'Main Hall', dimensions: '75 x 225 m', area: '16,875 m²' },
            { name: 'Office Space', dimensions: '20 x 30 m', area: '600 m²' },
            { name: 'Loading Dock', dimensions: '15 x 40 m', area: '600 m²' },
        ],
        totalArea: '16,875 m²',
        hasVideo: true,
        videoUrls: ['https://example.com/video1'],
        features: [
            'Steel frame construction',
            'Insulated roof panels',
            'Large clear span',
            'Multiple loading docks',
            'Office facilities',
            'Parking area',
        ],
    },
};

const BuildingDetails = () => {
    const id = 1;
    const [building, setBuilding] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading building data (in real app, this would be an API call)
        const fetchBuilding = () => {
            const buildingId = parseInt(id);
            const buildingData = buildingsData[buildingId];

            if (buildingData) {
                setBuilding(buildingData);
            }
            setIsLoading(false);
        };

        fetchBuilding();
    }, [id]);

    // Auto-rotate thumbnails every 3 seconds
    useEffect(() => {
        if (building && building.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentThumbnailIndex((prevIndex) => (prevIndex + 1) % building.images.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [building]);

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
        setCurrentThumbnailIndex(index);
    };

    const nextImage = () => {
        if (building) {
            setSelectedImageIndex((prevIndex) => (prevIndex + 1) % building.images.length);
        }
    };

    const prevImage = () => {
        if (building) {
            setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? building.images.length - 1 : prevIndex - 1));
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500"></div>
                    <p className="text-slate-600">Loading building details...</p>
                </div>
            </div>
        );
    }

    if (!building) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold text-slate-800">Building Not Found</h1>
                    <p className="mb-6 text-slate-600">The building you're looking for doesn't exist.</p>
                    <Button asChild>
                        <Link to="/buildings">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Buildings
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
            {/* Header Section */}
            <div className="border-b bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <Button variant="outline" asChild>
                            <Link to="/buildings">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Buildings
                            </Link>
                        </Button>

                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="bg-orange-500 text-white">
                                {building.status}
                            </Badge>
                            <span className="text-sm text-slate-600">{building.category}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Image Gallery Section */}
                    <div className="lg:col-span-2">
                        {/* Main Image Display */}
                        <div className="relative mb-6">
                            <div className="relative h-96 overflow-hidden rounded-2xl shadow-xl md:h-[500px]">
                                <img src={building.images[selectedImageIndex]} alt={building.title} className="h-full w-full object-cover" />

                                {/* Image Navigation */}
                                <button
                                    onClick={prevImage}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-all duration-300 hover:bg-black/70"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-all duration-300 hover:bg-black/70"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>

                                {/* Image Counter */}
                                <div className="absolute right-4 bottom-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                                    {selectedImageIndex + 1} / {building.images.length}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-6 gap-3">
                            {building.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`relative h-20 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                                        index === selectedImageIndex ? 'scale-105 ring-3 ring-orange-500' : 'hover:scale-105 hover:shadow-md'
                                    } ${index === currentThumbnailIndex && index !== selectedImageIndex ? 'ring-2 ring-blue-400' : ''}`}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img src={image} alt={`${building.title} - Image ${index + 1}`} className="h-full w-full object-cover" />
                                    {index === currentThumbnailIndex && index !== selectedImageIndex && (
                                        <div className="absolute inset-0 bg-blue-500/20"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Building Information Section */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-xl">
                            {/* Title and Status */}
                            <h1 className="mb-2 text-3xl font-bold text-slate-800">{building.title}</h1>
                            <p className="mb-6 text-xl font-semibold text-orange-500">{building.price}</p>

                            {/* Key Information */}
                            <div className="mb-6 space-y-4">
                                <div className="flex items-center text-slate-600">
                                    <MapPin className="mr-3 h-5 w-5 text-orange-500" />
                                    <span>{building.location}</span>
                                </div>
                                <div className="flex items-center text-slate-600">
                                    <Calendar className="mr-3 h-5 w-5 text-orange-500" />
                                    <span>Built in {building.yearBuilt}</span>
                                </div>
                                <div className="flex items-center text-slate-600">
                                    <Square className="mr-3 h-5 w-5 text-orange-500" />
                                    <span>Total Area: {building.totalArea}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mb-6 space-y-3">
                                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Contact for Details
                                </Button>

                                <Button variant="outline" className="w-full">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Request Information
                                </Button>

                                {building.hasVideo && (
                                    <Button
                                        variant="outline"
                                        className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                                        onClick={() => building.videoUrls && window.open(building.videoUrls[0], '_blank')}
                                    >
                                        <Play className="mr-2 h-4 w-4" />
                                        Watch Video
                                    </Button>
                                )}
                            </div>

                            {/* Quick Features */}
                            <div className="border-t pt-6">
                                <h3 className="mb-3 font-semibold text-slate-800">Key Features</h3>
                                <div className="space-y-2">
                                    {building.features.slice(0, 4).map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-slate-600">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Information Section */}
                <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Description */}
                    <div className="rounded-2xl bg-white p-8 shadow-xl">
                        <h2 className="mb-4 text-2xl font-bold text-slate-800">Description</h2>
                        <p className="mb-6 leading-relaxed text-slate-600">{building.description}</p>

                        <div className="border-t pt-6">
                            <h3 className="mb-4 font-semibold text-slate-800">Construction Details</h3>
                            <p className="text-slate-600">{building.construction}</p>
                        </div>

                        <div className="mt-6 border-t pt-6">
                            <h3 className="mb-4 font-semibold text-slate-800">All Features</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {building.features.map((feature, index) => (
                                    <div key={index} className="flex items-center text-sm text-slate-600">
                                        <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="rounded-2xl bg-white p-8 shadow-xl">
                        <h2 className="mb-6 text-2xl font-bold text-slate-800">Specifications</h2>

                        <div className="space-y-6">
                            {building.specifications.map((spec, index) => (
                                <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="font-semibold text-slate-800">{spec.name}</h3>
                                        <Badge variant="outline">{spec.area}</Badge>
                                    </div>
                                    <p className="text-sm text-slate-600">Dimensions: {spec.dimensions}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-slate-800">Total Building Area</span>
                                <span className="text-2xl font-bold text-orange-500">{building.totalArea}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Buildings Section */}
                <div className="mt-12 text-center">
                    <Button size="lg" asChild className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-orange-500 hover:to-orange-600">
                        <Link to="/buildings">
                            <Eye className="mr-2 h-5 w-5" />
                            View More Buildings
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BuildingDetails;
