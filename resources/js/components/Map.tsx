
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapProps {
  location?: {
    lat: number;
    lng: number;
  };
}

const Map = ({ location = { lat: 51.4769, lng: 5.6547 } }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // For a real implementation, you would use a mapping library like Google Maps, Mapbox, or Leaflet
  // This is a styled placeholder that looks like a map
  return (
    <div className="relative w-full h-full bg-resteel-light overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{
          background: `url("https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${location.lng},${location.lat},14,0/1200x600?access_token=pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbG91aTR3eWQwNGdkMmpzMDV0bGdvN2kwIn0.TPQqCZRcvoYZLMNRVuQTjg") center/cover no-repeat`,
        }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-12 bg-resteel-accent text-white rounded-full flex items-center justify-center shadow-lg">
          <MapPin className="h-6 w-6" />
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-white px-3 py-1 text-xs text-gray-500 rounded shadow">
        Westerbeemd 2B, 5705 DN Helmond, Netherlands
      </div>
    </div>
  );
};

export default Map;
