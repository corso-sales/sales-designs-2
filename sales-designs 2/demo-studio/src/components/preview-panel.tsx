'use client';

import { useState } from 'react';
import { DemoConfig } from '@/lib/types';
import { generateDemoUrls } from '@/lib/checkout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, RotateCcw, ExternalLink, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  config: DemoConfig;
  baseUrl: string;
}

type PreviewPage = 'portal' | 'shippingIssue' | 'returns' | 'warranties';
type ViewportSize = 'desktop' | 'mobile';

const PREVIEW_OPTIONS: { key: PreviewPage; label: string; requiresProduct?: number }[] = [
  { key: 'portal', label: 'Hub' },
  { key: 'shippingIssue', label: 'Shipping Issue', requiresProduct: 0 },
  { key: 'returns', label: 'Returns Portal', requiresProduct: 1 },
  { key: 'warranties', label: 'Warranty Registration', requiresProduct: 2 },
];

const VIEWPORT_SIZES = {
  desktop: { width: '100%', height: '100%' },
  mobile: { width: '375px', height: '667px' },
};

export function PreviewPanel({ config, baseUrl }: PreviewPanelProps) {
  const [activePage, setActivePage] = useState<PreviewPage>('portal');
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const urls = generateDemoUrls(config, baseUrl);

  const availableOptions = PREVIEW_OPTIONS.filter((opt) => {
    if (opt.requiresProduct === undefined) return true;
    if (opt.requiresProduct === 0) return config.showShipping;
    if (opt.requiresProduct === 1) return config.showReturns;
    if (opt.requiresProduct === 2) return config.showWarranties;
    return false;
  });

  const currentUrl = urls[activePage];

  const handleRefresh = () => {
    setIframeKey((k) => k + 1);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          {/* Page Selection */}
          <Tabs value={activePage} onValueChange={(v) => setActivePage(v as PreviewPage)}>
            <TabsList className="h-8">
              {availableOptions.map((opt) => (
                <TabsTrigger
                  key={opt.key}
                  value={opt.key}
                  className="text-xs px-3 h-7"
                >
                  {opt.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-1">
          {/* Viewport Toggle */}
          <div className="flex items-center border rounded-md p-0.5 mr-2">
            <Button
              variant={viewport === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setViewport('desktop')}
            >
              <Monitor className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewport === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setViewport('mobile')}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleRefresh}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            asChild
          >
            <a href={currentUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* URL Bar */}
      <div className="px-4 py-2 border-b bg-muted/20">
        <div className="flex items-center gap-2 bg-background rounded-md border px-3 py-1.5">
          <code className="flex-1 text-xs text-muted-foreground truncate font-mono">
            {currentUrl}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-3 w-3 mr-1" />
            ) : (
              <Copy className="h-3 w-3 mr-1" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 bg-muted/50 flex items-center justify-center p-4 overflow-hidden">
        <div
          className={cn(
            'bg-background rounded-lg shadow-lg overflow-hidden transition-all duration-300',
            viewport === 'mobile' && 'border-[8px] border-foreground/10 rounded-[2rem]'
          )}
          style={{
            width: VIEWPORT_SIZES[viewport].width,
            height: VIEWPORT_SIZES[viewport].height,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <iframe
            key={iframeKey}
            src={currentUrl}
            className="w-full h-full border-0"
            title="Demo Preview"
          />
        </div>
      </div>
    </div>
  );
}
