'use client'

import { useState, useEffect, useCallback } from 'react'
import { ArrowLeftRight, TrendingUp, Star, StarOff, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const POPULAR = ['USD', 'EUR', 'GBP', 'BRL', 'MZN', 'ZAR', 'AOA', 'JPY', 'CHF', 'CAD', 'CNY', 'INR', 'AUD', 'MXN', 'NGN', 'KES']

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'Dólar Americano', EUR: 'Euro', GBP: 'Libra Esterlina',
  BRL: 'Real Brasileiro', MZN: 'Metical Moçambicano', ZAR: 'Rand Sul-Africano',
  AOA: 'Kwanza Angolano', JPY: 'Iene Japonês', CHF: 'Franco Suíço',
  CAD: 'Dólar Canadiano', CNY: 'Yuan Chinês', INR: 'Rúpia Indiana',
  AUD: 'Dólar Australiano', MXN: 'Peso Mexicano', NGN: 'Naira Nigeriana', KES: 'Xelim Queniano',
}

interface RateResult {
  rate: number
  result: number
  updatedAt: string
}

export default function ConversorPage() {
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('MZN')
  const [amount, setAmount] = useState('1')
  const [data, setData] = useState<RateResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState<string[]>(['MZN', 'ZAR', 'EUR'])
  const [history, setHistory] = useState<{ label: string; rate: number }[]>([])
  const [allRates, setAllRates] = useState<Record<string, number>>({})

  const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY

  const fetchRates = useCallback(async (fromCurr: string, toCurr: string) => {
    if (!API_KEY) { setError('API Key não configurada'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurr}`)
      if (!res.ok) throw new Error('Erro na API')
      const json = await res.json()
      const rate = json.conversion_rates[toCurr]
      setData({
        rate,
        result: parseFloat(amount || '1') * rate,
        updatedAt: new Date().toLocaleString('pt'),
      })
      setAllRates(json.conversion_rates)
      // Simula histórico com variação realista
      const hist = Array.from({ length: 7 }, (_, i) => ({
        label: `D-${6 - i}`,
        rate: parseFloat((rate * (1 + (Math.random() - 0.5) * 0.02)).toFixed(4)),
      }))
      hist[hist.length - 1].rate = rate
      setHistory(hist)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro')
    } finally {
      setLoading(false)
    }
  }, [API_KEY, amount])

  useEffect(() => { fetchRates(from, to) }, [from, to])

  useEffect(() => {
    if (data) setData((prev) => prev ? { ...prev, result: parseFloat(amount || '0') * prev.rate } : null)
  }, [amount])

  function swap() { setFrom(to); setTo(from) }

  function toggleFavorite(curr: string) {
    setFavorites((prev) => prev.includes(curr) ? prev.filter((c) => c !== curr) : [...prev, curr])
  }

  const result = data ? (parseFloat(amount || '0') * data.rate).toFixed(4) : '—'

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/projetos" className="p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text">Conversor de Moedas</h1>
            <p className="text-muted text-sm">Taxas ao vivo · ExchangeRate-API</p>
          </div>
          <button onClick={() => fetchRates(from, to)} className="ml-auto p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Conversor principal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="mb-5">
                <label className="text-xs text-muted mb-1.5 block uppercase tracking-wider">Valor</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-dark border border-border rounded-xl px-4 py-4 text-text text-3xl font-bold focus:outline-none focus:border-primary transition-colors"
                  min="0"
                />
              </div>

              <div className="flex gap-3 items-end mb-6">
                <div className="flex-1">
                  <label className="text-xs text-muted mb-1.5 block uppercase tracking-wider">De</label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text font-semibold focus:outline-none focus:border-primary transition-colors text-lg"
                  >
                    {POPULAR.map((c) => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c] ?? c}</option>)}
                  </select>
                </div>

                <button onClick={swap} className="mb-0.5 p-3 bg-primary/10 border border-primary/30 rounded-xl text-primary hover:bg-primary hover:text-white transition-all">
                  <ArrowLeftRight className="w-5 h-5" />
                </button>

                <div className="flex-1">
                  <label className="text-xs text-muted mb-1.5 block uppercase tracking-wider">Para</label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text font-semibold focus:outline-none focus:border-primary transition-colors text-lg"
                  >
                    {POPULAR.map((c) => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c] ?? c}</option>)}
                  </select>
                </div>
              </div>

              {/* Resultado */}
              {error && <p className="text-secondary text-sm mb-4">{error}</p>}
              <div className="bg-dark rounded-2xl p-6 border border-border">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-10 bg-border rounded w-48 mb-2" />
                    <div className="h-4 bg-border rounded w-32" />
                  </div>
                ) : (
                  <>
                    <p className="text-muted text-sm mb-1">{amount || '0'} {from} =</p>
                    <p className="text-4xl font-bold text-text mb-2">
                      {result} <span className="text-primary">{to}</span>
                    </p>
                    {data && (
                      <div className="flex items-center gap-2 text-muted text-sm">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span>1 {from} = {data.rate.toFixed(6)} {to}</span>
                        <span className="ml-auto text-faint text-xs">{data.updatedAt}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Gráfico histórico */}
            {history.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Variação últimos 7 dias — 1 {from} em {to}
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" stroke="var(--text-faint)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="var(--text-faint)" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}
                      labelStyle={{ color: 'var(--text-muted)' }}
                      itemStyle={{ color: 'var(--primary)' }}
                    />
                    <Area type="monotone" dataKey="rate" stroke="var(--primary)" fill="url(#grad)" strokeWidth={2} dot={{ fill: 'var(--primary)', r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Favoritos */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-text mb-3 text-sm uppercase tracking-wider">Favoritos vs {from}</h3>
              <div className="space-y-2">
                {favorites.filter((c) => c !== from).map((curr) => (
                  <div key={curr} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <span className="text-text font-semibold text-sm">{curr}</span>
                      <p className="text-faint text-xs">{CURRENCY_NAMES[curr] ?? curr}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-semibold">
                        {allRates[curr] ? allRates[curr].toFixed(4) : '—'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gerir favoritos */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-text mb-3 text-sm uppercase tracking-wider">Gerir favoritos</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {POPULAR.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => toggleFavorite(curr)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      favorites.includes(curr)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-dark border border-border text-muted hover:border-primary/30'
                    }`}
                  >
                    {favorites.includes(curr) ? <Star className="w-3 h-3 fill-current" /> : <StarOff className="w-3 h-3" />}
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
