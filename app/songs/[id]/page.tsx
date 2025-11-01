'use client';

// RADIO JAMM — Song Page

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { getSongById } from '@/lib/supabase';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Song } from '@/lib/types';
import { SongHeader } from '@/components/song-info/SongHeader';
import { SongStructureView } from '@/components/song-structure/SongStructureView';
import { ChordDisplay } from '@/components/chord-display/ChordDisplay';
import { InstrumentToggle } from '@/components/visualizers/InstrumentToggle';
import { MetronomeControls } from '@/components/metronome/MetronomeControls';

interface SongPageProps {
  params: Promise<{ id: string }>;
}

export default function SongPage({ params }: SongPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const setSongInStore = usePlayerStore((state) => state.setSong);

  useEffect(() => {
    let isMounted = true;

    async function loadSong() {
      try {
        setIsLoading(true);
        const fetchedSong = await getSongById(id);
        
        if (!isMounted) return;

        if (!fetchedSong) {
          setError('Song not found');
          return;
        }
        
        setSong(fetchedSong);
        setSongInStore(fetchedSong);
      } catch (err) {
        console.error('Error loading song:', err);
        if (isMounted) {
          setError('Failed to load song');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSong();
    
    return () => {
      isMounted = false;
    };
  }, [id, setSongInStore]);

  // Loading state
  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading song...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Error state
  if (error || !song) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-2">
              {error || 'Song not found'}
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-6 py-2 bg-royal text-white rounded-lg hover:bg-deep-purple transition-colors"
            >
              Back to Search
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="py-6 px-4">
      <div className="container max-w-7xl mx-auto space-y-6">
        {/* Song Header */}
        <SongHeader song={song} />

        {/* Main Content - 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Song Structure (3 cols) */}
          <div className="lg:col-span-3">
            <SongStructureView />
          </div>

          {/* Middle Column: Chord Display & Visualizer (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* 4-Chord Grid Display */}
            <ChordDisplay />

            {/* Instrument Toggle & Visualizer */}
            <InstrumentToggle />
          </div>

          {/* Right Column: Metronome Controls (3 cols) */}
          <div className="lg:col-span-3">
            <MetronomeControls />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
