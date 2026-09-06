# MIKE — Design System & Visual UX Specification

**Version:** 1.0 (Draft for Implementation Planning)
**Status:** Ready for design/implementation handoff
**Companion document:** `docs/prd.md`

### Document Scope

This document defines **how MIKE looks, moves, and communicates state** — visual language, typography, layout, the 3D system, motion, and reusable components. Product behavior, functional requirements, and data lifecycle live in `docs/prd.md`. This document is written to be usable as a **design-system source for Stitch MCP** and a future implementation agent: values are given as concrete conceptual tokens, and rules are written as actionable constraints rather than mood-board language.

**Reference analysis.** The supplied reference (a Devialet-style product site) was analyzed for underlying principles, not copied: large editorial display type set against generous whitespace; a single floating hero object with soft studio lighting and a grounding contact shadow; restrained monochrome with the product itself as the only visual event; a horizontal, numbered collection/carousel pattern; calm, confident section pacing. None of Devialet's branding, imagery, copy, or layout is reproduced. Those principles are re-expressed below through an original visual identity built around MIKE's own subject: a temporary digital identity, not a physical audio product.

---

## Table of Contents

1. Design Philosophy
2. Visual Direction (Tokens)
3. Typography
4. Grid & Layout
5. 3D System — the MIKE Capsule
6. Landing Page
7. Hero
8. Product Demonstration
9. App Dashboard (Desktop)
10. Mobile App
11. Component System
12. Motion Design
13. Interaction Design
14. Accessibility
15. Responsive Breakpoint Strategy
16. Performance
17. Design Anti-Patterns
Appendix A — Stitch MCP Token Reference

---

## 1. Design Philosophy

MIKE should feel **premium, minimal, futuristic, calm, technical, editorial, intelligent, trustworthy, fast.** Every visual decision is judged against those nine words — if a treatment doesn't clearly serve one of them, it doesn't ship.

Concretely, that means:

- **Premium** through restraint and precision (spacing, alignment, type quality), never through ornament.
- **Futuristic** through the 3D capsule's material and light behavior, not through neon, glow-everything, or sci-fi UI chrome.
- **Calm** motion — the interface never competes with the message content for attention.
- **Technical** typography and layout — grid-true, quietly confident, at ease with monospace and structured data (OTP codes, timestamps, statuses).
- **Editorial** composition on the marketing surface — large type, asymmetric hero, generous negative space — closer to a product launch page than a SaaS homepage.
- **Intelligent** without performing intelligence — AI states are indicated clearly and briefly, then get out of the way of the answer.
- **Trustworthy** through consistency and clarity, especially around privacy and expiration — nothing vague, nothing overstated.
- **Fast** — perceived and actual. Skeletons over spinners, instant feedback on every action, 3D that never gates interaction.

**Explicitly avoided:** generic SaaS dashboard chrome, excessive gradients, noisy neon/cyberpunk color, heavy glassmorphism, decorative 3D with no state meaning, template-like component defaults, animation for its own sake, and any contrast/readability compromise made in service of "looking cool."

## 2. Visual Direction (Tokens)

MIKE uses a **restrained monochrome foundation with exactly one controlled accent** — never a multi-color or gradient-driven system.

MIKE runs **two coordinated surface modes**, both built from the same token structure:

- **Daylight** — the marketing/editorial surface. Light, warm-neutral, closest to the reference's premium studio-white feeling. Used for the public site.
- **Focus** — the application/workspace surface. Dark by default, because the capsule's glow-based state language (§5) and OTP/code emphasis read more clearly against a dark field, and a focused dark workspace suits a tool people dip into quickly. A light alternative of Focus is available as a user preference (Phase 2 setting per `prd.md` §32) built from the same tokens.

