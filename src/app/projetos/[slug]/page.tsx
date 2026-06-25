import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react'
import { projects } from '@/data/projects'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const categoryColors = {
    dev: 'text-accent bg-accent/10 border-accent/30',
    dados: 'text-secondary bg-secondary/10 border-secondary/30',
    api: 'text-primary bg-primary/10 border-primary/30',
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar aos projetos
        </Link>

        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
          <div className="h-64 bg-gradient-to-br from-primary/20 via-card to-secondary/20 flex items-center justify-center">
            <span className="text-8xl">
              {project.category === 'dados' ? '📊' : project.category === 'api' ? '🔌' : '💻'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[project.category]}`}>
                  {project.category.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-slate-300 text-lg leading-relaxed">{project.longDescription}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Destaques</h2>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-darker border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 bg-card border border-border rounded text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.apis && (
              <div className="bg-darker border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">APIs Usadas</h3>
                <ul className="space-y-2">
                  {project.apis.map((api) => (
                    <li key={api} className="text-sm text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {api}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" /> Ver Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border text-white rounded-xl hover:border-primary/50 transition-colors font-medium"
                >
                  <Github className="w-4 h-4" /> Código no GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
