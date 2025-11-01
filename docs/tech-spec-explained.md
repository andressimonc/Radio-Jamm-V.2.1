# RADIO JAMM Tech Spec — Plain English Guide

This document explains every technical decision in simple language, without jargon.

---

## 🛠️ The Building Blocks (Tech Stack)

Think of building a website like building a house. You need different materials and tools. Here's what we're using:

### **Next.js 15 (The Foundation)**
**What it is:** A framework for building websites with React  
**Why we chose it:** 
- Makes websites load super fast
- Handles both the "front" (what users see) and "back" (behind-the-scenes data)
- Industry standard — tons of help available online
- Works perfectly with our hosting service (Vercel)

**Real-world analogy:** Like using pre-fab walls instead of building from scratch. Faster and tested.

---

### **React 18 (The Structure)**
**What it is:** A JavaScript library for building user interfaces  
**Why we chose it:**
- Lets you break your website into reusable pieces (like LEGO blocks)
- Updates the screen instantly when data changes (like your chord changing)
- Huge community = easy to find solutions

**Real-world analogy:** Like having modular furniture you can rearrange vs. custom-building everything.

---

### **TypeScript (The Safety Net)**
**What it is:** JavaScript with extra rules that catch mistakes before they happen  
**Why we chose it:**
- Tells you when something is wrong BEFORE you test it
- Makes code easier to understand (like labels on boxes)
- Strict mode = extra careful (catches even more mistakes)

**Real-world analogy:** Like spell-check for code. Catches typos and logic errors automatically.

---

### **Tailwind CSS (The Styling System)**
**What it is:** A way to style your website using pre-made classes  
**Why we chose it:**
- Fast styling without writing custom CSS from scratch
- Consistent look across the whole app
- Works perfectly with Shadcn/ui components

**Real-world analogy:** Like having a paint-by-numbers kit vs. mixing colors from scratch.

**Example:**
Instead of writing:
```css
.button {
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
}
```

You just write:
```html
<button class="bg-blue-500 px-10 rounded">Click me</button>
```

---

### **Shadcn/ui (Pre-Made Components)**
**What it is:** Beautiful, accessible UI components you can drop into your app  
**Why we chose it:**
- Buttons, sliders, cards, dropdowns already designed
- Accessible (works for everyone, including people with disabilities)
- Customizable with Tailwind

**Real-world analogy:** Like buying furniture from IKEA instead of building chairs from lumber.

**What we'll use:**
- Buttons (Play, Pause, Restart)
- Sliders (Tempo control)
- Cards (Song display)
- Dropdowns (Select instrument, metronome sound)
- Search bars

---

### **Lucide React (Icons)**
**What it is:** A library of beautiful icons  
**Why we chose it:**
- Play button ▶️, pause button ⏸️, search icon 🔍, etc.
- Lightweight and customizable
- Works seamlessly with React

**Real-world analogy:** Like using emoji instead of drawing pictures.

---

### **Figma (Design Tool)**
**What it is:** A design app (like Photoshop for websites)  
**Why we're using it:**
- You design the piano and guitar visualizers here
- Export them as SVG (scalable vector graphics)
- Paste the SVG code into your React components

**Workflow:**
1. Draw a beautiful piano in Figma
2. Click "Export as SVG"
3. Copy the code
4. Paste into your app
5. Your code can now control which keys light up

**Real-world analogy:** Sketching the blueprint before building.

---

### **Supabase (Database)**
**What it is:** A place to store all your song data (like a spreadsheet on steroids)  
**Why we chose it:**
- Stores all your songs, chords, tempo, etc.
- Creates an API automatically (no extra work)
- PostgreSQL database (super reliable, used by huge companies)
- Free tier is generous

**What we store:**
- Song title ("Stand By Me")
- Artist ("Ben E. King")
- Tempo (120 BPM)
- Chord progressions (Verse: C, Am, F, G)

**Real-world analogy:** Like Google Sheets, but designed for apps. Your app "reads" from this sheet.

---

### **Tone.js (The Metronome Brain)**
**What it is:** A JavaScript library built specifically for music timing  
**Why we chose it:**
- Keeps perfect time (better than regular JavaScript timers)
- Can play audio samples (your metronome clicks)
- Handles BPM changes smoothly
- Doesn't "drift" (stays in sync even after 10 minutes)

