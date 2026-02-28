import { betterAuth } from 'better-auth/minimal';
import { env } from '../env';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '../(database)/prisma';
import { nextCookies } from 'better-auth/next-js';
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseUrl: env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  experimental: { joins: true },
  socialProviders: {
    google: {
      clientSecret: env.GOOGLE_SECRET,
      clientId: env.GOOGLE_ID,
    },
  },
  plugins: [nextCookies()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
