'use client';

import { useState } from 'react';
import { DemoConfig } from '@/lib/types';
import { generateCheckoutParam } from '@/lib/checkout';
import { Button } from '@/components/ui/button';
import { Link2, Check } from 'lucide-react';

interface FooterBarProps {
  config: DemoConfig;
  baseUrl: string;
}

export function FooterBar({ config, baseUrl }: FooterBarProps) {
  const [copied, setCopied] = useState(false);

  const portalUrl = `${baseUrl}/portal.html?checkout=${generateCheckoutParam(config)}`;

  const handleGenerateLink = async () => {
    await navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex h-16 justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Configure your demo and generate a shareable link
        </p>
        <Button
          onClick={handleGenerateLink}
          className="gap-2"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Generate Demo Link'}
        </Button>
      </div>
    </div>
  );
}
