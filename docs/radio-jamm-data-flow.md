# RADIO JAMM — Data Flow Documentation

## 📖 Overview

This document maps how data moves through RADIO JAMM, from user actions to database queries to UI updates. Understanding these flows ensures correct implementation and easier debugging.

**Key Concepts:**
- **Data Sources:** Where information originates (database, user input, timers)
- **State Management:** Where data lives during app runtime (Zustand store)
- **Data Transformations:** How raw data becomes usable (parsing, calculations)
- **Component Communication:** How UI elements share information

---

## 🗺️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│              (Types, Clicks, Interacts)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   REACT COMPONENTS                           │
│   (SearchBar, ChordDisplay, Metronome, Visualizers)         │
└────────┬──────────────────────────────────────┬─────────────┘
         │                                      │
         │ Read State                           │ Update State
         ▼                                      ▼
┌────────────────────────────────┐    ┌────────────────────────┐
│      ZUSTAND STORE             │    │    USER ACTIONS        │
│   (Global App State)           │◄───│  (Play, Search, etc.)  │
│                                │    └────────────────────────┘
│ - currentSong                  │
│ - isPlaying                    │
│ - tempo                        │
│ - currentChordIndex            │
│ - selectedInstrument           │
└────────┬───────────────────────┘
         │
         │ Fetch Data
         ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE                         │
│                  (PostgreSQL + REST API)                     │
│                                                              │
│  songs table: {id, title, artist, chord_progression, ...}   │
└─────────────────────────────────────────────────────────────┘
         ▲
         │ SQL Queries
         │
┌────────┴───────────────────────┐
│     SUPABASE CLIENT            │
│   (@supabase/supabase-js)      │
└────────────────────────────────┘
```

---

## 🔄 Core Data Flows

### **Flow 1: Searching for a Song**

**Scenario:** User types "Stand By Me" in the search bar

```
┌──────────────┐
│   USER       │ Types: "Stand By Me"
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│   SearchBar Component    │
│                          │
│ - Captures input text    │
│ - Debounces (300ms)      │
│ - Triggers search        │
└──────┬───────────────────┘
       │
       │ searchSongs("Stand By Me")
       ▼
┌────────────────────────────────────────┐
│   useSongData Hook (or direct call)   │
│                                        │
│ const { data } = await supabase       │
│   .from('songs')                      │
│   .select('id, title, artist')        │
│   .ilike('title', '%Stand By Me%')    │
└──────┬─────────────────────────────────┘
       │
       │ HTTP Request
       ▼
┌────────────────────────────┐
│   SUPABASE DATABASE        │
│                            │
│ SELECT id, title, artist   │
│ FROM songs                 │
│ WHERE title ILIKE          │
│   '%Stand By Me%'          │
└──────┬─────────────────────┘
       │
       │ Returns JSON
       ▼
┌──────────────────────────────────────────┐
│   Response:                              │
│   [                                      │
│     {                                    │
│       id: "550e8400...",                 │
│       title: "Stand By Me",              │
│       artist: "Ben E. King"              │
│     }                                    │
│   ]                                      │
└──────┬───────────────────────────────────┘
       │
       │ State Update
       ▼
┌──────────────────────────┐
│   SearchResults          │
│   Component              │
│                          │
│ - Maps over results      │
│ - Renders list items     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   USER SEES:             │
│   ┌────────────────────┐ │
│   │ Stand By Me        │ │
│   │ Ben E. King        │ │
│   └────────────────────┘ │
└──────────────────────────┘
```

**Key Points:**
- Search is debounced (waits 300ms after typing stops)
- Only fetches needed columns (id, title, artist)
- Case-insensitive search (ILIKE)
- Results displayed immediately

---

### **Flow 2: Loading a Song**

**Scenario:** User clicks "Stand By Me" from search results

```
┌──────────────┐
│   USER       │ Clicks: "Stand By Me"
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│   SearchResultItem       │ onClick → navigate('/songs/550e8400...')
└──────┬───────────────────┘
       │
       │ Next.js Navigation
       ▼
┌────────────────────────────────────┐
│   SongPage (/songs/[id]/page.tsx) │
│                                    │
│ - Extracts songId from URL         │
│ - Fetches full song data           │
└──────┬─────────────────────────────┘
       │
       │ getSongById(songId)
       ▼
