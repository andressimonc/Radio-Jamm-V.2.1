# RADIO JAMM — User Stories

## 📖 About User Stories

User stories describe features from the user's perspective using the format:
**"As a [type of user], I want [feature] so that [benefit]."**

This document organizes all MVP features into user-focused narratives with acceptance criteria.

---

## 🎯 User Personas

### **Primary Persona: Jamie the Casual Jammer**
- Age: 25-35
- Skill: Intermediate guitar player
- Context: Jams with friends on weekends
- Pain point: Forgets chord changes mid-song, breaks flow
- Goal: Quick reference that keeps everyone in sync

### **Secondary Persona: Alex the Beginner**
- Age: 18-25
- Skill: Learning first instrument (guitar or piano)
- Context: Practicing at home, occasionally with friends
- Pain point: Overwhelmed by complex music apps
- Goal: Simple way to see and practice chord progressions

### **Tertiary Persona: Taylor the Band Member**
- Age: 30-45
- Skill: Advanced musician
- Context: Band practice, learning covers
- Pain point: Needs quick setup, no fiddling with settings
- Goal: Fast access to accurate chord progressions

---

## 📚 Epic 1: Song Discovery

### **User Story 1.1: Search for Songs**
**As a musician,**  
I want to search for songs by name  
So that I can quickly find the song I want to play.

**Acceptance Criteria:**
- [ ] Homepage shows a prominent search bar/menu
- [ ] No full song list displayed initially (search-first approach)
- [ ] Search bar is the primary entry point
- [ ] Minimal, focused interface (just search)
- [ ] Mobile-optimized (works on phones)

---

### **User Story 1.2: Search for Songs**
**As a musician,**  
I want to search songs by title or artist  
So that I can quickly find specific songs without scrolling.

**Acceptance Criteria:**
- [ ] Search bar visible at top of song list
- [ ] Search works for partial matches (e.g., "stand" finds "Stand By Me")
- [ ] Search is case-insensitive
- [ ] Results update as I type (live search)
- [ ] Shows "No results found" message when search returns nothing
- [ ] Clear/reset button to return to full list

---

### **User Story 1.3: Filter by Genre**
**As a musician,**  
I want to filter songs by genre  
So that I can find songs that match our jam session vibe.

**Acceptance Criteria:**
- [ ] Genre filter dropdown/buttons visible
- [ ] Available genres: Rock, Pop, Blues, Folk, Soul, Country, Other
- [ ] Filter updates song list immediately
- [ ] Shows count of songs in each genre
- [ ] "All Genres" option to reset filter
- [ ] Can combine with search (filter + search together)

---

### **User Story 1.4: Filter by Difficulty**
**As a beginner musician,**  
I want to filter songs by difficulty level  
So that I can find songs that match my skill level.

**Acceptance Criteria:**
- [ ] Difficulty filter options: Beginner, Intermediate, Advanced
- [ ] Filter updates song list immediately
- [ ] Visual indicator of current difficulty filter
- [ ] "All Levels" option to reset filter
- [ ] Can combine with genre filter and search

---

### **User Story 1.5: View Song Details**
**As a musician,**  
I want to see song metadata (key, tempo, time signature)  
So that I know what to expect before starting.

**Acceptance Criteria:**
- [ ] Song card displays: title, artist, key, tempo BPM, difficulty
- [ ] Clicking a song card navigates to song detail page
- [ ] Song detail page shows full metadata including time signature
- [ ] Back button returns to song list

---

## 🎸 Epic 2: Chord Display & Visualization

### **User Story 2.1: View Current Chord**
**As a musician,**  
I want to see the current chord displayed large and clear  
So that I know what to play at any moment.

**Acceptance Criteria:**
- [ ] Current chord name displayed prominently (large text)
- [ ] Chord updates automatically when metronome advances
- [ ] Chord name visible from across the room
- [ ] High contrast for readability
- [ ] Shows chord name in standard notation (e.g., "Am7", "Fmaj7")

---

