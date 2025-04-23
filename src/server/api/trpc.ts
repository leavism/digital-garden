import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * Generates the "internals" for a tRPC context. The API handler and RSC clients
 * each wrap this and provides the required context. This is what allows access
 * to the database, session, etc. when processing requests.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
	const session = await auth.api.getSession({
		headers: opts.headers,
	});

	return {
		db,
		session,
		...opts,
	};
};

/**
 * Initialize the tRPC API, connecting the context to the transformer.
 * Parses ZodErrors for typesafety on the frontend when a procedure fails
 * due to validation errors on the backend.
 */
const trpcBuilder = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

/**
 * Create server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = trpcBuilder.createCallerFactory;

/**
 * Create a new routers and sub-routers
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = trpcBuilder.router;

/**
 * Public (unauthenticated) procudure
 *
 * Reusable base procedure to build queries and mutations on the tRPC API. This
 * procedure does not guarantee queries are authenticated.
 *
 * @see https://trpc.io/docs/server/procedures#reusable-base-procedures
 */
export const publicProcedure = trpcBuilder.procedure;

/**
 * Protected (authenticated) procedure
 *
 * Queries or mutations that are only accessible to authenticated users. Verifies
 * that the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/server/procedures
 */
export const protectedProcedure = trpcBuilder.procedure.use(({ ctx, next }) => {
	if (!ctx.session?.user) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({
		ctx: {
			session: { ...ctx.session, user: ctx.session.user },
		},
	});
});
