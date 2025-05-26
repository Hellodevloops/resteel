import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { ArrowRight, Building, Building2, ExternalLink, Eye, Factory, Play, Ruler, Square, SquareStack, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';

// Building types
const buildingTypes = [
    { id: 'all', label: 'All', icon: Building2 },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'halls', label: 'Halls', icon: Factory },
    { id: 'other', label: 'Other', icon: SquareStack },
];

// Updated buildings data to match Buildings.tsx structure
const buildings = [
    {
        id: 1,
        title: 'Hall No.1',
        status: 'SALE',
        type: 'halls',
        category: 'Industrial Halls',
        construction: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
        image: 'https://www.tradingbv.com/wp-content/uploads/2025/02/Schermafbeelding-2024-10-16-134435.png',
        specifications: [{ name: 'Main Hall', dimensions: '75 x 225 m', area: '16,875 m²' }],
        totalArea: '16,875 m²',
        hasVideo: false,
        featured: true,
    },
    {
        id: 2,
        title: 'Business Premises',
        status: 'SALE',
        type: 'other',
        category: 'Business Buildings',
        construction: 'Steel, Wall sandwich and glass, Roof with insulation, Doors included',
        image: 'https://www.tradingbv.com/wp-content/uploads/2025/02/4.png',
        specifications: [{ name: 'Loading Dock', dimensions: '85 x 110 m', area: '9,350 m²' }],
        totalArea: '9,350 m²',
        hasVideo: false,
        featured: true,
    },
    {
        id: 3,
        title: 'Warehouse',
        status: 'SALE',
        type: 'warehouses',
        category: 'Industrial Warehouses',
        construction: 'Steel construction',
        image: 'https://www.tradingbv.com/wp-content/uploads/2024/06/20240523_101558000_iOS-2048x1152.jpg',
        specifications: [{ name: 'Warehouse', dimensions: '44 x 88 m', area: '3,872 m²' }],
        totalArea: '3,872 m²',
        hasVideo: false,
        featured: true,
    },
    {
        id: 4,
        title: 'Steel Structure',
        status: 'SALE',
        type: 'other',
        category: 'Steel Structures',
        construction: 'No walls, No roof',
        image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specifications: [{ name: 'Steel Frame', dimensions: '45 x 75 m', area: '3,375 m²' }],
        totalArea: '3,375 m²',
        hasVideo: false,
        featured: true,
    },
];

const FeaturedBuildings = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const filteredBuildings = activeFilter === 'all' ? buildings : buildings.filter((building) => building.type === activeFilter);

    const BuildingCard = ({ building, index }) => {
        return (
            <div
                className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-900/20 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ animationDelay: `${800 + index * 100}ms` }}
            >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                    <img
                        src={building.image}
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
                        <Button
                            asChild
                            className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600 hover:scale-105 hover:shadow-lg"
                        >
                            <Link href={`/buildings/${building.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Link>
                        </Button>

                        {building.hasVideo && (
                            <button
                                onClick={() => building.videoUrls && window.open(building.videoUrls[0], '_blank')}
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
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-16 md:py-24">
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
                <div
                    className="absolute bottom-40 left-20 h-12 w-12 animate-bounce rounded-full bg-slate-600/10"
                    style={{ animationDuration: '8s', animationDelay: '-6s' }}
                ></div>
                <div
                    className="absolute right-10 bottom-20 h-24 w-24 animate-bounce rounded-full bg-orange-500/5"
                    style={{ animationDuration: '8s', animationDelay: '-2s' }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-600/5"></div>

                {/* Mesh Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), 
                                         radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%), 
                                         radial-gradient(circle at 40% 40%, rgba(71, 85, 105, 0.1) 0%, transparent 50%)`,
                    }}
                ></div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="mb-12 text-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="mb-6 inline-flex items-center rounded-full border border-white/50 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                            <span className="text-sm font-semibold text-slate-700">Available Now</span>
                        </div>
                    </div>

                    <h2
                        className={`mb-6 text-4xl leading-tight font-bold text-slate-700 transition-all delay-200 duration-1000 md:text-5xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        Featured
                        <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Buildings</span>
                    </h2>

                    <p
                        className={`mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 transition-all delay-400 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        Browse our selection of high-quality second-hand buildings available for purchase. Each structure is carefully dismantled and
                        prepared for transport with precision engineering.
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div
                        className={`mb-12 flex justify-center transition-all delay-600 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    >
                        <TabsList className="rounded-2xl border border-white/50 bg-white/80 p-2 shadow-xl backdrop-blur-sm">
                            {buildingTypes.map((type) => (
                                <TabsTrigger
                                    key={type.id}
                                    value={type.id}
                                    onClick={() => setActiveFilter(type.id)}
                                    className="rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:bg-slate-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-400 data-[state=active]:text-white"
                                >
                                    <type.icon className="mr-2 h-5 w-5" />
                                    {type.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value={activeFilter} className="mt-0">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {filteredBuildings.map((building, index) => (
                                <BuildingCard key={building.id} building={building} index={index} />
                            ))}
                        </div>

                        <div
                            className={`mt-16 flex justify-center transition-all delay-1200 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full border-2 border-slate-300 bg-white/80 px-10 py-4 text-lg font-semibold text-slate-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-transparent hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:text-white hover:shadow-xl"
                            >
                                <Link href="/buildings">
                                    View All Buildings
                                    <ArrowRight className="ml-3 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default FeaturedBuildings;
