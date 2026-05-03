import fs from 'fs'
import path from 'path'
import type { Fiche, Jeu, Thematique, SousThematique } from './types'

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(process.cwd(), dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(full, f), 'utf-8')) as T
      } catch {
        return null
      }
    })
    .filter((x): x is T => x !== null)
}

interface SousThematiqueRaw {
  id: string
  titre: string
  thematique_id: string
}

interface ThematiqueRaw {
  id: string
  titre: string
  emoji: string
  couleur: string
  ordre?: number
}

export function getStructure(): { thematiques: Thematique[] } {
  const rawThematiques = readJsonDir<ThematiqueRaw>('content/thematiques')
  const rawSous = readJsonDir<SousThematiqueRaw>('content/sous-thematiques')

  const thematiques: Thematique[] = rawThematiques
    .sort((a, b) => (a.ordre ?? 99) - (b.ordre ?? 99))
    .map((t) => ({
      id: t.id,
      titre: t.titre,
      emoji: t.emoji,
      couleur: t.couleur,
      sous_thematiques: rawSous
        .filter((st) => st.thematique_id === t.id)
        .map((st): SousThematique => ({ id: st.id, titre: st.titre })),
    }))

  return { thematiques }
}

export function getFiches(): Fiche[] {
  return readJsonDir<Fiche>('content/fiches')
}

export function getJeux(): Jeu[] {
  const fromContent = readJsonDir<Jeu>('content/jeux')
  if (fromContent.length > 0) return fromContent

  const fallback = path.join(process.cwd(), 'data/jeux.json')
  return JSON.parse(fs.readFileSync(fallback, 'utf-8')) as Jeu[]
}
