// RADIO JAMM — Metronome Hook

import { useEffect } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { metronome } from '@/lib/metronome-engine';

export function useMetronome() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const tempo = usePlayerStore((state) => state.tempo);
  const volume = usePlayerStore((state) => state.volume);
  const isMuted = usePlayerStore((state) => state.isMuted);
  const metronomeSound = usePlayerStore((state) => state.metronomeSound);
  const advanceBeat = usePlayerStore((state) => state.advanceBeat);

  // Sync metronome settings with store
  useEffect(() => {
    metronome.setTempo(tempo);
  }, [tempo]);

  useEffect(() => {
    metronome.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    metronome.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    metronome.setSound(metronomeSound);
  }, [metronomeSound]);

  // Set up beat callback
  useEffect(() => {
    metronome.setBeatCallback(() => {
      advanceBeat();
    });
  }, [advanceBeat]);

  // Control playback
  useEffect(() => {
    if (isPlaying) {
      metronome.start();
    } else {
      metronome.pause();
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      metronome.stop();
    };
  }, []);

  return {
    // Metronome is controlled via the Zustand store
    // This hook just syncs the engine with the store
  };
}
