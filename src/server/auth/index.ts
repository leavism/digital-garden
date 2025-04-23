import { env } from "@/env";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { passkey } from "better-auth/plugins/passkey";
import { headers } from "next/headers";
import { cache } from "react";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
		schema: schema,
	}),
	socialProviders: {
		discord: {
			clientId: env.DISCORD_CLIENT_ID as string,
			clientSecret: env.DISCORD_CLIENT_SECRET as string,
		},
	},
	plugins: [
		passkey({
			rpID: "localhost",
			rpName: "Huy's Digital Garden",
			origin: env.BETTER_AUTH_URL,
			authenticatorSelection: {
				authenticatorAttachment: "platform",
				userVerification: "required",
			},
		}),
	],
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day (session expiration is updated every day)
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // cache lasts for 5 minutes
		},
	},
});

/**
 * Server function that gets the current user's authentication session.
 *
 * React's `cache()` function memoizes the result, preventing redundant database
 * queries when multiple components request the session in the same render cycle.
 */
export const getServerSession = cache(
	async () => await auth.api.getSession({ headers: await headers() }),
);

/**
 * Type definition for auth sessions.
 *
 * Uses Better-Auth's `$Infer` property to infer the type.
 *
 * @see https://www.better-auth.com/docs/concepts/typescript#inferring-types
 */
export type Session = typeof auth.$Infer.Session;

/**
 * Type definition for just the user portion of the session. Convenient for when
 * you only need to work with the user data of sessions.
 */
export type AuthUserType = Session["user"];
