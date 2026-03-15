import { createFileRoute, notFound } from "@tanstack/react-router";
import { GameModal } from "../components/GameModal";
import { JsonLd } from "../components/JsonLd";
import { GAMES } from "../data/games";
import { SITE_URL, SITE_NAME } from "../config";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = GAMES.find((g) => g.slug === params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.game) return {};
    const { game } = loaderData;
    const title = `${game.title} — Play Free Online | ${SITE_NAME}`;
    const description = game.description
      ? game.description.slice(0, 155).replace(/\s\S+$/, "…")
      : `Play ${game.title} free online. No download required.`;
    const url = `${SITE_URL}/games/${game.slug}`;
    const image = game.thumbImage ?? null;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }] : []),
        // Twitter Card
        { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(image ? [{ name: "twitter:image", content: image }] : []),
      ],
      links: [
        { rel: "canonical", href: url },
      ],
    };
  },
  component: GameModalRoute,
  notFoundComponent: () => <p>Game not found.</p>,
});

function GameModalRoute() {
  const { game } = Route.useLoaderData();
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description || "",
    "url": `${SITE_URL}/games/${game.slug}`,
    "genre": game.category,
    ...(game.thumbImage ? { "image": game.thumbImage } : {}),
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "publisher": { "@type": "Organization", "name": SITE_NAME },
  };
  return (
    <>
      <JsonLd data={schema} />
      <GameModal game={game} />
    </>
  );
}
