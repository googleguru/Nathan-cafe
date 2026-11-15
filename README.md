# Nexa Learn — Nathan's Knowledge Cafe

A responsive course-discovery frontend inspired by modern learning catalogues and clean, OpenAI-style product design. This is an independent brand and is not affiliated with OpenAI or Progiez.

## Stack
- React + Vite
- Lucide icons
- Static course catalogue in `src/courses.js`
- Responsive CSS, search, discipline filters, session filters, topic filters, pagination and course overview modal

## Run locally
```bash
npm install
npm run dev
```
Build:
```bash
npm run build
npm run preview
```

## Project identity
- Brand: **Nexa Learn**
- Parent brand: **Nathan's Knowledge Cafe**
- Browser cache namespace: `nexa-learn-v1`
- PWA static cache namespace (reserved): `nexa-learn-static-v1`
- Suggested repository: `nexa-learn-platform`

## Course catalogue
The initial catalogue is transcribed from the supplied *Nathan's Knowledge Cafe.docx*. Course descriptions are concise editorial summaries, not official NPTEL descriptions. Session labels follow the supplied document: January, July, or Both.

## Security and production readiness
This repository is a frontend starter. Do not collect passwords, payment data, student records, or private documents in this static frontend.

Before enabling accounts or paid enrolment:
1. Add a managed identity provider (e.g. Supabase Auth or an OIDC provider).
2. Enforce authorisation and row-level access policies server-side; never trust client-side role checks.
3. Put privileged API keys only in server-side environment variables.
4. Validate and rate-limit all server actions.
5. Use a payment provider's hosted checkout; never store card data.
6. Add privacy, terms, refund, accessibility and data-retention policies reviewed for your actual operating model.
7. Configure HTTPS, security headers, backups, audit logging and dependency scanning.

## Deployment
The project can be deployed to GitHub Pages, Vercel, Netlify or another static host. For GitHub Pages, configure the repository Pages workflow after publishing the repository.

## Content notes
The supplied July 2026 certificate PDF visibly names **Vaithianathan V** as certificate holder. It has therefore not been represented as the website owner's personal credential. Add certificate records only after confirming ownership and permission to publish them.

## Licence
Add the licence and content permissions appropriate to your organisation before public distribution.
