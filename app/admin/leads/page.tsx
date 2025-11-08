import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Leads | FIGARIE Admin',
}

export default async function LeadsPage() {
  const supabase = await createClient()

  // Fetch all leads
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light tracking-figarie uppercase">Leads</h1>
        <div className="text-sm text-gray-600">
          Total: {leads?.length || 0}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">Error loading leads: {error.message}</p>
        </div>
      )}

      {leads && leads.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name} {lead.surname}
                    </div>
                    <div className="text-sm text-gray-500">{lead.email}</div>
                    <div className="text-sm text-gray-500">{lead.mobile}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {lead.service_type?.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {lead.guest_count && (
                        <div>Guests: {lead.guest_count}</div>
                      )}
                      {lead.travel_dates && (
                        <div>Dates: {lead.travel_dates}</div>
                      )}
                      {lead.budget_range && (
                        <div>Budget: {lead.budget_range}</div>
                      )}
                    </div>
                    {lead.special_requests && (
                      <div className="text-xs text-gray-500 mt-1">
                        {lead.special_requests.substring(0, 100)}
                        {lead.special_requests.length > 100 ? '...' : ''}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lead.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : lead.status === 'qualified'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.created_at).toLocaleDateString()}
                    <div className="text-xs">
                      {new Date(lead.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No leads yet
              </h3>
              <p className="text-gray-500">
                Leads will appear here when customers submit booking inquiries through the website.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
