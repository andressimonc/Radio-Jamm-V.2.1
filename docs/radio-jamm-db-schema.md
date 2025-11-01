# RADIO JAMM — Database Schema

## 🗄️ Database Overview

**Database Type:** PostgreSQL (via Supabase)  
**Approach:** JSONB storage for chord progressions (MVP)  
**Total Tables:** 1 (`songs`)  
**Rationale:** Simple, flexible, fast to build. Can normalize later if needed.

---

## 📊 Table: `songs`

### **Purpose**
Stores all song metadata and chord progressions for the jam session library.

### **Schema Definition**

```sql
CREATE TABLE songs (
  -- Primary Key
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Song Metadata
  title text NOT NULL,
  artist text NOT NULL,
  original_key text NOT NULL,
  tempo_bpm integer NOT NULL,
  time_signature text NOT NULL DEFAULT '4/4',
  genre text,
  difficulty text DEFAULT 'intermediate',
  
  -- Chord Data (Flexible JSONB)
  chord_progression jsonb NOT NULL,
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

---

## 📋 Column Specifications

| Column             | Type         | Constraints           | Description                                    | Example Value           |
|--------------------|--------------|-----------------------|------------------------------------------------|-------------------------|
| `id`               | uuid         | PRIMARY KEY           | Unique identifier for each song                | `a1b2c3d4-e5f6-...`    |
| `title`            | text         | NOT NULL              | Song name                                      | `"Stand By Me"`         |
| `artist`           | text         | NOT NULL              | Artist or band name                            | `"Ben E. King"`         |
| `original_key`     | text         | NOT NULL              | Musical key the song is written in             | `"A"`, `"Dm"`, `"F#"`   |
| `tempo_bpm`        | integer      | NOT NULL, >= 40, <= 240 | Beats per minute (original song tempo)        | `120`                   |
| `time_signature`   | text         | NOT NULL, DEFAULT '4/4' | Time signature                                | `"4/4"`, `"3/4"`, `"6/8"` |
| `genre`            | text         | NULL allowed          | Musical genre/style                            | `"Rock"`, `"Blues"`, `"Soul"` |
| `difficulty`       | text         | DEFAULT 'intermediate' | Skill level required                          | `"beginner"`, `"intermediate"`, `"advanced"` |
| `chord_progression`| jsonb        | NOT NULL              | Complete song structure with chords            | See JSONB structure below |
| `created_at`       | timestamptz  | NOT NULL, DEFAULT now() | When the record was created                  | `2025-10-25 14:30:00+00` |
| `updated_at`       | timestamptz  | NOT NULL, DEFAULT now() | Last modification timestamp                  | `2025-10-25 14:30:00+00` |

---

## 🎵 JSONB Structure: `chord_progression`

### **Format**

```json
{
  "sections": [
    {
      "name": "string",
      "order": number,
      "chords": [
        {
          "chord": "string",
          "beats": number
        }
      ]
    }
  ]
}
```

### **Field Definitions**

**`sections`** (array)
- Contains all parts of the song (Intro, Verse, Chorus, Bridge, Outro)
- Each section is an object

**`name`** (string)
- Section identifier shown to users
- Common values: `"Intro"`, `"Verse"`, `"Chorus"`, `"Bridge"`, `"Outro"`, `"Solo"`, `"Pre-Chorus"`

**`order`** (number)
- Playback sequence (1, 2, 3, ...)
- Determines which section plays when

**`chords`** (array of chord objects)
- Each chord has a name and duration

**`chord`** (string)
- Chord name in standard notation
- Examples: `"C"`, `"Am"`, `"G7"`, `"Fmaj7"`, `"Dm9"`, `"E♭"`

**`beats`** (number)
- Duration in beats (not measures)
- In 4/4 time: 4 beats = 1 measure
- Examples: `4` (whole measure), `2` (half measure), `8` (two measures)

---

## 📝 Example Record

### **Song: "Stand By Me" by Ben E. King**

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
        "name": "Intro",
        "order": 1,
        "chords": [
          {"chord": "A", "beats": 4},
          {"chord": "F#m", "beats": 4},
          {"chord": "D", "beats": 4},
          {"chord": "E", "beats": 4}
        ]
      },
      {
        "name": "Verse",
        "order": 2,
        "chords": [
          {"chord": "A", "beats": 4},
          {"chord": "A", "beats": 4},
          {"chord": "F#m", "beats": 4},
          {"chord": "F#m", "beats": 4},
          {"chord": "D", "beats": 4},
          {"chord": "E", "beats": 4},
          {"chord": "A", "beats": 4},
          {"chord": "A", "beats": 4}
        ]
      },
      {
        "name": "Chorus",
        "order": 3,
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

## 🔍 Indexes for Performance

### **Text Search Indexes (GIN)**

```sql
-- Search by song title (full-text search)
CREATE INDEX songs_title_search_idx 
ON songs 
USING gin(to_tsvector('english', title));

