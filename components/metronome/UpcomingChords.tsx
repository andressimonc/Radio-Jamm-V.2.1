'use client';

// RADIO JAMM — Upcoming Chords Preview
// Shows the next few chords coming up

import { usePlayerStore, selectCurrentChord } from '@/store/usePlayerStore';
import { useMemo } from 'react';

export function UpcomingChords() {
  const currentChord = usePlayerStore(selectCurrentChord);
  const currentSong = usePlayerStore((state) => state.currentSong);
  const currentSectionIndex = usePlayerStore((state) => state.currentSectionIndex);
  const currentChordIndex = usePlayerStore((state) => state.currentChordIndex);
  
  // Memoize the upcoming chords calculation
  const upcomingChords = useMemo(() => {
    if (!currentSong) return [];
    
    const count = 3;
    const allChords: Array<{ chord: string; sectionName: string }> = [];
    
    // Flatten all chords from all sections
    currentSong.chord_progression.sections.forEach((section) => {
      section.chords.forEach((chord) => {
        allChords.push({
          chord: chord.chord,
          sectionName: section.name,
        });
      });
    });
    
    // Guard against empty progression
    if (allChords.length === 0) return [];
    
    // Find current position
    let currentIndex = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      currentIndex += currentSong.chord_progression.sections[i].chords.length;
    }
    currentIndex += currentChordIndex;
    
    // Get next N chords (wrapping around if necessary)
    const upcoming = [];
    for (let i = 1; i <= count; i++) {
      const index = (currentIndex + i) % allChords.length;
      upcoming.push(allChords[index]);
    }
    
    return upcoming;
  }, [currentSong, currentSectionIndex, currentChordIndex]);

  if (!currentChord || upcomingChords.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground text-center">
        Coming Up
      </p>
      <div className="flex items-center justify-center gap-2">
        {upcomingChords.map((upcoming, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 px-3 py-2 bg-white rounded-lg border border-light-gray"
          >
            <span className="text-lg font-bold text-plum font-display">
              {upcoming.chord}
            </span>
            <span className="text-xs text-muted-foreground">
              {upcoming.sectionName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
