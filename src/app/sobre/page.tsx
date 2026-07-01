'use client'

import { skills, timeline, certifications } from '@/data/skills'
import { MapPin, Calendar, Award, Briefcase, Phone, Mail, Linkedin } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import CVDownloadMenu from '@/components/CVDownloadMenu'

const categoryColors: Record<string, string> = {
  linguagem: 'text-primary border-primary/30 bg-primary/5',
  framework: 'text-secondary border-secondary/30 bg-secondary/5',
  dados: 'text-accent border-accent/30 bg-accent/5',
  ferramenta: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
  banco: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
}

export default function SobrePage() {
  const { t } = useLang()

  const categoryLabels: Record<string, string> = {
    linguagem: t.about.cat_linguagem,
    framework: t.about.cat_framework,
    dados: t.about.cat_dados,
    ferramenta: t.about.cat_ferramenta,
    banco: t.about.cat_banco,
  }

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] || []), s]
    return acc
  }, {})

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5">
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-text mb-1">Cláudio Roseta</h1>
            <p className="text-primary font-medium text-lg mb-3">Desenvolvedor de Software | Analista de Dados</p>
            <div className="flex flex-wrap items-center gap-4 text-muted text-sm mb-5">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {t.about.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-accent" /> {t.about.available}</span>
            </div>
            <p className="text-slate-300 leading-relaxed mb-3">{t.about.bio1}</p>
            <p className="text-muted leading-relaxed mb-6">{t.about.bio2}</p>

            {/* Contactos rápidos */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="tel:+258846166958" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +258 84 616 6958
              </a>
              <a href="mailto:claudioroseta@gmail.com" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> claudioroseta@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/claudioroseta/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>

            <CVDownloadMenu label={t.about.download_cv} />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text mb-8 flex items-center gap-2">
            💻 {t.about.stack_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                  {categoryLabels[category]}
                </h3>
                <div className="space-y-3">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="flex items-center gap-2 text-text">
                          <span>{skill.icon}</span> {skill.name}
                        </span>
                        <span className="text-faint">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-dark rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Idiomas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">🌍 Idiomas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { lang: 'Português', level: 100, label: 'Nativo' },
              { lang: 'Inglês', level: 50, label: 'Intermédio' },
            ].map(({ lang, level, label }) => (
              <div key={lang} className="bg-card border border-border rounded-xl p-5">
                <div className="flex justify-between mb-2">
                  <span className="text-text font-semibold">{lang}</span>
                  <span className="text-muted text-sm">{label} — {level}%</span>
                </div>
                <div className="h-2 bg-dark rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text mb-8 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" /> {t.about.journey}
          </h2>
          <div className="relative border-l-2 border-border pl-8 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary border-2 border-dark" />
                <p className="text-primary text-sm font-medium mb-0.5">{item.year}</p>
                <h3 className="text-text font-semibold text-lg mb-0.5">{item.title}</h3>
                <p className="text-secondary text-sm font-medium mb-2">{item.company}</p>
                <p className="text-muted leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educação */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">🎓 Educação</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-primary text-sm font-medium mb-1">2025 (em curso)</p>
              <h3 className="text-text font-semibold text-lg">Licenciatura em Engenharia Informática</h3>
              <p className="text-muted text-sm">Universidade Aberta ISCED</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-primary text-sm font-medium mb-1">2011</p>
              <h3 className="text-text font-semibold text-lg">12ª Classe — Ensino Secundário</h3>
              <p className="text-muted text-sm">Escola João XXIII — Beira</p>
            </div>
          </div>
        </div>

        {/* Certificações */}
        <div>
          <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" /> {t.about.certifications}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:border-primary/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-text font-medium text-sm">{cert.title}</p>
                  <p className="text-muted text-xs">{cert.institution}</p>
                  <p className="text-primary text-xs font-medium mt-0.5">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
