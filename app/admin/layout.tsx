import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple admin header */}
      <header className="bg-figarie-black text-white border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-light tracking-figarie uppercase">
                FIGARIE Admin
              </span>
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="/admin"
                  className="text-sm text-gray-300 hover:text-figarie-gold transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/leads"
                  className="text-sm text-gray-300 hover:text-figarie-gold transition-colors"
                >
                  Leads
                </Link>
                <Link
                  href="/admin/bookings"
                  className="text-sm text-gray-300 hover:text-figarie-gold transition-colors"
                >
                  Bookings
                </Link>
              </nav>
            </div>
            <Link
              href="/"
              className="text-sm text-figarie-gold hover:text-figarie-gold-dark transition-colors"
            >
              View Site
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
