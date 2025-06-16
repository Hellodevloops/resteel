'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
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
import { motion, AnimatePresence } from 'framer-motion';

const steelBlue = '#0076A8';
const charcoal = '#3C3F48';

const buildingTypes = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
  { id: 'halls', label: 'Halls', icon: Factory },
  { id: 'other', label: 'Other', icon: SquareStack },
];

const truncateText = (text, maxWords = 19) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

const FeaturedBuildings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const fetchWarehouses = async () => {
      try {
        const res = await fetch('/api/warehouses');
        const json = await res.json();
        if (json.status === 'success') {
          const formatted = json.data.map((item) => ({
            id: item.id,
            title: item.name,
            status: 'SALE',
            type: 'warehouses',
            category: item.category || 'Uncategorized',
            totalArea: item.total_area ? `${item.total_area} ${item.unit_of_measurement}` : 'N/A',
            construction: item.construction || 'Not specified',
            image: item.image_path || '/placeholder.jpg',
            hasVideo: item.has_video,
            videoUrls: (item.video_urls || []).filter(Boolean),
            specifications: [
              {
                name: 'Main Hall',
                dimensions: item.main_hall_dimensions || 'N/A',
                area: item.total_area || 'N/A',
              },
            ],
          }));
          setWarehouses(formatted);
        }
      } catch (error) {
        console.error('Failed to load warehouses:', error);
      }
    };

    fetchWarehouses();
  }, []);

  const BuildingCard = ({ building }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
    >
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
          <span className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 uppercase">{building.category}</span>
        </div>
      </div>

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
          <Button asChild className="flex-1 rounded-lg bg-[#0076A8] text-white hover:bg-[#00628D]">
            <a href={`/building-details/${building.id}`} className="flex items-center justify-center">
              <Eye className="mr-2 h-4 w-4" /> Details
            </a>
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
    </motion.div>
  );

  return (
    <section className="bg-slate-200/80 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mt-4 text-4xl md:text-5xl font-bold" style={{ color: charcoal }}>
            Featured <span className="text-orange-500" style={{ color: steelBlue }}>Buildings</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base mt-2 text-gray-600 sm:text-lg">
            Explore our curated selection of premium second-hand buildings, ready for relocation with expert precision.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="inline-flex rounded-xl bg-gray-200 p-2 py-6">
              {buildingTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="flex items-center rounded-lg px-4  py-4 mx-1 text-md text-tight font-medium text-gray-700 transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white hover:bg-gray-300"
                >
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {buildingTypes.map((type) => {
            const filtered = type.id === 'all'
              ? warehouses
              : warehouses.filter((b) => b.type === type.id);

            return (
              <TabsContent key={type.id} value={type.id} className="mt-0">
                <AnimatePresence mode="wait">
                  {filtered.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center py-12"
                    >
                      <div className="rounded-lg bg-gray-100 px-6 py-4 text-gray-600">
                        No buildings found in this category.
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="grid"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.2,
                          },
                        },
                        exit: {
                          opacity: 0,
                          transition: { duration: 0.3 },
                        },
                      }}
                      className="grid gap-y-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                      {filtered.map((b) => (
                        <BuildingCard key={b.id} building={b} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12 flex justify-center">
                  <Link href="/buildings">
                    <Button
                      variant="outline"
                      className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3"
                    >
                      View All Buildings <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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
