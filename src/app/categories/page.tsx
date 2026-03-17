import Link from 'next/link'
import { getCategories, getMeasures } from '@/lib/data'
import { Sigma, Calendar, Percent, TrendingUp, Trophy, Banknote } from 'lucide-react'
import type { ElementType } from 'react'

const ICONS: Record<string, ElementType> = {
  sigma: Sigma, calendar: Calendar, percent: Percent,
  'trending-up': TrendingUp, trophy: Trophy, banknote: Banknote,
}

export default async function CategoriesPage() {
  const [categories, measures] = await Promise.all([getCategories(), getMeasures()])
  const countByCategory = measures.reduce<Record<string, number>>((acc, m) => {
    acc[m.category_id] = (acc[m.category_id] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--teal)' }}>
          Navigation
        </p>
        <h1 className="font-serif font-semibold mb-2" style={{ fontSize: '32px', color: 'var(--tx-title)' }}>
          Catégories
        </h1>
        <p className="text-sm" style={{ color: 'var(--tx-light)' }}>
          Parcourez les mesures DAX par domaine fonctionnel.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => {
          const Icon = ICONS[cat.icon ?? ''] ?? Sigma
          const count = countByCategory[cat.id] ?? 0
          return (
            <Link key={cat.slug} href={`/?category=${cat.slug}`}
              className="group block p-5 transition-all duration-200"
              style={{ background: 'var(--bg-panel)', border: '0.5px solid var(--line)', borderRadius: 'var(--radius-panel)' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.borderColor = cat.color ?? 'var(--teal)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'
              }}>
              <div className="inline-flex rounded p-2 mb-4"
                style={{ background: `${cat.color ?? '#4ABAAD'}18`, borderRadius: 'var(--radius-inner)' }}>
                <Icon size={16} style={{ color: cat.color ?? 'var(--teal)' }} />
              </div>
              <h2 className="font-serif font-semibold text-base mb-1"
                style={{ color: 'var(--tx-title)' }}>
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
        })}
      </div>
    </div>
  )
}
