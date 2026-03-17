import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMeasureBySlug } from '@/lib/data'
import { DaxCode } from '@/components/ui/DaxCode'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { MeasureGenerator } from '@/components/measures/MeasureGenerator'
import { ExampleTable } from '@/components/measures/ExampleTable'
import { ArrowLeft, ExternalLink, Copy, Eye, Tag, Cpu } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const measure = await getMeasureBySlug(params.slug)
  if (!measure) return { title: 'Mesure introuvable' }
  return {
    title: `${measure.name} — DAX Framework`,
    description: measure.description,
  }
}

export default async function MeasurePage({ params }: Props) {
  const measure = await getMeasureBySlug(params.slug)
  if (!measure) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Retour à la bibliothèque
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={`/?category=${measure.category_slug}`}
            className="text-sm text-gray-500 hover:text-white transition-colors"
            style={{ color: measure.category_color ?? undefined }}
          >
            {measure.category_name}
          </Link>
          <span className="text-gray-700">/</span>
          <DifficultyBadge difficulty={measure.difficulty} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">{measure.name}</h1>
        <p className="text-lg text-gray-400 leading-relaxed">{measure.description}</p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-5 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" /> {measure.view_count} vues
          </span>
          <span className="flex items-center gap-1.5">
            <Copy className="h-4 w-4" /> {measure.copy_count} copies
          </span>
        </div>
      </div>

      <div className="space-y-8">

        {/* Script Template */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Script DAX (template)
          </h2>
          <DaxCode
            code={measure.script_template}
            label="TEMPLATE"
          />
        </section>

        {/* Script Example */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Exemple concret
          </h2>
          <DaxCode
            code={measure.script_example}
            label="EXEMPLE"
          />
        </section>

        {/* Use Cases */}
        {measure.use_cases && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Cas d'usage
            </h2>
            <p className="text-gray-400 leading-relaxed bg-gray-900 rounded-lg p-4 border border-gray-800">
              {measure.use_cases}
            </p>
          </section>
        )}

        {/* Example Table */}
        {measure.example_table && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Résultat illustré
            </h2>
            <ExampleTable data={measure.example_table} />
          </section>
        )}

        {/* DAX Functions */}
        {measure.dax_functions.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Fonctions DAX utilisées
            </h2>
            <div className="flex flex-wrap gap-2">
              {measure.dax_functions.map((fn) => (
                <a
                  key={fn.name}
                  href={fn.docs_url ?? `https://learn.microsoft.com/search/?terms=${fn.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-900
                             px-3 py-1.5 text-sm font-mono text-blue-400 hover:border-blue-600
                             hover:bg-blue-900/20 transition-colors"
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
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {measure.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/?tag=${tag.slug}`}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-400
                             hover:bg-gray-700 hover:text-white transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Generator */}
        {measure.parameters.length > 0 && (
          <section>
            <MeasureGenerator
              measureId={measure.id}
              parameters={measure.parameters}
              scriptTemplate={measure.script_template}
            />
          </section>
        )}
      </div>
    </div>
  )
}
