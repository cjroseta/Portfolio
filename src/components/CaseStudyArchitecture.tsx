import { ArrowRight } from 'lucide-react'

interface CaseStudyArchitectureProps {
  nodes: string[]
  label: string
}

export default function CaseStudyArchitecture({ nodes, label }: CaseStudyArchitectureProps) {
  return (
    <ol aria-label={label} className="flex flex-wrap items-center gap-2">
      {nodes.map((node, index) => (
        <li key={node} className="flex items-center gap-2 motion-reveal" style={{ animationDelay: `${index * 100}ms` }}>
          <span className="px-3 py-2 rounded-lg bg-darker border border-border text-slate-200 text-sm font-medium">
            {node}
          </span>
          {index < nodes.length - 1 && <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  )
}
