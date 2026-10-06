import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { publicBuildErrors } from '../src/lib/release.mjs';

const publication = JSON.parse(
  readFileSync(new URL('../src/data/publication.json', import.meta.url)),
);
const release = JSON.parse(
  readFileSync(new URL('../src/data/release.json', import.meta.url)),
);
const publicBuild =
  process.argv.includes('--public') ||
  process.env.PEAK_PUBLIC_BUILD === '1';
if (publicBuild) {
  const errors = publicBuildErrors(publication, release);
  if (errors.length) {
    console.error(
      'Public launch is not ready:\n' +
        errors.map((error) => ` • ${error}`).join('\n'),
    );
    process.exit(1);
  }
  process.env.PEAK_PUBLIC_BUILD = '1';
}
const require = createRequire(import.meta.url);
process.env.ASTRO_TELEMETRY_DISABLED = '1';
const packagePath = require.resolve('astro/package.json');
const astro = JSON.parse(readFileSync(packagePath));
const entry = typeof astro.bin === 'string' ? astro.bin : astro.bin.astro;
const result = spawnSync(
  process.execPath,
  [resolve(dirname(packagePath), entry), 'build'],
  { stdio: 'inherit', env: process.env },
);
process.exit(result.status ?? 1);
