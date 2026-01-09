'use client';

import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Corso Logo */}
          <svg
            className="h-7 w-7 text-foreground"
            viewBox="0 0 907.14 1080"
            fill="currentColor"
          >
            <path d="M0,540c0,273.82,201.53,500.53,464.34,540V787.36C360.49,753.04,285.48,655.36,285.48,540s75.02-213.04,178.87-247.36V0C201.53,39.47,0,266.18,0,540z"/>
            <path d="M755.62,348.28c83.68,0,151.52-67.84,151.52-151.52c0-83.68-67.84-151.52-151.52-151.52S604.1,113.08,604.1,196.76C604.1,280.44,671.94,348.28,755.62,348.28z"/>
            <circle cx="755.62" cy="883.24" r="151.52"/>
          </svg>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">Demo Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Docs
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Support
          </Button>
        </div>
      </div>
    </header>
  );
}
