'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface FavoritesContextType {
  favoris: string[]
  toggleFavori: (key: string) => void
  isFavori: (key: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType>({
  favoris: [],
  toggleFavori: () => {},
  isFavori: () => false,
})

export function useFavorites() {
  return useContext(FavoritesContext)
}

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoris, setFavoris] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('kit-gn-favoris')
    if (saved) setFavoris(JSON.parse(saved))
  }, [])

  const toggleFavori = useCallback((key: string) => {
    setFavoris((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      localStorage.setItem('kit-gn-favoris', JSON.stringify(next))
      return next
    })
  }, [])

  const isFavori = useCallback((key: string) => favoris.includes(key), [favoris])

  return (
    <FavoritesContext.Provider value={{ favoris, toggleFavori, isFavori }}>
      {children}
    </FavoritesContext.Provider>
  )
}
