export interface Skill {
  name: string
  level: number
  category: 'linguagem' | 'framework' | 'dados' | 'ferramenta' | 'banco'
  icon: string
}

export const skills: Skill[] = [
  // Linguagens
  { name: 'Python', level: 80, category: 'linguagem', icon: '🐍' },
  { name: 'TypeScript', level: 75, category: 'linguagem', icon: '🔷' },
  { name: 'JavaScript', level: 75, category: 'linguagem', icon: '⚡' },
  { name: 'PHP', level: 55, category: 'linguagem', icon: '🐘' },
  { name: 'Java', level: 40, category: 'linguagem', icon: '☕' },
  // Frameworks & Libs
  { name: 'Odoo Framework (ORM)', level: 90, category: 'framework', icon: '🧩' },
  { name: 'React', level: 75, category: 'framework', icon: '⚛️' },
  { name: 'Node.js / Express', level: 70, category: 'framework', icon: '🟢' },
  { name: 'Tailwind CSS', level: 75, category: 'framework', icon: '🎨' },
  { name: 'jQuery', level: 65, category: 'framework', icon: '💎' },
  { name: 'Laravel', level: 45, category: 'framework', icon: '🔺' },
  // Dados & Analytics
  { name: 'Power BI', level: 75, category: 'dados', icon: '📊' },
  { name: 'Odoo Spreadsheets/BI', level: 85, category: 'dados', icon: '📈' },
  { name: 'Jupyter Notebook', level: 80, category: 'dados', icon: '📓' },
  { name: 'Excel', level: 65, category: 'dados', icon: '📉' },
  // Ferramentas
  { name: 'Git & GitHub', level: 80, category: 'ferramenta', icon: '🐙' },
  { name: 'Odoo SH', level: 85, category: 'ferramenta', icon: '☁️' },
  { name: 'Odoo Studio', level: 80, category: 'ferramenta', icon: '⚙️' },
  { name: 'REST APIs', level: 75, category: 'ferramenta', icon: '🔌' },
  { name: 'Visual Studio Code', level: 85, category: 'ferramenta', icon: '💻' },
  { name: 'Postman', level: 60, category: 'ferramenta', icon: '📬' },
  // Banco de Dados
  { name: 'PostgreSQL', level: 80, category: 'banco', icon: '🐘' },
  { name: 'MySQL', level: 55, category: 'banco', icon: '🗄️' },
  { name: 'MS Access', level: 50, category: 'banco', icon: '🗃️' },
]

