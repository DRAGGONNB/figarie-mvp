import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    const { service_type, name, surname, email, mobile } = body

    if (!service_type || !name || !surname || !email || !mobile) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate booking reference
    const bookingRef = `FIG-${service_type.toUpperCase().substring(0, 3)}-${Date.now()}`

    // Prepare lead data for Supabase
    const leadData = {
      name,
      surname,
      email,
      mobile,
      service_type,
      status: 'new',
      guest_count: body.guest_count ? parseInt(body.guest_count) : null,
      travel_dates: body.travel_dates || null,
      budget_range: body.budget_range || null,
      special_requests: body.special_requests || null,
      source: 'website',
      booking_reference: bookingRef,
    }

    // Insert lead into Supabase
    const supabase = await createClient()
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single()

    if (leadError) {
      console.error('Supabase lead insertion error:', leadError)
      // Continue even if DB insert fails - webhook might still work
    }

    // Forward to N8n webhook (if configured)
    const n8nUrl = process.env.N8N_WEBHOOK_BASE_URL

    if (n8nUrl && n8nUrl !== 'https://n8n.yourdomain.com') {
      try {
        const n8nResponse = await fetch(`${n8nUrl}/webhook/figarie-inquiry`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...body,
            booking_ref: bookingRef,
            lead_id: lead?.id,
            timestamp: new Date().toISOString(),
          }),
        })

        if (!n8nResponse.ok) {
          console.error('N8n webhook failed:', await n8nResponse.text())
        }
      } catch (n8nError) {
        console.error('N8n webhook error:', n8nError)
        // Don't fail the request if N8n is unavailable
      }
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Booking inquiry submitted successfully',
      booking_ref: bookingRef,
      lead_id: lead?.id,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process booking inquiry',
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(req: NextRequest) {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
