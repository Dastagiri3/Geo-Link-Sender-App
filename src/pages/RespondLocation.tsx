
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';

const RespondLocation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isShared, setIsShared] = useState(false);
  
  // Get the request ID from the URL
  const requestId = searchParams.get('id');
  
  const getLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLocating(false);
        toast.success('Location found successfully!');
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Could not get your location. Please check permissions.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };
  
  const shareLocation = () => {
    if (!location) return;
    
    setIsSending(true);
    
    // In a real application, this would send the location to a server
    // For now, we'll simulate by generating a view link and redirecting
    
    try {
      // Generate a view link with the location coordinates
      const viewLink = `/view?lat=${location.latitude}&lng=${location.longitude}&req=${requestId}`;
      
      // In a real app, we would store this in a database with the requestId
      // For now, we'll just redirect to the view page
      setIsShared(true);
      toast.success('Location shared successfully!');
      
      // Wait a moment before redirecting to show the success message
      setTimeout(() => {
        navigate(viewLink);
      }, 1500);
      
    } catch (error) {
      console.error('Error sharing location:', error);
      toast.error('Could not share your location');
      setIsSending(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Location Request</CardTitle>
              <CardDescription>
                Someone has requested your current location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {location ? (
                <div className="h-48">
                  <Map latitude={location.latitude} longitude={location.longitude} />
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center bg-blue-50 rounded-lg">
                  <div className="text-center p-4">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="font-medium">Share Your Location</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Someone has requested to know where you are.
                      Click the button below to share your current location.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {location ? (
                <Button 
                  onClick={shareLocation} 
                  disabled={isSending || isShared}
                  className="w-full btn-gradient"
                >
                  {isSending ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">◌</span>
                      Sharing...
                    </span>
                  ) : isShared ? (
                    'Location Shared!'
                  ) : (
                    'Share My Location'
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={getLocation} 
                  disabled={isLocating}
                  className="w-full btn-gradient"
                >
                  {isLocating ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">◌</span>
                      Getting Location...
                    </span>
                  ) : (
                    'Allow Location Access'
                  )}
                </Button>
              )}
            </CardFooter>
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

export default RespondLocation;
