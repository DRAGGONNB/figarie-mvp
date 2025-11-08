import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Bookings | FIGARIE Admin',
}

export default async function BookingsPage() {
  const supabase = await createClient()

  // Fetch all bookings
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light tracking-figarie uppercase">Bookings</h1>
        <div className="text-sm text-gray-600">
          Total: {bookings?.length || 0}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">Error loading bookings: {error.message}</p>
        </div>
      )}

      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {bookings && bookings.length > 0 ? 'Bookings' : 'No bookings yet'}
            </h3>
            <p className="text-gray-500">
              {bookings && bookings.length > 0
                ? 'Booking management features coming soon.'
                : 'Confirmed bookings will appear here.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
