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
