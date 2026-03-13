import { Link } from "@tanstack/react-router";
import { useTheme } from "../hooks/useTheme";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function Header({ search, onSearchChange }: HeaderProps) {
  const { toggle, isEdu } = useTheme();

  return (
    <header className={`
      sticky top-0 z-[200] h-16 flex items-center gap-4 px-6
      backdrop-blur-md border-b transition-all duration-300
      ${isEdu
        ? "bg-white/90 border-edu-border shadow-[0_2px_12px_rgba(66,153,225,0.1)]"
        : "bg-[#0d001599] border-synth-border shadow-[0_0_30px_rgba(255,0,255,0.1)]"
      }
    `}>
      {/* Logo */}
      <Link to="/" className="flex flex-col flex-shrink-0 no-underline">
        <span className={`
          font-display font-black text-2xl leading-none tracking-wide transition-all duration-300
          ${isEdu
            ? "text-edu-accent font-edu-display"
            : "bg-gradient-to-r from-[#ff2dff] via-[#00e5ff] to-[#ff2dff] bg-size-200 text-gradient-clip animate-shimmer drop-shadow-[0_0_10px_rgba(255,0,255,0.4)]"
          }
        `}>
          {isEdu ? "FunLearn Zone 🎓" : "ARCADE VOID"}
        </span>
        <span className={`
          text-[0.55rem] tracking-widest uppercase mt-0.5 transition-colors duration-300
          ${isEdu ? "text-edu-text2 font-edu-body tracking-wider" : "text-synth-text2 font-body"}
        `}>
          {isEdu ? "Learning Games for Students" : "UNBLOCKED · FREE · ALWAYS ONLINE"}
        </span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40 pointer-events-none">🔍</span>
        <input
          type="text"
          placeholder={isEdu ? "Find a learning game..." : "Search games..."}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`
            w-full rounded-full pl-9 pr-4 py-2 text-sm outline-none transition-all duration-200
            ${isEdu
              ? "bg-edu-bg border border-edu-border text-edu-text placeholder-edu-text2/50 font-edu-body focus:border-edu-accent focus:ring-2 focus:ring-edu-border"
              : "bg-synth-surface2 border border-synth-border text-synth-text placeholder-synth-text2/50 font-body focus:border-synth-accent focus:ring-2 focus:ring-synth-border"
            }
          `}
        />
      </div>

      {/* Nav */}
      <nav className="hidden md:flex gap-0.5 ml-auto">
        {(isEdu
          ? ["New", "Popular", "All Games", "Random"]
          : ["NEW", "HOT", "ALL", "RANDOM"]
        ).map((label) => (
          <button
            key={label}
            className={`
              px-3 py-1.5 rounded-md border border-transparent text-xs font-bold tracking-widest transition-all duration-200
              ${isEdu
                ? "text-edu-text2 font-edu-body tracking-wide hover:text-edu-accent hover:border-edu-border hover:bg-edu-tag-bg"
                : "text-synth-text2 font-display hover:text-synth-accent hover:border-synth-border hover:bg-synth-tag-bg"
              }
            `}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggle}
        title="Switch theme"
        className={`
          flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border text-xs
          flex-shrink-0 select-none transition-all duration-200 cursor-pointer
          ${isEdu
            ? "bg-edu-surface2 border-edu-border text-edu-text2 font-edu-body hover:border-edu-accent hover:text-edu-accent"
            : "bg-synth-surface2 border-synth-border text-synth-text2 font-body hover:border-synth-accent hover:text-synth-accent"
          }
        `}
      >
        {/* Track */}
        <div className={`
          relative w-9 h-5 rounded-full flex-shrink-0 border transition-all duration-300
          ${isEdu ? "bg-[#bee3f8] border-[#90cdf4]" : "bg-[#ff00ff2a] border-[#ff00ff55]"}
        `}>
          <div className={`
            absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isEdu
              ? "left-[18px] bg-edu-accent"
              : "left-0.5 bg-synth-accent shadow-[0_0_6px_#ff2dff]"
            }
          `} />
        </div>
        <span>{isEdu ? "🌈 ARCADE MODE" : "🕵️ INCOGNITO"}</span>
      </button>
    </header>
  );
}
