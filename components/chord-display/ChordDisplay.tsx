'use client';

// RADIO JAMM — Chord Display Component
// Shows 4 chords from the selected section in a 2x2 grid

import { usePlayerStore } from '@/store/usePlayerStore';
import { useMemo } from 'react';

export function ChordDisplay() {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const selectedSection = usePlayerStore((state) => state.selectedSection);
  const currentSectionIndex = usePlayerStore((state) => state.currentSectionIndex);
  const currentChordIndex = usePlayerStore((state) => state.currentChordIndex);
  const manualMode = usePlayerStore((state) => state.manualMode);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const selectedChordForVisualizer = usePlayerStore((state) => state.selectedChordForVisualizer);
  const selectChordForVisualizer = usePlayerStore((state) => state.selectChordForVisualizer);

  // Determine which section to display
  const displaySectionIndex = manualMode 
    ? (selectedSection ?? 0) 
    : currentSectionIndex;

  // Get the section and its chords
  const { displayChords, startChordIndex, currentChordInGrid } = useMemo(() => {
    if (!currentSong) return { displayChords: [], startChordIndex: 0, currentChordInGrid: -1 };
    
    const section = currentSong.chord_progression.sections[displaySectionIndex];
    if (!section) return { displayChords: [], startChordIndex: 0, currentChordInGrid: -1 };
    
    const allChords = section.chords.map(c => c.chord);
    
    // When metronome is playing, show a sliding window of 4 chords based on current position
    let startIndex = 0;
    let currentInGrid = -1;
    
    if (!manualMode && isPlaying) {
      // Calculate which group of 4 chords to show
      startIndex = Math.floor(currentChordIndex / 4) * 4;
      currentInGrid = currentChordIndex % 4;
    }
    
    // Get 4 chords starting from startIndex
    const result = [...allChords.slice(startIndex, startIndex + 4)];
    while (result.length < 4) {
      result.push('');
    }
    
    return { 
      displayChords: result, 
      startChordIndex: startIndex,
      currentChordInGrid: currentInGrid
    };
  }, [currentSong, displaySectionIndex, currentChordIndex, manualMode, isPlaying]);

  if (!currentSong) {
    return (
      <div className="bg-off-white rounded-panel p-8 text-center min-h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Load a song to start</p>
      </div>
    );
  }

  const handleChordClick = (chord: string) => {
    if (chord) {
      selectChordForVisualizer(chord);
    }
  };

  return (
    <div 
      className="bg-off-white rounded-panel p-6 shadow-card"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* 4-Chord Grid (2x2) */}
      <div className="grid grid-cols-2 gap-4">
        {displayChords.map((chord, index) => {
          const isCurrentlyPlaying = !manualMode && isPlaying && index === currentChordInGrid;
          const isSelected = selectedChordForVisualizer === chord;
          
          return (
            <button
              key={index}
              onClick={() => handleChordClick(chord)}
              disabled={!chord}
              className={`
                rounded-lg p-6 flex items-center justify-center
                ${chord ? 'bg-white border-2 hover:border-royal/40 hover:shadow-md transition-all cursor-pointer' : 'bg-light-gray/30 cursor-default'}
                ${isCurrentlyPlaying ? 'border-royal bg-royal/5 ring-4 ring-royal/30 scale-105' : 'border-royal/20'}
                ${isSelected && !isCurrentlyPlaying ? 'border-royal ring-2 ring-royal/20' : ''}
                min-h-[120px]
              `}
              aria-label={chord ? `View ${chord} chord` : 'Empty chord slot'}
            >
              {chord ? (
                <span className={`text-4xl md:text-5xl font-bold font-display ${isCurrentlyPlaying ? 'text-royal' : 'text-royal'}`}>
                  {chord}
                </span>
              ) : (
                <span className="text-2xl text-muted-foreground/30">—</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
