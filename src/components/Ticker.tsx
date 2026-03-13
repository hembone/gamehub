import { useTheme } from "../hooks/useTheme";

const SYNTH_ITEMS = [
  "🎮 1000+ GAMES AVAILABLE",
  "🔥 SNAKE RELOADED — TRENDING NOW",
  "⚡ ZERO ADS · ZERO SIGNUPS · ZERO LIMITS",
  "🆕 JUST ADDED: PIXEL DUNGEON PRO",
  "👾 MULTIPLAYER LOBBY OPEN NOW",
];

const EDU_ITEMS = [
  "📚 Math, Science, Reading & More!",
  "🧠 Brain Teasers — Most Popular This Week",
  "✅ Teacher Approved · Safe for School · Free Forever",
  "🆕 NEW: Fraction Fun — Just Added!",
  "🌟 Join 2 Million Students Playing Today",
];

export function Ticker() {
  const { isEdu } = useTheme();
  const items = isEdu ? EDU_ITEMS : SYNTH_ITEMS;
  const doubled = [...items, ...items];

  return (
    <div className={`
      w-full overflow-hidden border-b py-1.5 relative z-10 transition-all duration-300
      ${isEdu
        ? "bg-white border-edu-border"
        : "bg-synth-surface border-synth-border shadow-[inset_0_0_12px_rgba(255,0,255,0.07)]"
      }
    `}>
      <div className="ticker-inner flex gap-12 animate-ticker whitespace-nowrap">
        {doubled.map((text, i) => (
          <span
            key={i}
            className={`
              flex items-center gap-2.5 flex-shrink-0 uppercase
              ${isEdu
                ? "text-edu-text2 font-edu-body text-xs tracking-wide"
                : "text-synth-text2 font-display text-[0.58rem] tracking-widest"
              }
            `}
          >
            <span className={`
              w-1.5 h-1.5 rounded-full flex-shrink-0
              ${isEdu ? "bg-edu-accent" : "bg-synth-accent shadow-[0_0_6px_#ff2dff]"}
            `} />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
