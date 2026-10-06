export function releaseErrors(release) {
  const errors = [];
  const https = (value) => {
    try {
      return new URL(value).protocol === 'https:';
    } catch {
      return false;
    }
  };
  if (!release.available) errors.push('No public release is available.');
  if (!release.verified) errors.push('Release assets have not been verified.');
  if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(release.version || ''))
    errors.push('A release version is required.');
  if (!release.publishedAt || Number.isNaN(Date.parse(release.publishedAt)))
    errors.push('A release date is required.');
  if (!https(release.releaseNotesUrl))
    errors.push('An HTTPS release notes URL is required.');
  if (release.architecture !== 'x64')
    errors.push('This website describes the Windows x64 release.');
  if (!['signed', 'unsigned'].includes(release.signingStatus))
    errors.push('A known signing status is required.');
  for (const name of ['installer', 'portable']) {
    if (!https(release[name]?.url))
      errors.push(`${name}: an HTTPS download URL is required.`);
    if (!/^[a-f\d]{64}$/i.test(release[name]?.sha256 || ''))
      errors.push(`${name}: a SHA-256 checksum is required.`);
  }
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
  if (!publication.appPoliciesMatch)
    errors.push('The app and website policy versions have not been matched.');
  return errors;
}
