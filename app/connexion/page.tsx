'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    netlifyIdentity: {
      open: (mode?: string) => void
      close: () => void
      on: (event: string, cb: (user?: unknown) => void) => void
      currentUser: () => Record<string, unknown> | null
      logout: () => void
    }
  }
}

export default function ConnexionPage() {
  const [user, setUser] = useState<Record<string, unknown> | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (window.netlifyIdentity) {
      setUser(window.netlifyIdentity.currentUser())
      window.netlifyIdentity.on('login', (u) => setUser(u as Record<string, unknown>))
      window.netlifyIdentity.on('logout', () => setUser(null))
      setLoaded(true)
    } else {
      const script = document.createElement('script')
      script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
      script.onload = () => {
        window.netlifyIdentity.on('login', (u) => setUser(u as Record<string, unknown>))
        window.netlifyIdentity.on('logout', () => setUser(null))
        setUser(window.netlifyIdentity.currentUser())
        setLoaded(true)
      }
      document.head.appendChild(script)
    }
  }, [])

  const handleLogin = () => window.netlifyIdentity?.open('login')
  const handleSignup = () => window.netlifyIdentity?.open('signup')
  const handleLogout = () => window.netlifyIdentity?.logout()

  const userEmail = user?.email as string | undefined
  const userName = (user?.user_metadata as { full_name?: string } | undefined)?.full_name

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="relative h-16 w-32 mx-auto mb-4">
          <Image src="/logos/agir-jeunes.png" alt="Agir pour nos jeunes" fill className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-loiret-blue-dark">Mon espace</h1>
        <p className="text-gray-500 text-sm mt-1">Connectez-vous pour accéder à votre espace personnel</p>
      </div>

      {user ? (
        /* Logged in state */
        <div className="card p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-loiret-blue-light flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-loiret-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <p className="font-semibold text-loiret-blue-dark text-lg mb-0.5">
            {userName ?? 'Bienvenue'}
          </p>
          {userEmail && (
            <p className="text-gray-500 text-sm mb-6">{userEmail}</p>
          )}

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              <span className="text-xl">🎮</span>
              <span>Accès aux jeux en ligne</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              <span className="text-xl">📚</span>
              <span>Accès aux fiches mémo</span>
            </div>
          </div>

          <button onClick={handleLogout} className="w-full py-2.5 rounded-full border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors">
            Se déconnecter
          </button>
        </div>
      ) : (
        /* Logged out state */
        <div className="card p-6">
          {loaded ? (
            <div className="space-y-3">
              <button onClick={handleLogin} className="btn-primary w-full text-center">
                Se connecter
              </button>
              <button onClick={handleSignup} className="w-full py-3 rounded-full border border-loiret-blue text-loiret-blue font-semibold text-sm hover:bg-loiret-blue-light transition-colors">
                Créer un compte
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-loiret-blue border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <div className="mt-6 space-y-2">
            {[
              { emoji: '👨‍👩‍👧‍👦', label: 'Parents' },
              { emoji: '🧑', label: 'Adolescents' },
              { emoji: '👩‍🏫', label: 'Équipes éducatives' },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-gray-500">
                <span>{emoji}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Votre compte est gratuit et sécurisé.
          </p>
        </div>
      )}
    </div>
  )
}
