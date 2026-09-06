# MIKE — Product Requirements Document

**Version:** 1.0 (Draft for Implementation Planning)
**Status:** Ready for design/implementation handoff
**Owner:** Product Architecture
**Companion document:** `docs/design.md`

### Document Scope

This PRD defines **what MIKE must do and why** — product behavior, functional requirements, states, and acceptance criteria. Visual language, layout, typography, motion, and the 3D system live in `docs/design.md`. Neither document contains implementation code; both exist to brief a future implementation agent (OpenCode) and design tooling (Stitch MCP) with an unambiguous, real-functionality-first specification.

Three concerns are intentionally kept separate across the two files:

| Concern | Lives in |
|---|---|
| Product Requirements — user goals, features, states, data lifecycle, acceptance criteria | `prd.md` (this file) |
| Design Requirements — visual system, typography, layout, 3D, motion, components | `design.md` |
| Implementation Constraints — architectural boundaries a build agent must respect (provider abstraction, performance budgets, security rules) | Called out explicitly in both files, concentrated in `prd.md` §25–30 and `design.md` §16–17 |

---

## Table of Contents

1. Product Overview
2. Product Vision
3. Problem Statement
4. Target Users
5. User Jobs To Be Done
6. Product Principles
7. Core User Journey
8. Information Architecture
9. Feature Requirements (Overview)
10. Temporary Email Requirements
11. Inbox Requirements
12. AI Inbox Requirements
13. Notes Requirements
14. Todo Requirements
15. Privacy Requirements
16. Abuse Prevention
17. Error Handling
18. Loading / Empty / Expired States
19. Responsive Requirements
20. Accessibility Requirements
21. Performance Requirements
22. SEO Requirements
23. PWA Considerations
24. Analytics Considerations
25. Technical Architecture Requirements
26. Provider Abstraction
27. API Integration Requirements
28. Data Lifecycle
29. Security Requirements
30. Non-Functional Requirements
31. MVP Scope
32. Phase 2
33. Phase 3
34. Out of Scope
35. Acceptance Criteria
36. Definition of Done

---

## 1. Product Overview

MIKE is a free, browser-based **temporary email and disposable-inbox platform** with a built-in **AI inbox layer** and a lightweight **productivity workspace** (Notes + Todo). A visitor generates a real, working email address in one action; MIKE stands up a real inbox behind it; incoming mail arrives and is rendered like a real email client; an AI layer reads each message and turns it into something useful — a summary, a verification code, a link, a task — without the user having to read boilerplate. The inbox expires on a defined lifecycle, by design, and the user can delete it at any time.

MIKE is not a landing page, not a concept demo, and not a UI shell around fake data. Every screen described in this document is expected to reflect **real backend state** — a real generated address, a real inbox, real incoming messages, and AI output generated from that real message content.

## 2. Product Vision

> **"A temporary digital workspace for the modern web."**

The internet increasingly requires an email address just to try something once — a coupon, a trial, a forum, a download gate. MIKE exists so that transaction doesn't cost the user their real inbox, their attention, or their privacy. MIKE gives people a **temporary digital identity**: an inbox that exists exactly as long as it's useful, is smart enough to save them from reading the email at all, and disappears cleanly when they're done.

The product should feel fast, calm, and quietly intelligent — closer to a premium, purpose-built tool than a generic "temp mail" utility site.

## 3. Problem Statement

- Users are routinely required to provide an email address for low-trust, one-time interactions (signups, downloads, promotions, verifications), exposing their real inbox to spam and data harvesting.
- Existing free temporary-email tools are typically ad-heavy, visually dated, untrustworthy-feeling, and offer no help understanding what arrived — the user still has to read the email, find the code, and act on it manually.
- Useful information inside a disposable email (a code, a link, a confirmation detail) is often needed *after* the inbox is gone, with no lightweight way to preserve it.
- There is no product that treats "temporary" as a first-class, well-designed experience rather than a technical inconvenience bolted onto a form.

## 4. Target Users

| Persona | Description | Primary need |
|---|---|---|
| **Privacy-conscious signer-upper** | Everyday user signing up for a one-off service, trial, download, or discount code | A trustworthy, fast way to avoid giving out their real address |
| **Builder / tester** | Developer, QA engineer, or indie hacker validating signup/verification flows | Fast inbox creation, reliable code delivery, low friction |
| **Deal-seeker** | User claiming single-use promos, coupons, or "verify to unlock" content | Speed — generate address, get code, done |
| **Light knowledge worker** | Freelancer or consultant fielding a one-off exchange (a contract link, a confirmation) tied to a transaction | Somewhere to park the useful bit of information before the thread is gone |

## 5. User Jobs To Be Done

- "When I need to sign up for something I don't trust with my real email, I want a working inbox in one click, so I can finish the signup without risking spam."
- "When a verification email arrives, I want the code surfaced immediately, so I don't have to open and read the email."
- "When an email contains something I'll need later, I want to save it in one action, so it survives after the inbox expires."
- "When I'm done, I want the inbox and its contents to actually go away, so I don't have to trust a vague privacy promise."
- "When I'm mid-task, I want a place to jot a note or a follow-up task without leaving the tool I'm already in."

## 6. Product Principles

