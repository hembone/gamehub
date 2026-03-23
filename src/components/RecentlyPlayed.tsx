import { Clock, Star } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { GameCard } from './GameCard'
import { SectionHeader } from './SectionHeader'
import type { Game } from '../data/gameTypes'

interface Props {
  games: Game[]
  onOpen: (slug: string) => void
  favoriteslugs: string[]
  onToggleFavorite: (slug: string) => void
}

export function RecentlyPlayed({ games, onOpen, favoriteslugs, onToggleFavorite }: Props) {
  const { isEdu } = useTheme()

  if (games.length === 0) return null

  const favSet = new Set(favoriteslugs)
  const sorted = [
    ...games.filter(g => favSet.has(g.slug)),
    ...games.filter(g => !favSet.has(g.slug)),
  ].slice(0, 12)

  return (
    <div className="mb-4 pt-3">
      <SectionHeader
        title={isEdu ? 'Recently Played' : 'RECENTLY PLAYED'}
        icon={<Clock size={14} />}
        isEdu={isEdu}
      />

      <div className="relative">
      <div className="overflow-x-auto py-3 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="flex gap-4">
        {sorted.map((game, i) => {
          const isFav = favSet.has(game.slug)
          return (
            <div key={game.slug} className="relative group/card flex-shrink-0 w-[170px]">
              <GameCard
                game={game}
                onClick={() => onOpen(game.slug)}
                style={{ animationDelay: `${i * 30}ms` }}
                className={isEdu
                  ? 'group-hover/card:-translate-y-1 group-hover/card:scale-[1.02] group-hover/card:border-edu-accent group-hover/card:shadow-[0_8px_24px_rgba(66,153,225,0.15)]'
                  : 'group-hover/card:-translate-y-1 group-hover/card:scale-[1.02] group-hover/card:border-synth-accent group-hover/card:shadow-[0_8px_30px_rgba(255,0,255,0.17),0_0_0_1px_rgba(255,0,255,0.27),0_0_20px_rgba(0,229,255,0.08)]'
                }
              />
              {/* Star button */}
              <button
                onClick={e => { e.stopPropagation(); onToggleFavorite(game.slug) }}
                aria-label={isFav ? 'Unpin game' : 'Pin game'}
                className={`
                  absolute top-1.5 right-1.5 z-10 w-6 h-6 flex items-center justify-center
                  rounded-full transition-all duration-200 cursor-pointer
                  ${isFav
                    ? 'opacity-100'
                    : 'opacity-0 group-hover/card:opacity-100'
                  }
                  ${isEdu
                    ? 'bg-edu-surface/80 hover:bg-edu-surface'
                    : 'bg-synth-bg/70 hover:bg-synth-bg'
                  }
                `}
              >
                <Star
                  size={13}
                  className={isFav
                    ? isEdu ? 'text-edu-accent' : 'text-[#00e5ff] drop-shadow-[0_0_4px_#00e5ff]'
                    : isEdu ? 'text-edu-text2' : 'text-synth-text2'
                  }
                  fill={isFav ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          )
        })}
        </div>
      </div>
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 ${isEdu ? 'bg-gradient-to-l from-edu-bg' : 'bg-gradient-to-l from-synth-bg'}`} />
      </div>
    </div>
  )
}
