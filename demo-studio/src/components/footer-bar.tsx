'use client';

import { useState } from 'react';
import { DemoConfig } from '@/lib/types';
import { generateCheckoutParam } from '@/lib/checkout';
import { Button } from '@/components/ui/button';
import { Link2, Check, Copy } from 'lucide-react';

interface FooterBarProps {
  config: DemoConfig;
  baseUrl: string;
}

export function FooterBar({ config, baseUrl }: FooterBarProps) {
  const [copied, setCopied] = useState(false);

  const portalUrl = `${baseUrl}/portal.html?checkout=${generateCheckoutParam(config)}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Configured for <span className="font-medium text-foreground">{config.storeName}</span>
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">
            {[
              config.showShipping && 'Shipping',
              config.showReturns && 'Returns',
              config.showWarranties && 'Warranties',
            ]
              .filter(Boolean)
              .join(', ') || 'No features selected'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="gap-2"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button size="sm" className="gap-2" asChild>
            <a href={portalUrl} target="_blank" rel="noopener noreferrer">
              <Link2 className="h-4 w-4" />
              Open Demo
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
