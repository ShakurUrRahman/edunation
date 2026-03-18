<div align="center">
  <img src="./public/logo.png" alt="Edunation Logo" width="180" />

  <h1>Edunation</h1>

  <p>A modern, full-stack e-learning platform built with Next.js 14 — featuring course discovery, secure authentication, payments, and a glassmorphism-inspired UI.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel" />
  </p>
</div>

---

## ✨ Features

- 🎓 **Course Discovery** — Browse, search, sort, and filter courses by category, price range, and rating
- 🔐 **Authentication** — OAuth via GitHub & Google using `better-auth`
- 💳 **Payments** — Subscription and one-time payments via Polar
- 📬 **Email** — Transactional emails via Nodemailer + Brevo SMTP
- ⚡ **Background Jobs** — Async workflows powered by Inngest
- 🖼️ **Glassmorphism UI** — Space-themed animations with a modern, layered visual style
- 📱 **Fully Responsive** — Mobile-first layout with a collapsible filter drawer and hamburger nav
- 🔒 **Admin Panel** — Hidden admin access with httpOnly cookie-based session and secret trigger
- 🌙 **Dark Mode** — Full dark mode support via `next-themes`

---

## 🛠️ Tech Stack

| Layer               | Technology                           |
| ------------------- | ------------------------------------ |
| **Framework**       | Next.js 14 (App Router)              |
| **Language**        | TypeScript                           |
| **Styling**         | Tailwind CSS                         |
| **UI Animations**   | Framer Motion                        |
| **Auth**            | better-auth (GitHub, Google OAuth)   |
| **Database**        | Neon PostgreSQL (serverless)         |
| **ORM**             | Prisma                               |
| **Storage**         | Supabase (jsonb data + file storage) |
| **Payments**        | Polar                                |
| **Background Jobs** | Inngest                              |
| **Email**           | Nodemailer + Brevo SMTP              |
| **Deployment**      | Vercel                               |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Supabase](https://supabase.com) project
- A [Polar](https://polar.sh) account
- A [Brevo](https://brevo.com) account for SMTP
- A [Inngest](https://inngest.com) account

### Installation

```bash
git clone https://github.com/your-username/edunation.git
cd edunation
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Database
DATABASE_URL=your_neon_postgresql_url

# Auth
BETTER_AUTH_SECRET=your_auth_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email (Brevo SMTP)
BREVO_SMTP_USER=your_brevo_smtp_user
BREVO_SMTP_KEY=your_brevo_smtp_key
EMAIL_FROM=your_sender_email

# Payments (Polar)
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Admin
ADMIN_SECRET=your_admin_panel_secret
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
edunation/
├── app/                   # Next.js App Router pages & API routes
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (main)/            # Public-facing pages
│   │   └── courses/       # Course listing & detail pages
│   ├── admin/             # Hidden admin panel
│   └── api/               # API routes (auth, email, webhooks, inngest)
├── components/            # Reusable UI components
│   ├── courses/           # Course grid, filters, pagination, cards
│   └── ui/                # Shared UI (buttons, modals, etc.)
├── lib/                   # Utilities, Prisma client, auth config
├── prisma/                # Prisma schema & migrations
└── public/                # Static assets
```

---

## 🔄 Deployment (Vercel)

After deploying to Vercel:

1. **Add all environment variables** in the Vercel dashboard
2. **Update OAuth callback URLs** in GitHub and Google to your production domain:
    - `https://yourdomain.com/api/auth/callback/github`
    - `https://yourdomain.com/api/auth/callback/google`
3. **Sync Inngest** at `https://yourdomain.com/api/inngest`
4. **Register Polar webhook** pointing to `https://yourdomain.com/api/webhooks/polar`
5. **Neon auto-suspend** — ensure your connection string uses `?sslmode=require&connect_timeout=10` to handle cold starts gracefully

---

## 📄 License

This project is for educational purposes. All rights reserved.

---

<div align="center">
  Built with ❤️ by <strong>Shakur</strong>
</div>
