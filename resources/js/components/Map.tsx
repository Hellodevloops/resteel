import { MapPin } from 'lucide-react';
import { useRef } from 'react';

interface MapProps {
    location?: {
        lat: number;
        lng: number;
    };
    address?: string;
    googleMapsUrl?: string;
}

const Map = ({
    location = { lat: 51.482434, lng: 5.661947 },
    address = 'Waterbeemd 2B, 5705 DN Helmond, Netherlands',
    googleMapsUrl = 'https://www.google.com/maps?q=Waterbeemd+2B,+5705+DN+Helmond,+Netherlands',
}: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    // For a real implementation, you would use a mapping library like Google Maps, Mapbox, or Leaflet
    // This is a styled placeholder that looks like a map
    return (
        <div className="bg-resteel-light relative h-full w-full overflow-hidden">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block h-full w-full cursor-pointer">
                <div
                    ref={mapRef}
                    className="h-full w-full"
                    style={{
                        background: `url("https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${location.lng},${location.lat},14,0/1200x600?access_token=pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbG91aTR3eWQwNGdkMmpzMDV0bGdvN2kwIn0.TPQqCZRcvoYZLMNRVuQTjg") center/cover no-repeat`,
                    }}
                />
            </a>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="bg-resteel-accent flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg">
                    <MapPin className="h-6 w-6" />
                </div>
            </div>
            <div className="absolute right-4 bottom-4 rounded bg-white px-3 py-1 text-xs text-gray-500 shadow">{address}</div>
            <div className="absolute top-4 left-4 rounded bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow hover:bg-gray-50">
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    View larger map
                </a>
            </div>
        </div>
    );
};

export default Map;
