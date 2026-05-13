'use client'

import Link from 'next/link'
import type { Fiche } from '@/lib/types'
import { useFavorites } from '@/components/FavoritesProvider'
import FicheViewer from '@/components/FicheViewer'

interface Props {
  fiches: Fiche[]
}

export default function FavorisClient({ fiches }: Props) {
  const { favoris } = useFavorites()
  const fichesFavorites = fiches.filter((f) => favoris.includes(f.fichier))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <svg className="w-4 h-4 fill-red-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{fichesFavorites.length} fiche{fichesFavorites.length > 1 ? 's' : ''} sauvegardée{fichesFavorites.length > 1 ? 's' : ''}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-loiret-blue-dark mb-2">Mes favoris</h1>
        <p className="text-gray-500 text-sm">Vos fiches mémo sauvegardées</p>
      </div>

      {fichesFavorites.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-12 h-12 text-gray-200 mx-auto mb-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-gray-400 text-sm mb-4">Aucune fiche sauvegardée pour le moment.</p>
          <Link href="/fiches" className="btn-primary text-sm inline-block">
            Parcourir les fiches
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {fichesFavorites.map((fiche) => (
            <FicheViewer key={fiche.id} fiche={fiche} />
          ))}
        </div>
      )}
    </div>
  )
}
