import { useEffect, useRef, useState } from "react";
import type { Game } from "../data/games";
import { GameCard } from "./GameCard";

const PAGE_SIZE = 48;

interface GameGridProps {
  games: Game[];
  onOpen: (slug: string) => void;
}

export function GameGrid({ games, onOpen }: GameGridProps) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset limit and scroll to top when the filtered list changes
  useEffect(() => {
    setLimit(PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [games]);

  const visible = games.slice(0, limit);
  const hasMore = limit < games.length;

  // Re-attach observer whenever the sentinel mounts/unmounts (hasMore flips)
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLimit((l) => l + PAGE_SIZE);
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore]);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
        {visible.map((game, i) => (
          <GameCard
            key={game.slug}
            game={game}
            onClick={() => onOpen(game.slug)}
            style={{ animationDelay: `${(i % PAGE_SIZE) * 30}ms` }}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="h-16 flex items-center justify-center mt-2">
          <div className="w-6 h-6 rounded-full border-2 border-current opacity-20 animate-spin border-t-transparent" />
        </div>
      )}
    </>
  );
}
