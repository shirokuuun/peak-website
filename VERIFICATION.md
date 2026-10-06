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

## Public freeware release — October 6, 2026
+
+Peak 1.0.0 is published in the public binary-only Peak-releases repository. Publisher: neorangel. Support: peakforwindows.support@gmail.com. App source visibility remains private. The app's Release build passes 135 automated tests and contains no paid activation components. The complete package audit verifies 684 files, eight dependency license/notice files, identical app/site policies and matching portable bytes.
+
+Both installer and portable ZIP were downloaded anonymously and their SHA-256 values matched the generated release manifest. The website uses that verified manifest, explains the unsigned status, and displays versioned direct download links. Policy version 1.0 is shared by the website, app resources and packages.
+
+Current website checks: 26 files, zero type-check errors/warnings/hints; ten focused tests pass; public static build passes and all generated local references resolve. Public pages have one main heading, no duplicate IDs or external scripts, canonical URLs, an allowing robots.txt and a sitemap. The preview mode remains intentionally noindex when explicitly used for local review. Vercel now uses the validated public build command.
+
+Clean-machine Windows 10/11 install, update/uninstall and live-provider validation on additional machines remain follow-up tests. Passing automated and package checks do not certify those scenarios or complete accessibility coverage. The support mailbox is supplied by the owner; mail receipt and mailbox security are owner-managed.
+

## Peak 1.0.1 provider connection update

Reviewed October 6, 2026. Enabling usage opens setup that checks installed Windows CLIs and existing logins; missing tools can use the official installer, while authentication remains in the provider's terminal/browser. Claude's bridge installs automatically and current limits still require a supported account and a first Claude Code response. Codex honors its configured login store.

- Application source commit fdb09a7: zero build errors/warnings; all 154 tests passed with no skips. Actual installed Claude status-line fixture commands passed through PowerShell and Git Bash, including spaces and Unicode in their paths. A development-PC read-only Codex RPC check returned two usage windows.
- Website: 26 files checked with zero errors/warnings/hints; all 10 tests passed. Public build generated seven pages; all 214 local references resolve. Local browser review confirmed the new connection steps and missing-command help.
- Policy bundle 1.1 describes the new setup actions and matches the packaged app policies.
- Versioned installer and portable ZIP are activated only after anonymous downloads pass the generated SHA-256 comparisons. Release metadata carries the corresponding versioned links.
- Interactive provider installation/sign-in and a fresh Windows installer/update/uninstall walkthrough remain unverified on a clean machine. The automated fixtures and development-PC check do not establish compatibility on every machine.
