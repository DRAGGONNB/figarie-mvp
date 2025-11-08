import { ServiceCard } from '@/components/booking/ServiceCard'
import { SERVICES, SERVICE_CATEGORIES } from '@/lib/constants'

export const metadata = {
  title: 'Our Services | FIGARIE',
  description: 'Explore our curated collection of luxury experiences - from private air charters to exclusive villas.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-figarie-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-figarie uppercase mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of luxury services, meticulously curated to exceed the expectations of the world&apos;s most discerning travelers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              name={service.name}
              icon={service.icon}
              description={service.description}
              category={service.category}
            />
          ))}
        </div>

        {/* Why Choose FIGARIE */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-light tracking-figarie uppercase mb-8 text-center">
            Why Choose FIGARIE
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Unmatched Expertise</h3>
              <p className="text-gray-600">
                Decades of experience curating extraordinary experiences for elite clientele worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-gray-600">
                Dedicated concierge team available 24/7 to ensure every detail exceeds expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Absolute Discretion</h3>
              <p className="text-gray-600">
                Your privacy and security are paramount. All bookings handled with utmost confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-figarie-black text-white rounded-lg p-12">
          <h2 className="text-3xl font-light tracking-figarie uppercase mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Contact our concierge team to start planning your bespoke experience.
          </p>
          <a
            href="mailto:hello@figarie.com"
            className="inline-block bg-figarie-gold hover:bg-figarie-gold-dark text-black font-medium px-8 py-3 rounded transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
