# Svelte Supabase Starter

A production-ready starter template built with **SvelteKit**, **Supabase**, **shadcn/svelte**, and **Tailwind CSS v4**.

## Features

- **Authentication** — Email/password sign-up & sign-in, GitHub OAuth, forgot/reset password, email verification resend
- **Session Management** — Secure server-side JWT validation via `safeGetSession()`, cookie-based SSR with `@supabase/ssr`
- **Route Protection** — Hooks-based auth guard + layout-level redirects for protected and public routes
- **UI Components** — 22+ shadcn/svelte components (data table, sidebar, charts, drawers, dropdowns, and more)
- **Dashboard** — Sample dashboard with interactive charts, drag-and-drop data table, and section cards
- **Database** — Profiles table migration with RLS policies and auto-profile creation trigger
- **Type Safety** — Full TypeScript with typed Supabase client (`SupabaseClient<Database>`) and Zod schema validation
- **CSRF Protection** — Origin-based CSRF middleware for mutation endpoints

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit + Svelte 5 |
| Auth & Database | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/svelte (bits-ui, vaul-svelte, svelte-sonner) |
| Charts | LayerChart + D3 |
| Data Table | TanStack Table + DND Kit |
| Validation | Zod |
| Icons | Tabler Icons, Lucide |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (or use the local dev setup below)

### Setup

1. **Clone and install**

   ```sh
   git clone <repo-url> && cd svelte-supabase
   npm install
   ```

2. **Configure environment**

   ```sh
   cp .env.example .env
   ```

   Fill in your Supabase project URL and publishable key from your [Supabase dashboard](https://supabase.com/dashboard).

3. **Run the migration**

   Apply the profiles table migration to your Supabase project via the SQL editor or the Supabase CLI:

   ```sh
   npx supabase db push
   ```

4. **Start developing**

   ```sh
   npm run dev
   ```

### Local Supabase Development

To run Supabase locally with Docker:

```sh
npx supabase start
```

This starts a local Supabase instance using the config in `supabase/config.toml`. The local dashboard is available at `http://127.0.0.1:54323`.

## Project Structure

```
src/
├── hooks.server.ts              # Supabase client + auth guard
├── app.d.ts                     # Global type definitions
├── lib/
│   ├── components/
│   │   ├── auth/                # Login, signup, forgot/reset password forms
│   │   ├── dashboard/           # Data table, charts, section cards
│   │   ├── layout/              # Sidebar, navigation, header
│   │   └── ui/                  # shadcn/svelte components
│   ├── schemas/                 # Zod validation schemas
│   ├── types/
│   │   └── database.ts          # Supabase Database type (generated)
│   ├── utils/
│   │   └── csrf.ts              # CSRF protection
│   └── utils.ts                 # Tailwind class merge helpers
├── routes/
│   ├── (app)/                   # Protected routes (requires auth)
│   │   ├── dashboard/           # Dashboard page
│   │   └── sign-out/            # Sign-out action
│   ├── (auth)/                  # Public auth routes
│   │   ├── sign-in/             # Login page
│   │   ├── sign-up/             # Registration page
│   │   ├── forgot-password/     # Password reset request
│   │   ├── reset-password/      # New password form
│   │   └── auth/                # Callback, confirm, error endpoints
│   ├── +layout.svelte           # Root layout (auth listener, toaster)
│   ├── +layout.server.ts        # Session hydration
│   ├── +layout.ts               # Browser/server Supabase client
│   └── +error.svelte            # Global error page
supabase/
├── config.toml                  # Local dev configuration
├── migrations/                  # Database migrations
│   └── 00000000000000_init.sql  # Profiles table + RLS + trigger
└── seed.sql                     # Seed data placeholder
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type-check with svelte-check |
| `npm run db:types` | Generate TypeScript types from Supabase schema |

## GitHub OAuth Setup

1. Create a GitHub OAuth app at [github.com/settings/developers](https://github.com/settings/developers)
2. Set the callback URL to `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. Add the client ID and secret to your Supabase dashboard under **Auth > Providers > GitHub**
4. For local development, set them in your `.env` and `supabase/config.toml`

## Deployment

This template uses `@sveltejs/adapter-auto` which automatically selects the right adapter for your deployment target (Vercel, Netlify, Cloudflare, etc.).

```sh
npm run build
```

Make sure to set `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` as environment variables in your hosting platform.

## License

MIT
