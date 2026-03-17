'use client'

import Link from 'next/link'

interface Tag { name: string; slug: string }

export function MeasureTags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Link key={tag.slug} href={`/?tag=${tag.slug}`}
          className="text-xs px-3 py-1 rounded-full transition-all"
          style={{ border: '0.5px solid var(--line)', background: 'var(--bg-panel)', color: 'var(--tx-light)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.color = 'var(--teal)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--tx-light)' }}>
          #{tag.name}
        </Link>
      ))}
    </div>
  )
}
