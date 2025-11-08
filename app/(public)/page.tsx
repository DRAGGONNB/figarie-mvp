import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/booking/ServiceCard'
import { BRAND, SERVICES } from '@/lib/constants'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-figarie-black text-white py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-light tracking-figarie uppercase mb-6">
              {BRAND.name}
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide text-figarie-gold mb-4">
              {BRAND.tagline}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              {BRAND.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="figarie-button text-base px-8 py-6">
                  Explore Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 border-figarie-gold text-white hover:bg-figarie-gold/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-figarie-gold to-transparent"></div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-figarie-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light tracking-figarie uppercase mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of luxury experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-figarie-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-figarie uppercase mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us curate an unforgettable experience tailored exclusively for you.
          </p>
          <Link href="/services">
            <Button size="lg" className="figarie-button text-base px-8 py-6">
              Start Planning
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
