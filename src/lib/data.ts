import { supabase } from './supabase'
import type { Category, Measure, MeasureWithParams } from '@/types'

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  if (error) throw error
  return data ?? []
}

// ─── Measures ─────────────────────────────────────────────────────────────────

export async function getMeasures(opts?: {
  search?: string
  categorySlug?: string
  tag?: string
}): Promise<Measure[]> {
  let query = supabase
    .from('measures_with_meta')
    .select('*')
    .order('copy_count', { ascending: false })

  if (opts?.categorySlug) {
    query = query.eq('category_slug', opts.categorySlug)
  }

  if (opts?.search) {
    query = query.or(
      `name.ilike.%${opts.search}%,description.ilike.%${opts.search}%,use_cases.ilike.%${opts.search}%`
    )
  }

  const { data, error } = await query
  if (error) throw error

  let results = (data ?? []) as Measure[]

  // Filter by tag (client-side, JSONB array)
  if (opts?.tag) {
    results = results.filter((m) =>
      m.tags.some((t) => t.slug === opts.tag)
    )
  }

  return results
}

export async function getMeasureBySlug(slug: string): Promise<MeasureWithParams | null> {
  const { data: measure, error } = await supabase
    .from('measures_with_meta')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !measure) return null

  const { data: parameters } = await supabase
    .from('parameters')
    .select('*')
    .eq('measure_id', measure.id)
    .order('sort_order')

  // Increment view count (fire & forget)
  supabase.rpc('increment_view_count', { measure_id: measure.id }).then(() => {})

  return { ...measure, parameters: parameters ?? [] } as MeasureWithParams
}

export async function incrementCopyCount(measureId: string) {
  await supabase.rpc('increment_copy_count', { measure_id: measureId })
}
