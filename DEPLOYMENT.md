# FIGARIE MVP - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Via Vercel CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Link Project** (run from project root)
```bash
vercel link
```
- Select your team/account
- Create new project or link to existing
- Project name: `figarie-mvp`

4. **Add Environment Variables**

Either via CLI:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter: https://urulopkczhipsynpxgtb.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Enter: your-anon-key

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Enter: your-service-role-key

vercel env add N8N_WEBHOOK_BASE_URL
# Enter: https://your-n8n-instance.com (or leave as placeholder)

vercel env add NEXT_PUBLIC_APP_URL
# Enter: https://figarie-mvp.vercel.app (or your custom domain)
```

Or via Vercel Dashboard (easier):
- Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
- Select your project
- Settings → Environment Variables
- Add all variables from `.env.local`

**Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://urulopkczhipsynpxgtb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
N8N_WEBHOOK_BASE_URL=https://n8n.yourdomain.com
NEXT_PUBLIC_APP_URL=https://figarie-mvp.vercel.app
```

5. **Deploy to Production**
```bash
vercel --prod
```

Your site will be live at: `https://figarie-mvp.vercel.app`

### Option 2: Via GitHub Integration

1. **Import Repository**
- Go to [https://vercel.com/new](https://vercel.com/new)
- Import Git Repository
- Select `DRAGGONNB/figarie-mvp`
- Branch: `claude/figarie-mvp-nextjs-setup-011CUvjZimANmxdwzafSm2qi`

2. **Configure Project**
- Framework Preset: Next.js
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `.next`

3. **Add Environment Variables**
- Click "Environment Variables"
- Add all variables from `.env.local`
- Make sure to select "Production", "Preview", and "Development"

4. **Deploy**
- Click "Deploy"
- Wait 2-3 minutes for build to complete

## Post-Deployment Checklist

### 1. Verify Deployment
- [ ] Visit your Vercel URL
- [ ] Landing page loads correctly
- [ ] All 12 services display on homepage
- [ ] Click on "Explore Services" - services page loads
- [ ] Mobile view looks correct (use DevTools)

### 2. Test Booking Flow
- [ ] Navigate to any service (e.g., `/book/private_air`)
- [ ] Fill out booking form
- [ ] Submit form
- [ ] Success message appears with booking reference
- [ ] Check Supabase dashboard for new lead:
  - Go to: https://supabase.com/dashboard/project/urulopkczhipsynpxgtb/editor/leads
  - Verify new row was created

### 3. Test Admin Dashboard
- [ ] Visit `/admin`
- [ ] Dashboard loads with stats
- [ ] Navigate to `/admin/leads`
- [ ] Your test lead appears in the table

### 4. Check for Errors
- [ ] Open browser console (F12)
- [ ] Navigate through all pages
- [ ] Look for any console errors
- [ ] Check Vercel dashboard for build/runtime errors

## Custom Domain Setup (Optional)

### Add Custom Domain

1. **In Vercel Dashboard**
- Project Settings → Domains
- Add domain: `app.figarie.com`

2. **Update DNS Records**
Add these records in your domain registrar:

**For Subdomain (app.figarie.com):**
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

**For Root Domain (figarie.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

3. **Update Environment Variables**
```bash
vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://app.figarie.com
```

4. **Redeploy**
```bash
vercel --prod
```

## N8n Webhook Configuration

### Update N8n with Production URL

1. **Get Vercel URL**
After deployment, your webhook endpoint is:
```
https://figarie-mvp.vercel.app/api/webhook
```

2. **Update N8n Workflow**
- Log into N8n
- Open "FIGARIE - Lead Capture" workflow
- Update webhook node if needed
- Save and activate workflow

3. **Test Webhook**
- Submit a booking form on production site
- Check N8n execution history
- Verify workflow triggered successfully
- Check email was sent (if configured)

## Environment-Specific Configuration

### Development
```bash
npm run dev
# http://localhost:3000
```

### Preview (Branch Deployments)
Every push to a branch creates a preview deployment:
```
https://figarie-mvp-git-branch-name-user.vercel.app
```

### Production
```bash
vercel --prod
# https://figarie-mvp.vercel.app
```

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Add all required env vars in Vercel dashboard
- Make sure they're selected for Production

**Error: TypeScript errors**
```bash
# Locally test build
npm run build

# Fix any errors shown
```

### Runtime Errors

**Supabase connection fails**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check anon key is valid
- Ensure Supabase project is active

**Booking form doesn't submit**
- Check browser console for errors
- Verify `/api/webhook` endpoint is working
- Test Supabase credentials

**Admin page shows no data**
- Check Supabase RLS policies
- Verify service role key is correct
- Ensure tables have data

### Performance Issues

**Slow page loads**
- Enable Next.js caching:
  ```typescript
  // In page.tsx
  export const revalidate = 3600 // Cache for 1 hour
  ```

- Optimize images:
  ```typescript
  import Image from 'next/image'
  <Image src="/path" width={800} height={600} alt="..." />
  ```

## Monitoring & Analytics

### Vercel Analytics
Enable in project settings:
- Settings → Analytics
- Turn on Web Analytics
- View real-time metrics

### Supabase Monitoring
Monitor database performance:
- https://supabase.com/dashboard/project/urulopkczhipsynpxgtb/reports
- Check query performance
- Monitor API usage

## Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local`
- ✅ Use separate keys for dev/prod
- ✅ Rotate service role keys periodically

### Supabase RLS
Enable Row Level Security:
```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for booking forms)
CREATE POLICY "Allow public lead creation" ON leads
  FOR INSERT WITH CHECK (true);

-- Restrict reads to authenticated users (for admin)
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Scaling Considerations

### When to Upgrade

**Vercel Pro ($20/mo):**
- More than 100GB bandwidth/month
- Need password protection
- Require advanced analytics

**Supabase Pro ($25/mo):**
- More than 500MB database
- Need daily backups
- Require point-in-time recovery

## Maintenance

### Regular Tasks

**Weekly:**
- Check Vercel deployment logs
- Monitor Supabase database size
- Review lead submissions

**Monthly:**
- Update dependencies: `npm update`
- Review and archive old leads
- Check for Next.js updates

**Quarterly:**
- Rotate Supabase service keys
- Review and optimize database queries
- Update privacy policy/terms if needed

## Support

### Resources
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **N8n Docs**: https://docs.n8n.io

### Getting Help
- Vercel Support: support@vercel.com
- GitHub Issues: https://github.com/DRAGGONNB/figarie-mvp/issues
- Project Owner: chrisctserv@gmail.com

---

**Deployment Date**: 2025-11-08
**Version**: MVP 1.0
**Platform**: Vercel + Supabase
