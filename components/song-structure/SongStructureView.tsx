'use client';

// RADIO JAMM — Song Structure View
// Displays complete song structure with clickable sections

import { usePlayerStore, selectCurrentSection } from '@/store/usePlayerStore';
import { Section } from '@/lib/types';

export function SongStructureView() {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const selectedSection = usePlayerStore((state) => state.selectedSection);
  const currentSectionIndex = usePlayerStore((state) => state.currentSectionIndex);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const manualMode = usePlayerStore((state) => state.manualMode);
  const selectSection = usePlayerStore((state) => state.selectSection);

  if (!currentSong) {
    return (
      <div className="bg-off-white rounded-panel p-6 text-center">
        <p className="text-muted-foreground">No song loaded</p>
      </div>
    );
  }

  // Determine which section is active (selected or currently playing)
  const activeSection = manualMode ? selectedSection : currentSectionIndex;

  const handleSectionClick = (sectionIndex: number) => {
    selectSection(sectionIndex);
  };

  return (
    <div className="bg-off-white rounded-panel p-6 space-y-6">
      <h2 className="text-xl font-bold text-royal font-display">Song Structure</h2>
      
      <div className="space-y-4">
        {currentSong.chord_progression.sections.map((section, sectionIndex) => {
          const isActive = activeSection === sectionIndex;
          
          return (
            <button
              key={sectionIndex}
              onClick={() => handleSectionClick(sectionIndex)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                isActive
                  ? 'bg-royal/10 border-2 border-royal'
                  : 'bg-white border border-light-gray hover:border-royal/50'
              }`}
            >
              <div className="space-y-2">
                {/* Section Name */}
                <h3 className={`text-sm font-bold ${
                  isActive ? 'text-royal' : 'text-foreground'
                }`}>
                  {section.name}
                </h3>
                
                {/* Chords */}
                <div className="flex flex-wrap gap-2">
                  {section.chords.map((chordInstance, chordIndex) => (
                    <span
                      key={chordIndex}
                      className={`px-2 py-1 rounded text-sm ${
                        isActive
                          ? 'bg-royal/20 text-royal font-medium'
                          : 'bg-light-gray/50 text-muted-foreground'
                      }`}
                    >
                      {chordInstance.chord}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Instructions */}
      <div className="pt-4 border-t border-light-gray">
        <p className="text-xs text-muted-foreground text-center">
          {isPlaying
            ? 'Auto-advancing • Click Stop to manually select'
            : 'Click any section to view its chords'}
        </p>
      </div>
    </div>
  );
}
