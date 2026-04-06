import { Link } from "@tanstack/react-router";
import { useTheme } from "../hooks/useTheme";

export function Footer() {
  const { isEdu } = useTheme();

  const linkClass = `no-underline transition-colors duration-200 hover:opacity-100 ${isEdu ? "text-edu-text2 hover:text-edu-accent" : "text-synth-text2 hover:text-synth-accent"}`;

  return (
    <footer className={`
      sm:sticky bottom-0 z-10 border-t px-6 py-2 flex items-center justify-between flex-wrap gap-4
      text-xs opacity-60 transition-all duration-300
      ${isEdu
        ? "border-edu-border text-edu-text2 font-edu-body text-sm bg-edu-bg"
        : "border-synth-border text-synth-text2 font-body bg-synth-bg"
      }
    `}>
      <span>
        {isEdu ? `\u00A9 ${new Date().getFullYear()} FunLearn Zone \u2014 Safe & Educational` : `\u00A9 ${new Date().getFullYear()} ARCADE VOID \u2014 ALL RIGHTS RESERVED`}
      </span>
      <div className="flex gap-5 flex-wrap">
        <Link to="/privacy" className={linkClass}>
          {isEdu ? "Privacy Policy" : "PRIVACY"}
        </Link>
        <Link to="/terms" className={linkClass}>
          {isEdu ? "Terms of Service" : "TERMS"}
        </Link>
      </div>
    </footer>
  );
}
