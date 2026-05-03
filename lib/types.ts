export interface Jeu {
  id: string
  titre: string
  categorie: string
  url: string
  description: string
  emoji: string
  couleur: string
}

export interface SousThematique {
  id: string
  titre: string
}

export interface Thematique {
  id: string
  titre: string
  emoji: string
  couleur: string
  sous_thematiques: SousThematique[]
}

export interface Fiche {
  id: string
  titre: string
  thematique: string
  sous_thematique: string
  type: 'image' | 'pdf'
  fichier: string
  description?: string
  date_maj: string
}

export interface FichesData {
  thematiques: Thematique[]
  fiches: Fiche[]
}
