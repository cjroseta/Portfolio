'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, ChevronDown, Code2, Blocks } from 'lucide-react'

interface CVDownloadMenuProps {
  label: string
  variant?: 'solid' | 'outline'
}

export default function CVDownloadMenu({ label, variant = 'solid' }: CVDownloadMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const baseClasses =
    variant === 'solid'
      ? 'bg-primary text-white hover:bg-primary/80'
      : 'bg-transparent border border-border text-text hover:border-primary/50 hover:bg-primary/5'

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all text-base ${baseClasses}`}
      >
        <Download className="w-4 h-4" /> {label} <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl overflow-hidden left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0">
          <a
            href="/cv-fullstack.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 px-4 py-3 hover:bg-primary/10 transition-colors"
          >
            <Code2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <span className="block text-text font-medium text-sm">CV — Full Stack Developer</span>
              <span className="block text-muted text-xs">React, Node.js, APIs, Business Intelligence</span>
            </span>
          </a>
          <a
            href="/cv-odoo.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 px-4 py-3 hover:bg-primary/10 transition-colors border-t border-border"
          >
            <Blocks className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <span>
              <span className="block text-text font-medium text-sm">CV — Odoo Developer / ERP Specialist</span>
              <span className="block text-muted text-xs">Odoo Framework, Odoo SH, Migrações, Python</span>
            </span>
          </a>
        </div>
      )}
    </div>
  )
}
