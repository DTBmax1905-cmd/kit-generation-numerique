'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) =>
    pathname === path ? 'text-loiret-blue font-semibold' : 'text-gray-600 hover:text-loiret-blue'

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/logos/loiret.png"
              alt="Loiret votre Département"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-loiret-blue text-lg leading-tight hidden sm:block">
            Kit génération<br />
            <span className="text-loiret-orange">numérique</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/presentation" className={isActive('/presentation')}>Présentation</Link>
          <Link href="/jeux" className={isActive('/jeux')}>Jeux en ligne</Link>
          <Link href="/fiches" className={isActive('/fiches')}>Fiches mémo</Link>
          <Link href="/connexion" className="btn-primary text-sm py-2 px-4">
            Mon espace
          </Link>
        </nav>
      </div>
    </header>
  )
}
