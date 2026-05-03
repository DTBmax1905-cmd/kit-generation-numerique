exports.handler = async (event, context) => {
  const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  }

  function json(statusCode, data) {
    return { statusCode, headers: HEADERS, body: JSON.stringify(data) }
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' }
  }

  // Seuls les utilisateurs Netlify Identity authentifiés peuvent appeler cette fonction
  if (!context.clientContext?.user) {
    return json(401, { error: 'Non authentifié' })
  }

  // Netlify fournit automatiquement le token admin Identity dans clientContext
  const identity = context.clientContext?.identity
  if (!identity?.token || !identity?.url) {
    return json(500, {
      error: 'Token Identity non disponible. Vérifiez que Netlify Identity est activé sur ce site.',
    })
  }

  const { url: identityUrl, token: adminToken } = identity

  const adminHeaders = {
    Authorization: `Bearer ${adminToken}`,
    'Content-Type': 'application/json',
  }

  try {
    // GET — liste tous les utilisateurs
    if (event.httpMethod === 'GET') {
      const res = await fetch(`${identityUrl}/admin/users?per_page=100`, { headers: adminHeaders })
      const data = await res.json()
      return json(res.status, data)
    }

    // POST — inviter un nouvel utilisateur
    if (event.httpMethod === 'POST') {
      const { email } = JSON.parse(event.body || '{}')
      if (!email) return json(400, { error: 'Email requis' })

      const res = await fetch(`${identityUrl}/invite`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      return json(res.status, data)
    }

    // DELETE — supprimer un utilisateur (révoquer l'accès admin)
    if (event.httpMethod === 'DELETE') {
      const { userId } = JSON.parse(event.body || '{}')
      if (!userId) return json(400, { error: 'userId requis' })

      const res = await fetch(`${identityUrl}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: adminHeaders,
      })
      return json(res.status, { ok: res.ok })
    }

    return json(405, { error: 'Méthode non autorisée' })
  } catch (err) {
    return json(500, { error: err.message })
  }
}
