import { LayoutGrid, Zap, Puzzle, Gauge, Trophy, Globe, Crosshair, Crown } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { CATEGORIES } from "../data/games";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  all:      LayoutGrid,
  action:   Zap,
  puzzle:   Puzzle,
  racing:   Gauge,
  sports:   Trophy,
  io:       Globe,
  shooter:  Crosshair,
  strategy: Crown,
};

interface CategoryPillsProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryPills({ active, onChange }: CategoryPillsProps) {
  const { isEdu } = useTheme();

  return (
    <div className="flex justify-center flex-wrap gap-2 px-6 pb-8 relative z-10">
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
  );
}
