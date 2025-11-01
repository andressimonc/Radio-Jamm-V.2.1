# RADIO JAMM — Technical Specification

## 🛠️ Tech Stack Overview

### **Core Framework**
- **Next.js:** 15.x (App Router)
- **React:** 18.3+
- **TypeScript:** 5.3+ (Strict Mode enabled)
- **Node.js:** 20.x LTS

### **Styling & UI**
- **Tailwind CSS:** 3.4+
- **Shadcn/ui:** Latest (Radix UI primitives)
- **Lucide React:** 0.263.1 (icons)

### **Design Tools**
- **Figma:** Design instrument visualizers, export as SVG

### **Database & Backend**
- **Supabase:** PostgreSQL database with auto-generated REST API
- **Supabase JS Client:** 2.39+

### **Audio & Timing**
- **Tone.js:** 15.0.4 (music timing, metronome, audio playback)

### **State Management**
- **Zustand:** 4.5+ (global app state)

### **Deployment**
- **Vercel:** Production hosting with automatic deployments
- **Git/GitHub:** Version control

---

## 📦 Package.json Dependencies

```json
{
  "name": "radio-jamm",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@supabase/supabase-js": "^2.39.0",
    "tone": "^15.0.4",
    "zustand": "^4.5.0",
    "lucide-react": "^0.263.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "@radix-ui/react-slider": "^1.1.0",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-label": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 🗂️ Project Structure

```
radio-jamm/
├── public/
│   ├── sounds/                    # Metronome audio samples
│   │   ├── metronome-click.wav
│   │   ├── shaker-click.wav
│   │   └── drum-click.wav
│   └── images/                    # Static assets
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (global providers)
│   │   ├── page.tsx               # Homepage (song list)
│   │   ├── globals.css            # Tailwind imports
│   │   └── songs/
│   │       └── [id]/
│   │           └── page.tsx       # Song detail/playback page
│   │
│   ├── components/
│   │   ├── ui/                    # Shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── select.tsx
│   │   │   └── dialog.tsx
│   │   │
│   │   ├── chord-display/         # Chord visualization components
│   │   │   ├── PianoVisualizer.tsx
│   │   │   ├── GuitarVisualizer.tsx
│   │   │   ├── ChordDisplay.tsx
│   │   │   └── SongStructure.tsx
│   │   │
│   │   ├── metronome/             # Playback controls
│   │   │   ├── MetronomeControls.tsx
│   │   │   ├── TempoSlider.tsx
│   │   │   └── BeatIndicator.tsx
│   │   │
│   │   ├── song-list/             # Song browser
│   │   │   ├── SongCard.tsx
│   │   │   ├── SongSearch.tsx
│   │   │   └── SongGrid.tsx
│   │   │
│   │   └── layout/                # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── SplineBackground.tsx
│   │
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client instance
│   │   ├── types.ts               # TypeScript interfaces
│   │   ├── chord-parser.ts        # Chord → notes mapping logic
│   │   ├── metronome-engine.ts    # Tone.js playback logic
│   │   └── utils.ts               # Helper functions (cn, etc.)
│   │
│   ├── hooks/
│   │   ├── useMetronome.ts        # Custom hook for playback
│   │   ├── useSongData.ts         # Fetch songs from Supabase
│   │   └── useChordProgression.ts # Current chord logic
│   │
│   ├── store/
│   │   └── usePlayerStore.ts      # Zustand global state
│   │
│   └── data/
│       └── seed-songs.json        # Initial song data (for seeding)
│
├── docs/                          # Blueprint documents
│   ├── 01-PRD.md
│   ├── 02-TECH_SPEC.md
│   ├── 03-DATABASE_SCHEMA.md
│   ├── 04-USER_STORIES.md
│   ├── 05-API_DOCUMENTATION.md
│   ├── 06-COMPONENT_LIBRARY.md
│   ├── 07-STYLE_GUIDE.md
│   ├── 08-DATA_FLOW.md
│   └── 09-TESTING_PLAN.md
│
├── .env.local                     # Environment variables
├── .gitignore
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json
└── README.md
```

---

## 🔧 Configuration Files

### **next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['my.spline.design'], // For Spline embeds if using images
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

### **tailwind.config.ts**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors, fonts, and other design tokens will be defined in STYLE_GUIDE.md
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### **tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🔐 Environment Variables

### **.env.local** (Create this file, never commit to Git)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For future features
# CLERK_SECRET_KEY=your-clerk-key (Phase 2: Authentication)
# SPLINE_API_KEY=your-spline-key (if needed)
```

