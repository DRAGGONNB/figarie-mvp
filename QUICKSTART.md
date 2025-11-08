# FIGARIE MVP - Quick Start Guide

## ⚡ Deploy in 5 Minutes

### Step 1: Install Vercel CLI (1 min)
```bash
npm i -g vercel
vercel login
```

### Step 2: Deploy from this directory (2 min)
```bash
cd /home/user/figarie-mvp
vercel --prod
```

### Step 3: Add Environment Variables (2 min)
Go to Vercel Dashboard → Project Settings → Environment Variables

Add these (already configured in `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://urulopkczhipsynpxgtb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVydWxvcGtjemhpcHN5bnB4Z3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTk1NzcsImV4cCI6MjA3NDg3NTU3N30.-xqpZT5ENMSJCaIA-cWZsPjZMqjInBomlN6HhP3i7Vg
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVydWxvcGtjemhpcHN5bnB4Z3RiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI5OTU3NywiZXhwIjoyMDc0ODc1NTc3fQ.BfnK5pg7lbv3oD7Ktsj4eCTtJQrS6Qs0yDZEGx-8H-A
N8N_WEBHOOK_BASE_URL=https://n8n.yourdomain.com
NEXT_PUBLIC_APP_URL=https://figarie-mvp.vercel.app
```

**Done! 🎉** Your site is live.

---

## 🧪 Test Locally First

### Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

### Test the Booking Flow
1. Go to http://localhost:3000
2. Click "Explore Services"
3. Click "Book Now" on any service
4. Fill out the form and submit
5. Check Supabase for new lead:
   https://supabase.com/dashboard/project/urulopkczhipsynpxgtb/editor/leads

---

## 📱 What You Get

### Customer-Facing Pages
- **Landing Page**: `/`
- **Services**: `/services`
- **Booking Forms**: `/book/private_air`, `/book/yacht`, etc.
- **About**: `/about`
- **Contact**: `/contact`

### Admin Pages
- **Dashboard**: `/admin`
- **Leads**: `/admin/leads`
- **Bookings**: `/admin/bookings`

### API Endpoints
- **Webhook**: `/api/webhook` (handles form submissions)

---

## 🎯 Post-Deployment Testing

### 1. Test a Booking (2 min)
```
1. Visit https://your-vercel-url.vercel.app/book/private_air
2. Fill form:
   - Name: Test
   - Surname: User
   - Email: test@example.com
   - Mobile: +27123456789
3. Submit
4. Should see "Booking Inquiry Submitted!" message
5. Check Supabase dashboard for new lead
```

### 2. Check Admin Dashboard (1 min)
```
1. Visit https://your-vercel-url.vercel.app/admin
2. Should see lead count (1)
3. Click "Leads" in header
4. Should see your test lead in the table
```

### 3. Verify N8n Webhook (if configured)
```
1. Check N8n execution history
2. Should see webhook triggered
3. Verify email was sent (if configured)
```

---

## 🔧 Configure N8n (Optional)

### Get Your N8n Webhook URL
Ask Chris for the N8n instance URL, or set one up:

1. **Update `.env.local` (locally)**
```env
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com
```

2. **Update Vercel Env Var**
```bash
vercel env add N8N_WEBHOOK_BASE_URL production
# Enter: https://your-n8n-instance.com
```

3. **Redeploy**
```bash
vercel --prod
```

### N8n Workflow Expects This Format
```json
{
  "service_type": "private_air",
  "service_name": "Private Air Charters",
  "name": "John",
  "surname": "Doe",
  "email": "john@example.com",
  "mobile": "+27123456789",
  "guest_count": 2,
  "travel_dates": "2025-12-01",
  "budget_range": "$50k-$100k",
  "special_requests": "..."
}
```

---

## 📊 Database Access

### Supabase Dashboard
**URL**: https://supabase.com/dashboard/project/urulopkczhipsynpxgtb

**Quick Links**:
- **Table Editor**: /editor/leads
- **SQL Editor**: /sql
- **API Docs**: /api
- **Logs**: /logs

### Check Leads Table
```sql
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  figarie: {
    gold: '#D4AF37',      // Change this
    'gold-dark': '#B8941F', // And this
  }
}
```

### Add New Service
1. Edit `lib/constants.ts`:
```typescript
{
  slug: 'new_service',
  name: 'New Service Name',
  icon: '🎯',
  description: 'Service description',
  category: 'transport'
}
```

2. Add to Supabase `services_catalog` table
3. Booking page auto-generates at `/book/new_service`

### Modify Form Questions
In Supabase, edit `services_catalog.base_questions` (JSON):
```json
[
  {
    "field": "name",
    "label": "First Name",
    "type": "text",
    "required": true
  }
]
```

---

## 🚨 Troubleshooting

### Build Fails
```bash
# Test build locally
npm run build

# If successful, try deploying again
vercel --prod
```

### Form Doesn't Submit
1. Check browser console (F12)
2. Verify Supabase env vars are correct
3. Test locally: `npm run dev`

### No Leads in Admin
1. Check Supabase connection
2. Verify service role key
3. Check browser console for errors

---

## 📞 Support

**Email**: chrisctserv@gmail.com
**GitHub**: https://github.com/DRAGGONNB/figarie-mvp
**Supabase**: https://supabase.com/dashboard/project/urulopkczhipsynpxgtb

---

## ✅ Deployment Checklist

Before going live:
- [ ] Deployed to Vercel
- [ ] All env vars added
- [ ] Test booking form submission
- [ ] Verify lead appears in Supabase
- [ ] Check admin dashboard
- [ ] Test on mobile
- [ ] Configure N8n webhook (optional)
- [ ] Set up custom domain (optional)

---

**Built with Next.js 15, Supabase, and N8n** 🚀
