import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
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
        fixed inset-0 z-[400] flex flex-col items-center justify-center px-6
        transition-opacity duration-300
        ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${isEdu ? 'bg-edu-bg' : 'bg-synth-bg'}
      `}
    >
      {/* Synthwave sun */}
      {!isEdu && (
        <div
          className="fixed -bottom-44 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'linear-gradient(180deg,#ff2dff 0%,#ff6b35 40%,#ffcc00 100%)', filter: 'blur(4px)' }}
        />
      )}

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center gap-8">
        {/* Hero heading */}
        <h1 className={`
          font-black leading-tight text-center text-[clamp(2rem,6vw,4.5rem)] transition-all duration-300
          ${isEdu
            ? 'text-edu-accent font-edu-display'
            : 'font-display tracking-wide bg-gradient-to-b from-white via-[#ff99ff] to-[#cc44ff] text-gradient-clip drop-shadow-[0_0_20px_rgba(255,0,255,0.35)]'
          }
        `}>
          {isEdu ? 'Learn. Explore. Play!' : 'PLAY ANYTHING.\nANYTIME.'}
        </h1>

        {/* Featured game */}
        <div className="w-full" onClick={openGame}>
          <FeaturedBanner game={game} />
        </div>

        {/* Browse button */}
        <button
          onClick={dismiss}
          className={`
            font-bold border cursor-pointer transition-all duration-200
            px-8 py-3 rounded-lg text-sm
            ${isEdu
              ? 'font-edu-body border-edu-border text-edu-text2 hover:border-edu-accent hover:text-edu-accent bg-transparent'
              : 'font-display tracking-widest uppercase border-synth-border text-synth-text2 hover:border-synth-accent hover:text-synth-accent bg-transparent'
            }
          `}
        >
          {isEdu ? 'Browse All Games →' : 'BROWSE ALL GAMES →'}
        </button>
      </div>
    </div>
  )
}
