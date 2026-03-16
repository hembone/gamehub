import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { LayoutGrid } from "lucide-react";
import { Header } from "../components/Header";
import { FeaturedBanner } from "../components/FeaturedBanner";
import { CategoryPills } from "../components/CategoryPills";
import { GameGrid } from "../components/GameGrid";
import { RecentlyPlayed } from "../components/RecentlyPlayed";
import { SectionHeader } from "../components/SectionHeader";
import { AdSlot } from "../components/AdSlot";
import { BackToTop } from "../components/BackToTop";
import { useTheme } from "../hooks/useTheme";
import { useRecentlyPlayed } from "../hooks/useRecentlyPlayed";
import { GAMES } from "../data/games";

// ── Replace with your real AdSense IDs ──────────────────────────────────
const ADSENSE_CLIENT    = "ca-pub-XXXXXXXXXXXXXXXX";
const AD_SLOT_LEADERBOARD = "1111111111";
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

  const { slugs: recentSlugs, add: addRecent } = useRecentlyPlayed();
  const recentGames = useMemo(
    () => recentSlugs.map(s => GAMES.find(g => g.slug === s)).filter(Boolean) as typeof GAMES,
    [recentSlugs]
  );

  const featuredGame = useMemo(() => GAMES[Math.floor(Math.random() * GAMES.length)], []);

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
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

      {/* Leaderboard ad */}
      <AdSlot format="leaderboard" slotId={AD_SLOT_LEADERBOARD} clientId={ADSENSE_CLIENT} />

      {/* Hero */}
      <div className="relative z-10 text-center px-6 pt-6 pb-4 sm:pt-12 sm:pb-8">
        <h1 className={`
          font-black leading-tight mb-3 text-[clamp(1.2rem,4.5vw,3.5rem)] transition-all duration-300
          ${isEdu
            ? "text-edu-accent font-edu-display"
            : "font-display tracking-wide bg-gradient-to-b from-white via-[#ff99ff] to-[#cc44ff] text-gradient-clip drop-shadow-[0_0_20px_rgba(255,0,255,0.35)]"
          }
        `}>
          {isEdu ? "Learn. Explore. Play!" : "PLAY ANYTHING.\nANYTIME."}
        </h1>
      </div>

      <main className="relative z-10 px-6 pb-16">
        {!isFiltered && <div className="hidden sm:block max-w-[1200px] mx-auto"><FeaturedBanner game={featuredGame} /></div>}

        <CategoryPills active={activeCategory} onChange={setActiveCategory} />

        {/* Content + Sidebar grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Main column */}
          <div>
            <RecentlyPlayed games={recentGames} onOpen={openGame} />
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
