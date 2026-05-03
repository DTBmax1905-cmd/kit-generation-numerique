import { getJeux } from '@/lib/content'
import JeuClient from '@/components/JeuClient'

export function generateStaticParams() {
  return getJeux().map((j) => ({ id: j.id }))
}

export default function JeuPage({ params }: { params: { id: string } }) {
  const jeu = getJeux().find((j) => j.id === params.id) ?? null
  return <JeuClient jeu={jeu} />
}
