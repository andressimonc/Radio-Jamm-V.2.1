'use client';

// RADIO JAMM — Search Result Item Component

import Link from 'next/link';
import { Music } from 'lucide-react';
import { Song } from '@/lib/types';
import { formatTempo } from '@/lib/utils';

interface SearchResultItemProps {
  song: Song;
}

export function SearchResultItem({ song }: SearchResultItemProps) {
  return (
    <Link
      href={`/songs/${song.id}`}
      aria-label={`View details for ${song.title} by ${song.artist}`}
      className="block p-4 border border-light-gray rounded-lg hover:shadow-card-hover
                 transition-all duration-200 hover:border-royal group"
    >
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-off-white rounded-lg flex items-center justify-center
                       group-hover:bg-royal/10 transition-colors">
          <Music className="h-6 w-6 text-royal" />
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate font-display">
            {song.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {song.artist}
          </p>
          <div className="flex items-center space-x-3 mt-2">
            <span className="text-xs text-muted-foreground">
              {song.original_key}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {formatTempo(song.tempo_bpm)}
            </span>
            {song.genre && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {song.genre}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Difficulty Badge */}
        <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${
          song.difficulty === 'beginner'
            ? 'bg-green-100 text-green-700'
            : song.difficulty === 'intermediate'
            ? 'bg-yellow-100 text-yellow-700'
            : song.difficulty === 'advanced'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {song.difficulty || 'Unknown'}
        </span>
      </div>
    </Link>
  );
}
