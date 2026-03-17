import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMeasureBySlug } from '@/lib/data'
import { DaxCode } from '@/components/ui/DaxCode'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { MeasureGenerator } from '@/components/measures/MeasureGenerator'
import { ExampleTable } from '@/components/measures/ExampleTable'
import { ArrowLeft, ExternalLink, Copy, Eye } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  const measure = await getMeasureBySlug(params.slug)
  if (!measure) return { title: 'Mesure introuvable' }
  return { title: `${measure.name} — DAX Framework`, description: measure.description }
}

export default async function MeasurePage({ params }: Props) {
  const measure = await getMeasureBySlug(params.slug)
  if (!measure) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Retour à la bibliothèque
      </Link>

      {/* Breadcrumb badges */}
      <div className="flex items-center gap-2 mb-3">
        <Link
          href={`/?category=${measure.category_slug}`}
          className="text-xs font-medium px-3 py-1 rounded-full transition-colors"
          style={{ backgroundColor: `${measure.category_color}20`, color: measure.category_color ?? '#3B82F6' }}
        >
          {measure.category_name}
        </Link>
        <DifficultyBadge difficulty={measure.difficulty} />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-white mb-3 leading-snug">{measure.name}</h1>
      <p className="text-base text-gray-400 leading-relaxed mb-5">{measure.description}</p>

      {/* Stats */}
      <div className="flex items-center gap-5 text-sm text-gray-600 pb-6 mb-6 border-b border-gray-800">
        <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{measure.view_count} vues</span>
        <span className="flex items-center gap-1.5"><Copy className="h-3.5 w-3.5" />{measure.copy_count} copies</span>
      </div>

      <div className="space-y-8">

        {/* Script Template */}
        <section>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Script DAX — template</p>
          <DaxCode code={measure.script_template} label="TEMPLATE" />
        </section>

        {/* Generator — juste sous le template */}
        {measure.parameters.length > 0 && (
          <section>
            <MeasureGenerator
              measureId={measure.id}
              parameters={measure.parameters}
              scriptTemplate={measure.script_template}
            />
          </section>
        )}

        {/* Script Example */}
        <section>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Exemple concret</p>
          <DaxCode code={measure.script_example} label="EXEMPLE" />
        </section>

        {/* Use Cases */}
        {measure.use_cases && (
          <section>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Cas d'usage</p>
            <p className="text-sm text-gray-400 leading-relaxed bg-gray-900 rounded-xl p-4 border border-gray-800">
              {measure.use_cases}
            </p>
          </section>
        )}

        {/* Example Table */}
        {measure.example_table && (
          <section>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Résultat illustré</p>
            <ExampleTable data={measure.example_table} />
          </section>
        )}

        {/* DAX Functions */}
        {measure.dax_functions.length > 0 && (
          <section>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Fonctions DAX utilisées</p>
            <div className="flex flex-wrap gap-2">
              {measure.dax_functions.map((fn) => (
                <a
                  key={fn.name}
                  href={fn.docs_url ?? `https://learn.microsoft.com/search/?terms=${fn.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700
                             bg-gray-900 text-sm font-mono text-blue-400
                             hover:border-blue-700 hover:bg-blue-950 transition-colors"
                >
                  {fn.name}
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        {measure.tags.length > 0 && (
          <section>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {measure.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/?tag=${tag.slug}`}
                  className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-sm
                             text-gray-400 hover:border-gray-500 hover:text-white transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
