# shadcn/ui Component Library — Execution Plan

**Status:** COMPLETE — 58/58 components
**Started:** 2026-08-14
**Owner of record:** autonomous execution (no user checkpoints)

---

## 1. Overall objective

Implement the complete shadcn/ui component library inside this project. For every
component in the checklist below: install it from the registry (or build it when the
registry has no such item), create a showcase page under
`src/app/styleguide/components/<name>/page.tsx`, document it (import, usage, props,
variants, accessibility, keyboard, ARIA), register it in
`src/app/styleguide/navigation.ts`, and verify it renders correctly in both light and
dark mode using the project's design tokens.

## 2. Project context a future execution must know

- The Next.js app lives in **`web/`**, not the repo root. The repo root holds brand
  assets (`LOGOTIPO/`, `REFERENCIA VISUAL/`, `.ai`/`.psd` files).
- Next.js **16.3.1**, App Router, TypeScript, `src/` directory, Turbopack.
- Tailwind **v4** (CSS-first config; there is no `tailwind.config.ts`).
- **`components.json` style is `base-nova`, which is built on Base UI — NOT Radix.**
  This is the single most important fact in this document. Consequences:
  - There is no `asChild` prop. Base UI uses **`render={<Link />}`** instead.
  - Component part names sometimes differ from the Radix-era shadcn docs.
  - Never trust memorised Radix API shapes; read the generated file in
    `src/components/ui/` and use the exports it actually declares.
- Design tokens live in `src/app/globals.css`. Brand is `#ff5100` (orange, OKLCH hue
  37.86). Showcases must use tokens (`bg-primary`, `text-muted-foreground`, …), never
  hard-coded hex values.
- Dark mode is the default theme (`next-themes`, `attribute="class"`, `defaultTheme="dark"`).
- Path alias is `@/*` → `src/*`.

## 3. Execution strategy

1. **Discovery (done).** Enumerated the whole `@shadcn` registry with
   `npx shadcn@latest list @shadcn`. 216 items. Determined which checklist entries
   exist as registry items and which must be built by hand.
2. **Bulk install.** Install every available registry component in batches rather than
   one at a time. The per-component workflow (search → view → add) resolves to the same
   files, and batching avoids 54 separate dependency-resolution passes. Registry
   metadata still gets consulted per component when writing its showcase.
3. **Custom builds.** Build the four non-registry components from shadcn primitives.
4. **Showcase infrastructure.** Build a small set of documentation primitives
   (`DocPage`, `Demo`, `PropsTable`, `A11y`) so all 58 pages are consistent and each page
   stays focused on the component's own content.
5. **Per-component pages.** Write the showcase + documentation for each component,
   reading the generated source to get the real exported API.
6. **Navigation + verification.** Register every page, then run typecheck, lint, build,
   and render-check pages in both themes.

### Why the MCP is not being used for each step

The shadcn MCP server was configured this session (`.mcp.json`), but MCP servers only
load at Claude Code startup, so its tools are unavailable in the session doing this work.
The `shadcn` **CLI** exposes the same registry data (`list`, `search`, `view`, `docs`,
`add`), so the CLI is used as the equivalent source of truth. A future execution that has
the MCP loaded may use `search_items_in_registries` / `view_items_in_registries` /
`get_item_examples_from_registries` interchangeably.

## 4. Registry findings

**Present in `@shadcn` (install via CLI):** accordion, alert, alert-dialog, aspect-ratio,
attachment, avatar, badge, breadcrumb, bubble, button, calendar, card, carousel, chart,
checkbox, collapsible, combobox, command, context-menu, dialog, drawer, dropdown-menu,
field, form, hover-card, input, input-otp, label, marker, menubar, message,
message-scroller, navigation-menu, pagination, popover, progress, radio-group, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table,
tabs, textarea, toast, toggle, toggle-group, tooltip.

**Absent from the registry — must be built (checklist Step 4):**

| Component | Why absent | Build approach |
|---|---|---|
| Date Picker | Documented as a composition, not a registry item | `Calendar` + `Popover` + `Button`; single and range variants |
| Data Table | Documented as a composition | `Table` + `@tanstack/react-table`; sorting, filtering, pagination, selection, column visibility |
| Typography | Documentation page, not a component | Ship a real `typography.tsx` with `<Prose>` and heading/text primitives bound to project tokens |
| Chat | Not a registry item | Compose the registry chat primitives (`bubble`, `message`, `message-scroller`, `attachment`, `marker`) into a working chat surface |

