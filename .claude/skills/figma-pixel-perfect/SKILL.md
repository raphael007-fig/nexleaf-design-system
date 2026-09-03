---
name: figma-pixel-perfect
description: >
  Use this skill whenever the user asks Claude to build, implement, convert, or translate a Figma
  design into code. This includes any request like "build this from Figma", "implement this design",
  "convert my Figma to code", "make this pixel perfect", or any time a Figma file/node/URL is
  mentioned alongside a frontend task. The skill enforces a strict extract → implement → verify →
  iterate loop using the Figma MCP at every step to guarantee pixel-perfect output. Always use this
  skill even if the user only shares a Figma link and says something casual like "build this" —
  do not attempt to implement Figma designs without following this workflow.
---

# Figma Pixel-Perfect Implementation Skill

This skill ensures Claude Code produces pixel-perfect implementations of Figma designs by using
the Figma MCP exhaustively and self-iterating until the output matches the design exactly.

---

## Supported Stacks

Detect the project's stack from `package.json`, folder structure, or user instruction. Apply the
matching conventions from the **Stack Conventions** section below.

| Stack | Detection Signal |
|---|---|
| Next.js + Tailwind CSS | `next` in deps, `tailwind.config.*` present |
| React + Tailwind CSS | `react` in deps, `tailwind.config.*`, no `next` |
| React + CSS Modules | `react` in deps, `.module.css` files present |
| HTML + CSS (vanilla) | No `package.json`, or plain `.html`/`.css` files |

---

## Step 0 — Node ID Discovery

Before anything else, resolve the correct node ID(s) to work with.

**From a Figma URL:**
Figma URLs contain the node ID in the `node-id` parameter:
```
https://www.figma.com/design/AbCdEf/My-Design?node-id=102-847
```
Extract `102-847` and convert the `-` to `:` → node ID is `102:847`.

**From a selection:**
If the user says "this component" or "the selected frame", call `get_design_context` on the
root file and ask the user to confirm which node name matches what they're pointing at.

**When multiple frames exist (responsive design):**
Check if the user's Figma file contains multiple top-level frames for the same component at
different widths (e.g., `Card/Mobile`, `Card/Desktop`). If so, collect all node IDs — they will
all be extracted in Phase 1 and implemented with responsive breakpoints in Phase 2.

---

## The Core Loop

> **Rule**: Never write a single line of implementation code before completing Phase 1.
> **Rule**: Never stop iterating until the visual diff checklist is fully green.
> **Rule**: Use the Figma MCP for *every* property lookup — do not guess or approximate values.

---

### Phase 1 — Deep Figma Extraction

Before writing any code, use the Figma MCP to extract **all** of the following for every node
in scope. Go layer by layer, parent before children.

#### Typography
- Font family, font weight, font size (px)
- Line height (px or %)
- Letter spacing (px or em)
- Text transform, text decoration
- Text alignment
- Color (exact hex or rgba)

#### Spacing & Layout
- Width and height (fixed, fill, hug — note the behaviour)
- Padding (top, right, bottom, left individually)
- Margin / gap between siblings
- Auto-layout direction (horizontal / vertical), alignment, spacing mode
- Min/max width and height if set

#### Colors & Fills
- Background color (solid, gradient — capture all stops and angles)
- Border color, width, style, radius (each corner if mixed)
- Box shadows (offset x/y, blur, spread, color, inset or not)
- Opacity (layer vs fill)

#### Images & Icons
- Export the asset at 2x or as SVG via Figma MCP
- Note `object-fit` behaviour from the Figma frame constraints

#### Responsive Frames
- If multiple breakpoint frames exist, extract all of them in Phase 1 before writing any code.
- For each frame, record its exact width and map to the closest CSS breakpoint:

| Figma frame width | CSS breakpoint |
|---|---|
| ≤ 390px | default (mobile-first base) |
| 768px | `md:` (Tailwind) / `@media (min-width: 768px)` |
| 1024px | `lg:` |
| 1280px+ | `xl:` |

- Only properties that *change* across breakpoints need to be noted — extract diffs explicitly.

#### Component Variants
- Check if the node is a Figma component with variants (look for a **Variants** panel in
  `get_design_context` output).
- List all variant properties and their values (e.g., `Size: sm/md/lg`, `State: default/hover/disabled`).
- Extract every variant's full property set by calling `get_metadata` on each — do not assume
  unchanged properties are identical.
- Map variants to props in the implementation (e.g., a `variant` or `size` prop in React).

