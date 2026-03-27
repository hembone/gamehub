import { useEffect, useRef, useState } from "react";
import { LayoutGrid, Zap, Puzzle, Layers, CreditCard, Grid2x2, Gauge, Crosshair, Crown, Trophy, ChevronDown } from "lucide-react";
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

interface CategoryPillsProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryPills({ active, onChange }: CategoryPillsProps) {
  const { isEdu } = useTheme();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [, setIsStuck] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeLabel = CATEGORIES.find(c => c.id === active)?.[isEdu ? "eduLabel" : "synthLabel"] ?? "All";

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel — sits just above the sticky bar; when it leaves viewport the bar is stuck */}
      <div ref={sentinelRef} className="h-px" />

      {/* Mobile: custom dropdown (native <select> mispositions due to overflow-x:clip on page) */}
      <div className={`
        sm:hidden px-3 py-3 sticky top-[104px] z-40 transition-colors duration-300
        backdrop-blur-md
        ${isEdu ? "bg-white/90" : "bg-[#0d001599]"}
      `}>
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
                  onClick={() => { onChange(cat.id); setDropdownOpen(false); }}
                  className={`
                    w-full text-left px-4 py-2.5 text-xs font-bold transition-colors duration-150 cursor-pointer
                    ${isEdu
                      ? `font-edu-body ${active === cat.id
                          ? "bg-edu-accent text-white"
                          : "text-edu-text2 hover:bg-edu-tag-bg"
                        }`
                      : `font-display tracking-widest uppercase ${active === cat.id
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

      {/* Desktop: pills — with backdrop blur */}
      <div className={`
        hidden sm:flex justify-center flex-wrap gap-2 px-6 py-3 sticky top-[56px] z-40
        transition-[background,backdrop-filter] duration-300
        backdrop-blur-md
        ${isEdu ? "bg-white/90" : "bg-[#0d001599]"}
      `}>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
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
  );
}
