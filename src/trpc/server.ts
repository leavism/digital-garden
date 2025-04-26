/**
 * tRPC Server Integration
 *
 * This file provides server-side tRPC utilities for React Server Components.
 *
 * @module @/trpc/server
 */
import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { type AppRouter, createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
	const heads = new Headers(await headers());
	heads.set("x-trpc-source", "rsc");

	return createTRPCContext({
		headers: heads,
	});
});

/**
 * Cached query client factory to ensure consistent query client
 * usage across multiple tRPC calls in RSC.
 */
const getQueryClient = cache(createQueryClient);

/**
 * tRPC caller instance for direct procedure calls in RSC.
 */
const caller = createCaller(createContext);

/**
 * Exported utilities for React Server Components:
 * - api: The tRPC instance for calling procedures
 * - HydrateClient: Component to hydrate client state
 */
export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
	caller,
	getQueryClient,
);