### **Setup Instructions:**
1. Create Supabase project at https://supabase.com
2. Copy Project URL and Anon Key from Settings → API
3. Paste into `.env.local`
4. Add `.env.local` to `.gitignore` (should be there by default)

---

## 🗄️ Database Architecture

### **Approach: JSONB Storage (MVP)**

**Rationale:**
- Fast iteration without complex migrations
- Flexible schema for chord progression data
- Optimal for fixed library size (10-50 songs)
- Can be normalized post-MVP if needed

### **Table: `songs`**

```sql
CREATE TABLE songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  original_key text NOT NULL,
  tempo_bpm integer NOT NULL,
  time_signature text DEFAULT '4/4',
  genre text,
  difficulty text DEFAULT 'intermediate',
  chord_progression jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for search performance
CREATE INDEX songs_title_idx ON songs USING gin(to_tsvector('english', title));
CREATE INDEX songs_artist_idx ON songs USING gin(to_tsvector('english', artist));
CREATE INDEX songs_genre_idx ON songs(genre);
```

### **JSONB Structure for `chord_progression`**

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

**Field Definitions:**
- `sections`: Array of song parts
- `name`: Section identifier (Intro, Verse, Chorus, Bridge, Outro)
- `order`: Playback sequence
- `chord`: Chord name (e.g., "C", "Am7", "Fmaj7")
- `beats`: Duration in beats

---

## 🎵 Metronome Engine Architecture

### **Technology: Tone.js**

**Why Tone.js:**
- Built specifically for music timing (better than setInterval)
- Handles BPM changes smoothly
- Precise scheduling (no drift)
- Can load custom audio samples

### **Core Functionality:**

**File:** `src/lib/metronome-engine.ts`

```typescript
import * as Tone from 'tone';

export class MetronomeEngine {
  private player: Tone.Player;
  private loop: Tone.Loop | null = null;
  
  constructor(soundPath: string) {
    this.player = new Tone.Player(soundPath).toDestination();
  }
  
  async start(bpm: number, onBeat: (beatNumber: number) => void) {
    await Tone.start(); // Required for audio context
    Tone.Transport.bpm.value = bpm;
    
    let beatCount = 0;
    this.loop = new Tone.Loop((time) => {
      this.player.start(time);
      Tone.Draw.schedule(() => {
        onBeat(beatCount++);
      }, time);
    }, '4n'); // Every quarter note
    
    this.loop.start(0);
    Tone.Transport.start();
  }
  
  stop() {
    Tone.Transport.stop();
    this.loop?.stop();
  }
  
  setBPM(bpm: number) {
    Tone.Transport.bpm.value = bpm;
  }
  
  async changeSound(soundPath: string) {
    await this.player.load(soundPath);
  }
}
```

### **Audio Sample Strategy:**

**Approach: One-shot samples**
- Upload single "click" sound per metronome type
- Tone.js repeats it at correct BPM
- No pitch shifting issues
- User can switch sounds dynamically

**File organization:**
```
/public/sounds/
  metronome-click.wav
  shaker-click.wav
  drum-click.wav
```

---

## 🌐 State Management (Zustand)

### **Global State Structure:**

**File:** `src/store/usePlayerStore.ts`

```typescript
import { create } from 'zustand';

interface PlayerState {
  // Playback state
  currentSongId: string | null;
  isPlaying: boolean;
  currentSectionIndex: number;
  currentChordIndex: number;
  
  // User settings
  tempo: number;
  selectedInstrument: 'piano' | 'guitar';
  metronomeSound: 'metronome' | 'shaker' | 'drum';
  
  // Actions
  setSong: (songId: string) => void;
  play: () => void;
  pause: () => void;
  restart: () => void;
  setTempo: (bpm: number) => void;
  setInstrument: (instrument: 'piano' | 'guitar') => void;
  setMetronomeSound: (sound: string) => void;
  advanceChord: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentSongId: null,
  isPlaying: false,
  currentSectionIndex: 0,
  currentChordIndex: 0,
  tempo: 120,
  selectedInstrument: 'guitar',
  metronomeSound: 'metronome',
  
  setSong: (songId) => set({ currentSongId: songId, currentChordIndex: 0 }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  restart: () => set({ currentChordIndex: 0, currentSectionIndex: 0 }),
  setTempo: (bpm) => set({ tempo: bpm }),
  setInstrument: (instrument) => set({ selectedInstrument: instrument }),
  setMetronomeSound: (sound) => set({ metronomeSound: sound }),
  advanceChord: () => set((state) => ({
    currentChordIndex: state.currentChordIndex + 1
  })),
}));
```

