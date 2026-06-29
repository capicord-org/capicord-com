# Capicord — Credit, Connected.

> India's digital Lending Service Provider (LSP) platform connecting borrowers, DSA agents, and NBFC lending partners through technology.

**Live:** [capicord.in](https://capicord.in)

---

## What is Capicord?

Capicord is a **Pure LSP** — it does not lend money. It is the technology bridge between:

- **Borrowers** — rural, self-employed, small business owners, first-time credit seekers, women entrepreneurs
- **Field Agents / DSAs** — who assist borrowers with onboarding and application submission
- **NBFC Lending Partners** — who approve, underwrite, and disburse loans

Capicord handles borrower onboarding, KYC verification, loan application processing, document collection, application routing to NBFC partners, status tracking, and agent network management. All lending, approval, and disbursement is done solely by partner NBFCs regulated by the Reserve Bank of India.

---

## This Repository

This repo is the **public introduction website** for Capicord (`capicord.in`). It is a single-page, fully static marketing site — no backend, no login, no dashboard.

### Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Rendering | Static Site Generation (`output: export`) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Components | [Radix UI](https://radix-ui.com) primitives |
| Font | Inter (Google Fonts via `next/font`) |
| Form delivery | [Web3Forms](https://web3forms.com) |
| Analytics | Vercel Analytics + Speed Insights |
| Language | TypeScript |

### Page Sections

1. **Navbar** — sticky, scroll-aware, responsive mobile menu (Radix Dialog)
2. **Hero** — headline, sub-headline, Borrower → Capicord → NBFC flow diagram
3. **Trust Bar** — RBI compliance, transparent pricing, 256-bit encryption
4. **How it Works** — 3-step process (Register, Match & Verify, Receive Funds)
5. **For Whom** — audience cards for Borrowers, Agents & DSAs, NBFC Partners
6. **What We Stand For** — 4 principles (Transparency, Credit Assessment, Mobile-First, Compliance)
7. **Contact** — form with inline validation; submissions delivered to `admin@capicord.com`
8. **Footer** — links, social handles, LSP legal disclaimer

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment Variables

Copy the example file and fill in your [Web3Forms](https://web3forms.com) access key:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

Get a free key at [web3forms.com](https://web3forms.com) — enter `admin@capicord.com` and they'll email you a key instantly.

### Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build (Static Export)

```bash
npm run build
```

Outputs a fully static site to the `out/` directory. Every route is pre-rendered as HTML at build time.

---

## Project Structure

```
app/
├── components/
│   ├── Navbar.tsx          # Client component — scroll shadow + mobile menu
│   └── ContactForm.tsx     # Client component — form state, validation, Web3Forms POST
├── globals.css             # Tailwind v4 theme tokens (brand colours, font)
├── icon.svg                # Custom favicon (navy "C" monogram)
├── layout.tsx              # Root layout — metadata, JSON-LD, Inter font, analytics
├── page.tsx                # Server component — full static page shell
├── robots.ts               # /robots.txt
└── sitemap.ts              # /sitemap.xml
public/                     # Static assets (empty by default)
vercel.json                 # Security headers (CSP, HSTS, X-Frame-Options, etc.)
next.config.ts              # output: export
```

---

## SEO & Compliance

- Full Open Graph + Twitter Card meta tags
- JSON-LD structured data (`FinancialService` schema)
- Canonical URL, `robots` directives, sitemap
- 7 security headers via `vercel.json` (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Accessible: skip-to-content link, `aria-*` attributes, semantic HTML landmarks, WCAG AA colour contrast

---

## Deployment

Deploy to Vercel with one click — the `vercel.json` security headers and `output: export` static build are already configured.

```bash
# Production build
npm run build
# Preview the static output locally
npx serve out
```

Set the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable in your Vercel project settings before deploying.

---

## Legal

Capicord is a Lending Service Provider (LSP). Capicord does not lend money, approve loans, or disburse funds. All lending is done by our partner NBFCs who are registered and regulated by the Reserve Bank of India.

© 2025 Capicord Fintech Pvt. Ltd. All rights reserved.
