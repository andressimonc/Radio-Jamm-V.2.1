// RADIO JAMM — Chord Parser
// Converts chord notation (e.g., "Cmaj7", "F#m") into note arrays for visualizers

import { ParsedChord } from './types';

/**
 * Parse a chord string into its components
 * @param chordString - e.g., "Cmaj7", "F#m", "A7sus4"
 * @returns Parsed chord with root, quality, extension, and notes
 */
export function parseChord(chordString: string): ParsedChord {
  // Remove whitespace
  const chord = chordString.trim();
  
  // Extract root note (including sharps/flats)
  const rootMatch = chord.match(/^([A-G][#b]?)/);
  if (!rootMatch) {
    throw new Error(`Invalid chord: ${chordString}`);
  }
  
  const root = rootMatch[1];
  const remainder = chord.slice(root.length);
  
  // Determine quality and extension
  let quality = 'major'; // default
  let extension: string | null = null;
  
  // Minor chords
  if (remainder.match(/^m(?!aj)/)) {
    quality = 'minor';
    extension = remainder.slice(1) || null;
  }
  // Diminished
  else if (remainder.match(/^dim|°/)) {
    quality = 'diminished';
    extension = remainder.replace(/dim|°/, '') || null;
  }
  // Augmented
  else if (remainder.match(/^aug|\+/)) {
    quality = 'augmented';
    extension = remainder.replace(/aug|\+/, '') || null;
  }
  // Major (explicit)
  else if (remainder.match(/^(?:maj|M)/)) {
    quality = 'major';
    extension = remainder.replace(/maj|M/, '') || null;
  }
  // Default major with extension
  else {
    quality = 'major';
    extension = remainder || null;
  }
  
  // Generate notes for the chord
  const notes = getChordNotes(root, quality, extension);
  
  return {
    root,
    quality,
    extension,
    notes,
  };
}

/**
 * Get the notes that make up a chord
 * @param root - Root note (e.g., "C", "F#")
 * @param quality - "major", "minor", "diminished", "augmented"
 * @param extension - Additional notes (e.g., "7", "maj7", "9")
 * @returns Array of note names
 */
function getChordNotes(root: string, quality: string, extension: string | null): string[] {
  const rootIndex = getNoteIndex(root);
  const notes: string[] = [root];
  
  // Add third
  if (quality === 'major') {
    notes.push(getNoteName(rootIndex + 4)); // Major third
  } else if (quality === 'minor') {
    notes.push(getNoteName(rootIndex + 3)); // Minor third
  } else if (quality === 'diminished') {
    notes.push(getNoteName(rootIndex + 3)); // Minor third
  } else if (quality === 'augmented') {
    notes.push(getNoteName(rootIndex + 4)); // Major third
  }
  
  // Add fifth
  if (quality === 'diminished') {
    notes.push(getNoteName(rootIndex + 6)); // Diminished fifth
  } else if (quality === 'augmented') {
    notes.push(getNoteName(rootIndex + 8)); // Augmented fifth
  } else {
    notes.push(getNoteName(rootIndex + 7)); // Perfect fifth
  }
  
  // Handle extensions
  if (extension) {
    // Seventh chords
    if (extension.includes('7')) {
      if (extension.includes('maj7') || extension.includes('M7')) {
        notes.push(getNoteName(rootIndex + 11)); // Major seventh
      } else {
        notes.push(getNoteName(rootIndex + 10)); // Minor seventh (dominant 7)
      }
    }
    
    // Suspended chords
    if (extension.includes('sus4')) {
      // Replace third with fourth
      notes[1] = getNoteName(rootIndex + 5);
    } else if (extension.includes('sus2')) {
      // Replace third with second
      notes[1] = getNoteName(rootIndex + 2);
    }
    
    // Add 9th
    if (extension.includes('9')) {
      notes.push(getNoteName(rootIndex + 14)); // 9th = octave + 2nd
    }
  }
  
  return notes;
}

/**
 * Convert a note name to its chromatic index (0-11)
 * @param note - Note name (e.g., "C", "F#", "Bb")
 * @returns Chromatic index
 */
function getNoteIndex(note: string): number {
  const noteMap: Record<string, number> = {
    'C': 0, 'C#': 1, 'Db': 1,
    'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6,
    'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10,
    'B': 11,
  };
  
  const index = noteMap[note];
  if (index === undefined) {
    throw new Error(`Invalid note: ${note}`);
  }
  return index;
}

/**
 * Convert a chromatic index (0-11) to a note name
 * @param index - Chromatic index
 * @returns Note name (using sharps)
 */
function getNoteName(index: number): string {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return notes[index % 12];
}

/**
 * Check if a specific note is in a chord
 * @param chordString - Chord notation (e.g., "Am7")
 * @param note - Note to check (e.g., "A", "C#")
 * @returns True if the note is in the chord
 */
export function isNoteInChord(chordString: string, note: string): boolean {
  try {
    const parsed = parseChord(chordString);
    const noteIndex = getNoteIndex(note);
    
    return parsed.notes.some(chordNote => {
      return getNoteIndex(chordNote) === noteIndex;
    });
  } catch (error) {
    console.error(`Error parsing chord ${chordString}:`, error);
    return false;
  }
}

/**
 * Get all notes in a chord with octave information for piano
 * @param chordString - Chord notation
 * @param startOctave - Starting octave (e.g., 4 for middle C)
 * @returns Array of notes with octaves (e.g., ["C4", "E4", "G4"])
 */
export function getChordNotesWithOctave(chordString: string, startOctave: number = 4): string[] {
  try {
    const parsed = parseChord(chordString);
    let currentOctave = startOctave;
    let previousIndex = getNoteIndex(parsed.root);
    
    return parsed.notes.map((note, index) => {
      const currentIndex = getNoteIndex(note);
      
      // Bump octave if current note would go backwards
      if (index > 0 && currentIndex < previousIndex) {
        currentOctave++;
      }
      
      previousIndex = currentIndex;
      return `${note}${currentOctave}`;
    });
  } catch (error) {
    console.error(`Error getting chord notes with octave:`, error);
    return [];
  }
}