**Bonus registry items pulled in as dependencies** (documented where they surface):
button-group, empty, input-group, item, kbd, native-select, spinner, questionnaire,
direction, use-mobile.

## 5. Implementation decisions

Decisions are appended here as they are made, so a future execution stays consistent.

- **D1 — Batch installation over one-at-a-time.** Same result, far fewer CLI passes.
- **D2 — Shared documentation primitives.** `src/app/styleguide/_components/` holds
  `DocPage`, `Demo`, `PropsTable`, `A11y`. Using an underscore-prefixed folder keeps it
  out of the App Router's route tree. Every showcase page composes these, which is what
  makes 58 consistent pages tractable and keeps each page's own content substantive.
- **D3 — Read the source, not memory.** Because the style is Base UI (`base-nova`), each
  showcase is written against the exports actually present in the generated file.
- **D4 — Showcase pages are Server Components by default;** only pages needing state get
  `"use client"`. Interactive demos are extracted into client components when a mostly
  static page needs one interactive island.
- **D5 — Code examples are real.** Every snippet shown in a page is the code that renders
  the preview directly above it, kept in sync by hand at authoring time.
- **D6 — Every showcase page is a Client Component.** Interactive demos need state, and a
  uniform `"use client"` avoids server/client boundary mistakes across 58 pages. The
  styleguide is a development surface, so there is no meaningful RSC payoff to protect.
- **D7 — `.light` class added to `globals.css`.** `:root, .light` lets a light-themed
  island render inside a dark page, which is what `ThemePreview` uses to show both themes
  side by side on every page.
- **D8 — Typecheck after each batch.** `npx tsc --noEmit` is the primary correctness gate
  while writing pages against an unfamiliar (Base UI) API surface.
- **D9 — Parallel-agent boundary.** A second agent builds the marketing site under
  `src/app/site/**`, `src/components/site/**` and `src/lib/site/**`, governed by
  `.claude/skills/design-system-readonly`. That contract assigns `styleguide/**`,
  `components/ui/**`, `globals.css` and `layout.tsx` to *this* execution. Do not write
  into the site paths; avoid further `npm install` runs to prevent lockfile races.

## 6. Issues encountered & solutions

| # | Issue | Solution |
|---|---|---|
| I1 | `asChild` does not exist in `base-nova`; `<Button asChild>` failed typecheck | Use Base UI's `render={<Link href="…" />}` prop |
| I2 | `@shadcn/form` installs no files — it is an empty registry stub | In `base-nova`, **Field replaced Form**. The Form page documents composition with `Field` + native `<form>` + `FormData`. Deliberately no `react-hook-form`/`zod` dependency |
| I3 | `ToggleGroup` has no `toggleMultiple`; `Accordion` has no `openMultiple` | Both use Base UI's `multiple`, and both default to **single** selection. Docs corrected to match |
| I4 | `react-resizable-panels` in this version uses `orientation`, not `direction`, and has no `autoSaveId` | Page migrated to `orientation` + `defaultLayout`/`onLayoutChanged` |
| I5 | Slider/ToggleGroup value types are `readonly` arrays | State typed as `readonly number[]` / `readonly string[]` |
| I6 | A showcase page component named `BreadcrumbPage` collided with the imported `BreadcrumbPage` | Page components get a `DocPage` suffix when the name collides with an import |
| I7 | Escaped quotes (`\"`) inside a JSX string attribute are a syntax error | Write the prose without embedded quotes |
| I8 | `@tanstack/react-table` installed as **v9**, a full rewrite (`useTable`, `createCoreRowModel`, feature objects). shadcn's Data Table docs are written for v8 | Pinned `@tanstack/react-table@^8`. Matching the official docs is worth more here than being on the newest major |
| I9 | `Drawer` has no `side` on the content — the root takes `swipeDirection`, plus `showSwipeHandle` and `snapPoints` | Page rewritten against the real API |
| I10 | **Build failure**: `useMessageScroller must be used within a MessageScroller` while prerendering | `MessageScrollerProvider` is required *around* `MessageScroller`, and `MessageScrollerItem` takes `messageId`. Fixed in both the showcase and `chat.tsx`. Confirmed against `@shadcn/message-scroller-example` |
| I11 | Next 16's React Compiler lint rejects synchronous `setState` inside effects — hit in `carousel.tsx`, `use-mobile.ts` and the carousel showcase | Rewrote all three with `useSyncExternalStore`, reading Embla and `matchMedia` as external stores. Removes real cascading renders, not just the warning |

