import { os } from "@orpc/server";
import z from "zod";

const test = os
  .route({
    method: "GET",
    path: "/user",
    summary: "Test user",
  })
  .output(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  )
  .handler(async ({}) => {
    return { id: 1, name: "asdDAS" };
  });

export const user = { test };
