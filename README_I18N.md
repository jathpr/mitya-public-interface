# Internationalization (i18n) notes

## Server-first i18n (current choice)

This project uses a server-first i18n approach for the primary content pages under `/[locale]`.

Why server-first?

- Most users choose their language early and then stay on the site; server-rendering avoids shipping full message bundles to the client.
- Reduces client payload and parsing cost on first load.
- Keeps SEO/OG metadata generation aligned with the requested locale (generateMetadata uses server translations).

How it works

- next-intl plugin (`src/i18n/request.ts`) resolves the locale per request:
  - If URL contains a valid locale (e.g., `/en/...`) it's used.
  - Otherwise `Accept-Language` header is parsed and the first supported locale is chosen.
  - Falls back to `routing.defaultLocale` if none match.
- Server pages call `getTranslations(...)` and render strings on the server.
- The layout (`src/app/[locale]/layout.tsx`) still wraps client interactive components with `NextIntlClientProvider` and passes the messages for the route locale so client components that need runtime locale data can read it (useTranslations/useLocale).

When to use client translations

- Keep interactive bits that need runtime locale changes (subtitles default, client-only UI interactions, dynamic content) as client components using `useLocale()`/`useTranslations()`.
- Avoid converting large static pages into client components just to access translations — prefer server components + `getTranslations` for static content.

Running the smoke tests locally

- Start the production server (build + start):

```bash
npm run start
```

- In another terminal run the i18n smoke tests:

```bash
npm run test:i18n
```

What the smoke script does

- `scripts/smoke-i18n.js` requests a set of routes across locales with different `Accept-Language` headers and asserts:
  - `<html lang="...">` matches the URL locale
  - sample strings from the corresponding messages file are present in the HTML

CI: GitHub Actions

- A workflow `.github/workflows/i18n-smoke.yml` is included. It installs deps, builds, starts the server in background and runs the same smoke script.
