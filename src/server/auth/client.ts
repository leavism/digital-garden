import { env } from "@/env";
import { createAuthClient } from "better-auth/client";
import { passkeyClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [passkeyClient()],
});
