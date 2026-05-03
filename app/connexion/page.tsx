'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PROFILS, PROFIL_ADMIN } from '@/lib/profils'
import { useProfile } from '@/components/ProfileProvider'

declare global {
  interface Window {
    netlifyIdentity: {
      open: (mode?: string) => void
      on: (event: string, cb: (user?: unknown) => void) => void
      currentUser: () => Record<string, unknown> | null
      logout: () => void
    }
  }
}

export default function ConnexionPage() {
  const { profil, setProfil, clearProfil } = useProfile()
  const [changingProfil, setChangingProfil] = useState(false)
  const [adminUser, setAdminUser] = useState<Record<string, unknown> | null>(null)
  const [identityLoaded, setIdentityLoaded] = useState(false)

  const profilActuel = profil === 'admin' ? PROFIL_ADMIN : PROFILS.find((p) => p.id === profil)

  useEffect(() => {
    const init = () => {
      setAdminUser(window.netlifyIdentity.currentUser())
      window.netlifyIdentity.on('login', (u) => setAdminUser(u as Record<string, unknown>))
      window.netlifyIdentity.on('logout', () => setAdminUser(null))
      setIdentityLoaded(true)
    }
    if (window.netlifyIdentity) {
      init()
    } else {
      const script = document.createElement('script')
      script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
      script.onload = init
      document.head.appendChild(script)
    }
  }, [])

  if (changingProfil) {
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setChangingProfil(false)} className="text-gray-500 hover:text-loiret-blue">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="font-bold text-loiret-blue-dark text-lg">Changer de profil</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PROFILS.filter((p) => p.id !== 'admin').map((p) => (
            <button
              key={p.id}
              onClick={() => { setProfil(p.id); setChangingProfil(false) }}
              className={`bg-gradient-to-br ${p.couleur} rounded-2xl p-4 text-left text-white
                         active:scale-95 transition-transform
                         ${profil === p.id ? 'ring-4 ring-white ring-offset-2' : ''}`}
            >
              <div className="text-3xl mb-2">{p.emoji}</div>
              <div className="font-bold text-sm">{p.label}</div>
              <div className="text-xs text-white/80 mt-1 leading-relaxed">{p.description}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <div className="relative h-14 w-28 mx-auto mb-4">
          <Image src="/logos/agir-jeunes.png" alt="Agir pour nos jeunes" fill className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-loiret-blue-dark">Mon espace</h1>
      </div>

      {/* Profil actuel */}
      {profilActuel && (
        <div className={`bg-gradient-to-br ${profilActuel.couleur} rounded-2xl p-5 text-white mb-4`}>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{profilActuel.emoji}</span>
            <div>
              <p className="text-xs text-white/70">Profil actuel</p>
              <p className="font-bold text-lg">{profilActuel.label}</p>
            </div>
          </div>
          <p className="text-sm text-white/80">{profilActuel.description}</p>
        </div>
      )}

      <button
        onClick={() => setChangingProfil(true)}
        className="w-full py-3 rounded-full border border-loiret-blue text-loiret-blue font-semibold text-sm hover:bg-loiret-blue-light transition-colors mb-6"
      >
        Changer de profil
      </button>

      {/* Gestion des accès — visible uniquement pour les admins */}
      {profil === 'admin' && (
        <Link
          href="/admin-utilisateurs"
          className="flex items-center gap-3 card p-4 mb-4 hover:shadow-md transition-shadow"
        >
          <span className="text-2xl">👥</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-700 text-sm">Gestion des accès administrateur</p>
            <p className="text-xs text-gray-400">Inviter ou révoquer des administrateurs</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      {/* Connexion admin CMS */}
      <div className="card p-5">
        <h2 className="font-semibold text-gray-700 mb-1 text-sm">Accès administration</h2>
        <p className="text-xs text-gray-400 mb-4">
          Réservé aux gestionnaires de contenu du site.
        </p>

        {adminUser ? (
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Connecté : <span className="font-medium">{adminUser.email as string}</span>
            </p>
            <div className="flex gap-2">
              <a href="/admin/index.html" className="btn-primary text-sm py-2 px-4 text-center flex-1">
                Ouvrir l&apos;admin
              </a>
              <button
                onClick={() => window.netlifyIdentity?.logout()}
                className="py-2 px-4 rounded-full border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => window.netlifyIdentity?.open('login')}
            className="w-full btn-primary text-sm"
            disabled={!identityLoaded}
          >
            {identityLoaded ? 'Connexion administrateur' : 'Chargement...'}
          </button>
        )}
      </div>
    </div>
  )
}
