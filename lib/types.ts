// RADIO JAMM — TypeScript Type Definitions

/**
 * Song represents a complete song record from the database
 */
export interface Song {
  id: string;
  title: string;
  artist: string;
  original_key: string;
  tempo_bpm: number;
  time_signature: string;
  genre: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  chord_progression: ChordProgression;
  created_at: string;
  updated_at: string;
}

/**
 * ChordProgression defines the complete song structure
 */
export interface ChordProgression {
  sections: Section[];
}

/**
 * Section represents a song section (Verse, Chorus, Bridge, etc.)
 */
export interface Section {
  name: string; // "Verse", "Chorus", "Bridge", "Intro", "Outro"
  order: number; // Playback sequence
  chords: ChordInstance[];
}

/**
 * ChordInstance represents a single chord with its duration
 */
export interface ChordInstance {
  chord: string; // e.g., "A", "Dm7", "F#m", "Cmaj7"
  beats: number; // Duration in beats (typically 2, 4, 8)
}

/**
 * SearchResult is a lightweight song preview for search results
 * (Same as Song, but used semantically for search context)
 */
export type SearchResult = Song;

/**
 * Metronome sound options
 */
export type MetronomeSound = 'metronome';

/**
 * Instrument visualizer options
 */
export type Instrument = 'piano' | 'guitar';

/**
 * Player state for Zustand store
 */
export interface PlayerState {
  // Current song data
  currentSong: Song | null;
  
  // Playback state
  isPlaying: boolean;
  currentSectionIndex: number;
  currentChordIndex: number;
  currentBeat: number; // Current beat within the chord
  
  // Manual selection state
  selectedSection: number | null; // Manually selected section (for display when not playing)
  selectedChordForVisualizer: string | null; // Chord name clicked by user to show in visualizer
  manualMode: boolean; // True when user manually selecting, false when metronome auto-advancing
  
  // Settings
  tempo: number; // BPM (40-240)
  volume: number; // Volume (0-100)
  isMuted: boolean; // Mute state
  selectedInstrument: Instrument;
  metronomeSound: MetronomeSound;
  
  // Actions
  setSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setTempo: (tempo: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setInstrument: (instrument: Instrument) => void;
  setMetronomeSound: (sound: MetronomeSound) => void;
  advanceChord: () => void;
  advanceBeat: () => void;
  selectSection: (sectionIndex: number) => void;
  selectChordForVisualizer: (chord: string | null) => void;
  reset: () => void;
}

/**
 * Parsed chord data for visualizers
 */
export interface ParsedChord {
  root: string; // "C", "D#", "Gb"
  quality: string; // "major", "minor", "diminished", "augmented"
  extension: string | null; // "7", "maj7", "9", "sus4"
  notes: string[]; // ["C", "E", "G"] for C major
}

/**
 * Piano key data
 */
export interface PianoKey {
  note: string; // "C4", "D#4", "F5"
  isBlack: boolean;
  isActive: boolean;
}

/**
 * Guitar fret position
 */
export interface FretPosition {
  string: number; // 1-6 (1 = high E, 6 = low E)
  fret: number; // 0-24 (0 = open string)
  note: string; // "E", "F#", "A"
}

/**
 * Tempo preset
 */
export interface TempoPreset {
  label: string;
  bpm: number;
}
