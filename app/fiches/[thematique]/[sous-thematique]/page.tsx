import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import fichesData from '@/data/fiches.json'
import { getFiches } from '@/lib/content'
import type { FichesData } from '@/lib/types'
import FicheViewer from '@/components/FicheViewer'

interface Props {
  params: { thematique: string; 'sous-thematique': string }
}

const data = fichesData as FichesData

export function generateStaticParams() {
  const paths: { thematique: string; 'sous-thematique': string }[] = []
  data.thematiques.forEach((t) => {
    t.sous_thematiques.forEach((st) => {
      paths.push({ thematique: t.id, 'sous-thematique': st.id })
    })
  })
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const thematique = data.thematiques.find((t) => t.id === params.thematique)
  const sousThematique = thematique?.sous_thematiques.find((st) => st.id === params['sous-thematique'])
  return {
    title: sousThematique
      ? `${sousThematique.titre} | ${thematique?.titre} | Kit génération numérique`
      : 'Fiches mémo',
  }
}

export default function SousThematiquePage({ params }: Props) {
  const thematique = data.thematiques.find((t) => t.id === params.thematique)
  if (!thematique) notFound()

  const sousThematique = thematique.sous_thematiques.find((st) => st.id === params['sous-thematique'])
  if (!sousThematique) notFound()

  const fiches = getFiches().filter(
    (f) => f.thematique === params.thematique && f.sous_thematique === params['sous-thematique']
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/fiches" className="hover:text-loiret-blue transition-colors">Fiches mémo</Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href={`/fiches/${thematique.id}`} className="hover:text-loiret-blue transition-colors">
          {thematique.titre}
        </Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">{sousThematique.titre}</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{thematique.emoji}</span>
        <div>
          <h1 className="text-xl font-bold text-loiret-blue-dark">{sousThematique.titre}</h1>
          <p className="text-sm text-gray-500">{thematique.titre}</p>
        </div>
      </div>

      {fiches.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📂</div>
          <p className="text-gray-500 font-medium mb-1">Aucune fiche disponible</p>
          <p className="text-gray-400 text-sm">
            Les fiches seront ajoutées prochainement par l&apos;administrateur.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {fiches.map((fiche) => (
            <FicheViewer key={fiche.id} fiche={fiche} />
          ))}
        </div>
      )}
    </div>
  )
}
