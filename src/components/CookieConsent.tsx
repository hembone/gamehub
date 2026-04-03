import { Link } from "@tanstack/react-router";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { useTheme } from "../hooks/useTheme";

export function CookieConsent() {
  const { consent, acceptAll, rejectNonEssential } = useCookieConsent();
  const { isEdu } = useTheme();

  if (consent !== null) return null;

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-[300] px-6 py-4 border-t backdrop-blur-md
      transition-colors duration-300
      ${isEdu
        ? "bg-white/95 border-edu-border shadow-[0_-2px_12px_rgba(66,153,225,0.1)]"
        : "bg-[#0d0015ee] border-synth-border shadow-[0_-2px_24px_rgba(255,0,255,0.15)]"
      }
    `}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className={`
          text-sm flex-1
          ${isEdu ? "text-edu-text font-edu-body" : "text-synth-text2 font-body"}
        `}>
          We use cookies for analytics and personalized ads.
          See our{" "}
          <Link
            to="/privacy"
            className={`underline ${isEdu ? "text-edu-accent" : "text-synth-accent"}`}
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>

        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={rejectNonEssential}
            className={`
              px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer
              ${isEdu
                ? "font-edu-body border-edu-border text-edu-text2 hover:border-edu-accent hover:text-edu-accent"
                : "font-display tracking-widest uppercase border-synth-border text-synth-text2 hover:border-synth-accent hover:text-synth-accent"
              }
            `}
          >
            {isEdu ? "Essential Only" : "ESSENTIAL ONLY"}
          </button>
          <button
            onClick={acceptAll}
            className={`
              px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer
              ${isEdu
                ? "font-edu-body bg-edu-accent text-white border-edu-accent hover:shadow-[0_4px_12px_rgba(49,130,206,0.3)]"
                : "font-display tracking-widest uppercase bg-synth-accent text-white border-synth-accent hover:shadow-[0_0_14px_#ff2dff]"
              }
            `}
          >
            {isEdu ? "Accept All" : "ACCEPT ALL"}
          </button>
        </div>
      </div>
    </div>
  );
}
