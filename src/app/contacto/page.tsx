'use client'

import { Mail, Github, Linkedin, MapPin, Clock } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export default function ContactoPage() {
  const { t } = useLang()

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'claudioroseta@gmail.com',
      href: 'mailto:claudioroseta@gmail.com',
      color: 'text-primary',
      bg: 'bg-primary/10 border-primary/30',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/claudioroseta',
      href: 'https://github.com/',
      color: 'text-white',
      bg: 'bg-white/10 border-white/20',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/claudioroseta',
      href: 'https://linkedin.com/',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
    },
  ]

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{t.contact.label}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">{t.contact.title}</h1>
          <p className="text-muted text-lg max-w-xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-10">
          {contacts.map(({ icon: Icon, label, value, href, color, bg }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`flex items-center gap-5 p-6 bg-card border rounded-2xl hover:scale-[1.02] transition-all duration-200 glow-hover ${bg}`}
            >
              <div className={`p-4 rounded-xl bg-card border border-border`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <p className="text-faint text-sm mb-0.5">{label}</p>
                <p className={`font-semibold text-lg ${color}`}>{value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
            <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-text mb-1">{t.contact.availability}</p>
              <p className="text-muted text-sm">{t.contact.availability_text}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
            <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <p className="font-semibold text-text">{t.contact.available_now}</p>
              </div>
              <p className="text-muted text-sm">GMT+2 — Maputo, Moçambique</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
