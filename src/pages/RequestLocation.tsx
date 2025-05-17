
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import CopyLink from '@/components/CopyLink';

const RequestLocation = () => {
  const [requestLink, setRequestLink] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateRequestLink = () => {
    setIsGenerating(true);
    
    try {
      // Generate a unique ID to identify this request
      const requestId = crypto.randomUUID();
      
      // Create the URL with the request ID parameter
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/respond?id=${requestId}`;
      
      setRequestLink(link);
      toast.success('Request link generated successfully!');
    } catch (error) {
      console.error('Error generating request link:', error);
      toast.error('Could not generate request link');
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Request a Location</CardTitle>
              <CardDescription>
                Generate a link to request someone's current location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {requestLink ? (
                <>
                  <div className="h-48 flex items-center justify-center bg-blue-50 rounded-lg">
                    <div className="text-center p-4">
                      <Send className="h-12 w-12 text-primary mx-auto mb-3" />
                      <p className="font-medium">Link Generated!</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Share this link with the person whose location you want to request.
                        When they click it, their location will be shared with you.
                      </p>
                    </div>
                  </div>
                  <CopyLink link={requestLink} />
                </>
              ) : (
                <div className="h-48 flex items-center justify-center bg-blue-50 rounded-lg">
                  <div className="text-center p-4">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="font-medium">Request Someone's Location</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Generate a link and send it to someone. When they click it,
                      you'll receive their current location.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={generateRequestLink}
                disabled={isGenerating}
                className="w-full btn-gradient"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">◌</span>
                    Generating...
                  </span>
                ) : requestLink ? (
                  'Generate New Request'
                ) : (
                  'Generate Request Link'
                )}
              </Button>
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

export default RequestLocation;
