# RADIO JAMM — Component Library

## 📖 Overview

This document catalogs all 25 components in RADIO JAMM, organized by category. Each component includes its purpose, data requirements, functionality, and user experience considerations.

**Design Philosophy:**
- Components are design-agnostic (work with any visual style from Figma)
- Focus on behavior and functionality, not specific appearance
- Mobile-first approach
- Reusable and modular

---

## 📁 Component Organization

### **Component Hierarchy**
```
App
├── Header
├── Footer
├── PageWrapper
├── HomePage
│   ├── SearchBar
│   ├── SearchResults
│   │   └── SearchResultItem (multiple)
│   └── EmptyState (if no results)
│
└── SongPage
    ├── SongHeader
    ├── SongTimeline
    ├── SectionLabel
    ├── ChordDisplay
    ├── InstrumentToggle
    ├── PianoVisualizer (or)
    ├── GuitarVisualizer
    ├── UpcomingChords
    ├── MetronomeControls
    │   ├── PlayPauseButton
    │   ├── RestartButton
    │   ├── TempoDisplay
    │   ├── TempoSlider
    │   ├── TempoPresets
    │   ├── BeatIndicator
    │   └── SoundSelector
    ├── LoadingSpinner (while loading)
    └── ErrorMessage (if error)
```

---

## 🏗️ Layout Components

### **Component #1: Header**

**What it is:**  
A bar at the top of the screen with the "RADIO JAMM" logo/name.

**What it does:**
- Stays at the top when you scroll (sticky)
- Clicking the logo takes you back to the homepage
- Shows on every page

**What data it needs:**
- None (static component)

**File Location:** `src/components/layout/Header.tsx`

---

### **Component #2: Footer**

**What it is:**  
A small bar at the bottom of every page.

**What it shows:**
- Text: "Produced by Dre Blckwell"
- The text is clickable and links to Spotify profile (URL provided later)

**What it does:**
- Minimal, doesn't take much space
- Stays at bottom (not sticky)
- Mobile-friendly

**What data it needs:**
- Spotify profile URL (hardcoded or from config)

**File Location:** `src/components/layout/Footer.tsx`

---

### **Component #3: PageWrapper**

**What it is:**  
A container that wraps the main content of every page to keep it looking good on all screen sizes.

**What it does:**
- Adds consistent padding/spacing around content
- Prevents content from stretching too wide on big screens (like desktop monitors)
- Centers everything nicely
- Used on both homepage and song page

**What data it needs:**
- Children components (content to wrap)

**Why it's useful:**
Makes sure the app looks professional on phones, tablets, and desktops without extra work on each page.

**File Location:** `src/components/layout/PageWrapper.tsx`

---

## 🔍 Search Components (Homepage)

### **Component #4: SearchBar**

**What it is:**  
The main search input field on the homepage where users type to find songs.

**What it does:**
- Large, prominent text input box
- Placeholder text: "Search for a song..." (or similar)
- As user types, triggers search and shows results below
- Has a clear/reset button (X) to erase the search
- Autofocuses when page loads (cursor ready to type immediately)

**What data it needs:**
- Current search text (what the user typed)
- Function to update the search when user types

