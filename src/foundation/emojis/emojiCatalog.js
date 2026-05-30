// ─── Emoji catalogue ─────────────────────────────────────────────────────────
//
// Starter dataset for the Foundation / Emojis Storybook page. Deliberately a
// curated subset rather than the full Unicode emoji list — every entry here
// has been chosen because product/marketing/eng might reach for it. Add new
// entries by appending an object to the appropriate category array; the
// catalogue page below picks them up automatically.
//
// Each entry MUST have all five fields:
//
//   symbol    — the rendered glyph (string, may be ZWJ-joined like '🧑‍💻')
//   name      — short human-readable name in title case ("Grinning face")
//   keywords  — array of lowercase synonyms used by the search filter
//   category  — string, must match one of `EMOJI_CATEGORIES` below
//   usage     — one short sentence explaining when to reach for this glyph
//
// Country entries additionally carry an ISO-3166-1 alpha-2 `code` field so we
// can render the flag from regional indicator letters at runtime rather than
// hardcoding pairs.

export const EMOJI_CATEGORIES = [
  'Smileys & emotion',
  'People & gestures',
  'Animals & nature',
  'Food & drink',
  'Travel & places',
  'Activities',
  'Objects',
  'Symbols',
  'Regional indicators',
];

// Helper: ISO-3166-1 alpha-2 code → flag glyph (two regional indicator letters).
// Exported so the page can show flags for codes we haven't manually curated.
export function flagFromCountryCode(code) {
  if (!code || code.length !== 2) return '';
  const A = 0x1f1e6; // Regional Indicator Symbol Letter A
  return String.fromCodePoint(
    A + code.toUpperCase().charCodeAt(0) - 65,
    A + code.toUpperCase().charCodeAt(1) - 65,
  );
}

// ─── Smileys & emotion ───────────────────────────────────────────────────────
const SMILEYS = [
  { symbol: '😀', name: 'Grinning face',     keywords: ['smile', 'happy', 'joy', 'grin'],           usage: 'Friendly tone, positive reactions in chat.' },
  { symbol: '😊', name: 'Smiling face',      keywords: ['smile', 'blush', 'happy', 'kind'],         usage: 'Warm acknowledgement, "thanks!" reply.' },
  { symbol: '🥰', name: 'Smiling with hearts', keywords: ['love', 'adore', 'crush', 'fond'],        usage: 'Strong positive appreciation, fan moment.' },
  { symbol: '😂', name: 'Face with tears of joy', keywords: ['laugh', 'lol', 'cry', 'funny'],       usage: 'Reaction to something genuinely funny.' },
  { symbol: '😎', name: 'Smiling face with sunglasses', keywords: ['cool', 'sunglasses', 'chill'],  usage: 'Casual "looks good" sign-off.' },
  { symbol: '🤔', name: 'Thinking face',     keywords: ['think', 'consider', 'wonder', 'hmm'],      usage: 'Pondering a question, signalling uncertainty.' },
  { symbol: '🥲', name: 'Smiling face with tear', keywords: ['proud', 'bittersweet', 'moved'],      usage: 'Sentimental but positive — proud-tear moments.' },
  { symbol: '😴', name: 'Sleeping face',     keywords: ['sleep', 'tired', 'zzz', 'idle'],           usage: 'Idle status, inactive session.' },
  { symbol: '🥳', name: 'Partying face',     keywords: ['party', 'celebrate', 'birthday'],          usage: 'Celebration moments, milestone hits.' },
  { symbol: '😱', name: 'Face screaming in fear', keywords: ['shock', 'scream', 'omg', 'surprise'], usage: 'Strong surprise reaction (sparingly).' },
  { symbol: '😡', name: 'Pouting face',      keywords: ['angry', 'mad', 'rage', 'upset'],           usage: 'Strong negative reaction — keep for product copy, not docs.' },
  { symbol: '🤖', name: 'Robot',             keywords: ['bot', 'robot', 'automation', 'ai'],        usage: 'Bots, automated messages, AI features.' },
];

