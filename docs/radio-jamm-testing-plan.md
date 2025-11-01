# RADIO JAMM — Testing Plan

## 📖 Overview

This document provides a comprehensive testing strategy for RADIO JAMM MVP. It includes manual test scenarios, edge cases, device testing, and acceptance criteria to ensure a quality launch.

**Testing Philosophy:**
- Mobile-first (test on real phones)
- User-focused (test like a musician, not a developer)
- Critical path priority (core features must work flawlessly)
- Edge cases matter (handle errors gracefully)

---

## 🎯 Testing Priorities

### **Priority 1: Critical Path (Must Work)**
These features are essential. If they fail, the app is unusable.

1. Search finds songs
2. Song loads and displays chords
3. Metronome plays in time
4. Chords advance correctly
5. Works on mobile devices

### **Priority 2: Important Features (Should Work)**
These enhance the experience but aren't blocking.

1. Tempo adjustment
2. Instrument switching
3. Section progression
4. Visual animations

### **Priority 3: Nice-to-Have (Can Fix Post-Launch)**
Polish and refinements.

1. Smooth transitions
2. Loading animations
3. Error message styling
4. Performance optimizations

---

## 📱 Device Testing Matrix

### **Required Devices (Test on ALL)**

| Device Type | OS | Browser | Priority |
|-------------|----|---------|----|
| iPhone | iOS 16+ | Safari | Critical |
| iPhone | iOS 16+ | Chrome | High |
| Android Phone | Android 12+ | Chrome | Critical |
| iPad | iOS 16+ | Safari | Medium |
| Desktop | macOS | Chrome | Medium |
| Desktop | Windows | Chrome | Medium |

**Minimum requirement:** Test on at least 1 iPhone and 1 Android phone.

---

## ✅ Feature Testing Checklist

### **1. Homepage / Search**

#### **Search Functionality**
- [ ] Search bar is visible and focused on page load
- [ ] Typing shows results below search bar
- [ ] Search works with partial matches (e.g., "stand" finds "Stand By Me")
- [ ] Search is case-insensitive
- [ ] Results show song title and artist
- [ ] Clicking a result navigates to song page
- [ ] Clear (X) button clears search text
- [ ] "No results found" shows when search returns nothing
- [ ] Search works with special characters (e.g., "Mary's Lamb")

#### **Performance**
- [ ] Search results appear within 1 second
- [ ] No lag while typing (debounced properly)
- [ ] Page loads in under 3 seconds on 4G

#### **Mobile Specific**
- [ ] On-screen keyboard doesn't cover search bar
- [ ] Results are easy to tap (not too small)
- [ ] No horizontal scrolling

---

### **2. Song Page / Chord Display**

#### **Initial Load**
- [ ] Song title and artist display correctly
- [ ] First chord shows immediately
- [ ] Correct instrument visualizer shows (default: guitar)
- [ ] Tempo displays correct BPM
- [ ] Timeline shows all sections
- [ ] Loading spinner shows while fetching (if slow)

#### **Chord Display**
- [ ] Current chord name is large and readable
- [ ] Chord name uses proper notation (e.g., "Am7", "Fmaj7")
- [ ] Visible from across the room (large text)
- [ ] High contrast (readable in bright/dim lighting)

#### **Piano Visualizer**
- [ ] Piano keys display correctly (white and black keys)
- [ ] Correct keys highlight for current chord
- [ ] Highlighted keys use accent color from style guide
- [ ] Inactive keys are neutral color
- [ ] Smooth transition when chord changes
- [ ] Works on small screens (mobile)
- [ ] Keys are clearly visible

#### **Guitar Visualizer**
- [ ] Fretboard displays correctly (6 strings, proper frets)
- [ ] Finger positions show as dots
- [ ] Dots are on correct strings/frets for chord
- [ ] Open strings marked (if applicable)
- [ ] Muted strings marked (if applicable)
- [ ] Clear finger placement indication
- [ ] Works on small screens (mobile)

#### **Instrument Toggle**
- [ ] Toggle switch visible and accessible
- [ ] Switching from Piano to Guitar works instantly
- [ ] Switching from Guitar to Piano works instantly
- [ ] Selection persists during song playback
- [ ] Both visualizers show same chord correctly

#### **Upcoming Chords**
- [ ] Shows next 2-4 chords
- [ ] Updates as song progresses
- [ ] Doesn't distract from current chord
- [ ] Readable but secondary in visual hierarchy

#### **Song Timeline**
- [ ] Waveform displays all sections
- [ ] Current section is highlighted
- [ ] Timeline progresses smoothly
- [ ] Section transitions are visible
- [ ] Works on mobile (not too small)

