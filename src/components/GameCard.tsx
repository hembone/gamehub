import { Play } from "lucide-react";
import { CategoryIcon } from "./CategoryIcon";
import { useTheme } from "../hooks/useTheme";
import type { Game } from "../data/games";

interface GameCardProps {
  game: Game;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const STAR_MAP: Record<number, string> = {
  1: "★☆☆☆☆",
  2: "★★☆☆☆",
  3: "★★★☆☆",
  4: "★★★★☆",
  5: "★★★★★",
};

const BADGE_STYLES = {
  new: { synth: "bg-synth-badge-new", edu: "bg-edu-badge-new", label: "NEW" },
  hot: { synth: "bg-synth-badge-hot", edu: "bg-edu-badge-hot", label: "HOT" },
  popular: { synth: "bg-synth-badge-popular", edu: "bg-edu-badge-popular", label: "TOP" },
};

export function GameCard({ game, onClick, style, className }: GameCardProps) {
  const { isEdu } = useTheme();

  const title = isEdu && game.eduTitle ? game.eduTitle : game.title;
  const category = isEdu && game.eduCategory ? game.eduCategory : game.category;

  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        group relative border cursor-pointer overflow-hidden
        opacity-0 animate-card-reveal
        transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        hover:-translate-y-1 hover:scale-[1.02]
        ${isEdu
          ? "bg-edu-card-bg rounded-2xl border-edu-border hover:border-edu-accent hover:shadow-[0_8px_24px_rgba(66,153,225,0.15)]"
          : "bg-synth-card-bg rounded-xl border-synth-border backdrop-blur-sm hover:border-synth-accent hover:shadow-[0_8px_30px_rgba(255,0,255,0.17),0_0_0_1px_rgba(255,0,255,0.27),0_0_20px_rgba(0,229,255,0.08)]"
        }
        ${className ?? ''}
      `}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden"
        style={{ background: game.thumbGradient }}
      >
        {game.thumbImage ? (
          <img
            src={game.thumbImage}
            alt={title}
            width={200}
            height={150}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : isEdu ? (
          <span className="text-5xl">{game.emoji}</span>
        ) : (
          <CategoryIcon category={game.category} size={44} className="text-white/70" strokeWidth={1.25} />
        )}


        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover/card:opacity-100 transition-opacity duration-200 bg-black/50">
          {isEdu
            ? <span className="text-4xl">▶</span>
            : (
              <div
                className="rounded-full border-2 p-3"
                style={{ animation: 'neon-cycle 2s linear infinite' }}
              >
                <Play size={28} fill="currentColor" style={{ filter: 'drop-shadow(0 0 6px currentColor)' }} />
              </div>
            )
          }
        </div>
      </div>

      {/* Info */}
      <div className={`
        px-3 pt-2 pb-3 border-t transition-colors duration-300
        ${isEdu ? "border-edu-border" : "border-synth-border"}
      `}>
        <div className={`
          text-xs font-bold mb-1 truncate transition-colors duration-300
          ${isEdu
            ? "text-edu-text font-edu-body font-extrabold tracking-normal text-sm"
            : "text-synth-text font-display tracking-wide"
          }
        `}>
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span className={`
            text-[0.6rem] transition-colors duration-300
            ${isEdu ? "text-edu-text2 font-edu-body text-[0.7rem]" : "text-synth-text2 font-body"}
          `}>
            {category}
          </span>
          <span className="text-[0.6rem] text-yellow-400 tracking-[-0.05em]">
            {STAR_MAP[game.stars] ?? "★★★☆☆"}
          </span>
        </div>
      </div>
    </div>
  );
}
