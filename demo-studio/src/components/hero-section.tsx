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
    <div className="border-b bg-muted/30">
      <div className="container py-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-medium text-foreground">Quick Import</h2>
            <p className="text-sm text-muted-foreground">
              Paste a product URL to auto-fill brand and product details
            </p>
          </div>
          <div className="flex gap-3 max-w-2xl">
            <Input
              type="url"
              placeholder="https://store.com/products/example-product"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-10 bg-background"
            />
            <Button
              onClick={handleMagicImport}
              disabled={!url.trim() || isLoading}
              className="h-10 gap-2"
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
