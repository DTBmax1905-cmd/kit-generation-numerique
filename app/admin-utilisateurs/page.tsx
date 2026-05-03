'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useProfile } from '@/components/ProfileProvider'

interface IdentityUser {
  id: string
  email: string
  created_at: string
  confirmed_at?: string
  last_sign_in_at?: string
}

export default function AdminUtilisateursPage() {
  const { profil } = useProfile()
  const [users, setUsers] = useState<IdentityUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const getToken = () => {
    const user = window.netlifyIdentity?.currentUser()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (user?.token as any)?.access_token as string | undefined
  }

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    const token = getToken()
    if (!token) { setError('Non connecté à Netlify Identity'); setLoading(false); return }
    try {
      const res = await fetch('/.netlify/functions/manage-users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur serveur')
      setUsers(data.users || [])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (profil === 'admin') fetchUsers()
  }, [profil, fetchUsers])

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!inviteEmail) return
    setInviting(true)
    setMessage(null)
    const token = getToken()
    try {
      const res = await fetch('/.netlify/functions/manage-users', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur lors de l\'invitation')
      setMessage({ type: 'ok', text: `Invitation envoyée à ${inviteEmail}` })
      setInviteEmail('')
      fetchUsers()
    } catch (e) {
      setMessage({ type: 'err', text: (e as Error).message })
    } finally {
      setInviting(false)
    }
  }

  async function handleDelete(user: IdentityUser) {
    if (!confirm(`Révoquer l'accès administrateur de ${user.email} ?`)) return
    setDeletingId(user.id)
    setMessage(null)
    const token = getToken()
    try {
      const res = await fetch('/.netlify/functions/manage-users', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erreur lors de la suppression')
      }
      setMessage({ type: 'ok', text: `Accès de ${user.email} révoqué` })
      fetchUsers()
    } catch (e) {
      setMessage({ type: 'err', text: (e as Error).message })
    } finally {
      setDeletingId(null)
    }
  }

  if (profil !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <p className="text-gray-500 font-medium mb-4">Accès réservé aux administrateurs</p>
        <Link href="/" className="btn-primary text-sm">Retour à l&apos;accueil</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/connexion" className="hover:text-loiret-blue transition-colors">Mon espace</Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">Gestion des accès</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">👥</span>
        <div>
          <h1 className="text-xl font-bold text-loiret-blue-dark">Gestion des accès administrateur</h1>
          <p className="text-sm text-gray-500">Invitez ou révoquez l&apos;accès admin à l&apos;application</p>
        </div>
      </div>

      {/* Inviter un utilisateur */}
      <div className="card p-5 mb-6">
        <h2 className="font-semibold text-gray-700 mb-1">Inviter un·e administrateur·rice</h2>
        <p className="text-xs text-gray-400 mb-4">
          La personne recevra un email d&apos;invitation. Une fois son compte créé, elle aura accès
          au profil Administrateur dans l&apos;application.
        </p>
        <form onSubmit={handleInvite} className="flex gap-2">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="adresse@email.fr"
            required
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-loiret-blue/30 focus:border-loiret-blue"
          />
          <button
            type="submit"
            disabled={inviting}
            className="btn-primary text-sm py-2 px-4 disabled:opacity-50"
          >
            {inviting ? 'Envoi…' : 'Inviter'}
          </button>
        </form>
        {message && (
          <p className={`mt-3 text-sm font-medium ${message.type === 'ok' ? 'text-green-600' : 'text-red-500'}`}>
            {message.type === 'ok' ? '✓ ' : '✗ '}{message.text}
          </p>
        )}
      </div>

      {/* Liste des utilisateurs */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">Administrateurs actifs</h2>
          <button onClick={fetchUsers} className="text-xs text-loiret-blue hover:underline">
            Actualiser
          </button>
        </div>

        {loading && (
          <div className="text-center py-8 text-gray-400 text-sm">Chargement…</div>
        )}

        {error && (
          <div className="text-sm text-red-500 py-4">
            <p className="font-medium mb-1">Erreur de chargement</p>
            <p className="text-xs text-red-400">{error}</p>
            {error.includes('JWT_SECRET') && (
              <p className="text-xs text-gray-400 mt-2">
                Configurez la variable d&apos;environnement <code className="bg-gray-100 px-1 rounded">JWT_SECRET</code> dans
                les paramètres Netlify (Site configuration → Environment variables).
                La valeur se trouve dans Netlify → Identity → Settings → JSON Web Token secret.
              </p>
            )}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">Aucun utilisateur trouvé</p>
        )}

        {!loading && !error && users.length > 0 && (
          <ul className="divide-y divide-gray-100">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between py-3 gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                  <p className="text-xs text-gray-400">
                    {user.confirmed_at
                      ? `Actif · dernière connexion ${user.last_sign_in_at
                          ? new Date(user.last_sign_in_at).toLocaleDateString('fr-FR')
                          : 'jamais'}`
                      : 'Invitation en attente'}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(user)}
                  disabled={deletingId === user.id}
                  className="shrink-0 text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 rounded-full px-3 py-1 transition-colors disabled:opacity-40"
                >
                  {deletingId === user.id ? '…' : 'Révoquer'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
