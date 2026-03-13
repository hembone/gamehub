import { GAMES_API_URL, transformGames, type Game } from "./games";

let cache: Game[] | null = null;

export async function loadGames(): Promise<Game[]> {
  if (cache) return cache;
  const res = await fetch(GAMES_API_URL);
  if (!res.ok) throw new Error(`Failed to fetch games: ${res.status}`);
  const raw = await res.json();
  cache = transformGames(raw);
  return cache;
}
