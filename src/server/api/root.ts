import { postsRouter } from "@/server/api/routers/posts";
/**
 * tRPC API Router Root
 *
 * This file serves as the main entry point to all tRPC routes in the application.
 * This file should only contain router composition and exports. Actual API
 * implementation logic should be defined in their individual router files.
 *
 * When adding new functionality to the API:
 * 1. Create a new router file in @/server/api/routers/ or add to an existing one
 * 2. Import and add the router to the appRouter in this file
 */
import { usersRouter } from "@/server/api/routers/users";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * The primary router for the server.
 *
 * All routes in @/server/api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: usersRouter,
	posts: postsRouter,
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
