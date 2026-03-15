import {
  Zap, Puzzle, Layers, CreditCard, Grid2x2, Gauge, Crosshair, Crown, Trophy, LayoutGrid,
} from "lucide-react";
import type { GameCategory } from "../data/games";

const ICON_MAP: Record<GameCategory, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  action:   Zap,
  puzzle:   Puzzle,
  match3:   Layers,
  cards:    CreditCard,
  mahjong:  Grid2x2,
  block:    LayoutGrid,
  racing:   Gauge,
  shooter:  Crosshair,
  strategy: Crown,
  sports:   Trophy,
};

interface CategoryIconProps {
  category: GameCategory;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function CategoryIcon({ category, size = 32, className, strokeWidth = 1.5 }: CategoryIconProps) {
  const Icon = ICON_MAP[category] ?? Zap;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
