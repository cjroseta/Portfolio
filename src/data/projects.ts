export interface CaseStudyDetail {
  businessContext?: string
  problem: string
  objectives: string[]
  architecture: string
  diagramFlow: string[]
  process: string
  challenges: string[]
  solution: string
  results: string[]
  lessons: string[]
  futureImprovements?: string[]
}

export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  category: 'dev' | 'dados' | 'api' | 'case-study'
  stack: string[]
  demoUrl?: string
  githubUrl?: string
  highlights: string[]
  apis?: string[]
  caseStudy?: CaseStudyDetail
}

export const projects: Project[] = [
  {
    slug: 'odoo-migration-v18-sh',
    title: 'Migrações Odoo v15 → v18, Odoo SH & Preparação v19',
    description: 'Evolução de ambientes Odoo entre versões, com transição para Odoo SH e continuidade operacional.',
    longDescription: 'Experiência de migração e evolução de ambientes Odoo nas versões 15, 16, 17 e 18, incluindo transição para Odoo SH e preparação técnica para a migração futura à v19.',
    category: 'case-study',
    stack: ['Odoo 18', 'Odoo SH', 'Python', 'XML', 'PostgreSQL', 'Git/GitHub'],
    highlights: [
      'Zero interrupção da operação durante a migração',
      'Módulos customizados reescritos seguindo a arquitectura nativa do Odoo',
      'Fluxo de desenvolvimento versionado em Git/GitHub',
      'Base técnica pronta para a migração à v19',
    ],
    caseStudy: {
      businessContext: 'O ERP suportava processos diários de vendas, finanças e operações. A evolução entre versões 15, 16, 17 e 18 tinha de preservar a continuidade de serviço e tornar os módulos customizados sustentáveis para futuras actualizações.',
      problem: 'O ERP da empresa (Odoo v17) estava tecnicamente desactualizado, com módulos customizados desenvolvidos ad-hoc e sem controlo de versões. Qualquer alteração corria o risco de quebrar processos críticos de Vendas, Finanças e Operações usados diariamente por toda a empresa.',
      objectives: [
        'Evoluir o ERP entre as versões 15, 16, 17 e 18 sem interromper a operação diária',
        'Mover a infraestrutura para Odoo SH (plataforma cloud oficial)',
        'Estabelecer um fluxo de desenvolvimento versionado (Git/GitHub) para os módulos customizados',
        'Preparar tecnicamente a base para a migração futura à v19',
      ],
      architecture: 'Ambiente de staging em Odoo SH replicando produção, com branches Git dedicados por módulo customizado. O pipeline de deploy do Odoo SH (build → staging → produção) substituiu deployments manuais, e os módulos customizados foram reescritos para seguir a arquitectura nativa do ORM do Odoo, evitando overrides frágeis.',
      diagramFlow: ['Odoo 15/16/17', 'Staging', 'Migração por módulo + testes', 'Odoo 18 em Odoo SH', 'Preparação Odoo 19'],
      process: 'Auditoria de todos os módulos customizados existentes para mapear dependências e overrides fora do padrão Odoo. Configuração de um ambiente de staging isolado em Odoo SH. Migração incremental por módulo, com testes funcionais por área de negócio antes de cada promoção a produção. Migração final executada fora do horário de pico, com plano de rollback preparado.',
      challenges: [
        'Módulos customizados legados sem versionamento, com lógica implícita conhecida apenas por uso',
        'Impossibilidade de parar a operação da empresa durante a migração',
        'Diferenças de comportamento do ORM entre versões que quebravam customizações silenciosamente',
      ],
      solution: 'Reescrita dos módulos mais críticos seguindo os padrões nativos do Odoo em vez de overrides directos, o que tornou a preparação para a v19 significativamente mais simples. Adopção de Git/GitHub como fonte única de verdade para o código, eliminando alterações directas em produção.',
      results: [
        'Migração para v18 e Odoo SH concluída sem interrupção da operação',
        'Base técnica pronta para a migração à v19',
        'Todo o código customizado versionado e auditável no GitHub',
        'Redução do risco de regressões em futuras actualizações',
      ],
      lessons: [
        'Seguir a arquitectura nativa do Odoo desde o início poupa múltiplas migrações de dor',
        'Um ambiente de staging fiel à produção é inegociável em migrações de ERP',
        'Versionamento não é opcional em sistemas usados por toda a empresa',
      ],
      futureImprovements: [
        'Concluir a validação de compatibilidade e o plano de migração para Odoo 19',
        'Aumentar a cobertura de testes automatizados dos módulos customizados',
      ],
    },
  },
  {
    slug: 'plataforma-bi-dalima',
    title: 'Plataforma de Business Intelligence — 8 Dashboards',
    description: 'Plataforma de BI construída do zero para dar à gestão visibilidade em tempo real sobre vendas, finanças e operações.',
    longDescription: 'Plataforma de Business Intelligence com 8 dashboards especializados (Executivo, Comercial, Financeiro, Financeiro Detalhado, Vendas, Performance, Rede de Painéis e Estado de Painéis), construída para substituir relatórios manuais dispersos em Excel.',
    category: 'case-study',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Tailwind CSS'],
    highlights: [
      '8 dashboards especializados em produção',
      'Dados agregados em tempo real via API própria',
      'Substituiu relatórios manuais recorrentes em Excel',
      'Usado diariamente pela gestão',
    ],
    caseStudy: {
      businessContext: 'A gestão precisava de uma visão consistente de vendas, finanças e operações, sem depender de exportações manuais e ficheiros Excel dispersos.',
      problem: 'A gestão tomava decisões com base em relatórios manuais, exportados periodicamente do Odoo para Excel por diferentes pessoas, sem padrão nem frequência garantida. Não existia uma visão consolidada e em tempo real do negócio.',
      objectives: [
        'Centralizar os indicadores de negócio numa única plataforma',
        'Eliminar a dependência de exportações manuais para Excel',
        'Fornecer dashboards especializados por área: Executivo, Comercial, Financeiro, Vendas, Performance e Rede de Painéis',
      ],
      architecture: 'Frontend em React + TypeScript consumindo uma API própria em Node.js/Express, que agrega dados de PostgreSQL e do Odoo. Camada de serviços separada por domínio (vendas, financeiro, painéis), com queries e agregações pré-calculadas para os dashboards mais pesados.',
      diagramFlow: ['Odoo + PostgreSQL', 'API Node.js/Express', 'Agregações & Cache', 'Frontend React/TypeScript', '8 Dashboards especializados'],
      process: 'Levantamento dos indicadores realmente usados pela gestão, em vez de expor todos os dados disponíveis. Desenho de um modelo de dados intermédio para não sobrecarregar o Odoo com queries analíticas pesadas. Construção incremental, começando pelo Dashboard Executivo, seguido dos dashboards departamentais e, por fim, dos dashboards operacionais.',
      challenges: [
        'Extrair dados fiáveis de um Odoo em migração activa, sem duplicar esforço de manutenção',
        'Definir a granularidade certa dos KPIs para cada audiência (Executivo vs. Operacional)',
        'Garantir performance dos dashboards com dados actualizados frequentemente',
      ],
      solution: 'Construção de uma API intermédia em Node/Express que isola os dashboards das mudanças internas do Odoo, com cache e agregações pré-calculadas para os relatórios mais pesados (Financeiro Detalhado, Rede de Painéis).',
      results: [
        '8 dashboards em produção, usados diariamente pela gestão',
        'Eliminação de relatórios manuais recorrentes em Excel',
        'Decisões de negócio baseadas em dados actualizados, não em exportações pontuais',
      ],
      lessons: [
        'Nem todos os dados merecem um dashboard — a análise de audiência define o desenho',
        'Isolar o BI do sistema fonte (Odoo) numa camada própria evita acoplamento frágil',
        'Construir de forma incremental permite validar valor cedo',
      ],
      futureImprovements: [
        'Evoluir a monitorização de qualidade e actualização dos dados',
        'Adicionar documentação de contratos e indicadores para cada domínio',
      ],
    },
  },
  {
    slug: 'rpa-saneamento-odoo',
    title: 'RPA — Remoção de 500.000+ Utilizadores Obsoletos',
    description: 'Automação que resolveu uma limitação de timeout do Odoo, permitindo o saneamento de uma base histórica de meio milhão de registos.',
    longDescription: 'Desenvolvimento de um RPA para remover em segurança mais de 500.000 utilizadores públicos obsoletos do Odoo, contornando uma limitação de timeout da plataforma em operações de remoção em massa.',
    category: 'case-study',
    stack: ['Python', 'Odoo ORM', 'RPA', 'PostgreSQL'],
    highlights: [
      'Mais de 500.000 registos processados',
      'Contorna limitação nativa de timeout do Odoo',
      'Execução em lotes com checkpoints, sem intervenção manual',
      'Processo reutilizável para futuros saneamentos',
    ],
    caseStudy: {
      businessContext: 'A acumulação histórica de utilizadores públicos obsoletos afectava operações de dados e exigia uma abordagem segura, auditável e compatível com os limites da plataforma.',
      problem: 'A base de utilizadores públicos do Odoo acumulou, ao longo dos anos, mais de 500.000 registos obsoletos, degradando a performance de queries e relatórios. A remoção directa em lote esbarrava sistematicamente num timeout da plataforma, que interrompia a operação a meio.',
      objectives: [
        'Remover com segurança os registos obsoletos sem afectar utilizadores activos',
        'Contornar a limitação de timeout nativa do Odoo em operações em massa',
        'Executar o processo sem necessidade de supervisão manual contínua',
      ],
      architecture: 'Script de automação (RPA) que actua em lotes pequenos e controlados via ORM do Odoo, com checkpoints e retomada automática em caso de falha, respeitando os limites de transacção da plataforma em vez de tentar uma operação massiva única.',
      diagramFlow: ['Base c/ 500k+ registos obsoletos', 'RPA em lotes (Python + ORM)', 'Checkpoint & retomada automática', 'Base saneada'],
      process: 'Identificação do critério de "obsoleto" em conjunto com a área de negócio. Testes num ambiente de staging com uma amostra da base para validar critérios e detectar dependências antes de tocar em dados de produção. Execução faseada em produção, com logging de cada lote processado.',
      challenges: [
        'Timeout da plataforma em qualquer operação de remoção em massa via interface nativa',
        'Risco de remover registos com dependências ocultas (ligações a documentos históricos)',
        'Necessidade de correr o processo sem impacto perceptível na operação diária',
      ],
      solution: 'Processamento em lotes pequenos com controlo de estado entre execuções, permitindo que o RPA fosse pausado e retomado sem perder progresso nem duplicar trabalho — contornando definitivamente a limitação de timeout.',
      results: [
        'Mais de 500.000 utilizadores obsoletos removidos com segurança',
        'Melhoria de performance em queries e relatórios que dependiam da tabela de utilizadores',
        'Processo reutilizável para futuros saneamentos de dados',
      ],
      lessons: [
        'Limitações de plataforma (timeouts) muitas vezes pedem uma mudança de abordagem, não mais força bruta',
        'Processos em lote com checkpoints são mais robustos do que tentar fazer tudo de uma vez',
        'Validar critérios de negócio em staging evita remoções irreversíveis incorrectas',
      ],
      futureImprovements: [
        'Formalizar o processo como rotina de qualidade de dados',
        'Adicionar métricas de execução e alertas para novos registos obsoletos',
      ],
    },
  },
  {
    slug: 'odoo-modules-contracts-service-orders',
    title: 'Módulos Odoo — Contratos e Ordens de Serviço',
    description: 'Módulos empresariais para substituir processos manuais, controlar workflows e garantir rastreabilidade operacional.',
    longDescription: 'Desenvolvimento de módulos Odoo para gestão do ciclo de vida de contratos e ordens de serviço de produção e campanhas, estruturando regras de negócio dentro do ERP.',
    category: 'case-study',
    stack: ['Odoo', 'Python', 'XML', 'PostgreSQL', 'Odoo ORM'],
    highlights: ['Workflow e rastreabilidade de ordens', 'Gestão do ciclo de vida de contratos', 'Substituição de processos manuais em Word e Excel'],
    caseStudy: {
      businessContext: 'Processos de contratos e ordens de serviço dependiam de documentos e folhas de cálculo, dificultando controlo operacional e auditoria.',
      problem: 'Era necessário centralizar regras, estados, responsabilidades e histórico no ERP sem duplicar informação.',
      objectives: ['Digitalizar o workflow de contratos e ordens', 'Garantir rastreabilidade por processo e estado'],
      architecture: 'Módulos customizados no Odoo, com modelos ORM, regras de negócio em Python, vistas XML e dados persistidos em PostgreSQL.',
      diagramFlow: ['Utilizador', 'Módulo Odoo', 'Workflow e regras', 'PostgreSQL', 'Rastreabilidade'],
      process: 'Levantamento dos processos com as áreas de negócio, modelação dos estados, implementação incremental e validação funcional.',
      challenges: ['Traduzir procedimentos informais em regras explícitas', 'Manter compatibilidade com processos Odoo existentes'],
      solution: 'Criação de módulos que centralizam o ciclo de vida, os estados e a informação operacional dentro do ERP.',
      results: ['Menor dependência de Word e Excel', 'Maior visibilidade e rastreabilidade operacional'],
      lessons: ['As regras de negócio devem estar no modelo, não dispersas nas vistas', 'A validação funcional é essencial em workflows ERP'],
      futureImprovements: ['Adicionar testes automatizados por workflow', 'Evoluir dashboards de acompanhamento operacional'],
    },
  },
  {
    slug: 'scala-content-manager-api-reporting',
    title: 'Scala Content Manager API & Reporting',
    description: 'Integração entre Scala, Odoo e Business Intelligence para campanhas, ocupação, veiculação e reporting executivo.',
    longDescription: 'Plataforma de integração que centraliza dados operacionais do Scala Content Manager no Odoo e suporta relatórios de veiculação de campanhas e relatórios executivos.',
    category: 'case-study',
    stack: ['REST APIs', 'Odoo', 'Python', 'PostgreSQL', 'Business Intelligence'],
    highlights: ['Sincronização de campanhas e ocupação', 'Dados operacionais centralizados no Odoo', 'Relatórios de veiculação e executivos'],
    caseStudy: {
      businessContext: 'Dados de campanhas e painéis estavam no Scala Content Manager, enquanto a gestão precisava de contexto comercial, operacional e executivo no ERP.',
      problem: 'A ausência de integração criava informação fragmentada e relatórios manuais de veiculação.',
      objectives: ['Sincronizar campanhas e ocupação', 'Apoiar relatórios operacionais e executivos'],
      architecture: 'Scala Content Manager comunica por REST API com uma camada de integração que actualiza dados no Odoo e alimenta indicadores de BI.',
      diagramFlow: ['Scala Content Manager', 'REST API', 'Odoo', 'BI', 'Relatórios'],
      process: 'Mapeamento dos dados, definição de sincronizações, validação com utilizadores de negócio e evolução dos relatórios.',
      challenges: ['Alinhar dados operacionais e comerciais', 'Garantir confiança nos indicadores entregues a clientes e gestão'],
      solution: 'Centralização das informações no Odoo e automatização do fluxo de dados para reporting de campanhas e gestão.',
      results: ['Maior visibilidade sobre campanhas e ocupação', 'Base integrada para relatórios de veiculação e decisões executivas'],
      lessons: ['Integrações devem tratar explicitamente qualidade e reconciliação de dados', 'Reporting deve partir das decisões que o negócio precisa de tomar'],
      futureImprovements: ['Documentar contratos de API e erros de sincronização', 'Adicionar monitorização e alertas de qualidade de dados'],
    },
  },
  {
    slug: 'izi-dashboard-odoo-18',
    title: 'Implementação IZI Dashboard em Odoo 18',
    description: 'Análise de compatibilidade, adaptação, deployment e validação de aplicação third-party para Odoo 18.',
    longDescription: 'Implementação e integração do IZI Dashboard em Odoo 18, com validação de compatibilidade e configuração para utilização empresarial.',
    category: 'case-study',
    stack: ['Odoo 18', 'Odoo SH', 'Python', 'XML', 'PostgreSQL'],
    highlights: ['Análise de compatibilidade', 'Adaptação e deployment', 'Configuração e validação funcional'],
    caseStudy: {
      businessContext: 'A organização precisava de disponibilizar dashboards no Odoo 18 usando uma aplicação third-party adequada ao ambiente existente.',
      problem: 'A aplicação exigia validação de compatibilidade e adaptação antes de poder ser usada com confiança em produção.',
      objectives: ['Avaliar compatibilidade com Odoo 18', 'Configurar e validar a solução para utilização operacional'],
      architecture: 'Aplicação IZI Dashboard integrada no ambiente Odoo 18, configurada e validada sobre os modelos e dados do ERP.',
      diagramFlow: ['Odoo 18', 'IZI Dashboard', 'Configuração', 'Validação', 'Utilizadores'],
      process: 'Análise técnica, adaptação necessária, deployment, configuração e testes de validação com o contexto de negócio.',
      challenges: ['Distinguir limites do produto third-party de necessidades específicas do negócio', 'Reduzir risco de incompatibilidades na versão alvo'],
      solution: 'Implementação controlada, com análise de compatibilidade e validação antes da disponibilização aos utilizadores.',
      results: ['Dashboard third-party adaptado e integrado no Odoo 18', 'Solução posicionada como implementação empresarial, não desenvolvimento de raiz'],
      lessons: ['Produtos third-party exigem avaliação técnica antes de deployment', 'A validação de versão deve anteceder a configuração funcional'],
      futureImprovements: ['Registar decisões de compatibilidade e configuração', 'Planear revisão de compatibilidade para Odoo 19'],
    },
  },
  {
    slug: 'github-dashboard',
    title: 'GitHub Activity Dashboard',
    description: 'Dashboard ao vivo com estatísticas do GitHub: repos, linguagens, commits e contribuições.',
    longDescription: 'Consome a GitHub REST API v3 para exibir actividade real do perfil. Mostra repositórios mais populares, linguagens mais usadas, gráfico de contribuições e estrelas recebidas.',
    category: 'api',
    stack: ['Next.js', 'TypeScript', 'Recharts', 'GitHub API', 'Tailwind CSS'],
    highlights: [
      'Dados em tempo real da GitHub API',
      'Gráfico de linguagens de programação',
      'Repositórios mais populares por estrelas',
      'Cache com revalidação a cada hora',
    ],
    apis: ['GitHub REST API v3'],
  },
  {
    slug: 'clima-app',
    title: 'App de Clima em Tempo Real',
    description: 'Consulta o clima de qualquer cidade com previsão de 7 dias e gráficos de temperatura.',
    longDescription: 'Integração com OpenWeatherMap API para dados meteorológicos em tempo real. Inclui geolocalização automática, busca por cidade, previsão de 7 dias e gráfico de variação de temperatura.',
    category: 'api',
    stack: ['Next.js', 'TypeScript', 'OpenWeatherMap API', 'Recharts', 'Tailwind CSS'],
    demoUrl: '/demos/clima',
    highlights: [
      'Geolocalização automática',
      'Previsão de 5 dias',
      'Gráfico de temperatura interactivo',
      'Ícones dinâmicos por condição climática',
    ],
    apis: ['OpenWeatherMap API'],
  },
  {
    slug: 'conversor-moedas',
    title: 'Conversor de Moedas Global',
    description: 'Converte entre 170+ moedas com taxas actualizadas e historial de variação.',
    longDescription: 'Usa a ExchangeRate-API gratuita para conversão em tempo real entre mais de 170 moedas. Inclui gráfico de evolução das taxas e favoritos guardados localmente.',
    category: 'api',
    stack: ['Next.js', 'TypeScript', 'ExchangeRate API', 'Recharts', 'LocalStorage'],
    demoUrl: '/demos/conversor',
    highlights: [
      '170+ moedas suportadas',
      'Taxas actualizadas diariamente',
      'Histórico de conversões',
      'Moedas favoritas',
    ],
    apis: ['ExchangeRate-API'],
  },
  {
    slug: 'analise-covid',
    title: 'Dashboard COVID-19 Global',
    description: 'Painel de análise de dados da pandemia com gráficos interactivos por país.',
    longDescription: 'Análise visual de dados globais da COVID-19 usando a disease.sh API. Compara casos, mortes e recuperações entre países com gráficos de série temporal.',
    category: 'dados',
    stack: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'disease.sh API'],
    highlights: [
      'Comparação entre países',
      'Série temporal interactiva',
      'Mapa mundial de casos',
      'Análise estatística com Pandas',
    ],
    apis: ['disease.sh API'],
  },
  {
    slug: 'analise-mercado',
    title: 'Análise de Mercado Financeiro',
    description: 'Visualiza cotações históricas de acções e calcula indicadores técnicos.',
    longDescription: 'Usa a Alpha Vantage API para obter dados históricos de acções. Calcula médias móveis, RSI e volume. Dashboard interactivo com Recharts e análise em tempo real.',
    category: 'dados',
    stack: ['Next.js', 'TypeScript', 'Alpha Vantage API', 'Recharts', 'Tailwind CSS'],
    demoUrl: '/demos/mercado',
    highlights: [
      'Dados históricos de acções',
      'Indicadores técnicos (MA, RSI)',
      'Gráfico de candlestick',
      'Análise de volume',
    ],
    apis: ['Alpha Vantage API'],
  },
  {
    slug: 'news-aggregator',
    title: 'Agregador de Notícias Tech',
    description: 'Agrega notícias de tecnologia de múltiplas fontes com análise de sentimento.',
    longDescription: 'Consome a NewsAPI para agregar artigos de tecnologia. Categoriza por tema, detecta sentimento dos títulos e exibe tendências. Interface limpa com filtros por fonte e data.',
    category: 'dev',
    stack: ['Next.js', 'TypeScript', 'NewsAPI', 'Tailwind CSS', 'Vercel'],
    demoUrl: '/demos/noticias',
    highlights: [
      'Múltiplas fontes de notícias',
      'Filtro por categoria',
      'Análise de sentimento básica',
      'Modo leitura limpo',
    ],
    apis: ['NewsAPI'],
  },
]
