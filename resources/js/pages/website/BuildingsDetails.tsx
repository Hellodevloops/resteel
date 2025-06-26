'use client';

import { useEffect, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import Layout from './Layout';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import {
  ArrowLeft,
  Building,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  Heart,
  Mail,
  MapPin,
  Phone,
  Play,
  Share2,
  Square
} from 'lucide-react';

const BuildingDetails = () => {
  const { props } = usePage();
  const id = props.id;
  const [building, setBuilding] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showFullConstruction, setShowFullConstruction] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const res = await fetch(`/api/warehouses/${id}`);
        const json = await res.json();
        if (json.status === 'success') {
          const data = json.data;
          setBuilding({
            id: data.id,
            title: data.name,
            status: data.status || 'SALE',
            category: data.category || 'Warehouse',
            construction: data.construction || 'Not specified',
            description: data.description || 'No description available.',
            location: `${data.city || ''}, ${data.country || ''}`,
            yearBuilt: data.year_built || 'Unknown',
            price: data.price ? `€${data.price}` : 'Contact for Price',
            images: data.additional_images?.length > 0
              ? data.additional_images
              : data.image_path
              ? [data.image_path]
              : [],
            totalArea: data.total_area
              ? `${data.total_area} ${data.unit_of_measurement || ''}`
              : 'N/A',
            hasVideo: data.has_video,
            videoUrls: (data.video_urls || []).filter(Boolean),
            features: (data.features || []).filter(Boolean),
            specifications: [
              {
                name: 'Main Hall',
                dimensions: data.main_hall_dimensions || 'N/A',
                area: data.main_hall_area || 'N/A'
              },
              {
                name: 'Office Space',
                dimensions: data.office_space_dimensions || 'N/A',
                area: data.office_space_area || 'N/A'
              },
              {
                name: 'Loading Dock',
                dimensions: data.loading_dock_dimensions || 'N/A',
                area: data.loading_dock_area || 'N/A'
              }
            ].filter(spec => spec.dimensions !== 'N/A' || spec.area !== 'N/A')
          });
        }
      } catch (err) {
        console.error('Failed to fetch building data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuilding();
  }, [id]);

  useEffect(() => {
    if (building && building.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentThumbnailIndex(prev => (prev + 1) % building.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [building]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setCurrentThumbnailIndex(index);
  };

  const nextImage = () => {
    if (building) {
      setSelectedImageIndex(prev => (prev + 1) % building.images.length);
    }
  };

  const prevImage = () => {
    if (building) {
      setSelectedImageIndex(prev =>
        prev === 0 ? building.images.length - 1 : prev - 1
      );
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength).trim() + '...';
  };

  if (isLoading) {
    return (
      <Layout title="Loading Property">
        <div className="flex items-center justify-center min-h-[60vh] mt-16 sm:mt-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-orange-200 rounded-full animate-spin border-t-orange-500 mx-auto"></div>
            <h3 className="text-lg font-semibold text-gray-700">
              Loading Property Details
            </h3>
            <p className="text-gray-500">Please wait while we fetch the information...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!building) {
    return (
      <Layout title="Property Not Found">
        <div className="flex items-center justify-center min-h-[60vh] px-4 mt-16 sm:mt-20">
          <Card className="max-w-md w-full">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Property Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The property you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link to="/buildings">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Properties
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Resteel | ${building.title}`}>
      <div className="bg-gray-50 mt-20 sm:mt-25">
           
           {/* Sticky Navigation */}
           <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                 <div className="flex items-center space-x-4">
                   <Button variant="ghost" size="sm" asChild>
                     <Link href="/buildings">
                       <ArrowLeft className="w-4 h-4 mr-2" />
                       <span className="hidden sm:inline">Back to Properties</span>
                       <span className="sm:hidden">Back</span>
                     </Link>
                   </Button>
                   <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
                   
                 </div>
                 
                
               </div>
             </div>
           </div>
     
           {/* Main Content */}
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             
             {/* Property Header */}
             <div className="mb-8">
               <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                 <div className="flex-1">
                   <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                     {building.title}
                   </h1>
                   <div className="flex flex-wrap items-center gap-4 text-gray-600">
                     <div className="flex items-center">
                       <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                       <span className="text-sm">{building.location}</span>
                     </div>
                     <div className="flex items-center">
                       <Calendar className="w-4 h-4 mr-1 text-orange-500" />
                       <span className="text-sm">Built {building.yearBuilt}</span>
                     </div>
                     <div className="flex items-center">
                       <Square className="w-4 h-4 mr-1 text-orange-500" />
                       <span className="text-sm">{building.totalArea}</span>
                     </div>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-3xl sm:text-4xl font-bold text-orange-600 mb-1">
                     {building.price}
                   </p>
                   <p className="text-sm text-gray-500">
                     {building.totalArea !== 'N/A' ? `~€${Math.round(parseInt(building.price.replace(/[^0-9]/g, '')) / parseInt(building.totalArea.replace(/[^0-9]/g, '')))} per m²` : 'Contact for details'}
                   </p>
                 </div>
               </div>
             </div>
     
             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
               
               {/* Image Gallery */}
               <div className="xl:col-span-2">
                 <Card className="overflow-hidden">
                   <CardContent className="p-0">
                     
                     {/* Main Image */}
                     <div className="relative aspect-[4/3] bg-gray-200">
                       {building.images.length > 0 ? (
                         <>
                           <img
                             src={building.images[selectedImageIndex]}
                             alt={building.title}
                             className="w-full h-full object-cover"
                           />
                           
                           {/* Image Controls */}
                           {building.images.length > 1 && (
                             <>
                               <button
                                 onClick={prevImage}
                                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                                 aria-label="Previous image"
                               >
                                 <ChevronLeft className="w-5 h-5" />
                               </button>
                               <button
                                 onClick={nextImage}
                                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                                 aria-label="Next image"
                               >
                                 <ChevronRight className="w-5 h-5" />
                               </button>
                               
                               {/* Image Counter */}
                               <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                 {selectedImageIndex + 1} / {building.images.length}
                               </div>
                             </>
                           )}
                           
                           {/* Video Badge */}
                           {building.hasVideo && (
                             <div className="absolute top-4 left-4">
                               <Badge className="bg-blue-500 text-white">
                                 <Play className="w-3 h-3 mr-1" />
                                 Video Available
                               </Badge>
                             </div>
                           )}
                         </>
                       ) : (
                         <div className="w-full h-full flex items-center justify-center">
                           <div className="text-center">
                             <Building className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                             <p className="text-gray-500">No images available</p>
                           </div>
                         </div>
                       )}
                     </div>
     
                     {/* Thumbnail Grid */}
                     {building.images.length > 1 && (
                       <div className="p-4 bg-gray-50">
                         <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                           {building.images.slice(0, 10).map((image, index) => (
                             <button
                               key={index}
                               onClick={() => handleThumbnailClick(index)}
                               className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                                 index === selectedImageIndex
                                   ? 'ring-2 ring-orange-500 scale-105'
                                   : 'hover:scale-105 hover:ring-2 hover:ring-gray-300'
                               }`}
                             >
                               <img
                                 src={image}
                                 alt={`View ${index + 1}`}
                                 className="w-full h-full object-cover"
                               />
                             </button>
                           ))}
                           {building.images.length > 10 && (
                             <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                               <span className="text-xs font-medium text-gray-600">
                                 +{building.images.length - 10}
                               </span>
                             </div>
                           )}
                         </div>
                       </div>
                     )}
                   </CardContent>
                 </Card>
               </div>
     
               {/* Property Details Sidebar */}
               <div className="xl:col-span-1">
                 <div className="sticky top-24 space-y-6">
                   
                   {/* Quick Actions */}
                   <Card>
                     <CardHeader className="pb-4">
                       <CardTitle className="text-lg">Contact Information</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-3">
                       <Button 
                         size="lg" 
                         className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                       >
                         <Phone className="w-4 h-4 mr-2" />
                         Call Now
                       </Button>
                       <Button 
                         variant="outline" 
                         size="lg" 
                         className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                       >
                         <Mail className="w-4 h-4 mr-2" />
                         Email Inquiry
                       </Button>
                       {building.hasVideo && building.videoUrls.length > 0 && (
                         <Button
                           variant="outline"
                           size="lg"
                           className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                           onClick={() => window.open(building.videoUrls[0], '_blank')}
                         >
                           <Play className="w-4 h-4 mr-2" />
                           Watch Video Tour
                         </Button>
                       )}
                     </CardContent>
                   </Card>
     
                   {/* Key Features */}
                   <Card>
                     <CardHeader className="pb-4">
                       <CardTitle className="text-lg">Key Features</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="space-y-3">
                         {building.features.slice(0, 6).map((feature, index) => (
                           <div key={index} className="flex items-start space-x-3">
                             <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                             <span className="text-sm text-gray-700 leading-relaxed">
                               {feature}
                             </span>
                           </div>
                         ))}
                         {building.features.length > 6 && (
                           <Button
                             variant="ghost"
                             size="sm"
                             className="w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                             onClick={() => setShowAllFeatures(!showAllFeatures)}
                           >
                             {showAllFeatures ? 'Show Less' : `View All ${building.features.length} Features`}
                             {showAllFeatures ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                           </Button>
                         )}
                       </div>
                     </CardContent>
                   </Card>
     
                   {/* Quick Stats */}
                   <Card>
                     <CardHeader className="pb-4">
                       <CardTitle className="text-lg">Property Stats</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-600">Total Area</span>
                         <span className="font-semibold">{building.totalArea}</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-600">Year Built</span>
                         <span className="font-semibold">{building.yearBuilt}</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-600">Property Type</span>
                         <span className="font-semibold">{building.category}</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-600">Status</span>
                         <Badge variant="secondary" className="bg-orange-500 text-white text-xs">
                           {building.status}
                         </Badge>
                       </div>
                     </CardContent>
                   </Card>
                 </div>
               </div>
             </div>
     
             {/* Description & Specifications */}
             <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
               
               {/* Description */}
               <Card>
                 <CardHeader>
                   <CardTitle className="text-xl">Property Description</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   <div>
                     <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                       <p className="text-gray-700 leading-relaxed break-words whitespace-pre-line">
                         {showFullDescription
                           ? building.description
                           : truncateText(building.description, 300)
                         }
                       </p>
                     </div>
                     {building.description && building.description.length > 300 && (
                       <Button
                         variant="ghost"
                         size="sm"
                         onClick={() => setShowFullDescription(!showFullDescription)}
                         className="mt-3 text-orange-500 hover:text-orange-600 p-0"
                       >
                         {showFullDescription ? (
                           <>
                             <ChevronUp className="w-4 h-4 mr-1" />
                             Show Less
                           </>
                         ) : (
                           <>
                             <ChevronDown className="w-4 h-4 mr-1" />
                             Read More
                           </>
                         )}
                       </Button>
                     )}
                   </div>
     
                   <Separator />
     
                   <div>
                     <h3 className="font-semibold text-gray-800 mb-3">Construction Details</h3>
                     <div className="max-h-48 overflow-y-auto overflow-x-hidden">
                       <p className="text-gray-700 leading-relaxed break-words whitespace-pre-line">
                         {showFullConstruction
                           ? building.construction
                           : truncateText(building.construction, 200)
                         }
                       </p>
                     </div>
                     {building.construction && building.construction.length > 200 && (
                       <Button
                         variant="ghost"
                         size="sm"
                         onClick={() => setShowFullConstruction(!showFullConstruction)}
                         className="mt-3 text-orange-500 hover:text-orange-600 p-0"
                       >
                         {showFullConstruction ? (
                           <>
                             <ChevronUp className="w-4 h-4 mr-1" />
                             Show Less
                           </>
                         ) : (
                           <>
                             <ChevronDown className="w-4 h-4 mr-1" />
                             Read More
                           </>
                         )}
                       </Button>
                     )}
                   </div>
     
                   {showAllFeatures && (
                     <>
                       <Separator />
                       <div>
                         <h3 className="font-semibold text-gray-800 mb-4">All Features</h3>
                         <div className="max-h-56 overflow-y-auto overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {building.features.map((feature, index) => (
                             <div key={index} className="flex items-start space-x-3">
                               <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                               <span className="text-sm text-gray-700 leading-relaxed break-words">
                                 {feature}
                               </span>
                             </div>
                           ))}
                         </div>
                       </div>
                     </>
                   )}
                 </CardContent>
               </Card>
     
               {/* Specifications */}
               <Card>
                 <CardHeader>
                   <CardTitle className="text-xl">Specifications</CardTitle>
                 </CardHeader>
                 <CardContent>
                   {building.specifications.length > 0 ? (
                     <div className="space-y-6">
                       {building.specifications.map((spec, index) => (
                         <div key={index} className="border-l-4 border-orange-500 pl-4">
                           <div className="flex items-center justify-between mb-2">
                             <h3 className="font-semibold text-gray-800">{spec.name}</h3>
                             <Badge variant="outline" className="text-orange-600 border-orange-200">
                               {spec.area}
                             </Badge>
                           </div>
                           <p className="text-sm text-gray-600">
                             Dimensions: <span className="font-medium">{spec.dimensions}</span>
                           </p>
                         </div>
                       ))}
                       
                       <Separator />
                       
                       <div className="bg-orange-50 rounded-lg p-4">
                         <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-2">
                             <Square className="w-5 h-5 text-orange-500" />
                             <span className="font-semibold text-gray-800">Total Building Area</span>
                           </div>
                           <span className="text-2xl font-bold text-orange-600">
                             {building.totalArea}
                           </span>
                         </div>
                       </div>
                     </div>
                   ) : (
                     <div className="text-center py-12">
                       <Building className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                       <p className="text-gray-500">No specifications available</p>
                     </div>
                   )}
                 </CardContent>
               </Card>
             </div>
     
             {/* Bottom CTA */}
             <div className="mt-16 text-center">
               <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                 <h2 className="text-2xl font-bold mb-2">Interested in This Property?</h2>
                 <p className="text-orange-100 mb-6">
                   Get in touch with our team for more details and to schedule a viewing.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                     size="lg" 
                     variant="secondary" 
                     className="bg-white text-orange-600 hover:bg-gray-100"
                     asChild
                   >
                     <Link href="/contact">
                       <Phone className="w-4 h-4 mr-2" />
                       Contact Us
                     </Link>
                   </Button>
                   <Button 
                     size="lg" 
                     variant="outline" 
                     className="bg-white text-orange-600 hover:bg-gray-100"
                     asChild
                   >
                     <Link href="/buildings">
                       <Eye className="w-4 h-4 mr-2" />
                       View Similar Properties
                     </Link>
                   </Button>
                 </div>
               </div>
             </div>
           </div>
     

         </div>
    </Layout>
  );
};

export default BuildingDetails;