### **User Story 2.2: See Upcoming Chords**
**As a musician,**  
I want to see the next few chords coming up  
So that I can prepare for chord changes.

**Acceptance Criteria:**
- [ ] Display next 2-4 chords in sequence
- [ ] Upcoming chords dimmed/smaller than current chord
- [ ] Visual indicator showing current position in progression
- [ ] Smooth transition animation when advancing
- [ ] Clear visual distinction between current and upcoming

---

### **User Story 2.3: View Piano Chord Diagram**
**As a piano player,**  
I want to see which keys to press for each chord  
So that I know the correct voicing.

**Acceptance Criteria:**
- [ ] Piano keyboard visualizer displays when "Piano" instrument selected
- [ ] Active keys highlighted in chord color (e.g., blue)
- [ ] Inactive keys shown in neutral color (white/gray)
- [ ] Visualizer updates when chord changes
- [ ] Smooth color transition animation
- [ ] Responsive design (scales to screen size)
- [ ] SVG-based (sharp at any size)

---

### **User Story 2.4: View Guitar Chord Diagram**
**As a guitar player,**  
I want to see fretboard fingering for each chord  
So that I know where to place my fingers.

**Acceptance Criteria:**
- [ ] Guitar fretboard visualizer displays when "Guitar" instrument selected
- [ ] Shows 6 strings and relevant frets (usually 0-5)
- [ ] Finger positions marked with colored dots
- [ ] String numbers/notes labeled
- [ ] Open strings indicated (O)
- [ ] Muted strings indicated (X)
- [ ] Updates when chord changes
- [ ] Responsive design (works on mobile)

---

### **User Story 2.5: Switch Between Instruments**
**As a multi-instrumentalist,**  
I want to toggle between piano and guitar visualizers  
So that I can see chords for my current instrument.

**Acceptance Criteria:**
- [ ] Instrument selector (toggle or dropdown)
- [ ] Options: Piano, Guitar
- [ ] Selection persists during song playback
- [ ] Visualizer swaps instantly when changed
- [ ] No interruption to metronome when switching
- [ ] Default: Guitar (most common)

---

### **User Story 2.6: View Song Structure**
**As a musician,**  
I want to see the song's structure (sections)  
So that I know what part is currently playing.

**Acceptance Criteria:**
- [ ] Display all sections: Intro, Verse, Chorus, Bridge, Outro
- [ ] Current section highlighted/emphasized
- [ ] Section names clearly labeled
- [ ] Shows progression through song visually (e.g., progress bar)
- [ ] Can see all sections at once (overview)
- [ ] Updates automatically as metronome advances

---

## 🥁 Epic 3: Metronome & Playback

### **User Story 3.1: Start Playback**
**As a musician,**  
I want to start the metronome with one click  
So that we can begin playing immediately.

**Acceptance Criteria:**
- [ ] Large, obvious "Play" button
- [ ] Button accessible at all times (sticky/fixed position)
- [ ] Metronome starts at song's default tempo
- [ ] Audio click plays on beat
- [ ] Chord display begins advancing
- [ ] Button changes to "Pause" icon when playing
- [ ] Works on first click (no audio permission errors)

---

### **User Story 3.2: Pause Playback**
**As a musician,**  
I want to pause the metronome  
So that we can stop and discuss or take a break.

