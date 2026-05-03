import jeuxData from '@/data/jeux.json'
import type { Jeu } from '@/lib/types'
import JeuClient from '@/components/JeuClient'

const jeux: Jeu[] = jeuxData

export function generateStaticParams() {
  return jeux.map((j) => ({ id: j.id }))
}

export default function JeuPage({ params }: { params: { id: string } }) {
  const jeu = jeux.find((j) => j.id === params.id) ?? null
  return <JeuClient jeu={jeu} />
}
