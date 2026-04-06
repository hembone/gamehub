import type { Game } from "./gameTypes";
export type { Game, GameCategory } from "./gameTypes";
export { CATEGORIES } from "./gameTypes";

let cached: Game[] | null = null;

export async function getGames(): Promise<Game[]> {
  if (cached) return cached;

  if (typeof window === "undefined") {
    // Server: dynamic import bundles JSON into server chunk only
    const mod = await import("../../public/games.json");
    cached = (mod.default ?? mod) as Game[];
  } else {
    // Client: fetch from CDN-served static asset
    const res = await fetch("/games.json");
    cached = (await res.json()) as Game[];
  }

  return cached;
}
