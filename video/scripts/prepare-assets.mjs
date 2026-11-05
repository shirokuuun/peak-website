import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const website = path.resolve(root, '../public');
for (const directory of ['screens', 'providers', 'fonts', 'licenses']) {
  fs.cpSync(
    path.join(website, directory),
    path.join(root, 'public', directory),
    { recursive: true },
  );
}
fs.copyFileSync(
  path.join(website, 'peak-icon.png'),
  path.join(root, 'public/peak-icon.png'),
);
console.log(
  'Prepared native Peak captures, provider marks, Inter fonts, and licenses.',
);
