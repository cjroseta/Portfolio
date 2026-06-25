'use client'

import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export default function CTASection() {
  const { t } = useLang()

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-card border border-border rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">{t.cta.title}</h2>
            <p className="text-muted text-lg mb-8 leading-relaxed">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/80 transition-all glow text-lg"
              >
                {t.cta.contact} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/projetos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-text font-semibold rounded-xl hover:border-primary/50 transition-all text-lg"
              >
                {t.cta.portfolio}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
