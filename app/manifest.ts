import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kit génération numérique',
    short_name: 'Kit GN',
    description: 'Ressources numériques éducatives pour les familles loirétaines',
    start_url: '/',
    display: 'standalone',
    background_color: '#005baa',
    theme_color: '#005baa',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['education', 'kids'],
    lang: 'fr',
  }
}
