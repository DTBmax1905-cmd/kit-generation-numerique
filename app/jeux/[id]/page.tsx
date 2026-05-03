'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import jeuxData from '@/data/jeux.json'
import type { Jeu } from '@/lib/types'

const jeux: Jeu[] = jeuxData

export default function JeuPage() {
  const params = useParams()
  const router = useRouter()
  const [iframeError, setIframeError] = useState(false)

  const jeu = jeux.find((j) => j.id === params.id)

  if (!jeu) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <span className="text-5xl">🎮</span>
        <p className="text-gray-500">Jeu introuvable</p>
        <button onClick={() => router.back()} className="btn-primary">
          Retour
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-65px)]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-loiret-blue transition-colors p-1 -ml-1"
            aria-label="Retour"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">{jeu.emoji}</span>
            <span className="font-semibold text-loiret-blue-dark text-sm">{jeu.titre}</span>
          </div>
        </div>
        <a
          href={jeu.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-loiret-blue transition-colors"
        >
          <span>Ouvrir</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Game iframe or fallback */}
      {!iframeError ? (
        <iframe
          src={jeu.url}
          title={jeu.titre}
          className="flex-1 w-full border-none"
          onError={() => setIframeError(true)}
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center bg-gray-50">
          <span className="text-6xl">{jeu.emoji}</span>
          <h2 className="text-xl font-bold text-loiret-blue-dark">{jeu.titre}</h2>
          <p className="text-gray-500 text-sm max-w-xs">
            Ce jeu ne peut pas s&apos;afficher ici. Cliquez ci-dessous pour y jouer dans votre navigateur.
          </p>
          <a
            href={jeu.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Jouer dans le navigateur
          </a>
        </div>
      )}
    </div>
  )
}
