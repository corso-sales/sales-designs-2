'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2 } from 'lucide-react';

interface HeroSectionProps {
  onImport: (data: {
    storeName?: string;
    productName?: string;
    productImage?: string;
    productPrice?: string;
    brandLogo?: string;
  }) => void;
}

export function HeroSection({ onImport }: HeroSectionProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMagicImport = async () => {
    if (!url.trim()) return;

    setIsLoading(true);

    // Simulate import - in production this would scrape the URL
    // For now, just show loading state and then reset
    setTimeout(() => {
      // You could integrate with a scraping API here
      // For demo purposes, we'll just show a placeholder
      onImport({
        storeName: new URL(url).hostname.replace('www.', '').split('.')[0],
      });
      setIsLoading(false);
      setUrl('');
    }, 1500);
  };

  return (
    <div className="w-full py-12 bg-white border-b">
      <div className="px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Create your product demo</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Paste a product URL to auto-fill brand and product details
            </p>
          </div>
          <div className="flex gap-3 w-full mt-6">
            <Input
              type="url"
              placeholder="https://gfuel.com/products/blue-ice"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-11"
            />
            <Button
              onClick={handleMagicImport}
              disabled={!url.trim() || isLoading}
              className="h-11 gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Magic Import
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