#### **Section Label**
- [ ] Shows current section name (Verse, Chorus, etc.)
- [ ] Updates when section changes
- [ ] Smooth transition animation

---

### **3. Metronome / Playback Controls**

#### **Play/Pause**
- [ ] Play button starts metronome
- [ ] Pause button stops metronome
- [ ] Button icon changes (play ↔ pause)
- [ ] First click always works (no audio permission issues)
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] No delay between click and sound

#### **Metronome Timing**
- [ ] Click sound plays on every beat
- [ ] Timing is precise (no drift over 5 minutes)
- [ ] BPM matches displayed tempo
- [ ] Stays in sync with visual indicators

#### **Chord Advancement**
- [ ] Chords change on correct beat
- [ ] Chord duration matches data (4 beats = 1 measure)
- [ ] No skipped chords
- [ ] No stuck chords (advancing properly)
- [ ] Loops back to beginning when song ends
- [ ] All visualizers update together (no lag)

#### **Restart Button**
- [ ] Stops playback if currently playing
- [ ] Resets to first chord
- [ ] Resets to first section
- [ ] Visual indicators reset (timeline, etc.)
- [ ] Can play again after restart

#### **Tempo Slider**
- [ ] Slider displays current BPM
- [ ] Dragging slider changes tempo in real-time
- [ ] Tempo display updates as slider moves
- [ ] Metronome speed changes immediately (no restart needed)
- [ ] Works smoothly (no lag)
- [ ] Range: 40-240 BPM works
- [ ] Works on mobile (touch-friendly)

#### **Tempo Display**
- [ ] Shows current BPM numerically
- [ ] Updates when slider moves
- [ ] Updates when presets clicked
- [ ] Format: "120 BPM" or similar

#### **Tempo Presets**
- [ ] Slow button sets 75% speed
- [ ] Normal button sets 100% speed (original)
- [ ] Fast button sets 125% speed
- [ ] Active preset is visually indicated
- [ ] Metronome adjusts immediately

#### **Beat Indicator**
- [ ] Pulses on every beat
- [ ] Synchronized with metronome click
- [ ] Strong beat (beat 1) emphasized visually
- [ ] Smooth animation (no flicker)
- [ ] Visible but not distracting

#### **Sound Selector**
- [ ] Dropdown shows sound options
- [ ] Metronome (default beep)
- [ ] Shaker
- [ ] Drum
- [ ] Sound changes immediately when selected
- [ ] Works during playback (seamless)
- [ ] New sound plays on next beat

---

### **4. Navigation & Layout**

#### **Header**
- [ ] "RADIO JAMM" logo/text visible
- [ ] Clicking logo returns to homepage
- [ ] Sticky at top (stays visible when scrolling)
- [ ] Works on mobile and desktop

#### **Footer**
- [ ] "Produced by Dre Blckwell" text visible
- [ ] Text links to Spotify profile
- [ ] Link opens in new tab
- [ ] Positioned at bottom (not intrusive)

#### **Page Wrapper**
- [ ] Content centered on desktop
- [ ] Proper padding on mobile
- [ ] No content touching screen edges
- [ ] Max width prevents overly wide layouts

#### **Back Navigation**
- [ ] Browser back button works
- [ ] Returns from song page to search
- [ ] Doesn't break app state

---

### **5. Error Handling**

#### **Network Errors**
- [ ] Shows friendly message if database unreachable
- [ ] "Check your connection" message appears
- [ ] Doesn't crash the app
- [ ] Retry option available (refresh or try again)

#### **Song Not Found**
- [ ] Shows message if invalid song ID in URL
- [ ] Doesn't show blank page
- [ ] Provides way to return to search

#### **Empty Search**
- [ ] Shows "No results found" message
- [ ] Suggests trying different search
- [ ] Doesn't look like an error (neutral tone)

#### **Audio Permission Denied**
- [ ] Shows message if browser blocks audio
- [ ] Explains how to enable audio
- [ ] Doesn't crash when audio fails

---

### **6. Performance**

#### **Load Times**
- [ ] Homepage loads in < 3 seconds (4G)
- [ ] Song page loads in < 2 seconds
- [ ] Search results appear in < 1 second
- [ ] No blank screens (always show something)

#### **Smooth Operation**
- [ ] No lag when interacting with controls
- [ ] Animations are smooth (60fps)
- [ ] No stuttering during playback
- [ ] Tempo changes apply instantly

