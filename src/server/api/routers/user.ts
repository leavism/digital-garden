import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { passkey } from "@/server/db/schema/auth";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
	getSession: publicProcedure.query(({ ctx }) => {
		return ctx.session;
	}),

	getUserProfile: protectedProcedure.query(async ({ ctx }) => {
		return {
			user: ctx.session.user,
		};
	}),

	hasPasskey: protectedProcedure.query(async ({ ctx }) => {
		const userPasskeys = await ctx.db
			.select()
			.from(passkey)
			.where(eq(passkey.userId, ctx.session.user.id));

		return userPasskeys.length > 0;
	}),
});
