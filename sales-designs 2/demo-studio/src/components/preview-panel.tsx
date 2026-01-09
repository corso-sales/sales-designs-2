'use client';

import { useState } from 'react';
import { DemoConfig } from '@/lib/types';
import { generateDemoUrls } from '@/lib/checkout';

interface PreviewPanelProps {
  config: DemoConfig;
  baseUrl: string;
}

type PreviewPage = 'portal' | 'shippingIssue' | 'returns' | 'warranties';

const PREVIEW_OPTIONS: { key: PreviewPage; label: string; requiresProduct?: number }[] = [
  { key: 'portal', label: 'Hub' },
  { key: 'shippingIssue', label: 'Shipping Issue', requiresProduct: 0 },
  { key: 'returns', label: 'Returns Portal', requiresProduct: 1 },
  { key: 'warranties', label: 'Warranty Registration', requiresProduct: 2 },
];

export function PreviewPanel({ config, baseUrl }: PreviewPanelProps) {
  const [activePage, setActivePage] = useState<PreviewPage>('portal');
  const [iframeKey, setIframeKey] = useState(0);

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

  return (
    <div className="flex flex-col h-full">
      {/* Preview Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {availableOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActivePage(opt.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activePage === opt.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            title="Refresh preview"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            title="Open in new tab"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* URL Display */}
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">URL:</span>
          <code className="flex-1 text-xs text-gray-700 truncate font-mono">{currentUrl}</code>
          <button
            onClick={() => navigator.clipboard.writeText(currentUrl)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 bg-gray-200 relative">
        <iframe
          key={iframeKey}
          src={currentUrl}
          className="w-full h-full border-0"
          title="Demo Preview"
        />
      </div>
    </div>
  );
}
