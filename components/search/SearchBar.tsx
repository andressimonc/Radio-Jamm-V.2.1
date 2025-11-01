'use client';

// RADIO JAMM — Search Bar Component

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { debounce } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search by song or artist...' }: SearchBarProps) {
  const [value, setValue] = useState('');

  // Debounced search to avoid excessive API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-4 text-lg border-2 border-light-gray rounded-lg
                     focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20
                     transition-all duration-200
                     placeholder:text-muted-foreground"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
