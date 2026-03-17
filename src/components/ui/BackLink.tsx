'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BackLink() {
  return (
    <Link href="/"
      className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
      style={{ color: 'var(--tx-light)' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--tx-light)')}>
      <ArrowLeft size={14} />
      Retour à la bibliothèque
    </Link>
  )
}
