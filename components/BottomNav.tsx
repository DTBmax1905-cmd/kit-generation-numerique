'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Accueil', icon: HomeIcon },
  { href: '/jeux', label: 'Jeux', icon: GameIcon },
  { href: '/fiches', label: 'Fiches', icon: BookIcon },
  { href: '/connexion', label: 'Mon espace', icon: UserIcon },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-top z-40 md:hidden">
      <div className="flex items-stretch">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors
                ${active ? 'text-loiret-blue' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Icon active={active} />
              <span className={`text-[10px] ${active ? 'font-semibold' : ''}`}>{label}</span>
              {active && (
                <span className="absolute bottom-0 w-10 h-0.5 bg-loiret-blue rounded-t-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-loiret-blue' : 'fill-gray-400'}`} viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  )
}

function GameIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-loiret-blue' : 'fill-gray-400'}`} viewBox="0 0 24 24">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9 20 9.67 20 10.5 19.33 12 18.5 12z" />
    </svg>
  )
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-loiret-blue' : 'fill-gray-400'}`} viewBox="0 0 24 24">
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
    </svg>
  )
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-loiret-blue' : 'fill-gray-400'}`} viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}