#### **Memory Usage**
- [ ] App doesn't slow down after 10 minutes use
- [ ] No memory leaks (test in DevTools)
- [ ] Multiple song switches don't degrade performance

---

## 🧪 Test Scenarios (User Stories)

### **Scenario 1: First-Time User**

**User:** Jamie, never used the app before

**Steps:**
1. Open app on phone
2. See search bar (focused, ready to type)
3. Type "wonderwall"
4. See "Wonderwall - Oasis" in results
5. Tap the result
6. See song page with chords
7. Tap Play
8. Hear metronome, see chords changing
9. Smile and start playing guitar

**Success Criteria:**
- User completes flow in under 30 seconds
- No confusion or hesitation
- App feels intuitive

---

### **Scenario 2: Band Practice**

**User:** Taylor, preparing for band practice

**Steps:**
1. Search for "Hotel California"
2. Load song
3. See it's 74 BPM (too fast for practice)
4. Drag slider to 60 BPM
5. Hit Play
6. Chords advance slowly for practice
7. Switch to Piano visualizer
8. Play along with the metronome
9. Restart song to practice intro again

**Success Criteria:**
- Tempo adjustment is smooth
- Instrument switch is instant
- Restart works reliably
- No sync issues

---

### **Scenario 3: Noisy Environment**

**User:** Alex, in a loud coffee shop

**Steps:**
1. Open song
2. Can't hear metronome clearly
3. Relies on visual beat indicator
4. Beat indicator pulses clearly
5. Watches timeline to see song progress
6. Follows along successfully

**Success Criteria:**
- Visual indicators sufficient without audio
- Beat indicator is prominent
- Timeline is readable

---

### **Scenario 4: Learning a Song**

**User:** Morgan, beginner guitarist

**Steps:**
1. Search for "Stand By Me"
2. Load song
3. See it's in A major, 120 BPM
4. Look at guitar visualizer
5. See finger positions for A chord
6. Place fingers on frets as shown
7. Hit Play slowly (80 BPM)
8. Play along, struggling at first
9. Restart multiple times
10. Eventually play through full song

**Success Criteria:**
- Visualizer is clear enough to learn from
- Slow tempo works for practice
- Restart is easy to access
- Upcoming chords help prepare

---

## 🐛 Edge Cases & Error Conditions

### **Data Edge Cases**

#### **Song with Many Chords**
- [ ] Song with 50+ chords loads and plays correctly
- [ ] Timeline doesn't overflow
- [ ] Performance remains smooth

#### **Song with Complex Time Signature**
- [ ] 3/4, 6/8 time signatures work
- [ ] Beat indicator reflects proper emphasis

#### **Very Fast Tempo**
- [ ] 240 BPM works (though uncommon)
- [ ] Chords advance correctly at high speed
- [ ] No visual lag

#### **Very Slow Tempo**
- [ ] 40 BPM works
- [ ] Doesn't feel broken or stuck
- [ ] Beat indicator still visible

#### **One-Chord Song**
- [ ] Song with single chord doesn't break
- [ ] Metronome still plays
- [ ] Displays correctly

---

### **User Behavior Edge Cases**

#### **Rapid Clicks**
- [ ] Clicking Play/Pause rapidly doesn't break
- [ ] No double-sounds or audio glitches
- [ ] State stays consistent

#### **Dragging Slider While Playing**
- [ ] Tempo adjusts smoothly during playback
- [ ] No audio pops or clicks
- [ ] Chords stay in sync

#### **Switching Instruments While Playing**
- [ ] Visualizer swaps without interrupting metronome
- [ ] No crashes or freezes
- [ ] Playback continues

#### **Searching While Song Plays**
- [ ] Can navigate away mid-song
- [ ] Audio stops when leaving page
- [ ] No background audio issues

#### **Browser Back Button**
- [ ] Doesn't break app state
- [ ] Audio stops when navigating away
- [ ] Can return and play again

---

### **Browser/Device Edge Cases**

#### **Small Screen (iPhone SE)**
- [ ] All controls visible and usable
- [ ] Text is readable
- [ ] No overlapping elements
- [ ] Touch targets are large enough

#### **Large Screen (iPad Pro)**
- [ ] Layout doesn't look broken
- [ ] Content centered properly
- [ ] Not overly stretched

#### **Slow Connection (3G)**
- [ ] Loading spinner shows
- [ ] Doesn't appear frozen
- [ ] Eventually loads or shows error

#### **Offline**
- [ ] Shows error message
- [ ] Doesn't crash
- [ ] Explains internet needed

