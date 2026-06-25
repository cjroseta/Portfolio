import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import { LangProvider } from '@/context/LangContext'

export const metadata: Metadata = {
  title: 'Cláudio Roseta | Desenvolvedor de Software & Analista de Dados',
  description: 'Portfólio de Cláudio Roseta — Desenvolvedor de Software e Analista de Dados especializado em ERP Odoo, Power BI, análise de dados e desenvolvimento web.',
  keywords: ['Cláudio Roseta', 'desenvolvedor', 'analista de dados', 'Odoo', 'Power BI', 'Moçambique', 'ERP', 'portfolio'],
  openGraph: {
    title: 'Cláudio Roseta | Dev & Analista de Dados',
    description: 'Portfólio profissional com projectos reais, integrações de APIs e análise de dados.',
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
