# Peak website

An original black-and-white product showcase for Peak, with a centered hero, squared Oxanium headings, Space Grotesk body text, a guided walkthrough, the supplied 36-second promo, native app screenshots with sample data, and an interactive browser playground. Built with Astro 7, TypeScript, Tailwind 4, and React 19. All pages are statically generated; there is no backend or analytics.

This is the standalone website repository, `shirokuuun/peak-website`. The website lives directly in `D:\Languages\codex\peak_website`, with an independent Git history. It contains no desktop application source or inherited application commits.

## Run locally

Use Node.js 24 LTS (minimum 22.18).

```powershell
cd D:\Languages\codex\peak_website
npm ci
npm run dev
```

Open the Local URL printed by Astro. For verification:

```powershell
npm run check
npm test
npm run build
npm run preview
```

`npm run build` produces a reviewable preview in `dist/`. Previews emit `noindex, nofollow` and a disallowing robots file. All content remains readable without JavaScript; the interactive playground needs JavaScript. No browser settings or provider accounts are accessed.

## Vercel

Import `shirokuuun/peak-website` and use **Root Directory: `.` (the project root)**. Framework preset: **Astro**. Install command: `npm ci`. Build command: `npm run build`. Output directory: `dist`. Node version: 24.x. The root `vercel.json` supplies headers and build settings.

Use Vercel’s **Preview** environment for review. Production deployments are intentionally rejected until the release configuration below is complete. Vercel’s production environment triggers the same checks as `npm run build:public`.

The plan assumes a non-monetized personal project. Reassess the appropriate Vercel plan if donations, sponsorships, ads, or paid services are introduced.

Once ready for launch, use this repository’s `main` branch for production. Attach a custom domain in Vercel’s Domains settings, apply the DNS records Vercel supplies, and set the same HTTPS origin in publishing configuration. Website deployment uses this independent repository and does not change the application repository’s visibility.

## Publishing configuration

Edit `src/data/publication.json` with the real publisher name, verified dedicated Gmail support address, final HTTPS website URL, policy version, and date. Mark `policiesReviewed` and `appPoliciesMatch` true only after owner review and synchronization with the freeware app. An optional `PEAK_SITE_URL` environment variable supplies a canonical origin during preview.

Edit `src/data/release.json` with the verified freeware version, publication date, actual signing status, release notes URL, and versioned installer/portable URLs and SHA-256 hashes. The default distribution-only repository is `shirokuuun/Peak-releases`; it is a planned destination and has not been created by this task. Set `available` and `verified` true only after the packages exist and have been checked. Keep this manifest as the release information source for future packaging integration. The website does not call GitHub’s API at runtime.

```powershell
npm run build:public
```

This checks assets, contacts, reviewed policies, and app policy agreement before generating public pages. The current configuration deliberately fails this command. Never add signing keys, credentials, observations, or private diagnostic files.

Website policy drafts live in `src/content/policies/`. The app currently contains a separate commercial implementation; freeware conversion and app policy synchronization are separate work. Do not advertise a current paid/test build as the verified free download.

## Media

`public/media/peak-promo.mp4` is copied unchanged from the supplied Peak-Promo.mp4 (36.011 seconds, H.264/AAC, 1920×1080). A still from that file supplies the poster and social card. Playback requires a visitor action; there is no autoplay or media download on initial load. Descriptive captions and a text transcript are included.

`public/screens/` contains the supplied promo project’s native WPF screenshots, rendered using isolated demo fixtures. They are labeled as sample data. The interactive island is a separate web simulation, following Peak’s available features and remaining-usage semantics. In the playground, a finished task returns to idle after five seconds; stale data shows a dash.

Oxanium, Space Grotesk, and JetBrains Mono are self-hosted. Their full font licenses are in `public/licenses/`. The film has original music; no reference-site images, copy, or source code are used. The supplied film and screenshots are presented in monochrome through CSS; their original files remain unchanged. Visitors can choose a custom color for the simulated app in the playground.

## Checks

The focused test suite covers release gating, invalid download URLs and hashes, missing contacts/review, stale and missing usage, presence priority, and custom-color contrast. Type checks and static builds run in the website CI workflow. See `VERIFICATION.md` for the recorded browser review.
