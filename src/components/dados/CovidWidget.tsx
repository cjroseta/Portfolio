import { Globe, TrendingUp, AlertCircle, Heart } from 'lucide-react'

interface CovidData {
  cases: number
  deaths: number
  recovered: number
  active: number
  todayCases: number
  todayDeaths: number
  updated: number
}

async function getCovidData(): Promise<CovidData | null> {
  try {
    const res = await fetch('https://disease.sh/v3/covid-19/all', {
      next: { revalidate: 3600 },
    })
    return res.json()
  } catch {
    return null
  }
}

function fmt(n: number) {
  return n.toLocaleString('pt')
}

export default async function CovidWidget() {
  const data = await getCovidData()

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-white">COVID-19 — Dados Globais</h2>
        </div>
        <span className="text-xs text-slate-500 bg-dark px-2 py-1 rounded">disease.sh API</span>
      </div>

      {!data ? (
        <div className="text-center text-slate-400 py-8">Não foi possível carregar os dados.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-dark rounded-xl p-4 border border-border">
              <TrendingUp className="w-5 h-5 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{fmt(data.cases)}</div>
              <div className="text-slate-400 text-sm">Casos totais</div>
              <div className="text-yellow-400 text-xs mt-1">+{fmt(data.todayCases)} hoje</div>
            </div>
            <div className="bg-dark rounded-xl p-4 border border-border">
              <AlertCircle className="w-5 h-5 text-secondary mb-2" />
              <div className="text-2xl font-bold text-white">{fmt(data.deaths)}</div>
              <div className="text-slate-400 text-sm">Mortes</div>
              <div className="text-secondary text-xs mt-1">+{fmt(data.todayDeaths)} hoje</div>
            </div>
            <div className="bg-dark rounded-xl p-4 border border-border">
              <Heart className="w-5 h-5 text-accent mb-2" />
              <div className="text-2xl font-bold text-white">{fmt(data.recovered)}</div>
              <div className="text-slate-400 text-sm">Recuperados</div>
            </div>
            <div className="bg-dark rounded-xl p-4 border border-border">
              <Globe className="w-5 h-5 text-primary mb-2" />
              <div className="text-2xl font-bold text-white">{fmt(data.active)}</div>
              <div className="text-slate-400 text-sm">Casos activos</div>
            </div>
          </div>

          <div className="text-xs text-slate-600 text-right">
            Actualizado: {new Date(data.updated).toLocaleString('pt')}
          </div>
        </>
      )}
    </div>
  )
}
