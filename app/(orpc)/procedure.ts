import { ORPCError, os } from "@orpc/server";
import { PrismaClient } from "../(database)/generated/client";
import { auth } from "../(auth)/auth";

export const base = os.$context<{
  headers: Headers;
  db: PrismaClient;
  s3: Bun.S3Client;
}>();
interface ORPCMetadata {
  cache?: boolean;
}
export const authMiddleware = base.middleware(async ({ context, next }) => {
  const sessionData = await auth.api.getSession({
    headers: context.headers,
  });

  if (!sessionData?.session || !sessionData?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }

  return next({
    context: {
      session: sessionData.session,
      user: sessionData.user,
    },
  });
});
// export const captchaMiddleware = base
//   .$input(
//     z.object({
//       token: z.string(),
//     }),
//   )
//   .middleware(async ({ next }, input: { token: string }) => {
//     if (!input || !input.token || input.token === "")
//       throw new ORPCError("NOT_ACCEPTABLE");

//     return next();
//   });
