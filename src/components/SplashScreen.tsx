import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { X, Gamepad2 } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { FeaturedBanner } from './FeaturedBanner'
import type { Game } from '../data/games'

const SPLASH_KEY = 'arcade-void-splash-seen'

export function useSplash() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem(SPLASH_KEY)
  })

  const dismiss = () => {
    try { sessionStorage.setItem(SPLASH_KEY, '1') } catch {}
    setVisible(false)
  }

  return { visible, dismiss }
}

interface Props {
  game: Game
  onDismiss: () => void
}

export function SplashScreen({ game, onDismiss }: Props) {
  const navigate = useNavigate()
  const { isEdu } = useTheme()
  const [fading, setFading] = useState(false)

  const dismiss = () => {
    setFading(true)
    setTimeout(onDismiss, 300)
  }

  const openGame = () => {
    dismiss()
    setTimeout(() => navigate({ to: '/games/$slug', params: { slug: game.slug } }), 300)
  }

  return (
    <div
      className={`
        fixed inset-0 z-[400] flex items-center justify-center px-4 sm:px-6
        transition-opacity duration-300
        ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal dialog */}
      <div className={`
        relative z-10 w-full max-w-2xl flex flex-col items-center gap-6
        border rounded-2xl px-6 py-8 sm:px-10 sm:py-10
        ${isEdu
          ? 'bg-edu-bg border-edu-border shadow-[0_24px_80px_rgba(0,0,0,0.18)]'
          : 'bg-synth-bg border-synth-border shadow-[0_24px_80px_rgba(255,0,255,0.12),0_0_0_1px_rgba(255,0,255,0.08)]'
        }
      `}>
        {/* Close button */}
        <button
          onClick={dismiss}
          className={`
            absolute top-3 right-3 p-2 rounded-full cursor-pointer transition-all duration-150
            ${isEdu
              ? 'text-edu-text2 hover:text-edu-text hover:bg-edu-border'
              : 'text-synth-text2 hover:text-white hover:bg-white/10'
            }
          `}
        >
          <X size={24} />
        </button>

        {/* Welcome title */}
        <div className="flex flex-col items-center gap-1">
          <p className={`
            text-xs font-bold tracking-widest uppercase
            ${isEdu ? 'text-edu-text2 font-edu-body' : 'text-synth-text2 font-display'}
          `}>
            {isEdu ? 'Welcome to' : 'WELCOME TO'}
          </p>
          <h1 className={`
            font-black leading-none text-center text-[clamp(2rem,5vw,3.2rem)]
            ${isEdu
              ? 'text-edu-accent font-edu-display'
              : 'font-display tracking-wide bg-gradient-to-r from-[#ff2dff] via-[#00e5ff] to-[#ff2dff] bg-size-200 text-gradient-clip animate-shimmer drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]'
            }
          `}>
            {isEdu ? 'FunLearn Zone 🎓' : 'ARCADE VOID'}
          </h1>
        </div>

        {/* Subdued tagline */}
        <p className={`
          text-sm font-bold tracking-widest uppercase -mt-2
          ${isEdu ? 'text-edu-text2 font-edu-body' : 'text-synth-text2 font-display'}
        `}>
          {isEdu ? 'Learn. Explore. Play!' : 'PLAY ANYTHING · ANYTIME'}
        </p>

        {/* Featured game */}
        <div className="w-full cursor-pointer" onClick={openGame}>
          <FeaturedBanner game={game} />
        </div>

        {/* Browse button */}
        <button
          onClick={dismiss}
          className={`
            inline-flex items-center gap-2 font-bold cursor-pointer transition-all duration-200
            px-8 py-3 rounded-lg text-sm border
            ${isEdu
              ? 'font-edu-body bg-transparent border-edu-accent text-edu-accent hover:bg-edu-accent hover:text-white hover:shadow-[0_4px_20px_rgba(49,130,206,0.35)] hover:scale-[1.03]'
              : 'font-display tracking-widest uppercase bg-transparent border-synth-accent text-synth-accent hover:bg-synth-accent/10 hover:shadow-[0_0_24px_rgba(255,0,255,0.4),0_0_0_1px_rgba(255,0,255,0.3)] hover:scale-[1.03] drop-shadow-[0_0_6px_rgba(255,0,255,0.2)]'
            }
          `}
        >
          {isEdu ? 'Browse All Games →' : <><Gamepad2 size={15} /> BROWSE ALL GAMES</>}
        </button>
      </div>
    </div>
  )
}
