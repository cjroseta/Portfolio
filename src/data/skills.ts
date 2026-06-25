export interface Skill {
  name: string
  level: number
  category: 'linguagem' | 'framework' | 'dados' | 'ferramenta' | 'banco'
  icon: string
}

export const skills: Skill[] = [
  // Linguagens & Frameworks
  { name: 'PHP', level: 55, category: 'linguagem', icon: '🐘' },
  { name: 'JavaScript', level: 30, category: 'linguagem', icon: '⚡' },
  { name: 'Python', level: 40, category: 'linguagem', icon: '🐍' },
  { name: 'Java', level: 45, category: 'linguagem', icon: '☕' },
  { name: 'Codeigniter', level: 65, category: 'framework', icon: '🔥' },
  { name: 'Laravel', level: 45, category: 'framework', icon: '🔺' },
  { name: 'jQuery', level: 95, category: 'framework', icon: '💎' },
  { name: 'Ajax', level: 73, category: 'framework', icon: '🔄' },
  { name: 'VueJs', level: 60, category: 'framework', icon: '💚' },
  { name: 'SpringBoot', level: 26, category: 'framework', icon: '🍃' },
  // Dados & Analytics
  { name: 'Power BI', level: 75, category: 'dados', icon: '📊' },
  { name: 'Jupyter Notebook', level: 95, category: 'dados', icon: '📓' },
  { name: 'PyCharm', level: 73, category: 'dados', icon: '🐼' },
  { name: 'Excel', level: 60, category: 'dados', icon: '📈' },
  // Ferramentas
  { name: 'Odoo Studio', level: 70, category: 'ferramenta', icon: '⚙️' },
  { name: 'Visual Studio', level: 85, category: 'ferramenta', icon: '💻' },
  { name: 'Git & GitHub', level: 30, category: 'ferramenta', icon: '🐙' },
  { name: 'Postman', level: 32, category: 'ferramenta', icon: '📬' },
  { name: 'Eclipse', level: 45, category: 'ferramenta', icon: '🌙' },
  // Banco de Dados
  { name: 'MySQL', level: 55, category: 'banco', icon: '🗄️' },
  { name: 'PostgreSQL', level: 45, category: 'banco', icon: '🐘' },
  { name: 'MS Access', level: 75, category: 'banco', icon: '🗃️' },
]

export const timeline = [
  {
    year: 'Jul 2023 — Out 2024',
    title: 'Técnico de Novos Projectos (Consultor ERP, Analista de Dados)',
    company: 'SMP, SA — Maputo',
    description: 'Administração do ERP Odoo, configuração de módulos CRM, desenvolvimento de novos módulos, implementação de websites (SMP, Mozago, Isection, Padel Club) e análise de dados dos sistemas.',
  },
  {
    year: 'Jan 2022 — Mai 2023',
    title: 'Analista de Dados & Desenvolvedor de Software',
    company: 'Cometal, SARL — Matola',
    description: 'Desenvolvimento e implementação de sistema de gestão de operações (ordens de serviço, estoque, compras, vendas, manutenção). Extração, limpeza e tratamento de dados em Excel e Power BI.',
  },
  {
    year: 'Fev 2019 — Nov 2021',
    title: 'Analista de Dados',
    company: 'Paytech, S.A. — Maputo',
    description: 'Extração, limpeza e preparação de dados. Validação de dados, ticketing e facturamento. Análise de bilhética e produção de relatórios de vendas, operações e finanças.',
  },
]

export const certifications = [
  { year: '2025', title: 'DAX Fundamental', institution: 'Xperiun — Online' },
  { year: '2024', title: 'Monitoria e Avaliação de Projectos', institution: 'SENTI PENSAR — Online' },
  { year: '2023–2024', title: 'Power BI do Básico ao Avançado', institution: 'Udemy — Stefano Larmelina' },
  { year: '2023–2024', title: 'Microsoft Excel Completo', institution: 'Udemy — João Paulo de Lira' },
  { year: '2023–2024', title: 'Mastering Odoo Development', institution: 'Udemy — Odoo Class Video' },
  { year: '2019–2023', title: 'Webmaster Front-End Completo', institution: 'Danki Code — 81h' },
  { year: '2019–2023', title: 'Desenvolvimento Web Completo', institution: 'Danki Code — 84h' },
  { year: '2019–2023', title: 'PHP Jedai', institution: 'Danki Code — 27h' },
]
