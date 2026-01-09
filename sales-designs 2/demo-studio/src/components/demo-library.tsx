'use client';

import { DemoConfig } from '@/lib/types';
import { generateDemoUrls } from '@/lib/checkout';

interface DemoLibraryProps {
  config: DemoConfig;
  baseUrl: string;
}

interface LinkGroup {
  title: string;
  links: { key: string; label: string; requiresProduct?: number }[];
}

const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'Customer Portals',
    links: [
      { key: 'portal', label: 'Hub (Main Portal)' },
      { key: 'shippingIssue', label: 'Shipping Issue Portal', requiresProduct: 0 },
      { key: 'returns', label: 'Returns Portal', requiresProduct: 1 },
      { key: 'warranties', label: 'Warranty Registration', requiresProduct: 2 },
    ],
  },
  {
    title: 'Admin Views',
    links: [
      { key: 'adminShipping', label: 'Shipping Issue Admin', requiresProduct: 0 },
      { key: 'adminReturns', label: 'Returns Admin', requiresProduct: 1 },
      { key: 'adminWarranties', label: 'Warranties Admin', requiresProduct: 2 },
    ],
  },
];

export function DemoLibrary({ config, baseUrl }: DemoLibraryProps) {
  const urls = generateDemoUrls(config, baseUrl);

  const isLinkAvailable = (requiresProduct?: number): boolean => {
    if (requiresProduct === undefined) return true;
    if (requiresProduct === 0) return config.showShipping;
    if (requiresProduct === 1) return config.showReturns;
    if (requiresProduct === 2) return config.showWarranties;
    return false;
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const copyAllLinks = () => {
    const allLinks = LINK_GROUPS.flatMap((group) =>
      group.links
        .filter((link) => isLinkAvailable(link.requiresProduct))
        .map((link) => `${link.label}: ${urls[link.key]}`)
    ).join('\n\n');
    navigator.clipboard.writeText(allLinks);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Demo Links</h2>
        <button
          onClick={copyAllLinks}
          className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Copy All Links
        </button>
      </div>

      {LINK_GROUPS.map((group) => {
        const availableLinks = group.links.filter((link) =>
          isLinkAvailable(link.requiresProduct)
        );

        if (availableLinks.length === 0) return null;

        return (
          <div key={group.title} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">{group.title}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {availableLinks.map((link) => (
                <div
                  key={link.key}
                  className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{link.label}</p>
                    <p className="text-xs text-gray-500 truncate font-mono mt-0.5">
                      {urls[link.key]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => copyToClipboard(urls[link.key])}
                      className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      Copy
                    </button>
                    <a
                      href={urls[link.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                    >
                      Open
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Brand Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Current Configuration</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Store:</span>{' '}
            <span className="text-gray-900 font-medium">{config.storeName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Brand Color:</span>
            <span
              className="w-4 h-4 rounded border border-gray-200"
              style={{ backgroundColor: `#${config.brandColor}` }}
            />
            <span className="text-gray-900 font-mono text-xs">#{config.brandColor}</span>
          </div>
          <div>
            <span className="text-gray-500">Product:</span>{' '}
            <span className="text-gray-900">{config.productName}</span>
          </div>
          <div>
            <span className="text-gray-500">Price:</span>{' '}
            <span className="text-gray-900">{config.productPrice}</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-gray-500 text-sm">Features:</span>
          <div className="flex gap-2 mt-1">
            {config.showShipping && (
              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                Shipping
              </span>
            )}
            {config.showReturns && (
              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                Returns
              </span>
            )}
            {config.showWarranties && (
              <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded">
                Warranties
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
