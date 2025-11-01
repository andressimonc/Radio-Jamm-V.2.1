# 🎸 RADIO JAMM

**Find Your Next Jam Session**

A mobile-first web app for musicians to search songs, see real-time chord progressions, and practice with an interactive metronome.

---

## ✨ Features

- **🔍 Song Search** - Fast full-text search by title or artist
- **🎹 Real-Time Chord Display** - Large, readable chord names that auto-advance
- **🎼 Piano & Guitar Visualizers** - Interactive instrument visualizers that highlight active notes
- **⏱️ Metronome Engine** - Precise Tone.js-powered metronome with 3 click sounds
- **🎚️ Tempo Control** - Adjust BPM from 40-240 with smooth slider + presets
- **👀 Upcoming Chords** - Preview next 3 chords
- **📱 Mobile-First** - Touch-friendly interface optimized for phones

---

## 🚀 Quick Start

### **1. Install Dependencies**
```bash
npm install
```

### **2. Set Up Supabase Database**

Follow the guide in `SUPABASE-SETUP.md`:
1. Create songs table
2. Insert 3 seed songs (Stand By Me, Wonderwall, Let It Be)
3. Verify data

### **3. Configure Environment Variables**

Your `.env.local` should already have:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### **4. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎯 How to Use

1. **Search** for a song (e.g., "stand")
2. **Click** a song to open the playback page
3. **Adjust** tempo if needed
4. **Choose** Piano or Guitar visualizer
5. **Click Play** to start the metronome
6. **Watch** chords advance automatically in sync with the beat!

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui + Lucide Icons
- **Database**: Supabase (PostgreSQL with JSONB)
- **Audio**: Tone.js
- **State**: Zustand
- **Fonts**: Space Grotesk + Inter (via next/font)

---

## 📂 Project Structure

```
radio-jamm/
├── app/                      # Next.js pages
│   ├── page.tsx             # Homepage (search)
│   └── songs/[id]/page.tsx  # Song playback page
├── components/              # React components
│   ├── layout/              # Header, Footer, PageWrapper
│   ├── search/              # SearchBar, SearchResults
│   ├── song-info/           # SongHeader
│   ├── chord-display/       # ChordDisplay
│   ├── visualizers/         # Piano, Guitar, InstrumentToggle
│   ├── metronome/           # All metronome controls
│   └── ui/                  # Shadcn/ui components
├── lib/                     # Utilities
│   ├── types.ts             # TypeScript interfaces
│   ├── supabase.ts          # Database client
│   ├── chord-parser.ts      # Chord → notes converter
│   ├── metronome-engine.ts  # Tone.js wrapper
│   ├── utils.ts             # Helpers
│   └── data/seed-songs.json # Test data
├── hooks/                   # Custom React hooks
│   └── useMetronome.ts
├── store/                   # Zustand state
│   └── usePlayerStore.ts
├── public/
│   ├── sounds/              # Metronome audio files
│   └── visualizers/         # SVG assets
└── docs/                    # All blueprints

```

---

## 📋 Documentation

- **BUILD-STATUS.md** - Complete build status and what's working
- **SUPABASE-SETUP.md** - Step-by-step database setup guide
- **docs/** - All 9 blueprint documents (PRD, Tech Spec, etc.)

---

## 🧪 Testing

See `BUILD-STATUS.md` for detailed test scenarios.

**Quick Test**:
1. Search for "stand"
2. Click "Stand By Me"
3. Click Play
4. Verify chords advance every 4 beats

---

## 🎨 Design System

**Colors**:
- Sky Blue `#97DFFC` - Active piano keys
- Periwinkle `#858AE3` - Secondary highlights
- Royal Purple `#613DC1` - Primary buttons
- Deep Purple `#4E148C` - Hover states
- Dark Plum `#2C0735` - Text

**Typography**:
- Display: Space Grotesk (headings, chords)
- Body: Inter (everything else)

---

## 🚢 Deployment

### **Vercel** (Recommended)
```bash
vercel
```

### **Environment Variables**
Make sure to add your Supabase credentials in Vercel dashboard.

---

## 🐛 Known Limitations (MVP)

- Limited guitar chord shapes (~10 common chords)
- No transposition (songs play in original key)
- No user authentication (public read-only)
- Basic visualizers (CSS-based, not advanced SVG)

These are intentional MVP scope decisions!

---

## 📝 Adding More Songs

Use the SQL template in `SUPABASE-SETUP.md` to add songs to your database.

---

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

---

## 📄 License

MIT

---

**Built with ❤️ for musicians who love to jam! 🎸✨**
