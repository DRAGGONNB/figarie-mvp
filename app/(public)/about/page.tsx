import { BRAND } from '@/lib/constants'

export const metadata = {
  title: 'About Us | FIGARIE',
  description: 'Learn about FIGARIE - your partner in luxury travel and bespoke experiences.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-figarie-black text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-figarie uppercase mb-6">
            About {BRAND.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {BRAND.tagline}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-light tracking-figarie uppercase mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                FIGARIE was born from a simple yet profound belief: that luxury travel should transcend the ordinary and deliver experiences that resonate for a lifetime.
              </p>
              <p>
                We specialize in curating bespoke luxury experiences for discerning travelers who demand nothing but the finest. From private air charters to exclusive villa rentals, yacht expeditions to rare diamond acquisitions, every service we offer reflects our commitment to excellence.
              </p>
              <p>
                Our global network of partners, combined with our deep industry expertise, allows us to unlock doors that remain closed to others. We don&apos;t just book trips—we create unforgettable journeys tailored to your unique vision.
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-light tracking-figarie uppercase mb-6">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-figarie-gray p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-figarie-gold">Excellence</h3>
                <p className="text-gray-700">
                  We settle for nothing less than perfection in every detail of your experience.
                </p>
              </div>
              <div className="bg-figarie-gray p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-figarie-gold">Integrity</h3>
                <p className="text-gray-700">
                  Transparency, honesty, and ethical practices guide every decision we make.
                </p>
              </div>
              <div className="bg-figarie-gray p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-figarie-gold">Personalization</h3>
                <p className="text-gray-700">
                  No two clients are alike. Every experience is tailored to your preferences.
                </p>
              </div>
              <div className="bg-figarie-gray p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-figarie-gold">Discretion</h3>
                <p className="text-gray-700">
                  Your privacy is sacred. We handle all arrangements with absolute confidentiality.
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section className="mb-16">
            <h2 className="text-3xl font-light tracking-figarie uppercase mb-6">
              What We Do
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                FIGARIE is more than a luxury travel agency—we are your trusted partner in creating life&apos;s most memorable moments. Our services span:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Private air and marine transportation</li>
                <li>Exclusive accommodation sourcing</li>
                <li>Bespoke event planning and experiences</li>
                <li>Luxury goods procurement</li>
                <li>Concierge and protection services</li>
              </ul>
              <p>
                Whether you&apos;re planning a romantic getaway, a family adventure, or a corporate retreat, we have the expertise and connections to make it extraordinary.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-figarie-black text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-light tracking-figarie uppercase mb-4">
              Let&apos;s Create Something Extraordinary
            </h2>
            <p className="text-gray-300 mb-6">
              Contact our team to discuss your next luxury experience.
            </p>
            <a
              href="mailto:hello@figarie.com"
              className="inline-block bg-figarie-gold hover:bg-figarie-gold-dark text-black font-medium px-8 py-3 rounded transition-colors"
            >
              Get in Touch
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
