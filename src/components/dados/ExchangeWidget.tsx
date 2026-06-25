'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftRight, TrendingUp } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const CURRENCIES = ['USD', 'EUR', 'GBP', 'BRL', 'MZN', 'ZAR', 'AOA', 'JPY', 'CHF', 'CAD']

export default function ExchangeWidget() {
  const { t } = useLang()
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('MZN')
  const [amount, setAmount] = useState('1')
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState('')

  async function fetchRate(fromCurr: string, toCurr: string) {
    const key = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY
    if (!key) { setError(t.exchange.no_key); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/${fromCurr}/${toCurr}`)
      if (!res.ok) throw new Error('Erro na API')
      const json = await res.json()
      setRate(json.conversion_rate)
      setUpdated(new Date().toLocaleTimeString('pt'))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRate(from, to) }, [from, to])

  const result = rate && amount ? (parseFloat(amount) * rate).toFixed(2) : '—'

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-text">{t.exchange.title}</h2>
        <span className="text-xs text-faint bg-dark px-2 py-1 rounded">ExchangeRate-API</span>
      </div>

      {error && <div className="text-secondary text-sm mb-4">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted mb-1 block">{t.exchange.amount}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-text text-lg font-semibold focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <label className="text-xs text-muted mb-1 block">{t.exchange.from}</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-text focus:outline-none focus:border-primary"
            >
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={() => { setFrom(to); setTo(from) }} className="mt-5 p-2 bg-dark border border-border rounded-lg text-muted hover:text-primary hover:border-primary transition-colors">
            <ArrowLeftRight className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <label className="text-xs text-muted mb-1 block">{t.exchange.to}</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-text focus:outline-none focus:border-primary"
            >
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-dark rounded-xl p-4 border border-border">
          {loading ? (
            <div className="text-muted text-sm animate-pulse">{t.exchange.calculating}</div>
          ) : (
            <>
              <div className="text-3xl font-bold text-text mb-1">
                {result} <span className="text-primary text-xl">{to}</span>
              </div>
              {rate && (
                <div className="flex items-center gap-2 text-muted text-sm">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  1 {from} = {rate.toFixed(4)} {to}
                  {updated && <span className="ml-auto text-xs text-faint">{updated}</span>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
