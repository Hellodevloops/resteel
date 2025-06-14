import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { ArrowRight, Building, Building2, ExternalLink, Eye, Factory, Play, Ruler, Square, SquareStack, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';

// Brand color constants
const steelBlue = "#0076A8";
const charcoal = "#3C3F48";
const vibrantOrange = "#FF6600";

// Utility function to truncate text
const truncateText = (text: string, maxWords: number = 19) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
};

// Building types
const buildingTypes = [
    { id: 'all', label: 'All', icon: Building2 },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'halls', label: 'Halls', icon: Factory },
    { id: 'other', label: 'Other', icon: SquareStack },
];


// Define the building type interface
interface Building {
    id: number;
    title: string;
    status: string;
    type: string;
    category: string;
    construction: string;
    image: string;
    specifications: Array<{
        name: string;
        dimensions: string;
        area: string;
    }>;
    totalArea: string;
    hasVideo: boolean;
    videoUrls?: string[];
    featured: boolean;
    year_built?: string;
    location?: string;
    description?: string;
}

const FeaturedBuildings = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
        const fetchWarehouses = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/featured-warehouses');
                if (response.data && response.data.warehouses) {
                    setBuildings(response.data.warehouses.slice(0, 3));
                } else {
                    setError('No warehouses found');
                }
            } catch (err) {
                console.error('Error fetching warehouses:', err);
                setError('Failed to load warehouses');
            } finally {
                setLoading(false);
            }
        };
        fetchWarehouses();
    }, []);

    const filteredBuildings = activeFilter === 'all' ? buildings : buildings.filter((building) => building.type === activeFilter);

    const BuildingCard = ({ building, index }: { building: Building; index: number }) => {
        return (
            <div
                className={`group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
            >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={building.image}
                        alt={building.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-white">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white"></span>
                            {building.status}
                        </span>
                    </div>
                    {building.hasVideo && (
                        <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center rounded-full bg-blue-500/90 px-3 py-1 text-xs font-semibold text-white">
                                <Play className="mr-1 h-3 w-3" />
                                Video
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                        <span className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-gray-800">
                            {building.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    <h3 className="mb-3 truncate text-lg font-semibold text-gray-900 group-hover:text-amber-600">
                        {truncateText(building.title, 19)}
                    </h3>

                    {/* Total Area */}
                    <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center">
                            <Square className="mr-2 h-4 w-4 text-amber-500" />
                            <span className="text-sm text-gray-600">Total Area</span>
                        </div>
                        <span className="text-base font-semibold text-gray-900">{building.totalArea}</span>
                    </div>

                    {/* Construction Info */}
                    <div className="mb-4">
                        <div className="flex items-center">
                            <Building className="mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-600">Construction</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{truncateText(building.construction, 19)}</p>
                    </div>

                    {/* Specifications */}
                    <div className="mb-6">
                        <div className="flex items-center">
                            <Ruler className="mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-600">Specifications</span>
                        </div>
                        <div className="mt-2 space-y-2">
                            {building.specifications.slice(0, 2).map((spec, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-700">{truncateText(spec.name, 19)}</span>
                                    <span className="text-gray-500">{spec.dimensions}</span>
                                </div>
                            ))}
                            {building.specifications.length > 2 && (
                                <span className="text-xs font-medium text-amber-500">
                                    +{building.specifications.length - 2} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            asChild
                            className="flex-1 rounded-lg bg-amber-500 text-white hover:bg-amber-600"
                        >
                            <Link href={`/buildingsdetails?id=${building.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Details
                            </Link>
                        </Button>
                        {building.hasVideo && building.videoUrls && building.videoUrls.length > 0 && (
                            <Button
                                variant="outline"
                                className="rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                                onClick={() => window.open(building.videoUrls![0], '_blank')}
                            >
                                <Play className="h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            className="rounded-lg border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50  py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2
                        className={`text-3xl font-bold text-slate-800 sm:text-4xl md:text-5xl transition-all duration-700 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }` } style={{ color: charcoal }}
                    >
                        Featured{' '}
                        <span className="text-orange-500" style={{ color: steelBlue }}>
                            Buildings
                        </span>
                    </h2>
                    <p
                        className={`mx-auto max-w-2xl text-base mt-2 text-gray-600 sm:text-lg transition-all duration-700 delay-200 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                    >
                        Explore our curated selection of premium second-hand buildings, ready for relocation with expert precision.
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div
                        className={`mb-8 flex justify-center transition-all duration-700 delay-400 ${
                            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                    >
                        <TabsList className="inline-flex rounded-xl bg-gray-100 p-1.5">
                            {buildingTypes.map((type) => (
                                <TabsTrigger
                                    key={type.id}
                                    value={type.id}
                                    onClick={() => setActiveFilter(type.id)}
                                    className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all data-[state=active]:bg-amber-500 data-[state=active]:text-white hover:bg-gray-200"
                                >
                                    <type.icon className="mr-2 h-4 w-4" />
                                    {type.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value={activeFilter} className="mt-0">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
                                <span className="ml-3 text-gray-600">Loading buildings...</span>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center py-12">
                                <div className="rounded-lg bg-red-50 px-6 py-4 text-red-600">{error}</div>
                            </div>
                        ) : filteredBuildings.length === 0 ? (
                            <div className="flex justify-center py-12">
                                <div className="rounded-lg bg-gray-100 px-6 py-4 text-gray-600">
                                    No buildings found in this category.
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredBuildings.map((building, index) => (
                                    <BuildingCard key={building.id} building={building} index={index} />
                                ))}
                            </div>
                        )}
                        <div
                            className={`mt-12 flex justify-center transition-all duration-700 delay-600 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full border-amber-500 bg-white px-8 py-3 text-amber-500 hover:bg-amber-500 hover:text-white"
                            >
                                <Link href="/buildings">
                                    View All Buildings
                                    <ArrowRight className="ml-2 h-4 w-4" />
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
