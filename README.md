# Peak website

An original product showcase for Peak, with offset Inter headings, neutral surfaces, a numbered native-app tour, a new 36-second Remotion film, and an interactive browser playground. Built with Astro 7, TypeScript, Tailwind 4, and React 19. All pages are statically generated; there is no backend or analytics.

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

`public/media/peak-design-film.mp4` is the rebuilt 36-second product film (H.264/AAC, 1920 × 1080, 30 fps), with Inter typography, native provider marks, current dark/light/mauve sample captures, editorial interaction animation, and a new original score. `peak-design-poster.jpg`, descriptive captions, the transcript, and chapter buttons match the new edit. Editable, reproducible Remotion source is in `video/`, with a separate package and lockfile; see `video/README.md`. The website build serves the reviewed export without installing or rendering Remotion. The old supplied film remains in its separate original project and is no longer shipped by the website. Playback requires a visitor action; there is no autoplay or media download on initial load. The 1200 × 630 `public/media/peak-social.png` supplies the social preview.

`public/screens/` contains native WPF controls rendered with isolated sample fixtures from the existing Peak 1.0.7 development assembly. The feature rail displays dark, light, and mauve usage views, Codex activity and attention, and presence settings. These are design previews, not a claim that a new Store package has shipped. `public/screens/showcase/` preserves the earlier 1920 × 1080 marketing assets. Sample readings remain labelled; the renderer never starts real providers or changes user configuration. The browser island is a separate simulation with both notch styles, theme controls, sample activity, unknown/stale values, and header dismissal. The Store version can have different interactions. In the playground, a finished task returns to idle after five seconds; stale data shows a dash.

The redesign self-hosts the app’s Inter Medium, SemiBold, and Bold fonts, with JetBrains Mono retained for small technical labels. Full font licenses, including the earlier Oxanium and Space Grotesk notices, are in `public/licenses/`. The provider PNGs match those supplied with the current app interface. The film has original music; no reference-site artwork, copy, testimonials, or source code are used. The neutral website layout preserves status colors and the mauve native preview inside the app images. Visitors can choose a custom color for the simulated app in the playground. See `docs/website-redesign.md` for design and asset provenance.

## Checks

The focused test suite covers release gating, invalid Store URLs and product identity, missing contacts/review, stale and missing usage, presence priority, and custom-color contrast. Type checks and static builds run in the website CI workflow. See `VERIFICATION.md` for the recorded browser review.
