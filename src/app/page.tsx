import { Suspense } from 'react'
import { getMeasures, getCategories } from '@/lib/data'
import { MeasureCard } from '@/components/measures/MeasureCard'
import { SearchBar } from '@/components/measures/SearchBar'
import { CategoryFilter } from '@/components/measures/CategoryFilter'

interface HomeProps {
  searchParams: { q?: string; category?: string; tag?: string }
}

export default async function HomePage({ searchParams }: HomeProps) {
  const [measures, categories] = await Promise.all([
    getMeasures({ search: searchParams.q, categorySlug: searchParams.category, tag: searchParams.tag }),
    getCategories(),
  ])

  const isFiltered = !!(searchParams.q || searchParams.category || searchParams.tag)
  const totalCopies = measures.reduce((s, m) => s + m.copy_count, 0)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Hero */}
      {!isFiltered && (
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--teal)', fontFamily: 'Inter, sans-serif' }}>
            Bibliothèque DAX collaborative
          </p>
          <h1 className="font-serif mb-4" style={{
            fontSize: '38px', fontWeight: '600', lineHeight: '1.2',
            color: 'var(--tx-title)', letterSpacing: '-0.01em',
          }}>
            Trouvez la bonne mesure,<br />
            <span style={{ color: 'var(--teal)' }}>adaptez-la en un instant.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--tx-light)' }}>
            Des patterns DAX documentés, testés et personnalisables pour vos rapports Power BI.
          </p>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { value: measures.length, label: 'Mesures' },
              { value: categories.length, label: 'Catégories' },
              { value: totalCopies, label: 'Copies' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif font-semibold" style={{ fontSize: '28px', color: 'var(--tx-title)', lineHeight: '1' }}>
                  {value}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--tx-light)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-5">
        <Suspense>
          <SearchBar defaultValue={searchParams.q} />
        </Suspense>
      </div>

      {/* Category filter */}
      <div className="mb-8">
        <Suspense>
          <CategoryFilter categories={categories} selected={searchParams.category} />
        </Suspense>
      </div>

      {/* Divider + count */}
      <div className="flex items-center justify-between mb-6"
        style={{ borderTop: '0.5px solid var(--line)', paddingTop: '20px' }}>
        <p className="text-xs" style={{ color: 'var(--tx-light)' }}>
          {measures.length} mesure{measures.length !== 1 ? 's' : ''}
          {searchParams.q && <> pour «<span style={{ color: 'var(--tx-label)' }}> {searchParams.q} </span>»</>}
        </p>
      </div>

      {/* Grid */}
      {measures.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-lg mb-2" style={{ color: 'var(--tx-title)' }}>Aucun résultat</p>
          <p className="text-sm" style={{ color: 'var(--tx-light)' }}>Essayez d'autres mots-clés ou supprimez les filtres.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {measures.map(m => <MeasureCard key={m.id} measure={m} />)}
        </div>
      )}
    </div>
  )
}
