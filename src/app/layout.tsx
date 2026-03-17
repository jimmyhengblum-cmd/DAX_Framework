import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/ui/Header'

export const metadata: Metadata = {
  title: 'DAX Framework — Bibliothèque de mesures Power BI',
  description: 'Trouvez, comprenez et réutilisez des mesures DAX standards pour vos rapports Power BI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--tx-label)' }}>
        <Header />
        <main>{children}</main>
        <footer style={{ borderTop: '0.5px solid var(--line)' }} className="mt-24 py-10">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-base font-semibold" style={{ color: 'var(--tx-title)' }}>
                DAX Framework
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--teal-xlight)', color: 'var(--teal)' }}>
                Beta
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--tx-light)' }}>
              Bibliothèque collaborative de mesures Power BI
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
