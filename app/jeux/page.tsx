import type { Metadata } from 'next'
import Link from 'next/link'
import jeuxData from '@/data/jeux.json'
import type { Jeu } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Jeux en ligne | Kit génération numérique',
}

const couleurs: Record<string, string> = {
  blue: 'from-loiret-blue to-loiret-blue-mid',
  orange: 'from-loiret-orange to-amber-400',
  teal: 'from-apnj-teal to-cyan-500',
  green: 'from-emerald-500 to-teal-400',
}

const jeux: Jeu[] = jeuxData

export default function JeuxPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-cyan-50 text-apnj-teal text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <span>🎮</span>
          <span>4 jeux disponibles</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-loiret-blue-dark mb-2">
          Jeux en ligne
        </h1>
        <p className="text-gray-500 text-sm">
          Apprenez en vous amusant avec nos jeux éducatifs interactifs
        </p>
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jeux.map((jeu) => (
          <Link
            key={jeu.id}
            href={`/jeux/${jeu.id}`}
            className="card group overflow-hidden active:scale-95 transition-transform"
          >
            <div className={`bg-gradient-to-br ${couleurs[jeu.couleur] ?? couleurs.blue} p-6 flex items-center justify-between`}>
              <span className="text-5xl">{jeu.emoji}</span>
              <span className="text-white/60 text-xs font-medium uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                {jeu.categorie}
              </span>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-loiret-blue-dark text-lg mb-1 group-hover:text-loiret-blue transition-colors">
                {jeu.titre}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{jeu.description}</p>
              <div className="flex items-center gap-1 text-loiret-blue text-sm font-medium">
                <span>Jouer maintenant</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        Les jeux s&apos;ouvrent dans l&apos;application. Une connexion internet est requise.
      </p>
    </div>
  )
}
