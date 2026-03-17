import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMeasureBySlug } from '@/lib/data'
import { DaxCode } from '@/components/ui/DaxCode'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { MeasureGenerator } from '@/components/measures/MeasureGenerator'
import { ExampleTable } from '@/components/measures/ExampleTable'
import { MeasureFunctions } from '@/components/measures/MeasureFunctions'
import { MeasureTags } from '@/components/measures/MeasureTags'
import { BackLink } from '@/components/ui/BackLink'
import { Copy, Eye } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  const measure = await getMeasureBySlug(params.slug)
  if (!measure) return { title: 'Mesure introuvable' }
  return { title: `${measure.name} — DAX Framework`, description: measure.description }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-widest uppercase mb-3"
      style={{ color: 'var(--tx-light)', fontFamily: 'Inter, sans-serif' }}>
      {children}
    </p>
  )
}

export default async function MeasurePage({ params }: Props) {
  const measure = await getMeasureBySlug(params.slug)
  if (!measure) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">

      <BackLink />

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <Link href={`/?category=${measure.category_slug}`}
          className="text-xs font-medium px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: `${measure.category_color ?? '#4ABAAD'}18`,
            color: measure.category_color ?? 'var(--teal)',
          }}>
          {measure.category_name}
        </Link>
        <DifficultyBadge difficulty={measure.difficulty} />
      </div>

      {/* Title */}
      <h1 className="font-serif font-semibold mb-3"
        style={{ fontSize: '30px', lineHeight: '1.25', color: 'var(--tx-title)', letterSpacing: '-0.01em' }}>
        {measure.name}
      </h1>
      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--tx-light)' }}>
        {measure.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-5 text-xs pb-6 mb-8"
        style={{ borderBottom: '0.5px solid var(--line)', color: 'var(--line-strong)' }}>
        <span className="flex items-center gap-1.5"><Eye size={12} />{measure.view_count} vues</span>
        <span className="flex items-center gap-1.5"><Copy size={12} />{measure.copy_count} copies</span>
      </div>

      <div className="space-y-8">

        <section>
          <SectionLabel>Script DAX — template</SectionLabel>
          <DaxCode code={measure.script_template} label="TEMPLATE" />
        </section>

        {measure.parameters.length > 0 && (
          <section>
            <MeasureGenerator
              measureId={measure.id}
              parameters={measure.parameters}
              scriptTemplate={measure.script_template}
            />
          </section>
        )}

        <section>
          <SectionLabel>Exemple concret</SectionLabel>
          <DaxCode code={measure.script_example} label="EXEMPLE" />
        </section>

        {measure.use_cases && (
          <section>
            <SectionLabel>Cas d'usage</SectionLabel>
            <p className="text-sm leading-relaxed px-4 py-3.5"
              style={{
                background: 'var(--bg-warm)',
                border: '0.5px solid var(--line)',
                borderRadius: 'var(--radius-inner)',
                color: 'var(--tx-label)',
              }}>
              {measure.use_cases}
            </p>
          </section>
        )}

        {measure.example_table && (
          <section>
            <SectionLabel>Résultat illustré</SectionLabel>
            <ExampleTable data={measure.example_table} />
          </section>
        )}

        {measure.dax_functions.length > 0 && (
          <section>
            <SectionLabel>Fonctions DAX utilisées</SectionLabel>
            <MeasureFunctions functions={measure.dax_functions} />
          </section>
        )}

        {measure.tags.length > 0 && (
          <section>
            <SectionLabel>Tags</SectionLabel>
            <MeasureTags tags={measure.tags} />
          </section>
        )}

      </div>
    </div>
  )
}
