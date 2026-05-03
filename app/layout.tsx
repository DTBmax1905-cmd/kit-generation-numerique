import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'Kit génération numérique | Département du Loiret',
  description: 'Ressources numériques éducatives, ludiques et pratiques pour les familles loirétaines.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kit GN',
  },
  icons: {
    apple: '/icons/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#005baa',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
