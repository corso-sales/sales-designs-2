'use client';

import { useState } from 'react';
import { DemoConfig } from '@/lib/types';
import { generateDemoUrls } from '@/lib/checkout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Copy, ExternalLink, Check, ClipboardList } from 'lucide-react';

interface DemoLibraryProps {
  config: DemoConfig;
  baseUrl: string;
}

interface DemoLink {
  key: string;
  label: string;
  category: 'portal' | 'admin';
  requiresProduct?: number;
}

const DEMO_LINKS: DemoLink[] = [
  { key: 'portal', label: 'Hub (Main Portal)', category: 'portal' },
  { key: 'shippingIssue', label: 'Shipping Issue Portal', category: 'portal', requiresProduct: 0 },
  { key: 'returns', label: 'Returns Portal', category: 'portal', requiresProduct: 1 },
  { key: 'warranties', label: 'Warranty Registration', category: 'portal', requiresProduct: 2 },
  { key: 'adminShipping', label: 'Shipping Issue Admin', category: 'admin', requiresProduct: 0 },
  { key: 'adminReturns', label: 'Returns Admin', category: 'admin', requiresProduct: 1 },
  { key: 'adminWarranties', label: 'Warranties Admin', category: 'admin', requiresProduct: 2 },
];

export function DemoLibrary({ config, baseUrl }: DemoLibraryProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const urls = generateDemoUrls(config, baseUrl);

  const isLinkAvailable = (requiresProduct?: number): boolean => {
    if (requiresProduct === undefined) return true;
    if (requiresProduct === 0) return config.showShipping;
    if (requiresProduct === 1) return config.showReturns;
    if (requiresProduct === 2) return config.showWarranties;
    return false;
  };

  const availableLinks = DEMO_LINKS.filter((link) => isLinkAvailable(link.requiresProduct));

  const copyToClipboard = async (url: string, key: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyAllLinks = async () => {
    const allLinks = availableLinks
      .map((link) => `${link.label}: ${urls[link.key]}`)
      .join('\n\n');
    await navigator.clipboard.writeText(allLinks);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Demo Links</h2>
          <p className="text-sm text-muted-foreground">
            {availableLinks.length} links available based on your configuration
          </p>
        </div>
        <Button onClick={copyAllLinks} variant="outline" size="sm" className="gap-2">
          {copiedAll ? (
            <Check className="h-4 w-4" />
          ) : (
            <ClipboardList className="h-4 w-4" />
          )}
          {copiedAll ? 'Copied!' : 'Copy All Links'}
        </Button>
      </div>

      {/* Links Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableLinks.map((link) => (
              <TableRow key={link.key}>
                <TableCell className="font-medium">{link.label}</TableCell>
                <TableCell>
                  <Badge variant={link.category === 'portal' ? 'default' : 'secondary'}>
                    {link.category === 'portal' ? 'Customer' : 'Admin'}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <code className="text-xs text-muted-foreground font-mono truncate block max-w-md">
                    {urls[link.key]}
                  </code>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(urls[link.key], link.key)}
                    >
                      {copiedKey === link.key ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <a href={urls[link.key]} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Configuration Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Current Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Store</span>
              <p className="font-medium truncate">{config.storeName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Brand Color</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: `#${config.brandColor}` }}
                />
                <span className="font-mono text-xs">#{config.brandColor}</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Product</span>
              <p className="font-medium truncate">{config.productName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Price</span>
              <p className="font-medium">{config.productPrice}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <span className="text-muted-foreground text-sm">Enabled Features</span>
            <div className="flex gap-2 mt-2">
              {config.showShipping && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Shipping
                </Badge>
              )}
              {config.showReturns && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Returns
                </Badge>
              )}
              {config.showWarranties && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Warranties
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
