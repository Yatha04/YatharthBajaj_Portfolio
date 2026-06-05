---
title: "fix: Remove double-click navigation to /videos from home page"
date: 2026-06-05
status: active
type: fix
---

# fix: Remove double-click navigation to /videos from home page

## Summary

Remove the hidden double-click gesture on the home page name that navigates to `/videos`, and clean up the now-orphaned `/videos` route, component, and data file.

## Problem Frame

Clicking the "Yatharth Bajaj" name on the home page twice in quick succession triggers a custom double-click handler that navigates to `/videos`. This is an undiscoverable interaction that can fire accidentally. The `/videos` page is only reachable via this hidden gesture — there are no navbar links, anchor tags, or other entry points to it.

Scope: Remove the gesture entirely, along with all dead code it leaves behind.

Out of scope: Any changes to the Navbar, other routes, or unrelated components.

---

## Requirements

- R1: Double-clicking the name on the home page must no longer navigate away
- R2: The `/videos` route must no longer exist in the router
- R3: No orphaned imports, state, or files should remain after removal

---

## Implementation Units

### U1. Remove double-click handler from Portfolio

**Goal:** Strip the click-tracking state and handler from `Portfolio`, and remove the `onClick` prop passed to `MobileHero` and `ParticleText`.

**Requirements:** R1, R3

**Dependencies:** none

**Files:**
- `client/src/components/Portfolio.tsx`

**Approach:**
- Remove `useNavigate` import from `react-router-dom`
- Remove `lastClickTime` state and `DOUBLE_CLICK_DELAY` constant
- Remove `handleNameClick` function
- Remove `onClick={handleNameClick}` from both `<MobileHero>` and `<ParticleText>` usages
- Keep all other props on those components unchanged

**Patterns to follow:** Existing component structure in `Portfolio.tsx`

**Test scenarios:**
- Clicking the name once does nothing (no navigation, no state change)
- Double-clicking the name rapidly stays on the home page
- Single-click on the name area does not trigger any side effect

**Verification:** Home page renders, name is clickable but causes no navigation on single or double click.

---

### U2. Remove /videos route and orphaned files

**Goal:** Delete the `/videos` route from the router, remove its import, and delete the now-unused `Videos` component and `videos` data file.

**Requirements:** R2, R3

**Dependencies:** U1

**Files:**
- `client/src/App.tsx`
- `client/src/components/Videos.tsx` (delete)
- `client/src/data/videos.ts` (delete)

**Approach:**
- Remove `import { Videos } from './components/Videos'` from `App.tsx`
- Remove `<Route path="/videos" element={<Videos />} />` from the `<Routes>` block
- Delete `client/src/components/Videos.tsx`
- Delete `client/src/data/videos.ts`

**Test scenarios:**
- Navigating to `/videos` in the browser should fall through to the `path="*"` catch-all route (renders `Portfolio`)
- No TypeScript compile errors after removal
- No unused import warnings

**Verification:** `tsc --noEmit` passes, app builds without errors, visiting `/videos` lands on the home page.
