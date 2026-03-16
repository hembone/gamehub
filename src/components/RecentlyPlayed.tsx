import { Clock } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { GameCard } from './GameCard'
import { SectionHeader } from './SectionHeader'
import type { Game } from '../data/gameTypes'

interface Props {
  games: Game[]
  onOpen: (slug: string) => void
}

export function RecentlyPlayed({ games, onOpen }: Props) {
  const { isEdu } = useTheme()

  if (games.length === 0) return null

  return (
    <div className="mb-4 pt-3">
      <SectionHeader
        title={isEdu ? 'Recently Played' : 'RECENTLY PLAYED'}
        icon={<Clock size={14} />}
        isEdu={isEdu}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4 pt-2">
        {games.slice(0, 12).map((game, i) => (
          <GameCard
            key={game.slug}
            game={game}
            onClick={() => onOpen(game.slug)}
            style={{ animationDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
