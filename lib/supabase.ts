// RADIO JAMM — Supabase Client Configuration

import { createClient } from '@supabase/supabase-js';
import { Song } from './types';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Search for songs by title or artist
 * @param query - Search term
 * @returns Array of matching songs
 */
export async function searchSongs(query: string): Promise<Song[]> {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .or(`title.ilike.%${query}%,artist.ilike.%${query}%`)
      .order('title', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error searching songs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to search songs:', error);
    return [];
  }
}

/**
 * Get a specific song by ID
 * @param id - Song UUID
 * @returns Song or null if not found
 */
export async function getSongById(id: string): Promise<Song | null> {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching song:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch song:', error);
    return null;
  }
}

/**
 * Get all songs (for initial library - use sparingly)
 * @returns Array of all songs
 */
export async function getAllSongs(): Promise<Song[]> {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching all songs:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch songs:', error);
    return [];
  }
}

/**
 * Get songs by genre
 * @param genre - Genre name
 * @returns Array of songs in that genre
 */
export async function getSongsByGenre(genre: string): Promise<Song[]> {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('genre', genre)
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching songs by genre:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch songs by genre:', error);
    return [];
  }
}

/**
 * Get songs by difficulty
 * @param difficulty - Difficulty level
 * @returns Array of songs at that difficulty
 */
export async function getSongsByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Promise<Song[]> {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('difficulty', difficulty)
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching songs by difficulty:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch songs by difficulty:', error);
    return [];
  }
}
