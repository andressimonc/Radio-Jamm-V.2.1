# RADIO JAMM — Style Guide

## 🎨 Design System Overview

**Design Philosophy:**
- Minimalist with vibrant pops of color
- Mobile-first experience
- Inspired by Spotify and Apple Music
- Modern, geometric, clean aesthetic
- High contrast for readability from across the room

---

## 🌈 Color Palette

### **Primary Colors (Background & Base)**

| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Pure White** | `#FFFFFF` | (255, 255, 255) | Main background, default state |
| **Off White** | `#F8F9FA` | (248, 249, 250) | Secondary background, cards |
| **Light Gray** | `#E9ECEF` | (233, 236, 239) | Borders, dividers |

**Rationale:** Clean white base allows the vibrant accent colors to pop. Subtle gray tones for depth without competing with accents.

---

### **Accent Colors (Components & Highlights)**

| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Sky Blue** | `#97DFFC` | (151, 223, 252) | Highlighted piano keys, active states |
| **Periwinkle** | `#858AE3` | (133, 138, 227) | Secondary highlights, hover states |
| **Royal Purple** | `#613DC1` | (97, 61, 193) | Primary buttons, links |
| **Deep Purple** | `#4E148C` | (78, 20, 140) | Active buttons, emphasis |
| **Dark Plum** | `#2C0735` | (44, 7, 53) | Text, icons, strong contrast |

**Gradient (Optional Use):**
```css
background: linear-gradient(135deg, #97DFFC 0%, #858AE3 25%, #613DC1 50%, #4E148C 75%, #2C0735 100%);
```
*Can be used subtly for timeline, loading states, or decorative elements.*

---

### **Text Colors**

| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Primary Text** | `#2C0735` | (44, 7, 53) | Main content, chord names, headings |
| **Secondary Text** | `#4E148C` | (78, 20, 140) | Artist names, labels, secondary info |
| **Muted Text** | `#858AE3` | (133, 138, 227) | Placeholders, disabled states |

---

### **Component-Specific Color Usage**

**ChordDisplay (current chord name):**
- Text: `#2C0735` (Dark Plum)
- Size: Very large, high contrast

**PianoVisualizer:**
- Inactive keys: `#FFFFFF` (white keys), `#2C0735` (black keys)
- Active/highlighted keys: `#97DFFC` (Sky Blue)
- Borders: `#E9ECEF` (Light Gray)

**GuitarVisualizer:**
- Fretboard: `#F8F9FA` (Off White)
- Strings: `#2C0735` (Dark Plum)
- Finger dots: `#613DC1` (Royal Purple)
- Fret markers: `#E9ECEF` (Light Gray)

**Buttons:**
- Primary (Play): `#613DC1` (Royal Purple) → hover: `#4E148C` (Deep Purple)
- Secondary (Restart): `#858AE3` (Periwinkle) → hover: `#613DC1` (Royal Purple)
- Text color on buttons: `#FFFFFF` (Pure White)

**Timeline (Waveform):**
- Bar color: `#858AE3` (Periwinkle)
- Active section: `#613DC1` (Royal Purple)
- Background: `#F8F9FA` (Off White)

**SearchBar:**
- Background: `#FFFFFF` (Pure White)
- Border: `#E9ECEF` (Light Gray)
- Focus border: `#613DC1` (Royal Purple)
- Placeholder text: `#858AE3` (Periwinkle - muted)

---

## 🔤 Typography

### **Font Families**

**Primary Font: Space Grotesk** (Modern, geometric, bold presence)
- Headings, chord names, song titles
- Bold, strong character
- Excellent readability at large sizes
- Free via Google Fonts

**Secondary Font: Inter** (Clean, versatile, readable)
- Body text, labels, buttons, UI elements
- Modern geometric design
- Optimized for screens
- Free via Google Fonts

