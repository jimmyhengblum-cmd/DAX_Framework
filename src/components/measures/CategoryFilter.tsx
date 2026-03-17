'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { Category } from '@/types'

export function CategoryFilter({ categories, selected }: { categories: Category[], selected?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setCategory = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set('category', slug); else params.delete('category')
    router.push(`${pathname}?${params.toString()}`)
  }

  const btnStyle = (active: boolean, color?: string | null) => ({
    border: active ? `1px solid ${color ?? 'var(--teal)'}` : '0.5px solid var(--line)',
    borderRadius: '99px',
    padding: '4px 14px',
    fontSize: '13px',
    fontWeight: active ? '500' : '400',
    color: active ? (color ?? 'var(--teal)') : 'var(--tx-light)',
    background: active ? `${(color ?? '#4ABAAD')}15` : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontFamily: 'Inter, sans-serif',
  })

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={() => setCategory(null)} style={btnStyle(!selected)}>
        Toutes
      </button>
      {categories.map(cat => (
        <button key={cat.slug}
          onClick={() => setCategory(cat.slug === selected ? null : cat.slug)}
          style={btnStyle(cat.slug === selected, cat.color)}>
          {cat.name}
        </button>
      ))}
    </div>
  )
}
