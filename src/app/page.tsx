import { Suspense } from 'react'
import { getMeasures, getCategories } from '@/lib/data'
import { MeasureCard } from '@/components/measures/MeasureCard'
import { SearchBar } from '@/components/measures/SearchBar'
import { CategoryFilter } from '@/components/measures/CategoryFilter'
import { Database, Zap, BookOpen } from 'lucide-react'

interface HomeProps {
  searchParams: { q?: string; category?: string; tag?: string }
}

export default async function HomePage({ searchParams }: HomeProps) {
  const [measures, categories] = await Promise.all([
    getMeasures({
      search: searchParams.q,
      categorySlug: searchParams.category,
      tag: searchParams.tag,
    }),
    getCategories(),
  ])

  const isFiltered = !!(searchParams.q || searchParams.category || searchParams.tag)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero */}
      {!isFiltered && (
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-800 bg-blue-900/30 px-3 py-1 text-sm text-blue-300 mb-5">
            <Zap className="h-3.5 w-3.5" />
            Bibliothèque DAX collaborative
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Trouvez la bonne mesure DAX,<br />
            <span className="text-blue-400">en quelques secondes.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Des patterns DAX documentés, testés et personnalisables pour vos rapports Power BI.
          </p>

          {/* Stats */}
          <div className="mt-8 flex justify-center gap-10 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{measures.length}</p>
              <p className="text-gray-500">Mesures</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{categories.length}</p>
              <p className="text-gray-500">Catégories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {measures.reduce((s, m) => s + m.copy_count, 0)}
              </p>
              <p className="text-gray-500">Copies</p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <SearchBar defaultValue={searchParams.q} />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          selected={searchParams.category}
        />
      </div>

      {/* Results */}
      {isFiltered && (
        <p className="text-sm text-gray-500 mb-4">
          {measures.length} mesure{measures.length !== 1 ? 's' : ''} trouvée{measures.length !== 1 ? 's' : ''}
          {searchParams.q && <> pour « <span className="text-gray-300">{searchParams.q}</span> »</>}
          {searchParams.category && <> dans <span className="text-gray-300">{searchParams.category}</span></>}
        </p>
      )}

      {measures.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Aucune mesure trouvée</p>
          <p className="text-sm mt-1">Essayez d'autres mots-clés ou supprimez les filtres.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {measures.map((measure) => (
            <MeasureCard key={measure.id} measure={measure} />
          ))}
        </div>
      )}
    </div>
  )
}
