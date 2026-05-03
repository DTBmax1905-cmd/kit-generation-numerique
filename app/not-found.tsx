import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
      <span className="text-6xl">🔍</span>
      <h1 className="text-2xl font-bold text-loiret-blue-dark">Page introuvable</h1>
      <p className="text-gray-500 text-sm max-w-xs">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" className="btn-primary">
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
