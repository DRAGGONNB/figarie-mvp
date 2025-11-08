import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Admin Dashboard | FIGARIE',
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch basic stats
  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  const { count: bookingsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })

  // Fetch recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light tracking-figarie uppercase mb-8">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-figarie-gold">
              {leadsCount || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-figarie-gold">
              {bookingsCount || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-figarie-gold">
              {leadsCount && bookingsCount
                ? Math.round((bookingsCount / leadsCount) * 100)
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLeads && recentLeads.length > 0 ? (
            <div className="space-y-4">
              {recentLeads.map((lead: any) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">
                      {lead.name} {lead.surname}
                    </div>
                    <div className="text-sm text-gray-600">{lead.email}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {lead.service_type} •{' '}
                      {new Date(lead.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No leads yet. They will appear here once customers submit booking inquiries.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <a
          href="/admin/leads"
          className="text-figarie-gold hover:text-figarie-gold-dark transition-colors"
        >
          View all leads →
        </a>
      </div>
    </div>
  )
}
