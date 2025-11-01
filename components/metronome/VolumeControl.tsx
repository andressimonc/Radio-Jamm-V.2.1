'use client';

// RADIO JAMM — Volume Control Component

import { usePlayerStore } from '@/store/usePlayerStore';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export function VolumeControl() {
  const volume = usePlayerStore((state) => state.volume);
  const isMuted = usePlayerStore((state) => state.isMuted);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const toggleMute = usePlayerStore((state) => state.toggleMute);

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-plum">Volume</span>
        <span className="text-sm text-muted-foreground">
          {isMuted ? 'Muted' : `${volume}%`}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center
            transition-all
            ${isMuted 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white border border-light-gray text-plum hover:bg-off-white'
            }
          `}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>

        {/* Volume Slider */}
        <div className="flex-1">
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            min={0}
            max={100}
            step={1}
            disabled={isMuted}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
