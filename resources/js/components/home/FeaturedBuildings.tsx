import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { ArrowRight, Building2, Factory, SquareStack, Video, Warehouse } from 'lucide-react';
import { useState } from 'react';

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
        hasVideo: true,
        image: 'https://images.unsplash.com/photo-1553522911-d9e11577dc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        title: 'Business Premises',
        type: 'other',
        dimensions: '85x110 m',
        area: '9,350 m²',
        height: 'Loading dock 7.5 m, Storage 10.5 m',
        materials: 'Steel, Wall sandwich and glass, Roof with insulation, Doors included',
        hasVideo: true,
        image: 'https://images.unsplash.com/photo-1554435493-93422e8d1c46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        title: 'Warehouse',
        type: 'warehouses',
        dimensions: '44x88 m',
        area: '3,872 m²',
        height: 'Contact for details',
        materials: 'Steel construction',
        hasVideo: false,
        image: 'https://images.unsplash.com/photo-1517520853509-2bc4129825a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 4,
        title: 'Steel Structure',
        type: 'other',
        dimensions: '45x75 m',
        area: '3,375 m²',
        height: 'Gutter 10-12 m',
        materials: 'No walls, No roof',
        hasVideo: false,
        image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
];

const FeaturedBuildings = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredBuildings = activeFilter === 'all' ? buildings : buildings.filter((building) => building.type === activeFilter);

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <div className="bg-resteel-light mb-4 inline-flex items-center rounded-full px-4 py-1">
                        <span className="text-resteel-primary text-sm font-medium">Available Now</span>
                    </div>
                    <h2 className="text-resteel-primary mb-4 text-3xl font-bold md:text-4xl">Featured Buildings</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Browse our selection of high-quality second-hand buildings available for purchase. Each structure is carefully dismantled and
                        prepared for transport.
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div className="mb-8 flex justify-center">
                        <TabsList className="bg-resteel-light rounded-full p-1">
                            {buildingTypes.map((type) => (
                                <TabsTrigger
                                    key={type.id}
                                    value={type.id}
                                    onClick={() => setActiveFilter(type.id)}
                                    className="data-[state=active]:bg-resteel-primary rounded-full data-[state=active]:text-white"
                                >
                                    <type.icon className="mr-2 h-4 w-4" />
                                    {type.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value={activeFilter} className="mt-0">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {filteredBuildings.map((building) => (
                                <Card
                                    key={building.id}
                                    className="animate-fade-up shadow-soft flex h-full flex-col overflow-hidden rounded-xl border-0 transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={building.image}
                                            alt={building.title}
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        {building.hasVideo && (
                                            <div className="bg-resteel-accent absolute top-3 right-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white">
                                                <Video className="h-3 w-3" />
                                                Video Tour
                                            </div>
                                        )}
                                        <div className="absolute inset-0 top-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                                    </div>
                                    <CardContent className="flex-grow py-6">
                                        <div className="mb-2 flex items-start justify-between">
                                            <h3 className="text-resteel-primary text-xl font-semibold">{building.title}</h3>
                                            <Badge variant="outline" className="bg-resteel-light text-resteel-primary border-0">
                                                {building.type.charAt(0).toUpperCase() + building.type.slice(1)}
                                            </Badge>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>
                                                <span className="text-resteel-dark font-medium">Dimensions:</span> {building.dimensions}
                                            </p>
                                            <p>
                                                <span className="text-resteel-dark font-medium">Area:</span> {building.area}
                                            </p>
                                            <p>
                                                <span className="text-resteel-dark font-medium">Height:</span> {building.height}
                                            </p>
                                            <p className="line-clamp-2">
                                                <span className="text-resteel-dark font-medium">Materials:</span> {building.materials}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0 pb-6">
                                        <Button
                                            asChild
                                            className="bg-resteel-primary hover:bg-resteel-dark w-full rounded-lg text-white shadow-md transition-all duration-300"
                                        >
                                            <Link href={`/buildings/${building.id}`}>View Details</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Button
                                asChild
                                variant="outline"
                                className="border-resteel-primary text-resteel-primary hover:bg-resteel-primary/10 rounded-full px-8"
                            >
                                <Link href="/buildings">
                                    View All Buildings
                                    <ArrowRight className="ml-2 h-5 w-5" />
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
