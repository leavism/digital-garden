/**
 * Query Client Configuration
 *
 * This file configures the TanStack Query client used by tRPC for managing server state.
 *
 * @module @/trpc/query-client
 */

import {
	QueryClient,
	defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

/**
 * Creates a configured TanStack Query client to use with tRPC.
 *
 * Uses SuperJSON for serialization/deserialization.
 */
export const createQueryClient = (): QueryClient =>
	new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 30 * 1000,
			},
			dehydrate: {
				serializeData: SuperJSON.serialize,
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
			hydrate: {
				deserializeData: SuperJSON.deserialize,
			},
		},
	});
