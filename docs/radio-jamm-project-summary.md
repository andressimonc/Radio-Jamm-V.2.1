# RADIO JAMM — Project Planning Summary

## 🎯 What We Built Today

This document summarizes the complete planning phase for **RADIO JAMM**, a mobile-first web app that displays real-time chords for jam sessions. We created 9 comprehensive blueprint documents that serve as your complete roadmap for development.

**Planning Session Date:** October 29, 2025  
**Total Documents Created:** 9  
**Total Planning Time:** ~3-4 hours  
**Status:** Ready to Build ✅

---

## 📖 What is RADIO JAMM?

**Simple Explanation:**
A web app where musicians search for a song, see the chords displayed large and clear, and play along with a metronome that automatically advances through the chord progression. Perfect for jam sessions with friends.

**The Problem It Solves:**
Musicians forget chord changes mid-jam, breaking the flow. Practice apps are too complex for live jamming. RADIO JAMM creates a simple, focused environment where beginners and advanced players can jam together effortlessly.

**Key Features (MVP):**
- Search for songs by name
- See chords displayed large (readable across the room)
- Visual chord diagrams (piano keyboard or guitar fretboard)
- Metronome that auto-advances chords in time
- Adjust tempo for practice
- Mobile-first design (works great on phones)

---

## 📚 The 9 Blueprint Documents

### **1. PRD.md — Product Requirements Document**

**What it is:**  
The master plan defining WHAT you're building and WHY.

