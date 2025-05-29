import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { ArrowRight, Building2, Factory, SquareStack, Video, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';

// Building types
const buildingTypes = [
    { id: 'all', label: 'All', icon: Building2 },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'halls', label: 'Halls', icon: Factory },
    { id: 'other', label: 'Other', icon: SquareStack },
];

// Mock data for buildings
const buildings = [
    {
        id: 1,
        title: 'Hall No.1',
        type: 'halls',
        dimensions: '75x225 m',
        area: '16,875 m²',
        height: 'Gutter 8.80 m, Ridge 12.5 m',
        materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
        image: 'https://www.tradingbv.com/wp-content/uploads/2025/02/Schermafbeelding-2024-10-16-134435.png',
    },
    {
        id: 2,
        title: 'Business Premises',
        type: 'other',
        dimensions: '85x110 m',
        area: '9,350 m²',
        height: 'Loading dock 7.5 m, Storage 10.5 m',
        materials: 'Steel, Wall sandwich and glass, Roof with insulation, Doors included',
        image: 'https://www.tradingbv.com/wp-content/uploads/2025/02/4.png',
    },
    {
        id: 3,
        title: 'Warehouse',
        type: 'warehouses',
        dimensions: '44x88 m',
        area: '3,872 m²',
        height: 'Contact for details',
        materials: 'Steel construction',
        image: 'https://www.tradingbv.com/wp-content/uploads/2024/06/20240523_101558000_iOS-2048x1152.jpg',
    },
    {
        id: 4,
        title: 'Steel Structure',
        type: 'other',
        dimensions: '45x75 m',
        area: '3,375 m²',
        height: 'Gutter 10-12 m',
        materials: 'No walls, No roof',
        image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
];

const FeaturedBuildings = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const filteredBuildings = activeFilter === 'all' ? buildings : buildings.filter((building) => building.type === activeFilter);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-16 md:py-16">
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
                        <span className="ms-4 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Buildings</span>
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
                                <Card
                                    key={building.id}
                                    className={`group animate-fade-up flex h-full flex-col overflow-hidden rounded-2xl border-0 bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ animationDelay: `${800 + index * 100}ms` }}
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={building.image}
                                            alt={building.title}
                                            className="object-full h-full w-full transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                        {building.hasVideo && (
                                            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                                                <Video className="h-4 w-4" />
                                                Video Tour
                                            </div>
                                        )}

                                        {/* Floating accent */}
                                        <div className="absolute bottom-4 left-4 h-3 w-3 animate-pulse rounded-full bg-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </div>

                                    <CardContent className="flex-grow bg-gradient-to-br from-white to-slate-50/50 p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <h3 className="text-xl font-bold text-slate-700 transition-colors duration-300 group-hover:text-orange-500">
                                                {building.title}
                                            </h3>
                                            <Badge
                                                variant="outline"
                                                className="border-slate-200 bg-gradient-to-r from-slate-100 to-white font-semibold text-slate-600"
                                            >
                                                {building.type.charAt(0).toUpperCase() + building.type.slice(1)}
                                            </Badge>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-2">
                                                <span className="min-w-[80px] font-medium text-slate-500">Dimensions:</span>
                                                <span className="font-semibold text-slate-700">{building.dimensions}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="min-w-[80px] font-medium text-slate-500">Area:</span>
                                                <span className="font-semibold text-slate-700">{building.area}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="min-w-[80px] font-medium text-slate-500">Height:</span>
                                                <span className="font-semibold text-slate-700">{building.height}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="min-w-[80px] font-medium text-slate-500">Materials:</span>
                                                <span className="line-clamp-2 font-semibold text-slate-700">{building.materials}</span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-6 pt-0">
                                        <Button
                                            asChild
                                            className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-500 hover:shadow-xl"
                                        >
                                            <Link href={`/buildings/${building.id}`}>
                                                View Details
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
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
