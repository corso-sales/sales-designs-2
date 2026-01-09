'use client';

import { DemoConfig, BRAND_PRESETS } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ConfigurationPanelProps {
  config: DemoConfig;
  onChange: (updates: Partial<DemoConfig>) => void;
}

export function ConfigurationPanel({ config, onChange }: ConfigurationPanelProps) {
  const handlePreset = (presetKey: string) => {
    const preset = BRAND_PRESETS[presetKey];
    if (preset) {
      onChange(preset);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Presets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Quick Presets</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {Object.entries(BRAND_PRESETS).map(([key, preset]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                onClick={() => handlePreset(key)}
                className="h-8 text-xs"
              >
                {preset.storeName}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Identity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Brand Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="storeName" className="text-xs text-muted-foreground">
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
            <Label className="text-xs text-muted-foreground">Brand Color</Label>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="color"
                  value={`#${config.brandColor}`}
                  onChange={(e) => onChange({ brandColor: e.target.value.replace('#', '') })}
                  className="w-9 h-9 rounded-md border border-input cursor-pointer"
                />
              </div>
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
            <Label htmlFor="brandLogo" className="text-xs text-muted-foreground">
              Logo URL
            </Label>
            <Input
              id="brandLogo"
              type="url"
              value={config.brandLogo}
              onChange={(e) => onChange({ brandLogo: e.target.value })}
              placeholder="https://example.com/logo.png"
              className="h-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Demo Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-xs text-muted-foreground">
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
              <Label htmlFor="productPrice" className="text-xs text-muted-foreground">
                Price
              </Label>
              <Input
                id="productPrice"
                type="text"
                value={config.productPrice}
                onChange={(e) => onChange({ productPrice: e.target.value })}
                placeholder="$99.00"
                className="h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDesc" className="text-xs text-muted-foreground">
              Product Description
            </Label>
            <Input
              id="productDesc"
              type="text"
              value={config.productDesc}
              onChange={(e) => onChange({ productDesc: e.target.value })}
              placeholder="Size: 10 | Color: Black"
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productImage" className="text-xs text-muted-foreground">
              Product Image URL
            </Label>
            <Input
              id="productImage"
              type="url"
              value={config.productImage}
              onChange={(e) => onChange({ productImage: e.target.value })}
              placeholder="https://example.com/product.png"
              className="h-9"
            />
          </div>

          <Separator className="my-2" />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="exchangeProductName" className="text-xs text-muted-foreground">
                Exchange Product
              </Label>
              <Input
                id="exchangeProductName"
                type="text"
                value={config.exchangeProductName}
                onChange={(e) => onChange({ exchangeProductName: e.target.value })}
                placeholder="Alternate Product"
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exchangeProductOptionLabel" className="text-xs text-muted-foreground">
                Option Label
              </Label>
              <Input
                id="exchangeProductOptionLabel"
                type="text"
                value={config.exchangeProductOptionLabel}
                onChange={(e) => onChange({ exchangeProductOptionLabel: e.target.value })}
                placeholder="Size"
                className="h-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Features to Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="showShipping"
              checked={config.showShipping}
              onCheckedChange={(checked) => onChange({ showShipping: !!checked })}
            />
            <Label htmlFor="showShipping" className="text-sm font-normal cursor-pointer">
              Shipping Issues
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="showReturns"
              checked={config.showReturns}
              onCheckedChange={(checked) => onChange({ showReturns: !!checked })}
            />
            <Label htmlFor="showReturns" className="text-sm font-normal cursor-pointer">
              Returns & Exchanges
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="showWarranties"
              checked={config.showWarranties}
              onCheckedChange={(checked) => onChange({ showWarranties: !!checked })}
            />
            <Label htmlFor="showWarranties" className="text-sm font-normal cursor-pointer">
              Warranties
            </Label>
          </div>

          <Separator className="my-2" />

          <div className="flex items-center space-x-3">
            <Checkbox
              id="showNextButton"
              checked={config.showNextButton}
              onCheckedChange={(checked) => onChange({ showNextButton: !!checked })}
            />
            <Label htmlFor="showNextButton" className="text-sm font-normal cursor-pointer">
              Show Next Navigation
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
