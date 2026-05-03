import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import fichesData from '@/data/fiches.json'
import type { FichesData } from '@/lib/types'

interface Props {
  params: { thematique: string }
}

const data = fichesData as FichesData

export function generateStaticParams() {
  return data.thematiques.map((t) => ({ thematique: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const thematique = data.thematiques.find((t) => t.id === params.thematique)
  return {
    title: thematique
      ? `${thematique.titre} | Fiches mémo | Kit génération numérique`
      : 'Fiches mémo',
  }
}

const couleurs: Record<string, { bg: string; text: string; light: string; border: string }> = {
  green:  { bg: 'from-emerald-500 to-teal-400', text: 'text-white', light: 'bg-emerald-50', border: 'border-emerald-200' },
  blue:   { bg: 'from-loiret-blue to-loiret-blue-mid', text: 'text-white', light: 'bg-blue-50', border: 'border-blue-200' },
  orange: { bg: 'from-loiret-orange to-amber-400', text: 'text-white', light: 'bg-orange-50', border: 'border-orange-200' },
  purple: { bg: 'from-violet-600 to-purple-500', text: 'text-white', light: 'bg-violet-50', border: 'border-violet-200' },
  pink:   { bg: 'from-pink-500 to-rose-400', text: 'text-white', light: 'bg-pink-50', border: 'border-pink-200' },
}

export default function ThematiquePage({ params }: Props) {
  const thematique = data.thematiques.find((t) => t.id === params.thematique)
  if (!thematique) notFound()

  const c = couleurs[thematique.couleur] ?? couleurs.blue

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/fiches" className="hover:text-loiret-blue transition-colors">Fiches mémo</Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">{thematique.titre}</span>
      </nav>

      {/* Header */}
      <div className={`bg-gradient-to-br ${c.bg} rounded-2xl p-6 text-white mb-6 flex items-center gap-4`}>
        <span className="text-5xl">{thematique.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold mb-1">{thematique.titre}</h1>
          <p className="text-white/80 text-sm">
            {thematique.sous_thematiques.length} sous-thématiques disponibles
          </p>
        </div>
      </div>

      {/* Sous-thématiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {thematique.sous_thematiques.map((st) => {
          const fichesCount = data.fiches.filter(
            (f) => f.thematique === thematique.id && f.sous_thematique === st.id
          ).length

          return (
            <Link
              key={st.id}
              href={`/fiches/${thematique.id}/${st.id}`}
              className={`card p-4 flex items-center justify-between group ${c.light} ${c.border} border active:scale-95 transition-transform`}
            >
              <div>
                <h2 className="font-semibold text-gray-800 group-hover:text-loiret-blue transition-colors">
                  {st.titre}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {fichesCount > 0 ? `${fichesCount} fiche${fichesCount > 1 ? 's' : ''}` : 'Voir les fiches'}
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-loiret-blue transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
