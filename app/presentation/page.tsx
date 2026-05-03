import type { Metadata } from 'next'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Présentation | Kit génération numérique',
}

interface PresentationData {
  titre: string
  intro: string
  engagement_titre: string
  engagement_texte: string
  objectifs: { emoji: string; titre: string; texte: string }[]
  publics: { emoji: string; label: string }[]
}

function getData(): PresentationData {
  const file = fs.readFileSync(path.join(process.cwd(), 'content/presentation.json'), 'utf-8')
  return JSON.parse(file)
}

export default function PresentationPage() {
  const data = getData()

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-loiret-blue-light text-loiret-blue text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <span>📖</span>
          <span>Le dispositif</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-loiret-blue-dark mb-3">
          {data.titre}
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
          {data.intro}
        </p>
      </div>

      {/* Engagement banner */}
      <div className="bg-gradient-to-r from-loiret-blue to-loiret-blue-mid rounded-2xl p-6 text-white mb-8">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 flex-shrink-0">
            <Image src="/logos/loiret.png" alt="Loiret" fill className="object-contain" />
          </div>
          <div>
            <h2 className="font-bold text-lg mb-1">{data.engagement_titre}</h2>
            <p className="text-white/90 text-sm leading-relaxed">{data.engagement_texte}</p>
          </div>
        </div>
      </div>

      {/* Objectifs */}
      <section className="mb-8">
        <h2 className="section-title mb-4">Objectifs du dispositif</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.objectifs.map(({ titre, texte, emoji }) => (
            <div key={titre} className="card p-5">
              <div className="text-3xl mb-3">{emoji}</div>
              <h3 className="font-semibold text-loiret-blue-dark mb-1">{titre}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Publics */}
      <section className="mb-8">
        <h2 className="section-title mb-4">Public concerné</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.publics.map(({ label, emoji }) => (
            <div key={label} className="card p-4 text-center">
              <div className="text-3xl mb-2">{emoji}</div>
              <p className="text-sm font-medium text-gray-700">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Logo APNJ */}
      <div className="text-center">
        <div className="relative h-24 w-48 mx-auto">
          <Image
            src="/logos/agir-jeunes.png"
            alt="Agir pour nos jeunes – Numérique"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Une action menée par le Département du Loiret</p>
      </div>
    </div>
  )
}
