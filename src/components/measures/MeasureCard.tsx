import Link from 'next/link'
import { Copy, Eye, ChevronRight } from 'lucide-react'
import type { Measure } from '@/types'
import { DifficultyBadge } from './DifficultyBadge'

interface MeasureCardProps {
  measure: Measure
}

export function MeasureCard({ measure }: MeasureCardProps) {
  const categoryColor = measure.category_color ?? '#3B82F6'

  return (
    <Link
      href={`/measures/${measure.slug}`}
      className="group block rounded-xl border border-gray-800 bg-gray-900 p-5
                 hover:border-gray-600 hover:bg-gray-800/80 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="mt-0.5 h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: categoryColor }}
          />
          <span className="text-xs text-gray-500 truncate">{measure.category_name}</span>
        </div>
        <DifficultyBadge difficulty={measure.difficulty} />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 flex items-center gap-1">
        {measure.name}
        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
        {measure.description}
      </p>

      {/* Script preview */}
      <div className="rounded-md bg-gray-950 px-3 py-2 mb-4 border border-gray-800">
        <code className="text-xs text-blue-300 font-mono line-clamp-1">
          {measure.script_template}
        </code>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {measure.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.slug}
              className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {measure.view_count}
          </span>
          <span className="flex items-center gap-1">
            <Copy className="h-3 w-3" />
            {measure.copy_count}
          </span>
        </div>
      </div>
    </Link>
  )
}
