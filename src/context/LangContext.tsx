'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { pt } from '@/i18n/pt'
import { en } from '@/i18n/en'

export type Lang = 'pt' | 'en'
export type Translations = typeof pt

const LangContext = createContext<{
  lang: Lang
  t: Translations
  toggle: () => void
}>({ lang: 'pt', t: pt, toggle: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved) setLang(saved)
  }, [])

  function toggle() {
    const next = lang === 'pt' ? 'en' : 'pt'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = lang === 'pt' ? pt : en

  return <LangContext.Provider value={{ lang, t, toggle }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
