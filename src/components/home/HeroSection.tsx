'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import CVDownloadMenu from '@/components/CVDownloadMenu'

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-primary text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          {t.hero.badge}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-text">{t.hero.title1} </span>
          <span className="text-gradient">{t.hero.title2}</span>
          <br />
          <span className="text-text text-3xl md:text-5xl">{t.hero.title3}</span>
          <br />
          <span className="text-gradient text-2xl md:text-4xl">{t.hero.title4}</span>
        </h1>

        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projetos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/80 transition-all glow hover:glow-hover text-lg"
          >
            {t.hero.cta_projects} <ArrowRight className="w-5 h-5" />
          </Link>
          <CVDownloadMenu label={t.hero.cta_cv} variant="outline" />
        </div>

        <div className="mt-16 flex justify-center gap-8 text-faint text-sm">
          {[
            { value: 'Odoo v17 → v18', label: t.hero.stat_migration },
            { value: '8', label: t.hero.stat_dashboards },
            { value: '500k+', label: t.hero.stat_records },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-text mb-1">{stat.value}</div>
              <div>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-faint text-xs animate-bounce">
        <span>{t.hero.scroll}</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-faint to-transparent" />
      </div>
    </section>
  )
}
