
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, Navigation2 } from 'lucide-react';
import Map from '@/components/Map';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

const ViewLocation = () => {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    if (lat && lng) {
      try {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        
        // Simple validation of coordinates
        if (!isNaN(latitude) && !isNaN(longitude) && 
            latitude >= -90 && latitude <= 90 && 
            longitude >= -180 && longitude <= 180) {
          setLocation({ latitude, longitude });
          toast.success('Location loaded successfully!');
        } else {
          toast.error('Invalid coordinates in the link');
        }
      } catch (error) {
        console.error('Error parsing coordinates:', error);
        toast.error('Could not read location from link');
      }
    } else {
      toast.error('No location information found in the link');
    }
    
    setIsLoading(false);
  }, [searchParams]);
  
  const openInMaps = () => {
    if (!location) return;
    
    // Open in Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Shared Location
              </CardTitle>
              <CardDescription>
                View the location that was shared with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin text-2xl">◌</div>
                </div>
              ) : location ? (
                <>
                  <div className="h-64">
                    <Map latitude={location.latitude} longitude={location.longitude} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm mb-2">Coordinates:</p>
                    <p className="font-mono text-sm bg-muted p-2 rounded mb-4">
                      {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                    <Button onClick={openInMaps} className="w-full btn-gradient">
                      <Navigation2 className="mr-2 h-4 w-4" />
                      Open in Google Maps
                    </Button>
                  </div>
                </>
              ) : (
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center p-4">
                    <p className="font-medium">No Location Found</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      The link doesn't contain valid location information.
                      Please check the link and try again.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LocationShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ViewLocation;
