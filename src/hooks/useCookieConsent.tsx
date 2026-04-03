import { createContext, useContext, useEffect, useState } from "react";

export type Consent = "all" | "essential" | null;

const STORAGE_KEY = "arcade-cookie-consent";

interface ConsentContextValue {
  consent: Consent;
  acceptAll: () => void;
  rejectNonEssential: () => void;
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  acceptAll: () => {},
  rejectNonEssential: () => {},
});

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Consent;
    if (saved === "all" || saved === "essential") {
      setConsent(saved);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, "all");
    setConsent("all");
  };

  const rejectNonEssential = () => {
    localStorage.setItem(STORAGE_KEY, "essential");
    setConsent("essential");
  };

  return (
    <ConsentContext.Provider value={{ consent, acceptAll, rejectNonEssential }}>
      {children}
    </ConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(ConsentContext);
