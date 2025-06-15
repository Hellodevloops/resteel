import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import {
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

// Utility function to truncate text
const truncateText = (text: string, maxWords: number) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

const useResponsiveBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return breakpoint;
};

interface Building {
  id: number;
  title: string;
  status: string;
  type: string;
  category: string;
  construction: string;
  image: string;
  specifications: {
    name: string;
    dimensions: string;
    area: string;
  }[];
  totalArea: string;
  hasVideo: boolean;
  videoUrls?: string[];
  featured: boolean;
  year_built?: string;
  location?: string;
  description?: string;
}

const Buildings = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const { isMobile, isTablet } = useResponsiveBreakpoints();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setIsVisible(true), 100);

    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/warehouses');
        if (response.data && response.data.data) {
          const transformed: Building[] = response.data.data.map((item: any) => ({
            id: item.id,
            title: item.name || 'Untitled',
            status: item.status || 'unknown',
            type: item.type || 'unknown',
            category: item.category || 'N/A',
            construction: item.construction || 'N/A',
            image: item.image_path
              ? item.image_path.startsWith('/storage')
                ? `${location.origin}${item.image_path}`
                : item.image_path
              : 'https://via.placeholder.com/600x400?text=No+Image',
            totalArea: item.total_area ? `${item.total_area} ${item.unit_of_measurement || ''}` : 'N/A',
            hasVideo: item.has_video || false,
            videoUrls: (item.video_urls || []).filter((v: string | null) => !!v),
            featured: false,
            year_built: item.year_built || '',
            location: item.location || '',
            description: item.description || '',
            specifications: [
              {
                name: 'Main Hall',
                dimensions: item.main_hall_dimensions || 'N/A',
                area: item.main_hall_area || 'N/A'
              },
              {
                name: 'Office Space',
                dimensions: item.office_space_dimensions || 'N/A',
                area: item.office_space_area || 'N/A'
              },
              {
                name: 'Loading Dock',
                dimensions: item.loading_dock_dimensions || 'N/A',
                area: item.loading_dock_area || 'N/A'
              }
            ].filter(spec => spec.dimensions !== 'N/A' || spec.area !== 'N/A')
          }));

          setBuildings(transformed);
        } else {
          setError('No buildings found');
        }
      } catch (err) {
        console.error('Error fetching buildings:', err);
        setError('Failed to load buildings');
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buildingTypes = [
    { id: 'all', label: 'All Buildings', icon: Building2 },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'commercial', label: 'Commercial', icon: Factory },
    { id: 'industrial', label: 'Industrial', icon: SquareStack }
  ];

  const filteredBuildings = filter === 'all' ? buildings : buildings.filter(b => b.type === filter);

  const getTextTruncation = () => ({
    title: isMobile ? 6 : isTablet ? 10 : 15,
    construction: isMobile ? 8 : isTablet ? 12 : 20,
    specsToShow: isMobile ? 1 : 2
  });

  const BuildingCard = ({ building }: { building: Building }) => {
    const truncation = getTextTruncation();

    return (
      <div className="rounded-xl bg-white p-4 shadow-md hover:shadow-lg transition-all">
        <img
          src={building.image}
          alt={building.title}
          className="mb-4 h-48 w-full object-cover rounded-md"
        />
        <h3 className="font-bold text-lg mb-1">{truncateText(building.title, truncation.title)}</h3>
        <p className="text-sm text-gray-600 mb-2">{truncateText(building.construction, truncation.construction)}</p>
        <p className="text-sm text-gray-700 font-semibold mb-2">Total Area: {building.totalArea}</p>
        <div className="space-y-1 text-sm text-gray-700 mb-4">
          {building.specifications.slice(0, truncation.specsToShow).map((spec, i) => (
            <div key={i} className="flex justify-between">
              <span>{spec.name}</span>
              <span>{spec.dimensions}</span>
            </div>
          ))}
          {building.specifications.length > truncation.specsToShow && (
            <div className="text-orange-500">+{building.specifications.length - truncation.specsToShow} more...</div>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/building-details/${building.id}`}>
              <Eye className="mr-1 h-4 w-4" />
              View
            </Link>
          </Button>
          {building.hasVideo && building.videoUrls?.[0] && (
            <Button variant="outline" onClick={() => window.open(building.videoUrls[0], '_blank')}>
              <Play className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Buildings</h1>

        <div className="flex gap-4 mb-8 flex-wrap">
          {buildingTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-4 py-2 rounded-full font-semibold ${
                filter === type.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-600'
              }`}
            >
              <type.icon className="inline-block mr-2 h-4 w-4" />
              {type.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-600">Loading buildings...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBuildings.map(building => (
              <BuildingCard key={building.id} building={building} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Buildings;
