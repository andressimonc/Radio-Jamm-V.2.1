'use client';

// RADIO JAMM — Sound Selector
// Choose metronome click sound

import { usePlayerStore } from '@/store/usePlayerStore';
import { MetronomeSound } from '@/lib/types';

const SOUNDS: Array<{ value: MetronomeSound; label: string; emoji: string }> = [
  { value: 'metronome', label: 'Metronome', emoji: '⏱️' },
  { value: 'shaker', label: 'Shaker', emoji: '🥁' },
];

export function SoundSelector() {
  const metronomeSound = usePlayerStore((state) => state.metronomeSound);
  const setMetronomeSound = usePlayerStore((state) => state.setMetronomeSound);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground text-center">
        Click Sound
      </p>
      <div className="grid grid-cols-2 gap-2">
        {SOUNDS.map((sound) => (
          <button
            key={sound.value}
            onClick={() => setMetronomeSound(sound.value)}
            className={`py-3 px-2 rounded-button text-sm font-medium transition-all ${
              metronomeSound === sound.value
                ? 'bg-royal text-white'
                : 'bg-white text-foreground hover:bg-off-white border border-light-gray'
            }`}
          >
            <div className="text-2xl mb-1">{sound.emoji}</div>
            <div>{sound.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
