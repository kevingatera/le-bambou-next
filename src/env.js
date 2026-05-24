import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    EMAIL_PASSWORD_DEV: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
    EMAIL_TO: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
  */
  client: {
    NEXT_PUBLIC_DD_CLIENT_APP_ID: z.string().optional(),
    NEXT_PUBLIC_DD_CLIENT_TOKEN: z.string().optional(),
    NEXT_PUBLIC_GALLERY_BASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_UI_HOST: z.string().url().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    EMAIL_PASSWORD_DEV: process.env.EMAIL_PASSWORD_DEV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_TO: process.env.EMAIL_TO,
    NEXT_PUBLIC_DD_CLIENT_APP_ID: process.env.NEXT_PUBLIC_DD_CLIENT_APP_ID,
    NEXT_PUBLIC_DD_CLIENT_TOKEN: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN,
    NEXT_PUBLIC_GALLERY_BASE_URL: process.env.NEXT_PUBLIC_GALLERY_BASE_URL,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN:
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    NEXT_PUBLIC_POSTHOG_UI_HOST: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
