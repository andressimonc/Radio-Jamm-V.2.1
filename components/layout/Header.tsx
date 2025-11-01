// RADIO JAMM — Header Component

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-gray bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold text-plum font-display">
            RADIO <span className="text-royal">JAMM</span>
          </h1>
        </Link>

        {/* Navigation - Future: Add links to browse, favorites, etc. */}
        <nav className="flex items-center space-x-4">
          {/* Placeholder for future nav items */}
        </nav>
      </div>
    </header>
  );
}
