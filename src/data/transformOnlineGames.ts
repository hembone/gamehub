import type { Game, GameCategory } from "./gameTypes";
import { CATEGORY_GRADIENTS, toSlug, deriveBadge, deriveStars } from "./gameTypes";

export interface OnlineGameRaw {
  title: string;
  embed: string;
  image: string;
  tags: string;
  description: string;
}

// First match wins — ordered from most specific to least
const TAG_CATEGORY_RULES: [string, GameCategory][] = [
  ["first-person-shooter", "shooter"],
  ["battle-royale",        "shooter"],
  ["shooting",             "shooter"],
  ["gun",                  "shooter"],
  ["war",                  "shooter"],
  ["racing",               "racing"],
  ["driving",              "racing"],
  ["drift",                "racing"],
  ["stunt",                "racing"],
  ["match-3",              "match3"],
  ["bubble-shooter",       "match3"],
  ["mahjong",              "mahjong"],
  ["solitaire",            "cards"],
  ["card",                 "cards"],
  ["poker",                "cards"],
  ["tetris",               "block"],
  ["2048",                 "block"],
  ["blocks",               "block"],
  ["soccer",               "sports"],
  ["football",             "sports"],
  ["basketball",           "sports"],
  ["baseball",             "sports"],
  ["tennis",               "sports"],
  ["golf",                 "sports"],
  ["sports",               "sports"],
  ["tower-defense",        "strategy"],
  ["strategy",             "strategy"],
  ["puzzle",               "puzzle"],
  ["logic",                "puzzle"],
  ["word",                 "puzzle"],
];

function deriveCategory(tags: string): GameCategory {
  const tagSet = new Set(tags.split(",").map((t) => t.trim()));
  for (const [tag, cat] of TAG_CATEGORY_RULES) {
    if (tagSet.has(tag)) return cat;
  }
  return "action";
}

export function transformOnlineGames(raw: OnlineGameRaw[]): Game[] {
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
      source:        "onlinegames" as const,
    };
  });
}
