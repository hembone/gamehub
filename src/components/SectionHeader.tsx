import type { ReactNode } from 'react'

interface Props {
  title: string
  icon?: ReactNode
  isEdu: boolean
  showSeeAll?: boolean
}

export function SectionHeader({ title, icon, isEdu, showSeeAll }: Props) {
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
        ${isEdu ? "bg-edu-border" : "bg-synth-border shadow-[0_0_5px_rgba(255,0,255,0.2)]"}
      `} />
      {showSeeAll && (
        <a
          href="#"
          className={`
            text-[0.68rem] opacity-75 hover:opacity-100 no-underline transition-opacity whitespace-nowrap
            ${isEdu ? "text-edu-accent2 font-edu-body text-sm" : "text-synth-accent2 font-body"}
          `}
        >
          {isEdu ? "See All →" : "SEE ALL →"}
        </a>
      )}
    </div>
  )
}