// ─── People & gestures ───────────────────────────────────────────────────────
const PEOPLE = [
  { symbol: '👋', name: 'Waving hand',       keywords: ['hi', 'hello', 'wave', 'bye'],              usage: 'Greeting in onboarding or empty-state hero.' },
  { symbol: '👍', name: 'Thumbs up',         keywords: ['like', 'approve', 'yes', 'good'],          usage: 'Approval reaction, "got it" acknowledgement.' },
  { symbol: '👎', name: 'Thumbs down',       keywords: ['dislike', 'no', 'reject', 'bad'],          usage: 'Rejection reaction (use carefully — can read harsh).' },
  { symbol: '👏', name: 'Clapping hands',    keywords: ['applause', 'congrats', 'praise'],          usage: 'Recognising a shipped feature or PR.' },
  { symbol: '🙏', name: 'Folded hands',      keywords: ['thanks', 'please', 'pray', 'gratitude'],   usage: '"Thank you" or polite ask. Skin-tone neutral.' },
  { symbol: '🤝', name: 'Handshake',         keywords: ['deal', 'partnership', 'agree', 'team'],    usage: 'Partnership, agreement, deal-closed messaging.' },
  { symbol: '💪', name: 'Flexed biceps',     keywords: ['strong', 'power', 'effort', 'gym'],        usage: 'Encouragement, "we got this" energy.' },
  { symbol: '🧑‍💻', name: 'Technologist',     keywords: ['engineer', 'developer', 'coder', 'tech'],  usage: 'Engineering team mentions.' },
  { symbol: '🧑‍🔬', name: 'Scientist',        keywords: ['lab', 'science', 'research'],              usage: 'Lab equipment context, research callouts.' },
  { symbol: '🧑‍⚕️', name: 'Health worker',    keywords: ['nurse', 'doctor', 'clinic', 'medical'],    usage: 'Clinical user persona, health-worker UX.' },
  { symbol: '👷', name: 'Construction worker', keywords: ['build', 'install', 'field', 'site'],     usage: 'Field installer, on-site tech persona.' },
  { symbol: '🧑‍🌾', name: 'Farmer',           keywords: ['rural', 'farm', 'community'],              usage: 'Rural site operator, community worker persona.' },
];

// ─── Animals & nature ────────────────────────────────────────────────────────
const ANIMALS = [
  { symbol: '🐶', name: 'Dog face',          keywords: ['dog', 'puppy', 'pet'],                     usage: 'Friendly companion mascot.' },
  { symbol: '🐱', name: 'Cat face',          keywords: ['cat', 'kitten', 'pet'],                    usage: 'Casual, internet-friendly tone.' },
  { symbol: '🦊', name: 'Fox',               keywords: ['fox', 'clever', 'cunning'],                usage: 'Mascot for "clever" or "quick" features.' },
  { symbol: '🦁', name: 'Lion',              keywords: ['lion', 'brave', 'leader'],                 usage: 'Leadership / strength messaging.' },
  { symbol: '🐝', name: 'Honeybee',          keywords: ['bee', 'busy', 'work'],                     usage: 'Productivity, "busy bee" tone.' },
  { symbol: '🦋', name: 'Butterfly',         keywords: ['butterfly', 'transform', 'change'],        usage: 'Transformation / migration imagery.' },
  { symbol: '🌱', name: 'Seedling',          keywords: ['grow', 'plant', 'new', 'pilot'],           usage: 'New program, pilot launch, growth.' },
  { symbol: '🌿', name: 'Herb',              keywords: ['plant', 'green', 'sustain'],               usage: 'Sustainability, low-impact messaging.' },
  { symbol: '🍃', name: 'Leaf in wind',      keywords: ['leaf', 'nexleaf', 'green', 'eco'],         usage: 'Brand echo (Nexleaf), eco context.' },
  { symbol: '🌍', name: 'Globe — Africa',    keywords: ['earth', 'world', 'africa', 'global'],      usage: 'Default global region (Nexleaf focus).' },
  { symbol: '🌳', name: 'Deciduous tree',    keywords: ['tree', 'nature', 'forest'],                usage: 'Nature / outdoors / sustainability.' },
  { symbol: '🌞', name: 'Sun with face',     keywords: ['sun', 'sunny', 'day'],                     usage: 'Daytime, solar context with personality.' },
];

