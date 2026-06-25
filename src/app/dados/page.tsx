import WeatherWidget from '@/components/dados/WeatherWidget'
import ExchangeWidget from '@/components/dados/ExchangeWidget'
import CovidWidget from '@/components/dados/CovidWidget'

export default function DadosPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Live Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dados em Tempo Real</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Dashboard com dados ao vivo de APIs gratuitas. Clima, câmbio e estatísticas globais actualizados constantemente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <WeatherWidget />
          <ExchangeWidget />
        </div>

        <CovidWidget />

        <div className="mt-8 p-4 bg-card border border-border rounded-xl text-center text-slate-500 text-sm">
          Dados obtidos de: OpenWeatherMap API · ExchangeRate-API · disease.sh API — todas gratuitas
        </div>
      </div>
    </div>
  )
}
