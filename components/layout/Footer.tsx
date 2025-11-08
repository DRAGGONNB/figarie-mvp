import Link from 'next/link'
import { BRAND } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-figarie-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-light tracking-figarie uppercase mb-4">
              {BRAND.name}
            </h3>
            <p className="text-figarie-gray-dark text-sm leading-relaxed max-w-md">
              {BRAND.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-figarie-gold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-figarie-gray-dark hover:text-figarie-gold transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-figarie-gray-dark hover:text-figarie-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-figarie-gray-dark hover:text-figarie-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-figarie-gold">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-figarie-gray-dark">
              <li>hello@figarie.com</li>
              <li>+27 (0) 123 456 789</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-figarie-gray-dark">
          <p>&copy; {currentYear} {BRAND.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
