# Wise Engineering Consultants — Website

A premium, animated marketing site for Wise Engineering Consultants, a
Mumbai-based structural audit & PMC (Project Management Consultancy) firm.
Built with React 19, Vite, Tailwind CSS v4 and Framer Motion.

## Tech Stack

- **React 19** + **Vite** (rolldown-vite) — build tooling
- **Tailwind CSS v4** (`@tailwindcss/vite`) — styling, custom `ink`/`brand` design tokens in `src/index.css`
- **React Router v7** — routing, with `React.lazy` code-splitting per page
- **Framer Motion** — scroll reveals, hero animation, page transitions
- **Lucide React** — icons (statically imported in `src/components/ui/Icon.jsx` for tree-shaking)
- **React Hook Form** — the contact form
- **React Helmet Async** — per-page SEO meta tags (`src/components/Seo.jsx`)
- **React CountUp** — animated stat counters
- **Embla Carousel** — the testimonial slider

## Project Structure

```
src/
  components/       Reusable building blocks (Card, ServiceCard, ContactForm, ...)
    ui/             Design-system primitives (Button, Badge, Icon, FAQAccordion, ...)
  layout/           Navbar, Footer, ScrollToTop, PageTransition
  sections/         Large composed sections used only on Home
  pages/            One file per route
  data/             Static content extracted from the company profile
  constants/        Contact details, single source of truth
  utils/            Small helpers (cn/classnames)
  index.css         Tailwind import + design tokens (@theme)
```

## Brand Tokens

- **Ink (navy)**: `ink-50` → `ink-950`, base `#0B0F19`
- **Brand (sky blue)**: `brand-50` → `brand-900`, base `#00AEEF`
- **Display font**: Poppins (headings) · **Body font**: Inter

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Deployment

The app builds to a static `dist/` folder and can be hosted anywhere that
serves static files. Since this is a client-side-routed SPA, the host must
rewrite all unknown paths to `index.html`.

**Vercel**
```bash
npm i -g vercel
vercel --prod
```
(Vercel auto-detects Vite; no extra config needed.)

**Netlify**
- Build command: `npm run build`
- Publish directory: `dist`
- Add a `_redirects` file in `public/` with: `/*  /index.html  200`

**Any static host (Nginx, S3+CloudFront, GitHub Pages, etc.)**
1. `npm run build`
2. Upload the contents of `dist/`
3. Configure a catch-all rewrite to `/index.html` for client-side routes
