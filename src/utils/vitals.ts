import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

type MetricRating = "good" | "needs-improvement" | "poor";

const THRESHOLDS: Record<string, [number, number]> = {
  LCP:  [2500, 4000],
  CLS:  [0.1,  0.25],
  INP:  [200,  500],
  FCP:  [1800, 3000],
  TTFB: [800,  1800],
};

function rating(name: string, value: number): MetricRating {
  const [good, poor] = THRESHOLDS[name] ?? [0, 0];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

const ICONS: Record<MetricRating, string> = {
  "good": "✅",
  "needs-improvement": "⚠️",
  "poor": "❌",
};

function report({ name, value }: { name: string; value: number }) {
  const r = rating(name, value);
  const unit = name === "CLS" ? "" : "ms";
  console.log(
    `%c${ICONS[r]} ${name} %c${value.toFixed(name === "CLS" ? 3 : 0)}${unit} %c[${r}]`,
    "font-weight:bold",
    "color:#aaa",
    `color:${r === "good" ? "#4ade80" : r === "needs-improvement" ? "#fb923c" : "#f87171"}`,
  );

  // Hook your analytics here, e.g.:
  // gtag("event", name, { value: Math.round(name === "CLS" ? value * 1000 : value), event_category: "Web Vitals", event_label: id, non_interaction: true });
}

export function reportWebVitals() {
  onLCP(report);
  onCLS(report);
  onINP(report);
  onFCP(report);
  onTTFB(report);
}
