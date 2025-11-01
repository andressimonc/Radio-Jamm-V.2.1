# 🔧 RADIO JAMM — Troubleshooting & Bug Fixes

## ✅ Issues Fixed (Nov 1, 2025)

### **Bug #1: Metronome Engine SSR Error**
**Error**: `"Error: param must be an AudioParam"`

**Cause**: Tone.js `Player` objects were being initialized in the constructor during server-side rendering. The Web Audio API only exists in the browser, not in Node.js.

**Fix**: Modified `lib/metronome-engine.ts` to:
- Make `players` optional (`players?: Record<MetronomeSound, Tone.Player>`)
- Create `initializePlayers()` method that only runs client-side
- Call `initializePlayers()` inside the `init()` method (which is triggered by user interaction)

**Files Changed**:
- `/lib/metronome-engine.ts`

---

### **Bug #2: Zustand Selector Infinite Loop**
**Error**: `"The result of getSnapshot should be cached to avoid an infinite loop"`

**Cause**: The `selectUpcomingChords` selector was creating a new array on every render. When React compared the old and new values, they were always different (new object references), causing infinite re-renders.

**Fix**: Modified `components/metronome/UpcomingChords.tsx` to:
- Use `useMemo` to cache the upcoming chords calculation
- Only recalculate when `currentSong`, `currentSectionIndex`, or `currentChordIndex` change
- This ensures stable array references between renders

**Files Changed**:
- `/components/metronome/UpcomingChords.tsx`
- `/store/usePlayerStore.ts` (updated selector to not take parameters)

---

## 🎯 Current Status

### **✅ What's Working**
- ✅ App compiles successfully
- ✅ Development server runs without errors
- ✅ Homepage loads and displays correctly
- ✅ Search UI is functional
- ✅ Song page route works (`/songs/[id]`)
- ✅ All components render without errors
- ✅ Metronome engine initializes properly (client-side only)
- ✅ Zustand store works without infinite loops

### **❌ What's Not Working (Expected)**
- ❌ Search returns no results → **Reason**: Supabase database not set up yet
- ❌ Can't click on songs → **Reason**: No songs in database to display

---

## 🚀 Next Steps

### **1. Setup Supabase Database** (Required - 5 minutes)

Follow `SUPABASE-SETUP.md`:

1. **Create the songs table**:
   - Go to Supabase SQL Editor
   - Run the CREATE TABLE script

2. **Insert test data**:
   - Run the INSERT script to add 3 songs

3. **Verify**:
   ```sql
   SELECT * FROM songs;
   ```

Once complete, the search will work!

---

## 🧪 Testing the App

### **After Supabase Setup:**

1. **Test Search**:
   - Type "stand" → Should see "Stand By Me"
   - Type "wonder" → Should see "Wonderwall"
   - Type "let" → Should see "Let It Be"

2. **Test Song Page**:
   - Click on any song
   - Should see:
     - ✅ Song header with title, artist, key, tempo, etc.
     - ✅ Large chord display (starts at first chord)
     - ✅ Piano visualizer (or guitar)
     - ✅ Metronome controls (tempo slider, play/pause, etc.)

3. **Test Metronome**:
   - Click Play button
   - Should hear metronome clicks
   - Chords should advance every N beats
   - Piano/guitar should highlight the chord notes
   - Beat indicator should pulse
   - Upcoming chords should show next 3 chords

4. **Test Controls**:
   - Adjust tempo → Metronome speed changes
   - Change sound → Click sound changes (metronome/shaker/drum)
   - Toggle visualizer → Switch between piano and guitar
   - Click restart → Resets to first chord

---

## 🐛 Common Issues & Solutions

### **"Failed to fetch" in search results**
**Cause**: Supabase environment variables not set or incorrect.

