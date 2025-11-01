'use client';

// RADIO JAMM — Tempo Slider

import { usePlayerStore } from '@/store/usePlayerStore';
import { Slider } from '@/components/ui/slider';
import { Minus, Plus } from 'lucide-react';

export function TempoSlider() {
  const tempo = usePlayerStore((state) => state.tempo);
  const setTempo = usePlayerStore((state) => state.setTempo);

  const handleChange = (values: number[]) => {
    setTempo(values[0]);
  };

  const increment = () => setTempo(Math.min(240, tempo + 5));
  const decrement = () => setTempo(Math.max(40, tempo - 5));

  return (
    <div className="space-y-4">
      {/* Slider */}
      <Slider
        value={[tempo]}
        onValueChange={handleChange}
        min={40}
        max={240}
        step={1}
        className="w-full"
      />

      {/* Tempo Adjustment Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={decrement}
          className="h-10 w-10 rounded-full bg-white border border-light-gray
                     hover:bg-off-white transition-colors flex items-center justify-center"
          aria-label="Decrease tempo"
        >
          <Minus className="h-4 w-4 text-plum" />
        </button>

        <button
          onClick={increment}
          className="h-10 w-10 rounded-full bg-white border border-light-gray
                     hover:bg-off-white transition-colors flex items-center justify-center"
          aria-label="Increase tempo"
        >
          <Plus className="h-4 w-4 text-plum" />
        </button>
      </div>
    </div>
  );
}
