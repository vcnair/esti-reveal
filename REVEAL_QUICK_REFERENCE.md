# Esti Reveal - Quick Visual Reference

## 🎨 Typography Scale

```
Display Hero:      text-8xl → text-9xl (72px → 128px)
"60" Callout:      text-9xl → text-[12rem] (128px → 192px)
Section Headers:   text-5xl → text-6xl (48px → 60px)
Card Titles:       text-3xl (30px)
Stat Numbers:      text-7xl (72px)
Body Large:        text-2xl (24px)
Body Regular:      text-xl (20px)
Body Small:        text-base (16px)
```

## 🎨 Color Palette

```css
/* Primary Backgrounds */
Premium Dark:     bg-slate-900
Light Surface:    bg-white
Accent Highlight: bg-amber-200/70

/* Text Colors */
Headlines:        text-slate-900
Body:             text-slate-500
Muted:            text-slate-400

/* Gradients (for stats) */
Speed:     from-amber-500 to-orange-500
Accuracy:  from-teal-500 to-cyan-500
Savings:   from-emerald-500 to-green-500
Trust:     from-blue-500 to-indigo-500
```

## ✨ Animation Timing

```css
Quick:     150ms - 200ms (hover states)
Standard:  300ms (card reveals, transitions)
Smooth:    400ms - 500ms (section changes)
Bounce:    1.5s - 2s (infinite loops)
```

## 📐 Spacing System

```css
Card Padding:      p-8, p-10 (32px, 40px)
Section Margins:   mb-16, mb-20 (64px, 80px)
Element Gaps:      gap-4, gap-6, gap-8 (16px, 24px, 32px)
```

## 🎯 Key Metrics to Watch

### User Engagement
- **Time on Page:** Target 3-5 min (was 1-2 min)
- **Scroll Depth:** Target 90%+ (was 60%)
- **Section Completion:** Track via progress bar

### Conversion Triggers
- **Pilot Card Clicks:** Primary metric
- **Try Free Clicks:** Secondary metric
- **Video Play Rate:** Engagement indicator

### A/B Test Ideas (Future)
1. Stats section order (problem → solution vs. solution → problem)
2. CTA card messaging (Free Trial vs. Get Started)
3. Testimonial placement (before vs. after value section)

## 🚀 Section-by-Section Breakdown

### 1. Intro Screen
**Purpose:** Create intrigue and exclusivity
**Key Element:** "You've been invited" with animated underline
**Action:** Click anywhere to continue

### 2. Title Slide
**Purpose:** Bold value proposition
**Key Element:** "60 Seconds" in massive 192px type
**Action:** Click or → to continue

### 3. ⭐ NEW: Stats Section
**Purpose:** Establish pain points with data
**Key Elements:** 
- 3-5 Hours per Quote (red pulse)
- 20% Quotes Lost (amber pulse)
- 15% Human Error (orange pulse)
**Action:** Click or → to see solution

### 4. Presentation
**Purpose:** Visual walkthrough of solution
**Key Element:** 19 slides with auto-advance option
**Action:** Navigate with ←→ or auto-play

### 5. Demo Video
**Purpose:** Show Esti in action
**Key Element:** Video with play/pause/mute controls
**Action:** Watch video, then continue

### 6. ⭐ NEW: Value Proposition
**Purpose:** Quantify benefits with data
**Key Elements:**
- 60-Second Quotes → 95% Faster
- Zero Missed Details → 100% Accuracy
- Smart Pricing → $50K+ Saved
- Confidence Scores → 94% Confidence
**Action:** Click CTA or → to final section

### 7. CTA
**Purpose:** Convert to pilot or trial
**Key Elements:**
- Pilot Program card (recommended)
- Try Free card (standard)
- Social proof testimonial
**Action:** Click card to sign up

## 📱 Responsive Breakpoints

```css
Mobile:    < 640px  (sm)
Tablet:    640-768px (md)
Desktop:   768-1024px (lg)
Large:     1024px+ (xl)
```

**Mobile Optimizations:**
- Text scales down 30-40%
- Cards stack vertically
- Spacing reduces by 25%
- Touch targets ≥ 44px

## 🎯 Call-to-Action Hierarchy

### Primary (Most Visible)
1. "Get Early Access" pilot card
2. Navigation arrows (→)

### Secondary
3. "Try It Free" standard card
4. "Continue" buttons between sections

