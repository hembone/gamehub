import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { Flame, Sparkles, LayoutGrid } from "lucide-react";
import { Header } from "../components/Header";
import { FeaturedBanner } from "../components/FeaturedBanner";
import { CategoryPills } from "../components/CategoryPills";
import { GameCard } from "../components/GameCard";
import { AdSlot } from "../components/AdSlot";
import { useTheme } from "../hooks/useTheme";
import { GAMES, FEATURED_SLUG } from "../data/games";

// ── Replace with your real AdSense IDs ──────────────────────────────────
const ADSENSE_CLIENT    = "ca-pub-XXXXXXXXXXXXXXXX";
const AD_SLOT_LEADERBOARD = "1111111111";
const AD_SLOT_SIDEBAR_TOP = "2222222222";
const AD_SLOT_SIDEBAR_MID = "3333333333";
// ─────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function SectionHeader({ title, icon, isEdu, showSeeAll }: { title: string; icon?: React.ReactNode; isEdu: boolean; showSeeAll?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`
        inline-flex items-center gap-1.5 font-bold whitespace-nowrap tracking-widest uppercase
        ${isEdu
          ? "text-edu-accent font-edu-display text-lg tracking-wide"
          : "text-synth-text font-display text-[0.9rem]"
        }
      `}>
        {!isEdu && icon}
        {title}
      </span>
      <div className={`
        flex-1 h-px
        ${isEdu ? "bg-edu-border" : "bg-synth-border shadow-[0_0_5px_rgba(255,0,255,0.2)]"}
      `} />
      {showSeeAll && (
        <a
          href="#"
          className={`
            text-[0.68rem] opacity-75 hover:opacity-100 no-underline transition-opacity whitespace-nowrap
            ${isEdu ? "text-edu-accent2 font-edu-body text-sm" : "text-synth-accent2 font-body"}
          `}
        >
          {isEdu ? "See All →" : "SEE ALL →"}
        </a>
      )}
    </div>
  );
}

function IndexPage() {
  const navigate = useNavigate();
  const { isEdu } = useTheme();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const featuredGame = GAMES.find((g) => g.slug === FEATURED_SLUG) ?? GAMES[0];

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const title = isEdu && game.eduTitle ? game.eduTitle : game.title;
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "all" || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, isEdu]);

  const hotGames = filteredGames.filter((g) => g.badge === "hot" || g.badge === "popular");
  const newGames = filteredGames.filter((g) => g.badge === "new");
  const showAll = search.length > 0 || activeCategory !== "all";

  const openGame = (slug: string) => navigate({ to: "/games/$slug", params: { slug } });

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
      <div className="relative z-10 text-center px-6 pt-12 pb-8">
        <h1 className={`
          font-black leading-tight mb-3 text-[clamp(1.8rem,4.5vw,3.5rem)] transition-all duration-300
          ${isEdu
            ? "text-edu-accent font-edu-display"
            : "font-display tracking-wide bg-gradient-to-b from-white via-[#ff99ff] to-[#cc44ff] text-gradient-clip drop-shadow-[0_0_20px_rgba(255,0,255,0.35)]"
          }
        `}>
          {isEdu ? "Learn. Explore. Play!" : "PLAY ANYTHING.\nANYTIME."}
        </h1>
      </div>

      <main className="relative z-10 px-6 pb-16">
        {!showAll && <div className="max-w-[1200px] mx-auto"><FeaturedBanner game={featuredGame} /></div>}

        <CategoryPills active={activeCategory} onChange={setActiveCategory} />

        {/* Content + Sidebar grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Main column */}
          <div>
            {showAll ? (
              <section className="mb-10">
                <SectionHeader
                  title={`${filteredGames.length} ${isEdu ? "Games Found" : "GAMES FOUND"}`}
                  isEdu={isEdu}
                />
                <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
                  {filteredGames.length === 0 ? (
                    <div className={`
                      col-span-full text-center py-12 text-sm
                      ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}
                    `}>
                      {isEdu ? "😕 No games found. Try a different search!" : "NO RESULTS FOUND. TRY ANOTHER SEARCH."}
                    </div>
                  ) : filteredGames.map((game, i) => (
                    <GameCard
                      key={game.slug}
                      game={game}
                      onClick={() => openGame(game.slug)}
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <>
                {hotGames.length > 0 && (
                  <section className="mb-10">
                    <SectionHeader title={isEdu ? "⭐ Most Popular" : "HOT RIGHT NOW"} icon={<Flame size={14} />} isEdu={isEdu} showSeeAll />
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
                      {hotGames.map((game, i) => (
                        <GameCard key={game.slug} game={game} onClick={() => openGame(game.slug)} style={{ animationDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                  </section>
                )}

                {newGames.length > 0 && (
                  <section className="mb-10">
                    <SectionHeader title={isEdu ? "🆕 Just Added" : "NEWLY ADDED"} icon={<Sparkles size={14} />} isEdu={isEdu} showSeeAll />
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
                      {newGames.map((game, i) => (
                        <GameCard key={game.slug} game={game} onClick={() => openGame(game.slug)} style={{ animationDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                  </section>
                )}

                <section className="mb-10">
                  <SectionHeader title={isEdu ? "🎮 All Games" : "ALL GAMES"} icon={<LayoutGrid size={14} />} isEdu={isEdu} />
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
                    {GAMES.map((game, i) => (
                      <GameCard key={game.slug} game={game} onClick={() => openGame(game.slug)} style={{ animationDelay: `${i * 40}ms` }} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-20">
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
            ? ["Safety", "Privacy", "Teachers", "Suggest a Game"]
            : ["DMCA", "PRIVACY", "CONTACT", "REQUEST A GAME"]
          ).map((label) => (
            <a
              key={label}
              href="#"
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

        <Outlet />
      </>
    );
  }
