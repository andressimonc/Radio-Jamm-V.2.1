'use client';

// RADIO JAMM — Restart Button

import { RotateCcw } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';

export function RestartButton() {
  const restart = usePlayerStore((state) => state.restart);
  const currentSong = usePlayerStore((state) => state.currentSong);

  return (
    <button
      onClick={restart}
      disabled={!currentSong}
      className="h-14 px-6 bg-secondary text-white rounded-button font-semibold
                 hover:bg-royal disabled:bg-muted disabled:cursor-not-allowed
                 transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <RotateCcw className="h-5 w-5" />
      Restart
    </button>
  );
}
