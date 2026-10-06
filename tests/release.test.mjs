import test from 'node:test';
import assert from 'node:assert/strict';
import publication from '../src/data/publication.json' with { type: 'json' };
import preview from '../src/data/release.json' with { type: 'json' };
import {
  isReleaseReady,
  releaseErrors,
  publicBuildErrors,
} from '../src/lib/release.mjs';
const verified = {
  ...preview,
  available: true,
  verified: true,
  version: '1.0.0',
  publishedAt: '2026-10-06',
  releaseNotesUrl: 'https://github.com/example/releases/tag/v1.0.0',
  installer: {
    url: 'https://github.com/example/releases/download/v1.0.0/Peak.exe',
    sha256: 'a'.repeat(64),
  },
  portable: {
    url: 'https://github.com/example/releases/download/v1.0.0/Peak.zip',
    sha256: 'b'.repeat(64),
  },
};
const reviewed = {
  ...publication,
  publisherName: 'Example publisher',
  supportEmail: 'example@gmail.com',
  websiteUrl: 'https://example.com',
  policiesReviewed: true,
  appPoliciesMatch: true,
};
test('the committed preview exposes no ready download', () => {
  assert.equal(isReleaseReady(preview), false);
  assert.equal(preview.installer.url, null);
  assert.equal(preview.portable.url, null);
});
test('complete verified release information enables downloads', () =>
  assert.equal(isReleaseReady(verified), true));
test('unverified assets remain unavailable even with valid URLs', () =>
  assert.equal(isReleaseReady({ ...verified, verified: false }), false));
test('unsafe links and incomplete checksums reject the release', () => {
  const errors = releaseErrors({
    ...verified,
    installer: { url: 'javascript:alert(1)', sha256: 'abc' },
  });
  assert.ok(errors.some((error) => error.includes('HTTPS download')));
  assert.ok(errors.some((error) => error.includes('SHA-256')));
});
test('public builds require contacts and reviewed, matching policies', () => {
  assert.deepEqual(publicBuildErrors(reviewed, verified), []);
  assert.ok(publicBuildErrors(publication, verified).length >= 5);
  assert.ok(
    publicBuildErrors({ ...reviewed, appPoliciesMatch: false }, verified).some(
      (error) => error.includes('matched'),
    ),
  );
});
test('invalid dates, signing status, and incompatible architecture are rejected', () => {
  assert.ok(
    releaseErrors({
      ...verified,
      publishedAt: 'bad date',
      signingStatus: 'unknown',
      architecture: 'arm64',
    }).length >= 3,
  );
});
