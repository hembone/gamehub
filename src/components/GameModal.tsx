import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { X, Maximize2 } from "lucide-react";
import { CategoryIcon } from "./CategoryIcon";
import { useTheme } from "../hooks/useTheme";
import type { Game } from "../data/games";

interface GameModalProps {
  game: Game;
}

export function GameModal({ game }: GameModalProps) {
  const navigate = useNavigate();
  const { isEdu } = useTheme();

  const title = isEdu && game.eduTitle ? game.eduTitle : game.title;
  const description = isEdu && game.eduDescription ? game.eduDescription : game.description;
  const category = isEdu && game.eduCategory ? game.eduCategory : game.category;

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
    <div
      className={`
        fixed inset-0 z-[500] flex items-center justify-center p-6 animate-fade-in
        ${isEdu ? "bg-edu-text/50 backdrop-blur-md" : "bg-[#0d001566] backdrop-blur-md"}
      `}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border animate-slide-up
          ${isEdu
            ? "bg-edu-surface border-edu-border shadow-[0_20px_60px_rgba(66,153,225,0.2),0_40px_80px_rgba(26,32,44,0.13)]"
            : "bg-synth-surface border-synth-border shadow-[0_0_60px_rgba(255,0,255,0.2),0_40px_80px_rgba(0,0,0,0.55)]"
          }
        `}
      >
        {/* Modal Header */}
        <div className={`
          flex items-center gap-4 px-6 py-4 flex-shrink-0 border-b
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
            className="w-full h-full min-h-[480px] block border-none"
            src={game.iframeUrl}
            title={title}
            allow="fullscreen; gamepad"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          />
        </div>

        {/* Modal Footer */}
        <div className={`
          flex items-center justify-between gap-4 px-6 py-3 flex-shrink-0 border-t
          ${isEdu ? "border-edu-border" : "border-synth-border"}
        `}>
          <p className={`
            flex-1 text-sm leading-snug
            ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}
          `}>
            {description}
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={game.iframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold border rounded-lg cursor-pointer transition-all duration-200
                ${isEdu
                  ? "bg-edu-surface2 border-edu-border text-edu-text2 font-edu-body rounded-xl hover:border-edu-accent hover:text-edu-accent"
                  : "bg-synth-surface2 border-synth-border text-synth-text2 font-display tracking-widest hover:border-synth-accent hover:text-synth-accent"
                }
              `}
            >
              {isEdu ? "⛶ FULLSCREEN" : <span className="inline-flex items-center gap-1.5"><Maximize2 size={12} /> FULLSCREEN</span>}
            </a>
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
      </div>
    </div>
  );
}
