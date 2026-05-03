import type { Profil, ProfilId, Fiche } from './types'

export const PROFILS: Profil[] = [
  {
    id: 'parent',
    label: 'Parent',
    emoji: '👨‍👩‍👧',
    description: 'Ressources pour accompagner votre enfant',
    couleur: 'from-loiret-blue to-loiret-blue-mid',
  },
  {
    id: 'ado',
    label: 'Adolescent',
    emoji: '🧑',
    description: 'Activités et ressources pour les jeunes',
    couleur: 'from-apnj-teal to-cyan-500',
  },
  {
    id: 'educatif',
    label: 'Équipe éducative',
    emoji: '👩‍🏫',
    description: 'Outils et ressources pédagogiques',
    couleur: 'from-violet-600 to-purple-500',
  },
]

export const PROFIL_ADMIN: Profil = {
  id: 'admin',
  label: 'Administrateur',
  emoji: '⚙️',
  description: 'Accès complet à toutes les ressources',
  couleur: 'from-gray-700 to-gray-600',
}

export function ficheVisiblePourProfil(fiche: Fiche, profil: ProfilId): boolean {
  if (profil === 'admin') return true
  if (!fiche.profils || fiche.profils.length === 0) return true
  return fiche.profils.includes(profil)
}