### Tertiary
5. "Back" buttons
6. Keyboard shortcuts (shown bottom-right)

## 🎨 Design Tokens Quick Reference

```javascript
// Colors
const colors = {
  primary: 'slate-900',
  accent: 'amber-500',
  success: 'emerald-500',
  warning: 'amber-500',
  danger: 'red-500',
  muted: 'slate-400'
};

// Shadows
const shadows = {
  card: 'shadow-xl shadow-slate-200/50',
  hover: 'shadow-slate-300/70',
  premium: 'shadow-2xl shadow-slate-400/30',
};

// Roundedness
const radius = {
  card: 'rounded-2xl',
  badge: 'rounded-full',
  button: 'rounded-lg',
};

// Animations
const motion = {
  cardHover: 'scale-[1.02] -translate-y-1',
  arrowSlide: 'translate-x-1',
  pulse: 'animate-pulse',
};
```

## 📊 Content Hierarchy

```
Level 1: Hero Numbers (192px)
    ↓
Level 2: Section Headers (60px)
    ↓
Level 3: Stat Numbers (72px)
    ↓
Level 4: Card Titles (30px)
    ↓
Level 5: Body Text (20-24px)
    ↓
Level 6: Captions (16px)
```

## 🎯 User Journey Map

```
Emotion:  Curious → Concerned → Intrigued → Convinced → Excited → Ready
          ↓         ↓          ↓          ↓           ↓          ↓
Section:  Intro  →  Stats  →  Presentation → Demo  → Value  → CTA
          ↓         ↓          ↓          ↓           ↓          ↓
Message: "You're  "This is  "Here's the  "See it   "Imagine   "Join
         special" painful"  solution"    working"  the results" now"
```

## 🎬 Animation Sequence Timing

```
Intro Screen:
  0ms:    Fade in background
  200ms:  Badge appears
  400ms:  Headline fades in
  800ms:  Underline animates
  1000ms: Scroll hint bounces

Stats Cards:
  200ms:  Card 1 (Time)
  300ms:  Card 2 (Loss)
  400ms:  Card 3 (Error)
  800ms:  Navigation hint

Value Cards:
  200ms:  Card 1 (Speed)
  300ms:  Card 2 (Accuracy)
  400ms:  Card 3 (Savings)
  500ms:  Card 4 (Confidence)
  800ms:  CTA buttons
```

## 🎯 Key Performance Indicators

### Must Track:
1. ✅ Completion rate (reach CTA section)
2. ✅ Video play rate
3. ✅ Pilot card clicks
4. ✅ Average time per section
5. ✅ Mobile vs. desktop engagement

### Nice to Have:
6. Slide auto-play usage
7. Back button usage
8. Keyboard shortcut usage
9. Mute/unmute interactions
10. Social proof read rate

## 🚀 Launch Checklist

**Pre-Send:**
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test keyboard navigation
- [ ] Verify all 19 slides load
- [ ] Confirm demo video plays
- [ ] Test CTA links (/pilot, /)
- [ ] Check progress bar accuracy
- [ ] Verify responsive breakpoints

**Post-Send (Monitor):**
- [ ] Track completion rates
- [ ] Monitor video engagement
- [ ] Measure CTA clicks
- [ ] Gather recipient feedback
- [ ] Note any bug reports
- [ ] Calculate average session time

## 💡 Pro Tips

1. **Best viewing experience:** Desktop 1920x1080 or higher
2. **Presentation mode:** Use keyboard arrows for smooth navigation
3. **Auto-play:** Enable after slide 1 for hands-free experience
4. **Share tip:** Send with subject line emphasizing exclusivity
5. **Follow-up:** Reference specific sections in conversations

## 🎨 Brand Voice Guidelines

**Tone:**
- Professional yet approachable
- Data-driven but not overwhelming
- Confident without being arrogant
- Empathetic to current pain points

**Language:**
- Use manufacturing domain terms (BOM, GD&T, tolerances)
- Quantify everything (60 seconds, 95% faster)
- Avoid marketing fluff
- Be direct about benefits

**Emotional Arc:**
- Start: Exclusive, special
- Middle: Understanding, empathetic
- End: Excited, empowered

---

**Remember:** Every element serves the goal of converting these 50 recipients into engaged pilot users who become your best advocates. 🚀

