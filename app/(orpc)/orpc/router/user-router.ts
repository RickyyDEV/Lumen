import z from "zod";
import { authMiddleware, base } from "../../procedure";

const test = base
  .route({
    method: "GET",
    path: "/user",
    summary: "Test user",
  })
  .use(authMiddleware)
  .output(
    z.object({
      id: z.string(),
      email: z.string(),
    }),
  )
  .handler(async ({ context }) => {
    return { id: context.user.id, email: context.user.email };
  });

export const user = { test };
