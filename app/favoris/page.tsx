import type { Metadata } from 'next'
import { getFiches } from '@/lib/content'
import FavorisClient from '@/components/FavorisClient'

export const metadata: Metadata = {
  title: 'Mes favoris | Kit génération numérique',
}

export default function FavorisPage() {
  const fiches = getFiches()
  return <FavorisClient fiches={fiches} />
}
