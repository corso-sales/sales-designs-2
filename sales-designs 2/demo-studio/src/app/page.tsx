'use client';

import { useState } from 'react';
import { DemoConfig, DEFAULT_CONFIG } from '@/lib/types';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ConfigurationPanel } from '@/components/configuration-panel';
import { PreviewPanel } from '@/components/preview-panel';
import { DemoLibrary } from '@/components/demo-library';
import { FooterBar } from '@/components/footer-bar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings2 } from 'lucide-react';

export default function DemoStudio() {
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG);
  const [baseUrl, setBaseUrl] = useState('https://corso-demo.vercel.app');

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
      <main className="flex-1 container py-6 pb-24">
        <div className="flex gap-6 h-[calc(100vh-220px)]">
          {/* Left Sidebar - Configuration */}
          <div className="w-80 flex-shrink-0 overflow-y-auto pr-2">
            {/* Base URL Config */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Demo Environment</Label>
              </div>
              <Input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="h-9 font-mono text-xs"
                placeholder="https://corso-demo.vercel.app"
              />
            </Card>

            <ConfigurationPanel config={config} onChange={handleConfigChange} />
          </div>

          {/* Right Panel - Preview/Library */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="preview" className="h-full flex flex-col">
              <TabsList className="w-fit">
                <TabsTrigger value="preview">Live Preview</TabsTrigger>
                <TabsTrigger value="library">Demo Links</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="flex-1 mt-4">
                <Card className="h-full overflow-hidden">
                  <PreviewPanel config={config} baseUrl={baseUrl} />
                </Card>
              </TabsContent>

              <TabsContent value="library" className="flex-1 mt-4 overflow-y-auto">
                <DemoLibrary config={config} baseUrl={baseUrl} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <FooterBar config={config} baseUrl={baseUrl} />
    </div>
  );
}
