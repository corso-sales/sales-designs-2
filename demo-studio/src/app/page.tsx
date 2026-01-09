'use client';

import { useState } from 'react';
import { DemoConfig, DEFAULT_CONFIG } from '@/lib/types';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ConfigurationPanel } from '@/components/configuration-panel';
import { PreviewPanel } from '@/components/preview-panel';
import { FooterBar } from '@/components/footer-bar';
import { Card } from '@/components/ui/card';

export default function DemoStudio() {
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG);
  const [baseUrl] = useState('https://corso-demo.vercel.app');

  const handleConfigChange = (updates: Partial<DemoConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleImport = (data: Partial<DemoConfig>) => {
    setConfig((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <HeroSection onImport={handleImport} />

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 pb-24">
        <div className="flex gap-8">
          {/* Left Column - Configuration Panel (40%) */}
          <div className="w-[40%] flex-shrink-0">
            <div className="overflow-y-auto max-h-[calc(100vh-280px)] pr-2">
              <ConfigurationPanel config={config} onChange={handleConfigChange} />
            </div>
          </div>

          {/* Right Column - Live Preview (60%, sticky) */}
          <div className="flex-1">
            <div className="sticky top-8">
              <Card className="h-[calc(100vh-280px)] overflow-hidden">
                <PreviewPanel config={config} baseUrl={baseUrl} />
              </Card>
            </div>
          </div>
        </div>
      </main>

      <FooterBar config={config} baseUrl={baseUrl} />
    </div>
  );
}
