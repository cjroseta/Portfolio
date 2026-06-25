'use client'

import { useState, useEffect } from 'react'
import { Wind, Droplets, Thermometer, Search } from 'lucide-react'
import { useLang } from '@/context/LangContext'

interface WeatherData {
  city: string
  country: string
  temp: number
  feels_like: number
  humidity: number
  wind: number
  description: string
  icon: string
}

export default function WeatherWidget() {
  const { t } = useLang()
  const [city, setCity] = useState('Maputo')
  const [input, setInput] = useState('')
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchWeather(cityName: string) {
    const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY
    if (!key) { setError(t.weather.no_key); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&lang=pt&appid=${key}`
      )
      if (!res.ok) throw new Error(t.weather.not_found)
      const json = await res.json()
      setData({
        city: json.name,
        country: json.sys.country,
        temp: Math.round(json.main.temp),
        feels_like: Math.round(json.main.feels_like),
        humidity: json.main.humidity,
        wind: Math.round(json.wind.speed),
        description: json.weather[0].description,
        icon: json.weather[0].icon,
      })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.weather.not_found)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchWeather(city) }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim()) { setCity(input.trim()); fetchWeather(input.trim()); setInput('') }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-text">{t.weather.title}</h2>
        <span className="text-xs text-faint bg-dark px-2 py-1 rounded">OpenWeatherMap</span>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.weather.placeholder}
          className="flex-1 bg-dark border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-faint focus:outline-none focus:border-primary"
        />
        <button type="submit" className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </form>

      {loading && <div className="text-center text-muted py-8 animate-pulse">{t.weather.loading}</div>}
      {error && <div className="text-center text-secondary py-4 text-sm">{error}</div>}

      {data && !loading && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-text">{data.city}, {data.country}</h3>
              <p className="text-muted text-sm capitalize">{data.description}</p>
            </div>
            <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.description} className="w-16 h-16" />
          </div>
          <div className="text-5xl font-bold text-text mb-6">{data.temp}°C</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Thermometer, color: 'text-secondary', value: `${data.feels_like}°C`, label: t.weather.feels },
              { icon: Droplets, color: 'text-primary', value: `${data.humidity}%`, label: t.weather.humidity },
              { icon: Wind, color: 'text-accent', value: `${data.wind} m/s`, label: t.weather.wind },
            ].map(({ icon: Icon, color, value, label }) => (
              <div key={label} className="bg-dark rounded-lg p-3 text-center">
                <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                <div className="text-text font-semibold text-sm">{value}</div>
                <div className="text-faint text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
