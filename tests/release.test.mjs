import test from 'node:test';
import assert from 'node:assert/strict';
import publication from '../src/data/publication.json' with { type: 'json' };
import committedRelease from '../src/data/release.json' with { type: 'json' };
import {
  isReleaseReady,
  releaseErrors,
  publicBuildErrors,
} from '../src/lib/release.mjs';
const verified = { ...committedRelease, available: true, verified: true };
const reviewed = {
  ...publication,
  policiesReviewed: true,
  policyBaselineMatches: true,
};

test('unavailable or unverified Store listings disable download calls to action', () => {
  assert.equal(isReleaseReady({ ...verified, available: false }), false);
  assert.equal(isReleaseReady({ ...verified, verified: false }), false);
});
test('the verified official Peak Store listing enables downloads', () => {
  assert.equal(isReleaseReady(verified), true);
  assert.deepEqual(publicBuildErrors(reviewed, verified), []);
});
test('Store URL validation rejects unsafe destinations and redirects', () => {
  for (const storeUrl of [
    'javascript:alert(1)',
    'http://apps.microsoft.com/detail/9P7C7HMFN9Z3',
    'https://apps.microsoft.com.attacker.example/detail/9P7C7HMFN9Z3',
    'https://apps.microsoft.com@attacker.example/detail/9P7C7HMFN9Z3',
    'https://apps.microsoft.com/detail/OTHERPRODUCT',
    'https://apps.microsoft.com/detail/9P7C7HMFN9Z3?redirect=https://attacker.example',
    '',
  ])
    assert.equal(isReleaseReady({ ...verified, storeUrl }), false, storeUrl);
});
test('a different Store identity or distribution cannot replace Peak', () => {
  assert.equal(
    isReleaseReady({ ...verified, storeProductId: 'OTHERPRODUCT' }),
    false,
  );
  assert.equal(
    isReleaseReady({ ...verified, distribution: 'direct-download' }),
    false,
  );
});
test('old installer and portable assets cannot appear in Store metadata', () => {
  for (const key of ['installer', 'portable'])
    assert.equal(
      isReleaseReady({
        ...verified,
        [key]: { url: 'https://example.com/Peak.exe' },
      }),
      false,
    );
});
test('public builds require publisher contacts and a reviewed policy baseline', () => {
  const missing = {
    publisherName: '',
    supportEmail: '',
    websiteUrl: '',
    policiesReviewed: false,
    policyBaselineMatches: false,
  };
  assert.ok(publicBuildErrors(missing, verified).length >= 5);
  assert.ok(
    publicBuildErrors(
      { ...reviewed, policyBaselineMatches: false },
      verified,
    ).some((error) => error.includes('matched')),
  );
});
test('invalid dates, version metadata and incompatible architecture are rejected', () => {
  assert.ok(
    releaseErrors({
      ...verified,
      publishedAt: 'bad date',
      version: '',
      architecture: 'arm64',
    }).length >= 3,
  );
});
test('committed metadata preserves the existing version and passes Store publication checks', () => {
  assert.equal(committedRelease.version, '1.0.1');
  assert.deepEqual(publicBuildErrors(publication, committedRelease), []);
  assert.equal(committedRelease.installer, undefined);
  assert.equal(committedRelease.portable, undefined);
});
