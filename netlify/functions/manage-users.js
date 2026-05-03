// eslint-disable-next-line @typescript-eslint/no-require-imports
const jwt = require('jsonwebtoken')

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
}

function json(statusCode, data) {
  return { statusCode, headers: HEADERS, body: JSON.stringify(data) }
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' }
  }

  // Seuls les utilisateurs Netlify Identity authentifiés peuvent appeler cette fonction
  if (!context.clientContext?.user) {
    return json(401, { error: 'Non authentifié' })
  }

  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) {
    return json(500, { error: 'JWT_SECRET non configuré — voir la documentation de configuration' })
  }

  const siteUrl = process.env.URL
  if (!siteUrl) {
    return json(500, { error: 'Variable URL manquante' })
  }

  const identityUrl = `${siteUrl}/.netlify/identity`

  // Token service_role pour l'API admin GoTrue
  const adminToken = jwt.sign(
    { sub: 'service-role', role: 'service_role', aud: 'netlify' },
    JWT_SECRET,
    { algorithm: 'HS256' }
  )

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
