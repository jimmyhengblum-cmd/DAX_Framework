import Link from 'next/link'
import { Copy, Eye } from 'lucide-react'
import type { Measure } from '@/types'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'

export function MeasureCard({ measure }: { measure: Measure }) {
  return (
    <Link href={`/measures/${measure.slug}`}
      className="group block transition-all duration-200"
      style={{
        background: 'var(--bg-panel)',
        border: '0.5px solid var(--line)',
        borderRadius: 'var(--radius-panel)',
        padding: '20px',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--teal)'
        el.style.boxShadow = '0 0 0 1px var(--teal)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--line)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Category + Difficulty */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: measure.category_color ?? 'var(--teal)' }} />
          <span className="text-xs" style={{ color: 'var(--tx-light)' }}>
            {measure.category_name}
          </span>
        </div>
        <DifficultyBadge difficulty={measure.difficulty} />
      </div>

      {/* Name */}
      <h3 className="font-serif text-base font-semibold mb-2 transition-colors"
        style={{ color: 'var(--tx-title)', lineHeight: '1.35' }}>
        {measure.name}
      </h3>

      {/* Description */}
      <p className="text-xs leading-relaxed mb-4 line-clamp-2"
        style={{ color: 'var(--tx-light)' }}>
        {measure.description}
      </p>

      {/* Script preview */}
      <div className="rounded px-3 py-2 mb-4 font-mono overflow-hidden"
        style={{ background: 'var(--bg-warm)', border: '0.5px solid var(--line)' }}>
        <code className="text-xs truncate block" style={{ color: 'var(--teal)' }}>
          {measure.script_template}
        </code>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {measure.tags.slice(0, 3).map(tag => (
            <span key={tag.slug} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'var(--bg-neutral)', color: 'var(--tx-light)' }}>
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--line-strong)' }}>
          <span className="flex items-center gap-1"><Eye size={11} />{measure.view_count}</span>
          <span className="flex items-center gap-1"><Copy size={11} />{measure.copy_count}</span>
        </div>
      </div>
    </Link>
  )
}
