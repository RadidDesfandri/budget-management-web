# Tenant Budget Management – Frontend

Next.js (App Router) frontend for the Tenant Budget Management application. It provides authentication, organization-scoped dashboards, and modules for managing budgets, expenses, categories, members, and invitations.

## Tech stack

- **Framework**: Next.js (`next@16`)
- **UI**: React (`react@19`), Tailwind CSS (`tailwindcss@4`), Radix UI primitives, `lucide-react`
- **State / data**: TanStack Query (`@tanstack/react-query`), Zustand
- **Forms / validation**: React Hook Form, Zod
- **Charts**: Recharts
- **HTTP**: Axios (with auth interceptor)

## Prerequisites

- **Node.js**: recommended Node 20+
- **Package manager**: npm (or your preferred alternative)

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create environment variables (see below).
3. Start the dev server:

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

## Environment variables

Create a `.env.local` file in the project root (`frontend/.env.local`) and set:

- **`NEXT_PUBLIC_API_URL`**: Backend API base URL.
  - Default (if not set): `http://localhost:8000/api` (see `src/lib/axios.ts`)
  - Example: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- **`NEXT_PUBLIC_AUTH_TOKEN_KEY`** (optional): Cookie key used to store the auth token.
  - Default: `auth_token` (see `src/lib/auth-token.ts`)
  - Example: `NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token`

## Useful scripts

From `package.json`:

- **`npm run dev`**: Run Next.js dev server (configured with polling for file watching).
- **`npm run build`**: Production build.
- **`npm run start`**: Start production server.
- **`npm run lint`**: Run ESLint.

## App structure (high level)

Key directories:

- **`src/app/`**: Next.js App Router routes and layouts.
  - **`src/app/(auth)/...`**: Auth pages (login/register/verify/reset/forgot password).
  - **`src/app/preparation/`**: Workspace setup (create organization or join via invitation).
  - **`src/app/[organizationId]/(dashboard)/...`**: Organization-scoped dashboard pages.
- **`src/context/`**: App-wide contexts (`auth-context`, `organization-context`).
- **`src/lib/`**: Shared utilities (Axios instance, cookie helpers, Zod helpers, etc.).
- **`src/components/`**: Shared UI components and layout shells.
- **`src/config/`**: Route and permission configuration.

## Routing & access control

This project uses **client-side auth gating** via `AuthProvider` (`src/context/auth-context.tsx`):

- Fetches current user via `GET /v1/me` when an auth token cookie exists.
- Redirect rules:
  - Unauthenticated user on a private route → `/login`
  - Authenticated user with **no organizations** → `/preparation`
  - Authenticated user with organizations visiting public routes (e.g. `/login`) → `/<firstOrgId>/dashboard`

Public/private route patterns are configured in `src/config/route.ts`.

## Organizations

Organization-scoped routes live under `src/app/[organizationId]/...`.

`src/app/[organizationId]/layout.tsx` loads the organization (server-side) and provides it through `OrganizationProvider`. It maps backend status codes to Next.js behavior:

- `404` → Not Found
- `403` → Forbidden
- `408/503` → throws `"SERVICE_UNAVAILABLE"`
- `>=500` → throws `"INTERNAL_SERVER_ERROR"`

## API & authentication

HTTP calls are made through `src/lib/axios.ts`:

- **Base URL**: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000/api`)
- **Auth**: adds `Authorization: Bearer <token>` using the token stored in cookies (`src/lib/auth-token.ts`)
- **401 handling**: clears token and redirects to `/login` for most requests (excluding login and invitation-accept flows)

Token storage uses `js-cookie` and is configured via `NEXT_PUBLIC_AUTH_TOKEN_KEY`.

## Permissions (RBAC)

Role-based permissions live in `src/config/permissions.ts` and are keyed by member role (e.g. `owner`, `admin`, `finance`, `member`). Use `src/hooks/use-permission.ts` (and the `PermissionGuard` component) to conditionally show actions and pages.

## Main features / modules

Organization dashboard includes pages under `src/app/[organizationId]/(dashboard)/` such as:

- **Dashboard**: summary and charts
- **Budgets**
- **Expenses** (create/edit/detail, receipt upload/preview)
- **Categories**
- **Members** (invite/remove, stats)
- **Invitations** (and invitation history)
- **User settings**

## Deployment notes

- Ensure `NEXT_PUBLIC_API_URL` points to the correct backend environment.
- If you used Ngrok during development, `src/lib/axios.ts` includes the `ngrok-skip-browser-warning` header; consider removing it for production deployments.

