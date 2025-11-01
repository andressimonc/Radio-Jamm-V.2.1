'use client';

// RADIO JAMM — Stop Button
// Stops metronome and resets to beginning

import { StopCircle } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';

export function StopButton() {
  const stop = usePlayerStore((state) => state.stop);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    <button
      onClick={stop}
      disabled={!isPlaying}
      className="flex-1 px-6 py-3 rounded-button bg-white text-foreground border-2 border-light-gray
                 hover:border-royal/50 transition-all font-medium disabled:opacity-50 
                 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      aria-label="Stop metronome"
    >
      <StopCircle className="h-5 w-5" />
      <span>Stop</span>
    </button>
  );
}