-- Search by artist name (full-text search)
CREATE INDEX songs_artist_search_idx 
ON songs 
USING gin(to_tsvector('english', artist));
```

**Why GIN (Generalized Inverted Index)?**
- Optimized for full-text search
- Allows searching for "stand" and finding "Stand By Me"
- Case-insensitive, handles partial matches

---

### **Filter Indexes (B-tree)**

```sql
-- Filter by genre
CREATE INDEX songs_genre_idx 
ON songs(genre);

-- Filter by difficulty
CREATE INDEX songs_difficulty_idx 
ON songs(difficulty);

-- Sort by title (alphabetical)
CREATE INDEX songs_title_alpha_idx 
ON songs(title);
```

**Why B-tree (default)?**
- Fast equality checks (`WHERE genre = 'Rock'`)
- Efficient sorting (`ORDER BY title`)
- Good for filtering and sorting operations

---

## 🔒 Row Level Security (RLS)

### **Public Read Access (MVP)**

For MVP, all songs are publicly readable (no authentication required).

```sql
-- Enable RLS on the table
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read songs
CREATE POLICY "Public songs are viewable by everyone"
ON songs FOR SELECT
USING (true);
```

### **Admin-Only Write Access**

Only authenticated admins can add/edit/delete songs (for now, this is you via Supabase dashboard).

```sql
-- Block public inserts/updates/deletes (only via dashboard)
CREATE POLICY "Only admins can modify songs"
ON songs FOR ALL
USING (false);
```

---

## 📊 Database Constraints

### **Validation Rules**

```sql
-- Tempo must be realistic (40-240 BPM)
ALTER TABLE songs 
ADD CONSTRAINT tempo_range 
CHECK (tempo_bpm >= 40 AND tempo_bpm <= 240);

-- Difficulty must be valid
ALTER TABLE songs 
ADD CONSTRAINT valid_difficulty 
CHECK (difficulty IN ('beginner', 'intermediate', 'advanced'));

