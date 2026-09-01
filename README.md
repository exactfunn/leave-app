# Leave App

A simple leave request app built with Next.js + Vercel Postgres. Anyone can submit a leave request and approve/reject requests (no login).

## Push to GitHub

```bash
git init
git add .
git commit -m "leave app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/leave-app.git
git push -u origin main
```

(Create the empty `leave-app` repo at https://github.com/new first — don't add a README there, or the push will conflict.)

## Deploy on Vercel

1. Go to https://vercel.com → **Add New → Project** → import your `leave-app` repo.
2. In the project, go to **Storage → Create Database → Postgres**. Vercel auto-adds the `POSTGRES_URL` env var.
3. Click **Deploy**.

The `leaves` table is created automatically on first API call — no manual SQL needed.

## Run locally

```bash
npm install
# add POSTGRES_URL to .env.local (copy from Vercel dashboard)
npm run dev
```

Open http://localhost:3000
