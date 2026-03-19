import { RPCHandler } from "@orpc/server/fetch";
import { onError } from "@orpc/server";
import mainRouter from "@/app/(orpc)/orpc/router";
import { CORSPlugin } from "@orpc/server/plugins";
import { notFound } from "next/navigation";
import prisma from "@/app/(database)/prisma";
import { headers } from "next/headers";
import s3Client from "@/app/s3";

const handler = new RPCHandler(mainRouter, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

async function handleRequest(request: Request) {
  const { response } = await handler.handle(request, {
    prefix: "/rpc",
    context: {
      db: prisma,
      headers: await headers(),
      s3: s3Client,
    },
  });

  return response ?? notFound();
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
