import Link from 'next/link'
import Image from 'next/image'

const sections = [
  {
    href: '/presentation',
    titre: 'Présentation',
    description: 'Découvrez le plan numérique départemental et les objectifs du dispositif.',
    emoji: '📖',
    bg: 'from-loiret-blue to-loiret-blue-mid',
    text: 'text-white',
  },
  {
    href: '/jeux',
    titre: 'Jeux en ligne',
    description: 'Quiz, défis et jeux éducatifs pour apprendre en s\'amusant.',
    emoji: '🎮',
    bg: 'from-apnj-teal to-cyan-500',
    text: 'text-white',
  },
  {
    href: '/fiches',
    titre: 'Fiches mémo',
    description: 'Activités sportives, culturelles, manuelles et bien plus encore.',
    emoji: '📚',
    bg: 'from-loiret-orange to-amber-400',
    text: 'text-white',
  },
  {
    href: '/connexion',
    titre: 'Mon espace',
    description: 'Connectez-vous pour accéder à votre espace personnalisé.',
    emoji: '👤',
    bg: 'from-apnj-navy to-indigo-700',
    text: 'text-white',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Hero */}
      <section className="py-8 text-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
            <Image
              src="/logos/loiret.png"
              alt="Loiret votre Département"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-16 w-32 sm:h-20 sm:w-40 flex-shrink-0">
            <Image
              src="/logos/agir-jeunes.png"
              alt="Agir pour nos jeunes – Numérique"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-loiret-blue-dark mb-2">
          Kit génération numérique
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Ressources éducatives, jeux et fiches pratiques pour les familles loirétaines
        </p>
      </section>

      {/* Navigation cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
        {sections.map(({ href, titre, description, emoji, bg, text }) => (
          <Link
            key={href}
            href={href}
            className={`card bg-gradient-to-br ${bg} p-6 flex flex-col gap-3 active:scale-95 transition-transform`}
          >
            <span className="text-4xl">{emoji}</span>
            <div>
              <h2 className={`text-xl font-bold ${text} mb-1`}>{titre}</h2>
              <p className={`text-sm ${text} opacity-90 leading-relaxed`}>{description}</p>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${text} mt-auto opacity-90`}>
              <span>Accéder</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </section>

      {/* Footer note */}
      <p className="text-center text-xs text-gray-400 pb-4">
        Une action menée par le Département du Loiret
      </p>
    </div>
  )
}