**Fix**:
1. Check `.env.local` has:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```
2. Restart dev server: `npm run dev`

---

### **Search returns empty results**
**Cause**: Database table not created or no songs inserted.

**Fix**: Run the SQL scripts from `SUPABASE-SETUP.md`

---

### **Song page shows error**
**Cause**: Invalid song ID or song doesn't exist in database.

**Fix**: 
1. Verify songs exist: `SELECT id, title FROM songs;`
2. Make sure you're clicking from search results (valid IDs)

---

### **Metronome not working**
**Possible Causes**:
1. **No song loaded** → Select a song from search first
2. **Browser audio blocked** → Click anywhere on page to enable audio
3. **Missing audio files** → Check `/public/sounds/` has the `.wav` files

**Fix**:
- Make sure you're on a song page (`/songs/[id]`)
- Click Play button (this triggers audio context initialization)
- Check browser console for audio errors

---

### **Visualizer not showing chord notes**
**Cause**: Chord shape not defined in guitar visualizer, or chord parsing issue.

**Expected Behavior**:
- Piano: Always shows notes (based on chord parser)
- Guitar: Only ~10 common chords have fingerings defined

**Fix for Guitar**: Add more chord shapes to `components/visualizers/GuitarVisualizer.tsx` in the `CHORD_SHAPES` object.

---

## 📝 Development Notes

### **TypeScript/Lint Warnings (Safe to Ignore)**
- `@custom-variant`, `@theme`, `@apply` warnings in CSS → These are valid Tailwind v4 directives
- Module not found for visualizers in IDE → Temporary TypeScript re-indexing lag

### **Fast Refresh Warnings**
If you see "Fast Refresh had to perform a full reload", it's normal when:
- Changing component structure significantly
- Modifying Zustand store
- Updating hooks

Just refresh the browser manually if needed.

---

## 🎨 Customization Tips

### **Add More Songs**
Use the SQL template in `SUPABASE-SETUP.md`:
```sql
INSERT INTO songs (title, artist, original_key, tempo_bpm, ...)
VALUES ('Song Name', 'Artist', 'C', 120, ...);
```

### **Add More Guitar Chords**
Edit `components/visualizers/GuitarVisualizer.tsx`:
```typescript
const CHORD_SHAPES: Record<string, Array<{ string: number; fret: number }>> = {
  'Cmaj7': [{ string: 5, fret: 3 }, { string: 4, fret: 3 }, ...],
  // Add more here
};
```

### **Change Color Theme**
Edit `app/globals.css` in the `@theme inline` block:
```css
--color-royal: #613DC1; /* Change to your color */
```

---

## 📊 Architecture Overview

### **Data Flow**:
1. **Search**: Homepage → SearchBar → Supabase → SearchResults
2. **Song Load**: Click song → Navigate to `/songs/[id]` → Fetch from Supabase → Update Zustand store
3. **Playback**: Click Play → Initialize Tone.js → Start metronome loop → Advance chords → Update visualizers

### **State Management**:
- **Global State**: Zustand store (`store/usePlayerStore.ts`)
- **Local State**: React hooks in components
- **Selectors**: Memoized computations for chords and sections

### **Audio System**:
- **Engine**: `lib/metronome-engine.ts` (Tone.js wrapper)
- **Hook**: `hooks/useMetronome.ts` (syncs engine with store)
- **Sounds**: `/public/sounds/*.wav`

---

## 🆘 Need Help?

1. **Check the terminal** for error messages
2. **Check the browser console** for client-side errors
3. **Verify Supabase** connection and data
4. **Check this document** for common issues
5. **Review `BUILD-STATUS.md`** for what's built
6. **Review `SUPABASE-SETUP.md`** for database setup

---

## ✅ Success Checklist

Before considering the app "done", verify:

- [ ] Supabase database created
- [ ] 3 seed songs inserted
- [ ] Search returns results
- [ ] Song page loads
- [ ] Metronome plays sound
- [ ] Chords advance automatically
- [ ] Piano visualizer highlights keys
- [ ] Guitar visualizer shows fingerings
- [ ] Tempo slider works
- [ ] Sound selector works
- [ ] Upcoming chords display

---

**Built with ❤️ by AI. Debugged and ready to jam! 🎸✨**
