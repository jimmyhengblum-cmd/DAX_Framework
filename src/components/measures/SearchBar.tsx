'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useCallback, useState } from 'react'

interface SearchBarProps {
  defaultValue?: string
}

export function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(defaultValue)

  const createQueryString = useCallback((q: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (q) params.set('q', q)
    else params.delete('q')
    return params.toString()
  }, [searchParams])

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
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher une mesure DAX… (ex: YTD, ratio, cumul)"
        className="w-full rounded-xl border border-gray-700 bg-gray-900 pl-11 pr-10 py-3
                   text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none
                   focus:ring-1 focus:ring-blue-500 transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  )
}
