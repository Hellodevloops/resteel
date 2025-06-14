'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight,
  Building,
  Building2,
  ExternalLink,
  Eye,
  Factory,
  Play,
  Ruler,
  Square,
  SquareStack,
  Warehouse
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Brand Colors
const steelBlue = "#0076A8";
const charcoal = "#3C3F48";
const vibrantOrange = "#FF6600";

// Building Types
const buildingTypes = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
  { id: 'halls', label: 'Halls', icon: Factory },
  { id: 'other', label: 'Other', icon: SquareStack },
];

// Truncate Text Utility
const truncateText = (text: string, maxWords: number = 19) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

// Dummy Data (static images, replace with your assets or URLs)
const buildings = [
  {
    id: 1,
    title: 'Hall No.1',
    status: 'SALE',
    type: 'halls',
    category: 'Industrial Halls',
    totalArea: '16,875 m²',
    construction: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
    image: '/assets/9.jpg',
    hasVideo: false,
    specifications: [
      { name: 'Main Hall', dimensions: '75 x 225 m', area: '16875' }
    ]
  },
  {
    id: 2,
    title: 'Business Premises',
    status: 'SALE',
    type: 'other',
    category: 'Business Buildings',
    totalArea: '9,350 m²',
    construction: 'Steel, Wall sandwich and glass, Roof with insulation, Doors included',
    image: '/assets/2.png',
    hasVideo: true,
    videoUrls: ['https://youtu.be/your-video'],
    specifications: [
      { name: 'Loading Dock', dimensions: '85 x 110 m', area: '9350' }
    ]
  },
  {
    id: 3,
    title: 'Warehouse',
    status: 'SALE',
    type: 'warehouses',
    category: 'Industrial Warehouses',
    totalArea: '3,872 m²',
    construction: 'Steel construction',
    image: '/assets/7.jpg',
    hasVideo: false,
    specifications: [
      { name: 'Warehouse', dimensions: '44 x 88 m', area: '3872' }
    ]
  },
  {
    id: 4,
    title: 'Modular Steel Hall',
    status: 'SALE',
    type: 'halls',
    category: 'Prefabricated Halls',
    totalArea: '12,600 m²',
    construction: 'Steel frame, Sandwich roof and wall panels, Modular sections',
    image: '/assets/5.jpg',
    hasVideo: true,
    videoUrls: ['https://youtu.be/sample-hall-video'],
    specifications: [
      { name: 'Modular Blocks', dimensions: '70 x 180 m', area: '12600' }
    ]
  },
  {
    id: 5,
    title: 'Distribution Warehouse',
    status: 'SALE',
    type: 'warehouses',
    category: 'Storage Facilities',
    totalArea: '5,600 m²',
    construction: 'Steel with insulated roofing, concrete flooring',
    image: '/assets/6.jpg',
    hasVideo: false,
    specifications: [
      { name: 'Storage Area', dimensions: '80 x 70 m', area: '5600' }
    ]
  },
  {
    id: 6,
    title: 'Tech Startup Hub',
    status: 'SALE',
    type: 'other',
    category: 'Office Buildings',
    totalArea: '4,250 m²',
    construction: 'Glass & steel structure, interior partitions, air conditioning',
    image: '/assets/3.jpg',
    hasVideo: true,
    videoUrls: ['https://youtu.be/startup-office-tour'],
    specifications: [
      { name: 'Main Building', dimensions: '50 x 85 m', area: '4250' }
    ]
  }
];

// Main Component
const FeaturedBuildings = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const BuildingCard = ({ building, index }: { building: typeof buildings[0]; index: number }) => (
    <div
      className={`group relative mx-auto max-w-7xl w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ animationDelay: `${300 + index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img src={building.image} alt={building.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white" />
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
          <span className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-gray-800">{building.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-3 truncate text-lg font-semibold text-gray-900 group-hover:text-orange-600">
          {truncateText(building.title)}
        </h3>

        <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div className="flex items-center">
            <Square className="mr-2 h-4 w-4 text-orange-500" />
            <span className="text-sm text-gray-600">Total Area</span>
          </div>
          <span className="text-base font-semibold text-gray-900">{building.totalArea}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Construction</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{truncateText(building.construction)}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <Ruler className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Specifications</span>
          </div>
          <div className="mt-2 space-y-2">
            {building.specifications.map((spec, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{spec.name}</span>
                <span className="text-gray-500">{spec.dimensions}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
         <Button
  className="flex-1 rounded-lg bg-[#0076A8] text-white hover:bg-[#00628D]"
>
  <Eye className="mr-2 h-4 w-4" />
  Details
</Button>

          {building.hasVideo && (
            <Button
              variant="outline"
              className="rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => window.open(building.videoUrls?.[0], '_blank')}
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" className="rounded-lg border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2
            className={`text-3xl font-bold sm:text-4xl md:text-5xl transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ color: charcoal }}
          >
            Featured <span className="text-orange-500" style={{ color: steelBlue }}>Buildings</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-base mt-2 text-gray-600 sm:text-lg transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Explore our curated selection of premium second-hand buildings, ready for relocation with expert precision.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className={`mb-8 flex justify-center transition-all duration-700 delay-400 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <TabsList className="inline-flex rounded-xl  bg-gray-200 p-2">
              {buildingTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="flex items-center rounded-lg px-4 py-3 text-lg font-medium text-gray-700 transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white hover:bg-gray-200"
                >
                  <type.icon className="mr-2 h-4 w-4" />
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {buildingTypes.map((type) => {
            const filtered = type.id === 'all'
              ? buildings
              : buildings.filter((b) => b.type === type.id);

            return (
              <TabsContent key={type.id} value={type.id} className="mt-0">
                {filtered.length === 0 ? (
                  <div className="flex justify-center py-12">
                    <div className="rounded-lg bg-gray-100 px-6 py-4 text-gray-600">
                      No buildings found in this category.
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((b, i) => (
                      <BuildingCard key={b.id} building={b} index={i} />
                    ))}
                  </div>
                )}
                <div className="mt-12 flex justify-center">
                  <Button variant="outline" className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3">
                    View All Buildings <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedBuildings;
