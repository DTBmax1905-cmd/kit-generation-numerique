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

    // Auto-assign admin profile when Netlify Identity user is logged in
    const applyIdentity = () => {
      if (!window.netlifyIdentity) return
      const user = window.netlifyIdentity.currentUser()
      if (user) {
        localStorage.setItem('kit-gn-profil', 'admin')
        setProfilState('admin')
      }
      window.netlifyIdentity.on('login', () => {
        localStorage.setItem('kit-gn-profil', 'admin')
        setProfilState('admin')
      })
      window.netlifyIdentity.on('logout', () => {
        // Revert to last non-admin profile or clear
        const prev = localStorage.getItem('kit-gn-profil-prev') as ProfilId | null
        if (prev) {
          localStorage.setItem('kit-gn-profil', prev)
          setProfilState(prev)
        } else {
          localStorage.removeItem('kit-gn-profil')
          setProfilState(null)
        }
      })
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
