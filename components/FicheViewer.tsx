'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Fiche } from '@/lib/types'

interface Props {
  fiche: Fiche
}

export default function FicheViewer({ fiche }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-loiret-blue-light flex items-center justify-center flex-shrink-0">
            {fiche.type === 'pdf' ? (
              <svg className="w-4 h-4 text-loiret-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-loiret-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{fiche.titre}</p>
            {fiche.description && (
              <p className="text-xs text-gray-400">{fiche.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
            {fiche.type}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Content */}
      {expanded && (
        <div className="border-t border-gray-100">
          {fiche.type === 'image' ? (
            <div className="relative w-full min-h-[200px]">
              <Image
                src={fiche.fichier}
                alt={fiche.titre}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div>
              <iframe
                src={fiche.fichier}
                title={fiche.titre}
                className="w-full h-[60vh] border-none"
              />
              <div className="p-3 border-t border-gray-100 flex justify-center">
                <a
                  href={fiche.fichier}
                  download
                  className="flex items-center gap-2 text-sm text-loiret-blue font-medium hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger le PDF
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
