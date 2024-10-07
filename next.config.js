/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    imageSizes: [500, 800, 1080, 1600, 2000, 2600],
  },
  async redirects() {
    return [
      {
        source: '/webmail/mail',
        destination: 'https://gtxm1298.siteground.biz/webmail/mail',
        permanent: true,
      },
      {
        source: '/webmail/login',
        destination: 'https://gtxm1298.siteground.biz/webmail/login',
        permanent: true,
      },
      {
        source: '/webmail',
        destination: 'https://gtxm1298.siteground.biz/webmail',
        permanent: true,
      },
    ];
  },
};

export default config;
