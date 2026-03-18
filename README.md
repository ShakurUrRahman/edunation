<div align="center">
  <img src="./public/logo.png" alt="Edunation Logo" width="180" />

  <h1>Edunation</h1>

  <p>A modern, full-stack e-learning platform built with Next.js 14 — featuring course discovery, secure authentication, payments.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel" />
  </p>
</div>

---

## ✨ Features

- 🎓 **Course Discovery** — Browse, search, sort, and filter courses by category, price range, and rating
- 🔐 **Authentication** — OAuth via GitHub & Google using `better-auth`
- 💳 **Payments** — Stripe-powered checkout and webhook handling
- 📬 **Email** — Transactional emails via Nodemailer + Brevo SMTP
- 📱 **Fully Responsive** — Mobile-first layout with a collapsible filter drawer and hamburger nav

---

## 🛠️ Tech Stack

| Layer             | Technology              |
| ----------------- | ----------------------- |
| **Framework**     | Next.js 14 (App Router) |
| **Language**      | TypeScript              |
| **Styling**       | Tailwind CSS            |
| **UI Animations** | Framer Motion           |
| **Database**      | MongoDB Atlas           |
| **ODM**           | Mongoose                |
| **Payments**      | Stripe                  |
| **Email**         | Nodemailer + Brevo SMTP |
| **Deployment**    | Vercel                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://mongodb.com/atlas) cluster
- A [Stripe](https://stripe.com) account
- A [Brevo](https://brevo.com) account for SMTP

### Installation

```bash
git clone https://github.com/shakururrahman/edunation.git
cd edunation
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Auth

AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=your_auth_url

# Email (Brevo SMTP)
BREVO_SMTP_USER=your_brevo_smtp_user
BREVO_SMTP_KEY=your_brevo_smtp_key
EMAIL_FROM=your_sender_email

# Payments (Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

```

### Database Setup

No migrations needed — Mongoose handles schema via models. Just make sure your `MONGODB_URI` is set and your MongoDB Atlas cluster is accessible.

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
│   └── api/               # API routes (auth, email, stripe webhooks)
├── components/            # Reusable UI components
│   ├── courses/           # Course grid, filters, pagination, cards
│   └── ui/                # Shared UI (buttons, modals, etc.)
├── lib/                   # Utilities, Mongoose client, auth config
├── models/                # Mongoose schemas & models
└── public/                # Static assets
```

---

## 🔄 Deployment (Vercel)

After deploying to Vercel:

1. **Add all environment variables** in the Vercel dashboard
2. **Update OAuth callback URLs** in GitHub and Google to your production domain:
    - `https://yourdomain.com/api/auth/callback/github`
    - `https://yourdomain.com/api/auth/callback/google`
3. **Register Stripe webhook** pointing to `https://yourdomain.com/api/webhooks/stripe`
4. **MongoDB Atlas** — whitelist `0.0.0.0/0` in Network Access so Vercel serverless functions can connect

---

## 📄 License

This project is for educational purposes. All rights reserved.

---

<div align="center">
  Built with ❤️ by <strong>Shakur</strong>
</div>
