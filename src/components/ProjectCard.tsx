import Link from 'next/link'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Project } from '@/data/projects'

const categoryColors = {
  dev: 'text-accent bg-accent/10 border-accent/30',
  dados: 'text-secondary bg-secondary/10 border-secondary/30',
  api: 'text-primary bg-primary/10 border-primary/30',
}

const categoryLabels = {
  dev: 'Dev',
  dados: 'Dados',
  api: 'API',
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 glow-hover group flex flex-col">
      <div className="h-48 bg-gradient-to-br from-primary/20 via-card to-secondary/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent" />
        <span className="text-5xl">{getEmoji(project.category)}</span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 bg-dark border border-border rounded text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/projetos/${project.slug}`}
          className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
        >
          Ver detalhes <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

function getEmoji(category: string) {
  if (category === 'dados') return '📊'
  if (category === 'api') return '🔌'
  return '💻'
}