**What's inside:**
- App vision: "Real-time chords for effortless jam sessions"
- Target users: Casual musicians, beginners, band members
- Core problem: Miscommunication during jams
- MVP features (what's included in first launch)
- Out of scope (what's NOT in MVP)
- Success metrics (10+ songs played, 2+ returning users)
- Post-MVP roadmap (Phase 2, 3, 4 features)
- Example song list (Stand By Me, Wonderwall, Hotel California, etc.)

**Why we made it:**  
So you never lose sight of the vision. When coding gets complex, this document reminds you what matters most.

**In simple terms:**  
"This is the north star. It tells you WHAT to build, WHO it's for, and WHY it matters."

---

### **2. TECH_SPEC.md — Technical Specification**

**What it is:**  
The technical blueprint defining HOW you'll build RADIO JAMM.

**What's inside:**
- Tech stack with versions (Next.js 15, React 18, TypeScript 5, Supabase, Tone.js)
- Complete folder structure (where every file lives)
- Configuration files (Next.js config, Tailwind config, TypeScript config)
- Database approach (JSONB for chord progressions)
- State management strategy (Zustand)
- Audio/metronome architecture (Tone.js with one-shot samples)
- Chord visualizer approach (Figma → SVG → Dynamic React)
- Deployment plan (Vercel with auto-deploy)
- Development workflow (Git, environment variables)

**Why we made it:**  
So Claude/Windsurf knows exactly which tools to use and how to set everything up. Prevents "which library should I use?" questions.

**In simple terms:**  
"This is the construction manual. It lists every tool, every material, and how they fit together."

---

### **3. DATABASE_SCHEMA.md — Database Schema**

**What it is:**  
The blueprint for how song data is stored in the database.

**What's inside:**
- Complete `songs` table structure (columns, data types, constraints)
- JSONB format for chord progressions (sections, chords, beats)
- Real example: "Stand By Me" with full chord data
- Indexes for fast searching
- Row-level security (who can read/write)
- Seed data strategy (10-50 songs)
- Example seed songs list
- SQL setup script (copy-paste to create database)
- Query examples (search, get song, filter)

**Why we made it:**  
So the database is designed correctly from day one. Bad database design = rewriting everything later.

**In simple terms:**  
"This is the filing cabinet blueprint. It shows exactly how to organize all your song information so it's fast to find and use."

---

### **4. USER_STORIES.md — User Stories**

**What it is:**  
Features described from a musician's perspective, not a developer's.

**What's inside:**
- 22 user stories organized into 6 epics
- Epic 1: Song Discovery (search, find songs)
- Epic 2: Chord Display (visualizers, current/upcoming chords)
- Epic 3: Metronome & Playback (play, pause, tempo)
- Epic 4: User Experience (mobile, navigation, errors)
- Epic 6: Performance (fast loading, reliable timing)
- Acceptance criteria for each story (how to know it's done)
- User personas (Jamie, Alex, Taylor)

**Why we made it:**  
So every feature is built with the user in mind. Developers think in code, users think in actions. This bridges the gap.

**In simple terms:**  
"This is the user manual written BEFORE the app exists. It says 'As a guitarist, I want to see finger positions so I know where to place my hands.'"

---

### **5. API_DOCUMENTATION.md — API Documentation**

**What it is:**  
Instructions for how your app talks to the database.

**What's inside:**
- Supabase client setup
- 2 main API operations:
  1. Search songs by title/artist
  2. Get full song data by ID
- Complete code examples (copy-paste ready)
- Error handling patterns
- Response format examples
- Usage in server components vs client components
- Performance optimization tips
- Testing methods

**Why we made it:**  
So you know exactly how to fetch data when building. No guessing "How do I get songs from the database?"

**In simple terms:**  
"This is the phone book. It tells you how to call the database and what it will say back."

---

### **6. COMPONENT_LIBRARY.md — Component Library**

**What it is:**  
A catalog of all 25 UI components in RADIO JAMM.

**What's inside:**
- Complete list of components (Header, Footer, SearchBar, ChordDisplay, PianoVisualizer, GuitarVisualizer, MetronomeControls, etc.)
- Component hierarchy (how they nest)
- Detailed specs for each component:
  - What it does
  - What data it needs
  - User experience notes
  - File locations
- Piano/Guitar visualizer flexibility (works with any Figma design)
- Shadcn/ui components list
- Implementation checklist (build order)

**Why we made it:**  
So you build the app like LEGO blocks. Each component has a clear job. No overlap, no confusion.

**In simple terms:**  
"This is the parts list for your app. Like a LEGO instruction manual, it shows every piece and where it goes."

---

### **7. STYLE_GUIDE.md — Style Guide**

**What it is:**  
Your complete design system (colors, fonts, spacing, styling rules).

**What's inside:**
- Color palette (your purple-cyan gradient + white base)
  - Sky Blue (#97DFFC), Periwinkle (#858AE3), Royal Purple (#613DC1), Deep Purple (#4E148C), Dark Plum (#2C0735)
- Typography system
  - Space Grotesk (headings, chord names)
  - Inter (body text)
- Font sizes (mobile-first, scales up for desktop)
- Spacing scale (4px to 64px)
- Component-specific styling (buttons, cards, inputs, sliders)
- Animation guidelines (transition speeds, keyframes)
- Mobile-first responsive rules
- Accessibility standards (contrast ratios, focus states)
- Complete Tailwind config (copy-paste ready)

**Why we made it:**  
So your app looks consistent and professional. Every button, every color, every spacing follows the same rules.

**In simple terms:**  
"This is the interior design guide. It picks all the colors, furniture, and decorations so everything matches."

---

### **8. DATA_FLOW.md — Data Flow Documentation**

**What it is:**  
Maps showing how information moves through your app.

**What's inside:**
- High-level architecture diagram
- 5 detailed data flows with step-by-step diagrams:
  1. Searching for a song (user types → database → results)
  2. Loading a song (click → fetch → display)
  3. Playing with metronome (play → loop → chords advance)
  4. Adjusting tempo (slider → store → all components update)
  5. Switching instruments (toggle → swap visualizers)
- Zustand store structure (what data lives where)
- Data transformations (chord name → piano keys, chord name → guitar frets)
- Component dependencies (which reads/writes what)
- Error handling flows
- Performance optimizations (debouncing, memoization)
- Debugging guide

**Why we made it:**  
So you understand how everything connects. When something breaks, this document shows you where to look.

**In simple terms:**  
"This is the plumbing diagram. It shows how water (data) flows from the source (database) through pipes (code) to faucets (UI components)."

---

### **9. TESTING_PLAN.md — Testing Plan**

**What it is:**  
Your quality assurance checklist to make sure everything works before launch.

**What's inside:**
- Testing priorities (what to test first)
- Device testing matrix (iPhone, Android, desktop)
- Complete feature checklists (100+ test items)
- 4 real user scenarios:
  1. First-time user
  2. Band practice
  3. Noisy environment
  4. Learning a song
- Edge cases (rapid clicks, slow connection, offline, extreme tempos)
- Pre-launch checklist (everything to verify)
- Bug reporting template
- Acceptance criteria (definition of "done")
- Post-launch monitoring plan

**Why we made it:**  
So you don't skip testing and launch a broken app. This ensures quality before real users arrive.

**In simple terms:**  
"This is the inspection checklist. Like a pilot's pre-flight checklist, you go through every item to make sure it's safe to launch."

---

## 🏗️ The Tech Stack (Simple Explanation)

### **What Language?**
**TypeScript** (95% of your code)
- It's JavaScript with extra safety features
- Browsers understand JavaScript
- TypeScript catches mistakes before they become bugs

### **What Framework?**
**Next.js 15** (built on React)
- Makes building web apps easier
- Handles routing (different pages)
- Optimized for speed
- Works great on mobile

### **What Database?**
**Supabase** (PostgreSQL)
- Stores all your song data
- Like Google Sheets but for apps
- Auto-generates an API (you don't write backend code)

### **What for Styling?**
**Tailwind CSS**
- Pre-made styling classes
- Like "bg-blue" instead of writing CSS from scratch
- Fast and consistent

### **What for State Management?**
**Zustand**
- Remembers what's happening in the app
- "Is song playing?" "What's the tempo?" stored here
- All components read from same source (no confusion)

### **What for Audio?**
**Tone.js**
- Keeps perfect musical timing
- Plays metronome clicks
- Advances chords on beat

### **What for Deployment?**
**Vercel**
- Puts your app on the internet
- Push code → automatically live in 30 seconds
- Free for small projects

---

## 🎨 Design Philosophy

**Core Principles:**
1. **Minimalist with Vibrant Pops** — Clean white base, strategic use of purple-cyan gradient
2. **Mobile-First** — Designed for phones, scales up to desktop
3. **Modern & Geometric** — Clean fonts (Space Grotesk, Inter)
4. **High Contrast** — Readable from across the room
5. **Musician-Focused** — Simple, no feature bloat

**Inspired By:**
- Spotify (dark mode, music focus)
- Apple Music (polished, clean)

---

## 🔄 How It All Works Together

**Simple Flow:**
```
1. User opens app on phone
2. Searches "Stand By Me"
3. Clicks result
4. App fetches song from Supabase database
5. Displays: 
   - Chord name ("A") - large text
   - Piano visualizer (A, C#, E keys highlighted)
   - Metronome controls
6. User hits Play
7. Tone.js starts metronome
8. Every beat, chord advances
9. All components update in sync
10. Musician plays along!
```

**Technical Flow:**
```
User Action
  ↓
React Component
  ↓
Zustand Store (global state)
  ↓
Supabase API (fetch data)
  ↓
PostgreSQL Database
  ↓
Data Returns
  ↓
Components Re-render
  ↓
User Sees Update
```

---

## 📊 Project Stats

**Documents:** 9 comprehensive blueprints  
**Components:** 25 UI components  
**User Stories:** 22 features  
**Colors:** 5-color palette  
**Database Tables:** 1 (songs)  
**API Endpoints:** 2 (search, get song)  
**Languages:** TypeScript (primary), CSS (Tailwind), SQL (Supabase), SVG (visualizers)  
**Estimated Build Time:** 3-4 weeks  
**Target Launch:** MVP with 10-50 songs  

---

## 🎯 Why We Planned So Thoroughly

### **Without Planning:**
- ❌ "Which library should I use for the metronome?"
- ❌ "How should I store chord progressions?"
- ❌ "What colors should buttons be?"
- ❌ "How do I make the piano visualizer work?"
- ❌ Start coding → realize design doesn't work → rewrite everything

### **With These Blueprints:**
- ✅ Every decision already made
- ✅ Claude/Windsurf knows exactly what to build
- ✅ No stopping to figure out architecture
- ✅ Consistent design from day one
- ✅ Clear definition of "done"
- ✅ Fast, focused development

---

## 🚀 What Happens Next

### **Phase 1: Setup (Week 1)**
1. Create Next.js project
2. Set up Supabase database
3. Seed 10-50 songs
4. Build layout components

### **Phase 2: Search (Week 1)**
5. Build search functionality
6. Connect to database
7. Test on mobile

### **Phase 3: Song Display (Week 2)**
8. Build song page
9. Display chords
10. Add timeline

### **Phase 4: Visualizers (Week 2-3)**
11. Design in Figma
12. Build piano visualizer
13. Build guitar visualizer
14. Add chord parsing

### **Phase 5: Metronome (Week 3)**
15. Set up Tone.js
16. Build playback controls
17. Connect to state management

### **Phase 6: Polish & Launch (Week 4)**
18. Style everything
19. Test on real devices
20. Fix bugs
21. Deploy to Vercel

---

## 💡 Key Decisions We Made

### **Architecture Decisions:**
- **Next.js over separate frontend/backend** → Simpler, one language
- **Supabase over custom backend** → Auto-generated API, faster development
- **JSONB over normalized tables** → Faster MVP, flexible schema
- **Zustand over Redux** → Simpler state management, less boilerplate
- **Tone.js over basic timers** → Precise musical timing
- **Figma SVG over code-only visualizers** → Full design control

### **Scope Decisions:**
- **Search-first over browse grid** → Simpler UX, faster to find songs
- **No auth in MVP** → Launch faster, add later
- **No transposition in MVP** → Core feature is displaying chords, not transforming them
- **Guitar + Piano only** → Bass/lyrics deferred to Phase 2
- **Mobile-first** → Primary use case is phones

### **Design Decisions:**
- **Your purple-cyan gradient palette** → Unique, vibrant, stands out
- **White base background** → Clean, lets colors pop
- **Space Grotesk + Inter fonts** → Modern, geometric, readable
- **Minimalist + vibrant aesthetic** → Focused on functionality, pops of personality

---

## 🎓 What You Learned

### **Planning Concepts:**
- **PRD** = Product vision (what/why)
- **Tech Spec** = Technical architecture (how)
- **User Stories** = Features from user perspective
- **Data Flow** = How information moves through app
- **Component Library** = Modular UI building blocks

### **Technical Concepts:**
- **State Management** = Where data lives during app runtime
- **API** = How frontend talks to backend
- **Database Schema** = How data is organized
- **JSONB** = Flexible JSON storage in database
- **Server vs Client Components** = Where code runs (server or browser)
- **Debouncing** = Waiting until user stops typing before searching

### **Development Concepts:**
- **MVP** = Minimum Viable Product (simplest version that works)
- **Phase 2/3/4** = Features added after launch
- **Mobile-First** = Design for phones, scale up to desktop
- **Edge Cases** = Unusual scenarios that might break the app

---

## ✅ Success Criteria

**You'll know the planning paid off when:**

1. **Fast Development** — No stopping to make decisions, just build
2. **Consistent Design** — Everything looks like it belongs together
3. **Clear Direction** — Always know what to build next
4. **Fewer Bugs** — Architecture was thought through
5. **Easy Handoff** — Could give blueprints to another developer and they'd understand

**The MVP is ready when:**
- ✅ Musicians can search, load, and play along with songs
- ✅ Metronome keeps perfect time
- ✅ Chords display clearly and advance correctly
- ✅ Works flawlessly on iPhone and Android
- ✅ Fast enough (<3s load time)
- ✅ No critical bugs

---

## 🎸 The Vision

**RADIO JAMM isn't just an app—it's a tool that brings musicians together.**

Whether it's a casual jam session with friends, a band practice, or a beginner learning their first song, RADIO JAMM makes the experience effortless. No more fumbling with sheet music, no more forgetting chord changes, no more confusion.

Just search, play, and jam. 🎶

---

## 📝 Final Checklist

Before you start coding, make sure you have:

- [ ] All 9 blueprint documents downloaded/saved
- [ ] This summary document for reference
- [ ] Supabase account created (or ready to create)
- [ ] Vercel account created (or ready to create)
- [ ] Figma account for designing visualizers
- [ ] GitHub account for version control
- [ ] Windsurf IDE installed
- [ ] Excited to build! 🚀

---

## 🎉 You're Ready!

**What you accomplished today:**
- Planned a complete web application from scratch
- Made every major technical decision
- Created a roadmap for 3-4 weeks of development
- Documented everything for easy reference

**What's next:**
Take these blueprints into Windsurf with Claude and start building. The hard thinking is done. Now it's time to create.

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Project Status:** Planning Complete ✅ — Ready to Build 🚀

---

## 📞 Quick Reference

**When you start coding, remember:**
- PRD = What & Why
- Tech Spec = How
- Database Schema = Data structure
- Component Library = UI parts
- Style Guide = Visual design
- Data Flow = How it connects
- Testing Plan = Quality assurance

**When stuck, ask yourself:**
1. What does the PRD say this feature should do?
2. What does the Component Library say this component needs?
3. What does the Data Flow say about where this data comes from?

**These blueprints answer 95% of questions before you even ask them.**

Good luck building RADIO JAMM! 🎸✨