-- Original key must follow music notation
ALTER TABLE songs 
ADD CONSTRAINT valid_key 
CHECK (original_key ~ '^[A-G][#b♯♭]?m?(aj)?[0-9]?$');
-- Examples: C, Dm, F#, Bbm, Cmaj7
```

### **Data Integrity**

```sql
-- Ensure chord_progression has required structure
ALTER TABLE songs 
ADD CONSTRAINT chord_progression_structure 
CHECK (
  jsonb_typeof(chord_progression) = 'object' AND
  chord_progression ? 'sections' AND
  jsonb_typeof(chord_progression->'sections') = 'array'
);
```

---

## 🌱 Seed Data Strategy

### **Initial Song List (MVP)**

**Goal:** 10-50 songs across multiple genres and difficulty levels

**Genre Distribution:**
- Rock: 30% (15 songs)
- Pop: 20% (10 songs)
- Blues: 15% (8 songs)
- Folk/Country: 15% (8 songs)
- Soul/R&B: 10% (5 songs)
- Other: 10% (5 songs)

**Difficulty Distribution:**
- Beginner: 40% (20 songs) — 3-4 chords, simple progressions
- Intermediate: 50% (25 songs) — 4-6 chords, some variations
- Advanced: 10% (5 songs) — Complex voicings, jazz chords

---

### **Example Seed Songs**

| Song Title              | Artist               | Key | BPM | Genre     | Difficulty   |
|-------------------------|----------------------|-----|-----|-----------|--------------|
| Stand By Me             | Ben E. King          | A   | 120 | Soul      | Beginner     |
| Wonderwall              | Oasis                | Em  | 87  | Rock      | Beginner     |
| Let It Be               | The Beatles          | C   | 76  | Rock      | Beginner     |
| Sweet Home Alabama      | Lynyrd Skynyrd       | G   | 100 | Rock      | Beginner     |
| Knockin' on Heaven's Door | Bob Dylan          | G   | 63  | Folk      | Beginner     |
| Hotel California        | Eagles               | Bm  | 74  | Rock      | Intermediate |
| Free Fallin'            | Tom Petty            | F   | 88  | Rock      | Beginner     |
| Brown Eyed Girl         | Van Morrison         | G   | 144 | Pop       | Beginner     |
| Wild Horses             | Rolling Stones       | Bm  | 78  | Rock      | Intermediate |
| Redemption Song         | Bob Marley           | G   | 75  | Reggae    | Beginner     |

---

## 📄 Seed Data File Format

**File:** `src/data/seed-songs.json`

```json
[
  {
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
    }
  },
  {
    "title": "Wonderwall",
    "artist": "Oasis",
    "original_key": "Em",
    "tempo_bpm": 87,
    "time_signature": "4/4",
    "genre": "Rock",
    "difficulty": "beginner",
    "chord_progression": {
      "sections": [
        {
          "name": "Verse",
          "order": 1,
          "chords": [
            {"chord": "Em", "beats": 4},
            {"chord": "G", "beats": 4},
            {"chord": "D", "beats": 4},
            {"chord": "A7sus4", "beats": 4}
          ]
        },
        {
          "name": "Chorus",
          "order": 2,
          "chords": [
            {"chord": "C", "beats": 4},
            {"chord": "D", "beats": 4},
            {"chord": "Em", "beats": 4},
            {"chord": "Em", "beats": 4}
          ]
        }
      ]
    }
  }
]
```

---

## 🚀 Database Setup Script

### **Supabase SQL Editor Script**

Run this in Supabase SQL Editor to create the complete database:

```sql
-- Create songs table
CREATE TABLE songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  original_key text NOT NULL,
  tempo_bpm integer NOT NULL,
  time_signature text NOT NULL DEFAULT '4/4',
  genre text,
  difficulty text DEFAULT 'intermediate',
  chord_progression jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add constraints
ALTER TABLE songs 
ADD CONSTRAINT tempo_range 
CHECK (tempo_bpm >= 40 AND tempo_bpm <= 240);

ALTER TABLE songs 
ADD CONSTRAINT valid_difficulty 
CHECK (difficulty IN ('beginner', 'intermediate', 'advanced'));

ALTER TABLE songs 
ADD CONSTRAINT chord_progression_structure 
CHECK (
  jsonb_typeof(chord_progression) = 'object' AND
  chord_progression ? 'sections' AND
  jsonb_typeof(chord_progression->'sections') = 'array'
);

-- Create indexes
CREATE INDEX songs_title_search_idx 
ON songs 
USING gin(to_tsvector('english', title));

CREATE INDEX songs_artist_search_idx 
ON songs 
USING gin(to_tsvector('english', artist));

CREATE INDEX songs_genre_idx 
ON songs(genre);

CREATE INDEX songs_difficulty_idx 
ON songs(difficulty);

CREATE INDEX songs_title_alpha_idx 
ON songs(title);

