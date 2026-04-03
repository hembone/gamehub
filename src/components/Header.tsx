import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, EyeOff, LayoutGrid, Zap, Puzzle, Layers, CreditCard, Grid2x2, Gauge, Crosshair, Crown, Trophy, ChevronDown } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { CATEGORIES } from "../data/games";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  all:      LayoutGrid,
  action:   Zap,
  puzzle:   Puzzle,
  match3:   Layers,
  cards:    CreditCard,
  mahjong:  Grid2x2,
  block:    LayoutGrid,
  racing:   Gauge,
  shooter:  Crosshair,
  strategy: Crown,
  sports:   Trophy,
};

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory?: string;
  onCategoryChange?: (id: string) => void;
}

export function Header({ search, onSearchChange, activeCategory, onCategoryChange }: HeaderProps) {
  const { toggle, isEdu } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const showPills = activeCategory !== undefined && onCategoryChange !== undefined;
  const activeLabel = CATEGORIES.find(c => c.id === activeCategory)?.[isEdu ? "eduLabel" : "synthLabel"] ?? "All";

  const searchInput = (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none flex">
        {isEdu ? "🔍" : <Search size={14} />}
      </span>
      <input
        type="text"
        placeholder={isEdu ? "Find a learning game..." : "Search games..."}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`
          w-full rounded-full pl-9 pr-4 py-2 text-sm outline-none transition-all duration-200
          ${isEdu
            ? "bg-white border-2 border-edu-border text-edu-text placeholder-edu-text2/50 font-edu-body focus:border-edu-accent focus:ring-2 focus:ring-edu-border"
            : "bg-transparent border-2 border-synth-text2/40 text-synth-text placeholder-synth-text2/50 font-body focus:border-synth-accent focus:ring-2 focus:ring-synth-border"
          }
        `}
      />
    </div>
  );

  return (
    <header className={`
      sticky top-0 z-[200] px-6 backdrop-blur-md border-b transition-all duration-300
      ${isEdu
        ? "bg-white/90 border-edu-border shadow-[0_2px_12px_rgba(66,153,225,0.1)]"
        : "bg-[#0d001599] border-synth-border shadow-[0_0_30px_rgba(255,0,255,0.1)]"
      }
    `}>
      {/* Row 1: logo + desktop search (centered) + toggle */}
      <div className="h-14 flex items-center gap-4 relative">
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
            {isEdu ? "Learning Games for Students" : "UNLIMITED · FREE · ALWAYS ONLINE"}
          </span>
        </Link>

        {/* Desktop search — absolutely centered */}
        <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
          {searchInput}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          title="Switch theme"
          className={`
            ml-auto flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border text-xs
            flex-shrink-0 select-none transition-all duration-200 cursor-pointer
            ${isEdu
              ? "bg-edu-surface2 border-edu-border text-edu-text2 font-edu-body hover:border-edu-accent hover:text-edu-accent"
              : "bg-synth-surface2 border-synth-border text-synth-text2 font-body hover:border-synth-accent hover:text-synth-accent"
            }
          `}
        >
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
          {isEdu
            ? <span className="hidden sm:inline">🌈 ARCADE MODE</span>
            : <span className="hidden sm:inline-flex items-center gap-1.5"><EyeOff size={12} /> INCOGNITO</span>
          }
        </button>
      </div>

      {/* Row 2: mobile search */}
      <div className="sm:hidden pb-3">
        {searchInput}
      </div>

      {/* Row 3: Category pills */}
      {showPills && (
        <>
          {/* Mobile: dropdown */}
          <div className="sm:hidden pt-4 pb-5">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className={`
                  w-full flex items-center justify-between px-4 py-2 border text-sm font-bold cursor-pointer
                  transition-all duration-200 outline-none rounded-full
                  ${isEdu
                    ? "font-edu-body bg-white text-edu-text border-edu-border focus:border-edu-accent focus:ring-2 focus:ring-edu-border"
                    : "font-display tracking-widest uppercase bg-transparent text-synth-text border-synth-border focus:border-synth-accent focus:ring-2 focus:ring-synth-border"
                  }
                `}
              >
                <span>{activeLabel}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className={`
                  absolute top-full left-0 right-0 mt-1 border rounded-2xl overflow-hidden z-50 shadow-lg
                  ${isEdu
                    ? "bg-edu-bg border-edu-border"
                    : "bg-synth-surface2 border-synth-border shadow-[0_4px_24px_rgba(255,0,255,0.15)]"
                  }
                `}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { onCategoryChange(cat.id); setDropdownOpen(false); }}
                      className={`
                        w-full text-left px-4 py-2.5 text-xs font-bold transition-colors duration-150 cursor-pointer
                        ${isEdu
                          ? `font-edu-body ${activeCategory === cat.id
                              ? "bg-edu-accent text-white"
                              : "text-edu-text2 hover:bg-edu-tag-bg"
                            }`
                          : `font-display tracking-widest uppercase ${activeCategory === cat.id
                              ? "bg-synth-accent text-white"
                              : "text-synth-text2 hover:bg-synth-surface2"
                            }`
                        }
                      `}
                    >
                      {isEdu ? cat.eduLabel : cat.synthLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop: pills */}
          <div className="hidden sm:flex justify-center flex-wrap gap-2 pt-4 pb-5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`
                    px-4 py-1.5 border text-xs font-bold transition-all duration-200 cursor-pointer
                    ${isEdu
                      ? `rounded-xl font-edu-body tracking-wide ${
                          isActive
                            ? "bg-edu-accent text-white border-edu-accent shadow-[0_4px_12px_rgba(49,130,206,0.3)]"
                            : "bg-edu-tag-bg text-edu-tag-color border-edu-border hover:bg-edu-accent hover:text-white hover:border-edu-accent"
                        }`
                      : `rounded-full font-display tracking-widest uppercase ${
                          isActive
                            ? "bg-synth-accent text-white border-synth-accent shadow-[0_0_14px_#ff2dff]"
                            : "bg-synth-tag-bg text-synth-tag-color border-synth-border hover:bg-synth-accent hover:text-white hover:border-synth-accent hover:shadow-[0_0_14px_#ff2dff]"
                        }`
                    }
                  `}
                >
                  {isEdu ? cat.eduLabel : (
                    <span className="inline-flex items-center gap-1.5">
                      {(() => { const Icon = CATEGORY_ICONS[cat.id]; return Icon ? <Icon size={12} strokeWidth={2} /> : null; })()}
                      {cat.synthLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </header>
  );
}
