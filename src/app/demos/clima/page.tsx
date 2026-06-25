'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Wind, Droplets, Thermometer, Eye, Gauge, ArrowLeft, MapPin, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Current {
  city: string
  country: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
  wind: number
  visibility: number
  pressure: number
  description: string
  icon: string
  sunrise: string
  sunset: string
}

interface DayForecast {
  date: string
  dayName: string
  temp_max: number
  temp_min: number
  description: string
  icon: string
  humidity: number
  wind: number
}

interface HourPoint {
  hour: string
  temp: number
  feels: number
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

function fmtTime(unix: number) {
  return new Date(unix * 1000).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' })
}

function dayName(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt', { weekday: 'short' })
}

const BG_ICONS: Record<string, string> = {
  '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '⛅',
  '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌦️',
  '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️', '50d': '🌫️', '50n': '🌫️',
}

export default function ClimaPage() {
  const [query, setQuery] = useState('')
  const [current, setCurrent] = useState<Current | null>(null)
  const [forecast, setForecast] = useState<DayForecast[]>([])
  const [hourly, setHourly] = useState<HourPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [city, setCity] = useState('Maputo')

  const fetchWeather = useCallback(async (cityName: string) => {
    if (!API_KEY) { setError('API Key não configurada'); return }
    setLoading(true); setError('')
    try {
      const [curRes, foreRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&lang=pt&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&units=metric&lang=pt&appid=${API_KEY}`),
      ])
      if (!curRes.ok) throw new Error('Cidade não encontrada')

      const cur = await curRes.json()
      const fore = await foreRes.json()

      const cityNameOverrides: Record<string, string> = {
        'Lourenco Marques': 'Maputo',
        'Lourenço Marques': 'Maputo',
      }
      setCurrent({
        city: cityNameOverrides[cur.name] ?? cur.name,
        country: cur.sys.country,
        temp: Math.round(cur.main.temp),
        feels_like: Math.round(cur.main.feels_like),
        temp_min: Math.round(cur.main.temp_min),
        temp_max: Math.round(cur.main.temp_max),
        humidity: cur.main.humidity,
        wind: Math.round(cur.wind.speed * 3.6),
        visibility: Math.round((cur.visibility || 0) / 1000),
        pressure: cur.main.pressure,
        description: cur.weather[0].description,
        icon: cur.weather[0].icon,
        sunrise: fmtTime(cur.sys.sunrise),
        sunset: fmtTime(cur.sys.sunset),
      })

      // Próximas horas (primeiros 8 pontos = 24h)
      const hrs: HourPoint[] = fore.list.slice(0, 8).map((item: { dt: number; main: { temp: number; feels_like: number } }) => ({
        hour: new Date(item.dt * 1000).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        feels: Math.round(item.main.feels_like),
      }))
      setHourly(hrs)

      // Previsão 7 dias — agrupar por dia
      const days: Record<string, { temps: number[]; icons: string[]; descs: string[]; humids: number[]; winds: number[] }> = {}
      fore.list.forEach((item: {
        dt_txt: string
        main: { temp: number; humidity: number }
        weather: { icon: string; description: string }[]
        wind: { speed: number }
      }) => {
        const date = item.dt_txt.split(' ')[0]
        if (!days[date]) days[date] = { temps: [], icons: [], descs: [], humids: [], winds: [] }
        days[date].temps.push(item.main.temp)
        days[date].icons.push(item.weather[0].icon)
        days[date].descs.push(item.weather[0].description)
        days[date].humids.push(item.main.humidity)
        days[date].winds.push(item.wind.speed)
      })

      const dayList: DayForecast[] = Object.entries(days).slice(0, 7).map(([date, d]) => ({
        date,
        dayName: dayName(date),
        temp_max: Math.round(Math.max(...d.temps)),
        temp_min: Math.round(Math.min(...d.temps)),
        description: d.descs[Math.floor(d.descs.length / 2)],
        icon: d.icons[Math.floor(d.icons.length / 2)],
        humidity: Math.round(d.humids.reduce((a, b) => a + b) / d.humids.length),
        wind: Math.round((d.winds.reduce((a, b) => a + b) / d.winds.length) * 3.6),
      }))
      setForecast(dayList)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro')
      setCurrent(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchWeather(city) }, [city])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) { setCity(query.trim()); setQuery('') }
  }

  const quickCities = ['Maputo', 'Lisboa', 'Londres', 'Nova York', 'Dubai', 'São Paulo']

  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/projetos" className="p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text">App de Clima</h1>
            <p className="text-muted text-sm">Tempo real · Previsão 7 dias · OpenWeatherMap</p>
          </div>
          <button onClick={() => fetchWeather(city)} className="ml-auto p-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Busca */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cidade..."
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-text placeholder-faint focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors font-medium">
            Buscar
          </button>
        </form>

        {/* Cidades rápidas */}
        <div className="flex flex-wrap gap-2 mb-6">
          {quickCities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all ${
                city === c ? 'bg-primary text-white' : 'bg-card border border-border text-muted hover:text-primary hover:border-primary'
              }`}
            >
              <MapPin className="w-3 h-3" /> {c}
            </button>
          ))}
        </div>

        {error && <div className="bg-secondary/10 border border-secondary/30 text-secondary rounded-xl p-4 mb-6">{error}</div>}

        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-pulse">
            <div className="lg:col-span-2 h-64 bg-card border border-border rounded-2xl" />
            <div className="h-64 bg-card border border-border rounded-2xl" />
          </div>
        )}

        {current && !loading && (
          <>
            {/* Clima actual + detalhes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

              {/* Card principal */}
              <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[8rem] opacity-10 leading-none select-none">
                  {BG_ICONS[current.icon] ?? '🌡️'}
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-text">{current.city}, {current.country}</h2>
                      <p className="text-muted capitalize">{current.description}</p>
                    </div>
                    <img src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`} alt={current.description} className="w-16 h-16" />
                  </div>

                  <div className="text-7xl font-bold text-text mb-2">{current.temp}°</div>
                  <p className="text-muted mb-6">Sensação {current.feels_like}° · Mín {current.temp_min}° Máx {current.temp_max}°</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Droplets, label: 'Humidade', value: `${current.humidity}%`, color: 'text-blue-400' },
                      { icon: Wind, label: 'Vento', value: `${current.wind} km/h`, color: 'text-accent' },
                      { icon: Eye, label: 'Visibilidade', value: `${current.visibility} km`, color: 'text-primary' },
                      { icon: Gauge, label: 'Pressão', value: `${current.pressure} hPa`, color: 'text-secondary' },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="bg-dark rounded-xl p-3">
                        <Icon className={`w-4 h-4 ${color} mb-1.5`} />
                        <div className="text-text font-semibold text-sm">{value}</div>
                        <div className="text-faint text-xs">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nascer/pôr do sol */}
              <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between">
                <h3 className="font-semibold text-text mb-4">Sol</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌅</div>
                    <p className="text-faint text-xs uppercase tracking-wider mb-1">Nascer</p>
                    <p className="text-2xl font-bold text-text">{current.sunrise}</p>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌇</div>
                    <p className="text-faint text-xs uppercase tracking-wider mb-1">Pôr do sol</p>
                    <p className="text-2xl font-bold text-text">{current.sunset}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico próximas 24h */}
            {hourly.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-primary" /> Próximas 24 horas
                </h3>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={hourly}>
                    <defs>
                      <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="hour" stroke="var(--text-faint)" tick={{ fontSize: 11 }} />
                    <YAxis stroke="var(--text-faint)" tick={{ fontSize: 11 }} unit="°" domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}
                      labelStyle={{ color: 'var(--text-muted)' }}
                      formatter={(v) => [`${v}°C`]}
                    />
                    <Area type="monotone" dataKey="temp" name="Temperatura" stroke="var(--primary)" fill="url(#tempGrad)" strokeWidth={2} dot={{ fill: 'var(--primary)', r: 3 }} />
                    <Area type="monotone" dataKey="feels" name="Sensação" stroke="var(--secondary)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Previsão 7 dias */}
            {forecast.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-text mb-4">Previsão 7 dias</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {forecast.map((day, i) => (
                    <div
                      key={day.date}
                      className={`rounded-xl p-4 text-center transition-all ${
                        i === 0 ? 'bg-primary/20 border border-primary/30' : 'bg-dark border border-border hover:border-primary/30'
                      }`}
                    >
                      <p className="text-muted text-xs uppercase tracking-wider mb-2 font-medium">
                        {i === 0 ? 'Hoje' : day.dayName}
                      </p>
                      <div className="text-3xl mb-2">{BG_ICONS[day.icon] ?? '🌡️'}</div>
                      <p className="text-text font-bold">{day.temp_max}°</p>
                      <p className="text-faint text-sm">{day.temp_min}°</p>
                      <div className="mt-2 pt-2 border-t border-border space-y-1">
                        <p className="text-faint text-xs">💧 {day.humidity}%</p>
                        <p className="text-faint text-xs">💨 {day.wind} km/h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
