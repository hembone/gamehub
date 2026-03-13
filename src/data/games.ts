export type GameCategory =
  | "action"
  | "puzzle"
  | "racing"
  | "sports"
  | "io"
  | "shooter"
  | "strategy"
  | "classic"
  | "music"
  | "rpg";

export type GameBadge = "new" | "hot" | "popular";

export interface Game {
  slug: string;
  title: string;
  emoji: string;
  category: GameCategory;
  badge?: GameBadge;
  stars: number; // 1-5
  description: string;
  iframeUrl: string; // embed URL
  thumbGradient: string; // CSS gradient for placeholder thumb
  // Edu-mode overrides
  eduTitle?: string;
  eduDescription?: string;
  eduCategory?: string;
}

export const GAMES: Game[] = [
  {
    slug: "runner-3000",
    title: "Runner 3000",
    emoji: "🏃",
    category: "action",
    badge: "hot",
    stars: 5,
    description: "Dodge obstacles and collect power-ups in this endless runner. How far can you go?",
    iframeUrl: "https://www.crazygames.com/embed/temple-run-2",
    thumbGradient: "linear-gradient(135deg,#1a0050,#ff006644)",
    eduTitle: "Speed Math Runner",
    eduDescription: "Run and solve math problems before time runs out! Great for mental arithmetic practice.",
    eduCategory: "Math",
  },
  {
    slug: "neon-striker",
    title: "Neon Striker",
    emoji: "🎯",
    category: "shooter",
    badge: "new",
    stars: 4,
    description: "Precision shooting in a neon-drenched world. Lock on, aim, and blast away enemies.",
    iframeUrl: "https://www.crazygames.com/embed/bullet-force-multiplayer",
    thumbGradient: "linear-gradient(135deg,#001a40,#00aabb44)",
    eduTitle: "Target Practice",
    eduDescription: "Improve your focus and coordination with this precision targeting challenge.",
    eduCategory: "Logic",
  },
  {
    slug: "cube-maze",
    title: "Cube Maze",
    emoji: "🧩",
    category: "puzzle",
    stars: 4,
    description: "Navigate a rolling cube through increasingly complex mazes. Think before you roll.",
    iframeUrl: "https://www.crazygames.com/embed/unblock-it",
    thumbGradient: "linear-gradient(135deg,#002200,#00ff4422)",
    eduTitle: "Spatial Reasoning Maze",
    eduDescription: "Build spatial reasoning and logic skills by navigating clever 3D cube puzzles.",
    eduCategory: "Puzzles",
  },
  {
    slug: "drift-kings",
    title: "Drift Kings",
    emoji: "🏎️",
    category: "racing",
    badge: "popular",
    stars: 5,
    description: "Master the art of drifting on neon-soaked tracks. Chain drifts to build your score.",
    iframeUrl: "https://www.crazygames.com/embed/madalin-stunt-cars-2",
    thumbGradient: "linear-gradient(135deg,#200000,#ff440044)",
    eduTitle: "Geography Road Trip",
    eduDescription: "Drive across different countries and learn fun facts about each region you visit!",
    eduCategory: "Geography",
  },
  {
    slug: "dungeon-break",
    title: "Dungeon Break",
    emoji: "⚔️",
    category: "rpg",
    stars: 4,
    description: "Explore procedurally generated dungeons, level up, and defeat the boss on each floor.",
    iframeUrl: "https://www.crazygames.com/embed/soul-knight",
    thumbGradient: "linear-gradient(135deg,#150030,#aa00ff44)",
    eduTitle: "History Quest",
    eduDescription: "Travel through history and solve challenges to unlock new eras. Learn as you explore!",
    eduCategory: "History",
  },
  {
    slug: "slither-pro",
    title: "Slither.PRO",
    emoji: "🌐",
    category: "io",
    badge: "hot",
    stars: 5,
    description: "Grow the longest snake on the server. Outmaneuver real players in real-time.",
    iframeUrl: "https://slither.io",
    thumbGradient: "linear-gradient(135deg,#001520,#00ccff44)",
    eduTitle: "Ecosystem Sim",
    eduDescription: "Learn about food chains and ecosystems in this multiplayer science simulation!",
    eduCategory: "Science",
  },
  {
    slug: "pixel-soccer",
    title: "Pixel Soccer",
    emoji: "⚽",
    category: "sports",
    stars: 3,
    description: "2-player retro soccer with pixel-perfect controls. First to 5 wins.",
    iframeUrl: "https://www.crazygames.com/embed/head-soccer",
    thumbGradient: "linear-gradient(135deg,#002010,#00ff9944)",
    eduTitle: "World Cup Geography",
    eduDescription: "Compete for the World Cup while learning about the countries of each team!",
    eduCategory: "Geography",
  },
  {
    slug: "war-grid",
    title: "War Grid",
    emoji: "♟️",
    category: "strategy",
    badge: "new",
    stars: 4,
    description: "Command your units across a tactical grid. Outthink your enemy to claim victory.",
    iframeUrl: "https://www.crazygames.com/embed/bloons-td-6",
    thumbGradient: "linear-gradient(135deg,#200010,#ff006688)",
    eduTitle: "Logic Grid",
    eduDescription: "Develop critical thinking and strategic planning skills through grid-based puzzles.",
    eduCategory: "Logic",
  },
  {
    slug: "space-void",
    title: "Space Void",
    emoji: "🚀",
    category: "shooter",
    badge: "new",
    stars: 4,
    description: "Survive waves of alien invaders in the void of space. Classic arcade action reborn.",
    iframeUrl: "https://www.crazygames.com/embed/galaxian",
    thumbGradient: "linear-gradient(135deg,#0a0020,#6600ff44)",
    eduTitle: "Solar System Explorer",
    eduDescription: "Explore the solar system and answer astronomy questions to power your spaceship!",
    eduCategory: "Science",
  },
  {
    slug: "card-wars-x",
    title: "Card Wars X",
    emoji: "🃏",
    category: "strategy",
    badge: "new",
    stars: 3,
    description: "Build a deck and duel opponents in this fast-paced digital card game.",
    iframeUrl: "https://www.crazygames.com/embed/hearthstone",
    thumbGradient: "linear-gradient(135deg,#001030,#0066ff44)",
    eduTitle: "Vocabulary Duel",
    eduDescription: "Build your vocabulary by playing word cards against opponents. Reading made fun!",
    eduCategory: "Reading",
  },
  {
    slug: "frogger-hd",
    title: "Frogger HD",
    emoji: "🐸",
    category: "classic",
    badge: "new",
    stars: 5,
    description: "The timeless classic, rebuilt in HD. Cross the road, dodge the logs, reach home.",
    iframeUrl: "https://www.crazygames.com/embed/frogger-in-toy-town",
    thumbGradient: "linear-gradient(135deg,#201000,#ff880044)",
    eduTitle: "Frogger Classic",
    eduDescription: "A beloved classic game that builds reflexes and pattern recognition skills.",
    eduCategory: "Logic",
  },
  {
    slug: "rhythm-clash",
    title: "Rhythm Clash",
    emoji: "🎸",
    category: "music",
    badge: "new",
    stars: 4,
    description: "Hit the beats, build combos, and clash with other players in real-time rhythm battles.",
    iframeUrl: "https://www.crazygames.com/embed/piano-tiles",
    thumbGradient: "linear-gradient(135deg,#002020,#00ffcc44)",
    eduTitle: "Music & Rhythm Lab",
    eduDescription: "Learn musical concepts like rhythm, tempo, and beat through interactive play.",
    eduCategory: "Art",
  },
  {
    slug: "snake-reloaded",
    title: "Snake Reloaded",
    emoji: "🐍",
    category: "classic",
    badge: "hot",
    stars: 5,
    description: "The legendary snake game rebuilt with neon visuals, power-ups, and online leaderboards. How long can you survive?",
    iframeUrl: "https://www.crazygames.com/embed/snake-io",
    thumbGradient: "linear-gradient(135deg,#001a20,#00ff8844)",
    eduTitle: "Math Invaders",
    eduDescription: "Blast away math problems with this fun space game! Practice multiplication and division.",
    eduCategory: "Math",
  },
];

export const CATEGORIES = [
  { id: "all", synthLabel: "All Games", eduLabel: "All Games" },
  { id: "action", synthLabel: "⚡ Action", eduLabel: "🔢 Math" },
  { id: "puzzle", synthLabel: "🧩 Puzzle", eduLabel: "🧩 Puzzles" },
  { id: "racing", synthLabel: "🏎️ Racing", eduLabel: "🌍 Geography" },
  { id: "sports", synthLabel: "⚽ Sports", eduLabel: "📖 Reading" },
  { id: "io", synthLabel: "🌐 .IO Games", eduLabel: "🔬 Science" },
  { id: "shooter", synthLabel: "🎯 Shooter", eduLabel: "🎨 Art" },
  { id: "strategy", synthLabel: "♟️ Strategy", eduLabel: "♟️ Logic" },
] as const;

export const FEATURED_SLUG = "snake-reloaded";
