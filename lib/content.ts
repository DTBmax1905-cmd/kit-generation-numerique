import fs from 'fs'
import path from 'path'
import type { Fiche, Jeu } from './types'

export function getFiches(): Fiche[] {
  const dir = path.join(process.cwd(), 'content/fiches')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try {
        const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
        return JSON.parse(raw) as Fiche
      } catch {
        return null
      }
    })
    .filter((f): f is Fiche => f !== null)
}

export function getJeux(): Jeu[] {
  const dir = path.join(process.cwd(), 'content/jeux')

  // Si pas encore de jeux dans content/, utiliser data/jeux.json
  if (!fs.existsSync(dir) || fs.readdirSync(dir).filter(f => f.endsWith('.json')).length === 0) {
    const fallback = path.join(process.cwd(), 'data/jeux.json')
    const raw = fs.readFileSync(fallback, 'utf-8')
    return JSON.parse(raw) as Jeu[]
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try {
        const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
        return JSON.parse(raw) as Jeu
      } catch {
        return null
      }
    })
    .filter((j): j is Jeu => j !== null)
}
