export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  category: 'dev' | 'dados' | 'api'
  stack: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  highlights: string[]
  apis?: string[]
}

export const projects: Project[] = [
  {
    slug: 'github-dashboard',
    title: 'GitHub Activity Dashboard',
    description: 'Dashboard ao vivo com estatísticas do GitHub: repos, linguagens, commits e contribuições.',
    longDescription: 'Consome a GitHub REST API v3 para exibir actividade real do perfil. Mostra repositórios mais populares, linguagens mais usadas, gráfico de contribuições e estrelas recebidas.',
    category: 'api',
    stack: ['Next.js', 'TypeScript', 'Recharts', 'GitHub API', 'Tailwind CSS'],
    image: '/projects/github-dashboard.png',
    demoUrl: undefined,
    githubUrl: '#',
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
    image: '/projects/clima-app.png',
    demoUrl: '/demos/clima',
    githubUrl: '#',
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
    image: '/projects/conversor.png',
    demoUrl: '/demos/conversor',
    githubUrl: '#',
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
    image: '/projects/covid-dashboard.png',
    demoUrl: '#',
    githubUrl: '#',
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
    image: '/projects/mercado.png',
    demoUrl: '/demos/mercado',
    githubUrl: '#',
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
    image: '/projects/news.png',
    demoUrl: '/demos/noticias',
    githubUrl: '#',
    highlights: [
      'Múltiplas fontes de notícias',
      'Filtro por categoria',
      'Análise de sentimento básica',
      'Modo leitura limpo',
    ],
    apis: ['NewsAPI'],
  },
]
