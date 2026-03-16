import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { LayoutGrid } from "lucide-react";
import { Header } from "../components/Header";
import { SplashScreen, useSplash } from "../components/SplashScreen";
import { CategoryPills } from "../components/CategoryPills";
import { GameGrid } from "../components/GameGrid";
import { RecentlyPlayed } from "../components/RecentlyPlayed";
import { SectionHeader } from "../components/SectionHeader";
import { AdSlot } from "../components/AdSlot";
import { BackToTop } from "../components/BackToTop";
import { useTheme } from "../hooks/useTheme";
import { useRecentlyPlayed } from "../hooks/useRecentlyPlayed";
import { useFavorites } from "../hooks/useFavorites";
import { GAMES } from "../data/games";
import { sessionShuffle } from "../utils/shuffle";

// ── Replace with your real AdSense IDs ──────────────────────────────────
const ADSENSE_CLIENT    = "ca-pub-XXXXXXXXXXXXXXXX";
const AD_SLOT_SIDEBAR_TOP = "2222222222";
const AD_SLOT_SIDEBAR_MID = "3333333333";
// ─────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/")({
  component: IndexPage,
});


function IndexPage() {
  const navigate = useNavigate();
  const { isEdu } = useTheme();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { visible: splashVisible, dismiss: dismissSplash } = useSplash();
  const { slugs: recentSlugs, add: addRecent } = useRecentlyPlayed();
  const { slugs: favSlugs, toggle: toggleFavorite } = useFavorites();
  const recentGames = useMemo(
    () => recentSlugs.map(s => GAMES.find(g => g.slug === s)).filter(Boolean) as typeof GAMES,
    [recentSlugs]
  );

  const shuffledGames = useMemo(() => sessionShuffle(GAMES), []);

  const featuredGame = useMemo(() => shuffledGames[0], [shuffledGames]);

  const filteredGames = useMemo(() => {
    return shuffledGames.filter((game) => {
      const title = isEdu && game.eduTitle ? game.eduTitle : game.title;
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "all" || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, isEdu]);

  const isFiltered = search.length > 0 || activeCategory !== "all";

  const openGame = (slug: string) => {
    addRecent(slug);
    navigate({ to: "/games/$slug", params: { slug } });
  };

  return (
    <>
      {/* Synthwave sun */}
      <div className={`
        fixed -bottom-44 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full pointer-events-none z-0
        transition-opacity duration-500
        ${isEdu ? "opacity-0" : "opacity-30"}
      `}
        style={{ background: "linear-gradient(180deg,#ff2dff 0%,#ff6b35 40%,#ffcc00 100%)", filter: "blur(4px)" }}
      />

      <Header search={search} onSearchChange={setSearch} />

{splashVisible && <SplashScreen game={featuredGame} onDismiss={dismissSplash} />}

      <main className="relative z-10 px-6 pb-16">

        <CategoryPills active={activeCategory} onChange={setActiveCategory} />

        {/* Content + Sidebar grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Main column */}
          <div className="min-w-0">
            <RecentlyPlayed games={recentGames} onOpen={openGame} favoriteslugs={favSlugs} onToggleFavorite={toggleFavorite} />
            <section className="mb-10">
              <SectionHeader
                title={isFiltered
                  ? `${filteredGames.length} ${isEdu ? "Games Found" : "GAMES FOUND"}`
                  : isEdu ? "🎮 All Games" : "ALL GAMES"
                }
                icon={!isFiltered ? <LayoutGrid size={14} /> : undefined}
                isEdu={isEdu}
              />
              {filteredGames.length === 0 ? (
                <div className={`
                  text-center py-12 text-sm
                  ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}
                `}>
                  {isEdu ? "😕 No games found. Try a different search!" : "NO RESULTS FOUND. TRY ANOTHER SEARCH."}
                </div>
              ) : (
                <GameGrid games={filteredGames} onOpen={openGame} />
              )}
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-20 pt-12">
            <AdSlot format="sidebar-top" slotId={AD_SLOT_SIDEBAR_TOP} clientId={ADSENSE_CLIENT} />
            <AdSlot format="sidebar-mid" slotId={AD_SLOT_SIDEBAR_MID} clientId={ADSENSE_CLIENT} />
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className={`
        relative z-10 border-t px-6 py-5 flex items-center justify-between flex-wrap gap-4
        text-xs opacity-60 transition-all duration-300
        ${isEdu
          ? "border-edu-border text-edu-text2 font-edu-body text-sm"
          : "border-synth-border text-synth-text2 font-body"
        }
      `}>
        <span>
          {isEdu ? "© 2025 FunLearn Zone — Safe & Educational" : "© 2025 ARCADE VOID — ALL RIGHTS RESERVED"}
        </span>
        <div className="flex gap-5">
          {(isEdu
            ? [["Safety", "/safety"], ["Privacy", "/privacy"], ["Teachers", "/teachers"], ["Suggest a Game", "/suggest"]]
            : [["DMCA", "/dmca"], ["PRIVACY", "/privacy"], ["CONTACT", "/contact"], ["REQUEST A GAME", "/suggest"]]
          ).map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`
                no-underline transition-colors duration-200 hover:opacity-100
                ${isEdu ? "text-edu-text2 hover:text-edu-accent" : "text-synth-text2 hover:text-synth-accent"}
              `}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>

        <BackToTop />
        <Outlet />
      </>
    );
  }
