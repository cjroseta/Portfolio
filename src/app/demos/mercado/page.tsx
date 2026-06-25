'use client'

import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, BarChart2, Search, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
  AreaChart, Area, ReferenceLine,
} from 'recharts'

interface Candle {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  ma20: number
  ma50: number
  rsi: number | null
}

interface MarketData {
  symbol: string
  currentPrice: number
  change: number
  changePct: number
  high52: number
  low52: number
  volume: number
  candles: Candle[]
}

const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple', icon: '🍎' },
  { symbol: 'GOOGL', name: 'Google', icon: '🔍' },
  { symbol: 'MSFT', name: 'Microsoft', icon: '🪟' },
  { symbol: 'TSLA', name: 'Tesla', icon: '⚡' },
  { symbol: 'AMZN', name: 'Amazon', icon: '📦' },
  { symbol: 'META', name: 'Meta', icon: '👓' },
  { symbol: 'NVDA', name: 'NVIDIA', icon: '🎮' },
  { symbol: 'NFLX', name: 'Netflix', icon: '🎬' },
]

const PERIODS = [
  { label: '1M', days: 21 },
  { label: '3M', days: 63 },
  { label: '6M', days: 90 },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtVol(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}
function shortDate(d: string) {
  return d.slice(5) // MM-DD
}

// Tooltip customizado do candlestick
const CandleTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: Candle }[] }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const isGreen = d.close >= d.open
  return (
    <div className="bg-card border border-border rounded-xl p-3 text-xs shadow-xl min-w-[160px]">
      <p className="text-muted mb-2 font-medium">{d.date}</p>
      <div className="space-y-1">
        {[['Abertura', d.open], ['Máximo', d.high], ['Mínimo', d.low], ['Fecho', d.close]].map(([l, v]) => (
          <div key={l as string} className="flex justify-between gap-4">
            <span className="text-faint">{l}</span>
            <span className={`font-semibold ${l === 'Fecho' ? (isGreen ? 'text-accent' : 'text-secondary') : 'text-text'}`}>
              ${fmt(v as number)}
            </span>
          </div>
        ))}
        <div className="flex justify-between gap-4 pt-1 border-t border-border">
          <span className="text-faint">Volume</span>
          <span className="text-text font-semibold">{fmtVol(d.volume)}</span>
        </div>
        {d.ma20 && <div className="flex justify-between gap-4"><span className="text-yellow-400">MA20</span><span className="text-yellow-400 font-semibold">${fmt(d.ma20)}</span></div>}
        {d.ma50 && <div className="flex justify-between gap-4"><span className="text-blue-400">MA50</span><span className="text-blue-400 font-semibold">${fmt(d.ma50)}</span></div>}
      </div>
    </div>
  )
}

// Bar de candlestick simulada com recharts
const CandleBar = (props: {
  x?: number; y?: number; width?: number; height?: number; payload?: Candle
}) => {
  const { x = 0, y = 0, width = 0, payload } = props
  if (!payload) return null
  const { open, high, low, close } = payload
  const isGreen = close >= open
  const color = isGreen ? '#43E97B' : '#FF6584'
  // Precisa da escala para calcular pixels — usamos aproximação relativa via yAxis
  return (
    <g>
      <rect x={x + width * 0.1} y={y} width={width * 0.8} height={Math.max(1, props.height ?? 1)} fill={color} opacity={0.9} rx={1} />
    </g>
  )
}

