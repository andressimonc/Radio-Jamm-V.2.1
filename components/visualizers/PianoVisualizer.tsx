'use client';

// RADIO JAMM — Piano Visualizer Component

import { usePlayerStore, selectCurrentChord } from '@/store/usePlayerStore';
import { isNoteInChord } from '@/lib/chord-parser';

export function PianoVisualizer() {
  const currentChord = usePlayerStore(selectCurrentChord);
  const selectedChordForVisualizer = usePlayerStore((state) => state.selectedChordForVisualizer);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  // Determine which chord to display
  // Priority: 1) Currently playing chord (when metronome on), 2) User-selected chord, 3) null
  const chordToDisplay = (isPlaying && currentChord?.chord) 
    ? currentChord.chord 
    : (selectedChordForVisualizer || currentChord?.chord);

  // Define 2 octaves of piano keys (C4-B5)
  const keys = [
    { note: 'C', isBlack: false, octave: 4 },
    { note: 'C#', isBlack: true, octave: 4 },
    { note: 'D', isBlack: false, octave: 4 },
    { note: 'D#', isBlack: true, octave: 4 },
    { note: 'E', isBlack: false, octave: 4 },
    { note: 'F', isBlack: false, octave: 4 },
    { note: 'F#', isBlack: true, octave: 4 },
    { note: 'G', isBlack: false, octave: 4 },
    { note: 'G#', isBlack: true, octave: 4 },
    { note: 'A', isBlack: false, octave: 4 },
    { note: 'A#', isBlack: true, octave: 4 },
    { note: 'B', isBlack: false, octave: 4 },
    { note: 'C', isBlack: false, octave: 5 },
    { note: 'C#', isBlack: true, octave: 5 },
    { note: 'D', isBlack: false, octave: 5 },
    { note: 'D#', isBlack: true, octave: 5 },
    { note: 'E', isBlack: false, octave: 5 },
    { note: 'F', isBlack: false, octave: 5 },
    { note: 'F#', isBlack: true, octave: 5 },
    { note: 'G', isBlack: false, octave: 5 },
    { note: 'G#', isBlack: true, octave: 5 },
    { note: 'A', isBlack: false, octave: 5 },
    { note: 'A#', isBlack: true, octave: 5 },
    { note: 'B', isBlack: false, octave: 5 },
  ];

  // Check if a note is active in the chord to display
  const isActive = (note: string) => {
    if (!chordToDisplay) return false;
    return isNoteInChord(chordToDisplay, note);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-4">
      {/* Composite SVG with proper layering */}
      <div className="relative w-full">
        <svg 
          viewBox="0 0 5802 1417" 
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background and white keys from original SVG */}
          <rect x="25" y="25" width="5752" height="1367" rx="75" fill="#7BA9FF" fillOpacity="0.66" stroke="black" strokeWidth="50"/>
          <rect x="27.5" y="31.5" width="2708" height="1354" rx="4.5" stroke="#8A38F5" strokeDasharray="10 5"/>
          
          {/* White keys */}
          <rect x="57" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="438" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="819" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="1200" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="1581" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="1962" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="2343" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="2687.5" y="31.5" width="3066" height="1354" rx="4.5" stroke="#8A38F5" strokeDasharray="10 5"/>
          <rect x="2717" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="3098" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="3479" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="3860" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="4241" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="4622" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="5003" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          <rect x="5383" y="61" width="361" height="1295" rx="35" fill="white" stroke="black" strokeWidth="20"/>
          
          {/* Purple highlights for active WHITE keys - BEFORE black keys */}
          {[
            { note: 'C', x: 57, octave: 4 },
            { note: 'D', x: 438, octave: 4 },
            { note: 'E', x: 819, octave: 4 },
            { note: 'F', x: 1200, octave: 4 },
            { note: 'G', x: 1581, octave: 4 },
            { note: 'A', x: 1962, octave: 4 },
            { note: 'B', x: 2343, octave: 4 },
            { note: 'C', x: 2717, octave: 5 },
            { note: 'D', x: 3098, octave: 5 },
            { note: 'E', x: 3479, octave: 5 },
            { note: 'F', x: 3860, octave: 5 },
            { note: 'G', x: 4241, octave: 5 },
            { note: 'A', x: 4622, octave: 5 },
            { note: 'B', x: 5003, octave: 5 },
          ].map((key) => {
            if (!isActive(key.note)) return null;
            return (
              <rect
                key={`${key.note}-${key.octave}`}
                x={key.x}
                y={61}
                width={361}
                height={1295}
                rx={35}
                fill="#6366f1"
                fillOpacity={0.5}
              />
            );
          })}
          
          {/* Black keys - drawn AFTER white key highlights */}
          <rect x="329" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="709" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="1469" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="1849" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="2229" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="2989" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="3369" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="4129" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="4509" y="51" width="200" height="799" rx="45" fill="black"/>
          <rect x="4889" y="51" width="200" height="799" rx="45" fill="black"/>
          
          {/* Purple highlights for active BLACK keys - on top of black keys */}
          {[
            { note: 'C#', x: 329, octave: 4 },
            { note: 'D#', x: 709, octave: 4 },
            { note: 'F#', x: 1469, octave: 4 },
            { note: 'G#', x: 1849, octave: 4 },
            { note: 'A#', x: 2229, octave: 4 },
            { note: 'C#', x: 2989, octave: 5 },
            { note: 'D#', x: 3369, octave: 5 },
            { note: 'F#', x: 4129, octave: 5 },
            { note: 'G#', x: 4509, octave: 5 },
            { note: 'A#', x: 4889, octave: 5 },
          ].map((key) => {
            // Check if the sharp note itself is active (not just the base note)
            if (!isActive(key.note)) return null;
            return (
              <rect
                key={`${key.note}-${key.octave}`}
                x={key.x}
                y={51}
                width={200}
                height={799}
                rx={45}
                fill="#6366f1"
                fillOpacity={0.7}
              />
            );
          })}
          
          {/* Top frame - drawn LAST so it's on top */}
          <path d="M5714.5 0C5762.52 0 5801.5 38.6784 5801.99 86.5791C5802 86.7191 5802 86.8593 5802 87V155C5802 166.046 5793.05 175 5782 175H20C8.95438 175 0 166.046 0 155V87C6.5632e-09 86.8594 0.00199337 86.7191 0.00488281 86.5791C0.498803 38.6784 39.4824 0 87.5 0H5714.5Z" fill="black"/>
        </svg>
      </div>
      
      {/* Chord name display */}
      <div className="text-center mt-4">
        <span className="text-2xl font-bold text-royal font-display">
          {chordToDisplay || 'Click a chord to see keys'}
        </span>
      </div>
    </div>
  );
}