1. **Temporary by design, not by accident.** Expiration is a designed, communicated part of the product — never a silent failure.
2. **Real over fake.** Every visible state reflects real backend truth. No fabricated counters, timers, messages, or AI output outside explicitly marked illustrative examples on the marketing site.
3. **Speed is a feature.** Address generation, message arrival, and AI insight should all feel close to instant.
4. **AI assists, never obscures.** AI output supplements the real email; the real message is always one tap away, never replaced.
5. **Privacy through architecture, not promises.** Claims in-product and in marketing are limited to what the architecture actually guarantees.
6. **One coherent workspace, not four bolted-together tools.** Inbox, AI, Notes, and Todo all orbit a single concept: a temporary digital identity.
7. **Calm technical confidence over flashy gimmicks.** Motion and 3D communicate state; they never perform for their own sake.

## 7. Core User Journey

| Phase | Step | User action | System response |
|---|---|---|---|
| Arrive | 1 | Lands on MIKE | Marketing site or app shell loads instantly |
| Generate | 2 | Generates a temporary address | Real inbox is created behind a real address; countdown begins |
| Wait | 3 | Copies address, uses it elsewhere | Inbox polls/listens for incoming mail |
| Receive | 4 | Real email arrives | Message appears in the list in near real time; unread indicator, capsule reacts |
| Understand | 5 | Opens the message | Full message renders (HTML + text fallback); AI begins processing automatically (if enabled) |
| Act | 6 | Reads AI summary, copies a code, opens a link | Verification code and links are surfaced as structured, one-tap actions |
| Extend | 7 | Saves something for later | Converts email/AI output into a Note or a Todo |
| Repeat | 8 | Needs another address, or the same task again | Regenerates inbox (destroys current one) or returns later within the lifecycle |
| Expire | 9 | Does nothing further, or lifecycle ends | Inbox transitions to expiring → expired → deleted automatically |
| Leave | 10 | Manually deletes early | Inbox and messages are deleted immediately, no recovery |

## 8. Information Architecture

**Marketing surface** (public, indexable):

```
/                    Home / landing
/how-it-works
/privacy
/security
/help (or /faq)
```

**Application surface** (functional, session-bound, not indexable):

```
/app                 Inbox (default view)
/app/inbox/:messageId
/app/notes
/app/notes/:noteId
/app/todo
/app/ai              (contextual panel on desktop; own tab on mobile)
/app/settings
/app/settings/privacy
```

**Primary navigation (app shell):** Inbox · Notes · Todo · AI
**Secondary navigation (app shell):** Settings · Privacy · Help

Visiting `/app` with no active session **auto-provisions a new inbox immediately** — the fastest possible path to value — while still surfacing an explicit "Generate new address" / "Choose a custom name" control for users who want control. No login or account is required to reach or use the core product.

---

## 9. Feature Requirements (Overview)

| Feature | Priority | Scope | One-line description |
|---|---|---|---|
| Temporary Email | P1 | MVP | Generate a real, working disposable email address on demand |
| Inbox | P1 | MVP | Real-time list and viewer for incoming mail against that address |
| AI Inbox | P2 | MVP (core) / Phase 2 (advanced) | AI reads each message and extracts summary, codes, links, and actions |
| Notes | P3 | MVP (basic) | Lightweight, fast note-taking, including email → note |
| Todo | P4 | MVP (basic) | Lightweight task tracking, including email → todo |
| Privacy & Lifecycle | P5 | MVP | Expiration, deletion, and accurate privacy messaging |
| Abuse Prevention | Cross-cutting | MVP | Rate limiting, size limits, receive-only architecture |
| Accounts (optional) | — | Phase 2 | Cross-device sync for Notes/Todo only — never for the inbox itself |

Every feature below is specified against **real application state**. Where an example shows sample content (e.g., a sample verification email), it is explicitly marked as an illustrative example and must never be implemented as literal mock data in the shipped product.

---

## 10. Temporary Email Requirements

### 10.1 Functional requirements

- **Generate temporary email:** one primary action creates a new inbox and a new unique address. No form fields required for the default path.
- **Unique address:** addresses are generated from a collision-checked pool (random word/number combination or random string), never reused while any record of the prior inbox could still resolve to it.
- **Custom local-part (optional):** user may request a specific local-part (e.g. `chosen-name@domain`); system validates availability and format, falls back to suggesting an available alternative on collision.
- **Supported domains:** MIKE supports a configurable **pool of inbox domains** (a primary branded domain plus one or more backup domains), rotated automatically if a domain is rate-limited, blocklisted by a receiving mail server, or reported as abused. Domain selection is a backend concern; the user is not required to choose one, but power users may pick from the available pool.
- **Inbox creation:** creating an address always creates exactly one backing inbox record with a defined lifecycle start time.
- **Inbox lifecycle / expiration timer:** every inbox has an explicit, visible expiration time, selectable at creation from a small set of durations (e.g. 10 minutes / 1 hour / 1 day). A visible countdown is always present in the app shell.
- **Lifecycle extension:** the user may extend an active inbox in fixed increments before it expires, up to a hard-capped maximum total lifetime (see §28). Extension is not available once an inbox has expired.
- **Regenerate inbox:** destroys the current inbox and all its messages immediately and irreversibly, then creates a new one. Requires explicit confirmation.
- **Delete inbox:** user-triggered, immediate, irreversible deletion of the inbox and its messages, independent of the expiration timer.

