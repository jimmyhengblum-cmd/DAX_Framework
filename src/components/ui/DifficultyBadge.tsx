import type { Difficulty } from '@/types'
import clsx from 'clsx'

const config: Record<Difficulty, { label: string; className: string }> = {
  beginner:     { label: 'Débutant',      className: 'bg-green-900/50 text-green-400 border-green-800' },
  intermediate: { label: 'Intermédiaire', className: 'bg-yellow-900/50 text-yellow-400 border-yellow-800' },
  advanced:     { label: 'Avancé',        className: 'bg-red-900/50 text-red-400 border-red-800' },
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty]
  return (
    <span className={clsx('rounded-full border px-2 py-0.5 text-xs font-medium shrink-0', className)}>
      {label}
    </span>
  )
}
