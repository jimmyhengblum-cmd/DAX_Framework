'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Header() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('datatorii-theme')
    if (saved === 'dark') { document.documentElement.classList.add('dark'); setDark(true) }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('datatorii-theme', next ? 'dark' : 'light')
  }

  const navLink = (href: string, label: string) => {
    const active = pathname === href
    return (
      <Link href={href}
        className="text-sm transition-colors duration-150"
        style={{ color: active ? 'var(--teal)' : 'var(--tx-light)',
                 fontWeight: active ? '500' : '400' }}
        onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = 'var(--tx-label)' }}
        onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = 'var(--tx-light)' }}
      >
        {label}
      </Link>
    )
  }

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: scrolled ? 'var(--bg)' : 'var(--bg)',
        borderBottom: '0.5px solid var(--line)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: 'var(--teal)' }}>
              D
            </div>
            <span className="font-serif text-base font-semibold tracking-wide"
              style={{ color: 'var(--tx-title)' }}>
              DAX Framework
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            {navLink('/', 'Bibliothèque')}
            {navLink('/categories', 'Catégories')}
            <a href="https://learn.microsoft.com/fr-fr/dax/"
              target="_blank" rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: 'var(--tx-light)' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--tx-label)'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--tx-light)'}
            >
              Docs DAX ↗
            </a>

            {/* Theme toggle */}
            <button onClick={toggleDark}
              className="w-8 h-8 rounded-inner flex items-center justify-center transition-colors"
              style={{ border: '0.5px solid var(--line)', color: 'var(--tx-light)', backgroundColor: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-neutral)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              title={dark ? 'Mode clair' : 'Mode sombre'}
            >
              {dark ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 10.5A6 6 0 015.5 2.5a6 6 0 108 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
