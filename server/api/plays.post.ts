import { neon } from "@neondatabase/serverless";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

  if (!slug || slug.length > 200) {
    return { ok: false };
  }

  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    INSERT INTO game_plays (slug, play_count, last_played_at)
    VALUES (${slug}, 1, NOW())
    ON CONFLICT (slug)
    DO UPDATE SET play_count = game_plays.play_count + 1, last_played_at = NOW()
  `;

  return { ok: true };
});
