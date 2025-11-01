'use client';

// RADIO JAMM — Play/Pause Button

import { Play, Pause } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';

export function PlayPauseButton() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);
  const currentSong = usePlayerStore((state) => state.currentSong);

  const handleClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!currentSong}
      className="flex-1 h-14 bg-royal text-white rounded-button font-semibold
                 hover:bg-deep-purple disabled:bg-muted disabled:cursor-not-allowed
                 transition-colors duration-200 flex items-center justify-center gap-2"
    >
      {isPlaying ? (
        <>
          <Pause className="h-5 w-5" />
          Pause
        </>
      ) : (
        <>
          <Play className="h-5 w-5" />
          Play
        </>
      )}
    </button>
  );
}
