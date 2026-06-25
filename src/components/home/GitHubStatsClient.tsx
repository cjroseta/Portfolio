'use client'

import { Github, Star, BookOpen, Users } from 'lucide-react'
import { useLang } from '@/context/LangContext'

interface Props {
  stats: {
    followers: number
    publicRepos: number
    totalStars: number
    topLanguages: [string, number][]
  }
}

export default function GitHubStatsClient({ stats }: Props) {
  const { t } = useLang()

  const items = [
    { icon: BookOpen, label: t.github.repos, value: stats.publicRepos },
    { icon: Star, label: t.github.stars, value: stats.totalStars },
    { icon: Users, label: t.github.followers, value: stats.followers },
    { icon: Github, label: t.github.languages, value: stats.topLanguages.length },
  ]

  const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-yellow-500', 'bg-blue-500']

  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-darker)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Github className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-text">{t.github.title}</h2>
          <span className="text-xs bg-accent/10 border border-accent/30 text-accent px-2 py-0.5 rounded-full">
            {t.github.badge}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5 text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-text mb-1">{value}</div>
              <div className="text-muted text-sm">{label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted mb-4">{t.github.top_langs}</h3>
          <div className="flex flex-wrap gap-3">
            {stats.topLanguages.map(([lang, count], i) => (
              <div key={lang} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${colors[i]}`} />
                <span className="text-text text-sm font-medium">{lang}</span>
                <span className="text-faint text-xs">({count} repos)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
