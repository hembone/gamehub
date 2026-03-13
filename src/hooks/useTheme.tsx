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
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "synthwave" ? "edu" : "synthwave"));

  return (
    <ThemeContext.Provider value={{ theme, toggle, isEdu: theme === "edu" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
