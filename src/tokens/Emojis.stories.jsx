import { useState, useMemo, useId } from 'react';
import { EMOJI_CATALOG, EMOJI_CATEGORIES } from '../foundation/emojis/emojiCatalog.js';

export default {
  title: 'Foundation/Emojis',
  parameters: { layout: 'padded', controls: { disable: true }, actions: { disable: true } },
};

// ─── About this catalog ──────────────────────────────────────────────────────
//
// Emojis are standard Unicode codepoints, not assets we ship — rendering is
// delegated to the OS emoji font. On macOS / iOS that's Apple Color Emoji
// (the "Apple look"); on Windows it's Segoe UI Emoji; on Linux / Android it's
// Noto Color Emoji. The `EMOJI_STACK` font stack below tells the browser to
// prefer the native emoji face over anything else so the glyph reads as the
// platform-native sticker rather than a flat text rendering.
//
// This page is a CURATED set, not the full Unicode list. Pulling everything
// is noise; the value is having a few hand-picked glyphs everyone reaches
// for first, organized by intent. Add to it conservatively — every emoji
// here should have a clear reason to exist (status, reaction, domain glyph).

const EMOJI_STACK =
  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color", "Twemoji Mozilla", sans-serif';

// ─── Categories ──────────────────────────────────────────────────────────────
// Each entry: { char, name, usage }
//   char  — the rendered glyph
//   name  — short, lowercase, hyphenated label used in code/comments
//   usage — one short sentence describing WHEN to use it