┌────────────────────────────────────────┐
│   const { data } = await supabase     │
│     .from('songs')                    │
│     .select('*')                      │
│     .eq('id', songId)                 │
│     .single()                         │
└──────┬─────────────────────────────────┘
       │
       │ HTTP Request
       ▼
┌────────────────────────────┐
│   SUPABASE DATABASE        │
│                            │
│ SELECT * FROM songs        │
│ WHERE id = '550e8400...'   │
└──────┬─────────────────────┘
       │
       │ Returns Full Song Data
       ▼
┌────────────────────────────────────────────────┐
│   Response:                                    │
│   {                                            │
│     id: "550e8400...",                         │
│     title: "Stand By Me",                      │
│     artist: "Ben E. King",                     │
│     original_key: "A",                         │
│     tempo_bpm: 120,                            │
│     chord_progression: {                       │
│       sections: [                              │
│         {                                      │
│           name: "Verse",                       │
│           order: 1,                            │
│           chords: [                            │
│             {chord: "A", beats: 4},            │
│             {chord: "F#m", beats: 4},          │
│             ...                                │
│           ]                                    │
│         }                                      │
│       ]                                        │
│     }                                          │
│   }                                            │
└──────┬─────────────────────────────────────────┘
       │
       │ Initialize Zustand Store
       ▼
┌────────────────────────────────────────┐
│   usePlayerStore.setState({           │
│     currentSong: songData,            │
│     currentSectionIndex: 0,           │
│     currentChordIndex: 0,             │
│     tempo: songData.tempo_bpm,        │
│     isPlaying: false                  │
│   })                                  │
└──────┬─────────────────────────────────┘
       │
       │ Components Subscribe to Store
       ▼
┌────────────────────────────────────────────────┐
│   MULTIPLE COMPONENTS READ FROM STORE:         │
│                                                │
│   ┌──────────────────┐                        │
│   │ SongHeader       │ ← reads: title, artist │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ ChordDisplay     │ ← reads: currentChord  │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ PianoVisualizer  │ ← reads: currentChord  │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ TempoDisplay     │ ← reads: tempo         │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ SongTimeline     │ ← reads: sections      │
│   └──────────────────┘                        │
└────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│   USER SEES:             │
│   - Song title/artist    │
│   - First chord "A"      │
│   - Piano with A, C#, E  │
│   - Timeline sections    │
│   - Tempo "120 BPM"      │
│   - Play button ready    │
└──────────────────────────┘
```

**Key Points:**
- Single database query fetches everything
- Data stored in Zustand (global state)
- All components read from same source
- No prop drilling needed

---

### **Flow 3: Playing the Song (Metronome)**

**Scenario:** User clicks Play button

```
┌──────────────┐
│   USER       │ Clicks: Play ▶
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│   PlayPauseButton        │ onClick → play()
└──────┬───────────────────┘
       │
       │ Call store action
       ▼
┌────────────────────────────────────┐
│   usePlayerStore.play()           │
│                                    │
│   setState({ isPlaying: true })   │
└──────┬─────────────────────────────┘
       │
       │ Triggers useEffect in useMetronome hook
       ▼
┌────────────────────────────────────────────────┐
│   useMetronome Hook                            │
│                                                │
│   useEffect(() => {                            │
│     if (isPlaying) {                           │
│       startMetronome()                         │
│     }                                          │
│   }, [isPlaying])                              │
└──────┬─────────────────────────────────────────┘
       │
       │ Initialize Tone.js
       ▼
┌────────────────────────────────────────┐
│   Tone.Transport.bpm.value = tempo    │
│   Tone.Transport.start()              │
│                                        │
│   Schedule repeating callback:        │
│   every quarter note (4n)             │
└──────┬─────────────────────────────────┘
       │
       │ Loop: Every Beat
       │
       ├─→ Play audio click (metronome sound)
       │
       └─→ Update state
           ▼
┌────────────────────────────────────────┐
│   Calculate current chord:            │
│                                        │
│   beatsPassed += 1                    │
│   if (beatsPassed >= currentChord     │
│       .beats) {                        │
│     advanceToNextChord()              │
│   }                                   │
└──────┬─────────────────────────────────┘
       │
       │ Update Zustand
       ▼
