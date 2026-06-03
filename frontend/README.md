# Home Inspection — Frontend

Next.js 15 App Router marketing site with an integrated admin dashboard.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Font**: Geist (via `next/font`)

## Getting Started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                  # Root layout — html/body/fonts only
│   ├── (public)/                   # Route group — all public pages with navbar + footer
│   │   ├── layout.tsx              # SiteNavbar + SiteFooter wrapper
│   │   ├── page.tsx                # Home (/)
│   │   ├── about/                  # /about
│   │   ├── contact/                # /contact
│   │   ├── services/               # /services + /services/[slug]
│   │   ├── quote/                  # /quote
│   │   ├── faq/                    # /faq
│   │   ├── privacy/                # /privacy
│   │   └── terms/                  # /terms
│   ├── login/                      # /login — no navbar/footer
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── admin/                      # /admin/* — no navbar/footer
│       ├── layout.tsx
│       └── dashboard/
│           └── page.tsx            # /admin/dashboard
├── components/
│   ├── site-navbar.tsx
│   ├── site-footer.tsx
│   ├── home-hero-slider.tsx
│   ├── testimonial-slider.tsx
│   ├── QuoteForm.tsx
│   └── toast.tsx                   # Toast notification system
└── public/
```

## Pages

### Public

| Route | Description |
|-------|-------------|
| `/` | Home — hero slider, services, testimonials, CTAs |
| `/services` | Services overview — 4 service cards |
| `/services/[slug]` | Individual service page — dynamic, data-driven |
| `/about` | About us — team, certifications, testimonials |
| `/quote` | Multi-step quote request form |
| `/contact` | Contact form + sidebar |
| `/faq` | Accordion FAQ |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

### Admin (protected)

| Route | Description |
|-------|-------------|
| `/login` | Admin login with JWT cookie auth |
| `/admin/dashboard` | Dashboard — quotes + messages tables, status management, pagination |

## Forms

Both forms are wired to the backend API:

- **Quote form** (`/quote`) → `POST /api/v1/quotes` — 2-step, validates property + contact details
- **Contact form** (`/contact`) → `POST /api/v1/contact` — name, email, subject, message

## Admin Dashboard

- JWT cookie authentication (`credentials: "include"` on all fetch calls)
- Quotes table with status filter (all / pending / viewed / contacted)
- Inline status dropdown — `PATCH /api/v1/quotes/{id}`
- Server-side pagination (12 per page)
- Contact messages table with pagination
- Toast notifications for login, status changes, and logout

## Build

```bash
npm run build
npm start
```

## Deploy

Set `NEXT_PUBLIC_API_URL` to your deployed backend URL in Vercel environment variables. Set Root Directory to `frontend` in the Vercel project settings.
