import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format tempo display with unit
 */
export function formatTempo(bpm: number): string {
  return `${bpm} BPM`;
}

/**
 * Format time signature display
 */
export function formatTimeSignature(timeSignature: string): string {
  return timeSignature;
}

/**
 * Get tempo label based on BPM
 */
export function getTempoLabel(bpm: number): string {
  if (bpm < 60) return 'Very Slow';
  if (bpm < 80) return 'Slow';
  if (bpm < 108) return 'Moderate';
  if (bpm < 120) return 'Medium';
  if (bpm < 140) return 'Fast';
  if (bpm < 168) return 'Very Fast';
  return 'Presto';
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
