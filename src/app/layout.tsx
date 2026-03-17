import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/ui/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DAX Framework — Bibliothèque de mesures Power BI',
  description: 'Trouvez, comprenez et réutilisez des mesures DAX standards pour vos rapports Power BI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
        <Header />
        <main>{children}</main>
        <footer className="border-t border-gray-800 mt-20 py-8 text-center text-gray-500 text-sm">
          DAX Framework · Bibliothèque collaborative de mesures Power BI
        </footer>
      </body>
    </html>
  )
}