export default function MercadoPage() {
  const [symbol, setSymbol] = useState('AAPL')
  const [input, setInput] = useState('')
  const [data, setData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [period, setPeriod] = useState(63)
  const [tab, setTab] = useState<'preco' | 'volume' | 'rsi'>('preco')

  const fetchData = useCallback(async (sym: string) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/market?symbol=${sym}`)
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData(symbol) }, [symbol])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim()) { setSymbol(input.trim().toUpperCase()); setInput('') }
  }

  const candles = data?.candles.slice(-period) ?? []
  const isPositive = (data?.change ?? 0) >= 0

  // RSI interpretação
  const lastRsi = candles.length ? candles[candles.length - 1].rsi : null
  const rsiColor = lastRsi === null ? 'text-muted' : lastRsi > 70 ? 'text-secondary' : lastRsi < 30 ? 'text-accent' : 'text-text'
  const rsiLabel = lastRsi === null ? '—' : lastRsi > 70 ? 'Sobrecomprado' : lastRsi < 30 ? 'Sobrevendido' : 'Neutro'

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/projetos" className="p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text">Análise de Mercado</h1>
            <p className="text-muted text-sm">Cotações · Médias Móveis · RSI · Alpha Vantage</p>
          </div>
          <button onClick={() => fetchData(symbol)} className="ml-auto p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Busca */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Símbolo da acção (ex: AAPL, TSLA, MSFT)..."
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-text placeholder-faint focus:outline-none focus:border-primary transition-colors uppercase"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors font-medium">
            Buscar
          </button>
        </form>

        {/* Acções populares */}
        <div className="flex flex-wrap gap-2 mb-6">
          {POPULAR_STOCKS.map((s) => (
            <button
              key={s.symbol}
              onClick={() => setSymbol(s.symbol)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                symbol === s.symbol
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-card border border-border text-muted hover:text-text hover:border-primary/50'
              }`}
            >
              <span>{s.icon}</span> {s.symbol}
            </button>
          ))}
        </div>

        {/* Erro */}
        {error && (
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-secondary font-semibold text-sm mb-1">{error}</p>
              {error.includes('API_KEY') && (
                <p className="text-faint text-xs">Regista-te em alphavantage.co, obtém a chave gratuita e adiciona ALPHA_VANTAGE_API_KEY no .env.local</p>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="h-24 bg-card border border-border rounded-2xl" />)}
            </div>
            <div className="h-80 bg-card border border-border rounded-2xl" />
          </div>
        )}

        {data && !loading && (
          <>
            {/* Cabeçalho do activo */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-text">{data.symbol}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-4xl font-bold text-text">${fmt(data.currentPrice)}</span>
                    <div className={`flex items-center gap-1 text-lg font-semibold ${isPositive ? 'text-accent' : 'text-secondary'}`}>
                      {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      {isPositive ? '+' : ''}{fmt(data.change)} ({isPositive ? '+' : ''}{data.changePct.toFixed(2)}%)
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-faint text-xs uppercase tracking-wider mb-1">Máx 52s</p>
                    <p className="text-text font-bold text-lg">${fmt(data.high52)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-faint text-xs uppercase tracking-wider mb-1">Mín 52s</p>
                    <p className="text-text font-bold text-lg">${fmt(data.low52)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-faint text-xs uppercase tracking-wider mb-1">Volume</p>
                    <p className="text-text font-bold text-lg">{fmtVol(data.volume)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-faint text-xs uppercase tracking-wider mb-1">RSI (14)</p>
                    <p className={`font-bold text-lg ${rsiColor}`}>{lastRsi?.toFixed(1) ?? '—'}</p>
                    <p className={`text-xs ${rsiColor}`}>{rsiLabel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controlos período + tab */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
                {PERIODS.map((p) => (
                  <button key={p.label} onClick={() => setPeriod(p.days)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${period === p.days ? 'bg-primary text-white' : 'text-muted hover:text-text'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
                {([['preco', '📈 Preço'], ['volume', '📊 Volume'], ['rsi', '⚡ RSI']] as const).map(([id, label]) => (
                  <button key={id} onClick={() => setTab(id)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${tab === id ? 'bg-primary text-white' : 'text-muted hover:text-text'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gráfico de preço com MA */}
            {tab === 'preco' && (
              <div className="bg-card border border-border rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Preço de Fecho + Médias Móveis
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={candles}>
                    <defs>
                      <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tickFormatter={shortDate} stroke="var(--text-faint)" tick={{ fontSize: 11 }} interval={Math.floor(candles.length / 6)} />
                    <YAxis stroke="var(--text-faint)" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} domain={['auto', 'auto']} />
                    <Tooltip content={<CandleTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="close" name="Fecho" stroke="var(--primary)" fill="url(#priceGrad)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="ma20" name="MA 20" stroke="#FBBF24" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                    <Line type="monotone" dataKey="ma50" name="MA 50" stroke="#60A5FA" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                  </ComposedChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3 text-xs text-muted flex-wrap">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary inline-block" /> Preço de Fecho</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-yellow-400 inline-block" /> Média Móvel 20 dias</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-400 inline-block" /> Média Móvel 50 dias</span>
                </div>
              </div>
            )}

            {/* Gráfico de volume */}
            {tab === 'volume' && (
              <div className="bg-card border border-border rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-primary" /> Volume de Negociação
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={candles}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tickFormatter={shortDate} stroke="var(--text-faint)" tick={{ fontSize: 11 }} interval={Math.floor(candles.length / 6)} />
                    <YAxis stroke="var(--text-faint)" tick={{ fontSize: 11 }} tickFormatter={fmtVol} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}
                      formatter={(v) => [fmtVol(v as number), 'Volume']}
                    />
                    <Bar dataKey="volume" name="Volume" fill="var(--primary)" opacity={0.7} radius={[2, 2, 0, 0]} />
                    <Line type="monotone" dataKey="close" name="Preço" stroke="var(--secondary)" strokeWidth={1.5} dot={false} yAxisId={undefined} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* RSI */}
            {tab === 'rsi' && (
              <div className="bg-card border border-border rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-text mb-1 flex items-center gap-2">
                  ⚡ RSI — Índice de Força Relativa (14 dias)
                </h3>
                <p className="text-faint text-xs mb-4">RSI &gt; 70 = sobrecomprado (possível queda) · RSI &lt; 30 = sobrevendido (possível subida)</p>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={candles.filter(c => c.rsi !== null)}>
                    <defs>
                      <linearGradient id="rsiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tickFormatter={shortDate} stroke="var(--text-faint)" tick={{ fontSize: 11 }} interval={Math.floor(candles.length / 6)} />
                    <YAxis stroke="var(--text-faint)" tick={{ fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}
                      formatter={(v) => [(v as number)?.toFixed(2), 'RSI']}
                    />
                    <ReferenceLine y={70} stroke="#FF6584" strokeDasharray="4 2" label={{ value: 'Sobrecomprado 70', fill: '#FF6584', fontSize: 11 }} />
                    <ReferenceLine y={30} stroke="#43E97B" strokeDasharray="4 2" label={{ value: 'Sobrevendido 30', fill: '#43E97B', fontSize: 11 }} />
                    <ReferenceLine y={50} stroke="var(--border)" strokeDasharray="2 2" />
                    <Area type="monotone" dataKey="rsi" name="RSI" stroke="var(--primary)" fill="url(#rsiGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Tabela resumo últimos 10 dias */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-text mb-4">Últimos 10 dias</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-faint text-xs uppercase tracking-wider border-b border-border">
                      {['Data', 'Abertura', 'Máximo', 'Mínimo', 'Fecho', 'Volume', 'Variação'].map(h => (
                        <th key={h} className="text-left py-2 pr-4 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {candles.slice(-10).reverse().map((c) => {
                      const chg = ((c.close - c.open) / c.open) * 100
                      const isUp = chg >= 0
                      return (
                        <tr key={c.date} className="border-b border-border/50 hover:bg-dark transition-colors">
                          <td className="py-2.5 pr-4 text-muted font-medium">{c.date}</td>
                          <td className="py-2.5 pr-4 text-text">${fmt(c.open)}</td>
                          <td className="py-2.5 pr-4 text-accent">${fmt(c.high)}</td>
                          <td className="py-2.5 pr-4 text-secondary">${fmt(c.low)}</td>
                          <td className="py-2.5 pr-4 text-text font-semibold">${fmt(c.close)}</td>
                          <td className="py-2.5 pr-4 text-muted">{fmtVol(c.volume)}</td>
                          <td className={`py-2.5 font-semibold ${isUp ? 'text-accent' : 'text-secondary'}`}>
                            {isUp ? '+' : ''}{chg.toFixed(2)}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
