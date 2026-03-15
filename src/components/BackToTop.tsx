import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function BackToTop() {
  const { isEdu } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center
        border rounded-full cursor-pointer transition-all duration-300
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
        ${isEdu
          ? "bg-edu-surface border-edu-border text-edu-text2 shadow-md hover:border-edu-accent hover:text-edu-accent"
          : "bg-synth-surface border-synth-border text-synth-text2 shadow-[0_0_16px_rgba(255,0,255,0.15)] hover:border-synth-accent hover:text-synth-accent hover:shadow-[0_0_24px_rgba(255,0,255,0.35)]"
        }
      `}
    >
      <ArrowUp size={16} strokeWidth={2} />
    </button>
  );
}