// ─── Food & drink ────────────────────────────────────────────────────────────
const FOOD = [
  { symbol: '☕', name: 'Hot beverage',      keywords: ['coffee', 'tea', 'morning'],                usage: '"Morning standup" or break-time messaging.' },
  { symbol: '🍵', name: 'Teacup',            keywords: ['tea', 'matcha', 'warm'],                   usage: 'Tea-time, calming context.' },
  { symbol: '🍎', name: 'Red apple',         keywords: ['apple', 'fruit', 'healthy'],               usage: 'Health / nutrition context, generic fruit.' },
  { symbol: '🍇', name: 'Grapes',            keywords: ['grapes', 'fruit', 'wine'],                 usage: 'Fruit category, harvest imagery.' },
  { symbol: '🥑', name: 'Avocado',           keywords: ['avocado', 'healthy', 'fat'],               usage: 'Health-food/trendy lifestyle context.' },
  { symbol: '🍞', name: 'Bread',             keywords: ['bread', 'loaf', 'food'],                   usage: 'Bakery / staple food imagery.' },
  { symbol: '🧀', name: 'Cheese wedge',      keywords: ['cheese', 'dairy'],                         usage: 'Generic dairy / French cuisine.' },
  { symbol: '🍰', name: 'Shortcake',         keywords: ['cake', 'birthday', 'dessert'],             usage: 'Birthday / anniversary celebration.' },
  { symbol: '🍪', name: 'Cookie',            keywords: ['cookie', 'snack', 'treat'],                usage: 'Snack / treat / cookie banner copy.' },
  { symbol: '🍫', name: 'Chocolate bar',     keywords: ['chocolate', 'sweet', 'snack'],             usage: 'Sweet treat, indulgence.' },
  { symbol: '🥤', name: 'Cup with straw',    keywords: ['drink', 'soda', 'beverage'],               usage: 'Generic cold drink.' },
  { symbol: '🍺', name: 'Beer mug',          keywords: ['beer', 'drink', 'celebrate'],              usage: 'After-work / Friday vibe.' },
];

// ─── Travel & places ─────────────────────────────────────────────────────────
const TRAVEL = [
  { symbol: '✈️', name: 'Airplane',          keywords: ['flight', 'travel', 'plane'],               usage: 'Travel context, "shipping a feature" metaphor.' },
  { symbol: '🚀', name: 'Rocket',            keywords: ['launch', 'ship', 'fast'],                  usage: 'Product launch, performance improvements.' },
  { symbol: '🛰️', name: 'Satellite',         keywords: ['satellite', 'remote', 'telemetry'],        usage: 'RTMD, telemetry, remote monitoring.' },
  { symbol: '🚢', name: 'Ship',              keywords: ['ship', 'boat', 'cargo'],                   usage: 'Logistics, "shipping" puns.' },
  { symbol: '🏥', name: 'Hospital',          keywords: ['hospital', 'clinic', 'medical', 'site'],   usage: 'Facility, deployment site, clinical user.' },
  { symbol: '🏭', name: 'Factory',           keywords: ['factory', 'industrial', 'manufacturing'],  usage: 'Industrial site, large installation.' },
  { symbol: '🌅', name: 'Sunrise',           keywords: ['sunrise', 'dawn', 'morning'],              usage: 'Daily summary header, dawn solar moment.' },
  { symbol: '🗺️', name: 'World map',         keywords: ['map', 'navigate', 'plan'],                 usage: 'Roadmap / overview / planning context.' },
  { symbol: '📍', name: 'Round pushpin',     keywords: ['pin', 'location', 'place'],                usage: '"You are here", saved location.' },
  { symbol: '🏠', name: 'House',             keywords: ['home', 'house'],                           usage: '"Home" navigation, dashboard root.' },
  { symbol: '🌋', name: 'Volcano',           keywords: ['volcano', 'eruption', 'incident'],         usage: 'Major incident, post-mortem ("the volcano").' },
  { symbol: '⛺', name: 'Tent',              keywords: ['tent', 'camp', 'outdoors'],                usage: 'Field deployment, remote site.' },
];

