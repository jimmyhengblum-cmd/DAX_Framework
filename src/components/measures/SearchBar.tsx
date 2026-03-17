'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(defaultValue)
  const [focused, setFocused] = useState(false)

  const createQueryString = (q: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (q) params.set('q', q); else params.delete('q')
    return params.toString()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`${pathname}?${createQueryString(value)}`)
  }

  const handleClear = () => {
    setValue('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: focused ? 'var(--teal)' : 'var(--tx-light)' }} />
      <input
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Rechercher une mesure… YTD, ratio, cumul, RANKX"
        className="w-full py-3 pl-11 pr-10 text-sm transition-all duration-150 outline-none"
        style={{
          background: 'var(--bg-panel)',
          border: focused ? '1px solid var(--teal)' : '0.5px solid var(--line)',
          borderRadius: 'var(--radius-inner)',
          color: 'var(--tx-title)',
          fontFamily: 'Inter, sans-serif',
        }}
      />
      {value && (
        <button type="button" onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--tx-light)' }}>
          <X size={14} />
        </button>
      )}
    </form>
  )
}
