// src/app/(auth)/setup-passkey/page.tsx
import { PasskeySetup } from "@/app/_components/auth/passkey-setup";
import { getServerSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function SetupPasskeyPage() {
	const session = await getServerSession();

	// If user is not authenticated, redirect to login
	if (!session?.user) {
		redirect("/login");
	}

	// Use the tRPC procedure to check if user has a passkey
	const hasPasskey = await api.user.hasPasskey();

	// If user already has a passkey, redirect to home
	if (hasPasskey) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<PasskeySetup />
		</div>
	);
}
