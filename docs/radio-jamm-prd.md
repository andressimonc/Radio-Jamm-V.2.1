# RADIO JAMM — Product Requirements Document

## 🎯 Vision Statement

**RADIO JAMM** is a real-time chord display app that makes jam sessions effortless for musicians.

---

## 🎸 App Identity

**Name:** RADIO JAMM  
**Tagline:** Real-time chords for effortless jam sessions  
**Positioning:** The bridge between practice apps and live jamming

---

## 👥 Target Users

### Primary Audience
- **Casual musicians** who jam with friends on weekends
- **Beginner-to-intermediate players** learning songs and building confidence
- **Band members** who need quick chord references during practice sessions

### User Characteristics
- Comfortable with basic music theory (knows what a chord is)
- Owns at least one instrument (guitar, piano, bass, etc.)
- Jams in person or wants to practice with realistic timing
- Values simplicity over complex features during live play

---

## 🎯 Core Problem Statement

### The Problem We're Solving
**Miscommunication during jam sessions** creates frustration and breaks musical flow.

Existing practice apps are feature-heavy and optimized for solo learning, not collaborative jamming. Musicians need a simple, real-time reference that keeps everyone on the same page without overwhelming them with options.

### Key Pain Points
1. **Sheet music breaks flow** — Flipping through pages or PDFs mid-jam kills momentum
2. **Memory fails under pressure** — Forgetting chord changes when playing with others
3. **Skill level mismatches** — Advanced players and beginners struggle to sync
4. **No unified reference** — Everyone looking at different sources creates chaos

### Our Solution
Create a **jam-focused environment** where beginners and advanced musicians can play together seamlessly, with clear visual chord references that advance automatically in time with the music.

---

## 🎪 MVP Core Features (Launch Version)

### ✅ In Scope for Initial Release

#### 1. Song Library
- **10-50 classic jam songs** pre-loaded
- Diverse genres suitable for multi-skill-level groups
- Complete chord progressions for each song
- Song metadata: title, artist, key, tempo, time signature

#### 2. Real-Time Chord Display
- **Synchronized chord progression** that advances with tempo
- Clear, large chord names visible across the room
- Visual indication of current chord vs. upcoming chords
- Song structure display (Verse, Chorus, Bridge labels)

#### 3. Guitar & Piano Chord Visualizers
- **Guitar component:** Fretboard diagrams showing finger positions
- **Piano component:** Keyboard visualization highlighting keys
- Toggle between instrument views
- Standard voicings for each chord

#### 4. Intelligent Metronome
- **Auto-advancing playback** that changes chords on beat
- Audible click track synchronized to BPM
- Visual beat indicator (pulsing or flashing)
- Play/pause/restart controls

#### 5. Tempo Control
- **BPM adjustment slider** (40-240 BPM range)
- Real-time tempo changes without stopping playback
- Preset buttons for common tempos (Slow/Medium/Fast)
- Display current BPM clearly

#### 6. Song Search & Browse
- **Simple search bar** by song title or artist
- Filter by genre/style
- Sort by popularity or alphabetically
- Quick access to recently played songs

#### 7. Mobile-Responsive Design
- **Works seamlessly on phones and tablets**
- Touch-optimized controls
- Readable chord displays on small screens
- Portrait and landscape orientations supported

#### 8. 3D Spline Animations
- **Interactive musical elements** using Spline
- Subtle background animations that enhance (not distract)
- Loading state animations
- Visual flair for landing/home screen

---

## 🚫 Out of Scope for MVP

These features are intentionally deferred to post-launch phases:

- ❌ **User authentication** — No login required for MVP
- ❌ **Bass chord visualizer** — Guitar and piano only initially
- ❌ **Lyrics display** — Chords only for MVP
- ❌ **Multiple difficulty levels** — Single "standard" version per song
- ❌ **Key transposition** — Songs in original key only
- ❌ **User-contributed songs** — Curated library only
- ❌ **Instrument-specific voicings** — Standard voicings for all
- ❌ **Subscription/monetization** — Free for everyone initially
- ❌ **Real-time collaboration** — Single-user experience
- ❌ **Offline mode** — Requires internet connection
- ❌ **Audio backing tracks** — Visual/metronome only

---

## 📊 Success Metrics

### Launch Goals (First Month)

#### Engagement Metrics
- **10+ songs played** through the metronome system
- **2+ returning users** who come back after first session
- **50+ total sessions** (plays of any song)

#### Technical Performance
- **<3 second page load time** on 4G connection
- **Works flawlessly on mobile** (iOS Safari, Chrome Android)
- **Zero critical bugs** in core playback functionality

#### Qualitative Feedback
- Positive responses from test users (friends, local musicians)
- Clear evidence app "solves the problem" (reduces miscommunication)
- Users can navigate without instructions

### Stretch Goals
- Featured on a music subreddit or forum
- 10+ users who aren't personal connections
- Song requests from community indicating interest

---

## 🚀 Post-MVP Roadmap

### Phase 2: Enhanced Personalization
**Timeline:** 2-3 months post-launch  
**Features:**
- User authentication (Clerk integration)
- Save favorite songs
- Practice history tracking
- Key transposition for all songs
- Bass chord visualizer
- Lyrics display synchronized with chords

