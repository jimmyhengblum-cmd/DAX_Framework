import { getCategories, getMeasures } from '@/lib/data'
import { CategoryCard } from '@/components/measures/CategoryCard'

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
        {categories.map(cat => (
          <CategoryCard
            key={cat.slug}
            category={cat}
            count={countByCategory[cat.id] ?? 0}
          />
        ))}
      </div>
    </div>
  )
}
