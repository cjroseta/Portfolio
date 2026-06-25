'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, ArrowLeft, ExternalLink, RefreshCw, Clock, TrendingUp, Newspaper, Smile, Meh, Frown } from 'lucide-react'
import Link from 'next/link'

interface Article {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  source: { name: string }
  author: string | null
}

const CATEGORIES = [
  { id: 'technology', label: '💻 Tecnologia', en: 'technology' },
  { id: 'science', label: '🔬 Ciência', en: 'science' },
  { id: 'business', label: '💼 Negócios', en: 'business' },
  { id: 'health', label: '❤️ Saúde', en: 'health' },
  { id: 'entertainment', label: '🎬 Entretenimento', en: 'entertainment' },
  { id: 'sports', label: '⚽ Desporto', en: 'sports' },
]

// Análise de sentimento básica por palavras-chave
function getSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const pos = ['lança', 'novo', 'recorde', 'sucesso', 'cresce', 'inovação', 'melhora', 'launch', 'new', 'record', 'success', 'growth', 'innovation', 'improve', 'best', 'win', 'award', 'breakthrough']
  const neg = ['crise', 'falha', 'queda', 'risco', 'perigo', 'hack', 'ataque', 'crash', 'fail', 'risk', 'danger', 'attack', 'breach', 'loss', 'ban', 'lawsuit', 'fired', 'cut']
  const lower = text.toLowerCase()
  if (pos.some((w) => lower.includes(w))) return 'positive'
  if (neg.some((w) => lower.includes(w))) return 'negative'
  return 'neutral'
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  const m = Math.floor(diff / 60000)
  if (h >= 24) return `${Math.floor(h / 24)}d atrás`
  if (h >= 1) return `${h}h atrás`
  return `${m}m atrás`
}

const SentimentIcon = ({ s }: { s: 'positive' | 'neutral' | 'negative' }) => {
  if (s === 'positive') return <Smile className="w-3.5 h-3.5 text-accent" />
  if (s === 'negative') return <Frown className="w-3.5 h-3.5 text-secondary" />
  return <Meh className="w-3.5 h-3.5 text-muted" />
}

export default function NoticiasPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('technology')
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const fetchNews = useCallback(async (cat: string, q: string) => {
    setLoading(true); setError('')
    try {
      const params = q ? `?q=${encodeURIComponent(q)}` : `?category=${cat}`
      const res = await fetch(`/api/news${params}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (!data.articles || data.articles.length === 0) throw new Error('Nenhuma notícia encontrada. Verifique a chave NewsAPI no .env.local')
      setArticles(data.articles.filter((a: Article) => a.title && a.title !== '[Removed]'))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchNews(category, '') }, [category])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) { setQuery(search.trim()); fetchNews(category, search.trim()) }
  }

  function clearSearch() { setQuery(''); setSearch(''); fetchNews(category, '') }

  // Estatísticas de sentimento
  const sentiments = articles.map((a) => getSentiment(a.title + ' ' + (a.description || '')))
  const posCount = sentiments.filter((s) => s === 'positive').length
  const negCount = sentiments.filter((s) => s === 'negative').length
  const neuCount = sentiments.filter((s) => s === 'neutral').length

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/projetos" className="p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text">Agregador de Notícias</h1>
            <p className="text-muted text-sm">Notícias ao vivo · Análise de sentimento · NewsAPI</p>
          </div>
          <button onClick={() => fetchNews(category, query)} className="ml-auto p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Busca */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar notícias... (ex: inteligência artificial, bitcoin)"
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-text placeholder-faint focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors font-medium">
            Buscar
          </button>
          {query && (
            <button type="button" onClick={clearSearch} className="px-4 py-3 bg-card border border-border rounded-xl text-muted hover:text-text transition-colors">
              ✕
            </button>
          )}
        </form>

        {/* Filtros de categoria */}
        {!query && (
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.en)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.en
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-card border border-border text-muted hover:text-text hover:border-primary/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {query && (
          <div className="mb-4 flex items-center gap-2 text-sm text-muted">
            <Search className="w-4 h-4" />
            Resultados para: <span className="text-primary font-medium">"{query}"</span>
          </div>
        )}

        {/* Estatísticas de sentimento */}
        {articles.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: Smile, label: 'Positivo', count: posCount, color: 'text-accent', bg: 'bg-accent/10 border-accent/30' },
              { icon: Meh, label: 'Neutro', count: neuCount, color: 'text-muted', bg: 'bg-card border-border' },
              { icon: Frown, label: 'Negativo', count: negCount, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/30' },
            ].map(({ icon: Icon, label, count, color, bg }) => (
              <div key={label} className={`flex items-center gap-3 p-4 rounded-xl border ${bg}`}>
                <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                <div>
                  <p className={`text-xl font-bold ${color}`}>{count}</p>
                  <p className="text-faint text-xs">{label}</p>
                </div>
                <div className="ml-auto">
                  <div className="h-1.5 w-16 bg-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color.replace('text-', 'bg-')}`} style={{ width: `${articles.length ? (count / articles.length) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Controlo de vista */}
        {articles.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted text-sm flex items-center gap-2">
              <Newspaper className="w-4 h-4" /> {articles.length} artigos encontrados
            </p>
            <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
              {(['grid', 'list'] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === v ? 'bg-primary text-white' : 'text-muted hover:text-text'}`}>
                  {v === 'grid' ? '⊞ Grid' : '☰ Lista'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="bg-secondary/10 border border-secondary/30 text-secondary rounded-xl p-5 mb-6">
            <p className="font-semibold mb-1">Erro ao carregar notícias</p>
            <p className="text-sm opacity-80">{error}</p>
            <p className="text-xs mt-2 opacity-60">Regista-te em newsapi.org, obtém a chave gratuita e adiciona NEXT_PUBLIC_NEWS_API_KEY no .env.local</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="h-40 bg-border" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-border rounded w-20" />
                  <div className="h-4 bg-border rounded w-full" />
                  <div className="h-4 bg-border rounded w-3/4" />
                  <div className="h-3 bg-border rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Artigos */}
        {!loading && articles.length > 0 && (
          <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {articles.map((article, i) => {
              const sentiment = getSentiment(article.title + ' ' + (article.description || ''))
              return (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:scale-[1.01] transition-all duration-200 group flex flex-col"
                >
                  {view === 'grid' && (
                    <div className="h-44 overflow-hidden bg-dark flex-shrink-0">
                      {article.urlToImage ? (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">📰</div>
                      )}
                    </div>
                  )}

                  <div className={`p-5 flex flex-col flex-1 ${view === 'list' ? 'flex-row gap-4 items-start' : ''}`}>
                    {view === 'list' && article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full">
                          {article.source.name}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-faint">
                          <SentimentIcon s={sentiment} />
                          {sentiment === 'positive' ? 'Positivo' : sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                        </span>
                      </div>

                      <h3 className="font-semibold text-text leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {article.description && (
                        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-3">
                          {article.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                        <span className="flex items-center gap-1 text-faint text-xs">
                          <Clock className="w-3 h-3" /> {timeAgo(article.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1 text-primary text-xs font-medium">
                          Ler <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
