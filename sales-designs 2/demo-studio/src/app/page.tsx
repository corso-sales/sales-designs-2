'use client';

import { useState } from 'react';
import { DemoConfig, DEFAULT_CONFIG } from '@/lib/types';
import { ConfigurationPanel } from '@/components/configuration-panel';
import { PreviewPanel } from '@/components/preview-panel';
import { DemoLibrary } from '@/components/demo-library';

type ActiveTab = 'preview' | 'library';

export default function DemoStudio() {
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  const [baseUrl, setBaseUrl] = useState('https://corso-demo.vercel.app');

  const handleConfigChange = (updates: Partial<DemoConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-gray-900" viewBox="0 0 907.14 1080" fill="currentColor">
                <path d="M0,540c0,273.82,201.53,500.53,464.34,540V787.36C360.49,753.04,285.48,655.36,285.48,540s75.02-213.04,178.87-247.36V0C201.53,39.47,0,266.18,0,540z"/>
                <path d="M755.62,348.28c83.68,0,151.52-67.84,151.52-151.52c0-83.68-67.84-151.52-151.52-151.52S604.1,113.08,604.1,196.76C604.1,280.44,671.94,348.28,755.62,348.28z"/>
                <circle cx="755.62" cy="883.24" r="151.52"/>
              </svg>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Demo Studio</h1>
                <p className="text-xs text-gray-500">Configure and preview Corso demos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500">Base URL:</label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="flex gap-6 h-[calc(100vh-140px)]">
          {/* Left Sidebar - Configuration */}
          <div className="w-80 flex-shrink-0 overflow-y-auto">
            <ConfigurationPanel config={config} onChange={handleConfigChange} />
          </div>

          {/* Right Panel - Preview/Library */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Live Preview
              </button>
              <button
                onClick={() => setActiveTab('library')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'library'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Demo Links
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'preview' ? (
                <PreviewPanel config={config} baseUrl={baseUrl} />
              ) : (
                <div className="p-6 overflow-y-auto h-full">
                  <DemoLibrary config={config} baseUrl={baseUrl} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