export const timeline = [
  {
    year: 'Mar 2025 — Presente',
    title: 'Software Engineer — ERP, Integrações & Business Intelligence',
    company: 'Dalima, Lda — Maputo',
    description: 'Liderei a migração completa do ERP Odoo da v17 para a v18 e a transição para Odoo SH, sem interrupção da operação, incluindo a preparação técnica para a migração à v19. Desenvolvi módulos Odoo personalizados e integrações via API seguindo a arquitectura nativa da plataforma (Python, XML, PostgreSQL), com fluxo de desenvolvimento em GitHub + Odoo SH. Construí do zero uma plataforma de Business Intelligence com 8 dashboards (Executivo, Comercial, Financeiro, Financeiro Detalhado, Vendas, Performance e Rede/Estado de Painéis) usando React, TypeScript, Node.js, Express e PostgreSQL. Desenvolvi um RPA que eliminou mais de 500.000 utilizadores públicos obsoletos do Odoo, contornando uma limitação de timeout da plataforma. Descontinuei um fornecedor externo de gestão do ambiente Odoo, eliminando um custo recorrente de ~300€/mês. Adicionalmente, geri a administração de softwares (Microsoft 365, Scala Content Manager, TeamViewer, Bluehost, entre outros), infraestrutura digital, websites corporativos e suporte tecnológico a toda a empresa, incluindo a abertura de uma nova empresa do grupo.',
  },
  {
    year: 'Out 2024 — Jan 2025',
    title: 'Analista de Dados',
    company: 'Grupo CB — Maputo',
    description: 'Extração, limpeza e tratamento de dados dos sistemas internos do grupo. Desenvolvimento de relatórios e dashboards para apoio à tomada de decisão nas áreas de vendas, finanças e operações. Monitorização de KPIs, análise de performance e produção de relatórios periódicos para a gestão.',
  },
  {
    year: 'Jul 2023 — Out 2024',
    title: 'Técnico de Novos Projectos (Consultor ERP, Desenvolvimento Web)',
    company: 'SMP, SA — Maputo',
    description: 'Administração do ERP Odoo e desenvolvimento de módulos (CRM, Vendas, Inventário e outros) conforme os requisitos de cada área. Concepção e implementação de 4 websites corporativos (SMP, Mozago, Isection, Padel Club). Administração de sistemas de terceiros (Hik Connect, Hikvision, Book 24) com análise dos dados gerados, e formação interna sobre o Odoo.',
  },
  {
    year: 'Jan 2022 — Mai 2023',
    title: 'Técnico de Informática Jr.',
    company: 'Cometal, SARL — Matola',
    description: 'Desenvolvimento de um sistema web interno de gestão de operações (ordens de serviço, stock, compras, vendas, manutenção, contas a receber/pagar) em PHP, JavaScript e jQuery. Suporte técnico (Helpdesk) de primeiro e segundo nível aos colaboradores da fábrica, incluindo gestão de postos de trabalho, periféricos e contas de utilizador. Administração do sistema de assiduidade MIPS e tratamento de dados em Excel e Power BI.',
  },
  {
    year: 'Fev 2019 — Nov 2021',
    title: 'Analista de Dados',
    company: 'Paytech, S.A. — Maputo',
    description: 'Extracção, limpeza e validação de dados de bilhética e facturação em múltiplos canais de venda. Análise do volume de bilhetes vendidos por canal, período e rota (comboio e machimbombo). Elaboração de relatórios financeiros e periódicos para marketing, vendas e operações.',
  },
]

export const certifications = [
  { year: '2025', title: 'DAX Fundamental', institution: 'Xperiun — Online' },
  { year: '2024', title: 'Monitoria e Avaliação de Projectos', institution: 'SENTI PENSAR — Online' },
  { year: '2023–2024', title: 'Power BI Fundamental: Do Básico ao Avançado', institution: 'Udemy — Stefano Larmelina · 13.5h' },
  { year: '2023–2024', title: 'Curso Completo de Microsoft Excel', institution: 'Udemy — João Paulo de Lira · 11.5h' },
  { year: '2023–2024', title: 'Master Odoo Studio', institution: 'Udemy — Quisar Aldomur · 4h' },
  { year: '2023–2024', title: 'Odoo ERP From Zero to Hero (Learning by Doing)', institution: 'Udemy — Othmane Ghandi · 3h' },
  { year: '2023–2024', title: 'Mastering Odoo Development (Technical Fundamentals)', institution: 'Udemy — Odoo Class Video · 10.5h' },
  { year: '2023–2024', title: 'Odoo: The Complete Master Class — Beginner to Professional', institution: 'Udemy — Ahbilash Nelson · 5h' },
  { year: '2019–2023', title: 'Webmaster Front-End Completo', institution: 'Danki Code — 81h' },
  { year: '2019–2023', title: 'Webmaster Front-End Moderno 2.0', institution: 'Danki Code — 10h' },
  { year: '2019–2023', title: 'Desenvolvimento Web Completo', institution: 'Danki Code — 84h' },
  { year: '2019–2023', title: 'Web Design Express', institution: 'Danki Code — 13h' },
  { year: '2019–2023', title: 'PHP Jedai', institution: 'Danki Code — 27h' },
  { year: 'Em curso', title: 'Gestão de Projeto', institution: 'VEDUCA — 35%' },
  { year: 'Em curso', title: 'Comunicação Oral e Escrita', institution: 'Fundação BRADESCO — 25%' },
]
