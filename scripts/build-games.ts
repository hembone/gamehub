/**
 * Pre-transforms raw game JSON into a single public/games.json.
 * Run before build: npx tsx scripts/build-games.ts
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { transformOnlineGames } from "../src/data/transformOnlineGames";
import { transformHtmlGames } from "../src/data/transformHtmlGames";
import type { OnlineGameRaw } from "../src/data/transformOnlineGames";
import type { HtmlGameRaw } from "../src/data/transformHtmlGames";
import type { Game } from "../src/data/gameTypes";

import rawOnline from "../src/data/gamesRaw.json";
import rawHtml from "../src/data/htmlGamesRaw.json";

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
const htmlGames = transformHtmlGames(rawHtml as HtmlGameRaw[]);
const games = mergeGames(onlineGames, htmlGames);

const outPath = resolve(import.meta.dirname, "../public/games.json");
writeFileSync(outPath, JSON.stringify(games));

console.log(`wrote ${games.length} games to public/games.json (${(Buffer.byteLength(JSON.stringify(games)) / 1024).toFixed(0)} KB)`);
