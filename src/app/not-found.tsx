import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <p className="font-serif mb-2" style={{ fontSize: '64px', color: 'var(--line)', lineHeight: '1' }}>404</p>
      <h1 className="font-serif font-semibold text-xl mb-2" style={{ color: 'var(--tx-title)' }}>
        Mesure introuvable
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--tx-light)' }}>
        Cette mesure n'existe pas ou a été supprimée.
      </p>
      <Link href="/"
        className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-inner transition-colors"
        style={{ background: 'var(--teal)', color: '#fff', borderRadius: 'var(--radius-inner)' }}>
        Retour à la bibliothèque
      </Link>
    </div>
  )
}
