export interface Skill {
  name: string
  level: number
  category: 'linguagem' | 'framework' | 'dados' | 'ferramenta'
  icon: string
}

export const skills: Skill[] = [
  { name: 'Python', level: 90, category: 'linguagem', icon: '🐍' },
  { name: 'JavaScript', level: 85, category: 'linguagem', icon: '⚡' },
  { name: 'TypeScript', level: 80, category: 'linguagem', icon: '🔷' },
  { name: 'SQL', level: 85, category: 'linguagem', icon: '🗄️' },
  { name: 'Next.js', level: 80, category: 'framework', icon: '▲' },
  { name: 'React', level: 82, category: 'framework', icon: '⚛️' },
  { name: 'FastAPI', level: 75, category: 'framework', icon: '🚀' },
  { name: 'Tailwind CSS', level: 88, category: 'framework', icon: '🎨' },
  { name: 'Pandas', level: 88, category: 'dados', icon: '🐼' },
  { name: 'NumPy', level: 82, category: 'dados', icon: '🔢' },
  { name: 'Matplotlib / Plotly', level: 85, category: 'dados', icon: '📊' },
  { name: 'Power BI', level: 78, category: 'dados', icon: '📈' },
  { name: 'Git / GitHub', level: 88, category: 'ferramenta', icon: '🐙' },
  { name: 'Docker', level: 65, category: 'ferramenta', icon: '🐳' },
  { name: 'VS Code', level: 92, category: 'ferramenta', icon: '💻' },
  { name: 'REST APIs', level: 90, category: 'ferramenta', icon: '🔌' },
]

export const timeline = [
  {
    year: '2024 – Presente',
    title: 'Desenvolvedor Full-Stack & Analista de Dados',
    description: 'Desenvolvimento de aplicações web com Next.js e análise de dados com Python/Pandas.',
  },
  {
    year: '2023',
    title: 'Formação em Ciência de Dados',
    description: 'Conclusão de formação intensiva em análise de dados, machine learning e visualização.',
  },
  {
    year: '2022',
    title: 'Início em Desenvolvimento Web',
    description: 'Primeiros projetos com HTML, CSS, JavaScript e React.',
  },
]
