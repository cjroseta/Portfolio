'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Code2 } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-border" style={{ backgroundColor: 'var(--bg-darker)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Code2 className="text-primary w-5 h-5" />
              <span className="text-gradient">claudio.roseta</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{t.footer.description}</p>
          </div>

          
          <div>
            <h4 className="font-semibold text-text mb-3">{t.nav.contact}</h4>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/cjroseta', icon: Github },
                { href: 'https://www.linkedin.com/in/claudioroseta/', icon: Linkedin },
                { href: 'mailto:claudioroseta@gmail.com', icon: Mail },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="p-2 bg-card border border-border rounded-lg text-muted hover:text-primary hover:border-primary transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-faint">
          <p>© {new Date().getFullYear()} Portfolio. {t.footer.rights}</p>
          
        </div>
      </div>
    </footer>
  )
}
