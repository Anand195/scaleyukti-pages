# ScaleYukti Portal — Architecture

A public marketing site plus an authenticated internal document portal for
ScaleYukti (AI automation agency, Ahmedabad). Replaces the previous
"anyone with the link" GitHub Pages document library — client deliverables,
internal pricing/margin docs, and lead lists now live behind real login
instead of an unlisted-but-public URL.

## Decisions

| Area | Decision |
|---|---|
| Scope | Public marketing site (services, contact) + gated internal document portal, one app |
| Stack | Next.js 16 (App Router, TypeScript), single full-stack app — matches ScaleSync |
| Database | PostgreSQL, via Prisma ORM 6 (pinned `6.19.3`, same reasoning as ScaleSync: v7 forces driver adapters + `prisma.config.ts`, v8 is still RC) |
| Auth | Auth.js (NextAuth v5): Credentials only, JWT sessions. No Google OAuth, no self-serve registration — accounts are created directly (seed/DB) since this is an internal team tool, not a product with public sign-up |
| Access model | Two roles, `ADMIN` / `TEAM`. v1 treats them identically for viewing; `ADMIN` is reserved for future content-management screens |
| Content model | The ~18 existing static HTML documents were migrated into `Document` rows (title, description, category, client, raw HTML body) rather than kept as loose files, per the brief — enables the search/filter and category grouping the old flat file list couldn't do |
| Document rendering | Each doc's original HTML (own `<style>`, sometimes inline `<script>`) is rendered in a sandboxed `<iframe srcDoc>` on the detail page, so 18 documents authored independently over months never fight the portal's own Tailwind styles |
| Personal content | `kavvi-flooring.html` (home-renovation research, not a ScaleYukti work product) moved to `marketing/` with the rest of the static files but was excluded from the `Document` migration — it stays a standalone static file, not a row in a business tool's database |
| Deploy target | Vercel (later); local dev runs against a native Postgres install, no Docker |

## Data model

`prisma/schema.prisma` is the source of truth. Summary:

- **Auth**: `User` (`role: ADMIN | TEAM`), `Account`, `Session`, `VerificationToken` (Auth.js adapter shape)
- **Content**: `Document` — `slug`, `title`, `description`, `category` (`CLIENT_FACING | INTERNAL_STRATEGY | LEADS_OUTREACH`), `client` (nullable), `sourceFile` (original filename, for provenance), `bodyHtml`, `publishedAt`

No visibility/audience field on `Document` — every row requires login to view
at all (the whole portal is gated), so there's no public/internal split to
encode inside the model yet. Add one only if client accounts are built later.

## Route structure

```
app/
  page.tsx                    marketing home (public)
  login/page.tsx              team sign-in (Credentials only, no public registration)
  (portal)/                   auth-gated — layout redirects to /login if no session
    documents/page.tsx        document list — search, grouped by category
    documents/[slug]/page.tsx document detail — renders original HTML in a sandboxed iframe
  api/auth/[...nextauth]/     Auth.js route handler
  actions/auth.ts             loginWithCredentials server action
```

The `(portal)` layout's `auth()` check runs before any child page, including
`documents/[slug]` — confirmed an unknown slug still redirects to `/login`
rather than leaking a 404 to a logged-out visitor.

## Migrating the existing documents

`prisma/seed.ts` reads the 17 migrated source files from `marketing/` (one
level up from this Next.js project — the original static HTML files, kept
there as public-facing pages) and upserts them as `Document` rows, keyed by
`slug`. Re-running the seed is safe — it updates existing rows rather than
duplicating them. It also creates one seeded `ADMIN` account.

Note: the internal-only documents (pricing/margin analysis, strategy,
competitive audits) are duplicated on purpose — they exist both as public
static files in `marketing/` (per an explicit decision to keep the whole
original file set there) and as gated `Document` rows in the portal. The
portal's access control does not remove public access to those files at
their `marketing/` URL; it only adds a second, authenticated way to reach
the same content.

## Brand

Reuses ScaleYukti's existing palette verbatim from ScaleSync's `DESIGN.md`
(dark navy `#1b2a38`/`#0f1c27`/`#223345`, orange `#f37021`), wired as
Tailwind v4 `@theme` tokens in `app/globals.css`. Same UI primitives
(`Button`, `Field`, `Badge`) are reused byte-for-byte from ScaleSync rather
than re-derived, including the already-verified WCAG-safe primary-button
contrast fix (navy-deep text on orange, not white).

## Local development

No Docker. Requires a local Postgres (this machine already runs
`postgresql@17` via `brew services`).

```bash
cp .env.example .env        # already done
npm install
npx prisma migrate dev      # applies prisma/migrations/, already run
npx prisma db seed          # creates admin@scaleyukti.ai / changeme123 + 17 documents
npm run dev                 # http://localhost:3000
```

## Deliberately deferred (not built yet)

- Client accounts / per-client access — v1 is internal-team-only by design; add an `Organization` model and scoped queries if client logins are needed later.
- Content-management UI — documents are seeded from the migration script; there's no in-app create/edit screen yet (`ADMIN` role exists for this, unused so far).
- A real contact form backend — the homepage's "Work with us" is a `mailto:` link, not a submission pipeline.
- Public case studies / portfolio pages — the marketing site is a single home page for now.
