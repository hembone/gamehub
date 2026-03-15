import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { X, Maximize2 } from "lucide-react";
import { CategoryIcon } from "./CategoryIcon";
import { AdSlot } from "./AdSlot";
import { useTheme } from "../hooks/useTheme";
import { GAMES } from "../data/games";
import type { Game } from "../data/games";

interface GameModalProps {
  game: Game;
}

export function GameModal({ game }: GameModalProps) {
  const navigate = useNavigate();
  const { isEdu } = useTheme();

  const related = GAMES
    .filter((g) => g.category === game.category && g.slug !== game.slug)
    .slice(0, 8);

  const title = isEdu && game.eduTitle ? game.eduTitle : game.title;
  const description = isEdu && game.eduDescription ? game.eduDescription : game.description;
  const category = isEdu && game.eduCategory ? game.eduCategory : game.category;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [expanded, setExpanded] = useState(() => window.innerWidth < 640);
  const close = () => navigate({ to: "/" });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[500] animate-fade-in">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${isEdu ? "bg-edu-text/50 backdrop-blur-md" : "bg-[#0d001566] backdrop-blur-md"}`}
        onClick={close}
      />

      {/* Left ad panel */}
      <div className={`
        hidden xl:flex items-center justify-center
        ${expanded
          ? "fixed left-0 top-0 h-full w-[160px] z-[650]"
          : "absolute left-0 top-0 h-full w-[160px] z-[510]"
        }
        ${isEdu ? "bg-edu-bg/80" : "bg-synth-bg/80"}
      `}>
        <AdSlot format="skyscraper" slotId="4444444444" />
      </div>

      {/* Right ad panel */}
      <div className={`
        hidden xl:flex items-center justify-center
        ${expanded
          ? "fixed right-0 top-0 h-full w-[160px] z-[650]"
          : "absolute right-0 top-0 h-full w-[160px] z-[510]"
        }
        ${isEdu ? "bg-edu-bg/80" : "bg-synth-bg/80"}
      `}>
        <AdSlot format="skyscraper" slotId="5555555555" />
      </div>

      {/* Modal dialog */}
      <div className={`
        ${expanded
          ? "fixed inset-0 xl:left-[160px] xl:right-[160px] z-[600] flex items-center justify-center"
          : "absolute inset-0 flex items-center justify-center p-6 pointer-events-none"
        }
      `}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          flex flex-col overflow-hidden border animate-slide-up transition-all duration-300 pointer-events-auto
          ${expanded ? "w-full h-full rounded-none" : "w-full max-w-4xl max-h-[90vh] rounded-2xl"}
          ${isEdu
            ? "bg-edu-surface border-edu-border shadow-[0_20px_60px_rgba(66,153,225,0.2),0_40px_80px_rgba(26,32,44,0.13)]"
            : "bg-synth-surface border-synth-border shadow-[0_0_60px_rgba(255,0,255,0.2),0_40px_80px_rgba(0,0,0,0.55)]"
          }
        `}
      >
        {/* Modal Header */}
        <div className={`
          flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-4 flex-shrink-0 border-b
          ${isEdu ? "border-edu-border" : "border-synth-border"}
        `}>
          {isEdu
            ? <span className="text-4xl">{game.emoji}</span>
            : <CategoryIcon category={game.category} size={32} className="text-synth-text2 flex-shrink-0" strokeWidth={1.5} />
          }
          <div className="flex-1 min-w-0">
            <div className={`
              font-black text-lg tracking-wide leading-tight truncate
              ${isEdu
                ? "text-edu-text font-edu-display tracking-normal"
                : "text-synth-text font-display"
              }
            `}>
              {title}
            </div>
            <div className={`
              text-xs mt-0.5
              ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}
            `}>
              {category} · {game.stars}★
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className={`
              w-9 h-9 flex items-center justify-center rounded-lg border text-lg cursor-pointer transition-all duration-200
              ${isEdu
                ? "bg-edu-surface2 border-edu-border text-edu-text2 hover:border-edu-accent hover:text-edu-accent"
                : "bg-synth-surface2 border-synth-border text-synth-text2 hover:border-synth-accent hover:text-synth-accent"
              }
            `}
          >
            {isEdu ? "✕" : <X size={16} />}
          </button>
        </div>

        {/* Iframe */}
        <div className={`
          flex-1 relative min-h-0
          ${isEdu ? "bg-edu-bg" : "bg-black"}
        `}>
          <iframe
            ref={iframeRef}
            className="w-full h-full min-h-[300px] sm:min-h-[480px] block border-none"
            src={game.iframeUrl}
            title={title}
            allow="fullscreen; gamepad"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          />
        </div>

        {/* Modal Footer */}
        <div className={`
          hidden sm:flex items-start justify-between gap-4 px-6 py-3 flex-shrink-0 border-t
          ${isEdu ? "border-edu-border" : "border-synth-border"}
        `}>
          <p className={`
            hidden sm:block flex-1 text-sm leading-snug overflow-y-auto max-h-16 pr-1
            ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}
          `}>
            {description}
          </p>
          <div className="hidden sm:flex gap-2 flex-shrink-0">
            <button
              onClick={() => setExpanded(v => !v)}
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold border rounded-lg cursor-pointer transition-all duration-200
                ${isEdu
                  ? "bg-edu-surface2 border-edu-border text-edu-text2 font-edu-body rounded-xl hover:border-edu-accent hover:text-edu-accent"
                  : "bg-synth-surface2 border-synth-border text-synth-text2 font-display tracking-widest hover:border-synth-accent hover:text-synth-accent"
                }
              `}
            >
              {isEdu ? "⛶ FULLSCREEN" : <span className="inline-flex items-center gap-1.5"><Maximize2 size={12} /> FULLSCREEN</span>}
            </button>
            <button
              onClick={close}
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold border rounded-lg cursor-pointer transition-all duration-200
                ${isEdu
                  ? "bg-edu-surface2 border-edu-border text-edu-text2 font-edu-body rounded-xl hover:border-edu-accent hover:text-edu-accent"
                  : "bg-synth-surface2 border-synth-border text-synth-text2 font-display tracking-widest hover:border-synth-accent hover:text-synth-accent"
                }
              `}
            >
              {isEdu ? "✕ Close" : <span className="inline-flex items-center gap-1.5"><X size={12} /> CLOSE</span>}
            </button>
          </div>
        </div>

        {/* Related games */}
        {related.length > 0 && (
          <div className={`flex-shrink-0 border-t px-4 py-3 ${isEdu ? "border-edu-border" : "border-synth-border"}`}>
            <p className={`text-[0.6rem] font-bold tracking-widest uppercase mb-2 ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-display"}`}>
              {isEdu ? "More Like This" : "MORE LIKE THIS"}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {related.map((g) => (
                <button
                  key={g.slug}
                  onClick={() => navigate({ to: "/games/$slug", params: { slug: g.slug } })}
                  className={`
                    flex-shrink-0 w-[90px] text-left cursor-pointer rounded-lg overflow-hidden border transition-all duration-150
                    hover:-translate-y-0.5 hover:scale-[1.03]
                    ${isEdu ? "border-edu-border hover:border-edu-accent bg-edu-card-bg" : "border-synth-border hover:border-synth-accent bg-synth-card-bg"}
                  `}
                >
                  <div className="w-full aspect-[4/3] overflow-hidden" style={{ background: g.thumbGradient }}>
                    {g.thumbImage ? (
                      <img src={g.thumbImage} alt={g.title} width={90} height={68} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CategoryIcon category={g.category} size={20} className="text-white/60" strokeWidth={1.25} />
                      </div>
                    )}
                  </div>
                  <p className={`px-1.5 py-1 text-[0.55rem] font-bold truncate ${isEdu ? "text-edu-text font-edu-body" : "text-synth-text font-display"}`}>
                    {g.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