The accent, used only for meaning-bearing moments (primary action, active state, the capsule's internal signal, unread/notification indicators, focus rings), is called **Signal** — a cool electric indigo-blue, chosen because it reads as "a message arriving," not as a brand decoration.

### Token table (conceptual values)

| Token | Daylight | Focus (dark default) |
|---|---|---|
| `bg/primary` | `#F5F5F3` | `#0B0C0E` |
| `bg/secondary` | `#ECECE9` | `#131417` |
| `surface` | `#FFFFFF` | `#17181C` |
| `surface/elevated` | `#FFFFFF` (+ shadow/md) | `#1E2024` (+ shadow/md) |
| `text/primary` | `#121213` | `#F4F4F3` |
| `text/secondary` | `#57585C` | `#AEB0B4` |
| `text/muted` | `#8B8C90` | `#6E7075` |
| `border` | `#E2E2DF` | `#26282C` |
| `accent/signal` | `#3D5AFE` | `#6C87FF` |
| `success` | `#1F9D6D` | `#3FC98C` |
| `warning` | `#C88A1B` | `#E0A63B` |
| `error` | `#D6455A` | `#F16B7E` |

**Accent usage rule:** `accent/signal` is permitted only for — primary CTA fill, active navigation indicator, the capsule's internal glow/thread, unread/notification badges, OTP-card emphasis, and focus rings. It is never used as a large background fill, a decorative gradient stop, or a section background. If more than roughly 5% of a screen's visible area is accent-colored, that's a violation of this rule.

## 3. Typography

Directional reference only (final licensing is an implementation decision): a **geometric-grotesque display face** in the spirit of Neue Montreal / General Sans for display and headings; a **highly legible neutral grotesque** in the spirit of Inter for UI and body text; a **monospace with tabular figures** in the spirit of IBM Plex Mono / JetBrains Mono for OTP codes, timestamps, and technical metadata.

| Role | Weight | Size (desktop) | Size (mobile) | Line height | Tracking |
|---|---|---|---|---|---|
| Display / Hero | 650–700 | 72–120px (fluid) | 36–56px (fluid) | 0.95–1.02 | −0.02em |
| Section heading | 600 | 32–56px | 24–32px | 1.05–1.1 | −0.01em |
| Subheading / lede | 450 | 18–22px | 16–18px | 1.4 | 0 |
| Body | 400–450 | 16–18px | 16px | 1.5–1.6 | 0 |
| Caption / metadata | 500 | 12–13px | 12–13px | 1.4 | +0.02em, often uppercase (eyebrow labels) |
| Navigation | 500 | 14px | 14px | 1.2 | 0 |
| Code / OTP | 550–600 | 20–32px (OTP emphasis), 13–14px (inline) | 20–28px (OTP), 13px (inline) | 1.2 | +0.05em |

**Rules:**
- Display and section-heading sizes scale fluidly (e.g. CSS `clamp()`), not via fixed per-breakpoint jumps, so the editorial hierarchy never breaks mid-range.
- OTP codes are always set in the code typeface, in `text/primary`, on a distinct pill/card surface (`surface/elevated` + `accent/signal` outline) — never inline with body prose.
- Body copy never drops below 16px on mobile (accessibility requirement, `prd.md` §20).
- No more than three weights are used on any single screen: one for display/heading, one for body, one for emphasis.

## 4. Grid & Layout

| Property | Desktop | Tablet | Mobile |
|---|---|---|---|
| Columns | 12 | 8 | 4 |
| Max content width | 1280–1440px | fluid | fluid |
| Outer margin | 64–96px | 32–40px | 20px |
| Gutter | 24px | 20px | 16px |

**Spacing scale (4px base unit):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.

- **Section spacing (landing page):** 96–160px between major sections on desktop, 56–80px on mobile.
- **Card padding:** 24–32px desktop, 16–20px mobile.
- **Navigation spacing:** 16–24px between nav items, 64px+ clear space around the logo.

**Radius scale:** `sm` 8px (inputs, small chips) · `md` 16px (cards) · `lg` 24px (panels, modals, sheets) · `xl` 32px (the hero capsule stage container) · `pill` (buttons, tags, the address chip).

**Shadow scale (ambient, never hard-edged):**
- `shadow/sm` — `0 1px 2px rgba(0,0,0,0.04)` — resting cards.
- `shadow/md` — `0 8px 24px rgba(0,0,0,0.08)` — elevated surfaces, popovers.
- `shadow/lg` — `0 24px 64px rgba(0,0,0,0.14)` — the hero capsule stage, modals.

The layout is intentionally composed, not templated: hero and major landing sections use asymmetric column spans (e.g. a 7/5 or 8/4 split) rather than centered-everything defaults, echoing the reference's editorial confidence.

## 5. 3D System — the MIKE Capsule

**Primary object: the MIKE Capsule** — a single, reusable 3D language representing MIKE's core concept, a temporary digital identity.

### Geometry
An elongated capsule form (a rounded cylinder with soft hemispherical caps), very slightly asymmetric in its curvature so it reads as considered rather than a stock primitive. A thin internal line — the **signal thread** — runs the length of the capsule and is the only place `accent/signal` ever appears on the object itself.

### Material
- **Daylight:** a matte-satin, pearl-white translucent shell (soft subsurface-scattering feel, like frosted glass) — mirrors the reference's clean product-photography material language.
- **Focus:** a smoked, deep-graphite translucent shell — same geometry, darker and glassier, so it recedes into the dark workspace until it needs to communicate something.
- The shell is **never** colored with the accent; the accent only ever appears as internal glow, particles, or the signal thread — the object's identity is monochrome, its *activity* is Signal-colored.

### Lighting & grounding
Single soft key light from upper-left, soft ambient fill, a soft contact shadow beneath the capsule. Unlike the reference's literal pedestal, the MIKE Capsule **floats free** with only a soft ground shadow — reinforcing weightlessness and temporariness rather than a permanent product display.

### Idle motion
Slow vertical bob (~4–6s loop), subtle rotation drift (±3–5°). Calm, ambient — never a fast spin, never a bounce loop that reads as "loading."

### State language

| State | Trigger | Visual behavior |
|---|---|---|
| Empty / Waiting | Inbox created, no messages | Dim signal thread, slow breathing opacity pulse (0.4–0.7) |
| Message Received | New message arrives | One quick outward ripple pulse, shell briefly brightens, subtle scale bounce (1.0 → 1.04 → 1.0, ~400ms) |
| AI Processing | AI request in flight | Small particles orbit the thread; light traces circle the shell; duration follows real request latency (minimum visible ~600ms to avoid flicker, failure fallback after a bounded timeout) |
| Message Understood | AI result returned | 1–3 thin translucent "insight chips" emerge briefly, then settle toward the AI panel/list they populate |
| Expiring | Configured pre-expiry threshold crossed | Internal glow dims, thread pulse slows, a thin countdown ring appears around the capsule, a few motes drift from its edges |
| Deleted / Expired | Inbox deleted or lifecycle ends | Capsule dissolves into drifting motes over ~0.8–1.2s, then fades; empty-state illustration and "Create a new inbox" CTA take its place |

### Performance & fallback rules (binding — see also `prd.md` §21)

- The 3D layer **lazy-loads after** critical content paints; it never blocks inbox interaction.
- `prefers-reduced-motion` → all looping/entrance motion becomes a static, state-correct illustration; state is still conveyed via text/badge (accessibility requirement).
- Mobile uses a simplified variant: lower-poly geometry or a pre-rendered sprite/video loop rather than a full real-time WebGL scene, especially on lower-tier devices.
- If WebGL is unavailable, a static SVG/PNG illustration exists for every state in the table above — the product must never show a broken canvas or an empty gap.
- Asset budget: target under ~2MB gzipped for the primary experience.
- 3D is decorative/supportive only — every state it communicates is also communicated in text (see §14).

## 6. Landing Page

Structure (see §7–§8 for Hero and Product Demonstration detail):

```
Hero
  ↓
Live Inbox Experience  (Product Demonstration, §8)
  ↓
AI Inbox
  ↓
Notes + Todo
  ↓
Privacy
  ↓
How MIKE Works
  ↓
Final CTA
  ↓
Footer
```

This order is retained from the brief's structure because it follows sound show-then-explain sequencing: prove the product works (Hero → live demo) before explaining the mechanics (How MIKE Works), and address trust (Privacy) after the user has already seen enough to want reassurance, not before they've seen anything worth trusting.

| Section | Objective | Layout | Content hierarchy | 3D behavior | Scroll behavior | Animation | CTA | Responsive |
|---|---|---|---|---|---|---|---|---|
| Hero | Communicate what MIKE is and prompt inbox creation in one glance | Asymmetric, capsule stage right/center, headline left/center (see §7) | Logo/nav → headline → subhead → CTAs → capsule | Idle float, Empty/Waiting state | Fixed/pinned briefly, then releases into normal scroll | Headline/CTA fade-up on load; scroll-cue chevron bobs | Primary: Create free inbox · Secondary: See how it works | Capsule shrinks and moves above headline (stacked, not side-by-side) |
| Live Inbox Experience | Prove the product is real by showing it work | Full-bleed panel containing an address chip, countdown, and a scripted illustrative message arriving | Address/countdown → incoming message → opened message → AI summary + OTP | Message Received → AI Processing → Message Understood sequence, looped as an illustrative demo | Section pins briefly while the demo sequence plays once per view | Card entrance stagger (30–50ms), OTP reveal emphasis | none (demonstration only) | Sequence simplifies to a single vertical flow, capsule appears only at the top as a small status chip |
| AI Inbox | Explain the AI layer's value concretely | Two-column: short claim + a real-looking AI insight card | Claim → example insight card → link to detail | Small capsule "processing → understood" loop, secondary to the card | Standard reveal-on-scroll | Insight card elements stagger in | Learn more (anchor to How MIKE Works) | Stacks to single column, card first |
| Notes + Todo | Show the workspace extends the inbox rather than sitting apart from it | Two lightweight cards side by side, visually derived from an email→note / email→todo action | Headline → note card → todo card | None (capsule not needed here — keeps 3D meaningful, not omnipresent) | Standard reveal-on-scroll | Card entrance fade-up | none | Cards stack vertically |
| Privacy | Build trust with accurate, specific claims | Editorial text block, generous whitespace, no card clutter | Principle statement → 3–4 concrete facts (lifecycle, deletion, no-account, AI opt-out) | None | Standard reveal-on-scroll | Text fade-up only, deliberately quiet | Read the privacy page | Single column, unchanged proportionally |
| How MIKE Works | Explain the mechanism plainly | Horizontal numbered sequence (echoes the reference's numbered collection pattern) | Step number → short label → one-line description | Small static capsule icon per step keyed to its 3D state | Horizontal scroll-snap on desktop, vertical stack on mobile | Steps reveal in sequence as scrolled/swiped past | none | Horizontal strip becomes a vertical numbered list |
| Final CTA | Convert | Centered, generous whitespace, single focal capsule | Short headline → single CTA | Capsule Empty/Waiting, gentle idle float | Standard reveal-on-scroll | Understated — no more than a fade-up | Create free inbox | Unchanged proportionally, just narrower |
| Footer | Navigation + legal + trust | Simple multi-column link layout | Logo/tagline → links → legal | None | N/A | None | none | Columns stack |

## 7. Hero

**Headline direction:** *"Here when you need it. Gone when you don't."*
**Subhead direction:** "MIKE gives you a real inbox — read, understood, and organized by AI — for exactly as long as you need it. Then it disappears."

(Wording above is a strong default, not a locked script — it satisfies the requirement to communicate what MIKE is, why it exists, and what to do next; copywriting may iterate on it.)

- **Navigation:** minimal top bar — MIKE logotype left; a small number of links (How it works, Privacy) center or right; a pill-shaped primary action ("Open MIKE") right, echoing the reference's pill "Buy" button but purposed as the product's own entry point.
- **Primary CTA:** *Create free inbox* — filled, `accent/signal`, pill radius.
- **Secondary CTA:** *See how MIKE works* — ghost/outline button, anchors to the "How MIKE Works" section.
- **Central object:** the MIKE Capsule (§5) in its Empty/Waiting state, large, centered or slightly offset right, floating above a soft contact shadow.
- **Scroll cue:** a small chevron beneath the capsule, slow vertical bob, identical spirit to the reference's down-arrow — signals there's more without competing with the headline.

The hero must work with the capsule's non-WebGL fallback in place — a static hero illustration and the headline alone must still clearly communicate the product if 3D fails to load (§5, §16).

## 8. Product Demonstration

This is the section that makes MIKE understandable without documentation — it shows, inside a single contained panel, the entire core loop: address → real message → AI understanding → action.

**Composition, top to bottom or left to right (desktop uses a horizontal 2–3 stage layout; mobile stacks vertically):**

1. **Address & countdown** — the generated address in a monospace pill, a copy button, and a slim circular countdown.
2. **Incoming message** — a message row animates into the list (Message Received capsule state plays alongside it).
3. **Opened message + AI panel** — the message body appears with the AI panel sliding in beside/beneath it: a one-line summary, an OTP card (large monospace code + Copy button), and extracted link chips.
4. **Actions** — Save to Notes / Create Todo buttons, demonstrating email → workspace conversion.

**Critical constraint:** everything shown here is a **scripted illustrative sequence**, clearly distinct from the authenticated application. It exists to demonstrate the mechanism, not to imply this specific message is real user data. This satisfies both goals from `prd.md`: the marketing page may illustrate the product vividly, while the real, logged-in application never fabricates inbox content, AI output, or success states (`prd.md` §"Real Product Requirement", §36).

## 9. App Dashboard (Desktop)

Structure: **floating navigation rail + inbox workspace + optional contextual AI panel.**

- **Floating nav rail** (left, `surface/elevated`, `radius/lg`, detached from the viewport edge with margin rather than flush — reinforces "floating," not "fixed sidebar"): primary items **Inbox · Notes · Todo · AI**; secondary items **Settings · Privacy · Help** grouped toward the bottom, visually separated.
- **Top bar (inbox workspace):** address chip (monospace, copyable), countdown, Regenerate and Delete actions, AI on/off toggle.
- **Main workspace:** two- or three-pane layout — message list, reading pane, and an optional contextual AI panel that can be toggled open/closed per message rather than always consuming width.
- No navigation items beyond the eight named above — the brief for "no unnecessary navigation" is treated as a hard constraint, not a suggestion.

## 10. Mobile App

Mobile is a **dedicated experience**, not a shrunk desktop layout.

- **Compact top bar:** logo/menu control + address/countdown chip (tap to expand full address + copy).
- **Bottom navigation:** Inbox · Notes · Todo · AI as four large-touch-target tabs (Settings/Privacy/Help nest inside a fifth "More" or inside Settings itself reached from the Inbox top bar — kept off the primary bar to avoid crowding five items where four reads cleaner).
- **Message interaction:** swipe-to-delete and swipe-to-save-as-note directly from the list; tapping opens a full-screen reader.
- **AI on mobile:** presented as a bottom sheet over the opened message rather than a side panel — summary, OTP card, and action buttons in a single thumb-reachable column.
- **Simplified 3D:** the capsule appears prominently only on the Inbox tab's empty/loading state and major transitions (received, expiring, deleted); elsewhere its state is represented by a small static status icon/badge to protect performance and avoid a persistent distraction while reading.
- **Notes/Todo on mobile:** full-screen editor with a compact bottom formatting toolbar (Notes) and swipe-to-complete/delete rows (Todo), per `prd.md` §13.2/§14.2.

## 11. Component System

| Component | Visual role | Key states |
|---|---|---|
| `MIKELogo` | Wordmark/mark, minimal, monochrome | static; never re-colored with accent |
| `Capsule3D` | The MIKE Capsule renderer | Empty · Received · Processing · Understood · Expiring · Deleted · static-fallback |
| `PrimaryButton` | Main call to action, filled `accent/signal`, pill radius | default/hover/active/focus/disabled/loading |
| `SecondaryButton` | Outline/ghost, `text/primary` border | default/hover/active/focus/disabled |
| `GlassButton` | Subtle translucent surface button for use over the capsule stage/hero imagery only | default/hover/active — used sparingly, never for primary actions |
| `EmailAddressCard` | Monospace address + copy action | default/copied (brief confirmation)/loading |
| `ExpirationTimer` | Circular or slim countdown | normal/expiring (accent shift toward `warning`)/expired |
| `InboxList` | Message rows | loading (skeleton)/empty/populated/error |
| `EmailCard` | Single row: sender, subject, preview, AI badge | unread/read/selected |
| `EmailViewer` | Full message render pane | loading/rendered/render-error/images-blocked |
| `AIInsightCard` | Summary + extracted entities container | loading (Capsule "Processing")/success/failure/unavailable |
| `OTPCard` | Large monospace code + Copy | default/copied/none-detected |
| `NoteCard` | Note preview in list | default/pinned/archived |
| `TodoItem` | Single task row | open/completed/overdue |
| `TodoGroup` | Today/Upcoming/Completed section | expanded/collapsed/empty |
| `FloatingNav` | Desktop nav rail | default/active-item |
| `BottomNav` | Mobile nav bar | default/active-tab |
| `Search` | Inline search field | default/focused/no-results |
| `Toast` | Transient confirmation/error | success/error/info |
| `Modal` | Centered confirmation/detail (desktop) | default/destructive-variant |
| `Sheet` | Bottom sheet (mobile equivalent of Modal) | default/destructive-variant |
| `CommandMenu` | Keyboard-driven quick actions (desktop) | closed/open/filtered |
| `EmptyState` | No-content illustration + CTA | per-screen variants (§`prd.md` §18) |
| `LoadingState` | Skeleton pattern | per-screen variants |
| `ErrorState` | Scoped failure + retry | per-error-class variants (`prd.md` §17) |
| `ExpiredState` | Post-expiry inbox view | terminal state, CTA to recreate |

## 12. Motion Design

- **Duration philosophy:** UI feedback (button press, copy confirmation) 120–200ms; content transitions (panel open, message open) 240–400ms; section/page reveals 400–600ms; ambient capsule loops 4–8s.
- **Easing philosophy:** standard ease-out for anything entering the screen; ease-in-out for ambient/looping motion; a subtle single overshoot (spring-like) reserved only for the capsule's "Message Received" pulse — the one moment motion is allowed to feel slightly energetic.
- **Stagger:** list/card entrances stagger 30–50ms per item, capped so a long list never takes more than ~400ms total to finish revealing.
- **Reduced motion:** every animation in this section has a defined reduced-motion fallback — a plain cross-fade (150ms) or an instant state change, never full removal of feedback (the user must still see *that* something happened, just not *how*).
- Motion is used to communicate exactly one of: state change, spatial relationship, or feedback. Anything else is decoration and is cut.

## 13. Interaction Design

| State | Treatment |
|---|---|
| Hover | Subtle elevation increase (`shadow/sm` → `shadow/md`) or background tint, 150ms |
| Focus | 2px `accent/signal` outline, 2px offset — always visible, never suppressed |
| Active / Pressed | Slight scale-down (0.98) on buttons, 100ms |
| Disabled | Reduced opacity (~40%), no hover/active response, cursor indicates non-interactive |
| Loading | Skeleton pattern preferred over spinners; button loading state replaces label with a small inline indicator, keeps button width stable |
| Success | Brief `success` color flash on the affected element + toast where the change isn't otherwise obvious (e.g. "Copied") |
| Error | `error` color on the affected field/element + inline message, never a color change alone |
| Expired | Desaturated/muted treatment of the affected object (message, inbox) paired with explicit label text |
| Empty | Illustration + one-line copy + a direct action — never an empty screen with no next step |

**Keyboard behavior (desktop):** arrow keys move selection through the message/notes/todo list currently in focus; `Enter` opens the selected item; `Escape` closes the open panel/modal/sheet; `/` focuses search; single-letter shortcuts for common actions (e.g. `c` copy address, `n` new note, `t` new task, `r` refresh inbox) are available and must not conflict with browser/OS shortcuts or interfere while a text field has focus.

## 14. Accessibility

- Contrast: body text ≥ 4.5:1, large text/UI elements ≥ 3:1, checked against both Daylight and Focus tokens above.
- Full keyboard navigation per §13; nothing is mouse/touch-only.
- Focus is always visible (§13) — never `outline: none` without an equally visible replacement.
- Semantic landmarks (`header`/`nav`/`main`) and a correct heading hierarchy on every screen.
- `aria-live="polite"` regions announce: new message arrival, AI processing completion, copy confirmations, and inbox state transitions (expiring/expired).
- Every decorative Capsule3D state (§5) ships with a plain-text equivalent (e.g. `aria-label="Inbox status: waiting for messages"`) — the 3D object is never the sole carrier of state information.
- `prefers-reduced-motion` is respected globally (§5, §12).
- Minimum touch target 44×44px on mobile; minimum body text 16px on mobile.

## 15. Responsive Breakpoint Strategy

| Aspect | Mobile (<640px) | Tablet (640–1024px) | Desktop (1024–1440px+) |
|---|---|---|---|
| 3D capsule | Simplified sprite/light geometry; shown at key states only (§10) | Full geometry, slightly reduced particle counts | Full geometry and effects |
| Navigation | Bottom tab bar | Bottom tab bar or condensed rail depending on orientation | Floating nav rail |
| Cards | Full-width, stacked | 2-column where content allows | Multi-column / multi-pane |
| Typography | Fluid scale lower end (§3) | Mid-range fluid scale | Fluid scale upper end |
| Spacing | Compact (16–20px margins) | Medium (32–40px margins) | Generous (64–96px margins) |
| Email viewer | Full-screen reader | Slide-over panel or split view | Split pane (list + reader) |
| Notes | Full-screen editor | Split or full-screen depending on width | List + editor side by side |
| Todo | Single-column grouped list | Single or two-column grouped list | Multi-column grouped list |
| AI panel | Bottom sheet | Slide-over panel | Optional side panel, toggleable |

## 16. Performance

- WebGL context is created only after the app shell/marketing hero critical content has painted; it never delays Largest Contentful Paint.
- Lazy-load the 3D bundle, geometry, and textures as a separate chunk; code-split by route so `/notes` and `/todo` never pull in inbox- or capsule-specific code.
- Images: modern formats (AVIF/WebP) with responsive sizes; no full-resolution desktop assets served to mobile.
- Animation runs on `transform`/`opacity` only to stay off the main thread's layout/paint path; no animating `width`/`height`/`top`/`left` for anything performance-sensitive.
- Mobile GPU tier is treated heuristically (e.g. device memory/connection hints) to decide between full capsule geometry, the simplified variant, or the static fallback — defaulting to the safer/lighter option when uncertain.
- `prefers-reduced-motion` and the WebGL-unavailable fallback (§5) are both load-bearing performance strategies, not just accessibility features — they are the guaranteed low-cost path.
- Loading strategy favors skeleton screens over spinners everywhere feasible, since they communicate structure and perceived speed simultaneously.

## 17. Design Anti-Patterns

Future implementation agents must **not**:

- Default to a generic Tailwind admin-dashboard look (card grid + sidebar + top bar with no point of view).
- Reach for a generic AI-SaaS aesthetic — a dark theme with a glowing orange/purple hero orb and a bento-grid feature section is a recognizable template cliché and is explicitly out of bounds for MIKE, regardless of how common it is elsewhere.
- Use excessive rounded corners on every surface indiscriminately — the radius scale in §4 is deliberate and role-based, not applied uniformly.
- Use gradients as a primary design tool; MIKE's color story is monochrome-plus-one-accent (§2).
- Add giant neon text, glow-everything effects, or noisy cyberpunk color.
- Scatter unmotivated glass panels — glassmorphism is limited to the narrow `GlassButton` case (§11) and never used broadly.
- Add sidebar navigation items beyond the eight named in §9 "to fill space."
- Over-animate — if a motion doesn't communicate state, spatial relationship, or feedback (§12), cut it.
- Fabricate inbox messages, AI responses, counters, timers, or success states anywhere in the authenticated application (`prd.md` §36) — the Product Demonstration section (§8) is the one explicitly scripted exception, and it must be visually distinct from the real app shell.
- Design desktop-first and treat mobile as an afterthought — §10 and §15 are binding, not optional polish.
- Use the 3D capsule decoratively without tying it to one of the defined states in §5.
- Ship poor contrast in the name of "premium minimalism" — §14's contrast requirements are non-negotiable.
- Build oversized, padding-heavy mobile layouts that waste the viewport instead of using the compact, purpose-built mobile patterns in §10.
- Copy the uploaded reference website's literal layout, imagery, or branding — only its underlying principles (§ intro) are in scope.

---

## Appendix A — Stitch MCP Token Reference

Consolidated, machine-readable-ish reference for design tooling and implementation agents. Values are conceptual design tokens, not code.

**Colors** — see full table in §2. Structure: `bg/primary`, `bg/secondary`, `surface`, `surface/elevated`, `text/primary`, `text/secondary`, `text/muted`, `border`, `accent/signal`, `success`, `warning`, `error` — each defined for both `Daylight` and `Focus` modes.

**Typography** — see full scale in §3. Roles: `display`, `heading`, `subheading`, `body`, `caption`, `nav`, `code`. Each role carries weight, fluid size range (desktop/mobile), line-height, and tracking.

**Spacing scale (px):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`

**Radius scale:** `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `pill: 999px`

**Shadow scale:** `sm: 0 1px 2px rgba(0,0,0,.04)`, `md: 0 8px 24px rgba(0,0,0,.08)`, `lg: 0 24px 64px rgba(0,0,0,.14)`

**Component state matrix:** every interactive component (§11) supports the state set defined in §13 — `default / hover / focus / active / disabled / loading / success / error` — plus any component-specific states listed in its row in §11.

**Responsive rules:** breakpoints `mobile <640px`, `tablet 640–1024px`, `desktop 1024–1440px`, `large-desktop >1440px`; per-aspect behavior at each breakpoint is defined in §15.

**Motion tokens:** `duration/feedback: 120–200ms`, `duration/transition: 240–400ms`, `duration/reveal: 400–600ms`, `duration/ambient: 4000–8000ms`; `easing/standard: ease-out`, `easing/ambient: ease-in-out`, `easing/emphasis: single-overshoot spring (Message Received only)`.

**3D state set:** `empty`, `received`, `processing`, `understood`, `expiring`, `deleted` — each requires (a) a real-time/WebGL variant, (b) a simplified mobile variant, and (c) a static non-WebGL fallback, per §5 and §16.

**Page composition reference:** landing-page section order and per-section rules are defined in §6; Hero in §7; Product Demonstration in §8; the authenticated app's desktop layout in §9 and mobile layout in §10.

This appendix intentionally repeats structure already defined above rather than introducing new values — it exists so a tool consuming this document can locate every token family from one place before cross-referencing the fuller rationale in the numbered sections.