## 7. Component checklist

Marked `[x]` only when install/build + showcase + documentation + navigation + verification
are all finished for that component.

### Chat & messaging
- [x] Attachment
- [x] Bubble
- [x] Marker
- [x] Message
- [x] Message Scroller
- [x] Chat

### Forms
- [x] Button
- [x] Checkbox
- [x] Combobox
- [x] Date Picker
- [x] Field
- [x] Form
- [x] Input
- [x] Input OTP
- [x] Label
- [x] Radio Group
- [x] Select
- [x] Slider
- [x] Switch
- [x] Textarea
- [x] Toggle
- [x] Toggle Group

### Layout
- [x] Accordion
- [x] Aspect Ratio
- [x] Card
- [x] Carousel
- [x] Collapsible
- [x] Resizable
- [x] Scroll Area
- [x] Separator
- [x] Sheet
- [x] Sidebar
- [x] Skeleton

### Navigation
- [x] Breadcrumb
- [x] Command
- [x] Context Menu
- [x] Dropdown Menu
- [x] Menubar
- [x] Navigation Menu
- [x] Pagination
- [x] Tabs

### Overlays
- [x] Alert Dialog
- [x] Dialog
- [x] Drawer
- [x] Hover Card
- [x] Popover
- [x] Tooltip

### Feedback
- [x] Alert
- [x] Badge
- [x] Progress
- [x] Sonner
- [x] Toast

### Data display
- [x] Avatar
- [x] Calendar
- [x] Chart
- [x] Data Table
- [x] Table
- [x] Typography

## 8. Verification results

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | Clean |
| `npm run lint` | Clean across every file this execution owns. One remaining error lives in `src/components/site/chladni/chladni-scene.tsx`, which belongs to the parallel site agent and was deliberately not touched. One benign warning in `data-table.tsx` (React Compiler skips memoizing TanStack's API, which is expected) |
| `npm run build` | Success — 106 pages prerendered, including all 58 component routes |
| HTTP sweep | All 58 `/styleguide/components/*` routes return 200 against the production server |
| Render check | Chat, Data Table, Button and Select inspected in the browser; `ThemePreview` confirmed rendering light and dark islands side by side on the same page |

## 9. Progress log

- **Discovery complete.** Registry enumerated; 54 of 58 checklist entries exist as
  registry items; 4 require custom builds.
- **Plan created.** This document.
- **All registry components installed.** 60 files in `src/components/ui/`, plus
  `@tanstack/react-table` for the Data Table build.
- **Showcase infrastructure built.** `src/app/styleguide/_components/doc.tsx` exports
  `DocPage`, `DocSection`, `Demo`, `CodeBlock`, `PropsTable`, `Anatomy`, `A11y`,
  `ThemePreview`.
- **Navigation rewritten** with all 58 entries across 8 sections.
- **29 of 58 showcase pages complete** (Forms, Layout, and part of Navigation).

- **All 58 showcase pages written**, each with variants, states, interactive demos,
  real code examples, a props table, anatomy, and accessibility notes covering keyboard
  and ARIA.
- **Four custom components built** for the checklist entries with no registry item:
  `date-picker.tsx`, `data-table.tsx`, `typography.tsx`, `chat.tsx`.
- **Verification passed.** See section 8.

## 10. Next action

Nothing outstanding for this task. Possible follow-ups, none of them blocking:

- The parallel site agent registered `/styleguide/reactbits`, which is not in
  `navigation.ts`. Left untouched — that route is theirs to wire up when they choose.
- `metadataBase` is unset, which Next warns about when resolving Open Graph images.
  Harmless for the styleguide; worth setting before the site ships.
- The lone lint error in `components/site/chladni/chladni-scene.tsx` belongs to the site
  agent and is theirs to resolve.
