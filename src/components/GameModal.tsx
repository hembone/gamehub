import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { CategoryIcon } from "./CategoryIcon";
import { useTheme } from "../hooks/useTheme";
import type { Game } from "../data/games";

interface GameModalProps {
  game: Game;
  related: Game[];
}

export function GameModal({ game, related }: GameModalProps) {
  const navigate = useNavigate();
  const { isEdu } = useTheme();

  const title = isEdu && game.eduTitle ? game.eduTitle : game.title;
  const description = isEdu && game.eduDescription ? game.eduDescription : game.description;
  const category = isEdu && game.eduCategory ? game.eduCategory : game.category;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [expanded, setExpanded] = useState(() => window.innerWidth < 640);
  const [fullscreen, setFullscreen] = useState(false);
  const close = () => navigate({ to: "/" });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullscreen) setFullscreen(false);
        else close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[500] bg-black">
        <iframe
          ref={iframeRef}
          className="w-full h-full block border-none"
          src={game.iframeUrl}
          title={title}
          allow="fullscreen; gamepad"
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
        />
        <button
          onClick={() => setFullscreen(false)}
          aria-label="Exit fullscreen"
          className="fixed top-4 right-4 z-[520] w-10 h-10 flex items-center justify-center rounded-lg bg-black/70 border border-white/20 text-white hover:bg-black/90 hover:border-white/40 cursor-pointer transition-all duration-200"
        >
          <Minimize2 size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[500] h-screen w-screen animate-fade-in">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${isEdu ? "bg-edu-bg" : "bg-synth-bg"}`}
        onClick={close}
      />

      <div className={`
        relative z-[510] h-screen
        grid grid-cols-1
      `}>
        <div className={`
          flex items-center justify-center h-screen min-h-0 overflow-hidden
          ${expanded ? "" : "p-6"}
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
              {category}
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
              onClick={() => setFullscreen(true)}
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
            <p className={`text-[0.6rem] font-bold tracking-widest uppercase mb-1 ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-display"}`}>
              {isEdu ? "More Like This" : "MORE LIKE THIS"}
            </p>
            <div className="overflow-x-auto py-4 -my-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-3">
              {related.map((g) => (
                <a
                  key={g.slug}
                  href={`/games/${g.slug}`}
                  onClick={(e) => { e.preventDefault(); navigate({ to: "/games/$slug", params: { slug: g.slug } }); }}
                  className={`
                    flex-shrink-0 w-[90px] text-left cursor-pointer rounded-lg overflow-hidden border transition-all duration-150 no-underline
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
                </a>
              ))}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  );
}
