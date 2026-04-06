import type { Game } from "./gameTypes";
export type { Game, GameCategory } from "./gameTypes";
export { CATEGORIES } from "./gameTypes";

let cached: Game[] | null = null;

export async function getGames(): Promise<Game[]> {
  if (cached) return cached;

  const mod = await import("../../public/games.json");
  cached = (mod.default ?? mod) as Game[];

  return cached;
}
