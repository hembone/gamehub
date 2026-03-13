import { createFileRoute, notFound } from "@tanstack/react-router";
import { GameModal } from "../components/GameModal";
import { GAMES } from "../data/games";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = GAMES.find((g) => g.slug === params.slug);
    if (!game) throw notFound();
    return { game };
  },
  component: GameModalRoute,
  notFoundComponent: () => <p>Game not found.</p>,
});

function GameModalRoute() {
  const { game } = Route.useLoaderData();
  return <GameModal game={game} />;
}
