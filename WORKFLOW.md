# Nexleaf Design → Prototype → Jira Workflow

> Architecture summary. The operating manual is **[`docs/`](docs/README.md)** — read that
> for how to actually run the workflow. Living document. Last updated 2026-07-31.

---

## 1. The core principle

**One source of truth per layer, with deterministic bridges between them.**
Nothing is duplicated by hand. Each layer owns one kind of truth; the bridges keep
the layers honest so nothing drifts.

```
   FIGMA                 FIGMA-MAP.md           POLTAIL (Storybook)        PROTOTYPE HUB            JIRA (PD)
   design intent   ──▶   deterministic     ──▶  implementation       ──▶  projects →          ──▶  change ledger
   (Polaris +            translator             source of truth            prototypes, each         (epic per project,
    Tailwind kit +       (Figma comp →          (47 React components,      with activity log        what + why, links
    Polaris icons)       Poltail comp)          tokens, page templates)    + CHANGELOG)             frame ⇄ commit)
```

- **Figma** owns *what it should look like*. Canvas discipline applies (sections, versioned frames, journey order, all states) — see `FIGMA-MAP.md`.
- **Poltail (Storybook)** owns *how it's actually built*. Everything is composed from these components — never re-invented. Barrel export: `src/index.js`.
- **FIGMA-MAP.md** is the bridge: component map, token map, Phosphor→Polaris icon translation, canvas rules, and the **mirror rule** (prototype ⇄ Figma parity, audited on every touch). Auto-loaded via `CLAUDE.md`. (Native Figma Code Connect requires an Enterprise plan — Nexleaf is on Pro; the map graduates into Code Connect if that ever changes.)
- **Prototype Hub** (`prototype-hub/`, deploys to design.nexleaf.org): projects → prototypes, each typed (screen/flow/exploration/component) with a visible Activity log. Scaffold: `npm run new-project` / `npm run new`.
- **Jira (PD)**: one epic per project; design + engineering tickets (`discipline:*` labels); new scope = ticket, revision = comment; PD-30 = Design Ops.

## 2. Decisions locked

- **Icons: Polaris everywhere.** Phosphor in older product designs translates via the map; missing icons get added to `POLARIS_ICON_DATA`, never imported from Phosphor.
- **Bridge: repo mapping file** (not Code Connect — plan-gated).
- **Hub lives inside this repo** ("monorepo-lite"), imports the DS via the `@ds` alias; React deduped to the parent install.
- **PRDs are inputs from anywhere** (sent to Raf, or written via the PRD skills); each project keeps a working copy (`PRD.md`) + source link.
- **Every change is versioned, never overwritten** — new Figma frame beside the old; CHANGELOG + structured commit (`proto(<slug>): <what> — <why> [PD-XX]`).

## 3. The three flows

- **Flow A — PRD → project:** ingest PRD → scaffold hub project + Jira epic → decompose into design + engineering tickets.
- **Flow B — change:** meeting/transcript/Slack/verbal → extract what+why → ticket (new scope) or comment (revision) → change → record → close with links.
- **Flow C — correction:** just say it → fixed, logged, commented; batched when small.

Full detail: [`docs/07-meeting-to-jira.md`](docs/07-meeting-to-jira.md).

## 4. Quality layer (skills)

`prd-writer`/`one-page-prd-generator` (Collect) → `product-os` (pressure-test) →
`nexleaf-design-system` + `figma-generate-design`/`figma-use` (Create) →
`design-critique` (is it good?) → `figma-design-audit` (is it right vs what was agreed?).
Stack table: [`docs/README.md`](docs/README.md).

## 5. Status & open items

Built and live: Figma ingest · FIGMA-MAP bridge (top 12) · barrel export · prototype hub v2
(projects, types, activity log) · Jira structure (PD-30 epic, PD-31 seed) · docs/ · skills.

- [x] Hub production build verified (Vite 8, `✓ built` — caught & fixed a duplicate `RadioButton` barrel export; generator now dedupes globally).
- [x] Committed (`7f499fe`, workflow files only — component WIP left for Raf).

Open:
- [ ] Confirm Figma-side component names + map the remaining 35 components (blocked on the design-system file being open in Figma desktop — remote access only exposes the cover page; verified).
- [ ] Point design.nexleaf.org (Vercel) at `prototype-hub/` (needs Raf's Vercel access).
