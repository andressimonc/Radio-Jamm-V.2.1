// RADIO JAMM — Metronome Engine using Tone.js

import * as Tone from 'tone';
import { MetronomeSound } from './types';

// Configuration for loop-based samples
const SOUND_CONFIG = {
  metronome: { 
    path: '/sounds/metronome-click.wav', 
    originalBPM: 100,
    sliceCount: 4 // Number of beats in the loop
  }
};

class MetronomeEngine {
  private buffers?: Record<MetronomeSound, Tone.ToneAudioBuffer>;
  private currentSound: MetronomeSound = 'metronome';
  private isInitialized = false;
  private beatCallback?: (beat: number) => void;
  private loop?: Tone.Loop;
  private currentSliceIndex = 0;
  private volumeNode?: Tone.Volume;
  private currentVolume = 70; // 0-100
  private isMuted = false;

  constructor() {
    // Don't initialize players here - they'll be created lazily in init()
  }

  /**
   * Initialize the audio buffers (client-side only)
   * Loads loop files and prepares them for sliced playback
   */
  private async initializeBuffers() {
    if (this.buffers) return;
    
    try {
      this.buffers = {
        metronome: await Tone.ToneAudioBuffer.fromUrl(SOUND_CONFIG.metronome.path),
      };
      console.log('Audio buffers loaded');
    } catch (error) {
      console.error('Failed to load audio buffers:', error);
    }
  }

  /**
   * Initialize the audio context (required by iOS)
   * Must be called in response to user interaction
   */
  async init() {
    if (this.isInitialized) return;

    try {
      // Initialize buffers first (client-side only)
      await this.initializeBuffers();
      
      await Tone.start();
      console.log('Audio context started');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to start audio context:', error);
    }
  }

  /**
   * Initialize volume node
   */
  private initializeVolumeNode() {
    if (!this.volumeNode) {
      this.volumeNode = new Tone.Volume(this.volumeToDb(this.currentVolume)).toDestination();
    }
  }

  /**
   * Convert volume (0-100) to decibels
   */
  private volumeToDb(volume: number): number {
    if (volume === 0) return -Infinity;
    // Convert 0-100 to -40db to 0db range
    return (volume / 100) * 40 - 40;
  }

  /**
   * Play a single beat slice from the loop
   */
  private playBeatSlice(time: number) {
    if (!this.buffers || this.isMuted) return;

    this.initializeVolumeNode();

    const config = SOUND_CONFIG[this.currentSound];
    const buffer = this.buffers[this.currentSound];
    
    // Calculate slice duration based on original BPM
    const sliceDuration = 60 / config.originalBPM;
    
    // Calculate start time for this slice
    const startTime = (this.currentSliceIndex * sliceDuration) % buffer.duration;
    
    // Create a new player for this one-shot, connect through volume node
    const player = new Tone.Player(buffer).connect(this.volumeNode!);
    player.fadeOut = 0.01; // Quick fade to prevent clicks
    
    // Play only the slice duration, not the entire loop
    player.start(time, startTime, sliceDuration);
    
    // Clean up after playback
    player.onstop = () => {
      player.dispose();
    };
    
    // Rotate through slices for variation
    this.currentSliceIndex = (this.currentSliceIndex + 1) % config.sliceCount;
  }

  /**
   * Set the metronome sound
   */
  setSound(sound: MetronomeSound) {
    this.currentSound = sound;
  }

  /**
   * Set the tempo (BPM)
   */
  setTempo(bpm: number) {
    Tone.getTransport().bpm.value = bpm;
  }

  /**
   * Set the volume (0-100)
   */
  setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(100, volume));
    if (this.volumeNode) {
      this.volumeNode.volume.value = this.volumeToDb(this.currentVolume);
    }
  }

  /**
   * Set mute state
   */
  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  /**
   * Set the callback function called on each beat
   */
  setBeatCallback(callback: (beat: number) => void) {
    this.beatCallback = callback;
  }

  /**
   * Start the metronome
   */
  async start() {
    await this.init();

    if (this.loop) {
      this.loop.start(0);
    } else {
      let beatCount = 0;

      this.loop = new Tone.Loop((time) => {
        // Play one beat slice from the loop
        this.playBeatSlice(time);

        // Call the beat callback
        if (this.beatCallback) {
          // Schedule callback slightly before the audio plays for visual sync
          Tone.Draw.schedule(() => {
            this.beatCallback!(beatCount);
            beatCount++;
          }, time);
        }
      }, '4n'); // Quarter note intervals

      this.loop.start(0);
    }

    Tone.getTransport().start();
  }

  /**
   * Stop the metronome immediately
   */
  stop() {
    Tone.getTransport().stop();
    Tone.getTransport().cancel(); // Cancel all scheduled events
    if (this.loop) {
      this.loop.stop();
    }
    // Reset slice index
    this.currentSliceIndex = 0;
  }

  /**
   * Pause the metronome (can be resumed)
   */
  pause() {
    Tone.getTransport().pause();
  }

  /**
   * Resume the metronome
   */
  resume() {
    Tone.getTransport().start();
  }

  /**
   * Reset the metronome position
   */
  reset() {
    this.stop();
    Tone.getTransport().position = 0;
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.stop();
    if (this.loop) {
      this.loop.dispose();
    }
    if (this.buffers) {
      Object.values(this.buffers).forEach(buffer => buffer.dispose());
    }
    Tone.getTransport().cancel();
  }
}

// Export singleton instance
export const metronome = new MetronomeEngine();