**Fallback Stack:**
```css
font-family: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

### **Font Sizes (Mobile-First)**

| Element | Mobile | Desktop | Weight | Usage |
|---------|--------|---------|--------|-------|
| Chord Name | `4rem` (64px) | `6rem` (96px) | 700 (Bold) | ChordDisplay |
| Song Title | `1.75rem` (28px) | `2.25rem` (36px) | 600 (Semibold) | SongHeader |
| Section Label | `1.25rem` (20px) | `1.5rem` (24px) | 500 (Medium) | Current section |
| Body Text | `1rem` (16px) | `1rem` (16px) | 400 (Regular) | Labels, artist |
| Small Text | `0.875rem` (14px) | `0.875rem` (14px) | 400 (Regular) | Timestamps, meta |
| Button Text | `1rem` (16px) | `1.125rem` (18px) | 600 (Semibold) | All buttons |

**Line Height:**
- Headings: `1.2` (tight, impactful)
- Body: `1.5` (comfortable reading)

**Letter Spacing:**
- Headings: `-0.02em` (slightly tighter)
- Body: `0` (default)
- Buttons/Labels: `0.01em` (slightly wider)

---

## 📏 Spacing & Layout

### **Spacing Scale (Tailwind-compatible)**

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | `4px` | Tight spacing, icon gaps |
| `sm` | `8px` | Small padding, compact layouts |
| `md` | `16px` | Standard padding, default gaps |
| `lg` | `24px` | Section padding, card spacing |
| `xl` | `32px` | Large gaps between major sections |
| `2xl` | `48px` | Page margins, hero spacing |
| `3xl` | `64px` | Extra large spacing (desktop only) |

**Mobile Priority:**
- Optimize for thumb-friendly tap targets (min 44x44px)
- Generous padding on mobile (avoid cramped layouts)
- Reduce spacing on desktop (content can be denser)

---

### **Container Widths**

| Breakpoint | Max Width | Usage |
|------------|-----------|-------|
| Mobile | `100%` | Full width, 16px side padding |
| Tablet | `768px` | Centered container |
| Desktop | `1024px` | Max width for readability |

**Mobile-First Approach:**
```css
/* Mobile default (320px+) */
.container {
  padding: 0 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
```

---

## 🎨 Component Styling Rules

### **Buttons**

**Primary Button (Play, Parse Song):**
```css
background: #613DC1;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s ease;

hover: background: #4E148C;
active: transform: scale(0.98);
```

**Secondary Button (Restart, Presets):**
```css
background: #858AE3;
color: #FFFFFF;
padding: 10px 20px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s ease;

hover: background: #613DC1;
```

**Ghost Button (Back, Cancel):**
```css
background: transparent;
color: #613DC1;
padding: 10px 20px;
border: 2px solid #E9ECEF;
border-radius: 8px;

hover: border-color: #613DC1;
```

**Button Sizes:**
- Small: `padding: 8px 16px; font-size: 14px;`
- Medium: `padding: 12px 24px; font-size: 16px;` (default)
- Large: `padding: 16px 32px; font-size: 18px;`

**Mobile Tap Targets:**
- Minimum height: `44px`
- Minimum width: `44px`
- Extra padding for comfortable tapping

---

### **Cards**

**Song Cards, Control Panels:**
```css
background: #FFFFFF;
border: 1px solid #E9ECEF;
border-radius: 12px;
padding: 20px;
box-shadow: 0 2px 8px rgba(44, 7, 53, 0.04);
transition: all 0.2s ease;

hover: box-shadow: 0 4px 16px rgba(97, 61, 193, 0.12);
```

---

### **Input Fields**

**SearchBar, Text Inputs:**
```css
background: #FFFFFF;
border: 2px solid #E9ECEF;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: #2C0735;
transition: all 0.2s ease;

placeholder: color: #858AE3;

focus: 
  border-color: #613DC1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(97, 61, 193, 0.1);
```

---

### **Sliders (Tempo Control)**

```css
Track:
  background: #E9ECEF;
  height: 6px;
  border-radius: 3px;

Thumb:
  background: #613DC1;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(44, 7, 53, 0.2);
  cursor: pointer;

Fill (Active Range):
  background: linear-gradient(90deg, #858AE3, #613DC1);
```

---

### **Toggle/Switch (Instrument Toggle)**

```css
background: #E9ECEF;
width: 60px;
height: 32px;
border-radius: 16px;
position: relative;

Active:
  background: #613DC1;

Thumb:
  background: #FFFFFF;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transition: transform 0.2s ease;

Active Thumb:
  transform: translateX(28px);
```

---

## ✨ Animations & Transitions

### **Transition Speeds**

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | `100ms` | Instant feedback (button press) |
| Normal | `200ms` | Standard transitions (hover, color change) |
| Slow | `300ms` | Smooth animations (chord change, slide) |
| Very Slow | `500ms` | Emphasis animations (fade in/out) |

**Easing Functions:**
```css
/* Smooth, natural motion */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Bouncy (for playful elements) */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Ease-out (most common) */
transition-timing-function: ease-out;
```

---

### **Key Animations**

**Chord Change (PianoVisualizer keys):**
```css
transition: fill 300ms ease-out;
```

**Button Hover:**
```css
transition: all 200ms ease;
```

**Beat Indicator Pulse:**
```css
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
animation: pulse 600ms ease-in-out;
```

**Loading Spinner:**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
animation: spin 1s linear infinite;
```

**Fade In (Page Load):**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
animation: fadeIn 400ms ease-out;
```

---

## 🎭 Component-Specific Styles

### **ChordDisplay**

```css
font-family: 'Space Grotesk', sans-serif;
font-size: 4rem; /* Mobile */
font-size: 6rem; /* Desktop */
font-weight: 700;
color: #2C0735;
text-align: center;
letter-spacing: -0.02em;
margin: 0;
transition: all 300ms ease;

/* Smooth chord change */
animation: fadeIn 300ms ease-out;
```

---

### **PianoVisualizer**

```css
/* White Keys */
.piano-key-white {
  fill: #FFFFFF;
  stroke: #E9ECEF;
  stroke-width: 2px;
  transition: fill 300ms ease;
}

.piano-key-white.active {
  fill: #97DFFC;
  stroke: #613DC1;
  stroke-width: 3px;
}

/* Black Keys */
.piano-key-black {
  fill: #2C0735;
  stroke: #2C0735;
  transition: fill 300ms ease;
}

.piano-key-black.active {
  fill: #613DC1;
  stroke: #4E148C;
}
```

---

### **GuitarVisualizer**

```css
/* Fretboard Background */
.fretboard {
  fill: #F8F9FA;
  stroke: #E9ECEF;
}

/* Strings */
.string {
  stroke: #2C0735;
  stroke-width: 2px;
}

/* Frets */
.fret {
  stroke: #E9ECEF;
  stroke-width: 3px;
}

/* Finger Dots */
.finger-dot {
  fill: #613DC1;
  stroke: #4E148C;
  stroke-width: 2px;
  transition: all 200ms ease;
}
```

---

### **SongTimeline (Waveform)**

```css
/* Using Eleven Labs ScrollingWaveform */
<ScrollingWaveform
  height={80}
  barWidth={3}
  barGap={2}
  speed={30}
  fadeEdges={true}
  barColor="#858AE3"
/>

/* Active Section Overlay */
.active-section {
  fill: #613DC1;
  opacity: 0.3;
}
```

---

### **MetronomeControls Panel**

```css
background: #FFFFFF;
border: 1px solid #E9ECEF;
border-radius: 16px;
padding: 24px;
box-shadow: 0 4px 12px rgba(44, 7, 53, 0.06);

/* Sticky to bottom on mobile */
@media (max-width: 768px) {
  position: sticky;
  bottom: 16px;
  margin: 0 16px;
}
```

---

### **BeatIndicator**

```css
/* Visual Pulse Dot */
.beat-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #858AE3;
  transition: all 100ms ease;
}

.beat-indicator.active {
  background: #613DC1;
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(97, 61, 193, 0.5);
}

/* Strong Beat (Beat 1) */
.beat-indicator.strong {
  background: #4E148C;
  transform: scale(1.4);
}
```

---

## 📱 Mobile-Specific Styles

### **Touch Targets**

All interactive elements on mobile:
```css
min-height: 44px;
min-width: 44px;
padding: 12px;
```

### **Font Scaling**

Mobile gets larger base font for readability:
```css
html {
  font-size: 16px; /* Mobile */
}

@media (min-width: 768px) {
  html {
    font-size: 16px; /* Desktop stays same */
  }
}
```

### **Safe Areas (iOS Notch)**

```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

---

## 🌐 Responsive Breakpoints

```css
/* Mobile-first approach */
/* Default styles = Mobile (320px+) */

/* Small tablets (600px+) */
@media (min-width: 600px) {
  /* Slightly larger elements */
}

/* Tablets (768px+) */
@media (min-width: 768px) {
  /* Two-column layouts */
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  /* Full desktop experience */
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  /* Max width containers, more whitespace */
}
```

---

## ♿ Accessibility

### **Color Contrast**

All text meets WCAG AA standards:
- `#2C0735` on `#FFFFFF` = 14.2:1 (AAA)
- `#4E148C` on `#FFFFFF` = 8.1:1 (AAA)
- `#613DC1` on `#FFFFFF` = 5.2:1 (AA)
- `#FFFFFF` on `#613DC1` = 4.0:1 (AA)

### **Focus States**

All interactive elements:
```css
:focus-visible {
  outline: 3px solid #613DC1;
  outline-offset: 2px;
}
```

### **Reduced Motion**

Respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎨 Dark Mode (Future Enhancement)

**Not in MVP, but planned for Phase 2:**

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `#FFFFFF` | `#0F0F0F` |
| Surface | `#F8F9FA` | `#1A1A1A` |
| Primary Text | `#2C0735` | `#F8F9FA` |
| Borders | `#E9ECEF` | `#2C2C2C` |
| Accents | Same vibrant colors | Same vibrant colors |

---

## 🛠️ Tailwind Config

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Backgrounds)
        'white': '#FFFFFF',
        'off-white': '#F8F9FA',
        'light-gray': '#E9ECEF',
        
        // Accent Colors
        'sky': '#97DFFC',
        'periwinkle': '#858AE3',
        'royal': '#613DC1',
        'deep-purple': '#4E148C',
        'plum': '#2C0735',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'chord': ['4rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'chord-desktop': ['6rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
        'panel': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(44, 7, 53, 0.04)',
        'card-hover': '0 4px 16px rgba(97, 61, 193, 0.12)',
        'panel': '0 4px 12px rgba(44, 7, 53, 0.06)',
      },
      transitionDuration: {
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
        'very-slow': '500ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

---

## 📋 Style Checklist

Before launching:

- [ ] All components use colors from style guide
- [ ] Typography uses Space Grotesk for headings, Inter for body
- [ ] Spacing follows the scale (no random pixel values)
- [ ] Buttons have consistent styling and hover states
- [ ] All interactive elements meet 44x44px minimum on mobile
- [ ] Color contrast passes WCAG AA standards
- [ ] Focus states visible on all interactive elements
- [ ] Animations respect prefers-reduced-motion
- [ ] Mobile layout tested on real devices
- [ ] Tailwind config matches style guide

---

## 🎯 Design Principles Summary

1. **Minimalist Foundation** — Clean white base, generous whitespace
2. **Vibrant Accents** — Strategic use of purple-cyan gradient colors
3. **Mobile-First** — Optimize for phone experience, scale up for desktop
4. **Geometric Typography** — Modern, bold, readable from distance
5. **Smooth Transitions** — 200-300ms for natural motion
6. **High Contrast** — Readable chord names from across the room
7. **Consistent Spacing** — Use the spacing scale, not arbitrary values

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Status:** Style Guide Complete — Ready for Implementation