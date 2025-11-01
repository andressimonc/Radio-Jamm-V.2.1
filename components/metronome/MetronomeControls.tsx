'use client';

// RADIO JAMM — Metronome Controls Container

import { useMetronome } from '@/hooks/useMetronome';
import { PlayPauseButton } from './PlayPauseButton';
import { StopButton } from './StopButton';
import { TempoSlider } from './TempoSlider';
import { TempoDisplay } from './TempoDisplay';
import { VolumeControl } from './VolumeControl';
import { BeatIndicator } from './BeatIndicator';

export function MetronomeControls() {
  // Initialize metronome sync
  useMetronome();

  return (
    <div className="bg-off-white rounded-panel p-6 shadow-card space-y-6">
      <h2 className="text-xl font-semibold text-royal font-display">
        Metronome
      </h2>

      {/* Tempo Display */}
      <TempoDisplay />

      {/* Tempo Slider */}
      <TempoSlider />

      {/* Volume Control */}
      <VolumeControl />

      {/* Play/Pause & Stop Buttons */}
      <div className="flex gap-3">
        <PlayPauseButton />
        <StopButton />
      </div>

      {/* Beat Indicator */}
      <BeatIndicator />
    </div>
  );
}