**What it manages:**
- The text the user is currently typing
- Shows/hides the clear button (only when there's text)

**User experience:**
- Mobile-friendly (big enough to tap easily)
- Shows search results as a dropdown below it
- Works smoothly — doesn't lag as you type

**File Location:** `src/components/song-list/SearchBar.tsx`

---

### **Component #5: SearchResults**

**What it is:**  
A dropdown/list that appears below the SearchBar showing songs that match what the user typed.

**What it does:**
- Appears only when user has typed something and there are results
- Shows a list of matching songs (up to 10 results)
- Each song in the list is clickable
- Clicking a song takes you to that song's page
- Disappears if search is empty or no results found

**What data it needs:**
- List of songs that match the search
- Loading state (is it currently searching?)

**What it shows for each song:**
- Song title
- Artist name
- (These appear as SearchResultItem components inside it)

**User experience:**
- Appears smoothly below the search bar
- Shows "Searching..." while loading
- Shows "No results found" if nothing matches
- Mobile-friendly (easy to tap on results)

**File Location:** `src/components/song-list/SearchResults.tsx`

---

### **Component #6: SearchResultItem**

**What it is:**  
A single song item inside the SearchResults dropdown.

**What it does:**
- Displays one song's information in the search results list
- Clickable — takes you to that song's page when tapped/clicked
- Highlights on hover (visual feedback that it's clickable)

**What data it needs:**
- Song ID (to navigate to correct page)
- Song title
- Artist name

**What it shows:**
- Song title (larger/bold text)
- Artist name (smaller/lighter text)
- Both on separate lines or separated by a dash

**User experience:**
- Clear visual separation from other results
- Easy to tap on mobile
- Shows you found the right song before clicking

**File Location:** `src/components/song-list/SearchResultItem.tsx`

---

## 🎵 Song Info Components (Song Page)

### **Component #7: SongHeader**

**What it is:**  
The top section of the song page that displays the song's title and artist.

**What it does:**
- Shows the song title (large, prominent)
- Shows the artist name (smaller, below the title)
- Gives context for what song is being played

**What data it needs:**
- Song title (string)
- Artist name (string)

**What it shows:**
- Song title in larger text
- Artist name in smaller/lighter text
- Both centered or aligned consistently

**User experience:**
- Clear identification of what song you're playing
- Visible at top of song page
- Doesn't take up too much space (other components are more important)

**File Location:** `src/components/chord-display/SongHeader.tsx`

---

### **Component #8: SongTimeline**

**What it is:**  
A visual timeline using the Eleven Labs ScrollingWaveform component that shows the song's structure and your current position.

**What it does:**
- Uses the ScrollingWaveform component from Eleven Labs UI
- Displays song sections horizontally (Intro, Verse, Chorus, Bridge, Outro)
- Shows which section you're currently in (highlighted/emphasized)
- Smooth scrolling animation as song progresses
- Visual representation that looks like an audio waveform

**What data it needs:**
- All sections in the song (array of section names and their durations)
- Current section you're on
- Current beat/position within the song

**Technical implementation:**
- Use ScrollingWaveform as the visual base
- Overlay section labels on top of the waveform
- Adjust waveform properties:
  - `height={80}` (compact)
  - `barWidth={3}` and `barGap={2}` (clean look)
  - `speed={30}` (matches song tempo)
  - `fadeEdges={true}` (polished appearance)
  - `barColor` will be defined in STYLE_GUIDE.md

**User experience:**
- Smooth, animated timeline that feels alive
- Quick glance shows where you are in the song
- Professional audio-app aesthetic
- Touch-friendly on mobile

**Component dependencies:**
- Install Eleven Labs waveform: `npx @elevenlabs/cli@latest components add waveform`
- Import: `import { ScrollingWaveform } from "@/components/ui/waveform"`

**File Location:** `src/components/chord-display/SongTimeline.tsx`

---

### **Component #9: SectionLabel**

**What it is:**  
A text label that displays the current section of the song (Verse, Chorus, Bridge, etc.).

**What it does:**
- Shows the name of the current section you're playing
- Updates automatically when the song moves to a new section (Verse → Chorus)
- Clear, readable text

**What data it needs:**
- Current section name (string: "Verse", "Chorus", "Bridge", "Intro", "Outro", etc.)

**What it shows:**
- Just the section name in clear text
- Example: "Chorus" or "Verse 2"

**User experience:**
- At-a-glance confirmation of what part of the song you're in
- Updates smoothly when transitioning between sections
- Positioned near the SongTimeline or ChordDisplay for context
- Not too large (supporting info, not main focus)

**Design notes:**
- Simple text label
- May include subtle animation when changing (fade in/out)
- Works alongside the SongTimeline (timeline shows overall structure, this shows current section name)

**File Location:** `src/components/chord-display/SectionLabel.tsx`

---

## 🎸 Chord Display Components (Song Page)

### **Component #10: ChordDisplay**

**What it is:**  
The main focal point of the song page — shows the current chord name in large, bold text.

**What it does:**
- Displays the chord name prominently (e.g., "C", "Am7", "Fmaj7")
- Updates automatically when the metronome advances to the next chord
- Visible from across the room (very large text)
- High contrast so it's easy to read

**What data it needs:**
- Current chord name (string)

**What it shows:**
- Just the chord name in big, readable text
- Standard music notation format

**User experience:**
- Instantly see what chord to play
- No confusion about what's current vs. upcoming
- Updates smoothly when chord changes (subtle fade or slide animation)
- Center stage — most prominent text on the page

**Design notes:**
- Biggest text element on the song page
- Works alongside the visualizer (piano/guitar) — they display together
- Musician sees both the chord name AND the visual diagram simultaneously

**File Location:** `src/components/chord-display/ChordDisplay.tsx`

---

### **Component #11: InstrumentToggle**

**What it is:**  
A toggle/switch that lets users choose between seeing the piano visualizer or the guitar visualizer.

**What it does:**
- Switches between "Piano" and "Guitar" views
- Only one visualizer shows at a time
- User's choice persists while playing the song
- Simple, clear toggle control

**What data it needs:**
- Current selected instrument ("piano" or "guitar")
- Function to update the selection

**What it shows:**
- Two options: Piano | Guitar
- Active selection is highlighted/emphasized
- Inactive option is dimmed or neutral

**User experience:**
- Easy to understand (just two choices)
- One tap/click switches between instruments
- Visual feedback shows which is currently selected
- Positioned near the visualizers (logical placement)
- Mobile-friendly (big enough to tap easily)

**Design notes:**
- Could be a toggle switch, segmented control, or two buttons
- Clean, minimal design
- Changes the visualizer below it instantly (no page reload)

**File Location:** `src/components/chord-display/InstrumentToggle.tsx`

---

### **Component #12: PianoVisualizer**

**What it is:**  
A visual piano keyboard that shows which keys to press for the current chord.

**What it does:**
- Displays a piano keyboard (white and black keys)
- Highlights the keys that are part of the current chord (e.g., bright color)
- Non-active keys stay in neutral color (white/gray for white keys, black for black keys)
- Updates when the chord changes (keys light up/dim smoothly)

**What data it needs:**
- Current chord name (e.g., "C", "Am7", "Fmaj7")
- Note range available in the design (e.g., ['C4', 'C#4', 'D4', ... 'B5'])

**What it figures out internally:**
- Which piano keys belong to that chord
- Example: C major = C, E, G keys light up
- Converts chord name to specific notes to highlight
- Only highlights notes that exist in the design's range

**Design source:**
- Designed by you in Figma (any style, any octave range)
- Exported as SVG file
- SVG code pasted into this component file
- Component controls which keys are highlighted dynamically

**Flexibility:**
- Works with any number of octaves (1, 2, 3, or more)
- Works with any starting note (C3, C4, C5, etc.)
- You define the note range, component adapts
- Example config: `noteRange={['C4', 'C#4', 'D4', ... 'B5']}`

**User experience:**
- Piano player sees exactly which keys to press
- Smooth color transitions when chord changes
- Responsive (scales to fit screen size)
- Works on mobile and desktop
- Shows alongside the ChordDisplay (chord name + visual diagram together)

**Technical notes:**
- Inline SVG with dynamic fill colors based on active notes
- CSS transitions for smooth highlighting
- Only ONE SVG needed (code changes colors dynamically)

**File Location:** `src/components/chord-display/PianoVisualizer.tsx`

---

### **Component #13: GuitarVisualizer**

**What it is:**  
A visual guitar fretboard that shows where to place your fingers for the current chord.

**What it does:**
- Displays a guitar fretboard (6 strings, configurable fret range)
- Shows finger positions with colored dots/circles
- Indicates open strings (O) and muted strings (X)
- Updates when the chord changes (finger positions update smoothly)

**What data it needs:**
- Current chord name (e.g., "C", "Am", "G7")
- Fret range shown in design (e.g., `{ start: 0, end: 5 }`)
- Number of strings (default: 6, configurable for bass or 7-string)

**What it figures out internally:**
- Which frets to press on which strings
- Example: C chord = 3rd fret on A string, 2nd fret on D string, etc.
- Converts chord name to specific fret positions
- Adapts fingering to fit within the fret range shown

**Design source:**
- Designed by you in Figma (empty fretboard)
- Exported as SVG file
- SVG code pasted into this component file
- Component adds the finger position dots dynamically based on the chord

**Flexibility:**
- Works with any fret range (3 frets, 5 frets, 12 frets, etc.)
- Works with different starting positions (frets 0-5, or 5-10, etc.)
- You define the range, component adapts fingerings
- Example config: `fretRange={{ start: 0, end: 5 }}`
- Supports 4-string bass, 6-string standard, 7-string extended

**User experience:**
- Guitar player sees exactly where to place fingers
- Clear visual of which strings to play/mute
- Smooth transitions when chord changes
- Responsive (scales to fit screen size)
- Works on mobile and desktop
- Shows alongside the ChordDisplay (chord name + visual diagram together)

**Technical notes:**
- Inline SVG (empty fretboard from Figma)
- Finger position dots rendered programmatically as `<circle>` elements
- Dot positions calculated based on string/fret coordinates
- Only ONE SVG needed (code adds dots dynamically)

**File Location:** `src/components/chord-display/GuitarVisualizer.tsx`

---

### **Component #14: UpcomingChords**

**What it is:**  
A preview display showing the next few chords that are coming up in the song.

**What it does:**
- Shows the next 2-4 chords in sequence
- Helps musicians prepare for upcoming chord changes
- Updates as the song progresses (scrolls/shifts forward)
- Less prominent than the current chord (dimmed or smaller)

**What data it needs:**
- Array of upcoming chord names (e.g., ["Am", "F", "G", "C"])
- How many chords ahead to show (2-4 chords)

**What it shows:**
- List of chord names in order
- Each chord clearly separated
- Visual indication of order (left to right, or top to bottom)
- Current upcoming chord slightly more emphasized than further ones

**User experience:**
- Quick glance shows what's next
- Reduces surprises during chord changes
- Positioned near the current ChordDisplay but clearly secondary
- Doesn't distract from the main chord display
- Mobile-friendly layout

**Design notes:**
- Smaller text than ChordDisplay
- Could be horizontal (← chord1 | chord2 | chord3 →)
- Or vertical stack
- Fades/dims for chords further in the future
- Smooth scroll/transition as chords advance

**File Location:** `src/components/chord-display/UpcomingChords.tsx`

---

## 🥁 Metronome Components (Song Page)

### **Component #15: MetronomeControls**

**What it is:**  
A container component that wraps all the metronome/playback controls together in one organized section.

**What it does:**
- Groups all playback controls in one place
- Provides consistent layout and spacing for child components
- Acts as the control panel for the jam session

**What it contains (children components):**
- PlayPauseButton
- RestartButton
- TempoDisplay
- TempoSlider
- TempoPresets
- BeatIndicator
- SoundSelector

**What data it needs:**
- None directly (it's just a wrapper/container)
- Passes data down to its children

**Layout/organization:**
- All controls visually grouped together
- Logical arrangement (play controls together, tempo controls together)
- Responsive layout (stacks nicely on mobile)
- Easy to find and use

**Design notes:**
- Could be a horizontal bar at bottom of screen (sticky)
- Or a panel/card on the page
- Clear visual boundary separating it from chord display area
- All controls accessible without scrolling

**File Location:** `src/components/metronome/MetronomeControls.tsx`

---

### **Component #16: PlayPauseButton**

**What it is:**  
Large button that toggles between play and pause.

**What it does:**
- Shows "Play" icon when stopped, "Pause" icon when playing
- Starts/stops the metronome
- Most important control (biggest/most prominent)

**What data it needs:**
- Current playing state (true/false)
- Function to toggle play/pause

**User experience:**
- Immediately recognizable (standard play/pause icons)
- Big enough to tap easily on mobile
- Clear visual feedback when state changes

**File Location:** `src/components/metronome/PlayPauseButton.tsx`

---

### **Component #17: RestartButton**

**What it is:**  
Button that resets the song to the beginning.

**What it does:**
- Stops playback if currently playing
- Resets to first chord, first section
- Allows practicing from the start

**What data it needs:**
- Function to restart the song

**User experience:**
- Standard restart/replay icon (circular arrow or similar)
- One tap returns to beginning
- Works whether playing or paused

**File Location:** `src/components/metronome/RestartButton.tsx`

---

### **Component #18: TempoDisplay**

**What it is:**  
Shows the current BPM numerically.

**What it does:**
- Displays current tempo (e.g., "120 BPM")
- Updates when tempo slider changes
- Clear, readable number

**What data it needs:**
- Current tempo (number)

**User experience:**
- Always visible alongside tempo controls
- Updates in real-time as slider moves
- Clear label (shows "BPM" or "Beats per minute")

**File Location:** `src/components/metronome/TempoDisplay.tsx`

---

### **Component #19: TempoSlider**

**What it is:**  
Slider control to adjust playback speed.

**What it does:**
- Drag slider to change BPM (40-240 range)
- Changes apply in real-time (no restart needed)
- Smooth adjustment

**What data it needs:**
- Current tempo value
- Function to update tempo
- Min/max range (40-240 BPM)

**User experience:**
- Touch-friendly on mobile
- Immediate feedback (tempo changes as you drag)
- Visual markers at common tempos (optional)
- Works smoothly without lag

**File Location:** `src/components/metronome/TempoSlider.tsx`

---

### **Component #20: TempoPresets**

**What it is:**  
Quick buttons for common tempo adjustments.

**What it does:**
- Buttons like: Slow (75%), Normal (100%), Fast (125%)
- One-click tempo changes
- Shortcuts for common practice speeds

**What data it needs:**
- Original song tempo
- Function to set tempo

**User experience:**
- Quick access to common speeds
- Labeled clearly ("Slow", "Normal", "Fast" or percentages)
- Active preset highlighted
- Faster than using slider for big changes

**File Location:** `src/components/metronome/TempoPresets.tsx`

---

### **Component #21: BeatIndicator**

**What it is:**  
Visual element that pulses on each beat.

**What it does:**
- Flashes/pulses in sync with metronome click
- Visual timing reference (for loud environments)
- Emphasizes beat 1 in each measure (stronger pulse)

**What data it needs:**
- Current beat number
- Whether it's a strong beat (beat 1)

**User experience:**
- Smooth, non-jarring animation
- Clear pulse synchronized with audio
- Different visual for strong beats vs. weak beats
- Doesn't distract from chord display

**File Location:** `src/components/metronome/BeatIndicator.tsx`

---

### **Component #22: SoundSelector**

**What it is:**  
Dropdown to change metronome sound.

**What it does:**
- Options: Metronome, Shaker, Drum
- Changes the click sound
- Instant switch (no reload)

**What data it needs:**
- Current selected sound
- Function to change sound
- Available sound options

**User experience:**
- Clear labels for each sound option
- Preview sound on selection (optional)
- Persists choice during session
- Works during playback (seamless transition)

**File Location:** `src/components/metronome/SoundSelector.tsx`

---

## ⚙️ Utility Components

### **Component #23: LoadingSpinner**

**What it is:**  
A loading animation that shows when data is being fetched from the database.

**What it does:**
- Displays while searching for songs
- Shows when loading a song's chord progression
- Indicates the app is working (not frozen)
- Disappears once data loads

**What data it needs:**
- None (just shows/hides based on loading state)

**What it shows:**
- Spinning circle/animation
- Optional text: "Loading..." or "Searching..."
- Centered on screen or in the relevant area

**User experience:**
- Appears immediately when loading starts
- Smooth, non-jarring animation
- Clear indication something is happening
- Doesn't block the whole screen unnecessarily

**Design notes:**
- Simple, clean animation
- Matches app's style
- Could use Shadcn/ui loading component
- Mobile-friendly size

**File Location:** `src/components/ui/LoadingSpinner.tsx`

---

### **Component #24: ErrorMessage**

**What it is:**  
A friendly error display that shows when something goes wrong.

**What it does:**
- Shows user-friendly error messages (not technical jargon)
- Appears when database can't be reached
- Shows when a song fails to load
- Displays when search fails

**What data it needs:**
- Error message text (string)
- Optional: Error type (connection, not found, etc.)

**What it shows:**
- Clear, helpful message
- Example: "Could not load song. Please check your connection."
- Example: "Song not found. Try a different search."
- Dismissable (X button or auto-hide)

**User experience:**
- Never shows technical error codes
- Suggests what to do next ("Try again", "Check connection")
- Doesn't crash the app
- Can be closed/dismissed
- Non-alarming tone (friendly, not scary)

**Design notes:**
- Red or warning color (but not aggressive)
- Clear text, easy to read
- Positioned prominently but not blocking everything
- Could use Shadcn/ui Alert component

**File Location:** `src/components/ui/ErrorMessage.tsx`

---

### **Component #25: EmptyState**

**What it is:**  
A message displayed when search returns no results.

**What it does:**
- Shows when user searches but no songs match
- Friendly message like "No songs found. Try a different search."
- Prevents confusing blank screen

**What data it needs:**
- Optional: The search term that returned nothing

**What it shows:**
- Clear message
- Maybe a suggestion to try different keywords
- Not an error (just no results)

**User experience:**
- Centered in search results area
- Neutral tone (helpful, not negative)
- Simple text, maybe an icon

**Design notes:**
- Not alarming (different from ErrorMessage)
- Encouraging tone
- Suggests action (try different search)

**File Location:** `src/components/ui/EmptyState.tsx`

---

## 🎨 Shadcn/ui Components (Reusable Primitives)

These are pre-built components from Shadcn/ui that we'll use throughout the app:

### **Button**
Standard button component with variants (primary, secondary, ghost, etc.)  
**Install:** `npx shadcn-ui@latest add button`

### **Slider**
Range slider for tempo control  
**Install:** `npx shadcn-ui@latest add slider`

### **Select**
Dropdown selector for sound/instrument selection  
**Install:** `npx shadcn-ui@latest add select`

### **Input**
Text input field for search  
**Install:** `npx shadcn-ui@latest add input`

### **Card**
Container card for grouping content  
**Install:** `npx shadcn-ui@latest add card`

---

## 📊 Component Summary

**Total Components: 25**

| Category | Count | Components |
|----------|-------|------------|
| Layout | 3 | Header, Footer, PageWrapper |
| Search | 3 | SearchBar, SearchResults, SearchResultItem |
| Song Info | 3 | SongHeader, SongTimeline, SectionLabel |
| Chord Display | 5 | ChordDisplay, InstrumentToggle, PianoVisualizer, GuitarVisualizer, UpcomingChords |
| Metronome | 8 | MetronomeControls, PlayPauseButton, RestartButton, TempoDisplay, TempoSlider, TempoPresets, BeatIndicator, SoundSelector |
| Utility | 3 | LoadingSpinner, ErrorMessage, EmptyState |
| Shadcn/ui | 5 | Button, Slider, Select, Input, Card |

---

## ✅ Implementation Checklist

### **Phase 1: Foundation**
- [ ] Install Shadcn/ui components
- [ ] Install Eleven Labs waveform component
- [ ] Set up component folder structure
- [ ] Create layout components (Header, Footer, PageWrapper)

### **Phase 2: Search Functionality**
- [ ] Build SearchBar with input handling
- [ ] Build SearchResults dropdown
- [ ] Build SearchResultItem
- [ ] Implement EmptyState

### **Phase 3: Song Display**
- [ ] Build SongHeader
- [ ] Integrate SongTimeline (Eleven Labs waveform)
- [ ] Build SectionLabel
- [ ] Implement LoadingSpinner and ErrorMessage

### **Phase 4: Chord Visualization**
- [ ] Design piano in Figma, export SVG
- [ ] Build PianoVisualizer with dynamic highlighting
- [ ] Design guitar in Figma, export SVG
- [ ] Build GuitarVisualizer with dynamic finger positions
- [ ] Build ChordDisplay
- [ ] Build InstrumentToggle
- [ ] Build UpcomingChords

### **Phase 5: Metronome Controls**
- [ ] Build MetronomeControls container
- [ ] Build PlayPauseButton
- [ ] Build RestartButton
- [ ] Build TempoDisplay
- [ ] Build TempoSlider
- [ ] Build TempoPresets
- [ ] Build BeatIndicator
- [ ] Build SoundSelector

### **Phase 6: Integration & Testing**
- [ ] Connect all components to state management (Zustand)
- [ ] Test on mobile devices
- [ ] Test all interactions
- [ ] Polish animations and transitions

---

## 🎯 Design Flexibility Notes

**Piano & Guitar Visualizers:**
- Accept any design from Figma
- Work with any octave range (piano)
- Work with any fret range (guitar)
- Components adapt to YOUR design choices
- Configure via props: `noteRange`, `fretRange`, `stringCount`

**All Components:**
- Colors defined in STYLE_GUIDE.md (not hardcoded)
- Responsive by default (mobile-first)
- Accessible (keyboard navigation, screen readers)
- Smooth animations using CSS transitions

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Status:** Component Library Complete — Ready for Development