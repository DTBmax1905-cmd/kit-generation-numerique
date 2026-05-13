'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PROFILS, PROFIL_ADMIN } from '@/lib/profils'
import { useProfile } from '@/components/ProfileProvider'
import { useFavorites } from '@/components/FavoritesProvider'

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
  const { favoris } = useFavorites()
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

      {/* Mes favoris */}
      <Link href="/favoris" className="card p-4 mb-4 flex items-center gap-4 hover:bg-gray-50 transition-colors active:scale-95 transition-transform">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm">Mes favoris</p>
          <p className="text-xs text-gray-400">
            {favoris.length === 0
              ? 'Aucune fiche sauvegardée'
              : `${favoris.length} fiche${favoris.length > 1 ? 's' : ''} sauvegardée${favoris.length > 1 ? 's' : ''}`}
          </p>
        </div>
        <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Options admin — visibles uniquement pour les admins */}
      {profil === 'admin' && (
        <div className="card p-4 mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Administration</p>
          <div className="flex flex-col gap-1">
            {[
              { href: '/admin-utilisateurs', emoji: '👥', label: 'Gérer les accès admin', desc: 'Inviter ou révoquer des administrateurs' },
              { href: '/admin/index.html#/collections/presentation', emoji: '📖', label: 'Modifier la présentation', desc: 'Titre, textes, objectifs, publics' },
              { href: '/admin/index.html#/collections/jeux', emoji: '🎮', label: 'Gérer les jeux en ligne', desc: 'Ajouter, modifier, supprimer des jeux' },
            ].map(({ href, emoji, label, desc }) => (
              <a key={href} href={href} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                <span className="text-xl shrink-0">{emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-700 text-sm">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Connexion admin CMS */}
      <div className="card p-5">
        {adminUser ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚙️</span>
              <div>
                <p className="text-sm font-semibold text-gray-700">Connecté en tant qu&apos;admin</p>
                <p className="text-xs text-gray-400">{adminUser.email as string}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="/admin/index.html" className="btn-primary text-sm py-2 px-4 text-center flex-1">
                Gérer le contenu (CMS)
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
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔐</span>
              <h2 className="font-semibold text-gray-700 text-sm">Vous êtes administrateur ?</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Connectez-vous avec votre compte pour accéder au profil Administrateur et gérer le contenu du site.
            </p>
            <button
              onClick={() => window.netlifyIdentity?.open('login')}
              className="w-full btn-primary text-sm"
              disabled={!identityLoaded}
            >
              {identityLoaded ? 'Se connecter' : 'Chargement...'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
