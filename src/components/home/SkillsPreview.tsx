'use client'

import { skills } from '@/data/skills'
import { useLang } from '@/context/LangContext'

const categoryColors: Record<string, string> = {
  linguagem: 'border-primary/40 bg-primary/5 text-primary',
  framework: 'border-secondary/40 bg-secondary/5 text-secondary',
  dados: 'border-accent/40 bg-accent/5 text-accent',
  ferramenta: 'border-yellow-500/40 bg-yellow-500/5 text-yellow-400',
}

export default function SkillsPreview() {
  const { t } = useLang()

  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-darker)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{t.skills.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text">{t.skills.title}</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-transform hover:scale-105 ${categoryColors[skill.category]}`}
            >
              <span>{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
