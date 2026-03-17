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
      <body style={{ backgroundColor: 'var(--bg)', color: 'var(--tx-label)', minHeight: '100vh' }}>
        <Header />
        <main>{children}</main>
        <footer style={{ borderTop: '0.5px solid var(--line)', marginTop: '80px', padding: '28px 0' }}>
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 41 41" fill="none">
                <path d="M19.4074 23.8741V20.2977C17.0958 20.2856 15.983 20.2266 14.3857 20.1406V20.8182H13.8613L13.8937 23.2332H14.7898V23.8741H19.4074Z" fill="#FF5252"/>
                <path d="M27.1861 26.6335H20.4804V26.6211H13.9492L14.2532 37.2705C16.1649 37.937 18.2218 38.3009 20.3643 38.3009C22.718 38.3009 24.968 37.8629 27.0361 37.0657L27.1861 26.6335Z" fill="#FF5252"/>
                <path d="M21.7275 20.298V23.8879H26.344V23.2332H27.2421L27.2655 20.8182H26.7414V20.1406C25.1525 20.2272 24.0319 20.2859 21.7275 20.298Z" fill="#FF5252"/>
                <path d="M36.2235 10.9938H34.4025V8.47569H34.4254C31.0568 4.51673 26.0083 2 20.3646 2C10.2224 2 2 10.126 2 20.1508C2 26.7971 5.61546 32.6084 11.0078 35.7705L11.3024 26.6215H6.6V23.874H10.4684V23.2331H11.3604L11.3819 20.8181H10.8734V19.9487C7.20384 19.6325 6.28316 19.1865 6.28316 19.1865V17.8799C5.7089 17.7804 5.51283 17.7212 5.51283 17.7212L4.55757 14.4081C4.55757 14.4081 7.8707 16.5116 20.4806 16.5116H20.6552V16.5234C24.4804 16.5196 27.4488 16.3236 29.7294 16.0521V16.9747H31.1513V16.5356H32.5062V17.1941H34.412V15.952H36.1711V17.6911C36.1711 17.6911 35.4175 17.7804 34.846 17.8802V19.1868C34.846 19.1868 33.9256 19.6325 30.261 19.949V20.8184H29.7445L29.7763 23.2334H30.6663V23.8881H34.5356V26.6342H29.8237L30.2644 35.4411C35.3553 32.2145 38.7286 26.5722 38.7286 20.151C38.7289 16.8107 37.8155 13.682 36.2235 10.9938ZM31.0955 15.3935H29.5325V13.8488H31.0955V15.3935ZM32.3163 11.6849H30.9173V10.3025H32.3163V11.6849ZM35.1837 14.3028H33.4244V12.5636H35.1837V14.3028Z" fill="#FF5252"/>
              </svg>
              <span style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--tx-title)',
              }}>DAX Framework</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--tx-light)' }}>
              Bibliothèque collaborative de mesures Power BI
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
