'use client';

// RADIO JAMM — Homepage

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { searchSongs } from '@/lib/supabase';
import { Song } from '@/lib/types';

export default function Home() {
  const [results, setResults] = useState<Song[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    // Don't search if query is too short
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const songs = await searchSongs(searchQuery);
      setResults(songs);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper className="py-8 px-4 md:py-12">
      <div className="container max-w-4xl mx-auto">
        {/* Search Bar - Primary Focus */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Custom Button - Placeholder */}
        <div className="mb-8 flex justify-center">
          <button
            className="px-6 py-2 border-2 border-royal text-royal rounded-lg hover:bg-royal/10 transition-colors font-medium"
            onClick={() => {
              // Placeholder for future custom chord creation feature
              console.log('Custom feature - coming soon');
            }}
          >
            Custom
          </button>
        </div>

        {/* Search Results */}
        <SearchResults results={results} query={query} isLoading={isLoading} />
      </div>
    </PageWrapper>
  );
}