┌────────────────────────────────────────┐
│   usePlayerStore.setState({           │
│     currentChordIndex: index + 1,     │
│     currentBeat: beatCount            │
│   })                                  │
└──────┬─────────────────────────────────┘
       │
       │ All subscribed components re-render
       ▼
┌────────────────────────────────────────────────┐
│   COMPONENTS UPDATE:                           │
│                                                │
│   ┌──────────────────┐                        │
│   │ ChordDisplay     │ Shows: "F#m"           │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ PianoVisualizer  │ Highlights: F#, A, C#  │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ UpcomingChords   │ Shows: "D", "E", "A"   │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ SectionLabel     │ Shows: "Verse"         │
│   └──────────────────┘                        │
│                                                │
│   ┌──────────────────┐                        │
│   │ BeatIndicator    │ Pulses on beat         │
│   └──────────────────┘                        │
└────────────────────────────────────────────────┘
       │
       │ This repeats every beat...
       ▼
┌──────────────────────────┐
│   USER SEES:             │
│   - Chords changing      │
│   - Keys lighting up     │
│   - Timeline progressing │
│   - Beat indicator pulse │
│   - All in sync with     │
│     metronome clicks     │
└──────────────────────────┘
```

**Key Points:**
- One global play state triggers everything
- Tone.js handles precise timing
- State updates trigger automatic re-renders
- All components stay in sync

---

### **Flow 4: Adjusting Tempo**

**Scenario:** User drags tempo slider from 120 to 140 BPM

```
┌──────────────┐
│   USER       │ Drags slider to 140
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│   TempoSlider            │ onChange(140)
└──────┬───────────────────┘
       │
       │ Call store action
       ▼
┌────────────────────────────────────┐
│   usePlayerStore.setTempo(140)    │
│                                    │
│   setState({ tempo: 140 })        │
└──────┬─────────────────────────────┘
       │
       │ Multiple components react to tempo change
       │
       ├─→ TempoDisplay
       │   ▼
       │   ┌──────────────────────┐
       │   │ Shows: "140 BPM"     │
       │   └──────────────────────┘
       │
       ├─→ useMetronome Hook
       │   ▼
       │   ┌──────────────────────────────────┐
       │   │ useEffect(() => {                │
       │   │   Tone.Transport.bpm.value = 140 │
       │   │ }, [tempo])                      │
       │   └──────────────────────────────────┘
       │
       └─→ SongTimeline (optional speed adjustment)
           ▼
           ┌──────────────────────────────────┐
           │ Waveform speed adjusted          │
           └──────────────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│   RESULT:                │
│   - Metronome speeds up  │
│   - Display shows 140    │
│   - Chords advance faster│
│   - All happen instantly │
└──────────────────────────┘
```

**Key Points:**
- Single source of truth (Zustand)
- Changes propagate automatically
- No manual component updates needed
- Real-time without page refresh

---

### **Flow 5: Switching Instruments**

**Scenario:** User toggles from Piano to Guitar

```
┌──────────────┐
│   USER       │ Clicks: Guitar
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│   InstrumentToggle                   │ onClick → setInstrument('guitar')
└──────┬───────────────────────────────┘
       │
       │ Update store
       ▼
┌────────────────────────────────────────────┐
│   usePlayerStore.setInstrument('guitar')  │
│                                            │
│   setState({ selectedInstrument: 'guitar' })│
└──────┬─────────────────────────────────────┘
       │
       │ Conditional rendering
       ▼
┌────────────────────────────────────────┐
│   SongPage Component                   │
│                                        │
│   const { selectedInstrument } =       │
│     usePlayerStore()                   │
│                                        │
│   {selectedInstrument === 'piano' ?    │
│     <PianoVisualizer /> :              │
│     <GuitarVisualizer />}              │
└──────┬─────────────────────────────────┘
       │
       │ Component swap
       ▼
┌──────────────────────────┐
│   PianoVisualizer        │ (unmounts)
└──────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│   GuitarVisualizer       │ (mounts)
│                          │
│ - Same currentChord data │
│ - Different visualization│
└──────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│   USER SEES:             │
│   - Guitar fretboard     │
│   - Finger positions     │
│   - Same chord ("A")     │
└──────────────────────────┘
```

**Key Points:**
- Instant swap, no reload
- Both visualizers use same chord data
- Preference persists during session
- Smooth transition

---

## 🧠 Zustand Store Structure

**File:** `src/store/usePlayerStore.ts`

```typescript
interface PlayerState {
  // Song Data
  currentSong: Song | null;
  
