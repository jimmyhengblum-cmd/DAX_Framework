'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Logo } from './Logo'

const NAV_LINKS = [
  { href: '/',            label: 'Bibliothèque' },
  { href: '/categories',  label: 'Catégories'   },
]

export function Header() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('datatorii-theme')
    if (saved === 'dark') { document.documentElement.classList.add('dark'); setDark(true) }
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('datatorii-theme', next ? 'dark' : 'light')
  }

  return (
    <header style={{
      height: 'var(--nav-height)',
      background: 'var(--bg-panel)',
      borderBottom: '0.5px solid var(--line)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="mx-auto max-w-7xl px-6 h-full flex items-center gap-6">

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo size={28} />
          <span style={{
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--tx-title)',
            letterSpacing: '0.01em',
          }}>
            DAX Framework
          </span>
        </Link>

        {/* Separator */}
        <div style={{ width: '0.5px', height: '20px', background: 'var(--line)', flexShrink: 0 }} />

        {/* Nav tabs — inspiré dashboard DATATORII */}
        <nav className="flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                style={{
                  fontSize: '13px',
                  fontWeight: active ? '500' : '400',
                  color: active ? 'var(--tx-title)' : 'var(--tx-light)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  textDecoration: active ? 'underline' : 'none',
                  textDecorationColor: 'var(--brand)',
                  textUnderlineOffset: '4px',
                  textDecorationThickness: '1.5px',
                  background: active ? 'var(--bg-warm)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                {label}
              </Link>
            )
          })}

          {/* Separator */}
          <div style={{ width: '0.5px', height: '16px', background: 'var(--line)', margin: '0 4px' }} />

          <a href="https://learn.microsoft.com/fr-fr/dax/"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              color: 'var(--tx-light)',
              padding: '5px 12px',
              borderRadius: '6px',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--tx-label)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--tx-light)')}>
            Docs DAX ↗
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Beta badge */}
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            padding: '2px 8px',
            borderRadius: '99px',
            background: 'var(--brand-light)',
            color: 'var(--brand)',
            letterSpacing: '0.03em',
          }}>
            Beta
          </span>

          {/* Separator */}
          <div style={{ width: '0.5px', height: '16px', background: 'var(--line)' }} />

          {/* Dark mode toggle */}
          <button onClick={toggleDark}
            title={dark ? 'Mode clair' : 'Mode sombre'}
            style={{
              width: '30px',
              height: '30px',
              border: '0.5px solid var(--line)',
              borderRadius: '6px',
              background: 'transparent',
              color: 'var(--tx-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-neutral)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--tx-label)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--tx-light)'
            }}
          >
            {dark ? (
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 10.5A6 6 0 015.5 2.5a6 6 0 108 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

      </div>
    </header>
  )
}
