import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "synthwave" | "edu";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  isEdu: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "synthwave",
  toggle: () => {},
  isEdu: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("synthwave");

  useEffect(() => {
    const saved = localStorage.getItem("arcade-theme") as Theme | null;
    if (saved === "synthwave" || saved === "edu") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("arcade-theme", theme);

    // Lazy-load edu fonts only when edu theme is activated
    if (theme === "edu") {
      const id = "edu-fonts";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Fredoka+One&display=swap&subset=latin";
        document.head.appendChild(link);
      }
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "synthwave" ? "edu" : "synthwave"));

  return (
    <ThemeContext.Provider value={{ theme, toggle, isEdu: theme === "edu" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