// ─── Activities ──────────────────────────────────────────────────────────────
const ACTIVITIES = [
  { symbol: '⚽', name: 'Soccer ball',       keywords: ['football', 'soccer', 'sport'],             usage: 'Sports / team context.' },
  { symbol: '🏆', name: 'Trophy',            keywords: ['trophy', 'win', 'award', 'champion'],      usage: 'Achievements, awards, leaderboards.' },
  { symbol: '🥇', name: 'Gold medal',        keywords: ['medal', 'first', 'gold', 'winner'],        usage: 'Top performer, "winner" recognition.' },
  { symbol: '🎯', name: 'Bullseye',          keywords: ['target', 'aim', 'goal', 'okr'],            usage: 'Goals, OKRs, focus.' },
  { symbol: '🎨', name: 'Artist palette',    keywords: ['art', 'design', 'palette', 'paint'],       usage: 'Design system, theming, customization.' },
  { symbol: '🎬', name: 'Clapper board',     keywords: ['movie', 'film', 'action', 'video'],        usage: 'Video features, "action!" launch tone.' },
  { symbol: '🎤', name: 'Microphone',        keywords: ['mic', 'voice', 'podcast', 'talk'],         usage: 'Voice / audio, talk-track callouts.' },
  { symbol: '🎧', name: 'Headphones',        keywords: ['music', 'audio', 'listen'],                usage: '"Listening" mode, audio settings.' },
  { symbol: '🎉', name: 'Party popper',      keywords: ['celebrate', 'party', 'success'],           usage: 'Celebration, "you did it" moments.' },
  { symbol: '🎮', name: 'Video game',        keywords: ['game', 'controller', 'play'],              usage: 'Gamification, fun side features.' },
  { symbol: '🧩', name: 'Jigsaw piece',      keywords: ['puzzle', 'piece', 'plugin', 'component'],  usage: 'Plugins, components, building blocks.' },
  { symbol: '🎲', name: 'Game die',          keywords: ['dice', 'random', 'chance'],                usage: 'Randomisation, sampling, A/B test imagery.' },
];

// ─── Objects ─────────────────────────────────────────────────────────────────
const OBJECTS = [
  { symbol: '💻', name: 'Laptop',            keywords: ['computer', 'laptop', 'work'],              usage: '"Working from anywhere," compute context.' },
  { symbol: '📱', name: 'Mobile phone',      keywords: ['phone', 'mobile', 'cell'],                 usage: 'Mobile-only feature flag, SMS, contact.' },
  { symbol: '⌚', name: 'Watch',             keywords: ['watch', 'wearable', 'time'],               usage: 'Wearables, scheduled tasks.' },
  { symbol: '📷', name: 'Camera',            keywords: ['camera', 'photo', 'snap'],                 usage: 'Photo upload, screenshot context.' },
  { symbol: '🔋', name: 'Battery',           keywords: ['battery', 'charge', 'power'],              usage: 'Battery equipment, charge level.' },
  { symbol: '🔌', name: 'Electric plug',     keywords: ['plug', 'electric', 'grid'],                usage: 'Grid-tied connection, power outlet.' },
  { symbol: '💡', name: 'Light bulb',        keywords: ['idea', 'tip', 'lightbulb'],                usage: 'Tips, callouts, "did you know."' },
  { symbol: '🔦', name: 'Flashlight',        keywords: ['flashlight', 'torch', 'investigate'],      usage: 'Debugging, "shine a light on" context.' },
  { symbol: '📦', name: 'Package',           keywords: ['box', 'package', 'release', 'bundle'],     usage: 'Release, bundle, library, shipping.' },
  { symbol: '🛠️', name: 'Hammer and wrench', keywords: ['tools', 'fix', 'maintain', 'settings'],    usage: 'Settings, admin, tooling.' },
  { symbol: '🩺', name: 'Stethoscope',       keywords: ['stethoscope', 'doctor', 'health'],         usage: 'Medical equipment, health checks.' },
  { symbol: '🧪', name: 'Test tube',         keywords: ['test', 'beta', 'experiment', 'lab'],       usage: 'Beta features, A/B experiments.' },
];

