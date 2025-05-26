
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Phone, Mail, Building, ArrowRight } from 'lucide-react';

// Mock data for buildings (same as in Buildings.tsx)
const buildingsData = [
  {
    id: 1,
    title: 'Hall No.1',
    type: 'halls',
    dimensions: '75x225 m',
    area: '16,875 m²',
    height: 'Gutter 8.80 m, Ridge 12.5 m',
    materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
    location: 'Netherlands',
    price: 'Contact for price',
    description: 'This spacious industrial hall features a robust steel structure with high-quality insulation. The building can be disassembled and transported to your location. Ideal for manufacturing, warehousing, or large-scale commercial operations.',
    features: [
      'Steel frame construction',
      'High ceiling height',
      'Insulated roof and walls',
      'Customizable layout',
      'Optional loading docks',
      'Energy-efficient design'
    ],
    hasVideo: true,
    videoUrl: 'https://youtu.be/OFdFeEPyapU?si=q3J5k0PIjzAp2wH2',
    images: [
      'https://images.unsplash.com/photo-1553522911-d9e11577dc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 2,
    title: 'Hall No.2',
    type: 'halls',
    dimensions: '50x90 m',
    area: '4,500 m²',
    height: 'Gutter 8.80 m, Ridge 12.5 m',
    materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
    location: 'Germany',
    price: '€350,000',
    description: 'A versatile industrial hall with excellent structural integrity. This building has been well-maintained and is ready for dismantling and transport. Perfect for medium-sized industrial operations or storage facilities.',
    features: [
      'Durable steel construction',
      'Well-insulated walls and roof',
      'Multiple access points',
      'Flexible interior space',
      'Good natural lighting',
      'Low maintenance requirements'
    ],
    hasVideo: true,
    videoUrl: 'https://youtu.be/hP-YuahiFBQ?si=VaFagc0fpMFYSKYF',
    images: [
      'https://images.unsplash.com/photo-1565939513947-3c6481adc0d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 3,
    title: 'Hall No.3',
    type: 'halls',
    dimensions: '75x190 m',
    area: '14,250 m²',
    height: 'Gutter 8.80 m, Ridge 12.5 m',
    materials: 'Steel, Roof plates sandwich 60mm, Wall plates sandwich 40mm, Ytong',
    location: 'Belgium',
    price: 'Contact for price',
    description: 'This expansive industrial hall offers exceptional space and functionality. The steel structure is in excellent condition and ready for a new location. Suitable for large manufacturing facilities, logistics centers, or distribution warehouses.',
    features: [
      'Spacious open floor plan',
      'High-quality construction materials',
      'Modular design for easy customization',
      'Enhanced insulation properties',
      'Multiple entry points',
      'Adaptable for various industrial uses'
    ],
    hasVideo: true,
    videoUrl: 'https://youtu.be/OFdFeEPyapU?si=q3J5k0PIjzAp2wH2',
    images: [
      'https://images.unsplash.com/photo-1517520853509-2bc4129825a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  // Additional buildings data kept consistent with Buildings.tsx
  {
    id: 4,
    title: 'Business Premises',
    type: 'commercial',
    dimensions: '85x110 m',
    area: '9,350 m²',
    height: 'Loading dock 7.5 m, Storage 10.5 m',
    materials: 'Steel, Wall sandwich and glass, Roof with insulation, Doors included',
    location: 'Netherlands',
    price: '€420,000',
    description: 'Modern commercial building with premium features and flexible layout options. Ideal for retail, office space, or mixed-use development. The building includes high-end finishes and energy-efficient design elements.',
    features: [
      'Contemporary design',
      'Glass façade elements',
      'Flexible floor plan',
      'Premium insulation',
      'Energy-efficient systems',
      'Multiple loading docks'
    ],
    hasVideo: true,
    videoUrl: 'https://youtu.be/nDMEJ53FIFU?si=0HiY8k2S5WwhFpCb',
    images: [
      'https://images.unsplash.com/photo-1554435493-93422e8d1c46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const BuildingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [building, setBuilding] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // In a real application, this would be an API call
    const foundBuilding = buildingsData.find(b => b.id === parseInt(id || "0"));
    setBuilding(foundBuilding);
    
    // Update document title
    if (foundBuilding) {
      document.title = `${foundBuilding.title} | Resteel`;
    } else {
      document.title = 'Building Not Found | Resteel';
    }
  }, [id]);

  const nextImage = () => {
    if (building) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === building.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (building) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === 0 ? building.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Get related buildings (same type, excluding current)
  const relatedBuildings = building 
    ? buildingsData.filter(b => b.type === building.type && b.id !== building.id).slice(0, 3)
    : [];

  if (!building) {
    return (
      <>
        <Header />
        <main className="pt-28 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Building Not Found</h2>
              <p className="text-gray-600 mb-6">The building you're looking for doesn't exist or has been sold.</p>
              <Button asChild>
                <Link to="/buildings">View All Buildings</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="pt-28">
        {/* Breadcrumb */}
        <div className="bg-resteel-light py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-resteel-primary hover:text-resteel-accent">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link to="/buildings" className="text-resteel-primary hover:text-resteel-accent">Buildings</Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-600 font-medium">{building.title}</span>
            </div>
          </div>
        </div>

        {/* Building Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Gallery Section */}
              <div className="lg:w-2/3">
                <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-md mb-4">
                  <img 
                    src={building.images[activeImageIndex]} 
                    alt={`${building.title} - Image ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {building.hasVideo && (
                    <Link 
                      to={building.videoUrl} 
                      target="_blank"
                      className="absolute top-4 right-4 bg-resteel-accent/90 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
                    >
                      Watch Video Tour
                    </Link>
                  )}
                  
                  {building.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                      >
                        <ArrowLeft className="h-6 w-6 text-resteel-primary" />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                      >
                        <ArrowRight className="h-6 w-6 text-resteel-primary" />
                      </button>
                    </>
                  )}
                </div>
                
                {building.images.length > 1 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                    {building.images.map((image: string, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`h-20 w-32 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeImageIndex === idx ? 'border-resteel-accent' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <Badge className="mb-4 bg-resteel-light text-resteel-primary border-0">
                    {building.type.charAt(0).toUpperCase() + building.type.slice(1)}
                  </Badge>
                  
                  <h1 className="text-3xl font-bold mb-4 text-resteel-primary">{building.title}</h1>
                  
                  <div className="bg-resteel-light p-6 rounded-lg mb-6">
                    <div className="text-2xl font-bold mb-4 text-resteel-accent">{building.price}</div>
                    
                    <div className="space-y-3 text-gray-700">
                      <p><span className="font-medium text-resteel-dark">Location:</span> {building.location}</p>
                      <p><span className="font-medium text-resteel-dark">Dimensions:</span> {building.dimensions}</p>
                      <p><span className="font-medium text-resteel-dark">Area:</span> {building.area}</p>
                      <p><span className="font-medium text-resteel-dark">Height:</span> {building.height}</p>
                      <p><span className="font-medium text-resteel-dark">Materials:</span> {building.materials}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full bg-resteel-primary hover:bg-resteel-dark text-white font-medium py-3 rounded-lg">
                      Request More Information
                    </Button>
                    
                    <Button variant="outline" className="w-full border-resteel-primary text-resteel-primary hover:bg-resteel-primary/10 font-medium py-3 rounded-lg">
                      Schedule Inspection
                    </Button>
                  </div>

                  <div className="mt-8 bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-lg mb-4">Contact Our Team</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-resteel-primary mr-3" />
                        <span>+31 (0) 20 123 4567</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-resteel-primary mr-3" />
                        <span>info@resteel.eu</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-resteel-primary mr-3" />
                        <span>Amsterdam, Netherlands</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Building Description */}
            <div className="mt-12 lg:mt-16">
              <h2 className="text-2xl font-bold mb-6 text-resteel-primary">Building Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-6">{building.description}</p>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-resteel-primary">Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                {building.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 bg-resteel-accent rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Related Buildings */}
        {relatedBuildings.length > 0 && (
          <section className="py-12 bg-resteel-light">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-resteel-primary">Similar Buildings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBuildings.map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/buildings/${related.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={related.images[0]} 
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2 text-resteel-primary">{related.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium text-resteel-dark">Area:</span> {related.area}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-resteel-dark">Location:</span> {related.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default BuildingDetail;
