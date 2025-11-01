'use client';

// RADIO JAMM — Instrument Toggle Component
// Switches between Piano and Guitar visualizers

import { usePlayerStore } from '@/store/usePlayerStore';
import { PianoVisualizer } from './PianoVisualizer';
import { GuitarVisualizer } from './GuitarVisualizer';

export function InstrumentToggle() {
  const selectedInstrument = usePlayerStore((state) => state.selectedInstrument);
  const setInstrument = usePlayerStore((state) => state.setInstrument);

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div className="flex items-center justify-center gap-2 bg-off-white rounded-lg p-1">
        <button
          onClick={() => setInstrument('piano')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${
            selectedInstrument === 'piano'
              ? 'bg-royal text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Piano
        </button>
        <button
          onClick={() => setInstrument('guitar')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${
            selectedInstrument === 'guitar'
              ? 'bg-royal text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Guitar
        </button>
      </div>

      {/* Visualizer */}
      <div className="bg-white rounded-panel p-6 shadow-card">
        {selectedInstrument === 'piano' ? (
          <PianoVisualizer />
        ) : (
          <GuitarVisualizer />
        )}
      </div>
    </div>
  );
}
