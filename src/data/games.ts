import type { Game } from "./gameTypes";
export type { Game, GameCategory, GameBadge, GameSource } from "./gameTypes";
export { CATEGORIES } from "./gameTypes";

import { transformOnlineGames } from "./transformOnlineGames";
import { transformHtmlGames }   from "./transformHtmlGames";

import rawOnline from "./gamesRaw.json";
import rawHtml   from "./htmlGamesRaw.json";

import type { OnlineGameRaw } from "./transformOnlineGames";
import type { HtmlGameRaw }   from "./transformHtmlGames";

function mergeGames(...sources: Game[][]): Game[] {
  const seen = new Map<string, Game>();
  for (const list of sources) {
    for (const game of list) {
      if (!seen.has(game.slug)) {
        seen.set(game.slug, game);
      }
    }
  }
  return Array.from(seen.values());
}

const onlineGames = transformOnlineGames(rawOnline as OnlineGameRaw[]);
const htmlGames   = transformHtmlGames(rawHtml as HtmlGameRaw[]);

export const GAMES: Game[] = mergeGames(onlineGames, htmlGames);

export const FEATURED_SLUG = "real-flight-simulator";