-- Enable RLS
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public songs are viewable by everyone"
ON songs FOR SELECT
USING (true);

-- Admin-only write access (via dashboard)
CREATE POLICY "Only admins can modify songs"
ON songs FOR ALL
USING (false);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_songs_updated_at
BEFORE UPDATE ON songs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

## 📥 Inserting Seed Data

### **Option 1: Supabase Dashboard (Manual)**

1. Go to Supabase → Table Editor → `songs`
2. Click "Insert row"
3. Fill in fields
4. Paste JSON into `chord_progression` field

---

### **Option 2: SQL Insert Script**

```sql
INSERT INTO songs (title, artist, original_key, tempo_bpm, time_signature, genre, difficulty, chord_progression)
VALUES (
  'Stand By Me',
  'Ben E. King',
  'A',
  120,
  '4/4',
  'Soul',
  'beginner',
  '{
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
      }
    ]
  }'::jsonb
);
```

---

### **Option 3: JavaScript Seed Script (Recommended)**

**File:** `scripts/seed-database.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import seedData from '../src/data/seed-songs.json';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Admin key for seeding
);

async function seedDatabase() {
  console.log('Seeding database with songs...');
  
  const { data, error } = await supabase
    .from('songs')
    .insert(seedData);
  
  if (error) {
    console.error('Error seeding database:', error);
  } else {
    console.log(`✅ Successfully seeded ${data?.length || 0} songs`);
  }
}

seedDatabase();
```

**Run with:**
```bash
npx tsx scripts/seed-database.ts
```

---

## 🔄 Future Enhancements (Post-MVP)

### **Phase 2: User Contributions**

Add tables for user-submitted chord progressions:

```sql
CREATE TABLE user_chord_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id uuid REFERENCES songs(id),
  user_id uuid REFERENCES auth.users(id),
  chord_progression jsonb NOT NULL,
  status text DEFAULT 'pending', -- pending, approved, rejected
  submitted_at timestamptz DEFAULT now()
);
```

---

### **Phase 3: Normalize Structure (Optional)**

If the app grows complex, migrate to normalized tables:

```sql
CREATE TABLE sections (
  id uuid PRIMARY KEY,
  song_id uuid REFERENCES songs(id),
  name text,
  order integer
);

CREATE TABLE chords (
  id uuid PRIMARY KEY,
  section_id uuid REFERENCES sections(id),
  chord_name text,
  beats integer,
  order integer
);
```

**Trade-off:**
- ✅ More queryable (find all songs with Am chord)
- ❌ Slower to build
- ❌ More complex queries (need JOINs)

**For MVP: JSONB is perfect.** Migrate only if needed.

---

## 📊 Query Examples

### **Get All Songs (Alphabetical)**

```sql
SELECT id, title, artist, tempo_bpm, genre, difficulty
FROM songs
ORDER BY title ASC;
```

---

### **Search Songs by Title**

```sql
SELECT id, title, artist
FROM songs
WHERE to_tsvector('english', title) @@ plainto_tsquery('english', 'wonderwall');
```

---

### **Filter by Genre and Difficulty**

```sql
SELECT id, title, artist, tempo_bpm
FROM songs
WHERE genre = 'Rock' AND difficulty = 'beginner'
ORDER BY title;
```

---

### **Get Full Song with Chord Progression**

```sql
SELECT *
FROM songs
WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

Returns complete JSON including `chord_progression`.

---

## ✅ Database Setup Checklist

Before development:

- [ ] Supabase project created
- [ ] `songs` table created via SQL script
- [ ] Indexes created
- [ ] RLS policies enabled
- [ ] Constraints added
- [ ] 10-50 songs seeded
- [ ] Test queries work in SQL Editor
- [ ] Connection works from Next.js app

---

**Document Version:** 1.0  
**Last Updated:** October 25, 2025  
**Status:** Database Schema Complete — Ready for User Stories Phase