'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Code2, Sun, Moon } from 'lucide-react'
import clsx from 'clsx'
import { useTheme } from '@/context/ThemeContext'
import { useLang } from '@/context/LangContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, t, toggle: toggleLang } = useLang()

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/sobre', label: t.nav.about },
    { href: '/projetos', label: t.nav.projects },
    { href: '/contacto', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-glass shadow-lg shadow-black/10' : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Code2 className="text-primary w-6 h-6" />
          <span className="text-gradient">claudio.roseta</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted hover:text-text hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-semibold text-muted hover:text-primary hover:border-primary transition-all"
          >
            <span className="text-base">{lang === 'pt' ? '🇲🇿' : '🇬🇧'}</span>
            <span>{lang === 'pt' ? 'PT' : 'EN'}</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
            className="p-2 rounded-lg border border-border text-muted hover:text-primary hover:border-primary transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            href="/contacto"
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors glow-hover"
          >
            {t.nav.hire}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-text"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-glass border-t border-border px-6 py-4 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted hover:text-text hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex gap-2 mt-2">
            <button
              onClick={toggleLang}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm font-semibold text-muted hover:text-primary hover:border-primary transition-all"
            >
              <span>{lang === 'pt' ? '🇲🇿' : '🇬🇧'}</span>
              <span>{lang === 'pt' ? 'PT' : 'EN'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm text-muted hover:text-primary hover:border-primary transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Claro' : 'Escuro'}</span>
            </button>
          </div>

          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-1 px-4 py-3 bg-primary text-white text-sm font-medium rounded-lg text-center"
          >
            {t.nav.hire}
          </Link>
        </div>
      )}
    </header>
  )
}
