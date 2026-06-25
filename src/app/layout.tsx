import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import { LangProvider } from '@/context/LangContext'

export const metadata: Metadata = {
  title: 'Portfolio | Dev & Análise de Dados',
  description: 'Portfólio profissional de desenvolvimento de software e análise de dados com integrações de APIs reais.',
  keywords: ['developer', 'portfolio', 'data analysis', 'software', 'APIs'],
  openGraph: {
    title: 'Portfolio | Dev & Análise de Dados',
    description: 'Portfólio profissional com projetos reais e integrações de APIs.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('theme');
            document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
          })();
        `}} />
      </head>
      <body className="antialiased transition-colors duration-300">
        <ThemeProvider>
          <LangProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
