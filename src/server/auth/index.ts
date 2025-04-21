import { env } from "@/env";
import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { passkey } from "better-auth/plugins/passkey";
import { headers } from "next/headers";
import { cache } from "react";
import * as schema from "@/server/db/schema/auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
		schema: schema,
	}),
	plugins: [
		passkey({
			rpID: "Digital Garden Dev",
			rpName: "Huy's Digital Garden",
			origin: env.BETTER_AUTH_URL,
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
