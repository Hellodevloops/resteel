import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { ArrowRight, Building, Building2, ExternalLink, Eye, Factory, Play, Ruler, Square, SquareStack, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';

// Utility function to truncate text to 19 words
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
    { id: 'Steelconstuctions', label: 'Steelconstuctions', icon: Factory },
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
        // Animation delay
        setTimeout(() => setIsVisible(true), 100);

        // Fetch warehouse data from the backend
        const fetchWarehouses = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/featured-warehouses');
                if (response.data && response.data.warehouses) {
                    // Limit to only 3 warehouses
                    const limitedWarehouses = response.data.warehouses.slice(0, 3);
                    setBuildings(limitedWarehouses);
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
                className={
                    // Added min-h to ensure consistent card height
                    'group relative mx-3 min-h-[600px] w-10/12 overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-900/20' +
                    (isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0')
                }
                style={{ animationDelay: `${800 + index * 100}ms` }}
            >
                {/* Image Section with fixed height */}
                <div className="relative h-72 overflow-hidden">
                    <img
                        src={building.image}
                        alt={building.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white"></span>
                            {building.status}
                        </div>
                    </div>
                    {building.hasVideo && (
                        <div className="absolute top-4 right-4">
                            <div className="flex items-center rounded-full bg-blue-600/90 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                                <Play className="mr-1 h-3 w-3" />
                                Video Available
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                        <div className="rounded-lg bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">{building.category}</div>
                    </div>
                </div>

                {/* Content Section with consistent layout */}
                <div className="flex h-[calc(100%-18rem)] flex-col p-6">
                    {/* Title with truncation */}
                    <h3 className="mb-4 truncate text-xl font-bold text-slate-800 transition-colors group-hover:text-orange-500">
                        {truncateText(building.title, 19)}
                    </h3>

                    {/* Total Area Display */}
                    <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <div className="flex items-center">
                            <Square className="mr-2 h-5 w-5 text-orange-500" />
                            <span className="text-sm font-medium text-slate-600">Total Area</span>
                        </div>
                        <span className="text-lg font-bold text-slate-800">{building.totalArea}</span>
                    </div>

                    {/* Construction Info with truncation */}
                    <div className="mb-6 flex-1">
                        <div className="mb-2 flex items-center">
                            <Building className="mr-2 h-4 w-4 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-600">Construction</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">{truncateText(building.construction, 19)}</p>
                    </div>

                    {/* Specifications Preview with truncation */}
                    <div className="mb-6">
                        <div className="mb-3 flex items-center">
                            <Ruler className="mr-2 h-4 w-4 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-600">Specifications</span>
                        </div>
                        <div className="space-y-2">
                            {building.specifications.slice(0, 2).map((spec, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700">{truncateText(spec.name, 19)}</span>
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
                            <Link href={`/buildingsdetails?id=${building.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Link>
                        </Button>
                        {building.hasVideo && building.videoUrls && building.videoUrls.length > 0 && (
                            <button
                                onClick={() => window.open(building.videoUrls![0], '_blank')}
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

                <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 transform bg-gradient-to-r from-orange-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
        );
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-16">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-600/5"></div>
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 40% 40%, rgba(71, 85, 105, 0.1) 0%, transparent 50%)`,
                }}
            ></div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2
                        className={`mb-6 text-3xl leading-tight font-bold text-slate-700 transition-all delay-200 duration-1000 sm:text-4xl md:text-5xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        Featured
                        <span className="ms-2 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent sm:ms-4">Buildings</span>
                    </h2>
                    <p
                        className={`mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 transition-all delay-400 duration-1000 sm:text-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        Browse our selection of high-quality second-hand buildings available for purchase. Each structure is carefully dismantled and
                        prepared for transport with precision engineering.
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div
                        className={`mb-12 flex justify-center transition-all delay-600 duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    >
                        <TabsList className="flex flex-wrap justify-center gap-2 rounded-2xl border border-white/50 bg-white/80 p-2 shadow-xl backdrop-blur-sm">
                            {buildingTypes.map((type) => (
                                <TabsTrigger
                                    key={type.id}
                                    value={type.id}
                                    onClick={() => setActiveFilter(type.id)}
                                    className="flex items-center rounded-xl px-4 py-2 font-semibold transition-all duration-300 hover:bg-slate-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-400 data-[state=active]:text-white sm:px-6 sm:py-3"
                                >
                                    <type.icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    {type.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value={activeFilter} className="mt-0">
                        {loading ? (
                            <div className="flex justify-center p-8">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
                                <span className="ml-2">Loading buildings...</span>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center p-8">
                                <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
                            </div>
                        ) : filteredBuildings.length === 0 ? (
                            <div className="flex justify-center p-8">
                                <div className="rounded-lg bg-slate-50 p-4 text-slate-600">No buildings found in this category.</div>
                            </div>
                        ) : (
                            <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {filteredBuildings.map((building, index) => (
                                    <BuildingCard key={building.id} building={building} index={index} />
                                ))}
                            </div>
                        )}
                        <div
                            className={`mt-12 flex justify-center transition-all delay-1200 duration-1000 sm:mt-16 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full border-2 border-slate-300 bg-white/80 px-8 py-3 text-base font-semibold text-slate-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-transparent hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:text-white hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
                            >
                                <Link href="/buildings">
                                    View All Buildings
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
