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
      className="relative rounded-2xl overflow-hidden cursor-pointer group h-[220px] sm:h-[300px] mb-10"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {game.thumbImage ? (
          <img
            src={game.thumbImage}
            alt={title}
            width={800}
            height={300}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: game.thumbGradient }}
          >
            <CategoryIcon category={game.category} size={80} strokeWidth={0.75} className="opacity-30" />
          </div>
        )}
      </div>

      {/* Gradient overlay — mobile: bottom-up, desktop: right-side fade */}
      <div className={`
        absolute inset-0
        ${isEdu
          ? "bg-gradient-to-t from-[#1a365d] from-[10%] via-[#1a365d]/75 via-[55%] to-[#1a365d]/20 sm:bg-gradient-to-r sm:from-transparent sm:from-[0%] sm:via-[#1a365d]/60 sm:via-[40%] sm:to-[#1a365d]"
          : "bg-gradient-to-t from-[#0d0015] from-[10%] via-[#0d0015]/75 via-[55%] to-[#0d0015]/20 sm:bg-gradient-to-r sm:from-transparent sm:from-[0%] sm:via-[#0d0015]/60 sm:via-[40%] sm:to-[#0d0015]"
        }
      `} />

      {/* Content */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-start sm:justify-end">
        <div className="px-5 py-4 sm:px-10 sm:py-8 w-full sm:max-w-[55%] flex flex-col gap-2 sm:gap-3">

          {/* Badge */}
          <span className={`
            inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase font-bold w-fit
            px-3 py-1 rounded-full
            ${isEdu
              ? "bg-edu-accent/20 text-white border border-edu-accent/40 font-edu-body"
              : "bg-synth-accent/20 text-synth-accent border border-synth-accent/50 font-display drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]"
            }
          `}>
            {isEdu
              ? "⭐ Featured Game"
              : <><Star size={10} fill="currentColor" /> FEATURED GAME</>
            }
          </span>

          {/* Title */}
          <h2 className={`
            font-black leading-none text-[clamp(1.3rem,3.5vw,2.2rem)] line-clamp-2
            ${isEdu
              ? "text-white font-edu-display"
              : "bg-gradient-to-r from-white to-[#ff99ff] text-gradient-clip drop-shadow-[0_0_12px_rgba(255,0,255,0.3)] font-display tracking-wide"
            }
          `}>
            {title}
          </h2>

          {/* Description — hidden on mobile */}
          <p className={`
            hidden sm:block text-sm leading-relaxed line-clamp-2 opacity-80
            ${isEdu ? "text-white font-edu-body" : "text-synth-text font-body"}
          `}>
            {description}
          </p>

          {/* Play button */}
          <button
            onClick={(e) => { e.stopPropagation(); open(); }}
            className={`
              inline-flex items-center gap-2 font-bold border-none cursor-pointer
              transition-all duration-200 w-fit mt-1
              ${isEdu
                ? "bg-edu-accent text-white text-sm px-5 py-2 rounded-xl shadow-[0_4px_12px_rgba(49,130,206,0.35)] font-edu-body hover:scale-[1.04] hover:shadow-[0_6px_20px_rgba(49,130,206,0.5)]"
                : "bg-gradient-to-r from-[#ff00ff] to-[#9900ff] text-white text-[0.7rem] px-5 py-2 rounded-lg tracking-widest uppercase font-display shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_35px_rgba(255,0,255,0.6)] hover:scale-105"
              }
            `}
          >
            {isEdu
              ? "▶ Play Now"
              : <span className="inline-flex items-center gap-1.5"><Play size={11} fill="currentColor" /> PLAY NOW</span>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
