
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share } from 'lucide-react';
import { toast } from 'sonner';

interface CopyLinkProps {
  link: string;
}

const CopyLink: React.FC<CopyLinkProps> = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setIsCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
        toast.error('Failed to copy link');
      });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="share-link" className="text-sm font-medium">
        Share this link with others
      </label>
      <div className="flex gap-2">
        <Input
          id="share-link"
          value={link}
          readOnly
          className="flex-grow font-medium text-sm"
        />
        <Button 
          onClick={copyToClipboard} 
          className={`${isCopied ? 'bg-secondary' : 'bg-primary'} transition-colors`}
        >
          <Share className="mr-2 h-4 w-4" />
          {isCopied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Anyone with this link can view your current location
      </p>
    </div>
  );
};

export default CopyLink;
