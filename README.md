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

Peak is available free from Microsoft Store: https://apps.microsoft.com/detail/9P7C7HMFN9Z3, published by neorangel. Store installation and updates replace the website’s earlier package links. The private application source stays in its own repository.

The existing website package version and release version field remain unchanged. The manifest version field is historical website metadata, not a claim about the Store package version; Microsoft Store displays the package version. Downloads use the canonical Store product URL, not individual versioned binaries.

Publisher/contact and the freeware policy 1.1 baseline are recorded in `src/data/publication.json`. Website distribution and privacy details now describe the Store edition; they are not a byte-for-byte copy of the older desktop package documents. The underlying freeware rights remain unchanged. Future app packages should align their distribution-specific documentation through the app’s normal release process.

`npm run build:public` checks the exact Peak Store identity and canonical HTTPS URL, availability, contacts, and reviewed policy baseline before generating indexable pages. The legacy package verification script must not overwrite this Store manifest. `npm run build` remains a local preview with noindex. Never add signing keys, API credentials or diagnostics.

For a custom domain, add it in Vercel Domains, apply its DNS records, and update the same HTTPS origin in both app and website publishing metadata. Reassess hosting requirements if the project later introduces paid services or advertising.

## Media

`public/media/peak-promo.mp4` is copied unchanged from the supplied Peak-Promo.mp4 (36.011 seconds, H.264/AAC, 1920×1080). A still supplies the film poster. The new usage showcase image supplies the social preview. Playback requires a visitor action; there is no autoplay or media download on initial load. Descriptive captions and a text transcript are included.

`public/screens/` contains native WPF screenshots rendered using isolated sample fixtures. The usage, activity, attention, compact, and presence views now use the published Store assembly. `public/screens/showcase/` contains five 1920 × 1080 feature compositions; the homepage links four at full size. Sample values and presentation graphics are labelled. The renderer lives in the private app repository's `tools/Peak.Showcase`; it never starts providers or touches live configuration. The interactive island is a separate web simulation, following Peak’s available features and remaining-usage semantics. In the playground, a finished task returns to idle after five seconds; stale data shows a dash.

Oxanium, Space Grotesk, and JetBrains Mono are self-hosted. Their full font licenses are in `public/licenses/`. The film has original music; no reference-site images, copy, or source code are used. The walkthrough and film use CSS grayscale. The new showcase compositions preserve the app’s status colors inside a neutral black-and-white layout. Visitors can choose a custom color for the simulated app in the playground.

## Checks

The focused test suite covers release gating, invalid Store URLs and product identity, missing contacts/review, stale and missing usage, presence priority, and custom-color contrast. Type checks and static builds run in the website CI workflow. See `VERIFICATION.md` for the recorded browser review.
