'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { Category } from '@/types'
import clsx from 'clsx'

interface CategoryFilterProps {
  categories: Category[]
  selected?: string
}

export function CategoryFilter({ categories, selected }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setCategory = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set('category', slug)
    else params.delete('category')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => setCategory(null)}
        className={clsx(
          'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
          !selected
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
        )}
      >
        Toutes
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => setCategory(cat.slug === selected ? null : cat.slug)}
          className={clsx(
            'rounded-full px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5',
            cat.slug === selected
              ? 'text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          )}
          style={cat.slug === selected ? { backgroundColor: cat.color ?? '#3B82F6' } : undefined}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
