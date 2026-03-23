import { neon } from "@neondatabase/serverless";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const top = Math.min(Math.max(Number(query.top) || 50, 1), 200);

  const sql = neon(process.env.DATABASE_URL!);

  const plays = await sql`
    SELECT slug, play_count
    FROM game_plays
    ORDER BY play_count DESC
    LIMIT ${top}
  `;

  return { plays };
});
