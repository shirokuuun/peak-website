# Website verification

Reviewed October 6, 2026, on Node.js 24.16.0. Local preview: `http://127.0.0.1:4321/`.

The project was subsequently moved to `D:\Languages\codex\peak_website` as a standalone repository. All 59 website source and media files were verified against the preserved website, CI now runs from the repository root, and type checks, all nine tests, the static build, and the 214-reference audit passed again from that root. The application checkout and its existing uncommitted changes were verified unchanged.

## Build and content

- `npm run check`: 25 files; zero errors, warnings, or hints.
- `npm test`: all nine focused tests passed. Coverage includes release readiness, invalid assets, unknown usage, presence priority, and readable custom themes.
- `npm run build`: seven static HTML pages and `robots.txt` generated successfully.
- Generated-page audit: 214 local link/media references resolve, including fragment targets. Each page has one main heading and no duplicate IDs or external script URLs. Preview pages carry `noindex, nofollow`.
- `npm run build:public`: correctly rejects the incomplete launch configuration. No installer, ZIP, checksum, publisher identity, or support address was invented.
- Vercel Production simulation (`VERCEL_ENV=production`, `PEAK_PUBLIC_BUILD=0`): build and the 214-reference audit pass; HTML remains `noindex, nofollow`, `robots.txt` disallows indexing, and the explicit full-release build still rejects the incomplete configuration.
- The supplied promo and the committed copy have the same SHA-256: `1B47F1ADB9AA4E775DD2B6D2EC1A74B2E21F817DB485E9172925352C34483422`.

## Browser review

Reviewed in the Codex browser using the built static site:

- Homepage at 1440 × 1000, 768 × 1024, and 375 × 812. Black-and-white presentation, centered product hero, squared Oxanium headings, and Space Grotesk body text render correctly. No horizontal page overflow at these widths.
- Desktop playground: expanded details show remaining usage; review state shows a task and the instruction to respond in Codex; stale state shows dashes with four accessible unavailable-data graphics and no misleading zero-valued meters. Light and custom themes update the simulated island.
- Keyboard: Escape closes pinned demo details and mobile navigation. Mobile navigation opens and routes to the download page.
- Promo: no initial autoplay; selecting the 00:04 chapter loads and starts the 36.011-second video at the selected position. Native playback controls and the expandable transcript work. The film and app screenshots use CSS grayscale; their original files are unchanged.
- Settings gallery switches to the native Presence screenshot.
- Download page at mobile width; support and privacy pages at tablet width. Content remains readable, with no horizontal overflow or broken loaded images. Unavailable download cards contain no executable/ZIP links.

This is a manual browser review and focused automated verification, not a complete screen-reader or cross-browser certification. Native screenshots use sample data; the browser playground has no provider connection.

## Launch configuration still needed

The coming-soon site can be hosted from `shirokuuun/peak-website` in either Vercel environment, using the repository root (`.`), without environment variables. Hosting alone does not enable the full release mode. That mode requires `PEAK_PUBLIC_BUILD=1` or `--public`, plus the real publisher, verified support mailbox, final domain, reviewed policies matching the freeware app, and verified release packages. The current desktop application is not converted to freeware by this website work.