// ─── Symbols ─────────────────────────────────────────────────────────────────
const SYMBOLS = [
  { symbol: '✅', name: 'Check mark button', keywords: ['check', 'done', 'success', 'tick'],        usage: 'Success, completed, validated.' },
  { symbol: '❌', name: 'Cross mark',        keywords: ['cross', 'fail', 'error', 'no'],            usage: 'Error, failure, blocked.' },
  { symbol: '⚠️', name: 'Warning',           keywords: ['warn', 'caution', 'attention'],            usage: 'Caution, attention, soft alert.' },
  { symbol: 'ℹ️', name: 'Information',       keywords: ['info', 'note', 'detail'],                  usage: 'Informational note, secondary detail.' },
  { symbol: '🔔', name: 'Bell',              keywords: ['bell', 'notify', 'alert'],                 usage: 'Notification, alert subscription.' },
  { symbol: '🔒', name: 'Locked',            keywords: ['lock', 'secure', 'private'],               usage: 'Locked, private, requires permission.' },
  { symbol: '🔓', name: 'Unlocked',          keywords: ['unlock', 'open', 'public'],                usage: 'Unlocked, publicly accessible.' },
  { symbol: '♻️', name: 'Recycling symbol',  keywords: ['recycle', 'reuse', 'sustainable'],         usage: 'Sustainability, circular economy.' },
  { symbol: '🔄', name: 'Counterclockwise arrows', keywords: ['refresh', 'sync', 'retry', 'reload'], usage: 'Sync, refresh, retry.' },
  { symbol: '✨', name: 'Sparkles',          keywords: ['sparkles', 'magic', 'new', 'ai'],          usage: 'New / magic / AI features.' },
  { symbol: '⭐', name: 'Star',              keywords: ['star', 'favourite', 'rating'],             usage: 'Favourites, ratings, "starred."' },
  { symbol: '❤️', name: 'Red heart',         keywords: ['heart', 'love', 'favourite'],              usage: 'Favourites, appreciation, "loved this."' },
];