const CATEGORIES = [
  {
    title: 'Expressive',
    description:
      'Use sparingly in product copy, onboarding, empty states, release notes — anywhere a single sticker can land a tone without a paragraph.',
    items: [
      { char: '✨', name: 'sparkles',       usage: 'New / magic / AI features.' },
      { char: '🎉', name: 'party-popper',   usage: 'Celebration, "you did it" moments.' },
      { char: '🚀', name: 'rocket',         usage: 'Launch, ship, "we just released X."' },
      { char: '💡', name: 'lightbulb',      usage: 'Tips, callouts, "did you know."' },
      { char: '🎯', name: 'target',         usage: 'Goals, focus, OKRs.' },
      { char: '🛠️', name: 'hammer-wrench',  usage: 'Settings, admin, tooling.' },
      { char: '🧩', name: 'puzzle',         usage: 'Plugins, components, building blocks.' },
      { char: '🎨', name: 'palette',        usage: 'Design system, theming, customization.' },
      { char: '📦', name: 'package',        usage: 'Bundle, release, library.' },
      { char: '🧪', name: 'test-tube',      usage: 'Beta, experiment, opt-in feature.' },
      { char: '👋', name: 'wave',           usage: 'Greeting, onboarding hello.' },
      { char: '❤️', name: 'heart',          usage: 'Genuine appreciation / favorites.' },
    ],
  },
  {
    title: 'Status & feedback',
    description:
      'Map 1:1 to the system\'s semantic colors. Pair with a Badge or Banner when you need both glyph and tonal background.',
    items: [
      { char: '✅', name: 'check',          usage: 'Success, completed, validated.' },
      { char: '⚠️', name: 'warning',        usage: 'Caution, attention, soft alert.' },
      { char: '❌', name: 'cross',          usage: 'Error, failure, blocked.' },
      { char: '🚫', name: 'prohibited',     usage: 'Disabled action, not allowed.' },
      { char: '⏳', name: 'hourglass',      usage: 'Pending, in progress, waiting.' },
      { char: '⏰', name: 'alarm',          usage: 'Reminder, scheduled, time-bound.' },
      { char: '🔔', name: 'bell',           usage: 'Notification, alert subscription.' },
      { char: '📍', name: 'pin',            usage: 'Location, "you are here," anchor.' },
      { char: 'ℹ️', name: 'info',           usage: 'Informational note, secondary detail.' },
      { char: '🔒', name: 'lock',           usage: 'Locked, private, requires permission.' },
      { char: '🔓', name: 'lock-open',      usage: 'Unlocked, publicly accessible.' },
      { char: '🔄', name: 'refresh',        usage: 'Sync, refresh, retry.' },
    ],
  },
  {
    title: 'Domain — cold-chain & equipment',
    description:
      'Glyphs that match the equipment types Nexleaf tracks. Useful in dashboard tiles, empty states for specific equipment categories, and onboarding tours.',
    items: [
      { char: '🧊', name: 'ice',            usage: 'Cold-chain refrigeration, frozen vaccines.' },
      { char: '❄️', name: 'snowflake',      usage: 'Temperature / cold setting.' },
      { char: '🌡️', name: 'thermometer',    usage: 'Temperature reading, sensor data.' },
      { char: '🔋', name: 'battery',        usage: 'Battery equipment, charge level.' },
      { char: '☀️', name: 'sun',            usage: 'Solar equipment, daylight.' },
      { char: '⚡', name: 'high-voltage',   usage: 'Electrification, power, fast charge.' },
      { char: '💧', name: 'droplet',        usage: 'Humidity, water, condensation.' },
      { char: '🔌', name: 'plug',           usage: 'Grid-tied connection, power outlet.' },
      { char: '🩺', name: 'stethoscope',    usage: 'Medical equipment, health checks.' },
      { char: '💉', name: 'syringe',        usage: 'Vaccines, immunization payload.' },
      { char: '🧫', name: 'petri-dish',     usage: 'Lab equipment, samples.' },
      { char: '📡', name: 'satellite',      usage: 'RTMD, remote monitoring, telemetry.' },
    ],
  },
  {
    title: 'People & roles',
    description:
      'Use sparingly in avatars-fallback positions, role tags, or human-context UI. Prefer neutral skin-tone modifiers (skip the modifier entirely so the OS picks).',
    items: [
      { char: '🧑‍💻', name: 'technologist', usage: 'Engineer, developer, ops user.' },
      { char: '👷', name: 'construction-worker', usage: 'Field installer, site technician.' },
      { char: '🧑‍🔬', name: 'scientist',    usage: 'Lab operator, researcher.' },
      { char: '🧑‍⚕️', name: 'health-worker', usage: 'Nurse, clinic staff.' },
      { char: '🧑‍🏫', name: 'teacher',      usage: 'Training, onboarding leader.' },
      { char: '🧑‍🌾', name: 'farmer',       usage: 'Rural site operator, community worker.' },
    ],
  },
  {
    title: 'Nature & geography',
    description: 'Useful in region pickers, map empty states, sustainability messaging.',
    items: [
      { char: '🌱', name: 'seedling',       usage: 'Growth, new program, pilot.' },
      { char: '🌿', name: 'herb',           usage: 'Sustainability, low-impact.' },
      { char: '🍃', name: 'leaf',           usage: 'Brand echo (Nexleaf), eco context.' },
      { char: '🌍', name: 'globe-africa',   usage: 'Default global region (matches Nexleaf focus).' },
      { char: '🌎', name: 'globe-americas', usage: 'Americas region selector.' },
      { char: '🌏', name: 'globe-asia',     usage: 'Asia / Pacific region selector.' },
      { char: '🏥', name: 'hospital',       usage: 'Facility, clinic, deployment site.' },
      { char: '🏭', name: 'factory',        usage: 'Industrial site, large installation.' },
    ],
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────
//
// Each glyph card: large emoji, name in monospace, usage hint. Click to copy
// the codepoint to the clipboard. We deliberately copy the bare character
// (not a `:shortcode:`) so it pastes directly into commit messages, Slack,
// MDX, and JSX without further escaping.

function EmojiCard({ char, name, usage }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(char);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard API not available (older browsers / insecure context). No-op.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Copy ${name} emoji`}
      title={`Click to copy ${char}`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        gap: 8, padding: '16px 12px',
        background: hovered ? '#fafafa' : '#ffffff',
        border: `1px solid ${copied ? '#7be8b4' : '#e0e0e0'}`,
        borderRadius: 12,
        cursor: 'pointer',
        textAlign: 'center',
        outline: 'none',
        boxShadow: copied ? 'inset 0 0 0 1px #12B76A' : undefined,
        transition: 'background 0.12s, border-color 0.12s',
        fontFamily: 'Inter, sans-serif',
        minHeight: 132,
      }}
    >
      <span
        aria-hidden="true"
        style={{ fontFamily: EMOJI_STACK, fontSize: 40, lineHeight: 1, marginBottom: 4 }}
      >
        {char}
      </span>
      <span style={{
        fontFamily: 'monospace', fontSize: 11, color: '#7c3aed', fontWeight: 600,
        wordBreak: 'break-word',
      }}>
        {copied ? 'copied!' : name}
      </span>
      <span style={{ fontSize: 11, color: '#616161', lineHeight: '14px' }}>{usage}</span>
    </button>
  );
}

// ─── Category section ────────────────────────────────────────────────────────

function Section({ title, description, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontSize: 14, fontWeight: 700, color: '#303030', marginBottom: 4,
        textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif',
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: 13, color: '#616161', lineHeight: 1.6,
          marginTop: 0, marginBottom: 16, fontFamily: 'Inter, sans-serif',
          maxWidth: 720,
        }}>
          {description}
        </p>
      )}
      <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: 16 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Filter chip (single-select) ─────────────────────────────────────────────
//
// A button styled as a pill that toggles a category filter on the catalogue
// below. Active chip uses the system's primary blue; rest chips share the
// same hover treatment as the nav rails. Always reachable by keyboard;
// `aria-pressed` exposes its toggled state to assistive tech.

function FilterChip({ label, count, active, onClick }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);

  const bg = active
    ? '#005bd3'
    : hov ? 'rgba(0,0,0,0.05)' : '#ffffff';
  const fg = active ? '#ffffff' : '#303030';
  const border = active ? '#005bd3' : '#e0e0e0';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      aria-pressed={active}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 12px',
        borderRadius: 100,
        border: `1px solid ${border}`,
        background: bg, color: fg,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        fontSize: 12, fontWeight: 550,
        lineHeight: '16px',
        outline: 'none',
        boxShadow: foc ? '0 0 0 2px #005bd3' : 'none',
        transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          opacity: active ? 0.9 : 0.6,
        }}
      >
        {count}
      </span>
    </button>
  );
}

// ─── Catalogue card ──────────────────────────────────────────────────────────
//
// Variant of `EmojiCard` for the searchable catalogue. Accepts the data-file
// shape (`symbol` / `name` / `usage` / `keywords` / `category`) directly.
// Visually matches the curated card above so the two grids feel like one.

function CatalogCard({ symbol, name, usage, category }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(symbol);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard API unavailable — no-op.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label={`Copy ${name} emoji (${category})`}
      title={`Click to copy ${symbol}`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        gap: 6, padding: '14px 10px',
        background: hovered ? '#fafafa' : '#ffffff',
        border: `1px solid ${copied ? '#7be8b4' : '#e0e0e0'}`,
        borderRadius: 12,
        cursor: 'pointer',
        textAlign: 'center',
        outline: 'none',
        boxShadow: focused
          ? '0 0 0 2px #005bd3'
          : copied ? 'inset 0 0 0 1px #12B76A' : undefined,
        transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
        fontFamily: 'Inter, sans-serif',
        minHeight: 124,
      }}
    >
      <span aria-hidden="true" style={{ fontFamily: EMOJI_STACK, fontSize: 36, lineHeight: 1 }}>
        {symbol}
      </span>
      <span style={{
        fontSize: 12, fontWeight: 550, color: '#303030', lineHeight: '16px',
        wordBreak: 'break-word',
      }}>
        {copied ? 'Copied' : name}
      </span>
      <span style={{ fontSize: 11, color: '#616161', lineHeight: '14px', wordBreak: 'break-word' }}>
        {usage}
      </span>
    </button>
  );
}

// ─── Searchable catalogue ────────────────────────────────────────────────────
//
// Renders below the curated sections. Drives off `EMOJI_CATALOG` from
// `src/foundation/emojis/emojiCatalog.js`. Search input filters by name,
// keywords, category, and usage; chips below the search restrict to a single
// category. The two filters compose: chip ∩ query. An aria-live region
// announces the result count for screen-reader users; an empty-results state
// renders a friendly message when nothing matches.

function Catalogue() {
  const [query, setQuery]       = useState('');
  const [active, setActive]     = useState('All');
  const inputId = useId();
  const liveId  = useId();

  // Per-category counts drive the chip labels. Memoised so chips don't
  // recalc every keystroke.
  const counts = useMemo(() => {
    const map = { All: EMOJI_CATALOG.length };
    for (const cat of EMOJI_CATEGORIES) map[cat] = 0;
    for (const item of EMOJI_CATALOG) {
      if (map[item.category] != null) map[item.category]++;
    }
    return map;
  }, []);

  // Filter pipeline: category first (cheap), then text (more expensive).
  // The text match walks name, keywords, category, and usage so users can
  // search for either the glyph's English name ("rocket"), a synonym
  // ("launch"), a section name ("symbols"), or the usage note ("AI").
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EMOJI_CATALOG.filter((it) => {
      if (active !== 'All' && it.category !== active) return false;
      if (!q) return true;
      if (it.name.toLowerCase().includes(q)) return true;
      if (it.category.toLowerCase().includes(q)) return true;
      if (it.usage && it.usage.toLowerCase().includes(q)) return true;
      if (it.keywords && it.keywords.some(k => k.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [query, active]);

  return (
    <Section
      title="Browse the catalogue"
      description="Searchable, data-driven list. Add new entries to src/foundation/emojis/emojiCatalog.js and they appear here automatically. Type to filter by name, keyword, category, or usage; tap a chip to scope to one category."
    >
      {/* Search input + active filter row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <label
          htmlFor={inputId}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 550,
            color: '#303030', lineHeight: '16px',
          }}
        >
          Search emojis
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'launch', 'kenya', 'tea'…"
          aria-describedby={liveId}
          style={{
            width: '100%', maxWidth: 420,
            padding: '8px 12px',
            border: '1px solid #8a8a8a',
            borderRadius: 8,
            fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '20px',
            color: '#303030', background: '#fdfdfd',
            outline: 'none',
          }}
        />

        <div
          role="group"
          aria-label="Filter by category"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}
        >
          <FilterChip
            label="All"
            count={counts.All}
            active={active === 'All'}
            onClick={() => setActive('All')}
          />
          {EMOJI_CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              count={counts[cat] ?? 0}
              active={active === cat}
              onClick={() => setActive(cat)}
            />
          ))}
        </div>

        <div
          id={liveId}
          role="status"
          aria-live="polite"
          style={{ fontSize: 12, color: '#616161', fontFamily: 'Inter, sans-serif' }}
        >
          {filtered.length} {filtered.length === 1 ? 'emoji' : 'emojis'}
          {query && <> matching “{query}”</>}
          {active !== 'All' && <> in {active}</>}.
        </div>
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div style={{
          padding: '32px 16px', textAlign: 'center',
          background: '#fafafa', border: '1px dashed #e0e0e0', borderRadius: 12,
          color: '#616161', fontFamily: 'Inter, sans-serif', fontSize: 13,
        }}>
          No emojis match that search. Try a different word or clear the filter.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
        }}>
          {filtered.map((it) => (
            // Compose a stable key — the same emoji glyph can appear once per
            // category. `symbol + name` is unique inside this dataset.
            <CatalogCard
              key={`${it.category}:${it.symbol}:${it.name}`}
              symbol={it.symbol}
              name={it.name}
              usage={it.usage}
              category={it.category}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

// ─── All Emojis story ────────────────────────────────────────────────────────

export const AllEmojis = {
  name: 'All Emojis',
  render: () => (
    <div style={{ maxWidth: 1080, fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#303030', marginBottom: 8 }}>
        Emojis
      </h1>
      <p style={{ fontSize: 14, color: '#616161', marginBottom: 16, lineHeight: 1.6, maxWidth: 720 }}>
        Emojis in this system are standard Unicode glyphs rendered by the OS emoji font —
        Apple Color Emoji on macOS / iOS, Segoe UI Emoji on Windows, Noto Color Emoji on
        Linux / Android. Click any glyph to copy the character to your clipboard.
      </p>
      <pre style={{
        display: 'inline-block', fontSize: 12, color: '#303030',
        background: '#f7f9fc', border: '1px solid #e0e0e0', borderRadius: 8,
        padding: '8px 12px', marginBottom: 40, fontFamily: 'monospace',
      }}>
        font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
      </pre>

      {CATEGORIES.map((cat) => (
        <Section key={cat.title} title={cat.title} description={cat.description}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 12,
          }}>
            {cat.items.map((it) => (
              <EmojiCard key={it.name} char={it.char} name={it.name} usage={it.usage} />
            ))}
          </div>
        </Section>
      ))}

      {/* Data-driven, searchable browse view — additive to the curated
          sections above. Source: src/foundation/emojis/emojiCatalog.js */}
      <Catalogue />

      <Section title="When to use emojis">
        <ul style={{
          margin: 0, padding: '8px 0 0 20px',
          fontSize: 13, color: '#303030', lineHeight: 1.7,
          maxWidth: 720, fontFamily: 'Inter, sans-serif',
        }}>
          <li>
            <strong>Empty states & onboarding</strong> — a single glyph at the top of an empty
            list reads warmer than another generic illustration.
          </li>
          <li>
            <strong>Release notes & changelog</strong> — ✨ for new, 🛠️ for fixed, 🎯 for improved,
            🚀 for shipped. Be consistent.
          </li>
          <li>
            <strong>Status microcopy</strong> — pair with a Badge or Banner where the tonal
            color carries the meaning and the emoji adds personality.
          </li>
          <li>
            <strong>Slack / commits / docs</strong> — codepoints copy and paste anywhere; no
            export step needed.
          </li>
        </ul>
      </Section>

      <Section title="When NOT to use emojis">
        <ul style={{
          margin: 0, padding: '8px 0 0 20px',
          fontSize: 13, color: '#303030', lineHeight: 1.7,
          maxWidth: 720, fontFamily: 'Inter, sans-serif',
        }}>
          <li>
            <strong>As a load-bearing icon</strong> — emoji rendering varies wildly between
            platforms and versions. Use <code style={{ background: '#f0f0f0', padding: '1px 6px', borderRadius: 4 }}>
            PolarisIcon</code> for anything that has to look identical everywhere.
          </li>
          <li>
            <strong>Without a text label nearby</strong> — emojis are decorative, not
            semantic. Always pair with text or an aria-label.
          </li>
          <li>
            <strong>In dense data UI</strong> — tables, dashboards, settings forms. The
            warmth they add becomes noise at scale.
          </li>
          <li>
            <strong>For locale-sensitive concepts</strong> — gestures, hand signs, flags
            carry different meanings across cultures. Choose neutral glyphs.
          </li>
        </ul>
      </Section>

      <Section title="Code snippet">
        <div style={{ padding: '16px 0', fontFamily: 'monospace' }}>
          <pre style={{
            fontSize: 12, color: '#303030',
            background: '#f7f9fc', border: '1px solid #e0e0e0', borderRadius: 8,
            padding: 16, lineHeight: 1.7, overflowX: 'auto', maxWidth: 720,
          }}>
{`// Use directly in JSX — codepoints are just strings
<Banner type="success">
  <span style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif' }}>
    ✅
  </span>
  {' '}Equipment registered successfully.
</Banner>

// In commit messages, release notes, MDX — just paste the glyph
// feat(side-nav): ✨ add Equipment Management variant
// fix(tabs):     🛠️ Arrow Left/Right now wraps around`}
          </pre>
        </div>
      </Section>
    </div>
  ),
};
