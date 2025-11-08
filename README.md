# FIGARIE MVP - Luxury Travel Booking Platform

> **Your Ultimate Luxury Experience** - A Next.js-powered booking platform for luxury travel services

## Overview

FIGARIE is a comprehensive luxury travel booking platform built with Next.js 15, Supabase, and N8n. It provides a seamless experience for customers to book premium services including private air charters, yacht rentals, luxury villas, and more.

### Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Automation**: N8n Workflows
- **Deployment**: Vercel
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation

## Features

### Customer-Facing Features
- ✅ Responsive landing page with service catalog
- ✅ Dynamic booking forms (12 luxury services)
- ✅ Real-time form validation
- ✅ Automated lead capture to Supabase
- ✅ Email notifications via N8n workflows
- ✅ Mobile-responsive design
- ✅ SEO-optimized pages

### Admin Features
- ✅ Admin dashboard with lead statistics
- ✅ Lead management interface
- ✅ Real-time data from Supabase
- ✅ Booking overview

### Services Available
1. 🚁 Private Air Charters
2. 🎈 Hot Air Balloon Experiences
3. 🛥️ Yacht Charters
4. ⛵ Catamaran Cruises
5. 🏡 Private Villa Rentals
6. 🚗 Luxury Transfers
7. 🚂 Luxury Rail Journeys
8. 💎 Diamond Sales
9. 🎪 Event Services
10. 📸 Professional Photography
11. 🛡️ Protection Services
12. 🏨 Hotel Representation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (already configured)
- N8n instance (optional - for email automation)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/figarie-mvp.git
cd figarie-mvp
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env.local` and update:

```bash
cp .env.example .env.local
```

Required environment variables:
```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://urulopkczhipsynpxgtb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# N8n (Optional - for email automation)
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
figarie-mvp/
├── app/
│   ├── (public)/              # Public routes (landing, services, booking)
│   │   ├── page.tsx           # Landing page
│   │   ├── services/          # Services listing
│   │   ├── book/[service]/    # Dynamic booking forms
│   │   ├── about/             # About page
│   │   └── contact/           # Contact page
│   ├── admin/                 # Admin dashboard
│   │   ├── page.tsx           # Admin home
│   │   ├── leads/             # Lead management
│   │   └── bookings/          # Booking management
│   ├── api/
│   │   └── webhook/           # N8n webhook proxy
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer
│   ├── booking/               # ServiceCard, DynamicForm
│   └── dashboard/             # Admin components
├── lib/
│   ├── supabase/              # Supabase clients
│   │   ├── client.ts          # Browser client
│   │   ├── server.ts          # Server client
│   │   └── middleware.ts      # Auth middleware
│   ├── utils/                 # Utility functions
│   └── constants.ts           # App constants
├── types/
│   ├── database.ts            # Supabase types
│   └── index.ts               # App types
└── public/                    # Static assets
```

## Key Pages

### Landing Page (`/`)
- Hero section with FIGARIE branding
- Service grid (12 services)
- Call-to-action sections

### Services Page (`/services`)
- Complete service catalog
- Service cards with descriptions
- Direct booking links

### Booking Pages (`/book/[service]`)
- Dynamic forms based on service type
- Form validation with Zod
- Submission to Supabase + N8n webhook
- Success confirmation with booking reference

### Admin Dashboard (`/admin`)
- Lead statistics
- Recent leads overview
- Quick navigation to leads/bookings

### Leads Management (`/admin/leads`)
- Complete lead listing
- Searchable/filterable table
- Lead status indicators
- Contact information display

## Database Schema

### Key Tables (Supabase)

**leads** - Customer booking inquiries
- `id`, `created_at`, `name`, `surname`, `email`, `mobile`
- `service_type`, `status`, `guest_count`, `travel_dates`
- `budget_range`, `special_requests`, `booking_reference`

**services_catalog** - Service definitions
- `id`, `service_type`, `service_name`, `description`
- `base_questions` (JSON), `is_active`

**bookings** - Confirmed bookings
- `id`, `created_at`, `user_id`, `service_type`
- `status`, `total_price`, `booking_date`, `guests`

## API Endpoints

### POST `/api/webhook`
**Purpose**: Receives booking form submissions and processes them

**Request Body**:
```json
{
  "service_type": "private_air",
  "name": "John",
  "surname": "Doe",
  "email": "john@example.com",
  "mobile": "+27123456789",
  "guest_count": 2,
  "travel_dates": "2025-12-01",
  "budget_range": "$50,000 - $100,000",
  "special_requests": "..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Booking inquiry submitted successfully",
  "booking_ref": "FIG-PRI-1699123456789",
  "lead_id": "uuid-here"
}
```

**Flow**:
1. Validates required fields
2. Generates unique booking reference
3. Inserts lead into Supabase
4. Forwards to N8n webhook (if configured)
5. Returns success response

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login and link project**
```bash
vercel login
vercel link
```

3. **Add environment variables in Vercel Dashboard**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`