**Acceptance Criteria:**
- [ ] "Pause" button visible when playing
- [ ] Metronome stops immediately
- [ ] Current chord remains visible
- [ ] Position in song preserved (doesn't reset)
- [ ] Button changes back to "Play" icon
- [ ] No audio glitches when pausing

---

### **User Story 3.3: Restart from Beginning**
**As a musician,**  
I want to restart the song from the beginning  
So that we can practice the full song again.

**Acceptance Criteria:**
- [ ] "Restart" button clearly labeled/icon
- [ ] Resets chord progression to first chord
- [ ] Resets to first section (Intro or Verse 1)
- [ ] Metronome stops if currently playing
- [ ] Visual confirmation of restart (chord resets to first)
- [ ] Works whether paused or playing

---

### **User Story 3.4: Adjust Tempo**
**As a musician learning a song,**  
I want to slow down or speed up the tempo  
So that I can practice at a comfortable speed.

**Acceptance Criteria:**
- [ ] Tempo slider or +/- buttons visible
- [ ] Range: 40 BPM to 240 BPM
- [ ] Current BPM displayed numerically
- [ ] Changes apply in real-time (no need to restart)
- [ ] Smooth tempo transitions (no jarring jumps)
- [ ] Quick preset buttons: Slow (75% speed), Normal (100%), Fast (125%)
- [ ] Slider works on mobile (touch-friendly)

---

### **User Story 3.5: Hear Beat Indicator**
**As a musician,**  
I want to hear an audible metronome click  
So that I can stay in time.

**Acceptance Criteria:**
- [ ] Audible click plays on each beat
- [ ] Click is clear and distinct
- [ ] Volume appropriate (not too loud/quiet)
- [ ] No audio lag or drift over time
- [ ] Works on all browsers (Chrome, Safari, Firefox)
- [ ] Works on mobile devices (iOS, Android)

---

### **User Story 3.6: See Visual Beat Indicator**
**As a musician in a loud environment,**  
I want to see a visual pulse on each beat  
So that I can follow timing without relying only on audio.

**Acceptance Criteria:**
- [ ] Visual element pulses/flashes on each beat
- [ ] Pulse synchronized perfectly with audio click
- [ ] Visible but not distracting
- [ ] Different visual state for strong beats (beat 1 in 4/4 time)
- [ ] Smooth animation (no flickering)
- [ ] Works even if audio is off

---

### **User Story 3.7: Change Metronome Sound**
**As a musician,**  
I want to switch between different metronome sounds  
So that I can use a sound I prefer.

**Acceptance Criteria:**
- [ ] Sound selector dropdown or buttons
- [ ] Options: Metronome (digital beep), Shaker, Drum
- [ ] Sound changes immediately (no page reload)
- [ ] Works during playback (seamless transition)
- [ ] Selection persists for current session
- [ ] All sounds at same tempo (BPM)

---

## 🎛️ Epic 4: User Experience & Interface

### **User Story 4.1: Use on Mobile Device**
**As a mobile musician,**  
I want the app to work perfectly on my phone  
So that I can jam without bringing a laptop.

**Acceptance Criteria:**
- [ ] All features accessible on mobile (iPhone, Android)
- [ ] Touch-friendly controls (buttons, sliders)
- [ ] Readable text at mobile screen size
- [ ] Chord visualizers scale appropriately
- [ ] No horizontal scrolling required
- [ ] Works in portrait and landscape orientation
- [ ] Fast loading on mobile networks

---

### **User Story 4.2: Navigate Easily**
**As a new user,**  
I want intuitive navigation  
So that I can use the app without instructions.

**Acceptance Criteria:**
- [ ] Clear header with app logo/name
- [ ] Back button returns to song list from song page
- [ ] Breadcrumbs or clear page indicators
- [ ] No dead-end pages (always a way to navigate away)
- [ ] Consistent layout across pages
- [ ] Visual feedback on button clicks (hover states, active states)

---

### **User Story 4.3: Access Help/Instructions**
**As a first-time user,**  
I want quick instructions on how to use the app  
So that I can get started immediately.

**Acceptance Criteria:**
- [ ] Brief "How to Use" section on homepage
- [ ] Tooltips on key UI elements (first-time hints)
- [ ] Optional tour/walkthrough for new users
- [ ] FAQ or help link in footer
- [ ] Instructions under 3 sentences per feature

---

### **User Story 4.4: See Loading States**
**As a user,**  
I want to see when the app is loading data  
So that I know the app is working and not frozen.

**Acceptance Criteria:**
- [ ] Loading spinner/skeleton when fetching songs
- [ ] Loading indicator when opening a song
- [ ] "Loading audio..." message on first play
- [ ] No blank screens (always show something)
- [ ] Loading states have timeout (show error if too long)

---

### **User Story 4.5: Handle Errors Gracefully**
**As a user,**  
I want helpful error messages when something goes wrong  
So that I know what to do next.

**Acceptance Criteria:**
- [ ] Friendly error messages (not technical jargon)
- [ ] Suggested actions ("Try refreshing" or "Check connection")
- [ ] Errors don't crash the app (graceful degradation)
- [ ] Can dismiss error messages
- [ ] Retry buttons where applicable
- [ ] Example: "Could not load songs. Please check your internet connection."

---

## 🎨 Epic 5: Visual Design (Deferred to STYLE_GUIDE.md)

*Design decisions (colors, fonts, spacing) are not user stories — they're documented in STYLE_GUIDE.md.*

---

## 📊 Epic 6: Performance & Reliability

### **User Story 6.1: Fast Initial Load**
**As an impatient user,**  
I want the app to load quickly  
So that I can start jamming without waiting.

**Acceptance Criteria:**
- [ ] Homepage loads in under 3 seconds on 4G connection
- [ ] Song detail page loads in under 2 seconds
- [ ] No "white screen" period (show something immediately)
- [ ] Images/assets optimized for fast loading
- [ ] Passes Lighthouse performance audit (score > 85)

---

### **User Story 6.2: Reliable Timing**
**As a musician,**  
I want the metronome to stay perfectly in time  
So that we don't drift out of sync.

**Acceptance Criteria:**
- [ ] No timing drift over 5+ minute songs
- [ ] BPM accuracy within ±1 BPM of set tempo
- [ ] Chord changes happen precisely on correct beat
- [ ] Works reliably in background (if tab loses focus)
- [ ] No audio stuttering or glitching

---

### **User Story 6.3: Offline Resilience**
**As a user with spotty internet,**  
I want the app to work if I temporarily lose connection  
So that my jam session isn't interrupted.

**Acceptance Criteria:**
- [ ] Once a song is loaded, works without internet
- [ ] Audio files cached in browser
- [ ] Shows friendly message if trying to load new song offline
- [ ] Doesn't crash when connection drops
- [ ] Reconnects gracefully when internet returns

---

## ✅ Acceptance Criteria Summary

**MVP is complete when all stories in these epics are satisfied:**
1. ✅ Epic 1: Song Discovery (5 stories)
2. ✅ Epic 2: Chord Display (6 stories)
3. ✅ Epic 3: Metronome & Playback (7 stories)
4. ✅ Epic 4: User Experience (5 stories)
5. ✅ Epic 6: Performance (3 stories)

**Total MVP User Stories:** 26

---

## 🚀 Post-MVP User Stories (Phase 2+)

These features are explicitly out of scope for MVP but documented for future development:

### **Epic 7: User Accounts & Personalization**
- As a user, I want to create an account so that I can save my preferences
- As a user, I want to favorite songs so that I can quickly access my most-played songs
- As a user, I want my settings (instrument, metronome sound) saved so that I don't have to re-select every time

### **Epic 8: Advanced Features**
- As a user, I want to transpose songs to different keys so that I can sing/play comfortably
- As a user, I want to see multiple difficulty levels (Basic/Original/Jazz) so that I can choose complexity
- As a user, I want to contribute my own chord progressions so that I can share with the community

### **Epic 9: Collaboration**
- As a band member, I want to share a live jam session link so that remote members can follow along
- As a user, I want real-time collaboration so that we can jam together online
- As a user, I want to see what chords other users are playing so that we stay synchronized

---

## 📝 User Story Template (For Future Features)

When adding new features, use this format:

```markdown
### **User Story X.X: [Feature Name]**
**As a [type of user],**  
I want [feature]  
So that [benefit].

**Acceptance Criteria:**
- [ ] Specific, measurable requirement
- [ ] Another testable requirement
- [ ] Edge case handled
- [ ] Works on mobile
- [ ] Accessible (keyboard, screen readers)
```

---

**Document Version:** 1.0  
**Last Updated:** October 25, 2025  
**Status:** User Stories Complete — Ready for API Documentation Phase