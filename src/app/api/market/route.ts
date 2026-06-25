import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const symbol = (searchParams.get('symbol') || 'AAPL').toUpperCase()
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'ALPHA_VANTAGE_API_KEY não configurada' }, { status: 500 })
  }

  try {
    const [dailyRes, quoteRes] = await Promise.all([
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`, {
        next: { revalidate: 60 },
      }),
    ])

    const daily = await dailyRes.json()
    const quote = await quoteRes.json()

    if (daily['Note'] || daily['Information']) {
      return NextResponse.json({ error: 'Limite de requisições atingido. Tente novamente em 1 minuto.' }, { status: 429 })
    }

    const timeSeries = daily['Time Series (Daily)']
    if (!timeSeries) {
      return NextResponse.json({
        error: `Símbolo "${symbol}" não encontrado. Use símbolos de acções como AAPL, TSLA, MSFT.`,
      }, { status: 404 })
    }

    // Últimos 90 dias
    const candles = Object.entries(timeSeries)
      .slice(0, 90)
      .reverse()
      .map(([date, v]: [string, unknown]) => {
        const val = v as Record<string, string>
        const open = parseFloat(val['1. open'])
        const high = parseFloat(val['2. high'])
        const low = parseFloat(val['3. low'])
        const close = parseFloat(val['4. close'])
        const volume = parseInt(val['5. volume'])
        return { date, open, high, low, close, volume }
      })

    // Médias móveis simples
    const withMA = candles.map((c, i) => {
      const slice20 = candles.slice(Math.max(0, i - 19), i + 1)
      const slice50 = candles.slice(Math.max(0, i - 49), i + 1)
      const ma20 = parseFloat((slice20.reduce((a, b) => a + b.close, 0) / slice20.length).toFixed(2))
      const ma50 = parseFloat((slice50.reduce((a, b) => a + b.close, 0) / slice50.length).toFixed(2))
      return { ...c, ma20, ma50 }
    })

    // RSI 14
    const withRSI = withMA.map((c, i) => {
      if (i < 14) return { ...c, rsi: null }
      const changes = withMA.slice(i - 13, i + 1).map((d, j, arr) =>
        j === 0 ? 0 : d.close - arr[j - 1].close
      )
      const gains = changes.filter((ch) => ch > 0).reduce((a, b) => a + b, 0) / 14
      const losses = Math.abs(changes.filter((ch) => ch < 0).reduce((a, b) => a + b, 0)) / 14
      const rs = losses === 0 ? 100 : gains / losses
      const rsi = parseFloat((100 - 100 / (1 + rs)).toFixed(2))
      return { ...c, rsi }
    })

    const globalQuote = quote['Global Quote'] || {}
    const currentPrice = parseFloat(globalQuote['05. price'] || candles[candles.length - 1].close)
    const change = parseFloat(globalQuote['09. change'] || '0')
    const changePct = parseFloat((globalQuote['10. change percent'] || '0%').replace('%', ''))
    const high52 = parseFloat(globalQuote['03. high'] || '0')
    const low52 = parseFloat(globalQuote['04. low'] || '0')
    const volume = parseInt(globalQuote['06. volume'] || '0')

    return NextResponse.json({
      symbol,
      currentPrice,
      change,
      changePct,
      high52: high52 || Math.max(...candles.map((c) => c.high)),
      low52: low52 || Math.min(...candles.map((c) => c.low)),
      volume: volume || candles[candles.length - 1].volume,
      candles: withRSI,
    })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Erro' }, { status: 500 })
  }
}
