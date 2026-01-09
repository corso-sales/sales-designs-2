'use client';

import { DemoConfig, BRAND_PRESETS } from '@/lib/types';

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
    <div className="space-y-6">
      {/* Quick Presets */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Presets</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(BRAND_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePreset(key)}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-md transition-colors capitalize"
            >
              {preset.storeName}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Identity */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Brand Identity</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Store Name
            </label>
            <input
              type="text"
              value={config.storeName}
              onChange={(e) => onChange({ storeName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your store name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Brand Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={`#${config.brandColor}`}
                onChange={(e) => onChange({ brandColor: e.target.value.replace('#', '') })}
                className="w-12 h-9 p-1 border border-gray-200 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={config.brandColor}
                onChange={(e) => onChange({ brandColor: e.target.value.replace('#', '') })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000000"
                maxLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Logo URL
            </label>
            <input
              type="url"
              value={config.brandLogo}
              onChange={(e) => onChange({ brandLogo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Demo Product</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={config.productName}
                onChange={(e) => onChange({ productName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product Name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Price
              </label>
              <input
                type="text"
                value={config.productPrice}
                onChange={(e) => onChange({ productPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="$99.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Product Description
            </label>
            <input
              type="text"
              value={config.productDesc}
              onChange={(e) => onChange({ productDesc: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Size: 10 | Color: Black"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Product Image URL
            </label>
            <input
              type="url"
              value={config.productImage}
              onChange={(e) => onChange({ productImage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/product.png"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Exchange Product Name
              </label>
              <input
                type="text"
                value={config.exchangeProductName}
                onChange={(e) => onChange({ exchangeProductName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Alternate Product"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Exchange Option Label
              </label>
              <input
                type="text"
                value={config.exchangeProductOptionLabel}
                onChange={(e) => onChange({ exchangeProductOptionLabel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Size"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features to Demo */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Features to Demo</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showShipping}
              onChange={(e) => onChange({ showShipping: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Shipping Issues</span>
            <span className="text-xs text-gray-400">(Product 0)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showReturns}
              onChange={(e) => onChange({ showReturns: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Returns & Exchanges</span>
            <span className="text-xs text-gray-400">(Product 1)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showWarranties}
              onChange={(e) => onChange({ showWarranties: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Warranties</span>
            <span className="text-xs text-gray-400">(Product 2)</span>
          </label>

          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.showNextButton}
                onChange={(e) => onChange({ showNextButton: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show Next Navigation Buttons</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
