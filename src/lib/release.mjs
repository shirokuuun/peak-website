export function releaseErrors(release) {
  const errors = [];
  if (!release.available) errors.push('No public release is available.');
  if (!release.verified) errors.push('Release assets have not been verified.');
  if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(release.version || ''))
    errors.push('A release version is required.');
  if (!release.publishedAt || Number.isNaN(Date.parse(release.publishedAt)))
    errors.push('A release date is required.');
  if (release.architecture !== 'x64')
    errors.push('This website describes the Windows x64 release.');
  if (release.distribution !== 'microsoft-store')
    errors.push('Downloads must use Microsoft Store.');
  if (release.storeProductId !== '9P7C7HMFN9Z3')
    errors.push('The published Peak Store product identity is required.');
  try {
    const url = new URL(release.storeUrl);
    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'apps.microsoft.com' ||
      url.username ||
      url.password ||
      url.port ||
      url.search ||
      url.hash ||
      url.pathname.toUpperCase() !== `/DETAIL/${release.storeProductId}`
    )
      throw new Error();
  } catch {
    errors.push('The official HTTPS Peak Microsoft Store URL is required.');
  }
  if (release.installer || release.portable)
    errors.push(
      'Legacy package downloads must not be exposed by Store metadata.',
    );
  return errors;
}

export const isReleaseReady = (release) => releaseErrors(release).length === 0;

export function publicBuildErrors(publication, release) {
  const errors = releaseErrors(release);
  if (!publication.publisherName?.trim())
    errors.push('Publisher identity is missing.');
  if (!/^[^\s@]+@gmail\.com$/i.test(publication.supportEmail || ''))
    errors.push('The dedicated Gmail support address is missing.');
  try {
    const origin = new URL(publication.websiteUrl);
    if (origin.protocol !== 'https:') throw new Error();
  } catch {
    errors.push('The public HTTPS website URL is missing.');
  }
  if (!publication.policiesReviewed)
    errors.push('The policy drafts need owner review.');
  if (!publication.policyBaselineMatches)
    errors.push(
      'The app and website freeware policy baseline has not been matched.',
    );
  return errors;
}
