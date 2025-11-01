'use client';

// RADIO JAMM — Search Results Container

import { Song } from '@/lib/types';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultsProps {
  results: Song[];
  query: string;
  isLoading?: boolean;
}

export function SearchResults({ results, query, isLoading = false }: SearchResultsProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto mb-4"></div>
          <p className="text-muted-foreground" aria-label="Searching for songs">Searching...</p>
        </div>
      </div>
    );
  }

  // Empty query state
  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Start typing to search for songs
        </p>
      </div>
    );
  }

  // No results state
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-foreground font-semibold mb-2">
          No songs found
        </p>
        <p className="text-muted-foreground">
          Try searching for a different song or artist
        </p>
      </div>
    );
  }

  // Results list
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground mb-4">
        Found {results.length} {results.length === 1 ? 'song' : 'songs'}
      </p>
      {results.map((song) => (
        <SearchResultItem key={song.id} song={song} />
      ))}
    </div>
  );
}
