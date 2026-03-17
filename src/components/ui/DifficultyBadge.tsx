import type { Difficulty } from '@/types'
import clsx from 'clsx'

const config: Record<Difficulty, { label: string; className: string }> = {
  beginner:     { label: 'Débutant',      className: 'bg-green-950 text-green-400 border-green-800' },
  intermediate: { label: 'Intermédiaire', className: 'bg-yellow-950 text-yellow-500 border-yellow-800' },
  advanced:     { label: 'Avancé',        className: 'bg-red-950 text-red-400 border-red-800' },
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty]
  return (
    <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', className)}>
      {label}
    </span>
  )
}
