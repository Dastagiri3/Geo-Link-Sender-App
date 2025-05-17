
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Navigation className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">LocationShare</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/view">
            <Button variant="outline">View Shared Location</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
