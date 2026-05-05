import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env: {
    KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
    KINDE_POST_LOGOUT_REDIRECT_URL:
      process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`,
    KINDE_POST_LOGIN_REDIRECT_URL:
      process.env.KINDE_POST_LOGIN_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`
  },

  outputFileTracingIncludes: {

    '/api/**/*': ['./node_modules/.prisma/client/**/*'],

    '/*': ['./node_modules/.prisma/client/**/*'],

  },
};

export default nextConfig;
