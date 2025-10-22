/**
 * User router
 *
 * Endpoints to query or mutate anything related to users should be
 * defined here.
 *
 * @module @/server/api/routers/user
 */
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import type { Session } from "@/server/auth";
import { passkey } from "@/server/db/schema/auth";
import { eq } from "drizzle-orm";

/**
 * User router
 *
 * Defines the tRPC procedures related to user operations. Endpoints to query
 * or mutate anything related to users should be defined here.
 */
export const usersRouter = createTRPCRouter({
	/**
	 * Retrieves the current user's session data.
	 *
	 * This is a public procedure that can be called without an authenticated
	 * session.
	 */
	getSession: publicProcedure.query(({ ctx }): Session | null => {
		return ctx.session;
	}),

	/**
	 * Retrieves the authenticated user information.
	 *
	 * This is a protected procedure that requires an authenticated session.
	 */
	getUserProfile: protectedProcedure.query(
		async ({ ctx }): Promise<{ user: Session["user"] }> => {
			return {
				user: ctx.session.user,
			};
		},
	),

	/**
	 * Checks if the authenticated user has registered any passkeys.
	 *
	 * This is a protected procedure that requires an authenticated session.
	 */
	hasPasskey: protectedProcedure.query(async ({ ctx }): Promise<boolean> => {
		const userPasskeys = await ctx.db
			.select()
			.from(passkey)
			.where(eq(passkey.userId, ctx.session.user.id));

		return userPasskeys.length > 0;
	}),
});