### Phase 3: Community & Content
**Timeline:** 4-6 months post-launch  
**Features:**
- User-contributed chord progressions
- Multiple difficulty levels (Basic/Original/Jazz)
- Upvoting/rating system for accuracy
- Genre expansion (100+ songs)
- Custom setlist creation

### Phase 4: Monetization & Collaboration
**Timeline:** 6-12 months post-launch  
**Features:**
- Freemium subscription model
  - Free: 50 songs, basic features
  - Premium: Full library, advanced features
- Real-time multiplayer jam sessions
- Screen sharing for band practice
- Export chord sheets (PDF)
- Integration with music learning platforms

---

## 🎵 Initial Song List Strategy

### Selection Criteria
- **Genre diversity:** Rock, pop, blues, folk, country classics
- **Skill accessibility:** Mix of easy 3-4 chord songs and moderate complexity
- **Jam popularity:** Songs musicians commonly play together
- **Recognizability:** Well-known tracks that cross generations

### Example Starter Songs (To Be Finalized)
Priority songs to include in MVP:
1. "Stand By Me" — Ben E. King (Easy, iconic, 4 chords)
2. "Wonderwall" — Oasis (Beginner-friendly, popular)
3. "Let It Be" — The Beatles (Classic, simple structure)
4. "Sweet Home Alabama" — Lynyrd Skynyrd (Jam session staple)
5. "Hotel California" — Eagles (Moderate complexity, beloved)
6. "Knockin' on Heaven's Door" — Bob Dylan (Simple, versatile)
7. "Brown Eyed Girl" — Van Morrison (Upbeat, easy)
8. "Wild Horses" — Rolling Stones (Ballad option)
9. "Free Fallin'" — Tom Petty (4 chords, crowd favorite)
10. "Redemption Song" — Bob Marley (Acoustic classic)

**Final list will be 10-50 songs across rock, pop, blues, folk, and country.**

---

## 🎯 Design Principles

### Core Values
1. **Simplicity First** — No feature bloat, intuitive controls
2. **Performance Matters** — Fast loads, smooth animations, reliable timing
3. **Musician-Friendly** — Designed by jammers, for jammers
4. **Visual Clarity** — Readable across the room, clear current state
5. **Mobile-Equal** — Not mobile-first, mobile-equal

### User Experience Priorities
- **Zero learning curve** — Musician opens app, clicks song, starts playing
- **Distraction-free** — UI fades to background during play
- **Forgiving** — Easy to restart, adjust tempo, switch songs mid-session
- **Responsive feedback** — Immediate visual/audio confirmation of actions

---

## 🚧 Technical Constraints

### Must-Haves
- Works on iOS Safari (WebKit) and Android Chrome
- Handles high-precision timing (metronome accuracy ±5ms)
- Graceful degradation if 3D elements fail to load
- Accessible via direct URL (no app store required)

### Nice-to-Haves (Not Blocking)
- PWA installability
- Offline-first architecture
- Dark mode
- Accessibility compliance (WCAG AA)

---

## 📝 Open Questions & Decisions Needed

### Before Development
- [ ] Finalize exact song list (10, 25, or 50 songs?)
- [ ] Chord visualization style (realistic vs. simplified diagrams?)
- [ ] Metronome sound design (digital beep vs. organic click?)
- [ ] 3D animation scope (how much Spline integration?)

### During Development
- [ ] Determine chord data storage format (JSON structure)
- [ ] Define "beat" granularity (quarter notes, eighth notes?)
- [ ] Mobile UX for chord visualizers (scrollable, tabs, or stacked?)

---

## ✅ Definition of "Done" (MVP Launch Criteria)

The MVP is ready to launch when:

1. **Core functionality works:**
   - [ ] All songs load without errors
   - [ ] Metronome advances chords accurately
   - [ ] Guitar and piano visualizers display correctly
   - [ ] Tempo control responds in real-time

2. **Technical requirements met:**
   - [ ] Page loads in <3 seconds
   - [ ] Works on iOS and Android mobile browsers
   - [ ] No console errors in production build
   - [ ] Deployed to Vercel with proper DNS

3. **Content complete:**
   - [ ] 10-50 songs with complete, accurate chord progressions
   - [ ] All chord diagrams generated/vetted
   - [ ] Song metadata entered (key, tempo, artist, etc.)

4. **User-tested:**
   - [ ] 3+ musicians have successfully jammed using the app
   - [ ] No critical usability issues reported
   - [ ] Mobile experience validated by real users

5. **Polished presentation:**
   - [ ] Landing page explains value clearly
   - [ ] Visual design feels cohesive
   - [ ] 3D animations enhance (not distract)
   - [ ] No obvious placeholder content

---

## 📞 Stakeholder & Feedback

### Internal Validation
- Creator/developer validates vision alignment
- Test with musician friends before public launch

### Community Feedback (Post-Launch)
- r/WeAreTheMusicMakers
- Local music schools/groups
- Social media musician communities

---

**Document Version:** 1.0  
**Last Updated:** October 25, 2025  
**Status:** Foundation Complete — Ready for Technical Spec Phase