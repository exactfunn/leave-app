# Leave App

A simple leave request app built with Next.js + Neon Postgres. Anyone can submit a leave request and approve/reject requests (no login).

## Push to GitHub

```bash
git init
git add .
git commit -m "leave app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/leave-app.git
git push -u origin main
```

## Deploy on Vercel

1. Go to https://vercel.com → **Add New → Project** → import your `leave-app` repo.
2. In the project, go to **Storage → Create Database → Neon (Serverless Postgres)**. Vercel auto-adds the `DATABASE_URL` env var.
3. **Deployments → Redeploy** so the app picks up the database.

The `leaves` table is created automatically on first API call — no manual SQL needed.

## Run locally

```bash
npm install
# add DATABASE_URL to .env.local (copy from Vercel Storage tab)
npm run dev
```

Open http://localhost:3000
