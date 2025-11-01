# 🗄️ RADIO JAMM — Supabase Database Setup Guide

## ✅ What You Need

Your Supabase credentials are already configured in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📋 Step-by-Step Setup

### **Step 1: Access Supabase SQL Editor**

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your project
3. Navigate to **SQL Editor** in the left sidebar

---

### **Step 2: Create the Songs Table**

Copy and paste this entire SQL script into the SQL Editor and click **Run**:

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

-- Create indexes for search performance
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

-- Enable Row Level Security
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view songs)
CREATE POLICY "Public songs are viewable by everyone"
ON songs FOR SELECT
USING (true);

-- Admin-only write access
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
$$ language 'plpgsql';

CREATE TRIGGER update_songs_updated_at BEFORE UPDATE ON songs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

✅ **Expected Result**: You should see "Success. No rows returned" in the SQL Editor.

---

### **Step 3: Insert Seed Data (3 Songs)**

Copy and paste this SQL to insert the 3 test songs:

```sql
-- Insert Stand By Me
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
  }'::jsonb
);

-- Insert Wonderwall
INSERT INTO songs (title, artist, original_key, tempo_bpm, time_signature, genre, difficulty, chord_progression)
VALUES (
  'Wonderwall',
  'Oasis',
  'Em',
  87,
  '4/4',
  'Rock',
  'beginner',
  '{
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
  }'::jsonb
);

-- Insert Let It Be
INSERT INTO songs (title, artist, original_key, tempo_bpm, time_signature, genre, difficulty, chord_progression)
VALUES (
  'Let It Be',
  'The Beatles',
  'C',
  76,
  '4/4',
  'Rock',
  'beginner',
  '{
    "sections": [
      {
        "name": "Verse",
        "order": 1,
        "chords": [
          {"chord": "C", "beats": 4},
          {"chord": "G", "beats": 4},
          {"chord": "Am", "beats": 4},
          {"chord": "F", "beats": 4},
          {"chord": "C", "beats": 4},
          {"chord": "G", "beats": 4},
          {"chord": "F", "beats": 2},
          {"chord": "C", "beats": 2}
        ]
      },
      {
        "name": "Chorus",
        "order": 2,
        "chords": [
          {"chord": "Am", "beats": 4},
          {"chord": "G", "beats": 4},
          {"chord": "F", "beats": 4},
          {"chord": "C", "beats": 4}
        ]
      }
    ]
  }'::jsonb
);
```

✅ **Expected Result**: "Success. 3 rows returned"

---

### **Step 4: Verify the Data**

Run this query to confirm your songs are in the database:

```sql
SELECT id, title, artist, original_key, tempo_bpm FROM songs ORDER BY title;
```

You should see:
- Let It Be (The Beatles, C, 76 BPM)
- Stand By Me (Ben E. King, A, 120 BPM)  
- Wonderwall (Oasis, Em, 87 BPM)

---

## 🧪 Test the App

1. Make sure your dev server is running: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Search for "stand" - you should see "Stand By Me"
4. Click on the song
5. Click Play to test the metronome!

---

## 🎉 You're Done!

Your database is set up with:
- ✅ Songs table with JSONB chord progressions
- ✅ Full-text search indexes
- ✅ Row Level Security (public read access)
- ✅ 3 test songs ready to jam

---

## 📝 Adding More Songs

To add more songs, use this template:

```sql
INSERT INTO songs (title, artist, original_key, tempo_bpm, time_signature, genre, difficulty, chord_progression)
VALUES (
  'YOUR SONG TITLE',
  'Artist Name',
  'G',  -- Key
  120,  -- BPM
  '4/4',
  'Rock',
  'beginner',
  '{
    "sections": [
      {
        "name": "Verse",
        "order": 1,
        "chords": [
          {"chord": "G", "beats": 4},
          {"chord": "D", "beats": 4},
          {"chord": "Em", "beats": 4},
          {"chord": "C", "beats": 4}
        ]
      }
    ]
  }'::jsonb
);
```

---

## 🔍 Troubleshooting

**Search returns no results?**
- Check that your `.env.local` has the correct Supabase credentials
- Verify songs exist: `SELECT COUNT(*) FROM songs;`
- Make sure RLS policies are set correctly

**Can't insert songs?**
- You're using the admin panel - RLS doesn't apply to you
- Check that the JSONB format is valid

**App shows errors?**
- Check browser console for API errors
- Verify environment variables are loaded (restart dev server)

---

**Need help?** Check the Supabase logs in your dashboard under **Database → Logs**.
