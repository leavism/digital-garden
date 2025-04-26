/**
 * Better Auth Client-Side Configuration
 *
 * This file configures the client-side implementation of Better-Auth.
 *
 * @module @/server/auth/client
 */
import { env } from "@/env";
import { passkeyClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

/**
 * Create the client instance to access the client library that allows for
 * interacting with the Better Auth server.
 *
 * @see https://www.better-auth.com/docs/concepts/client#create-client-instance
 * @see https://www.better-auth.com/docs/plugins/passkey#add-the-client-plugin
 */
export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [passkeyClient()],
});
