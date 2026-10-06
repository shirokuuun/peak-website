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

## Vercel and public releases

Production: https://peakforwindows.vercel.app. Import `shirokuuun/peak-website`, root `.`, Astro, Node 24.x, install `npm ci`, build `npm run build:public`, output `dist`. Root vercel.json supplies this configuration. Website main pushes deploy to production.

The current release is Peak 1.0.0 freeware. Public versioned installer and portable ZIP downloads use the binary-only `shirokuuun/Peak-releases` repository. The application source repository stays private. The first release is unsigned; setup pages explain Windows warnings and show SHA-256 values.

Publisher neorangel and support peakforwindows.support@gmail.com are recorded in `src/data/publication.json`. Policy version 1.0 in `src/content/policies` matches the application's embedded/package documents. Release metadata in `src/data/release.json` is generated from the package artifacts, and enabled only after both public downloads and hashes are verified. No runtime GitHub API or account is required.

For future releases, use the private app repository's `scripts/package-release.ps1` and `scripts/verify-public-downloads.ps1 -WebsiteRoot D:/Languages/codex/peak_website`, then commit the generated manifest here. `npm run build:public` validates version, download URLs, hashes, contacts and synchronized policies before generating indexable pages and a sitemap. `npm run build` remains a local preview with noindex. Never add signing keys, API credentials or diagnostics.

For a custom domain, add it in Vercel Domains, apply its DNS records, and update the same HTTPS origin in both app and website publishing metadata. Reassess hosting requirements if the project later introduces paid services or advertising.

## Media

`public/media/peak-promo.mp4` is copied unchanged from the supplied Peak-Promo.mp4 (36.011 seconds, H.264/AAC, 1920×1080). A still from that file supplies the poster and social card. Playback requires a visitor action; there is no autoplay or media download on initial load. Descriptive captions and a text transcript are included.

`public/screens/` contains the supplied promo project’s native WPF screenshots, rendered using isolated demo fixtures. They are labeled as sample data. The interactive island is a separate web simulation, following Peak’s available features and remaining-usage semantics. In the playground, a finished task returns to idle after five seconds; stale data shows a dash.

Oxanium, Space Grotesk, and JetBrains Mono are self-hosted. Their full font licenses are in `public/licenses/`. The film has original music; no reference-site images, copy, or source code are used. The supplied film and screenshots are presented in monochrome through CSS; their original files remain unchanged. Visitors can choose a custom color for the simulated app in the playground.

## Checks

The focused test suite covers release gating, invalid download URLs and hashes, missing contacts/review, stale and missing usage, presence priority, and custom-color contrast. Type checks and static builds run in the website CI workflow. See `VERIFICATION.md` for the recorded browser review.