**Usage in components:**
```typescript
import { usePlayerStore } from '@/store/usePlayerStore';

const Component = () => {
  const { isPlaying, tempo, play, pause } = usePlayerStore();
  // Use state and actions
};
```

---

## 🎨 Chord Visualizer Technical Approach

### **Implementation Method: Inline SVG with Dynamic Props**

**Why this approach:**
- Full control over individual elements (each key/string)
- Can change colors/states dynamically via React props
- Design exported from Figma as SVG code
- No external dependencies or complex libraries

### **Process:**
1. Design instrument visualizer in Figma
2. Export as SVG
3. Paste SVG code into React component
4. Replace static attributes with dynamic props
5. Add state-driven styling (e.g., `fill={isActive ? 'blue' : 'white'}`)

### **Technical Requirements:**

**Piano Visualizer:**
- Accepts `chord` prop (string)
- Parses chord to extract notes
- Highlights corresponding keys in SVG

**Guitar Visualizer:**
- Accepts `chord` prop (string)
- Maps chord to fret positions
- Renders finger placement indicators

**Both components:**
- Use `viewBox` for responsive scaling
- Accept className prop for Tailwind styling
- Support smooth transitions via CSS

---

## 🎨 Spline Integration (Decorative Only)

### **Usage Scope:**
- Landing page animations
- Loading screens
- Background ambience (optional)

### **NOT used for:**
- ❌ Chord visualizers (those are inline SVG)
- ❌ Interactive UI elements
- ❌ Core functionality

### **Implementation:**

**Embed via iframe:**
```tsx
<iframe
  src="https://my.spline.design/your-scene-id"
  frameBorder="0"
  width="100%"
  height="100%"
  title="Decorative Animation"
/>
```

**Performance considerations:**
- Lazy load Spline embeds
- Use `loading="lazy"` attribute
- Consider opacity/backdrop-filter for subtlety

---

## 🚀 Deployment Configuration

### **Platform: Vercel**

**Why Vercel:**
- Native Next.js support (built by same team)
- Automatic deployments from Git
- Edge network (fast global performance)
- Free tier sufficient for MVP
- Built-in analytics

### **Setup Process:**

1. **Connect Repository:**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Auto-deploy on push to `main` branch

2. **Environment Variables:**
   - Add in Vercel Project Settings → Environment Variables
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Variables available in all environments (Preview + Production)

3. **Build Configuration:**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
   - Node.js Version: 20.x (specify in `package.json` engines field)

4. **Domain:**
   - Default: `radio-jamm.vercel.app`
   - Custom domain can be added later

### **Git Workflow (MVP):**

```bash
# Simple single-branch workflow
git add .
git commit -m "Descriptive commit message"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys to production
# 4. Updates URL
```

**Post-MVP:** Add `dev` branch for staging deployments.

---

## 🔌 API Strategy

### **Supabase Auto-Generated REST API**

**No custom API routes needed for MVP.**

Supabase automatically generates REST endpoints:

```typescript
// Fetch all songs
const { data: songs } = await supabase
  .from('songs')
  .select('*')
  .order('title');

// Fetch single song with full progression
const { data: song } = await supabase
  .from('songs')
  .select('*')
  .eq('id', songId)
  .single();

// Search songs
const { data: results } = await supabase
  .from('songs')
  .select('*')
  .textSearch('title', searchQuery);
```

### **Supabase Client Setup:**

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Usage in Server Components (App Router):**
```typescript
// app/page.tsx
import { supabase } from '@/lib/supabase';

export default async function HomePage() {
  const { data: songs } = await supabase.from('songs').select('*');
  return <SongList songs={songs} />;
}
```

**Usage in Client Components:**
```typescript
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function SongSearch() {
  const [songs, setSongs] = useState([]);
  
  useEffect(() => {
    supabase.from('songs').select('*').then(({ data }) => setSongs(data));
  }, []);
  
  return <div>{/* Render songs */}</div>;
}
```

---

## 🧪 Development Workflow

### **Initial Setup:**

