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

    const setAdmin = () => {
      localStorage.setItem('kit-gn-profil', 'admin')
      setProfilState('admin')
    }

    const revertAdmin = () => {
      const prev = localStorage.getItem('kit-gn-profil-prev') as ProfilId | null
      if (prev) {
        localStorage.setItem('kit-gn-profil', prev)
        setProfilState(prev)
      } else {
        localStorage.removeItem('kit-gn-profil')
        setProfilState(null)
      }
    }

    const applyIdentity = () => {
      if (!window.netlifyIdentity) return

      // Vérifie si la session est déjà restaurée
      if (window.netlifyIdentity.currentUser()) setAdmin()

      // Écoute l'init (restauration asynchrone de session au chargement)
      window.netlifyIdentity.on('init', (user) => { if (user) setAdmin() })
      window.netlifyIdentity.on('login', setAdmin)
      window.netlifyIdentity.on('logout', revertAdmin)
    }

    if (window.netlifyIdentity) {
      applyIdentity()
    } else {
      window.addEventListener('netlifyIdentityReady', applyIdentity, { once: true })
    }
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
