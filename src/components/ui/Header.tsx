import Link from 'next/link'
import { Database } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors">
            <Database className="h-5 w-5 text-blue-500" />
            <span>DAX Framework</span>
            <span className="rounded-full bg-blue-900/60 px-2 py-0.5 text-xs text-blue-300 font-normal">
              Beta
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Bibliothèque</Link>
            <Link href="/categories" className="hover:text-white transition-colors">Catégories</Link>
            <a
              href="https://learn.microsoft.com/fr-fr/dax/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Docs DAX ↗
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
