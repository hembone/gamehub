import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

export type AdFormat = "leaderboard" | "sidebar-top" | "sidebar-mid" | "skyscraper";

interface AdSlotProps {
  format: AdFormat;
  slotId: string;
  clientId?: string;
}

const AD_DIMENSIONS: Record<AdFormat, { width: number; height: number; label: string }> = {
  leaderboard:   { width: 728, height: 90,  label: "Leaderboard (728×90)" },
  "sidebar-top": { width: 300, height: 250, label: "Medium Rectangle (300×250)" },
  "sidebar-mid": { width: 300, height: 600, label: "Half Page (300×600)" },
  "skyscraper":  { width: 160, height: 600, label: "Wide Skyscraper (160×600)" },
};

// Flip to true once you have real AdSense IDs
const ADSENSE_LIVE = false;

export function AdSlot({ format, slotId, clientId = "ca-pub-XXXXXXXXXXXXXXXX" }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const { isEdu } = useTheme();
  const dims = AD_DIMENSIONS[format];

  useEffect(() => {
    if (!ADSENSE_LIVE) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense push failed", e);
    }
  }, []);

  const wrapperClass = format === "leaderboard"
    ? `
        hidden md:flex w-full justify-center items-center py-2 px-6 border-b mb-6 z-10 relative transition-all duration-300
        ${isEdu
          ? "bg-white border-edu-border"
          : "bg-synth-surface border-synth-border shadow-[inset_0_0_16px_rgba(255,0,255,0.05)]"
        }
      `
    : "w-full flex justify-center items-center";

  const placeholderClass = `
    w-full flex flex-col items-center justify-center gap-1 border border-dashed rounded-lg transition-all duration-300
    ${isEdu
      ? "bg-edu-tag-bg/40 border-edu-border"
      : "bg-[#ff00ff06] border-[#ff00ff22]"
    }
  `;

  return (
    <div className={wrapperClass} aria-label="Advertisement">
      {ADSENSE_LIVE ? (
        <ins
          ref={adRef}
          className="adsbygoogle block"
          style={{ width: dims.width, height: dims.height }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format === "leaderboard" ? "horizontal" : "rectangle"}
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className={placeholderClass}
          style={{ width: "100%", minHeight: dims.height }}
        >
          <span className={`
            text-[0.55rem] tracking-[0.2em] uppercase opacity-40
            ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-display"}
          `}>
            AD
          </span>
          <span className={`
            text-[0.6rem] opacity-30
            ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}
          `}>
            {dims.label}
          </span>
        </div>
      )}
    </div>
  );
}
