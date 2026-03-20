import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

interface AdSlotProps {
  slotId: string;
  clientId?: string;
}

const ADSENSE_LIVE = true;

export function AdSlot({ slotId, clientId = "ca-pub-3744119325664696" }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const { isEdu } = useTheme();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    if (!ADSENSE_LIVE) return;
    const timer = requestAnimationFrame(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("AdSense push failed", e);
      }
    });
    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  const placeholderClass = `
    w-full flex items-center justify-center border border-dashed rounded-lg transition-all duration-300 min-h-[90px]
    ${isEdu
      ? "bg-edu-tag-bg/40 border-edu-border"
      : "bg-[#ff00ff06] border-[#ff00ff22]"
    }
  `;

  return (
    <div className="w-full flex justify-center items-center" aria-label="Advertisement">
      {ADSENSE_LIVE ? (
        <ins
          key={`${slotId}-${pathname}`}
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className={placeholderClass}>
          <span className={`
            text-[0.55rem] tracking-[0.2em] uppercase opacity-40
            ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-display"}
          `}>
            AD
          </span>
        </div>
      )}
    </div>
  );
}
