// src/app/(auth)/layout.tsx
import { getServerSession } from "@/server/auth";
import { headers } from "next/headers"; // Added import for headers
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	// If user is already authenticated and on a login/register page, redirect to home
	if (session?.user) {
		const headersList = await headers();
		const url = new URL(headersList.get("x-url") || "/", "http://localhost");

		// If the user is authenticated but hasn't set up a passkey yet,
		// don't redirect if they're already on the setup-passkey page
		if (url.pathname !== "/setup-passkey") {
			redirect("/");
		}
	}

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">{children}</div>
	);
}
