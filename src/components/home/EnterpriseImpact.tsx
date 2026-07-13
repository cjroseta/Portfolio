'use client'

import { ArrowRightLeft, BarChart3, Bot, Wallet } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export default function EnterpriseImpact() {
  const { t } = useLang()

  const impacts = [
    { icon: ArrowRightLeft, title: t.enterpriseImpact.migration_title, description: t.enterpriseImpact.migration_description, color: 'text-primary' },
    { icon: BarChart3, title: t.enterpriseImpact.bi_title, description: t.enterpriseImpact.bi_description, color: 'text-accent' },
    { icon: Bot, title: t.enterpriseImpact.rpa_title, description: t.enterpriseImpact.rpa_description, color: 'text-secondary' },
    { icon: Wallet, title: t.enterpriseImpact.savings_title, description: t.enterpriseImpact.savings_description, color: 'text-yellow-400' },
  ]

  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-darker)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{t.enterpriseImpact.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">{t.enterpriseImpact.title}</h2>
          <p className="text-muted text-lg leading-relaxed">{t.enterpriseImpact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impacts.map(({ icon: Icon, title, description, color }, index) => (
            <article key={title} className="bg-card border border-border rounded-xl p-6 motion-reveal" style={{ animationDelay: `${index * 80}ms` }}>
              <Icon className={`w-7 h-7 ${color} mb-5`} aria-hidden="true" />
              <h3 className="text-text font-semibold text-lg mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
