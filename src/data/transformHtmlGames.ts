import type { Game, GameCategory } from "./gameTypes";
import { CATEGORY_GRADIENTS, toSlug, deriveBadge, deriveStars } from "./gameTypes";

export interface HtmlGameRaw {
  name: string;
  category: string;
  description: string;
  url: string;
  embed: string;
  width: number;
  height: number;
  thumb1: string;
  thumb2: string;
  thumb3: string;
  thumb4: string;
  thumb5: string;
  thumb6: string;
  thumb7: string;
  thumb8: string;
  create_date?: string;
  youtube?: string;
}

const CATEGORY_MAP: Record<string, GameCategory> = {
  // Mahjong
  "Mahjong Solitaire":    "mahjong",
  "Mahjong Connect":      "mahjong",
  "Mahjong Games":        "mahjong",
  "Mahjong Slide":        "mahjong",
  "Mahjong Tower":        "mahjong",
  "3D Mahjong":           "mahjong",
  // Cards & Solitaire
  "Card Games":           "cards",
  "Solitaire Games":      "cards",
  "Klondike":             "cards",
  "Freecell":             "cards",
  "Spider":               "cards",
  "Pyramid":              "cards",
  "Montana":              "cards",
  "Tripeaks & Golf":      "cards",
  // Match 3 & Bubble
  "Match 3 Games":        "match3",
  "Bubble Shooter":       "match3",
  "Bejeweled":            "match3",
  "Zuma Games":           "match3",
  "Connect 3":            "match3",
  "Collapse Games":       "match3",
  // Block & Tile
  "Tetris":               "block",
  "2048 & Merge":         "block",
  "1010 Block":           "block",
  "Tile Games":           "block",
  "Sorting Games":        "block",
  "Arkanoid":             "block",
  "Pinball":              "block",
  // Puzzle
  "Puzzle Games":         "puzzle",
  "Puzzles":              "puzzle",
  "Daily Puzzles":        "puzzle",
  "Brain Games":          "puzzle",
  "Math Games":           "puzzle",
  "Sudoku":               "puzzle",
  "Word Games":           "puzzle",
  "Crosswords":           "puzzle",
  "Hidden Object Games":  "puzzle",
  "Hidden Numbers":       "puzzle",
  "Hidden Alphabet":      "puzzle",
  "Hidden Clues":         "puzzle",
  "Difference Games":     "puzzle",
  "Memory":               "puzzle",
  "Maze Games":           "puzzle",
  // Action
  "Platform":             "action",
  "Skill":                "action",
  "Escape Games":         "action",
  "Retro":                "action",
  "Snake":                "action",
  "Pac Maze":             "action",
  // Racing
  "Racing":               "racing",
  // Shooter
  "Shooting & War":       "shooter",
  // Strategy
  "Tower Defense":        "strategy",
  "Time management":      "strategy",
  "Board":                "strategy",
  // Sports
  "Sports":               "sports",
  "Golf":                 "sports",
  "Billiards":            "sports",
};

export function transformHtmlGames(raw: HtmlGameRaw[]): Game[] {
  return raw.map((r, i) => {
    const category: GameCategory = CATEGORY_MAP[r.category] ?? "action";
    return {
      slug:          toSlug(r.name),
      title:         r.name,
      category,
      badge:         deriveBadge(i),
      stars:         deriveStars(i),
      description:   r.description,
      iframeUrl:     r.url,
      thumbGradient: CATEGORY_GRADIENTS[category],
      thumbImage:    r.thumb4 || r.thumb3 || undefined,
      source:        "htmlgames" as const,
    };
  });
}
