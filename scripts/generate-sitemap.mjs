/**
 * Generates /public/sitemap.xml from both raw game JSON sources.
 * Run with: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SITE_URL = "https://arcadevoid.games";
const TODAY = new Date().toISOString().split("T")[0];

function toSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Load both sources
const onlineGames = JSON.parse(readFileSync(join(root, "src/data/gamesRaw.json"), "utf8"));
const htmlGames   = JSON.parse(readFileSync(join(root, "src/data/htmlGamesRaw.json"), "utf8"));

// Build deduplicated slug set (onlinegames wins on collision)
const seen = new Set();
const gameEntries = [];

for (const g of onlineGames) {
  const slug = toSlug(g.title);
  if (!seen.has(slug)) {
    seen.add(slug);
    gameEntries.push({ slug, title: g.title, image: g.image || null, date: null });
  }
}
for (const g of htmlGames) {
  const slug = toSlug(g.name);
  if (!seen.has(slug)) {
    seen.add(slug);
    gameEntries.push({ slug, title: g.name, image: g.thumb4 || g.thumb3 || null, date: g.create_date || null });
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CATEGORIES = ["action","puzzle","match3","cards","mahjong","block","racing","shooter","strategy","sports"];

const staticPages = [
  { url: SITE_URL, priority: "1.0", changefreq: "daily" },
  ...CATEGORIES.map(cat => ({ url: `${SITE_URL}/category/${cat}`, priority: "0.8", changefreq: "weekly" })),
];

const gameUrls = gameEntries.map(({ slug, title, image, date }) => {
  const imageTag = image
    ? `\n    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n      <image:title>${escapeXml(title)} — Play Free Online</image:title>\n    </image:image>`
    : "";
  const lastmod = date ? `\n    <lastmod>${date}</lastmod>` : "";
  return `  <url>
    <loc>${escapeXml(`${SITE_URL}/games/${slug}`)}</loc>${lastmod}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>${imageTag}
  </url>`;
});

const staticUrls = staticPages.map(({ url, priority, changefreq }) =>
  `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticUrls.join("\n")}
${gameUrls.join("\n")}
</urlset>`;

const outPath = join(root, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");

console.log(`✓ Sitemap written to public/sitemap.xml`);
console.log(`  ${staticPages.length} static pages`);
console.log(`  ${gameEntries.length} game pages`);
console.log(`  ${gameEntries.length + staticPages.length} total URLs`);