### 10.2 Message data model

Sender · Recipient · Subject · Timestamp (received time, displayed in user's local time) · Message body (HTML + plain-text fallback) · Read/unread state · Size · Attachment metadata (filename, MIME type, size — not the file itself in MVP, see §10.5).

### 10.3 Message list & detail

- **Message list:** reverse-chronological, shows sender, subject, short preview, relative timestamp, unread indicator, and (once processed) an AI-generated one-line summary and/or a detected verification code badge — all sourced from real AI output, never placeholder text.
- **Message detail:** renders the real HTML email in a **sandboxed context** (see §29) with a plain-text fallback when no HTML part exists or HTML fails to render safely. Remote images are blocked by default (tracking-pixel mitigation) with an explicit "Load images" action.
- **Refresh strategy:** the client maintains a live channel (polling or push, see §25) to the backend; new messages appear without a manual refresh. A manual refresh control is always available as a fallback and to communicate "you are up to date."
- **Unread state:** new messages are unread by default; opening a message marks it read; unread count is reflected in the app shell and (if enabled) the browser tab/favicon.

### 10.4 Core actions

| Action | Behavior |
|---|---|
| Copy email address | Copies the full address to the clipboard with confirmation feedback |
| Copy verification code | One-tap copy of an AI-detected code, available directly from the message list without opening the message |
| Open link | Opens an extracted link in a new tab; user is shown the destination domain before navigating for untrusted links |
| Delete message | Removes a single message from the inbox view (does not affect the inbox itself) |
| Delete inbox | See §10.1 |
| Regenerate inbox | See §10.1 |

### 10.5 Constraints (real-infrastructure requirements)

MIKE must not assume unlimited free infrastructure. The following are explicit product constraints, not just backend detail:

- **Rate limiting:** inbox creation and message polling are rate-limited per session/IP (see §16).
- **Message size limits:** rendered message body is capped (e.g. ~512 KB of HTML). Messages beyond the cap are truncated in-app with a clear "message truncated" notice; if the provider exposes a raw-fetch endpoint, a "view full message" fallback is offered.
- **Attachment policy (MVP):** attachments are **not downloaded, rendered, or stored** — MIKE shows attachment metadata only (filename, type, size) with a notice that attachments aren't available, for security and cost reasons. Safe preview of small image/PDF attachments is a Phase 2 consideration (§32), gated on malware-scanning capability.
- **Domain/provider failures:** if the active domain or provider is degraded, the system automatically falls back to a backup domain/provider where possible; if no fallback succeeds, the user sees an explicit error state (§17), never a silently broken inbox.
- **API failure handling:** every provider call (create, list, get, delete) has a defined retry policy (bounded exponential backoff) before surfacing an error state.

---

## 11. Inbox Requirements

### 11.1 States

| State | Trigger | UI behavior |
|---|---|---|
| Empty | Inbox created, no messages yet | Empty-state illustration/copy: "Waiting for your first message." Address and countdown remain visible and actionable. |
| Loading | Initial inbox/message fetch in progress | Skeleton list, not a blocking spinner; address chip loads first since it's already known client-side. |
| Populated | ≥1 message present | Standard list + detail view. |
| Expiring | Configurable threshold before expiry (e.g. last 2 minutes, or last 10% of lifetime) | Persistent, non-blocking warning; countdown emphasized; "Extend" action surfaced if extensions remain available. |
| Expired | Lifecycle end reached | Inbox becomes read-only for any messages still cached client-side for a short grace window, then is cleared; primary action becomes "Create a new inbox." |
| Deleted | User-triggered deletion | Immediate transition to the empty/start state; no undo. |
| Error | Any provider/API failure | See §17; always paired with a retry action. |

### 11.2 Deep-dive: Generate temporary inbox

| Dimension | Specification |
|---|---|
| User goal | Get a working, disposable address as fast as possible |
| Behavior | Single primary action; backend creates the inbox and returns the address and expiry synchronously or near-synchronously |
| Expected UI state | Address appears with a copy action and a running countdown the instant creation succeeds |
| Success state | Address visible, copyable, countdown running, empty inbox state shown beneath it |
| Failure state | Explicit error with retry; system attempts a backup domain/provider automatically before surfacing failure |
| Edge cases | Local-part collision on custom name; domain exhausted; rate limit hit; user already has an active session inbox (offer "keep current" vs "replace") |
| Mobile behavior | Address and countdown pinned near the top; single-hand-reachable copy button |
| Desktop behavior | Address, countdown, and controls live in a persistent top bar above the message list |

### 11.3 Deep-dive: Receive & read a message

| Dimension | Specification |
|---|---|
| User goal | See real incoming mail without leaving MIKE or missing anything |
| Behavior | Live channel delivers new messages; list updates in place; opening a row loads the full message |
| Expected UI state | New arrival: brief entrance animation + unread badge + capsule reacts (see `design.md` §5); opened message: full render with sender/subject/timestamp header |
| Success state | Message renders (HTML with text fallback), read state persists |
| Failure state | Message fails to fetch/render → inline error within the detail pane with retry; list state is unaffected |
| Edge cases | Malformed HTML; missing subject/sender; duplicate delivery from provider (must be de-duplicated by provider message ID); message arrives after inbox has entered "expiring" state |
| Mobile behavior | Full-screen reader, swipe-back to list, swipe-to-delete on list rows |
| Desktop behavior | List + reading pane side by side; keyboard navigation between messages |

### 11.4 Deep-dive: Delete / regenerate inbox

| Dimension | Specification |
|---|---|
| User goal | End the current inbox intentionally, with or without starting a new one |
| Behavior | Explicit confirmation step (destructive, irreversible); on confirm, backend deletes inbox + messages, client clears local state |
| Expected UI state | Confirmation dialog names the consequence plainly ("This deletes your inbox and all its messages. This can't be undone.") |
| Success state | Return to empty/start state (delete) or new address issued immediately (regenerate) |
| Failure state | Deletion call fails → state remains unchanged, error toast with retry; client never optimistically clears data before backend confirms |
| Edge cases | Deleting while a message is mid-fetch; deleting while AI processing is in flight (in-flight AI calls are discarded, not persisted) |
| Mobile behavior | Confirmation as a bottom sheet |
| Desktop behavior | Confirmation as a centered modal |

---

## 12. AI Inbox Requirements

AI is an enhancement layer over real messages — it never stands in for the message, and it never operates on content that doesn't exist.

### 12.1 Functional requirements

- **AI email summary:** one to two sentence plain-language summary of what the email is and why it matters.
- **Key information extraction:** verification/OTP codes, important links, dates, and other structured details relevant to the message.
- **Verification-code detection:** pattern + model-assisted detection of one-time codes; surfaced as a distinct, large, monospace, one-tap-to-copy element — both inside the message and as a badge in the message list.
- **Important-link extraction:** links classified by likely purpose (e.g. "Confirm email," "Reset password," "View invoice") where inferable, shown as labeled action chips rather than raw URLs.
- **Action detection:** MIKE proposes relevant next actions (Copy code / Open link / Save to Notes / Create Todo) based on message content.
- **Sender/context understanding:** AI identifies the likely sending service/organization from message content and headers to aid the summary (e.g. "GitHub sent a verification email").
- **"Ask AI about this email":** free-form question box scoped to the single open message; answers are grounded only in that message's content.
- **Email → Note:** one action converts the message (or the AI summary) into a new Note, pre-filled and editable before saving.
- **Email → Todo:** one action converts a detected action item into a new Todo, pre-filled with a suggested title and, where inferable, a due date.
- **AI-generated task suggestions:** when an email clearly implies a follow-up (a deadline, a required action), MIKE proactively suggests creating a Todo rather than requiring the user to notice it themselves.

### 12.2 Illustrative example (design-only reference, not literal product copy)

```
Incoming email: "Please verify your account..."

MIKE AI: "GitHub sent a verification email."

Detected
  Verification code: 482913

Actions
  [Copy code]  [Open email]  [Save to Notes]  [Create Todo]
```

### 12.3 AI states

| State | Behavior |
|---|---|
| Idle / not yet processed | Message shows with no AI content; processing begins automatically on open (if AI is enabled) |
| Loading | Capsule enters the "AI processing" state (`design.md` §5); minimum visible duration to avoid flicker, real latency drives actual duration |
| Success | Summary, extracted entities, and suggested actions render in the AI panel/section |
| Failure | Clear inline failure ("MIKE AI couldn't process this message") with a manual retry; the raw email remains fully readable regardless |
| Unavailable | If the AI provider is down or the user has disabled AI, the panel is replaced with a neutral explanation and no fake output is shown |

### 12.4 Privacy & user control

- AI processing of message content is **clearly disclosed** and **user-controllable**: a global toggle (Settings → AI processing) and, at minimum, a per-message "Don't process this email" override.
- Disabling AI processing never disables core inbox functionality — only the AI layer.
- Message content sent for AI processing is used solely to generate the requested insight for that session and is not used to retrain any model; this is a firm product requirement to carry into vendor selection, not a claim to make without verifying the chosen AI provider's terms.

---

## 13. Notes Requirements

### 13.1 Functional requirements

Create · Edit · Delete · **Autosave** (debounced, no explicit save action required) · Pin · Archive · Search (title + body) · Tags · Checklist blocks · Basic rich text / Markdown-style formatting (headings, bold/italic, lists, checkboxes, links) · **Email → Note** (§12.1) · **AI summary → Note** · Local-first behavior (notes are usable offline and sync opportunistically, see §23).

### 13.2 States & behavior

| Dimension | Specification |
|---|---|
| Empty state | "No notes yet" with a direct "New note" action and a hint pointing at email → note |
| Mobile editing | Full-screen editor, autosave indicator instead of a save button, formatting controls in a compact bottom toolbar |
| Desktop editing | List + editor side by side (or list + slide-over panel), keyboard shortcuts for formatting |
| Failure state | Autosave failure shows a small persistent "not saved" indicator with manual retry; content is never silently lost — it is retained in local state until save succeeds |

---

## 14. Todo Requirements

### 14.1 Functional requirements

Create task · Complete task · Delete task · Edit task · Due date · Priority (e.g. Low/Normal/High) · Grouped views: **Today / Upcoming / Completed** · **Email → Todo** (§12.1) · **AI → Todo** (proactive suggestion, §12.1) · Search/filter by text, priority, or due date.

### 14.2 States & behavior

| Dimension | Specification |
|---|---|
| Empty state | "Nothing on your list" with a direct "New task" action |
| Mobile interaction | Swipe to complete, swipe to delete, tap to edit |
| Desktop interaction | Inline checkbox complete, keyboard entry (type + Enter to add), drag to reorder within a group |
| Failure state | Same non-destructive pattern as Notes — local state is retained until the server confirms the change |

---

## 15. Privacy Requirements

Privacy is a core product principle, expressed through architecture, not marketing language.

- **Temporary inbox lifecycle:** every inbox has a defined, visible lifetime and a hard maximum lifetime (§28); nothing persists indefinitely by default.
- **Automatic expiration:** enforced server-side regardless of client state — closing the tab does not extend or shorten it.
- **Manual deletion:** available at any time, immediate and irreversible.
- **Minimal data retention:** message content is retained only for the active life of the inbox; operational logs (rate-limiting, abuse signals) are retained separately, minimized, and for a bounded window (§28).
- **No account required** for the core temporary-email/AI-inbox/Notes/Todo experience. Accounts are an optional, explicit opt-in in Phase 2, solely to sync Notes/Todo across devices — never to persist the inbox itself.
- **AI data-processing expectations:** message content is only sent to the AI layer when AI processing is enabled (on by default, user-controllable, §12.4); this must be disclosed plainly.
- **Provider limitations:** MIKE depends on third-party infrastructure (email receiving, AI processing) and must not claim guarantees beyond what those providers contractually support.
- **Accurate privacy messaging.** MIKE explicitly avoids unsupported claims such as "100% anonymous," "completely untraceable," or "zero logging." Approved framing focuses on what is actually true: the inbox is temporary, deletion is real and immediate, retention is minimized and time-bounded, and the user is told plainly what data exists and for how long.
- **Acceptable-use boundaries:** stated in a plain-language acceptable-use notice (no illegal activity, no harassment, no bypassing another service's fraud/abuse protections) — MIKE does not claim to prevent misuse of temporary email as a category, only to run its own service responsibly.

## 16. Abuse Prevention

- **Receive-only architecture:** MIKE never sends outbound email. This single architectural decision removes the largest abuse vector (spam/phishing origination) for the platform by construction.
- **Rate limiting:** inbox creation and API calls are limited per IP/session (e.g. N inbox creations per hour); thresholds are backend-configurable, not hardcoded assumptions.
- **Escalating friction:** repeated rate-limit violations trigger a challenge (e.g. CAPTCHA-style check) before further inbox creation is allowed, rather than an outright permanent block, to avoid punishing shared-IP users (offices, mobile carriers).
- **Domain protection:** if a domain is reported/blocklisted due to abuse patterns from other users, the system rotates active traffic to a healthy backup domain (§10.1) rather than letting the whole product degrade.
- **Size & volume limits:** message size caps and per-inbox message-count caps (with oldest-message eviction or hard stop + notice) protect storage and processing cost.
- **AI abuse limits:** "Ask AI" is rate-limited per inbox/session to prevent using MIKE as a free general-purpose LLM proxy unrelated to actual inbox content.

## 17. Error Handling

| Error class | Example | UI behavior |
|---|---|---|
| Network failure | Client offline or request timeout | Non-blocking banner, automatic retry with backoff, cached last-known state remains visible |
| Provider failure (email) | Inbox provider unreachable | Explicit error state on the affected action only (e.g. "Couldn't check for new messages"); does not blank out already-loaded messages |
| Provider failure (AI) | AI provider unreachable/timeout | AI panel shows failure state (§12.3); rest of the app is unaffected |
| Domain exhausted / rejected | All configured domains unavailable | Explicit "MIKE can't create an inbox right now" state with retry; never silently issues a broken address |
| Rate limited | Too many inbox creations from one source | Clear message stating the limit and when it resets; optional challenge to proceed |
| Inbox expired mid-session | Timer reaches zero while the user is active | Non-jarring transition to the Expired state (§11.1); any unsaved AI insight prompts a last-chance "Save to Notes" before the view clears |
| Message fetch/render failure | Malformed or oversized message | Inline error scoped to that message only; list and other messages remain usable |
| Notes/Todo save failure | Sync/save call fails | Local content preserved, "not saved" indicator, manual retry (§13.2, §14.2) |

General rule: **errors are always scoped to the smallest affected unit** — a failed single message never takes down the inbox; a failed AI call never takes down the message.

## 18. Loading / Empty / Expired States

| Screen | Loading | Empty | Expired |
|---|---|---|---|
| Inbox | Skeleton rows; address/countdown load first | "Waiting for your first message" + address prominent | Read-only grace window → cleared; primary CTA becomes "Create a new inbox" |
| Message detail | Skeleton header + body block | N/A (not reachable empty) | Message becomes inaccessible once the inbox is deleted/expired past grace window |
| AI panel | Capsule "processing" state + skeleton insight cards | "AI hasn't looked at this message yet" (pre-open) | N/A — tied to message/inbox lifecycle |
| Notes | Skeleton list | "No notes yet" + New note CTA | N/A (Notes are not time-limited) |
| Todo | Skeleton list | "Nothing on your list" + New task CTA | N/A (Todo is not time-limited) |

## 19. Responsive Requirements

MIKE ships **one feature set** across breakpoints — mobile is a first-class, fully capable experience, not a reduced one. Presentation differences (layout, navigation pattern, 3D complexity) are specified in `design.md` §15. Functional parity requirement: every action available on desktop (generate, read, copy, delete, regenerate, AI actions, Notes/Todo CRUD) must be available and equally reliable on mobile.

Breakpoint reference (detailed behavior in `design.md`):

| Class | Width |
|---|---|
| Mobile | < 640px |
| Tablet | 640–1024px |
| Desktop | 1024–1440px |
| Large desktop | > 1440px |

## 20. Accessibility Requirements

- Target **WCAG 2.1 AA**.
- Full keyboard operability for inbox list, message viewer, Notes editor, and Todo list (tab order, arrow-key list navigation, Enter to open, Escape to close panels/modals).
- Visible focus indicator on every interactive element (see `design.md` §13).
- Semantic heading hierarchy and landmark regions (header/nav/main) on every screen.
- New-message arrival and AI-processing completion are announced via polite `aria-live` regions.
- `prefers-reduced-motion` is respected globally — ambient and entrance animation is replaced with instant or cross-fade transitions.
- Decorative 3D capsule states always have a **text-equivalent** status conveyed to assistive tech (e.g. "Inbox status: waiting for messages"), since the 3D object itself is decorative, not the source of truth.
- Minimum touch target size 44×44px on mobile.
- Minimum body text size 16px on mobile to avoid unwanted browser zoom on focus.

## 21. Performance Requirements

- Marketing page: Largest Contentful Paint target < 2.5s on a mid-tier mobile connection.
- App shell: interactive (inbox list usable) target < 3s, independent of whether the 3D layer has finished loading.
- New-message latency: a real incoming message should be visible in the UI within a few seconds of provider delivery (exact figure depends on chosen polling interval / push mechanism, see §25).
- 3D is **lazy-loaded after** critical content paints and must never block core inbox interaction; a non-WebGL fallback exists for every capsule state (see `design.md` §5, §16).
- 3D asset budget: target under ~2MB (gzipped) for geometry/textures on the primary experience; mobile uses a lighter variant.
- Images use modern formats (AVIF/WebP) with sized variants; no unoptimized full-resolution assets shipped to mobile.

## 22. SEO Requirements

- Marketing routes (`/`, `/how-it-works`, `/privacy`, `/security`, `/help`) are server-rendered or statically generated, with descriptive titles, meta descriptions, Open Graph/Twitter card metadata, and a `SoftwareApplication`-style structured data entry.
- `sitemap.xml` and `robots.txt` cover marketing routes only.
- Application routes (`/app/**`) are **not indexed** (`noindex`) — they are session-specific and often contain transient personal data.
- Semantic heading hierarchy on marketing pages supports both SEO and accessibility simultaneously.
- Core Web Vitals on marketing pages are treated as a launch gate, not a nice-to-have.

## 23. PWA Considerations

- Installable web app manifest (icons, theme color, standalone display) for the `/app` surface.
- Service worker caches the app shell and static assets; it deliberately does **not** aggressively cache message content, in keeping with the expiration/privacy model.
- Notes and Todo are usable offline (local-first, see §13.1); the Inbox screen requires connectivity and shows a clear offline state when unavailable, since messages require a live provider connection.
- Push notifications ("You've got a new message") are an **optional, explicit opt-in**, deferred to Phase 2, consistent with the privacy-first default of asking for nothing the user didn't request.

## 24. Analytics Considerations

- Product analytics are aggregate and privacy-respecting: **no message content, no AI output content, and no PII** is ever sent to analytics.
- Tracked events are structural: inbox created, message received, message opened, AI summary requested/succeeded/failed, code copied, link opened, note created (and source: manual/email/AI), todo created (and source), inbox extended, inbox regenerated, inbox expired, inbox deleted.
- Minimal-cookie / cookieless approach preferred, consistent with the privacy positioning; any analytics cookie use is disclosed in the privacy page.
- Analytics tooling choice must not conflict with the "no unnecessary data retention" principle in §15.

---

## 25. Technical Architecture Requirements

This section states architectural **requirements and boundaries**, not implementation. The chosen stack is an implementation-time decision; these are the constraints it must satisfy.

- **Client:** a responsive web application (SSR/static for marketing, client-rendered app shell for `/app`), served over HTTPS only.
- **API layer:** a single backend API surface (REST or GraphQL — implementation choice) fronting all provider integrations; the client never talks to the email or AI provider directly.
- **Provider abstraction layer:** see §26 — all email-provider and AI-provider access goes through internal interfaces so the underlying vendor can change without client changes.
- **Ephemeral data store:** inbox and message records live in a store built around TTL/expiry as a first-class concept (e.g. a TTL-capable store or a durable store plus a scheduled purge worker) — not a general-purpose table with no cleanup path.
- **Local-first data store:** Notes and Todo are anonymous-session-scoped and persisted client-side first (with backend sync for durability/cross-tab use), independent of inbox lifecycle.
- **Background worker(s):** responsible for (a) sweeping expired inboxes for hard deletion, (b) polling the email provider if the provider is poll-based rather than webhook/push-based, and (c) enforcing rate-limit windows.
- **Realtime channel:** a push mechanism (e.g. WebSocket or Server-Sent Events) delivers new-message and AI-completion events to the client; polling is an acceptable fallback but should not be the sole mechanism if push is available from the chosen provider.
- **Session model:** an anonymous, signed, httpOnly session token binds a browser to its active inbox and its Notes/Todo, without requiring account creation.

## 26. Provider Abstraction

MIKE's core dependency — receiving real email — must sit behind a stable internal interface so the underlying vendor is an implementation-time, swappable decision, never a hardcoded assumption baked into product logic.

```
EmailProvider
├── createInbox(options)      → { address, inboxId, expiresAt }
├── getInbox(inboxId)         → { status, address, expiresAt }
├── getMessages(inboxId)      → [ messageSummary ]
├── getMessage(messageId)     → messageDetail
├── deleteInbox(inboxId)      → { success }
├── getDomains()              → [ availableDomains ]
└── getStatus()                → { healthy, degraded, reason }
```

- The exact vendor(s) are selected at implementation time from providers that offer either **webhook-based inbound parsing** (mail routed to MIKE's domain, POSTed to an internal endpoint) or **poll-based inbox APIs** (MIKE polls a provider-hosted mailbox). Both integration patterns must be supported by the abstraction; the product requirements above do not assume a specific one.
- A **backup provider/domain configuration** is required for resilience (§10.5, §16) — the abstraction must support more than one concrete provider implementation active at once.
- Equivalently, `AIProvider` abstracts the LLM/AI layer:

```
AIProvider
├── summarize(messageContent)          → { summary }
├── extractEntities(messageContent)    → { codes, links, dates, actionItems }
├── classifySender(messageContent)     → { likelySender }
└── answerQuestion(messageContent, q)  → { answer }
```

- No specific API credentials, undocumented endpoints, or unverified providers are prescribed by this document — vendor selection and contractual verification (data-use terms, retention terms) happen at implementation time against the requirements in §12.4 and §15.

## 27. API Integration Requirements

Conceptual internal API surface (transport/protocol is an implementation decision):

- `POST /session` — bootstrap or resume an anonymous session.
- `POST /inbox` — create an inbox (duration option, optional custom local-part).
- `GET /inbox/:id` — inbox status, address, expiry.
- `GET /inbox/:id/messages` — message list.
- `GET /messages/:id` — message detail.
- `DELETE /inbox/:id` — delete inbox.
- `POST /inbox/:id/extend` — extend lifecycle within the allowed maximum.
- `POST /messages/:id/ai/summary` — request AI summary/extraction.
- `POST /messages/:id/ai/ask` — scoped question-answering.
- `GET/POST/PATCH/DELETE /notes`, `/todos` — standard CRUD, scoped to the session (and later, to an optional account).
- **Inbound mail webhook** (if provider is push-based): a dedicated, signature-verified endpoint that receives parsed mail from the provider and writes it into the ephemeral store — never exposed to or callable by the client.
- All endpoints return a consistent error envelope (code, human-readable message, retryable flag) so the client can apply the error-handling rules in §17 generically.
- API versioning is required from day one (e.g. a version segment or header) to allow provider/schema changes without breaking older clients (relevant once a PWA/installed client can lag behind a deploy).

## 28. Data Lifecycle

| Data type | Retention | Deletion trigger |
|---|---|---|
| Inbox + messages | Only for the active, chosen lifecycle (default short duration; extendable; hard-capped maximum, e.g. 24 hours total regardless of extensions) | Automatic at expiry, or immediately on manual delete/regenerate |
| AI-generated output (summary, extracted entities) | Only as long as the source message exists; not separately retained once the inbox is purged, unless the user has explicitly saved it to a Note | Tied to message/inbox deletion |
| Notes / Todo | Persist per anonymous session (local-first) until the user clears them, clears browser data, or (Phase 2) deletes a linked account | User action |
| Rate-limiting / abuse-signal logs | Short, bounded retention window (e.g. on the order of weeks), minimized fields (no message content) | Automatic rolling expiry |
| Analytics events | Aggregate, structural events only (§24), retained per standard analytics-tooling policy, no message content | N/A (no personal message content collected) |

## 29. Security Requirements

- **Transport:** HTTPS/TLS everywhere, HSTS enabled.
- **Session security:** anonymous session tokens are httpOnly, secure, SameSite cookies; CSRF protection on all state-changing endpoints.
- **Rate limiting & abuse protection:** enforced at the API layer per §16, not left to the client.
- **HTML email rendering:** rendered inside a sandboxed context (e.g. a sandboxed iframe with scripts disabled) to prevent stored/reflected XSS from message content; remote images blocked by default to mitigate tracking pixels, with an explicit user opt-in to load them per message.
- **Link safety:** external links show their destination domain before navigating; MIKE does not auto-follow redirects when previewing a link's destination.
- **Webhook security:** any inbound-mail webhook endpoint verifies a provider signature/secret before accepting payloads.
- **Secrets management:** provider API keys and signing secrets are stored in a managed secrets store, never in client code or version control.
- **Dependency hygiene:** routine dependency/security audits are part of the release process.
- **Data at rest:** message content in the ephemeral store is encrypted at rest where the chosen infrastructure supports it.

## 30. Non-Functional Requirements

- **Reliability:** target uptime appropriate to a free consumer tool (e.g. 99.5%+) with graceful degradation (§17) rather than hard outages when a single dependency fails.
- **Scalability:** the ephemeral-store and worker design (§25) must scale horizontally with inbox volume without manual intervention.
- **Maintainability:** UI is built from the shared component system defined in `design.md` §11, not one-off screens.
- **Localization readiness:** MVP ships in English; copy and layout must not hardcode assumptions that block future localization (e.g. avoid baking English string lengths into fixed-width layouts).
- **Browser support:** current and previous major version of evergreen browsers (Chrome, Safari, Firefox, Edge); graceful, functional (if visually simpler) degradation on older browsers rather than a blank page.
- **Device support:** modern mobile (iOS/Android browsers), tablet, and desktop.

## 31. MVP Scope

- Temporary email: generate, custom local-part, address pool with backup domains, countdown, extend, regenerate, delete.
- Inbox: real-time message list and detail, HTML + text rendering, unread state, copy address/code, open link, error/empty/loading states.
- AI Inbox: automatic summary, verification-code detection and one-tap copy, link extraction, "Ask AI about this email," AI on/off control.
- Notes: create/edit/delete/autosave/pin/search/tags/checklist, email → note, AI summary → note.
- Todo: create/complete/edit/delete, due date, priority, Today/Upcoming/Completed views, email → todo, AI → todo suggestion.
- Privacy: accurate messaging, visible lifecycle, manual delete, no account requirement.
- Responsive web app (mobile, tablet, desktop) with full feature parity.
- Baseline accessibility (WCAG 2.1 AA target) and baseline privacy-respecting analytics.

**Not in MVP:** accounts, attachment preview, push notifications, multiple simultaneous inboxes, browser extension.

## 32. Phase 2

- Optional accounts, solely for cross-device sync of Notes/Todo (never the inbox itself).
- Push notifications (opt-in) for new-message arrival.
- Safe preview of small image/PDF attachments (gated on malware-scanning capability).
- User-facing inbox lifetime extension improvements (e.g. configurable default duration in settings).
- Managing multiple simultaneous inboxes from one session.
- Unified search across Messages, Notes, and Todo.
- User-exposed light/dark theme toggle (App defaults defined in `design.md` §2; Phase 2 exposes the choice explicitly if not already user-facing at MVP).

## 33. Phase 3

- Lightweight browser extension for one-click "use a MIKE address here."
- Public developer API for programmatic temporary-inbox creation (rate-limited, keyed, documented separately).
- Shared/team temporary inboxes for QA and product teams.
- Custom domain support for teams (bring-your-own-domain).
- Any consideration of outbound capability (e.g. AI-assisted reply) is treated as a **major architecture decision requiring its own security and abuse-prevention review**, not an incremental feature — MIKE's receive-only stance (§16) is a deliberate safeguard that any future outbound feature must not silently undermine.

## 34. Out of Scope

- MIKE is **not** a permanent email provider or a Gmail/Outlook replacement.
- MIKE does **not** send outbound email in MVP or Phase 2.
- MIKE does **not** function as a full CRM, marketing platform, or team collaboration suite.
- MIKE does **not** claim legal-grade anonymity or untraceability.
- MIKE is **not** a replacement for enterprise-grade secure email or compliance-scoped communication.

## 35. Acceptance Criteria

- **Given** a visitor with no active session, **when** they open the app, **then** a real inbox and address are created automatically and a countdown is visible within the performance budget in §21.
- **Given** an active inbox, **when** a real email is sent to its address, **then** the message appears in the list without a manual refresh, within the latency target in §21.
- **Given** an opened message with AI enabled, **when** AI processing completes, **then** a real summary and any detected code/links are shown, sourced from that message's actual content.
- **Given** a message with a detected verification code, **when** the user taps "Copy code," **then** the exact code is on the clipboard, confirmed by visible feedback.
- **Given** an open message, **when** the user chooses "Save to Notes" or "Create Todo," **then** a new Note/Todo is created pre-filled from that message or its AI summary, and is editable before/after saving.
- **Given** an inbox nearing expiry, **when** the configured threshold is crossed, **then** the UI enters the Expiring state and offers Extend (if available) before the inbox is cleared.
- **Given** an active inbox, **when** the user chooses Delete or Regenerate, **then** confirmation is required and, on confirm, the backend deletion completes before the client clears its local view.
- **Given** any provider failure (email or AI), **when** the failure occurs, **then** the error is scoped to the smallest affected unit per §17, with no fabricated success state shown in its place.

## 36. Definition of Done

A feature is done when:

- [ ] It is backed by real application/backend state — no mock, placeholder, or fabricated data remains in the shipped build.
- [ ] All states in §17/§18 (loading, empty, success, failure, expired) are implemented, not just the happy path.
- [ ] It matches the relevant flows' user goal / behavior / success / failure / edge-case / mobile / desktop specification above.
- [ ] It is fully usable on mobile, tablet, and desktop per §19, with no functional gaps between breakpoints.
- [ ] It meets the accessibility bar in §20 (keyboard operable, focus-visible, `aria-live` where relevant, reduced-motion respected).
- [ ] It respects the performance budgets in §21 and does not block on the 3D layer.
- [ ] Relevant analytics events fire per §24 without leaking message content or PII.
- [ ] Privacy-relevant copy has been checked against §15's accuracy requirement.
- [ ] It has been reviewed against the visual/interaction specification in `design.md`.
- [ ] It has explicit QA sign-off covering the acceptance criteria in §35 relevant to that feature.
