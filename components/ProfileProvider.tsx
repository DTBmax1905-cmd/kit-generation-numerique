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
  }, [])

  const setProfil = (p: ProfilId) => {
    localStorage.setItem('kit-gn-profil', p)
    setProfilState(p)
  }

  const clearProfil = () => {
    localStorage.removeItem('kit-gn-profil')
    setProfilState(null)
  }

  return (
    <ProfileContext.Provider value={{ profil, setProfil, clearProfil, ready }}>
      {children}
    </ProfileContext.Provider>
  )
}
