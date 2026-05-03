import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#005baa',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
        <Script id="register-sw" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        `}</Script>
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-init" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function(user) {
              if (!user) {
                window.netlifyIdentity.on("login", function() {
                  document.location.href = "/";
                });
              }
            });
          }
        `}</Script>
      </body>
    </html>
  )
}
