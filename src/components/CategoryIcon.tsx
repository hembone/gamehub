import {
  Zap, Puzzle, Gauge, Trophy, Globe, Crosshair, Crown, Gamepad2, Music, Sword, Swords,
} from "lucide-react";
import type { GameCategory } from "../data/games";

const ICON_MAP: Record<GameCategory, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  action:   Zap,
  puzzle:   Puzzle,
  racing:   Gauge,
  sports:   Trophy,
  io:       Globe,
  shooter:  Crosshair,
  strategy: Crown,
  classic:  Gamepad2,
  music:    Music,
  rpg:      Swords,
};

interface CategoryIconProps {
  category: GameCategory;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function CategoryIcon({ category, size = 32, className, strokeWidth = 1.5 }: CategoryIconProps) {
  const Icon = ICON_MAP[category] ?? Gamepad2;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
