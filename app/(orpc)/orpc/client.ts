import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { BatchLinkPlugin } from "@orpc/client/plugins";
import mainRouter from "./router";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.unnoq.com/docs/adapters/next#optimize-ssr}
 */
declare global {
  var $client: RouterClient<typeof mainRouter> | undefined;
}

const link = new RPCLink({
  url: `${
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"
  }/rpc`,
  plugins: [
    new BatchLinkPlugin({
      groups: [
        {
          condition: () => true,
          context: {},
        },
      ],
    }),
  ],
});

export const client: RouterClient<typeof mainRouter> =
  globalThis.$client ?? createORPCClient(link);

export const reactClient = createTanstackQueryUtils(client);
