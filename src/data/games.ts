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
  emoji?: string;
  category: GameCategory;
  badge?: GameBadge;
  stars: number;
  description: string;
  iframeUrl: string;
  thumbGradient: string;
  thumbImage?: string;
  eduTitle?: string;
  eduDescription?: string;
  eduCategory?: string;
}

export interface GameRaw {
  title: string;
  embed: string;
  image: string;
  tags: string;
  description: string;
}

export const FEATURED_SLUG = "real-flight-simulator";

const CATEGORY_GRADIENTS: Record<GameCategory, string> = {
  action:   "linear-gradient(135deg,#1a0050,#ff006644)",
  shooter:  "linear-gradient(135deg,#001a40,#00aabb44)",
  puzzle:   "linear-gradient(135deg,#002200,#00ff4422)",
  racing:   "linear-gradient(135deg,#200000,#ff440044)",
  rpg:      "linear-gradient(135deg,#150030,#aa00ff44)",
  io:       "linear-gradient(135deg,#001520,#00ccff44)",
  sports:   "linear-gradient(135deg,#002010,#00ff9944)",
  strategy: "linear-gradient(135deg,#200010,#ff006688)",
  classic:  "linear-gradient(135deg,#201000,#ff880044)",
  music:    "linear-gradient(135deg,#002020,#00ffcc44)",
};

// First match wins — ordered from most specific to least
const TAG_CATEGORY_RULES: [string, GameCategory][] = [
  ["first-person-shooter", "shooter"],
  ["battle-royale",        "shooter"],
  ["racing",               "racing"],
  ["driving",              "racing"],
  ["puzzle",               "puzzle"],
  ["match-3",              "puzzle"],
  ["soccer",               "sports"],
  ["football",             "sports"],
  ["basketball",           "sports"],
  ["baseball",             "sports"],
  ["tennis",               "sports"],
  ["golf",                 "sports"],
  ["sports",               "sports"],
  ["io-games",             "io"],
  ["tower-defense",        "strategy"],
  ["strategy",             "strategy"],
  ["role-playing",         "rpg"],
  ["rpg",                  "rpg"],
  ["rhythm",               "music"],
  ["music",                "music"],
  ["classic",              "classic"],
  ["retro",                "classic"],
  ["shooting",             "shooter"],
  ["gun",                  "shooter"],
];

function deriveCategory(tags: string): GameCategory {
  const tagSet = new Set(tags.split(",").map((t) => t.trim()));
  for (const [tag, cat] of TAG_CATEGORY_RULES) {
    if (tagSet.has(tag)) return cat;
  }
  return "action";
}

function deriveBadge(index: number): GameBadge | undefined {
  if (index < 20) return "hot";
  if (index < 50) return "new";
  if (index % 7 === 0) return "popular";
  return undefined;
}

function deriveStars(index: number): number {
  return (index % 3) + 3; // 3, 4, or 5
}

function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function transformGames(raw: GameRaw[]): Game[] {
  return raw.map((r, i) => {
    const category = deriveCategory(r.tags);
    return {
      slug:          toSlug(r.title),
      title:         r.title,
      category,
      badge:         deriveBadge(i),
      stars:         deriveStars(i),
      description:   r.description,
      iframeUrl:     r.embed,
      thumbGradient: CATEGORY_GRADIENTS[category],
      thumbImage:    r.image,
    };
  });
}

import rawGames from "./gamesRaw.json";
export const GAMES: Game[] = transformGames(rawGames as GameRaw[]);

export const CATEGORIES = [
  { id: "all",      synthLabel: "All Games", eduLabel: "All Games"    },
  { id: "action",   synthLabel: "Action",    eduLabel: "🔢 Math"       },
  { id: "shooter",  synthLabel: "Shooter",   eduLabel: "🎨 Art"        },
  { id: "racing",   synthLabel: "Racing",    eduLabel: "🌍 Geography"  },
  { id: "puzzle",   synthLabel: "Puzzle",    eduLabel: "🧩 Puzzles"    },
  { id: "sports",   synthLabel: "Sports",    eduLabel: "📖 Reading"    },
  { id: "io",       synthLabel: ".IO",       eduLabel: "🔬 Science"    },
  { id: "strategy", synthLabel: "Strategy",  eduLabel: "♟️ Logic"      },
  { id: "rpg",      synthLabel: "RPG",       eduLabel: "📚 Quests"     },
  { id: "classic",  synthLabel: "Classic",   eduLabel: "🎯 Classic"    },
  { id: "music",    synthLabel: "Music",     eduLabel: "🎵 Music"      },
] as const;
