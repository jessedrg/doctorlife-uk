/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // The blog was migrated from a Spain-specific SEO engine to UK English.
    // Old Spanish blog slugs (comprar-*, *-precio-*, *-espana, *-en-<city>)
    // no longer exist, so 301 them to the blog index to preserve link equity.
    return [
      {
        source: '/blog/:slug(comprar-.*)',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/:slug(.*-precio.*|.*-espana.*)',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
