import type { Metadata } from 'next'
import Link from 'next/link'
import fichesData from '@/data/fiches.json'
import { getFiches } from '@/lib/content'
import type { FichesData } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Fiches mémo | Kit génération numérique',
}

const couleurs: Record<string, { bg: string; text: string; light: string }> = {
  green:  { bg: 'from-emerald-500 to-teal-400',     text: 'text-white', light: 'bg-emerald-50 text-emerald-700' },
  blue:   { bg: 'from-loiret-blue to-loiret-blue-mid', text: 'text-white', light: 'bg-blue-50 text-loiret-blue' },
  orange: { bg: 'from-loiret-orange to-amber-400',   text: 'text-white', light: 'bg-orange-50 text-orange-700' },
  purple: { bg: 'from-violet-600 to-purple-500',     text: 'text-white', light: 'bg-violet-50 text-violet-700' },
  pink:   { bg: 'from-pink-500 to-rose-400',         text: 'text-white', light: 'bg-pink-50 text-pink-700' },
}

const data = fichesData as FichesData

export default function FichesPage() {
  const fiches = getFiches()
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-loiret-orange-light text-loiret-orange-dark text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <span>📚</span>
          <span>{data.thematiques.length} thématiques</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-loiret-blue-dark mb-2">
          Fiches mémo
        </h1>
        <p className="text-gray-500 text-sm">
          Parcourez les ressources pratiques organisées par thématique
        </p>
      </div>

      {/* Thématiques grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.thematiques.map((thematique) => {
          const c = couleurs[thematique.couleur] ?? couleurs.blue
          const fichesCount = fiches.filter(f => f.thematique === thematique.id).length

          return (
            <Link
              key={thematique.id}
              href={`/fiches/${thematique.id}`}
              className="card group overflow-hidden active:scale-95 transition-transform"
            >
              <div className={`bg-gradient-to-br ${c.bg} p-5 flex items-center gap-4`}>
                <span className="text-4xl">{thematique.emoji}</span>
                <div>
                  <h2 className={`font-bold text-lg ${c.text}`}>{thematique.titre}</h2>
                  <p className={`text-sm ${c.text} opacity-80`}>
                    {thematique.sous_thematiques.length} sous-thématiques
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {thematique.sous_thematiques.slice(0, 3).map((st) => (
                    <span key={st.id} className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.light}`}>
                      {st.titre}
                    </span>
                  ))}
                  {thematique.sous_thematiques.length > 3 && (
                    <span className="text-xs text-gray-400">+{thematique.sous_thematiques.length - 3}</span>
                  )}
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-loiret-blue transition-colors flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
