
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import CopyLink from './CopyLink';
import Map from './Map';

const LocationSender = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [shareLink, setShareLink] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const generateLocationLink = (lat: number, lng: number) => {
    // Creating a URL with location parameters
    const baseUrl = window.location.origin;
    return `${baseUrl}/view?lat=${lat}&lng=${lng}`;
  };
  
  const getLocation = () => {
    setIsLocating(true);
    setError(null);
    
    if (!navigator.geolocation) {
      const errorMsg = 'Geolocation is not supported by your browser';
      setError(errorMsg);
      toast.error(errorMsg);
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const link = generateLocationLink(latitude, longitude);
        setShareLink(link);
        setIsLocating(false);
        toast.success('Location found successfully!');
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Could not get your location. ';
        
        switch (error.code) {
          case 1:
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case 2:
            errorMessage += 'Position unavailable. Please try again.';
            break;
          case 3:
            errorMessage += 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage += 'Please check permissions and try again.';
        }
        
        setError(errorMessage);
        toast.error(errorMessage);
        setIsLocating(false);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Share Your Location</CardTitle>
        <CardDescription>
          Generate a link to share your current location with friends and family
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {location ? (
          <>
            <div className="h-48">
              <Map latitude={location.latitude} longitude={location.longitude} />
            </div>
            <CopyLink link={shareLink} />
          </>
        ) : error ? (
          <div className="h-48 flex items-center justify-center bg-red-50 rounded-lg">
            <div className="text-center p-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
              <p className="font-medium text-red-700">Location Error</p>
              <p className="text-sm text-red-600 mt-2">{error}</p>
              <p className="text-xs text-muted-foreground mt-4">
                Click the button below to try again
              </p>
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center bg-blue-50 rounded-lg">
            <div className="text-center p-4">
              <Navigation2 className="h-12 w-12 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Click the button below to detect your current location and generate a shareable link
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={getLocation} 
          disabled={isLocating} 
          className="w-full btn-gradient"
        >
          {isLocating ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2">◌</span>
              Locating...
            </span>
          ) : location ? (
            'Update Location'
          ) : (
            'Get My Location'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationSender;
