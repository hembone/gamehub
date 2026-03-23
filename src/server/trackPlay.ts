import { createServerFn } from "@tanstack/react-start";
import { neon } from "@neondatabase/serverless";

export const trackPlay = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string }) => {
    const slug = typeof data.slug === "string" ? data.slug.trim() : "";
    if (!slug || slug.length > 200) throw new Error("Invalid slug");
    return { slug };
  })
  .handler(async ({ data }) => {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO game_plays (slug, play_count, last_played_at)
      VALUES (${data.slug}, 1, NOW())
      ON CONFLICT (slug)
      DO UPDATE SET play_count = game_plays.play_count + 1, last_played_at = NOW()
    `;

    return { ok: true };
  });

export const getTopPlays = createServerFn({ method: "GET" })
  .inputValidator((data: { top?: number }) => {
    const top = Math.min(Math.max(Number(data.top) || 50, 1), 200);
    return { top };
  })
  .handler(async ({ data }) => {
    const sql = neon(process.env.DATABASE_URL!);

    const plays = await sql`
      SELECT slug, play_count
      FROM game_plays
      ORDER BY play_count DESC
      LIMIT ${data.top}
    `;

    return { plays };
  });
