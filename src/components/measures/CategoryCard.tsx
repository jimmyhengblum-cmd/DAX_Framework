'use client'

import Link from 'next/link'
import { Sigma, Calendar, Percent, TrendingUp, Trophy, Banknote } from 'lucide-react'
import type { Category } from '@/types'
import type { ElementType } from 'react'

const ICONS: Record<string, ElementType> = {
  sigma: Sigma, calendar: Calendar, percent: Percent,
  'trending-up': TrendingUp, trophy: Trophy, banknote: Banknote,
}

interface Props {
  category: Category
  count: number
}

export function CategoryCard({ category: cat, count }: Props) {
  const Icon = ICONS[cat.icon ?? ''] ?? Sigma

  return (
    <Link href={`/?category=${cat.slug}`}
      className="group block p-5 transition-all duration-200"
      style={{ background: 'var(--bg-panel)', border: '0.5px solid var(--line)', borderRadius: 'var(--radius-panel)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = cat.color ?? 'var(--teal)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
    >
      <div className="inline-flex rounded p-2 mb-4"
        style={{ background: `${cat.color ?? '#4ABAAD'}18`, borderRadius: 'var(--radius-inner)' }}>
        <Icon size={16} style={{ color: cat.color ?? 'var(--teal)' }} />
      </div>
      <h2 className="font-serif font-semibold text-base mb-1" style={{ color: 'var(--tx-title)' }}>
        {cat.name}
      </h2>
      {cat.description && (
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--tx-light)' }}>
          {cat.description}
        </p>
      )}
      <span className="text-xs" style={{ color: 'var(--tx-light)' }}>
        {count} mesure{count !== 1 ? 's' : ''}
      </span>
    </Link>
  )
}
