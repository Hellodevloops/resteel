
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data for buildings (more extensive than the featured ones)
const buildingsData = [
  {
    id: 1,
    title: 'Hall No.1',
    type: 'halls',
    dimensions: '75x225 m',
    area: '16,875 m²',
    height: 'Gutter 8.80 m, Ridge 12.5 m',
    materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
    hasVideo: true,
    videoUrl: 'https://youtu.be/OFdFeEPyapU?si=q3J5k0PIjzAp2wH2',
    image: 'https://images.unsplash.com/photo-1553522911-d9e11577dc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Hall No.2',
    type: 'halls',
    dimensions: '50x90 m',
    area: '4,500 m²',
    height: 'Gutter 8.80 m, Ridge 12.5 m',
    materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
    hasVideo: true,
    videoUrl: 'https://youtu.be/hP-YuahiFBQ?si=VaFagc0fpMFYSKYF',
    image: 'https://images.unsplash.com/photo-1565939513947-3c6481adc0d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Hall No.3',
    type: 'halls',
    dimensions: '75x190 m',
    area: '14,250 m²',
    height: 'Gutter 8.80 m, Ridge 12.5 m',
    materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
    hasVideo: true,
    videoUrl: 'https://youtu.be/OFdFeEPyapU?si=q3J5k0PIjzAp2wH2',
    image: 'https://images.unsplash.com/photo-1517520853509-2bc4129825a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Business Premises',
    type: 'commercial',
    dimensions: '85x110 m',
    area: '9,350 m²',
    height: 'Loading dock 7.5 m, Storage 10.5 m',
    materials: 'Steel, Wall sandwich and glass, Roof with insulation, Doors included',
    hasVideo: true,
    videoUrl: 'https://youtu.be/nDMEJ53FIFU?si=0HiY8k2S5WwhFpCb',
    image: 'https://images.unsplash.com/photo-1554435493-93422e8d1c46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Small Hall',
    type: 'halls',
    dimensions: '16.5x20 m',
    area: '336 m²',
    height: 'Gutter 4.6 m, Ridge 7.85 m',
    materials: 'Steel, Sandwich wall panels and glass, Isolated roof panels, Windows',
    hasVideo: true,
    videoUrl: 'https://youtu.be/iAiTm-Hwrro',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Steel Structure',
    type: 'structures',
    dimensions: '50x90 m',
    area: '4,500 m²',
    height: 'Gutter 5.7 m, Ridge 7.7 m',
    materials: '1x roof plates, 1x wall plates, 1x batch concrete elements 200 m',
    hasVideo: false,
    image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    title: 'Steel Structure Frame',
    type: 'structures',
    dimensions: '45x75 m',
    area: '3,375 m²',
    height: 'Gutter 10-12 m',
    materials: 'No walls, No roof',
    hasVideo: false,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    title: 'Medium Hall',
    type: 'halls',
    dimensions: '27x40 m',
    area: '1,080 m²',
    height: 'Gutter 9 m, Ridge 9 m',
    materials: 'Steel, Isolated roof panels, Roof plates, Ytong walls',
    hasVideo: true,
    videoUrl: 'https://youtu.be/Xtweo0aHWGU',
    image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    title: 'Warehouse Complex',
    type: 'warehouses',
    dimensions: '44x88 m',
    area: '3,872 m²',
    height: 'Contact for details',
    materials: 'Steel construction',
    hasVideo: false,
    image: 'https://images.unsplash.com/photo-1631651364796-c49f56b726d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Building types for filtering
const buildingTypes = [
  { id: 'all', label: 'All Buildings' },
  { id: 'halls', label: 'Halls' },
  { id: 'warehouses', label: 'Warehouses' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'structures', label: 'Structures' }
];

const Buildings = () => {
  const [filter, setFilter] = useState('all');
  const [videoFilter, setVideoFilter] = useState(false);

  // Apply filters
  const filteredBuildings = buildingsData.filter(building => {
    const typeMatch = filter === 'all' || building.type === filter;
    const videoMatch = videoFilter ? building.hasVideo : true;
    return typeMatch && videoMatch;
  });

  // Update document title
  useEffect(() => {
    document.title = 'Available Buildings | Resteel';
  }, []);

  return (
    <>
      <Header />
      
      <main className="pt-28">
        {/* Hero Banner */}
        <section className="bg-resteel-primary text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Available Buildings</h1>
            <p className="max-w-2xl text-lg text-white/90">
              Browse our current inventory of second-hand industrial buildings, warehouses, 
              and structures available for purchase, disassembly, and transport.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-resteel-light border-b border-resteel-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                {buildingTypes.map((type) => (
                  <Button 
                    key={type.id}
                    onClick={() => setFilter(type.id)}
                    variant={filter === type.id ? "default" : "outline"}
                    className={filter === type.id ? "bg-resteel-primary text-white" : "text-resteel-primary border-resteel-primary"}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={videoFilter}
                    onChange={() => setVideoFilter(!videoFilter)}
                    className="h-4 w-4 rounded border-resteel-primary text-resteel-primary focus:ring-resteel-primary"
                  />
                  <span className="ml-2 text-resteel-dark">Show only with videos</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Buildings Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredBuildings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuildings.map((building) => (
                  <Card key={building.id} className="overflow-hidden h-full flex flex-col border-0 rounded-xl shadow-soft">
                    <div className="relative h-60 overflow-hidden">
                      <img 
                        src={building.image} 
                        alt={building.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                      {building.hasVideo && (
                        <Badge className="absolute top-3 right-3 bg-resteel-accent text-white border-0">
                          Video Available
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <div className="mb-4">
                        <Badge variant="outline" className="text-xs capitalize border-resteel-border text-resteel-primary">
                          {building.type}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-xl mb-3 text-resteel-primary">{building.title}</h3>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p><span className="font-medium text-resteel-dark">Dimensions:</span> {building.dimensions}</p>
                        <p><span className="font-medium text-resteel-dark">Area:</span> {building.area}</p>
                        <p><span className="font-medium text-resteel-dark">Height:</span> {building.height}</p>
                        <p className="line-clamp-2"><span className="font-medium text-resteel-dark">Materials:</span> {building.materials}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <Button asChild className="bg-resteel-primary hover:bg-resteel-dark text-white w-full">
                          <Link to={`/buildings/${building.id}`}>
                            View Details
                          </Link>
                        </Button>
                        {building.hasVideo && (
                          <Button 
                            variant="outline" 
                            className="border-resteel-primary text-resteel-primary hover:bg-resteel-primary/10 w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(building.videoUrl, '_blank');
                            }}
                          >
                            Watch Video
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2 text-resteel-primary">No buildings match your filters</h3>
                <p className="text-gray-500 mb-6">Try changing your filter criteria</p>
                <Button 
                  onClick={() => {
                    setFilter('all');
                    setVideoFilter(false);
                  }}
                  className="bg-resteel-primary hover:bg-resteel-dark text-white"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-resteel-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-resteel-primary">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our inventory is constantly changing. Contact us with your specific requirements,
              and we'll help you find the perfect building for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-resteel-primary hover:bg-resteel-dark text-white">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
              <Button asChild variant="outline" className="border-resteel-primary text-resteel-primary hover:bg-resteel-primary/10">
                <Link to="/contact">Sell Your Building</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Buildings;
