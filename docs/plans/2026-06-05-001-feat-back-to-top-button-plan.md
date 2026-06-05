---
title: "feat: Add back-to-top scroll button"
type: feat
status: active
date: 2026-06-05
---

# feat: Add back-to-top scroll button

## Summary

Add a fixed, round back-to-top button to the Portfolio page that fades in once the user scrolls past the home section and smoothly returns to the top on click.

## Problem Frame

The portfolio page is tall — users who reach the projects and skills sections have no quick way to return to the top without manually scrolling. A floating back-to-top button provides a low-friction escape hatch that matches the site's existing glass-pill visual language.

---

## Requirements

**Visibility**
- R1. Button is hidden at page load and while the user is within the home section.
- R2. Button becomes visible after the user has scrolled past the home section (`#home` element's height).
- R3. Button disappears again when the user scrolls back into the home section.

**Behavior**
- R4. Clicking the button smoothly scrolls the page back to the top.

**Aesthetics**
- R5. Button is round and uses the project's glass pill style (`bg-white/5 backdrop-blur-xl rounded-full border border-white/20`).
- R6. Button displays an upward-pointing `ArrowUp` icon from lucide-react.
- R7. Show and hide transitions use a framer-motion opacity + translate-y fade via `AnimatePresence`.

**Placement**
- R8. Fixed at the bottom-right corner, clear of the center-bottom navbar pill.
- R9. `bottom-20 right-4` on mobile (clears the `bottom-4` navbar); `bottom-8 right-8` on desktop.

**Scope**
- R10. Rendered only on the Portfolio page (`/` route).

---

## Key Technical Decisions

- **Scroll-to-top action — `scrollIntoView` over Lenis direct call.** The Lenis instance in `App.tsx` is a local `useEffect` variable with no ref, context, or module-level export. Refactoring to expose it would be a meaningful scope addition. Instead, use `document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })`, which mirrors the Navbar's established `scrollToSection` pattern exactly. Lenis 1.3+ intercepts `scrollIntoView`, so smooth animation is preserved without touching App.tsx.

- **Visibility threshold — element-relative, not hardcoded.** Compare `window.scrollY` against `document.getElementById('home')?.offsetHeight ?? window.innerHeight`. Tying the threshold to the actual element height accommodates any future change to the home section's size and avoids a magic pixel constant.

- **Animation — `AnimatePresence` + `motion.button` with opacity/y.** `initial={{ opacity: 0, y: 10 }}` / `animate={{ opacity: 1, y: 0 }}` / `exit={{ opacity: 0, y: 10 }}`. Consistent with the framer-motion variant patterns in `InteractiveSkills.tsx` and `HonorsPortfolio.tsx`.

- **New component, not inline in Portfolio.** A standalone `BackToTop.tsx` keeps the visibility logic and animation isolated and makes it trivial to add to other pages later if needed.

---

## Implementation Units

### U1. `BackToTop` component

**Goal:** Self-contained animated back-to-top button with scroll-based show/hide logic.

**Requirements:** R1, R2, R3, R4, R5, R6, R7, R8, R9

**Dependencies:** none

**Files:**
- `client/src/components/BackToTop.tsx` (new)

**Approach:**
- `useState<boolean>` for the visibility flag, initialized to `false`.
- `useEffect` with `window.addEventListener('scroll', handler)` and cleanup. Handler reads `window.scrollY` against `document.getElementById('home')?.offsetHeight ?? window.innerHeight` to set the flag.
- Render: `AnimatePresence` wrapping a `motion.button` (only when flag is `true`). Apply `initial/animate/exit` for the opacity + y fade.
- Styling: `fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50` on the wrapper. Button uses `size="icon"` from the existing `Button` component with `rounded-full` and the glass pill classes added via `cn()`.
- Add `aria-label="Back to top"` to the button element, following the `aria-label={item.label}` pattern on Navbar.tsx mobile icon buttons.
- Click handler: `document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })`.
- Icon: `ArrowUp` from `lucide-react` (not yet used anywhere in the codebase).

**Patterns to follow:**
- Scroll listener shape: `Navbar.tsx` `useEffect` with `window.addEventListener('scroll', ...)` / cleanup
- Animation: `InteractiveSkills.tsx` and `HonorsPortfolio.tsx` framer-motion variant patterns
- Glass pill style: `Navbar.tsx` — `bg-white/5 backdrop-blur-xl rounded-full shadow-2xl border border-white/20`
- Button primitive: `ui/button.tsx` `size="icon"` variant

**Test scenarios:**
- At scroll position ~0: button is not present in the DOM (AnimatePresence unmounts it)
- After scrolling past the home section (~100dvh): button fades in smoothly
- Scroll back above the threshold: button fades out via exit animation
- Click button: page scrolls smoothly to the top; home section is visible
- Desktop: button is at bottom-right and does not visually overlap the center-bottom navbar pill
- Mobile: button sits at `bottom-20 right-4` and clears the `bottom-4` navbar pill

Test expectation: none — pure presentation component; behavior is verified by running the app.

**Verification:** Component mounts cleanly, visibility toggles correctly around the threshold, click triggers smooth scroll to top.

---

### U2. Mount `BackToTop` in Portfolio

**Goal:** Wire the `BackToTop` component into the Portfolio page.

**Requirements:** R10

**Dependencies:** U1

**Files:**
- `client/src/components/Portfolio.tsx` (modify)

**Approach:**
- Import `BackToTop` from `./BackToTop`.
- Add `<BackToTop />` as a sibling of `<Navbar />` inside the Portfolio JSX return (alongside the other fixed/overlay elements).

Test expectation: none — no isolated logic; verified end-to-end with U1.

**Verification:** Portfolio page renders the button; all U1 behaviors work in the running app.

---

## Scope Boundaries

### Deferred to Follow-Up Work
- Adding back-to-top to other routes (Blog, BlogPost, ExploreMore, HonorsPortfolio) — the component is self-contained and ready to reuse; this is purely an integration step.
- Exposing the Lenis instance via React context — a prerequisite for custom scroll curves on any future scroll-linked animation (progress bar, parallax, etc.), but out of scope here.
