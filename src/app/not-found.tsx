import Link from 'next/link'
import { Database, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <Database className="h-12 w-12 text-gray-700 mb-5" />
      <h1 className="text-4xl font-bold text-white mb-2">404</h1>
      <p className="text-gray-400 mb-8">
        Cette mesure n'existe pas ou a été supprimée.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5
                   text-sm font-medium text-white hover:bg-blue-500 transition-colors"
      >
        <Home className="h-4 w-4" />
        Retour à la bibliothèque
      </Link>
    </div>
  )
}
