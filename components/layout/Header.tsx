import Link from 'next/link'
import { BRAND } from '@/lib/constants'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-light tracking-figarie uppercase">
              {BRAND.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-figarie-gold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-700 hover:text-figarie-gold transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-figarie-gold transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium bg-figarie-gold hover:bg-figarie-gold-dark text-black px-4 py-2 rounded transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button - simplified for MVP */}
          <button className="md:hidden p-2 text-gray-700">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
