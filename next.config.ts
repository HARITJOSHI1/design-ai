import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/.prisma/client/**/*',
      './lib/generated/prisma/**/*',
    ],
    '/*': [
      './node_modules/.prisma/client/**/*',
      './lib/generated/prisma/**/*',
    ],
  },
};

export default nextConfig;
