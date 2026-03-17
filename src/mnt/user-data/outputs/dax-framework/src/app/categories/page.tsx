import Link from 'next/link'
import { getCategories, getMeasures } from '@/lib/data'
import {
  Sigma, Calendar, Percent, TrendingUp, Trophy, Banknote,
  ArrowRight
} from 'lucide-react'

// Map icon names → composants Lucide
const ICONS: Record<string, React.ElementType> = {
  sigma:        Sigma,
  calendar:     Calendar,
  percent:      Percent,
  'trending-up': TrendingUp,
  trophy:       Trophy,
  banknote:     Banknote,
}

export default async function CategoriesPage() {
  const [categories, measures] = await Promise.all([
    getCategories(),
    getMeasures(),
  ])

  // Comptage par catégorie
  const countByCategory = measures.reduce<Record<string, number>>((acc, m) => {
    acc[m.category_id] = (acc[m.category_id] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Catégories</h1>
        <p className="text-gray-400">
          Parcourez les mesures DAX par domaine fonctionnel.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = ICONS[cat.icon ?? ''] ?? Sigma
          const count = countByCategory[cat.id] ?? 0

          return (
            <Link
              key={cat.slug}
              href={`/?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900
                         p-6 hover:border-gray-600 transition-all duration-200 hover:bg-gray-800/80"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                style={{ backgroundColor: cat.color ?? '#3B82F6' }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="mb-4 inline-flex rounded-lg p-2.5"
                  style={{ backgroundColor: `${cat.color ?? '#3B82F6'}20` }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: cat.color ?? '#3B82F6' }}
                  />
                </div>

                {/* Content */}
                <h2 className="font-semibold text-white mb-1 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                  {cat.name}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>

                {cat.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                )}

                {/* Count */}
                <span className="text-xs font-medium text-gray-600">
                  {count} mesure{count !== 1 ? 's' : ''}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
