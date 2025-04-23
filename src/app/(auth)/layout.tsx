// src/app/(auth)/layout.tsx
import { getServerSession } from "@/server/auth";
import { headers } from "next/headers"; // Added import for headers
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col bg-gray-50">{children}</div>
	);
}