```bash
# 1. Create Next.js app
npx create-next-app@latest radio-jamm --typescript --tailwind --app

# 2. Navigate to project
cd radio-jamm

# 3. Install additional dependencies
npm install @supabase/supabase-js tone zustand

# 4. Install Shadcn/ui
npx shadcn-ui@latest init

# 5. Add Shadcn components as needed
npx shadcn-ui@latest add button card slider select dialog

# 6. Create .env.local and add Supabase credentials

# 7. Start development server
npm run dev
```

### **Running the App:**

```bash
# Development mode (hot reload)
npm run dev

# Production build (test locally)
npm run build
npm start

# Linting
npm run lint
```

### **Development Best Practices:**

1. **Always test in multiple browsers** (Chrome, Safari, Firefox)
2. **Test mobile responsiveness** early and often
3. **Use TypeScript strict mode** — catch bugs at compile time
4. **Commit frequently** with descriptive messages
5. **Test audio functionality** on different devices (iOS, Android, Desktop)

---

## 📊 TypeScript Interfaces

### **File:** `src/lib/types.ts`

```typescript
export interface Song {
  id: string;
  title: string;
  artist: string;
  original_key: string;
  tempo_bpm: number;
  time_signature: string;
  genre: string | null;
  difficulty: string;
  chord_progression: ChordProgression;
  created_at: string;
  updated_at: string;
}

export interface ChordProgression {
  sections: Section[];
}

export interface Section {
  name: string;
  order: number;
  chords: ChordItem[];
}

export interface ChordItem {
  chord: string;
  beats: number;
}

export interface FingerPosition {
  string: number; // 1-6 for guitar
  fret: number;   // 0 = open, 1+ = fret number
}

export type Instrument = 'piano' | 'guitar';
export type MetronomeSound = 'metronome' | 'shaker' | 'drum';
```

---

## 🔍 Performance Optimization Strategy

### **Initial Load:**
- Next.js automatic code splitting
- Server-side rendering for song list (fast initial paint)
- Lazy load Spline embeds
- Optimize audio file sizes (compressed WAV or MP3)

### **Runtime:**
- Tone.js handles precise timing (no CPU drift)
- React memo for expensive visualizer renders
- Debounce tempo slider to avoid excessive updates
- Prefetch song data on hover (faster navigation)

### **Bundle Size:**
- Tree-shake unused Radix UI components
- Dynamic import for Tone.js (only load on song page)
- SVG instead of image formats (smaller, scalable)

---

## 🐛 Error Handling Strategy

### **Database Errors:**
```typescript
const { data, error } = await supabase.from('songs').select('*');

if (error) {
  console.error('Database error:', error);
  // Show user-friendly error message
  return <ErrorState message="Could not load songs" />;
}
```

### **Audio Errors:**
```typescript
try {
  await Tone.start();
  metronome.start(tempo, onBeat);
} catch (error) {
  console.error('Audio error:', error);
  // Inform user to check browser permissions
  alert('Please allow audio playback in your browser');
}
```

### **Network Errors:**
- Implement retry logic for failed requests
- Show loading states during fetches
- Graceful degradation if Spline fails to load

---

## 📝 Code Quality Tools

### **ESLint Configuration:**
- Next.js recommended rules
- TypeScript strict rules
- React hooks rules

### **Prettier Configuration:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### **Git Hooks (Optional):**
- Pre-commit: Run ESLint
- Pre-push: Run type checking (`tsc --noEmit`)

---

## ✅ MVP Technical Checklist

### **Infrastructure:**
- [ ] Next.js 15 project initialized
- [ ] TypeScript strict mode enabled
- [ ] Tailwind CSS configured
- [ ] Shadcn/ui installed
- [ ] Supabase project created
- [ ] Environment variables set

### **Database:**
- [ ] `songs` table created
- [ ] Indexes added for search
- [ ] Seed data script ready

### **Core Functionality:**
- [ ] Supabase client configured
- [ ] Zustand store created
- [ ] Tone.js metronome engine implemented
- [ ] Chord parsing logic written

### **Components:**
- [ ] Piano visualizer (inline SVG)
- [ ] Guitar visualizer (inline SVG)
- [ ] Metronome controls
- [ ] Tempo slider
- [ ] Song list/search

### **Deployment:**
- [ ] GitHub repository created
- [ ] Vercel project connected
- [ ] Environment variables set in Vercel
- [ ] Successful build test

---

**Document Version:** 1.0  
**Last Updated:** October 25, 2025  
**Status:** Technical Architecture Complete — Ready for Database Schema Phase