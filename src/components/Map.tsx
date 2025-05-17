
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, you would integrate with a mapping library like Google Maps, Mapbox, or Leaflet
    // For this demo, we'll create a simple placeholder
    
    // The commented code below shows how you might integrate with a real maps API
    // if (mapRef.current && latitude && longitude) {
    //   const map = new mapLibrary.Map({
    //     container: mapRef.current,
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [longitude, latitude],
    //     zoom: 14
    //   });
    //   
    //   new mapLibrary.Marker()
    //     .setLngLat([longitude, latitude])
    //     .addTo(map);
    // }
    
    console.log('Map would center on:', { latitude, longitude });
  }, [latitude, longitude]);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden bg-blue-50 border">
      <div ref={mapRef} className="w-full h-full">
        {/* Placeholder for the map */}
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-blue-50">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-semibold">Map Preview</p>
            <p className="text-xs text-muted-foreground">Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
