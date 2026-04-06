import type { Game } from "./gameTypes";
export type { Game, GameCategory } from "./gameTypes";
export { CATEGORIES } from "./gameTypes";

let cached: Game[] | null = null;

export async function getGames(): Promise<Game[]> {
  if (cached) return cached;

  if (typeof window === "undefined") {
    // Server: read directly from disk
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const filePath = resolve(import.meta.dirname, "../../public/games.json");
    cached = JSON.parse(readFileSync(filePath, "utf-8")) as Game[];
  } else {
    // Client: fetch from static asset
    const res = await fetch("/games.json");
    cached = (await res.json()) as Game[];
  }

  return cached;
}
