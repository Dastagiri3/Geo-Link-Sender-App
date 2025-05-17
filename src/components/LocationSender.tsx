
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation2 } from 'lucide-react';
import { toast } from 'sonner';
import CopyLink from './CopyLink';
import Map from './Map';

const LocationSender = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [shareLink, setShareLink] = useState<string>('');
  
  const generateLocationLink = (lat: number, lng: number) => {
    // Creating a URL with location parameters
    const baseUrl = window.location.origin;
    return `${baseUrl}/view?lat=${lat}&lng=${lng}`;
  };
  
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
        const link = generateLocationLink(latitude, longitude);
        setShareLink(link);
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