#### Interactive / State Variants
- If the component has hover/active/focus states defined in Figma, extract all of them.
- Only implement states that exist in Figma — do not add states that are not there.

**Output of Phase 1**: A structured design token comment block at the top of the component file:

```
/* === FIGMA DESIGN TOKENS ===
   Node: [node name] ([node id])
   ---
   font: Inter 16px/24px weight-500
   color: #1A1A2E
   padding: 16px 24px
   gap: 12px
   background: #F5F7FA
   border: 1px solid #E2E8F0 radius 8px
   shadow: 0 2px 4px rgba(0,0,0,0.08)
   ...
========================== */
```

---

### Phase 2 — Implementation

Write the implementation using exact values from Phase 1. Follow the **Stack Conventions** below.

**Hard rules during implementation:**
- No approximate values. `padding: 16px` not `p-4` unless 4 * 4px = 16px exactly.
- Use the Figma MCP to re-query any property you are unsure about — never guess.
- Match layer hierarchy in the component tree: Figma groups → React components / HTML sections.
- Export and inline SVG icons directly from Figma rather than substituting similar library icons.
- Use exact hex/rgba color values. Do not substitute Tailwind color names unless they are exact matches.

**Font loading — required before writing any text styles:**

Check whether the Figma font is available in the project. Follow this decision tree:

1. **Is it a Google Font?** → Add it via `next/font/google` (Next.js) or a `<link>` import (HTML). Example:
   ```ts
   // Next.js
   import { Inter } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })
   ```
2. **Is it a system font** (e.g., `-apple-system`, `Arial`, `Georgia`)? → No import needed.
3. **Is it a custom/paid font not on Google Fonts?** → Stop and tell the user:
   *"The design uses [FontName], which isn't available via Google Fonts. Please provide the font
   file or a CDN link so I can load it correctly."* Do not substitute a similar font.
4. **Is the font already in the project** (check `public/fonts/` or existing `@font-face` rules)? →
   Reference it directly.

Never proceed with a fallback system font silently. If the font cannot be loaded, block and ask.

---

### Phase 3 — Visual Verification

After each implementation pass, run the following verification sequence. All three must pass before
stopping.

#### 3a. Screenshot Comparison
1. Render the component in the browser (use `localhost` dev server, Storybook, or a standalone HTML file).
2. Take a screenshot of the rendered output.
3. Use the Figma MCP to get a screenshot/export of the same node at the same viewport width.
4. Place them side-by-side and visually inspect for any differences.

#### 3b. Property Checklist
Go through every extracted token from Phase 1 and verify it against the rendered output:

```
PIXEL-PERFECT CHECKLIST
[ ] Font family matches (and is correctly loaded — not falling back to system font)
[ ] Font size matches (px)
[ ] Font weight matches
[ ] Line height matches
[ ] Letter spacing matches
[ ] Text color matches (exact hex)
[ ] Background color matches
[ ] Padding (all 4 sides) matches
[ ] Gap / spacing between children matches
[ ] Width / height matches (or correct fill/hug behaviour)
[ ] Border width, style, color matches
[ ] Border radius (all corners) matches
[ ] Box shadow matches (offset, blur, spread, color)
[ ] Image/icon dimensions and fit matches
[ ] Alignment (horizontal + vertical) matches
[ ] All component variants implemented and visually verified
[ ] Responsive breakpoints match all extracted Figma frames
[ ] No states, styles, or assets added that don't exist in Figma
```

Mark each item ✅ or ❌ with the discrepancy noted.

#### 3c. Side-by-Side Visual Judgment
Overlay or compare the screenshots mentally (or using browser DevTools). Look specifically for:
- Off-by-a-few-pixels spacing issues (common with Tailwind rounding)
- Wrong font weight (e.g. 500 vs 600 looks subtle)
- Slightly wrong border radius
- Shadow missing or incorrect
- Icon size or stroke weight differences

---

### Phase 4 — Iterate Until Green

If **any** checklist item is ❌:

1. Return to the Figma MCP and re-query the specific property that failed.
2. Fix the code.
3. Re-render and re-run Phase 3 from scratch.
4. Repeat until all checklist items are ✅ and the screenshot comparison shows no visible difference.

**There is no maximum iteration count.** Stop only when the implementation is pixel-perfect.

After each failed round, briefly log what changed:
```
--- Iteration 2 ---
Fixed: font-weight 400 → 500 (re-queried Figma node #123)
Fixed: padding-right 20px → 24px (Figma showed 24, Tailwind p-5 was 20)
Fixed: box-shadow blur 4px → 8px
Re-running verification...
```

