export const metadata = {
  title: 'Contact Us | FIGARIE',
  description: 'Get in touch with FIGARIE for luxury travel inquiries and bespoke experiences.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-figarie-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-light tracking-figarie uppercase mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Our concierge team is available 24/7 to assist with your inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-light tracking-figarie uppercase mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-figarie-gold mb-2">Email</h3>
                  <a
                    href="mailto:hello@figarie.com"
                    className="text-gray-700 hover:text-figarie-gold transition-colors"
                  >
                    hello@figarie.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    For general inquiries and bookings
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-figarie-gold mb-2">Phone</h3>
                  <a
                    href="tel:+27123456789"
                    className="text-gray-700 hover:text-figarie-gold transition-colors"
                  >
                    +27 (0) 123 456 789
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Available 24/7 for urgent requests
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-figarie-gold mb-2">WhatsApp</h3>
                  <a
                    href="https://wa.me/27123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-figarie-gold transition-colors"
                  >
                    +27 (0) 123 456 789
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Quick responses for on-the-go inquiries
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-figarie-gold mb-2">Office Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM SAST</p>
                  <p className="text-gray-700">Saturday: 10:00 AM - 2:00 PM SAST</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Emergency concierge available 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Inquiry */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-light tracking-figarie uppercase mb-6">
                Quick Inquiry
              </h2>
              <p className="text-gray-600 mb-6">
                For detailed booking requests, please visit our{' '}
                <a href="/services" className="text-figarie-gold hover:underline">
                  services page
                </a>{' '}
                and select the specific service you&apos;re interested in.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-figarie-gray rounded-lg">
                  <h3 className="font-semibold mb-2">Looking to book a specific service?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Browse our services and submit a detailed inquiry for personalized quotes.
                  </p>
                  <a
                    href="/services"
                    className="inline-block bg-figarie-gold hover:bg-figarie-gold-dark text-black font-medium px-6 py-2 rounded transition-colors"
                  >
                    View Services
                  </a>
                </div>

                <div className="p-4 bg-figarie-gray rounded-lg">
                  <h3 className="font-semibold mb-2">Need immediate assistance?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Call our 24/7 concierge line for urgent requests or time-sensitive bookings.
                  </p>
                  <a
                    href="tel:+27123456789"
                    className="inline-block bg-figarie-black hover:bg-gray-800 text-white font-medium px-6 py-2 rounded transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-figarie-black text-white rounded-lg p-8">
            <h2 className="text-2xl font-light tracking-figarie uppercase mb-4 text-center">
              Privacy & Security
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto">
              All communications with FIGARIE are handled with strict confidentiality.
              Your personal information is protected and never shared with third parties
              without your explicit consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
