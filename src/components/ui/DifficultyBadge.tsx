import type { Difficulty } from '@/types'

const config: Record<Difficulty, { label: string; bg: string; color: string }> = {
  beginner:     { label: 'Débutant',      bg: 'var(--teal-xlight)',   color: 'var(--teal-dark)' },
  intermediate: { label: 'Intermédiaire', bg: 'rgba(230,215,127,0.2)', color: '#9A8B30' },
  advanced:     { label: 'Avancé',        bg: 'var(--coral-xlight)',  color: 'var(--coral)' },
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, bg, color } = config[difficulty]
  return (
    <span className="inline-flex items-center rounded-full text-xs font-medium px-2.5 py-0.5"
      style={{ backgroundColor: bg, color }}>
      {label}
    </span>
  )
}
