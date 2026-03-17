'use client'

import { ExternalLink } from 'lucide-react'

interface DaxFn { name: string; docs_url: string | null }

export function MeasureFunctions({ functions }: { functions: DaxFn[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {functions.map(fn => (
        <a key={fn.name}
          href={fn.docs_url ?? `https://learn.microsoft.com/search/?terms=${fn.name}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono transition-all"
          style={{ border: '0.5px solid var(--line)', borderRadius: 'var(--radius-inner)', background: 'var(--bg-panel)', color: 'var(--teal)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.background = 'var(--teal-xlight)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg-panel)' }}>
          {fn.name}
          <ExternalLink size={10} style={{ opacity: 0.5 }} />
        </a>
      ))}
    </div>
  )
}
