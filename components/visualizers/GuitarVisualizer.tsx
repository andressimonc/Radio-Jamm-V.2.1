'use client';

// RADIO JAMM — Guitar Visualizer Component

import { usePlayerStore, selectCurrentChord } from '@/store/usePlayerStore';
import { parseChord } from '@/lib/chord-parser';

// Common guitar chord shapes (simplified for MVP)
const CHORD_SHAPES: Record<string, Array<{ string: number; fret: number }>> = {
  // Major chords
  'C': [{ string: 5, fret: 3 }, { string: 4, fret: 2 }, { string: 2, fret: 1 }],
  'D': [{ string: 4, fret: 0 }, { string: 3, fret: 2 }, { string: 2, fret: 3 }, { string: 1, fret: 2 }],
  'E': [{ string: 5, fret: 0 }, { string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 1 }],
  'F': [{ string: 6, fret: 1 }, { string: 5, fret: 3 }, { string: 4, fret: 3 }, { string: 3, fret: 2 }, { string: 2, fret: 1 }, { string: 1, fret: 1 }],
  'G': [{ string: 6, fret: 3 }, { string: 5, fret: 2 }, { string: 1, fret: 3 }],
  'A': [{ string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 2 }],
  
  // Minor chords
  'Am': [{ string: 4, fret: 2 }, { string: 3, fret: 2 }, { string: 2, fret: 1 }],
  'Dm': [{ string: 4, fret: 0 }, { string: 3, fret: 2 }, { string: 2, fret: 3 }, { string: 1, fret: 1 }],
  'Em': [{ string: 5, fret: 2 }, { string: 4, fret: 2 }],
  'F#m': [{ string: 6, fret: 2 }, { string: 5, fret: 4 }, { string: 4, fret: 4 }, { string: 3, fret: 2 }, { string: 2, fret: 2 }, { string: 1, fret: 2 }],
};

export function GuitarVisualizer() {
  const currentChord = usePlayerStore(selectCurrentChord);
  const selectedChordForVisualizer = usePlayerStore((state) => state.selectedChordForVisualizer);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  // Determine which chord to display
  // Priority: 1) Currently playing chord (when metronome on), 2) User-selected chord, 3) null
  const chordToDisplay = (isPlaying && currentChord?.chord) 
    ? currentChord.chord 
    : (selectedChordForVisualizer || currentChord?.chord);

  // Get fingering for the chord to display
  const getFingering = () => {
    if (!chordToDisplay) return [];
    
    // Try exact match first
    if (CHORD_SHAPES[chordToDisplay]) {
      return CHORD_SHAPES[chordToDisplay];
    }
    
    // Try parsing chord to get root + quality
    try {
      const parsed = parseChord(chordToDisplay);
      const simpleChord = parsed.quality === 'minor' ? `${parsed.root}m` : parsed.root;
      return CHORD_SHAPES[simpleChord] || [];
    } catch {
      return [];
    }
  };

  const fingering = getFingering();
  const strings = 6;
  const frets = 5;

  // Check if a position should be highlighted
  const isActive = (stringNum: number, fretNum: number) => {
    return fingering.some(f => f.string === stringNum && f.fret === fretNum);
  };

  return (
    <div className="w-full py-4">
      {!chordToDisplay ? (
        <p className="text-center text-muted-foreground py-8">Click a chord to see fingering</p>
      ) : fingering.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          Chord shape not available for {chordToDisplay}
        </p>
      ) : (
        <div className="relative w-full max-w-5xl mx-auto">
          {/* SVG Fretboard Background */}
          <div className="relative w-full">
            <img 
              src="/visualizers/guitar-12-frets.svg" 
              alt="Guitar fretboard"
              className="w-full h-auto"
            />
            
            {/* Overlay finger positions on the SVG */}
            <svg 
              viewBox="0 0 4788 1698" 
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {fingering.map((pos, idx) => {
                // Calculate position on the SVG (12-fret version)
                // Strings are horizontal lines at y positions
                const stringPositions = [153, 413, 683, 953, 1213, 1493]; // Y positions from SVG
                const stringY = stringPositions[pos.string - 1];
                
                // Frets are vertical lines, calculate X position between frets (12 frets)
                const fretPositions = [213, 530, 900, 1280, 1660, 2040, 2420, 2790, 3160, 3520, 3880, 4230, 4571]; // X positions
                const fretX = pos.fret === 0 
                  ? 213 // Open string (at nut)
                  : (fretPositions[pos.fret - 1] + fretPositions[pos.fret]) / 2; // Between frets
                
                return (
                  <circle
                    key={idx}
                    cx={fretX}
                    cy={stringY + 22} // Offset to center on string
                    r="80"
                    fill="white"
                    stroke="black"
                    strokeWidth="6"
                  />
                );
              })}
            </svg>
          </div>
          
          {/* Chord name display */}
          <div className="text-center mt-4">
            <span className="text-2xl font-bold text-royal font-display">
              {chordToDisplay}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