  // Playback State
  isPlaying: boolean;
  currentSectionIndex: number;
  currentChordIndex: number;
  currentBeat: number;
  
  // User Settings
  tempo: number;
  selectedInstrument: 'piano' | 'guitar';
  metronomeSound: 'metronome' | 'shaker' | 'drum';
  
  // Actions
  setSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  restart: () => void;
  setTempo: (bpm: number) => void;
  setInstrument: (instrument: 'piano' | 'guitar') => void;
  setMetronomeSound: (sound: string) => void;
  advanceChord: () => void;
  updateBeat: (beat: number) => void;
}
```

**Data Flow Pattern:**
```
User Action → Store Update → Components Re-render
```

---

## 🔄 Data Transformation Examples

### **Chord Name → Piano Keys**

```
Input: "Cmaj7"
  ↓
chord-parser.ts
  ↓
parseChord('Cmaj7')
  ↓
Returns: ['C', 'E', 'G', 'B']
  ↓
PianoVisualizer receives array
  ↓
Maps notes to SVG keys
  ↓
Highlights 4 keys: C, E, G, B
```

**Code:**
```typescript
// lib/chord-parser.ts
const chordNotes: Record<string, string[]> = {
  'C': ['C', 'E', 'G'],
  'Cmaj7': ['C', 'E', 'G', 'B'],
  'Am': ['A', 'C', 'E'],
  // ... more chords
};

export function parseChord(chordName: string): string[] {
  return chordNotes[chordName] || [];
}
```

---

### **Chord Name → Guitar Frets**

```
Input: "C"
  ↓
chord-parser.ts
  ↓
getGuitarFingering('C')
  ↓
Returns: [
  { string: 5, fret: 3 },  // C note
  { string: 4, fret: 2 },  // E note
  { string: 3, fret: 0 },  // G note (open)
  { string: 2, fret: 1 },  // C note
  { string: 1, fret: 0 },  // E note (open)
]
  ↓
GuitarVisualizer receives positions
  ↓
Draws dots at specified string/fret coordinates
```

---

### **Beats → Chord Index**

```
Song has chord progression:
[
  { chord: "A", beats: 4 },
  { chord: "F#m", beats: 4 },
  { chord: "D", beats: 2 },
  { chord: "E", beats: 2 }
]

Metronome tracking:
Beat 1-4: currentChordIndex = 0 (play "A")
Beat 5-8: currentChordIndex = 1 (play "F#m")
Beat 9-10: currentChordIndex = 2 (play "D")
Beat 11-12: currentChordIndex = 3 (play "E")
Beat 13: loop back to 0
```

**Code:**
```typescript
let totalBeats = 0;
const currentChord = chords[currentChordIndex];

function onBeat() {
  totalBeats++;
  
  if (totalBeats >= currentChord.beats) {
    totalBeats = 0;
    advanceToNextChord();
  }
}
```

---

## 📊 Component Data Dependencies

### **Read-Only Components** (Display data, don't modify)

| Component | Reads From Store | Purpose |
|-----------|------------------|---------|
| ChordDisplay | `currentChord` | Show chord name |
| PianoVisualizer | `currentChord` | Highlight keys |
| GuitarVisualizer | `currentChord` | Show fret positions |
| TempoDisplay | `tempo` | Show BPM number |
| SectionLabel | `currentSection` | Show section name |
| SongHeader | `currentSong.title, artist` | Show metadata |
| BeatIndicator | `currentBeat` | Pulse animation |

---

### **Interactive Components** (Read AND modify)

| Component | Reads | Writes | Actions |
|-----------|-------|--------|---------|
| PlayPauseButton | `isPlaying` | `setPlaying()` | Toggle playback |
| RestartButton | - | `restart()` | Reset song |
| TempoSlider | `tempo` | `setTempo()` | Adjust BPM |
| InstrumentToggle | `selectedInstrument` | `setInstrument()` | Switch view |
| SoundSelector | `metronomeSound` | `setMetronomeSound()` | Change audio |

---

## 🔗 External Dependencies Flow

### **Tone.js (Audio Engine)**

```
Zustand Store
  ↓
