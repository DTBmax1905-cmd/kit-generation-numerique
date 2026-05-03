'use client'

import { useProfile } from './ProfileProvider'
import FicheViewer from './FicheViewer'
import { ficheVisiblePourProfil } from '@/lib/profils'
import type { Fiche } from '@/lib/types'

export default function FichesList({ fiches }: { fiches: Fiche[] }) {
  const { profil } = useProfile()

  if (!profil) return null

  const visibles = fiches.filter((f) => ficheVisiblePourProfil(f, profil))

  if (visibles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📂</div>
        <p className="text-gray-500 font-medium mb-1">Aucune fiche disponible</p>
        <p className="text-gray-400 text-sm">
          {fiches.length > 0
            ? 'Ces fiches ne sont pas accessibles pour votre profil.'
            : "Les fiches seront ajoutées prochainement par l'administrateur."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {visibles.map((fiche) => (
        <FicheViewer key={fiche.id ?? fiche.titre} fiche={fiche} />
      ))}
    </div>
  )
}
