'use client'

import Image from 'next/image'
import { PROFILS } from '@/lib/profils'
import { useProfile } from './ProfileProvider'

export default function ProfileSelector() {
  const { setProfil } = useProfile()

  return (
    <div className="fixed inset-0 z-50 bg-loiret-blue flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logos */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative h-12 w-12">
            <Image src="/logos/loiret.png" alt="Loiret" fill className="object-contain" />
          </div>
          <div className="relative h-12 w-24">
            <Image src="/logos/agir-jeunes.png" alt="Agir pour nos jeunes" fill className="object-contain" />
          </div>
        </div>

        <h1 className="text-white text-2xl font-bold text-center mb-1">
          Kit génération numérique
        </h1>
        <p className="text-white/70 text-center text-sm mb-8">
          Choisissez votre profil pour accéder à vos ressources
        </p>

        <div className="grid grid-cols-2 gap-3">
          {PROFILS.map((p) => (
            <button
              key={p.id}
              onClick={() => setProfil(p.id)}
              className={`bg-gradient-to-br ${p.couleur} rounded-2xl p-5 text-left text-white
                         active:scale-95 transition-transform hover:opacity-90`}
            >
              <div className="text-4xl mb-3">{p.emoji}</div>
              <div className="font-bold text-base mb-1">{p.label}</div>
              <div className="text-xs text-white/80 leading-relaxed">{p.description}</div>
            </button>
          ))}
        </div>

        <p className="text-white/40 text-center text-xs mt-6">
          Vous pourrez changer de profil à tout moment depuis "Mon espace"
        </p>
      </div>
    </div>
  )
}
