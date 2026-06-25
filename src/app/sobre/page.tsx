import { skills, timeline } from '@/data/skills'
import { Download, MapPin, Calendar } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  linguagem: 'Linguagens',
  framework: 'Frameworks & Libs',
  dados: 'Dados & Analytics',
  ferramenta: 'Ferramentas',
}

const categoryColors: Record<string, string> = {
  linguagem: 'text-primary border-primary/30 bg-primary/5',
  framework: 'text-secondary border-secondary/30 bg-secondary/5',
  dados: 'text-accent border-accent/30 bg-accent/5',
  ferramenta: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
}

export default function SobrePage() {
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] || []), s]
    return acc
  }, {})

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-20">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5">
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">Sobre mim</h1>
            <div className="flex items-center gap-4 text-slate-400 text-sm mb-6">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Moçambique</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Disponível agora</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg mb-4">
              Sou um desenvolvedor de software e analista de dados com paixão por construir soluções que unem tecnologia e dados. Trabalho com APIs, visualização de dados e aplicações web modernas.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Tenho experiência em desenvolvimento full-stack com Next.js e Python, integração de APIs REST, e análise de dados com Pandas e Plotly. Gosto de transformar problemas complexos em interfaces simples e intuitivas.
            </p>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/80 transition-colors"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">Stack Técnica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  {categoryLabels[category]}
                </h3>
                <div className="space-y-3">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="flex items-center gap-2 text-white">
                          <span>{skill.icon}</span> {skill.name}
                        </span>
                        <span className="text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Percurso</h2>
          <div className="relative border-l-2 border-border pl-8 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary border-2 border-dark" />
                <p className="text-primary text-sm font-medium mb-1">{item.year}</p>
                <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
