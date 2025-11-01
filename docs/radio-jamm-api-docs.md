# RADIO JAMM — API Documentation

## 📖 Overview

RADIO JAMM uses **Supabase** for all data operations. Supabase automatically generates a REST API from your database schema, so you don't need to write backend endpoints.

**All API calls are made using the Supabase JavaScript client.**

---

## 🔌 API Architecture

### **Technology**
- **Database:** PostgreSQL (via Supabase)
- **Client Library:** `@supabase/supabase-js`
- **Auto-generated:** REST API endpoints
- **Authentication:** Public read access (no login required for MVP)

### **Base Configuration**

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Environment Variables** (in `.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🎵 API Endpoints

### **1. Search Songs**

**Purpose:** Find songs matching user's search query (title or artist)

**Use Case:** Homepage search functionality

**Code Example:**

```typescript
import { supabase } from '@/lib/supabase';

async function searchSongs(query: string) {
  const { data, error } = await supabase
    .from('songs')
    .select('id, title, artist, tempo_bpm, original_key')
    .or(`title.ilike.%${query}%,artist.ilike.%${query}%`)
    .order('title', { ascending: true })
    .limit(10);

  if (error) {
    console.error('Error searching songs:', error);
    return [];
  }

  return data;
}

// Usage
const results = await searchSongs('stand');
```

**What this does:**
- Searches both `title` and `artist` columns
- `ilike` = case-insensitive search
- `%` = wildcard (matches "Stand By Me", "stand by", etc.)
- Returns up to 10 results
- Ordered alphabetically by title

**Response Format:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Stand By Me",
    "artist": "Ben E. King",
    "tempo_bpm": 120,
    "original_key": "A"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Stand By You",
    "artist": "Rachel Platten",
    "tempo_bpm": 95,
    "original_key": "C"
  }
]
```

---

### **2. Get Song by ID**

**Purpose:** Fetch complete song data including chord progression

**Use Case:** Song detail page (when user selects a song)

**Code Example:**

```typescript
import { supabase } from '@/lib/supabase';
import { Song } from '@/lib/types';

async function getSongById(id: string): Promise<Song | null> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching song:', error);
    return null;
  }

  return data;
}

// Usage
const song = await getSongById('550e8400-e29b-41d4-a716-446655440000');
```

**What this does:**
- `select('*')` = Get all columns
- `eq('id', id)` = Where id equals the provided id
- `.single()` = Expect exactly one result (returns object, not array)

**Response Format:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Stand By Me",
  "artist": "Ben E. King",
  "original_key": "A",
  "tempo_bpm": 120,
  "time_signature": "4/4",
  "genre": "Soul",
  "difficulty": "beginner",
  "chord_progression": {
    "sections": [
      {
        "name": "Verse",
        "order": 1,
        "chords": [
          {"chord": "A", "beats": 4},
          {"chord": "F#m", "beats": 4},
          {"chord": "D", "beats": 4},
          {"chord": "E", "beats": 4}
        ]
      },
      {
        "name": "Chorus",
        "order": 2,
        "chords": [
          {"chord": "A", "beats": 4},
          {"chord": "F#m", "beats": 4},
          {"chord": "D", "beats": 2},
          {"chord": "E", "beats": 2},
          {"chord": "A", "beats": 4}
        ]
      }
    ]
  },
  "created_at": "2025-10-25T14:30:00.000Z",
  "updated_at": "2025-10-25T14:30:00.000Z"
}
```

---

### **3. Get All Songs (Optional - For Testing)**

**Purpose:** Fetch all songs (useful for testing, debugging, or future "browse all" feature)

**Code Example:**

```typescript
async function getAllSongs() {
  const { data, error } = await supabase
    .from('songs')
    .select('id, title, artist, tempo_bpm, genre, difficulty')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching all songs:', error);
    return [];
  }

  return data;
}
```

**Note:** For MVP, this isn't used in the UI (search-first approach), but useful for development.

---

## 🛡️ Error Handling

### **Standard Error Pattern**

Every Supabase query returns `{ data, error }`. Always check for errors:

```typescript
const { data, error } = await supabase.from('songs').select('*');

if (error) {
  console.error('Database error:', error);
  // Show user-friendly message
  return null; // or throw error, or return default value
}

// Safe to use data here
return data;
```

### **Common Error Scenarios**

**1. Song Not Found**
```typescript
const { data, error } = await supabase
  .from('songs')
  .select('*')
  .eq('id', 'invalid-id')
  .single();

// error will be: { message: "JSON object requested, multiple (or no) rows returned" }
```

**Solution:**
```typescript
if (error || !data) {
  return null; // Handle gracefully
}
```

**2. Network Error**
```typescript
// User's internet drops mid-request
// error will be: { message: "Failed to fetch" }
```

**Solution:**
```typescript
if (error) {
  if (error.message.includes('fetch')) {
    // Show "Check your connection" message
  }
  return null;
}
```

**3. Empty Search Results**
```typescript
const { data, error } = await supabase
  .from('songs')
  .select('*')
  .ilike('title', '%zzzzz%');

// data = [] (empty array, not an error)
```

**Solution:**
```typescript
if (!error && data.length === 0) {
  // Show "No results found" message
}
```

---

## 🎯 Usage Patterns

### **In Server Components (Next.js App Router)**

**File:** `app/page.tsx` (Homepage)

```typescript
import { supabase } from '@/lib/supabase';

