import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DynamicForm } from '@/components/booking/DynamicForm'
import { SERVICES } from '@/lib/constants'
import { ServiceQuestion } from '@/types'

interface BookingPageProps {
  params: Promise<{
    service: string
  }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { service } = await params

  // Find service in constants
  const serviceInfo = SERVICES.find((s) => s.slug === service)

  if (!serviceInfo) {
    notFound()
  }

  // Fetch service questions from Supabase
  const supabase = await createClient()
  const { data: serviceCatalog, error } = await supabase
    .from('services_catalog')
    .select('service_name, base_questions, description')
    .eq('service_type', service)
    .eq('is_active', true)
    .single()

  // If no questions in DB, use default questions
  const defaultQuestions: ServiceQuestion[] = [
    { field: 'name', label: 'First Name', type: 'text', required: true },
    { field: 'surname', label: 'Last Name', type: 'text', required: true },
    { field: 'email', label: 'Email Address', type: 'email', required: true },
    { field: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
    { field: 'guest_count', label: 'Number of Guests', type: 'number', required: false },
    { field: 'travel_dates', label: 'Preferred Travel Dates', type: 'date', required: false },
    { field: 'budget_range', label: 'Budget Range (USD)', type: 'text', required: false },
    { field: 'special_requests', label: 'Special Requests or Requirements', type: 'textarea', required: false },
  ]

  let questions: ServiceQuestion[] = defaultQuestions

  if (serviceCatalog && serviceCatalog.base_questions) {
    try {
      const parsedQuestions = typeof serviceCatalog.base_questions === 'string'
        ? JSON.parse(serviceCatalog.base_questions)
        : serviceCatalog.base_questions

      if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
        questions = parsedQuestions
      }
    } catch (e) {
      console.error('Failed to parse questions:', e)
    }
  }

  return (
    <div className="min-h-screen bg-figarie-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{serviceInfo.icon}</div>
            <h1 className="text-4xl md:text-5xl font-light tracking-figarie uppercase mb-4">
              {serviceInfo.name}
            </h1>
            <p className="text-lg text-gray-600">
              {serviceCatalog?.description || serviceInfo.description}
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-light tracking-figarie uppercase mb-6">
              Request a Quote
            </h2>
            <p className="text-gray-600 mb-8">
              Please provide your details and preferences. Our luxury concierge team will contact you within 24 hours with a personalized quote.
            </p>

            <DynamicForm
              serviceType={service}
              serviceName={serviceInfo.name}
              questions={questions}
            />
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-figarie-black text-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">Need immediate assistance?</h3>
            <p className="text-sm text-gray-300 mb-4">
              For urgent requests or questions, please contact our 24/7 concierge team.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-figarie-gold">Email:</span> hello@figarie.com
              </p>
              <p>
                <span className="text-figarie-gold">Phone:</span> +27 (0) 123 456 789
              </p>
              <p>
                <span className="text-figarie-gold">WhatsApp:</span> +27 (0) 123 456 789
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all services
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }))
}

// Metadata
export async function generateMetadata({ params }: BookingPageProps) {
  const { service } = await params
  const serviceInfo = SERVICES.find((s) => s.slug === service)

  if (!serviceInfo) {
    return {
      title: 'Service Not Found | FIGARIE',
    }
  }

  return {
    title: `Book ${serviceInfo.name} | FIGARIE`,
    description: serviceInfo.description,
  }
}
