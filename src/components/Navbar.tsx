
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, Send } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Navigation className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">LocationShare</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm">Home</Button>
          </Link>
          <Link to="/request">
            <Button variant="outline" size="sm">
              <Send className="mr-1 h-4 w-4" />
              Request Location
            </Button>
          </Link>
          <Link to="/view">
            <Button variant="outline" size="sm">
              <MapPin className="mr-1 h-4 w-4" />
              View Shared
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
