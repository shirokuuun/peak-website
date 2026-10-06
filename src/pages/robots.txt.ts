import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const publicBuild = import.meta.env.PEAK_PUBLIC_BUILD === '1';
  return new Response(
    publicBuild
      ? `User-agent: *\nAllow: /\n${site ? `Sitemap: ${new URL('sitemap-index.xml', site)}\n` : ''}`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
