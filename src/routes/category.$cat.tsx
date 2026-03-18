import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { useTheme } from "../hooks/useTheme";
import { GAMES, CATEGORIES } from "../data/games";
import { GameGrid } from "../components/GameGrid";
import { Header } from "../components/Header";
import { JsonLd } from "../components/JsonLd";
import { SITE_URL, SITE_NAME } from "../config";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  action:   "Fast-paced action games — platformers, skill challenges, escape rooms, and arcade classics.",
  puzzle:   "Brain-teasing puzzle games — hidden objects, sudoku, word games, mahjong, and more.",
  match3:   "Match 3 and bubble shooter games — Bejeweled, Zuma, Connect 3, and bubble pop puzzles.",
  cards:    "Classic card and solitaire games — Klondike, Freecell, Spider, Pyramid, and Tripeaks.",
  mahjong:  "Mahjong games of every variety — solitaire, connect, tower, 3D, and slide.",
  block:    "Block and tile games — Tetris, 2048, 1010 Block, Arkanoid, Pinball, and more.",
  racing:   "Racing and driving games — cars, drift, stunts, and high-speed circuit races.",
  shooter:  "Shooting and war games — first-person shooters, battle royale, and combat action.",
  strategy: "Strategy games — tower defense, board games, and time management challenges.",
  sports:   "Sports games — billiards, golf, soccer, and more athletic challenges.",
};

export const Route = createFileRoute("/category/$cat")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.id === params.cat && c.id !== "all");
    if (!cat) throw notFound();
    const games = GAMES.filter((g) => g.category === params.cat);
    return { cat, games };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.cat) return {};
    const { cat, games } = loaderData;
    const title = `${cat.synthLabel} Games — Play Free Online | ${SITE_NAME}`;
    const description = `${CATEGORY_DESCRIPTIONS[cat.id] ?? ""} Play ${games.length} free ${cat.synthLabel.toLowerCase()} games online. No download required.`;
    const url = `${SITE_URL}/category/${cat.id}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => <p>Category not found.</p>,
});

function CategoryPage() {
  const { cat, games } = Route.useLoaderData();
  const { isEdu } = useTheme();
  const navigate = useNavigate();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${cat.synthLabel} Games — ${SITE_NAME}`,
    "description": CATEGORY_DESCRIPTIONS[cat.id] ?? "",
    "url": `${SITE_URL}/category/${cat.id}`,
    "numberOfItems": games.length,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": cat.synthLabel, "item": `${SITE_URL}/category/${cat.id}` },
      ],
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <Header search="" onSearchChange={() => {}} />
      <main className="relative z-10 max-w-[1280px] mx-auto px-6 pb-16 pt-8">
        <div className="mb-6">
          <Link
            to="/"
            className={`text-xs opacity-60 hover:opacity-100 transition-opacity no-underline ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}`}
          >
            ← All Games
          </Link>
          <h1 className={`mt-2 font-black text-3xl ${isEdu ? "text-edu-accent font-edu-display" : "font-display tracking-wide text-synth-text"}`}>
            {isEdu ? cat.eduLabel : cat.synthLabel.toUpperCase()}
          </h1>
          <p className={`mt-1 text-sm opacity-60 ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}`}>
            {games.length} games
          </p>
        </div>
        <GameGrid games={games} onOpen={(slug) => navigate({ to: "/games/$slug", params: { slug } })} />
      </main>
    </>
  );
}