// ─── Regional indicators (country flags) ─────────────────────────────────────
// Starter set only — representative countries from each major region. Add
// more by appending `{ code, name, keywords, usage }` and the page renders the
// flag from `flagFromCountryCode(code)`. Order roughly mirrors UN regional
// groupings so similar countries cluster together.
// Exported so consumers like `ToolbarRegionSelector` can drop the same list
// into a country picker without re-declaring it. Each entry has `code`,
// `name`, `keywords`, `usage` — derive the flag glyph on demand with
// `flagFromCountryCode(entry.code)`.
export const COUNTRIES = [
  // Nexleaf focus regions first
  { code: 'KE', name: 'Kenya',             keywords: ['kenya', 'nairobi', 'east africa'],     usage: 'Nexleaf HQ / primary deployment region.' },
  { code: 'NG', name: 'Nigeria',           keywords: ['nigeria', 'lagos', 'west africa'],     usage: 'West Africa deployment region.' },
  { code: 'ET', name: 'Ethiopia',          keywords: ['ethiopia', 'east africa'],             usage: 'East Africa deployment region.' },
  { code: 'GH', name: 'Ghana',             keywords: ['ghana', 'west africa'],                usage: 'West Africa deployment region.' },
  { code: 'ZA', name: 'South Africa',      keywords: ['south africa', 'rsa'],                 usage: 'Southern Africa deployment region.' },
  { code: 'TZ', name: 'Tanzania',          keywords: ['tanzania', 'east africa'],             usage: 'East Africa deployment region.' },
  { code: 'UG', name: 'Uganda',            keywords: ['uganda', 'east africa'],               usage: 'East Africa deployment region.' },
  { code: 'RW', name: 'Rwanda',            keywords: ['rwanda', 'east africa'],               usage: 'East Africa deployment region.' },
  // Americas
  { code: 'US', name: 'United States',     keywords: ['us', 'usa', 'america', 'states'],      usage: 'United States — north America region.' },
  { code: 'CA', name: 'Canada',            keywords: ['canada'],                              usage: 'Canada — north America region.' },
  { code: 'MX', name: 'Mexico',            keywords: ['mexico'],                              usage: 'Mexico — north America region.' },
  { code: 'BR', name: 'Brazil',            keywords: ['brazil'],                              usage: 'Brazil — south America region.' },
  // Europe
  { code: 'GB', name: 'United Kingdom',    keywords: ['uk', 'britain', 'england'],            usage: 'United Kingdom — western Europe.' },
  { code: 'FR', name: 'France',            keywords: ['france'],                              usage: 'France — western Europe.' },
  { code: 'DE', name: 'Germany',           keywords: ['germany'],                             usage: 'Germany — central Europe.' },
  { code: 'IT', name: 'Italy',             keywords: ['italy'],                               usage: 'Italy — southern Europe.' },
  { code: 'ES', name: 'Spain',             keywords: ['spain'],                               usage: 'Spain — southern Europe.' },
  { code: 'NL', name: 'Netherlands',       keywords: ['netherlands', 'holland'],              usage: 'Netherlands — western Europe.' },
  // Asia / Pacific
  { code: 'IN', name: 'India',             keywords: ['india'],                               usage: 'India — south Asia.' },
  { code: 'CN', name: 'China',             keywords: ['china'],                               usage: 'China — east Asia.' },
  { code: 'JP', name: 'Japan',             keywords: ['japan'],                               usage: 'Japan — east Asia.' },
  { code: 'KR', name: 'South Korea',       keywords: ['korea', 'south korea'],                usage: 'South Korea — east Asia.' },
  { code: 'ID', name: 'Indonesia',         keywords: ['indonesia'],                           usage: 'Indonesia — southeast Asia.' },
  { code: 'AU', name: 'Australia',         keywords: ['australia'],                           usage: 'Australia — Oceania.' },
];

// Build the regional-indicator entries by mapping country code → flag glyph.
const REGIONAL = COUNTRIES.map((c) => ({
  symbol: flagFromCountryCode(c.code),
  name: c.name,
  keywords: [...c.keywords, c.code.toLowerCase(), 'flag', 'country'],
  category: 'Regional indicators',
  usage: c.usage,
  code: c.code,
}));

// ─── Tag each non-regional entry with its category ───────────────────────────
function tag(items, category) {
  return items.map((it) => ({ ...it, category }));
}

export const EMOJI_CATALOG = [
  ...tag(SMILEYS,    'Smileys & emotion'),
  ...tag(PEOPLE,     'People & gestures'),
  ...tag(ANIMALS,    'Animals & nature'),
  ...tag(FOOD,       'Food & drink'),
  ...tag(TRAVEL,     'Travel & places'),
  ...tag(ACTIVITIES, 'Activities'),
  ...tag(OBJECTS,    'Objects'),
  ...tag(SYMBOLS,    'Symbols'),
  ...REGIONAL,
];
