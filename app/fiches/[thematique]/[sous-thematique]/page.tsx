import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStructure, getFiches } from '@/lib/content'
import FichesList from '@/components/FichesList'

interface Props {
  params: { thematique: string; 'sous-thematique': string }
}

export function generateStaticParams() {
  const { thematiques } = getStructure()
  const paths: { thematique: string; 'sous-thematique': string }[] = []
  thematiques.forEach((t) => {
    t.sous_thematiques.forEach((st) => {
      paths.push({ thematique: t.id, 'sous-thematique': st.id })
    })
  })
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { thematiques } = getStructure()
  const thematique = thematiques.find((t) => t.id === params.thematique)
  const sousThematique = thematique?.sous_thematiques.find((st) => st.id === params['sous-thematique'])
  return {
    title: sousThematique
      ? `${sousThematique.titre} | ${thematique?.titre} | Kit génération numérique`
      : 'Fiches mémo',
  }
}

export default function SousThematiquePage({ params }: Props) {
  const { thematiques } = getStructure()
  const thematique = thematiques.find((t) => t.id === params.thematique)
  if (!thematique) notFound()

  const sousThematique = thematique.sous_thematiques.find((st) => st.id === params['sous-thematique'])
  if (!sousThematique) notFound()

  const fiches = getFiches().filter(
    (f) => f.thematique === params.thematique && f.sous_thematique === params['sous-thematique']
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
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

      <FichesList fiches={fiches} />
    </div>
  )
}