#### **Browser Tab Inactive**
- [ ] Metronome continues (or pauses gracefully)
- [ ] Doesn't drain battery excessively
- [ ] Resumes when tab active

---

## 📋 Pre-Launch Checklist

### **Functionality**
- [ ] All user stories pass
- [ ] All critical features work
- [ ] Error handling tested
- [ ] Edge cases handled

### **Devices**
- [ ] Tested on iPhone (Safari)
- [ ] Tested on Android (Chrome)
- [ ] Tested on desktop (Chrome)
- [ ] Works in portrait and landscape

### **Performance**
- [ ] Lighthouse score > 85
- [ ] Page load < 3 seconds
- [ ] No console errors in production
- [ ] No memory leaks

### **Content**
- [ ] 10-50 songs seeded in database
- [ ] All songs have complete chord data
- [ ] Chord progressions are accurate
- [ ] Song metadata correct (title, artist, tempo, key)

### **Design**
- [ ] Colors match style guide
- [ ] Fonts load correctly (Space Grotesk, Inter)
- [ ] Spacing is consistent
- [ ] Animations are smooth

### **Accessibility**
- [ ] Text contrast passes WCAG AA
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (basic)

### **SEO/Meta**
- [ ] Page titles set
- [ ] Meta descriptions added
- [ ] Favicon present
- [ ] Social media preview image (optional)

### **Analytics (Optional)**
- [ ] Vercel analytics enabled
- [ ] Basic tracking setup
- [ ] Error tracking configured

---

## 🔍 Testing Tools

### **Manual Testing**
- Real devices (iPhone, Android)
- Chrome DevTools (mobile emulation)
- Network throttling (test slow connections)

### **Browser DevTools**
- Console (check for errors)
- Network tab (API calls, load times)
- Performance tab (memory leaks, frame rate)
- Lighthouse (performance audit)

### **Suggested Flow**
1. Test on real phone first (most important)
2. Use DevTools for debugging
3. Run Lighthouse before launch
4. Check console for warnings/errors

---

## 🐛 Bug Reporting Template

When you find an issue, document it:

```
**Bug Title:** Chord doesn't change on beat 5

**Priority:** High / Medium / Low

**Device:** iPhone 13, iOS 17, Safari

**Steps to Reproduce:**
1. Load "Stand By Me"
2. Start playback
3. Watch chord display
4. On beat 5, chord should change but doesn't

**Expected:** Chord changes from A to F#m
**Actual:** Stays on A

**Screenshots/Video:** [attach]

**Console Errors:** [paste any errors]
```

---

## ✅ Acceptance Criteria (Definition of Done)

**The MVP is ready to launch when:**

### **Critical Path Works**
- ✅ User can search and find songs
- ✅ User can load and view chords
- ✅ Metronome plays accurately
- ✅ Chords advance correctly
- ✅ Works on iPhone and Android

### **No Critical Bugs**
- ✅ No crashes or freezes
- ✅ No broken core features
- ✅ Errors are handled gracefully
- ✅ Audio works reliably

### **Performance Acceptable**
- ✅ Fast enough on mobile (< 3s load)
- ✅ Smooth animations (60fps)
- ✅ No lag during use

### **Content Complete**
- ✅ 10+ songs available
- ✅ Chord data is accurate
- ✅ All songs tested

### **Polish Level**
- ✅ Looks professional (matches style guide)
- ✅ No obvious visual bugs
- ✅ Feels complete (not a prototype)

---

## 🚀 Post-Launch Testing

After launch, monitor:

### **Week 1**
- [ ] User feedback (friends, musicians)
- [ ] Error logs (any crashes?)
- [ ] Performance on real-world devices
- [ ] Most-used features (analytics)

### **Quick Fixes**
- [ ] Address critical bugs immediately
- [ ] Note minor issues for next update
- [ ] Collect feature requests

### **Success Metrics**
- [ ] Users can complete a jam session
- [ ] No major complaints
- [ ] People come back (returning users)
- [ ] App feels reliable

---

## 🎯 Testing Summary

**Key Principles:**
1. **Test like a user, not a developer**
2. **Mobile is priority #1**
3. **Core features must be perfect**
4. **Edge cases should degrade gracefully**
5. **Real devices beat emulators**

**Minimum Testing:**
- 1 iPhone + 1 Android phone
- All 5 user scenarios
- Critical path works flawlessly
- No console errors

**When Ready:**
- All checklists complete ✅
- Tested on real phones ✅
- Friends can use it successfully ✅
- You'd confidently show it to musicians ✅

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Status:** Testing Plan Complete — Ready to Build & Test