4. **Deploy**
```bash
vercel --prod
```

### Post-Deployment Checklist
- [ ] Verify all pages load correctly
- [ ] Test booking form submission
- [ ] Check Supabase lead creation
- [ ] Verify N8n webhook trigger (if configured)
- [ ] Test mobile responsiveness
- [ ] Review console for errors

## N8n Workflow Integration

### Workflow: Lead Capture
**Trigger**: Webhook from `/api/webhook`

**Actions**:
1. Receive booking data
2. Create/update contact in Supabase
3. Create deal record
4. Send confirmation email (if Gmail configured)
5. Notify team via email/Slack

### Activating Workflows
1. Log into your N8n instance
2. Go to Workflows → FIGARIE - Lead Capture
3. Click "Active" toggle
4. Update webhook URL in `.env.local`

## Customization

### Adding New Services

1. Update `lib/constants.ts`:
```typescript
export const SERVICES = [
  // ... existing services
  {
    slug: 'new_service',
    name: 'New Service',
    icon: '🎯',
    description: 'Description here',
    category: 'category_name'
  }
]
```

2. Add service to Supabase `services_catalog` table with custom questions

3. Booking page will auto-generate at `/book/new_service`

### Customizing Form Questions

Questions are stored in Supabase `services_catalog.base_questions` as JSON:

```json
[
  {
    "field": "custom_field",
    "label": "Custom Question",
    "type": "text",
    "required": true,
    "placeholder": "Enter value..."
  }
]
```

Supported field types:
- `text`, `email`, `tel`, `date`, `number`, `textarea`, `select`

### Styling

Brand colors are defined in `tailwind.config.ts`:
```typescript
colors: {
  figarie: {
    black: '#000000',
    gold: '#D4AF37',
    'gold-dark': '#B8941F',
    white: '#FFFFFF',
    gray: '#F5F5F5',
    'gray-dark': '#8A8A8A',
  }
}
```

## Development

### Build for Production
```bash
npm run build
```

### Run Production Build Locally
```bash
npm run start
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### Build Warnings
The Supabase Edge Runtime warnings are expected and won't affect functionality. They occur because Supabase client uses Node.js APIs not available in middleware Edge Runtime.

### Form Not Submitting
1. Check browser console for errors
2. Verify Supabase credentials in `.env.local`
3. Ensure CORS is configured if using custom domain
4. Check N8n webhook URL is correct

### Leads Not Appearing in Admin
1. Verify Supabase RLS (Row Level Security) policies
2. Check admin page is fetching from correct table
3. Ensure database connection is active

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (secret) |
| `N8N_WEBHOOK_BASE_URL` | No | N8n instance URL for webhooks |
| `NEXT_PUBLIC_APP_URL` | Yes | Application URL (localhost or production) |
| `SENDGRID_API_KEY` | No | SendGrid API key (future) |
| `WHATSAPP_ACCESS_TOKEN` | No | WhatsApp Business API token (future) |

## Support

For issues or questions:
- **Email**: chrisctserv@gmail.com
- **Supabase Dashboard**: [https://supabase.com/dashboard/project/urulopkczhipsynpxgtb](https://supabase.com/dashboard/project/urulopkczhipsynpxgtb)

## License

Private - All Rights Reserved © 2025 FIGARIE

---

**Built with ❤️ for luxury travel**
