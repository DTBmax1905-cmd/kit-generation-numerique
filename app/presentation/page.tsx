import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Présentation | Kit génération numérique',
}

const objectifs = [
  {
    titre: 'Éduquer au numérique',
    texte: 'Développer les compétences numériques des jeunes et de leurs familles pour une pratique éclairée d\'internet.',
    emoji: '💡',
  },
  {
    titre: 'Lutter contre l\'illectronisme',
    texte: 'Accompagner les personnes éloignées du numérique pour réduire la fracture et garantir l\'égalité d\'accès.',
    emoji: '🤝',
  },
  {
    titre: 'Ressources accessibles',
    texte: 'Mettre à disposition des outils pratiques, ludiques et pédagogiques utilisables en famille ou en classe.',
    emoji: '📲',
  },
  {
    titre: 'Partenariat éducatif',
    texte: 'Fédérer les équipes éducatives, les parents et les adolescents autour d\'une culture numérique commune.',
    emoji: '🏫',
  },
]

const publics = [
  { label: 'Familles loirétaines', emoji: '👨‍👩‍👧‍👦' },
  { label: 'Parents', emoji: '👪' },
  { label: 'Adolescents', emoji: '🧑' },
  { label: 'Équipes éducatives', emoji: '👩‍🏫' },
]

export default function PresentationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-loiret-blue-light text-loiret-blue text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <span>📖</span>
          <span>Le dispositif</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-loiret-blue-dark mb-3">
          Plan numérique départemental
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
          Le Département du Loiret s&apos;engage pour un numérique inclusif et éducatif,
          au service de toutes les familles du territoire.
        </p>
      </div>

      {/* Engagement banner */}
      <div className="bg-gradient-to-r from-loiret-blue to-loiret-blue-mid rounded-2xl p-6 text-white mb-8">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 flex-shrink-0">
            <Image
              src="/logos/loiret.png"
              alt="Loiret"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg mb-1">L&apos;engagement du Département</h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Le Loiret investit dans la culture numérique de ses habitants en proposant des ressources
              gratuites, accessibles et adaptées à tous les âges, dans le cadre du programme
              <strong className="font-semibold"> Agir pour nos jeunes – Numérique</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Objectifs */}
      <section className="mb-8">
        <h2 className="section-title mb-4">Objectifs du dispositif</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {objectifs.map(({ titre, texte, emoji }) => (
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
          {publics.map(({ label, emoji }) => (
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
