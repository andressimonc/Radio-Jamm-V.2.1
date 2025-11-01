'use client';

// RADIO JAMM — Tempo Display

import { usePlayerStore } from '@/store/usePlayerStore';
import { formatTempo, getTempoLabel } from '@/lib/utils';

export function TempoDisplay() {
  const tempo = usePlayerStore((state) => state.tempo);

  return (
    <div className="text-center" role="status" aria-label="Current tempo">
      <div className="text-5xl font-bold text-plum font-display mb-2">
        {tempo}
      </div>
      <div className="text-sm text-muted-foreground" aria-label="Tempo description">
        {formatTempo(tempo)} • {getTempoLabel(tempo)}
      </div>
    </div>
  );
}
