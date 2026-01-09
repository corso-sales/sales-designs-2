'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="px-6 flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Corso Logo */}
          <img
            src="https://20138464.fs1.hubspotusercontent-na2.net/hubfs/20138464/Logos/Corso.png"
            alt="Corso"
            className="h-7 w-auto"
          />
          <span className="text-sm font-semibold">Demo Studio</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </header>
  );
}