**What it does:**
- Plays your metronome sound every beat
- Advances chords at the right time
- Lets you adjust tempo in real-time

**Real-world analogy:** Like having a professional drummer keeping time vs. you counting in your head.

---

### **Zustand (Memory/State Manager)**
**What it is:** A tiny library that remembers what's happening in your app  
**Why we chose it:**
- Tracks "is the song playing?" (yes/no)
- Tracks "what's the current tempo?" (120 BPM)
- Tracks "which instrument is selected?" (guitar/piano)
- Any part of your app can check this info

**Without Zustand:**
Every component has its own memory → things get out of sync

**With Zustand:**
One central "brain" → everyone reads from the same source

**Real-world analogy:** Like a shared whiteboard everyone can see vs. everyone keeping their own notes.

---

### **Vercel (Hosting/Deployment)**
**What it is:** The service that puts your website on the internet  
**Why we chose it:**
- Made by the same team as Next.js (perfect compatibility)
- Automatic deployments (push code → live website in 30 seconds)
- Fast worldwide (servers everywhere)
- Free for small projects

**How it works:**
1. You push code to GitHub
2. Vercel detects the change
3. Builds your website
4. Deploys it live
5. You get a URL: `radio-jamm.vercel.app`

**Real-world analogy:** Like Amazon Prime for websites. Upload → instant delivery worldwide.

---

## 📁 How Your Project is Organized (Folder Structure)

Think of your project like a filing cabinet. Everything has a place.

### **public/** — Static Files Anyone Can Access
- `sounds/` — Your metronome click sounds (WAV files)
- `images/` — Logos, backgrounds, etc.

**Analogy:** The lobby of your building. Open to the public.

---

### **src/app/** — Your Website Pages
- `page.tsx` — Homepage (shows list of songs)
- `songs/[id]/page.tsx` — Song detail page (shows chords and metronome)

**[id]** means it's dynamic. One template handles all songs:
- `/songs/1` → "Stand By Me"
- `/songs/2` → "Wonderwall"
- Same page, different content

**Analogy:** Like having a template for all product pages on Amazon vs. coding each one separately.

---

### **src/components/** — Reusable Pieces

Think of these as LEGO blocks you can reuse anywhere.

