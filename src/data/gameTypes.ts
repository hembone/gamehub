export type GameCategory =
  | "action"
  | "puzzle"
  | "match3"
  | "cards"
  | "mahjong"
  | "block"
  | "racing"
  | "shooter"
  | "strategy"
  | "sports";

export type GameBadge = "new" | "hot" | "popular";

export type GameSource = "onlinegames" | "htmlgames";

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
  source: GameSource;
  eduTitle?: string;
  eduDescription?: string;
  eduCategory?: string;
}

export const CATEGORY_GRADIENTS: Record<GameCategory, string> = {
  action:   "linear-gradient(135deg,#1a0050,#ff006644)",
  puzzle:   "linear-gradient(135deg,#002200,#00ff4422)",
  match3:   "linear-gradient(135deg,#002020,#00ffcc44)",
  cards:    "linear-gradient(135deg,#201000,#ff880044)",
  mahjong:  "linear-gradient(135deg,#150030,#aa00ff44)",
  block:    "linear-gradient(135deg,#001520,#00ccff44)",
  racing:   "linear-gradient(135deg,#200000,#ff440044)",
  shooter:  "linear-gradient(135deg,#001a40,#00aabb44)",
  strategy: "linear-gradient(135deg,#200010,#ff006688)",
  sports:   "linear-gradient(135deg,#002010,#00ff9944)",
};

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function deriveBadge(index: number): GameBadge | undefined {
  if (index < 20) return "hot";
  if (index < 50) return "new";
  if (index % 7 === 0) return "popular";
  return undefined;
}

export function deriveStars(index: number): number {
  return (index % 3) + 3;
}

export const CATEGORIES = [
  { id: "all",      synthLabel: "All Games", eduLabel: "All Games"   },
  { id: "action",   synthLabel: "Action",    eduLabel: "🎮 Action"   },
  { id: "puzzle",   synthLabel: "Puzzle",    eduLabel: "🧩 Puzzle"   },
  { id: "match3",   synthLabel: "Match 3",   eduLabel: "🎨 Match 3"  },
  { id: "cards",    synthLabel: "Cards",     eduLabel: "🃏 Cards"    },
  { id: "mahjong",  synthLabel: "Mahjong",   eduLabel: "🀄 Mahjong"  },
  { id: "block",    synthLabel: "Block",     eduLabel: "🟦 Block"    },
  { id: "racing",   synthLabel: "Racing",    eduLabel: "🏎️ Racing"   },
  { id: "shooter",  synthLabel: "Shooter",   eduLabel: "🎯 Shooter"  },
  { id: "strategy", synthLabel: "Strategy",  eduLabel: "♟️ Strategy" },
  { id: "sports",   synthLabel: "Sports",    eduLabel: "🏆 Sports"   },
] as const;
