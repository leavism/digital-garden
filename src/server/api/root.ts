import { userRouter } from "@/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * The primary router for the server.
 *
 * All routes in @/server/api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
});

/**
 * Export the type definition for the API.
 */
export type AppRouter = typeof appRouter;

/**
 * Create a servers-side caller for the tRPC API.
 *
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
