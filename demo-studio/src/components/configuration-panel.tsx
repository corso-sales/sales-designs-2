'use client';

import { DemoConfig } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Box, ArrowLeftRight, ShieldCheck } from 'lucide-react';

interface ConfigurationPanelProps {
  config: DemoConfig;
  onChange: (updates: Partial<DemoConfig>) => void;
}

export function ConfigurationPanel({ config, onChange }: ConfigurationPanelProps) {
  return (
    <div className="space-y-4">
      {/* Brand Identity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Brand Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="storeName" className="text-xs font-medium text-muted-foreground">
              Store Name
            </Label>
            <Input
              id="storeName"
              type="text"
              value={config.storeName}
              onChange={(e) => onChange({ storeName: e.target.value })}
              placeholder="Your store name"
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandColor" className="text-xs font-medium text-muted-foreground">
              Brand Color
            </Label>
            <div className="flex gap-2">
              <input
                id="brandColor"
                type="color"
                value={`#${config.brandColor}`}
                onChange={(e) => onChange({ brandColor: e.target.value.replace('#', '') })}
                className="w-9 h-9 rounded-md border border-input cursor-pointer"
              />
              <Input
                type="text"
                value={config.brandColor}
                onChange={(e) => onChange({ brandColor: e.target.value.replace('#', '') })}
                className="flex-1 h-9 font-mono text-xs"
                placeholder="000000"
                maxLength={6}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandLogo" className="text-xs font-medium text-muted-foreground">
              Logo URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="brandLogo"
                type="url"
                value={config.brandLogo}
                onChange={(e) => onChange({ brandLogo: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="flex-1 h-9"
              />
              {config.brandLogo && (
                <div className="flex-shrink-0">
                  <img
                    src={config.brandLogo}
                    alt="Logo preview"
                    className="h-9 w-9 rounded-md border border-input object-contain bg-muted"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Product */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Demo Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-xs font-medium text-muted-foreground">
              Product Name
            </Label>
            <Input
              id="productName"
              type="text"
              value={config.productName}
              onChange={(e) => onChange({ productName: e.target.value })}
              placeholder="Product Name"
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productPrice" className="text-xs font-medium text-muted-foreground">
              Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                id="productPrice"
                type="text"
                value={config.productPrice.replace('$', '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  onChange({ productPrice: value ? `$${value}` : '' });
                }}
                placeholder="99.00"
                className="h-9 pl-7"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDesc" className="text-xs font-medium text-muted-foreground">
              Product Description
            </Label>
            <Input
              id="productDesc"
              type="text"
              value={config.productDesc}
              onChange={(e) => onChange({ productDesc: e.target.value })}
              placeholder="Size, color, variant..."
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productImage" className="text-xs font-medium text-muted-foreground">
              Product Image URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="productImage"
                type="url"
                value={config.productImage}
                onChange={(e) => onChange({ productImage: e.target.value })}
                placeholder="https://example.com/product.png"
                className="flex-1 h-9"
              />
              {config.productImage && (
                <div className="flex-shrink-0">
                  <img
                    src={config.productImage}
                    alt="Product preview"
                    className="h-9 w-9 rounded-md border border-input object-contain bg-muted"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Demo Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="showShipping"
              checked={config.showShipping}
              onCheckedChange={(checked) => onChange({ showShipping: !!checked })}
            />
            <Label htmlFor="showShipping" className="text-sm font-normal cursor-pointer flex items-center gap-2">
              <Box className="h-4 w-4 text-muted-foreground" />
              Shipping Protection
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="showReturns"
              checked={config.showReturns}
              onCheckedChange={(checked) => onChange({ showReturns: !!checked })}
            />
            <Label htmlFor="showReturns" className="text-sm font-normal cursor-pointer flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
              Returns & Exchanges
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="showWarranties"
              checked={config.showWarranties}
              onCheckedChange={(checked) => onChange({ showWarranties: !!checked })}
            />
            <Label htmlFor="showWarranties" className="text-sm font-normal cursor-pointer flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              Warranty Claims
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
