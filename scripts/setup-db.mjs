import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS game_plays (
    slug TEXT PRIMARY KEY,
    play_count INTEGER NOT NULL DEFAULT 1,
    last_played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )
`;

console.log("game_plays table ready");
