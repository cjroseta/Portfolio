import { Github, Star, GitFork, BookOpen, Users } from 'lucide-react'
import GitHubStatsClient from './GitHubStatsClient'

async function getGitHubStats() {
  const username = process.env.GITHUB_USERNAME
  if (!username) return null
  const headers: HeadersInit = {}
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers, next: { revalidate: 3600 } }),
    ])

    if (!userRes.ok || !reposRes.ok) return null

    const user = await userRes.json()
    const repos = await reposRes.json()

    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0)
      : 0

    const languages: Record<string, number> = {}
    if (Array.isArray(repos)) {
      repos.forEach((r: { language: string | null }) => {
        if (r.language) languages[r.language] = (languages[r.language] || 0) + 1
      })
    }

    const topLanguages = Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 5)

    return {
      followers: user.followers || 0,
      publicRepos: user.public_repos || 0,
      totalStars,
      topLanguages,
    }
  } catch {
    return null
  }
}

export default async function GitHubStats() {
  const stats = await getGitHubStats()
  if (!stats) return null
  return <GitHubStatsClient stats={stats} />
}
