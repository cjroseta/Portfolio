'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { useLang } from '@/context/LangContext'

export default function FeaturedProjects() {
  const { t } = useLang()
  const featured = projects.filter((project) => project.category === 'case-study').slice(0, 3)

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{t.featured.label}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text">{t.featured.title}</h2>
            <p className="text-muted text-base mt-3 max-w-2xl">{t.featured.subtitle}</p>
          </div>
          <Link
            href="/projetos"
            className="hidden md:flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm"
          >
            {t.featured.see_all} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/projetos" className="inline-flex items-center gap-2 text-primary text-sm font-medium">
            {t.featured.see_all} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
