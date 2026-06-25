'use client'

import { useState } from 'react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { useLang } from '@/context/LangContext'

type Filter = 'todos' | 'dev' | 'dados' | 'api'

export default function ProjetosPage() {
  const { t } = useLang()
  const [active, setActive] = useState<Filter>('todos')

  const filters: { value: Filter; label: string }[] = [
    { value: 'todos', label: t.projects.filter_all },
    { value: 'dev', label: t.projects.filter_dev },
    { value: 'dados', label: t.projects.filter_data },
    { value: 'api', label: t.projects.filter_api },
  ]

  const filtered = active === 'todos' ? projects : projects.filter((p) => p.category === active)

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{t.projects.label}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">{t.projects.title}</h1>
          <p className="text-muted text-lg max-w-xl mx-auto">{t.projects.subtitle}</p>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === f.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-card border border-border text-muted hover:text-text hover:border-primary/50'
              }`}
            >
              {f.label}
              <span className="ml-2 text-xs opacity-60">
                {f.value === 'todos' ? projects.length : projects.filter((p) => p.category === f.value).length}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">{t.projects.empty}</div>
        )}
      </div>
    </div>
  )
}
