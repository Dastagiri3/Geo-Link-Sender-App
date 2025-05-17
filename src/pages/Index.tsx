
import React from 'react';
import { Navigation, MapPin, Share } from 'lucide-react';
import LocationSender from '@/components/LocationSender';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="mb-6 p-3 bg-primary/10 rounded-full">
            <Navigation className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share Your <span className="gradient-text">Location</span> in Seconds
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Generate a simple link to share your exact location with friends, family, or services. 
            No account required, quick and easy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
            <div className="flex flex-col items-center p-4 border rounded-lg bg-card">
              <div className="p-2 bg-primary/10 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Locate</h3>
              <p className="text-sm text-muted-foreground text-center">
                Get your precise current location with one click
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg bg-card">
              <div className="p-2 bg-primary/10 rounded-full mb-3">
                <Share className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Share</h3>
              <p className="text-sm text-muted-foreground text-center">
                Copy a unique link to your clipboard
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg bg-card">
              <div className="p-2 bg-primary/10 rounded-full mb-3">
                <Navigation className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Find</h3>
              <p className="text-sm text-muted-foreground text-center">
                Recipients see your exact position on a map
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <LocationSender />
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

export default Index;