---

## Stack Conventions

### Next.js + Tailwind CSS
- Use `px-[16px]` arbitrary values when Tailwind's scale doesn't match exactly.
- Define custom colors in `tailwind.config.ts` under `theme.extend.colors` using exact hex from Figma.
- Use `font-[500]` arbitrary font weights when needed.
- Use Next.js `<Image />` for raster assets.
- Use CSS variables in `globals.css` for design tokens used across multiple components.

### React + Tailwind CSS
- Same as Next.js conventions above, minus `<Image />` — use standard `<img>` with explicit `width`/`height`.
- Co-locate the component and its Tailwind classes in a single `.tsx` file.

### React + CSS Modules
- Create a `.module.css` file alongside the component.
- Use exact `px` values — no shorthand approximation.
- Use CSS custom properties at the top of the module file for colors and spacing.
- Avoid `!important`; fix specificity issues structurally.

### HTML + CSS (Vanilla)
- Use a `<style>` block or separate `.css` file.
- Use CSS custom properties (`--color-primary: #1A1A2E`) at `:root`.
- Use `rem` only if the base font-size is confirmed; otherwise use `px`.
- No frameworks, no utility classes.

---

## Figma MCP Usage Reference

Use these MCP calls at the stages indicated. **Never skip them.**

| When | MCP Call | Purpose |
|---|---|---|
| Phase 1 start | `get_design_context(nodeId)` | Full design context for component |
| Phase 1 — any layer | `get_metadata(nodeId)` | Precise properties for a specific node |
| Phase 1 — variables | `get_variable_defs(nodeId)` | Design tokens / variables |
| Phase 2 — unsure of value | `get_metadata(nodeId)` again | Re-query rather than guess |
| Phase 3 — screenshot | `get_screenshot(nodeId)` | Reference image for comparison |
| Phase 4 — fix specific prop | `get_metadata(nodeId)` again | Confirm correct value before fixing |

> **Always** use the node ID, not just the node name, to ensure you're querying the right element.

---

## Absolute Fidelity Rule

> **This is non-negotiable and overrides all other convenience defaults.**

Claude must use **only** what exists in the Figma design. No substitutions, no approximations, no "close enough" alternatives.

| ❌ Never do this | ✅ Do this instead |
|---|---|
| Use a similar icon from Lucide/Heroicons | Export the exact SVG from Figma MCP |
| Substitute a Google Font that "looks similar" | Use the exact font family specified in Figma |
| Use a Tailwind color like `blue-500` instead of `#3B5BDB` | Use the exact hex from Figma, always |
| Add a hover effect not in the Figma design | Only implement states that exist in Figma |
| Use a stock image or placeholder URL | Use the exact asset exported from Figma MCP |
| Round a spacing value to the nearest Tailwind step | Use arbitrary values to match Figma exactly |
| Add extra padding "for breathing room" | Use zero padding if Figma specifies zero |
| Use `div` where Figma implies a `button` or `input` | Infer semantic HTML from the Figma layer name/type, but do not add behaviour not in Figma |
| Use a border-radius default from a UI library | Only apply radius if Figma specifies it |

If an asset or property cannot be extracted from Figma (e.g., the MCP call fails), **stop and tell the user** rather than substituting something similar. Ask: *"I couldn't retrieve [asset/property] from Figma. Can you check the node or export it manually?"*

---

## Common Pitfalls to Avoid

- **Tailwind scale mismatches**: `p-4` = 16px, `p-5` = 20px. When Figma says 18px, use `px-[18px]`.
- **Font weight guessing**: Always check. Figma "Medium" = 500, "SemiBold" = 600, "Bold" = 700.
- **Line height units**: Figma shows px; CSS often wants a unitless ratio or %. Convert carefully.
- **Border radius corners**: Figma can have mixed radii per corner. Use `rounded-tl-[x]` etc. as needed.
- **Auto-layout ≠ flexbox always**: Check if it's `space-between`, `flex-start`, or fixed spacing.
- **Opacity on layer vs fill**: Layer opacity affects everything including shadows. Fill opacity does not.
- **Shadows on Figma**: Figma's "drop shadow" maps to CSS `box-shadow`. Inner shadow = `inset`.
- **Text node width**: "Hug" = `width: fit-content`, "Fill" = `width: 100%`, fixed = explicit px.
