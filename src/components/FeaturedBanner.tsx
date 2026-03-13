import { useNavigate } from "@tanstack/react-router";
import { Star, Play } from "lucide-react";
import { CategoryIcon } from "./CategoryIcon";
import { useTheme } from "../hooks/useTheme";
import type { Game } from "../data/games";

interface FeaturedBannerProps {
  game: Game;
}

export function FeaturedBanner({ game }: FeaturedBannerProps) {
  const navigate = useNavigate();
  const { isEdu } = useTheme();

  const title = isEdu && game.eduTitle ? game.eduTitle : game.title;
  const description = isEdu && game.eduDescription ? game.eduDescription : game.description;

  const open = () => navigate({ to: "/games/$slug", params: { slug: game.slug } });

  return (
    <div
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && open()}
      className={`
        relative flex items-center gap-8 rounded-2xl border p-8 mb-10 cursor-pointer
        transition-all duration-300 hover:-translate-y-0.5
        ${isEdu
          ? "bg-gradient-to-br from-[#ebf8ff] to-[#f0fff4] border-edu-border hover:border-edu-accent hover:shadow-[0_8px_30px_rgba(66,153,225,0.15)]"
          : "bg-gradient-to-br from-[#1a003066] to-[#000a2066] border-synth-border shadow-[inset_0_0_40px_rgba(255,0,255,0.07)] hover:border-synth-accent hover:shadow-[inset_0_0_40px_rgba(255,0,255,0.12),0_12px_40px_rgba(255,0,255,0.12)]"
        }
      `}
    >
      {/* Thumbnail icon */}
      <div className={`
        flex-shrink-0 animate-float
        ${isEdu ? "text-8xl" : "text-white/80 drop-shadow-[0_0_18px_rgba(255,0,255,0.55)]"}
      `}>
        {isEdu
          ? game.emoji
          : <CategoryIcon category={game.category} size={80} strokeWidth={1} />
        }
      </div>

      <div className="flex-1 min-w-0">
        <span className={`
          block text-[0.58rem] tracking-[0.2em] uppercase mb-1.5 font-bold
          ${isEdu ? "text-edu-accent font-edu-body" : "text-synth-accent font-display"}
        `}>
          {isEdu ? "⭐ FEATURED GAME" : <span className="inline-flex items-center gap-1"><Star size={10} fill="currentColor" /> GAME OF THE WEEK</span>}
        </span>

        <div className={`
          font-black leading-none mb-2 text-[clamp(1.4rem,3vw,2rem)] transition-all duration-300
          ${isEdu
            ? "text-edu-accent font-edu-display"
            : "bg-gradient-to-r from-white to-[#ff99ff] text-gradient-clip drop-shadow-[0_0_8px_rgba(255,0,255,0.27)] font-display tracking-wide"
          }
        `}>
          {title}
        </div>

        <p className={`
          text-sm mb-5 leading-relaxed max-w-lg
          ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}
        `}>
          {description}
        </p>

        <button
          onClick={(e) => { e.stopPropagation(); open(); }}
          className={`
            inline-flex items-center gap-2 font-bold border-none cursor-pointer transition-all duration-200
            ${isEdu
              ? "bg-edu-accent text-white text-sm px-5 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(49,130,206,0.3)] font-edu-body hover:bg-edu-accent-hover hover:shadow-[0_6px_18px_rgba(49,130,206,0.4)] hover:scale-[1.03]"
              : "bg-gradient-to-r from-[#ff00ff] to-[#9900ff] text-white text-[0.7rem] px-5 py-2.5 rounded-lg tracking-widest uppercase font-display shadow-[0_0_20px_rgba(255,0,255,0.27)] hover:shadow-[0_0_35px_rgba(255,0,255,0.55)] hover:scale-105"
            }
          `}
        >
          {isEdu ? "▶ Play Now" : <span className="inline-flex items-center gap-2"><Play size={12} fill="currentColor" /> PLAY NOW</span>}
        </button>
      </div>
    </div>
  );
}
