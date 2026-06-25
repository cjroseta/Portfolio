import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') || 'technology'
  const query = searchParams.get('q') || ''
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'NEWS_API_KEY não configurada' }, { status: 500 })
  }

  try {
    let url: string

    if (query) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`
    } else {
      url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=20&apiKey=${apiKey}`
    }

    const res = await fetch(url, { next: { revalidate: 900 } })
    const data = await res.json()

    if (data.status === 'error') {
      return NextResponse.json({ error: data.message }, { status: 400 })
    }

    const articles = (data.articles || []).filter(
      (a: { title?: string }) => a.title && a.title !== '[Removed]'
    )

    return NextResponse.json({ articles, totalResults: articles.length })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Erro ao buscar notícias' }, { status: 500 })
  }
}
