import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react'
import { projects } from '@/data/projects'
import CaseStudyArchitecture from '@/components/CaseStudyArchitecture'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const categoryColors = {
    dev: 'text-accent bg-accent/10 border-accent/30',
    dados: 'text-secondary bg-secondary/10 border-secondary/30',
    api: 'text-primary bg-primary/10 border-primary/30',
    'case-study': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
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
              {project.category === 'case-study' ? '🏆' : project.category === 'dados' ? '📊' : project.category === 'api' ? '🔌' : '💻'}
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

            {project.caseStudy && (
              <div className="space-y-8 pt-2">
                {project.caseStudy.businessContext && (
                  <CaseStudySection title="Contexto de Negócio">
                    <p className="text-slate-300 leading-relaxed">{project.caseStudy.businessContext}</p>
                  </CaseStudySection>
                )}
                <CaseStudySection title="Contexto do Problema">
                  <p className="text-slate-300 leading-relaxed">{project.caseStudy.problem}</p>
                </CaseStudySection>

                <CaseStudySection title="Objectivos">
                  <ul className="space-y-2">
                    {project.caseStudy.objectives.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>

                <CaseStudySection title="Arquitectura">
                  <p className="text-slate-300 leading-relaxed mb-5">{project.caseStudy.architecture}</p>
                  <CaseStudyArchitecture nodes={project.caseStudy.diagramFlow} label={`Fluxo de arquitectura: ${project.title}`} />
                </CaseStudySection>

                <CaseStudySection title="Processo de Desenvolvimento">
                  <p className="text-slate-300 leading-relaxed">{project.caseStudy.process}</p>
                </CaseStudySection>

                <CaseStudySection title="Desafios Encontrados">
                  <ul className="space-y-2">
                    {project.caseStudy.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>

                <CaseStudySection title="Solução Implementada">
                  <p className="text-slate-300 leading-relaxed">{project.caseStudy.solution}</p>
                </CaseStudySection>

                <CaseStudySection title="Resultados">
                  <ul className="space-y-2">
                    {project.caseStudy.results.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>

                <CaseStudySection title="Lições Aprendidas">
                  <ul className="space-y-2">
                    {project.caseStudy.lessons.map((l) => (
                      <li key={l} className="flex items-start gap-3 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>

                {project.caseStudy.futureImprovements && (
                  <CaseStudySection title="Evolução Futura">
                    <ul className="space-y-2">
                      {project.caseStudy.futureImprovements.map((improvement) => (
                        <li key={improvement} className="flex items-start gap-3 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CaseStudySection>
                )}
              </div>
            )}
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

function CaseStudySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      {children}
    </div>
  )
}
