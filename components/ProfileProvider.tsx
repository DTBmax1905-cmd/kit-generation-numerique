'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ProfilId } from '@/lib/types'

interface ProfileContextType {
  profil: ProfilId | null
  setProfil: (p: ProfilId) => void
  clearProfil: () => void
  ready: boolean
}

const ProfileContext = createContext<ProfileContextType>({
  profil: null,
  setProfil: () => {},
  clearProfil: () => {},
  ready: false,
})

export function useProfile() {
  return useContext(ProfileContext)
}

export default function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profil, setProfilState] = useState<ProfilId | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('kit-gn-profil') as ProfilId | null
    if (saved) setProfilState(saved)
    setReady(true)

    let mounted = true

    const setAdmin = () => {
      if (!mounted) return
      localStorage.setItem('kit-gn-profil', 'admin')
      setProfilState('admin')
    }

    const revertAdmin = () => {
      if (!mounted) return
      const prev = localStorage.getItem('kit-gn-profil-prev') as ProfilId | null
      if (prev) {
        localStorage.setItem('kit-gn-profil', prev)
        setProfilState(prev)
      } else {
        localStorage.removeItem('kit-gn-profil')
        setProfilState(null)
      }
    }

    // Attache les listeners dès que le widget Netlify Identity est disponible
    const setupIdentity = () => {
      if (!mounted || !window.netlifyIdentity) return

      // Session déjà restaurée (navigation SPA ou rechargement)
      if (window.netlifyIdentity.currentUser()) {
        setAdmin()
      }

      // Restauration asynchrone de la session (init arrive après le chargement du script)
      window.netlifyIdentity.on('init', (user) => { if (user) setAdmin() })
      window.netlifyIdentity.on('login', setAdmin)
      window.netlifyIdentity.on('logout', revertAdmin)
    }

    if (window.netlifyIdentity) {
      // Widget déjà chargé
      setupIdentity()
    } else {
      // Attendre que le widget soit disponible (polling 100ms, max 15s)
      let elapsed = 0
      const poll = setInterval(() => {
        elapsed += 100
        if (window.netlifyIdentity) {
          clearInterval(poll)
          setupIdentity()
        } else if (elapsed >= 15000) {
          clearInterval(poll)
        }
      }, 100)
      return () => { mounted = false; clearInterval(poll) }
    }

    return () => { mounted = false }
  }, [])

  const setProfil = (p: ProfilId) => {
    if (p !== 'admin') {
      localStorage.setItem('kit-gn-profil-prev', p)
    }
    localStorage.setItem('kit-gn-profil', p)
    setProfilState(p)
  }

  const clearProfil = () => {
    localStorage.removeItem('kit-gn-profil')
    localStorage.removeItem('kit-gn-profil-prev')
    setProfilState(null)
  }

  return (
    <ProfileContext.Provider value={{ profil, setProfil, clearProfil, ready }}>
      {children}
    </ProfileContext.Provider>
  )
}
