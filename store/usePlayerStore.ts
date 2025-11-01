// RADIO JAMM — Zustand Player Store

import { create } from 'zustand';
import { PlayerState, Song, Instrument, MetronomeSound } from '../lib/types';

/**
 * Zustand store for managing player state across the app
 * Single source of truth for all playback and settings
 */
export const usePlayerStore = create<PlayerState>((set, get) => ({
  // Initial state
  currentSong: null,
  isPlaying: false,
  currentSectionIndex: 0,
  currentChordIndex: 0,
  currentBeat: 0,
  selectedSection: null,
  selectedChordForVisualizer: null,
  manualMode: true, // Start in manual mode
  tempo: 120, // Default BPM
  volume: 70, // Default volume (0-100)
  isMuted: false, // Not muted by default
  selectedInstrument: 'piano',
  metronomeSound: 'metronome',

  // Actions
  setSong: (song: Song) => {
    set({
      currentSong: song,
      tempo: song.tempo_bpm, // Set tempo to song's original BPM
      currentSectionIndex: 0,
      currentChordIndex: 0,
      currentBeat: 0,
      selectedSection: 0, // Start with first section selected
      manualMode: true, // Start in manual mode
      isPlaying: false,
    });
  },

  play: () => {
    const { selectedSection } = get();
    // If manually selected a section, start from there
    if (selectedSection !== null) {
      set({
        isPlaying: true,
        manualMode: false,
        currentSectionIndex: selectedSection,
        currentChordIndex: 0,
        currentBeat: 0,
      });
    } else {
      set({ isPlaying: true, manualMode: false });
    }
  },

  pause: () => {
    set({ isPlaying: false });
  },

  stop: () => {
    set({
      isPlaying: false,
      currentSectionIndex: 0,
      currentChordIndex: 0,
      currentBeat: 0,
      manualMode: true,
      selectedSection: 0,
    });
  },

  setTempo: (tempo: number) => {
    // Clamp tempo between 40-240 BPM
    const clampedTempo = Math.max(40, Math.min(240, tempo));
    set({ tempo: clampedTempo });
  },

  setVolume: (volume: number) => {
    // Clamp volume between 0-100
    const clampedVolume = Math.max(0, Math.min(100, volume));
    set({ volume: clampedVolume });
  },

  toggleMute: () => {
    set((state) => ({ isMuted: !state.isMuted }));
  },

  setInstrument: (instrument: Instrument) => {
    set({ selectedInstrument: instrument });
  },

  setMetronomeSound: (sound: MetronomeSound) => {
    set({ metronomeSound: sound });
  },

  advanceBeat: () => {
    const { currentSong, currentSectionIndex, currentChordIndex, currentBeat } = get();
    
    if (!currentSong) return;
    
    const currentSection = currentSong.chord_progression.sections[currentSectionIndex];
    if (!currentSection) return;
    
    const currentChord = currentSection.chords[currentChordIndex];
    if (!currentChord) return;
    
    // Guard against invalid beat count
    if (currentChord.beats < 1) {
      console.error('Invalid chord beats value:', currentChord.beats);
      return;
    }
    
    const newBeat = currentBeat + 1;
    
    // If we've completed all beats for this chord, advance to next chord
    if (newBeat >= currentChord.beats) {
      get().advanceChord();
    } else {
      set({ currentBeat: newBeat });
    }
  },

  advanceChord: () => {
    const { currentSong, currentSectionIndex, currentChordIndex } = get();
    
    if (!currentSong) return;
    
    const currentSection = currentSong.chord_progression.sections[currentSectionIndex];
    if (!currentSection) return;
    
    const nextChordIndex = currentChordIndex + 1;
    
    // If there's another chord in this section, move to it
    if (nextChordIndex < currentSection.chords.length) {
      set({
        currentChordIndex: nextChordIndex,
        currentBeat: 0,
      });
    } else {
      // Move to next section
      const nextSectionIndex = currentSectionIndex + 1;
      
      // If there's another section, move to it
      if (nextSectionIndex < currentSong.chord_progression.sections.length) {
        set({
          currentSectionIndex: nextSectionIndex,
          currentChordIndex: 0,
          currentBeat: 0,
        });
      } else {
        // Song is complete - loop back to start
        set({
          currentSectionIndex: 0,
          currentChordIndex: 0,
          currentBeat: 0,
        });
      }
    }
  },

  selectSection: (sectionIndex: number) => {
    set({
      selectedSection: sectionIndex,
      manualMode: true,
    });
  },

  selectChordForVisualizer: (chord: string | null) => {
    set({ selectedChordForVisualizer: chord });
  },

  reset: () => {
    set({
      currentSong: null,
      isPlaying: false,
      currentSectionIndex: 0,
      currentChordIndex: 0,
      currentBeat: 0,
      selectedSection: null,
      selectedChordForVisualizer: null,
      manualMode: true,
      tempo: 120,
      volume: 70,
      isMuted: false,
      selectedInstrument: 'piano',
      metronomeSound: 'metronome',
    });
  },
}));

// Selectors for commonly accessed state
export const selectCurrentChord = (state: PlayerState) => {
  if (!state.currentSong) return null;
  
  const section = state.currentSong.chord_progression.sections[state.currentSectionIndex];
  if (!section) return null;
  
  return section.chords[state.currentChordIndex];
};

export const selectCurrentSection = (state: PlayerState) => {
  if (!state.currentSong) return null;
  return state.currentSong.chord_progression.sections[state.currentSectionIndex];
};

// Note: This selector doesn't take parameters to avoid infinite loops
export const selectUpcomingChords = (state: PlayerState) => {
  if (!state.currentSong) return [];
  
  const count = 3; // Always return 3 upcoming chords
  const allChords: Array<{ chord: string; sectionName: string }> = [];
  
  // Flatten all chords from all sections
  state.currentSong.chord_progression.sections.forEach((section) => {
    section.chords.forEach((chord) => {
      allChords.push({
        chord: chord.chord,
        sectionName: section.name,
      });
    });
  });
  
  // Find current position
  let currentIndex = 0;
  for (let i = 0; i < state.currentSectionIndex; i++) {
    currentIndex += state.currentSong.chord_progression.sections[i].chords.length;
  }
  currentIndex += state.currentChordIndex;
  
  // Get next N chords (wrapping around if necessary)
  const upcoming = [];
  for (let i = 1; i <= count; i++) {
    const index = (currentIndex + i) % allChords.length;
    upcoming.push(allChords[index]);
  }
  
  return upcoming;
};
