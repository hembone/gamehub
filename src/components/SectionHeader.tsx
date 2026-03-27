import type { ReactNode } from 'react'

interface Props {
  title: string
  icon?: ReactNode
  isEdu: boolean
}

export function SectionHeader({ title, icon, isEdu }: Props) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`
        inline-flex items-center gap-1.5 font-bold whitespace-nowrap tracking-widest uppercase
        ${isEdu
          ? "text-edu-accent font-edu-display text-lg tracking-wide"
          : "text-synth-text font-display text-[0.9rem]"
        }
      `}>
        {!isEdu && icon}
        {title}
      </span>
      <div className={`
        flex-1 h-px
        ${isEdu ? "bg-edu-border" : "bg-gradient-to-r from-synth-border via-[#00e5ff33] to-transparent shadow-[0_0_5px_rgba(0,229,255,0.15)]"}
      `} />
    </div>
  )
}
