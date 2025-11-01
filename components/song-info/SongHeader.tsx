'use client';

// RADIO JAMM — Song Header Component

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Song } from '@/lib/types';
import { formatTempo } from '@/lib/utils';

interface SongHeaderProps {
  song: Song;
}

export function SongHeader({ song }: SongHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-royal transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Link>

      {/* Song Title & Info */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-plum mb-2 font-display">
          {song.title}
        </h1>
        <p className="text-xl text-secondary mb-4">
          {song.artist}
        </p>
        
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Key:</span>
            <span className="font-semibold text-foreground">{song.original_key}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Tempo:</span>
            <span className="font-semibold text-foreground">{formatTempo(song.tempo_bpm)}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-semibold text-foreground">{song.time_signature}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
