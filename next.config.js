/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  allowedDevOrigins: [
    'workspace-kg.tail89034.ts.net'
  ],
  images: {
    deviceSizes: [480, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 160, 240, 360],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'https', hostname: 'blob.vercel-storage.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/webmail/mail',
        destination: 'https://inbox.purelymail.com',
        permanent: true,
      },
      {
        source: '/webmail/login',
        destination: 'https://purelymail.com/user/login',
        permanent: true,
      },
      {
        source: '/webmail',
        destination: 'https://inbox.purelymail.com',
        permanent: true,
      },
    ];
  },
};

export default config;