**ui/** — Shadcn components (buttons, sliders, cards)

**chord-display/** — Chord visualizer pieces
- `PianoVisualizer.tsx` — The piano you designed in Figma (with code to light up keys)
- `GuitarVisualizer.tsx` — The guitar fretboard (with code to show finger positions)
- `ChordDisplay.tsx` — Shows the current chord name big and bold
- `SongStructure.tsx` — Shows song sections (Verse, Chorus, Bridge)

**metronome/** — Playback controls
- `MetronomeControls.tsx` — Play, pause, restart buttons
- `TempoSlider.tsx` — Slider to adjust BPM
- `BeatIndicator.tsx` — Visual pulse that flashes on each beat

**song-list/** — Song browser
- `SongCard.tsx` — One song item (shows title, artist, tempo)
- `SongSearch.tsx` — Search bar to filter songs
- `SongGrid.tsx` — Layout that arranges song cards nicely

**layout/** — Wrapper pieces
- `Header.tsx` — Top navigation bar
- `Footer.tsx` — Bottom footer

**Analogy:** Your toolbox. Each tool has a specific job.

---

### **src/lib/** — Helper Tools (Behind-the-Scenes)

**supabase.ts** — Connection to your database  
*Translation:* The phone line to call your database

**types.ts** — TypeScript definitions  
*Translation:* Descriptions of what data looks like (e.g., "A song has a title, artist, and tempo")

**chord-parser.ts** — Converts chord names to notes  
*Example:* "C major" → ["C", "E", "G"]

**metronome-engine.ts** — Tone.js logic  
*Translation:* The code that makes the metronome tick

**utils.ts** — Random helpful functions  
*Example:* Combining CSS classes, formatting text, etc.

---

### **src/hooks/** — Custom Reusable Functions

Hooks are special functions that "hook into" React features.

**useMetronome.ts** — Handles play/pause/tempo logic  
**useSongData.ts** — Fetches song data from database  
**useChordProgression.ts** — Figures out which chord to show next

**Analogy:** Like macros in Excel. Automate common tasks.

---

### **src/store/** — The Brain (Zustand)

**usePlayerStore.ts** — Tracks everything happening in the app
- Is song playing?
- Current tempo?
- Selected instrument?
- Current chord?

**Analogy:** Mission control for your app.

---

### **src/data/** — Starter Data

**seed-songs.json** — Your initial 10-50 songs in JSON format

**What JSON looks like:**
```json
{
  "title": "Stand By Me",
  "artist": "Ben E. King",
  "tempo": 120,
  "chords": [...]
}
```

**Analogy:** The first books you put on a library shelf.

---

## 🔧 Configuration Files (The Instruction Manuals)

### **next.config.js** — Next.js Settings
Tells Next.js how to build your app.  
**Translation:** "Use strict mode, minify code for faster loading"

---

### **tailwind.config.ts** — Tailwind Settings
Defines your design system (colors, fonts, spacing).  
**Note:** Actual colors will be in STYLE_GUIDE.md (we're designing that later).

---

### **tsconfig.json** — TypeScript Settings
Tells TypeScript to be extra strict (catch all mistakes).

---

### **package.json** — Dependency List
Lists all the tools/libraries your app needs.  
**Analogy:** Your shopping list. When you run `npm install`, it buys everything on the list.

---

## 🔐 Environment Variables (Secret Passwords)

### **.env.local** — Your Secret Config File

This file stores sensitive info (like database passwords).  
**NEVER commit this to GitHub** (it's like leaving your house keys on the sidewalk).

**What goes here:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-secret-key-here
```

**Where you get these:**
1. Create a Supabase account
2. Create a new project
3. Go to Settings → API
4. Copy the URL and Key
5. Paste into `.env.local`

**Why "NEXT_PUBLIC"?**  
Means this variable is safe to expose to browsers (it's not a super-secret password).

---

## 🗄️ Database Architecture (How We Store Songs)

### **The Table: `songs`**

Think of a table like a spreadsheet.

| Column           | What It Stores                      | Example              |
|------------------|-------------------------------------|----------------------|
| id               | Unique song identifier              | abc-123-def-456      |
| title            | Song name                           | "Stand By Me"        |
| artist           | Who made it                         | "Ben E. King"        |
| original_key     | What key it's in                    | "A"                  |
| tempo_bpm        | Speed (beats per minute)            | 120                  |
| time_signature   | Time signature                      | "4/4"                |
| genre            | Music style                         | "Soul"               |
| difficulty       | How hard to play                    | "beginner"           |
| chord_progression| All the chords (stored as JSON)     | {sections: [...]}    |
| created_at       | When added to database              | 2025-10-25           |

---

### **JSONB for Chord Progressions**

**Why JSONB?**  
It's flexible. We can store complex chord data without making 10 different tables.

**Example of what's stored in `chord_progression`:**
```json
{
  "sections": [
    {
      "name": "Verse",
      "order": 1,
      "chords": [
        {"chord": "C", "beats": 4},
        {"chord": "Am", "beats": 4},
        {"chord": "F", "beats": 2},
        {"chord": "G", "beats": 2}
      ]
    },
    {
      "name": "Chorus",
      "order": 2,
      "chords": [
        {"chord": "F", "beats": 4},
        {"chord": "G", "beats": 4}
      ]
    }
  ]
}
```

**Translation:**
- Song has sections (Verse, Chorus, Bridge)
- Each section has chords
- Each chord has a name ("C") and duration (4 beats = 1 measure)

**Why this is good:**
- Easy to update (just edit the JSON)
- Fast to build (no complex database setup)
- Can migrate to a fancier structure later if needed

---

## 🎨 How the Chord Visualizers Work

### **Step 1: Design in Figma**
You open Figma and draw a beautiful piano keyboard (or guitar fretboard).

### **Step 2: Export as SVG**
Figma gives you code that looks like this:
```svg
<svg width="800" height="200">
  <rect x="0" y="0" width="50" height="200" fill="#ffffff"/>
  <rect x="50" y="0" width="50" height="200" fill="#ffffff"/>
  ...
</svg>
```

**SVG = Scalable Vector Graphics**  
It's like instructions for drawing shapes. "Draw a rectangle here, another one there."

### **Step 3: Paste into React Component**
You paste that code into `PianoVisualizer.tsx`.

### **Step 4: Make It Dynamic**
Change the static colors to dynamic ones:

**Before (static):**
```svg
<rect fill="#ffffff"/> <!-- Always white -->
```

**After (dynamic):**
```svg
<rect fill={isActive ? '#3B82F6' : '#ffffff'}/> <!-- Blue if active, white if not -->
```

### **Step 5: Your Code Controls It**
When the chord changes to "C major", your code says:
- "C key should be blue"
- "E key should be blue"
- "G key should be blue"
- All other keys stay white

**Result:** Users see which keys to press for each chord in real-time! 🎹

---

## 🎵 How the Metronome Works (Tone.js)

### **The Problem with Regular Timers**
JavaScript has a built-in timer called `setInterval`, but it's not precise enough for music.  
**Why?** If your computer gets busy, the timer slows down. After 5 minutes, you're off beat.

### **The Solution: Tone.js**
Tone.js is built specifically for music. It uses the Web Audio API (browser's audio engine) which is super precise.

### **How It Works:**

**1. Load a Sound**
```javascript
const player = new Tone.Player('/sounds/metronome-click.wav');
```
Translation: "Load the click sound into memory."

**2. Set the BPM**
```javascript
Tone.Transport.bpm.value = 120;
```
Translation: "Play 120 beats per minute."

**3. Schedule Repeating Clicks**
```javascript
new Tone.Loop((time) => {
  player.start(time); // Play the click
  onBeat(beatCount++); // Tell the app "a beat happened"
}, '4n'); // Every quarter note
```
Translation: "Every quarter note, play the click and update the screen."

**4. Change Tempo in Real-Time**
```javascript
Tone.Transport.bpm.value = 140; // Speed up to 140 BPM
```
Translation: "Instantly change speed without stopping."

---

### **Audio Sample Strategy**

**Option A: Upload one file per sound, speed it up/down**  
❌ Problem: Speeding up changes pitch (sounds weird)

**Option B: Upload 100 files (one for each BPM)**  
❌ Problem: Way too many files

**Option C (What we're doing): One-shot samples**  
✅ Upload one short "click" sound  
✅ Tone.js plays it repeatedly at any BPM  
✅ No pitch issues

**Your files:**
```
/public/sounds/
  metronome-click.wav   (digital beep)
  shaker-click.wav      (shaker sound)
  drum-click.wav        (kick drum)
```

**User can switch sounds** via a dropdown in the UI. Same timing, different sound.

---

## 🌐 State Management (The App's Memory)

### **What is "State"?**
State = data that changes over time.

**Examples:**
- Is the song playing? (true/false)
- What's the current tempo? (120 BPM)
- Which chord are we on? (Chord #3)
- Which instrument is selected? (guitar/piano)

### **The Problem Without State Management**
Every component has its own memory → they get out of sync.

**Example:**
- Play button thinks song is playing ✅
- Metronome thinks song is paused ❌
- Result: Chaos

### **The Solution: Zustand**
One central "store" that everyone reads from.

**The Store (usePlayerStore.ts):**
```typescript
{
  isPlaying: false,
  tempo: 120,
  currentChordIndex: 0,
  selectedInstrument: 'guitar',
  
  // Actions
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setTempo: (bpm) => set({ tempo: bpm }),
}
```

**Any component can access it:**
```javascript
const { isPlaying, tempo, play, pause } = usePlayerStore();
```

**Result:** Everyone sees the same data. No confusion.

---

## 🚀 Deployment (Putting Your App Online)

### **What is Vercel?**
A hosting service that makes your website accessible worldwide.

### **How It Works:**

**1. You push code to GitHub**
```bash
git add .
git commit -m "Added piano visualizer"
git push origin main
```

**2. Vercel detects the change**
"Oh, new code! Let me build it."

**3. Vercel builds your app**
- Runs TypeScript compiler
- Bundles all your code
- Optimizes images
- Creates a production-ready website

**4. Deploys it live**
30 seconds later: `radio-jamm.vercel.app` is updated! 🎉

**5. You can visit your live site**
Anyone in the world can now access it.

---

### **Setting Up Vercel:**

**1. Connect GitHub**
- Go to vercel.com
- Click "Import Project"
- Select your GitHub repo

**2. Add Environment Variables**
- Go to Project Settings → Environment Variables
- Add your Supabase URL and Key
- (These are secret, so they don't go in GitHub)

**3. Click Deploy**
Done! You get a free URL like `radio-jamm.vercel.app`.

**4. Custom Domain (Optional)**
Later, you can connect your own domain like `radiojamm.com`.

---

## 📊 TypeScript Interfaces (Data Blueprints)

### **What are Interfaces?**
Descriptions of what your data looks like.

**Example:**
```typescript
interface Song {
  id: string;
  title: string;
  artist: string;
  tempo_bpm: number;
  chord_progression: ChordProgression;
}
```

**Translation:**
"A Song must have an id (text), title (text), artist (text), tempo (number), and chord progression."

**Why This Helps:**
If you accidentally write:
```typescript
song.tempo_bpm = "one hundred twenty"; // ❌ Should be a number!
```

TypeScript yells at you: "Hey, tempo_bpm needs to be a number, not text!"

**Catches bugs before they happen.** ✅

---

## 🔍 Performance Optimization (Making It Fast)

### **Initial Load (First Time Someone Visits)**

**What Next.js does automatically:**
- **Code splitting:** Only loads code needed for current page
- **Server-side rendering:** Builds HTML on server (fast first paint)
- **Image optimization:** Compresses images automatically

**What you do:**
- Keep audio files small (compressed WAV or MP3)
- Use SVG instead of PNG (smaller files)

**Goal:** Page loads in under 3 seconds.

---

### **Runtime (While Using the App)**

**Tone.js timing:** Stays perfectly in sync (no drift)  
**React memo:** Doesn't re-render visualizers unless chord changes  
**Debounce tempo slider:** Only updates after you stop moving the slider (not 100 times per second)

**Result:** Smooth, responsive experience.

---

## 🐛 Error Handling (What If Things Go Wrong?)

### **Database Errors**
**Problem:** Supabase is down or song doesn't exist  
**Solution:** Show friendly message "Could not load songs. Please try again."

### **Audio Errors**
**Problem:** Browser blocks audio (security reasons)  
**Solution:** Show message "Please click to enable audio" with a button

### **Network Errors**
**Problem:** User loses internet connection  
**Solution:** Retry request automatically, show loading spinner

**Goal:** Never show ugly error messages. Always be helpful.

---

## ✅ MVP Checklist (How You Know You're Done)

Before launching, make sure:

**Infrastructure:**
- [ ] Next.js project created
- [ ] Supabase database set up
- [ ] Environment variables configured

**Database:**
- [ ] Songs table created
- [ ] 10-50 songs added

**Core Features:**
- [ ] Metronome plays in time
- [ ] Chords display correctly
- [ ] Piano visualizer works
- [ ] Guitar visualizer works
- [ ] Tempo slider adjusts speed
- [ ] Song search finds songs

**Deployment:**
- [ ] Code on GitHub
- [ ] Live on Vercel
- [ ] Friends can access the URL
- [ ] Works on phones

**When all checked:** You're ready to launch! 🚀

---

## 🎓 Summary: What Each Tool Does in One Sentence

- **Next.js:** Builds fast websites with React
- **React:** Breaks UI into reusable components
- **TypeScript:** Catches mistakes before they happen
- **Tailwind:** Styles things quickly with pre-made classes
- **Shadcn/ui:** Beautiful pre-built components (buttons, sliders, etc.)
- **Figma:** Design tool for creating visualizers
- **Supabase:** Database that stores song data
- **Tone.js:** Keeps perfect musical timing for metronome
- **Zustand:** Remembers what's happening in the app (state)
- **Vercel:** Hosts your website and makes it live

**Together:** They let you build a professional music app without starting from scratch!

---

**Questions?** This guide should demystify the tech spec. If anything is still confusing, just ask!