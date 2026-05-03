'use client'

import { useProfile } from './ProfileProvider'
import ProfileSelector from './ProfileSelector'

export default function ProfileGate({ children }: { children: React.ReactNode }) {
  const { profil, ready } = useProfile()

  if (!ready) return null
  if (!profil) return <ProfileSelector />
  return <>{children}</>
}
