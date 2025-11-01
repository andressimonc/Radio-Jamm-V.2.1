'use client';

// RADIO JAMM — Beat Indicator
// Visual pulse showing current beat

import { usePlayerStore, selectCurrentChord } from '@/store/usePlayerStore';

export function BeatIndicator() {
  const currentChord = usePlayerStore(selectCurrentChord);
  const currentBeat = usePlayerStore((state) => state.currentBeat);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  if (!currentChord) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground text-center">
        Beat Indicator
      </p>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: currentChord.beats }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-100 ${
              index === currentBeat && isPlaying
                ? 'bg-royal scale-125'
                : 'bg-light-gray'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
