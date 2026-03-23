import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = neon(process.env.DATABASE_URL!);

  if (req.method === "POST") {
    const slug = typeof req.body?.slug === "string" ? req.body.slug.trim() : "";
    if (!slug || slug.length > 200) {
      return res.status(400).json({ ok: false });
    }

    await sql`
      INSERT INTO game_plays (slug, play_count, last_played_at)
      VALUES (${slug}, 1, NOW())
      ON CONFLICT (slug)
      DO UPDATE SET play_count = game_plays.play_count + 1, last_played_at = NOW()
    `;

    return res.status(200).json({ ok: true });
  }

  if (req.method === "GET") {
    const top = Math.min(Math.max(Number(req.query.top) || 50, 1), 200);

    const plays = await sql`
      SELECT slug, play_count
      FROM game_plays
      ORDER BY play_count DESC
      LIMIT ${top}
    `;

    return res.status(200).json({ plays });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