export default async function HomePage() {
  // Fetch happens on server (fast initial load)
  const { data: songs } = await supabase
    .from('songs')
    .select('id, title, artist')
    .limit(50);

  return (
    <div>
      <SearchBar songs={songs} />
    </div>
  );
}
```

**Benefits:**
- ✅ Data fetched on server (SEO-friendly)
- ✅ Fast initial page load
- ✅ No loading spinner needed

---

### **In Client Components (React Hooks)**

**File:** `components/song-list/SongSearch.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function SongSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function search() {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      const { data } = await supabase
        .from('songs')
        .select('id, title, artist')
        .ilike('title', `%${query}%`)
        .limit(10);

      setResults(data || []);
      setLoading(false);
    }

    // Debounce search
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search songs..."
      />
      {loading && <p>Searching...</p>}
      {results.map(song => (
        <div key={song.id}>{song.title} - {song.artist}</div>
      ))}
    </div>
  );
}
```

**Benefits:**
- ✅ Real-time search as user types
- ✅ Debounced (waits 300ms after typing stops)
- ✅ Shows loading state

---

### **In Custom Hooks**

**File:** `hooks/useSongData.ts`

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Song } from '@/lib/types';

export function useSongData(songId: string) {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSong() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('songs')
        .select('*')
        .eq('id', songId)
        .single();

      if (fetchError) {
        setError('Could not load song');
        setSong(null);
      } else {
        setSong(data);
      }

      setLoading(false);
    }

    fetchSong();
  }, [songId]);

  return { song, loading, error };
}

// Usage in component
const { song, loading, error } = useSongData(songId);
```

---

## 🚀 Performance Optimization

### **1. Select Only Needed Columns**

**Bad (fetches everything):**
```typescript
const { data } = await supabase.from('songs').select('*');
```

**Good (fetches only what's displayed):**
```typescript
const { data } = await supabase
  .from('songs')
  .select('id, title, artist'); // Smaller payload, faster load
```

### **2. Limit Results**

```typescript
const { data } = await supabase
  .from('songs')
  .select('*')
  .limit(10); // Don't fetch 1000 songs for a search dropdown
```

### **3. Use Indexes**

Already configured in DATABASE_SCHEMA.md:
- `songs_title_search_idx` (fast title search)
- `songs_artist_search_idx` (fast artist search)

No additional work needed—indexes are already created!

---

## 🧪 Testing Queries

### **In Supabase Dashboard (SQL Editor)**

Test queries before writing code:

```sql
-- Test search
SELECT id, title, artist 
FROM songs 
WHERE title ILIKE '%stand%' OR artist ILIKE '%stand%'
ORDER BY title
LIMIT 10;

-- Test get by ID
SELECT * 
FROM songs 
WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

### **In Browser Console (JavaScript)**

```javascript
// Open browser console on your deployed site
const { data } = await supabase.from('songs').select('*').limit(5);
console.log(data);
```

---

## 📊 Response Data Types

### **TypeScript Interfaces**

**File:** `src/lib/types.ts`

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
```

**Usage:**
```typescript
import { Song } from '@/lib/types';

async function getSong(id: string): Promise<Song | null> {
  const { data } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();
  
  return data; // TypeScript knows the shape!
}
```

---

## 🔄 Real-time Updates (Future Feature)

Supabase supports real-time subscriptions. Not needed for MVP, but here's how it would work:

```typescript
// Subscribe to new songs being added
const subscription = supabase
  .channel('songs_channel')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'songs' },
    (payload) => {
      console.log('New song added:', payload.new);
    }
  )
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

**Use case (Phase 2+):** Show new community-submitted songs in real-time.

---

## 📝 Quick Reference Cheat Sheet

```typescript
// Search songs
supabase.from('songs').select('*').ilike('title', '%query%')

// Get by ID
supabase.from('songs').select('*').eq('id', id).single()

// Get all
supabase.from('songs').select('*').order('title')

// Filter by genre
supabase.from('songs').select('*').eq('genre', 'Rock')

// Combine filters
supabase.from('songs').select('*')
  .eq('genre', 'Rock')
  .eq('difficulty', 'beginner')
  .order('title')
  .limit(20)
```

---

## ✅ API Implementation Checklist

Before using in production:

- [ ] Supabase client configured (`src/lib/supabase.ts`)
- [ ] Environment variables set in `.env.local`
- [ ] Environment variables added to Vercel
- [ ] TypeScript types defined (`src/lib/types.ts`)
- [ ] Error handling implemented in all queries
- [ ] Loading states shown to users
- [ ] Queries tested in Supabase dashboard
- [ ] Indexes created (from DATABASE_SCHEMA.md)
- [ ] RLS policies enabled (public read access)

---

## 🎯 Summary

**For RADIO JAMM MVP, you need exactly 2 API operations:**

1. **Search songs** → `supabase.from('songs').select(...).ilike(...)`
2. **Get song by ID** → `supabase.from('songs').select('*').eq('id', id).single()`

Everything else (metronome timing, current chord, tempo adjustments) happens in the frontend with no API calls.

**Simple, fast, and exactly what you need.** 🎸

---

**Document Version:** 1.0  
**Last Updated:** October 25, 2025  
**Status:** API Documentation Complete — Ready for Component Library Phase