tempo value (120)
  ↓
useMetronome Hook
  ↓
Tone.Transport.bpm.value = 120
  ↓
Tone.Transport.start()
  ↓
Schedules audio playback
  ↓
Plays metronome click every beat
  ↓
Triggers callback → advance chord
  ↓
Updates Zustand → components re-render
```

---

### **Supabase Client**

```
Component needs data
  ↓
Calls: await supabase.from('songs').select(...)
  ↓
HTTP Request to Supabase API
  ↓
PostgreSQL query executed
  ↓
JSON response returned
  ↓
Data stored in local state or Zustand
  ↓
Components render with data
```

---

### **Eleven Labs Waveform**

```
Song loaded into Zustand
  ↓
SongTimeline component mounts
  ↓
Reads: sections array
  ↓
<ScrollingWaveform
  barColor="#858AE3"
  speed={30}
/>
  ↓
Waveform animates continuously
  ↓
Overlay shows current section highlight
  ↓
Updates when currentSectionIndex changes
```

---

## 🚨 Error Handling Flow

### **Database Query Fails**

```
User searches for song
  ↓
Supabase query executes
  ↓
ERROR: Network failure
  ↓
{ data: null, error: { message: "Failed to fetch" } }
  ↓
Component catches error
  ↓
Shows ErrorMessage component
  ↓
"Could not load songs. Please check your connection."
  ↓
User sees friendly message (not crash)
```

---

### **Song Not Found**

```
User navigates to /songs/invalid-id
  ↓
Query for song with invalid ID
  ↓
Returns: { data: null, error: {...} }
  ↓
Page shows ErrorMessage
  ↓
"Song not found. Return to search."
  ↓
Button to go back to homepage
```

---

## ⚡ Performance Optimizations

### **Debounced Search**

```
User types: "S" → "St" → "Sta" → "Stan" → "Stand"
  ↓
Without debounce: 5 database queries
  ↓
With debounce (300ms): Wait until typing stops
  ↓
Only 1 query: "Stand"
  ↓
Saves bandwidth, reduces server load
```

**Code:**
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    searchSongs(query);
  }, 300);
  
  return () => clearTimeout(timer);
}, [query]);
```

---

### **Memoized Chord Parsing**

```
Same chord plays 16 times in a row ("C", "C", "C"...)
  ↓
Without memo: Parse "C" → ['C','E','G'] 16 times
  ↓
With memo: Parse once, reuse result
  ↓
Faster rendering, less CPU usage
```

**Code:**
```typescript
const activeNotes = useMemo(() => 
  parseChord(currentChord),
  [currentChord]
);
```

---

## 🎯 Critical Data Flows Summary

### **1. Search → Display**
User types → Supabase query → Results render

### **2. Load Song → Initialize**
Click song → Fetch full data → Populate Zustand → Components render

### **3. Play → Loop**
Click play → Tone.js starts → Beat callback → Advance chord → Update UI → Repeat

### **4. Adjust Settings → Update**
Change tempo/instrument → Update store → All dependent components re-render

### **5. Error → Recover**
Operation fails → Catch error → Show friendly message → User can retry

---

## 📋 Data Flow Checklist

Before launching, verify:

- [ ] Search returns results within 1 second
- [ ] Song loads all data in single query
- [ ] Chord changes sync perfectly with metronome
- [ ] Tempo slider updates everything in real-time
- [ ] Instrument toggle swaps visualizers instantly
- [ ] No state gets "stuck" or out of sync
- [ ] Errors show friendly messages, don't crash
- [ ] Zustand store is single source of truth
- [ ] Components don't duplicate state
- [ ] No unnecessary re-renders (use React DevTools)

---

## 🔍 Debugging Data Flow Issues

### **"Chords not changing when metronome plays"**
Check: Is Zustand updating `currentChordIndex`?  
Check: Is component subscribed to that value?

### **"Tempo display doesn't match slider"**
Check: Are both reading from same store value?  
Check: Is store update function being called?

### **"Search results don't appear"**
Check: Is Supabase query returning data?  
Check: Is component rendering the results array?

### **"Components out of sync"**
Check: Are all using Zustand, or some using local state?  
Check: Is there duplicate state management?

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Status:** Data Flow Complete — All Flows Mapped