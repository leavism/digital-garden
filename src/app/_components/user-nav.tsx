// src/app/_components/user-nav.tsx
"use client";
import type { Session } from "@/server/auth";
import { authClient } from "@/server/auth/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserNav({ session }: { session: Session | null }) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await authClient.signOut();
			router.refresh();
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	if (!session?.user) {
		return (
			<div className="flex gap-4">
				<a href="/login" className="text-gray-700 text-sm hover:text-blue-600">
					Login
				</a>
				<a
					href="/register"
					className="font-medium text-blue-600 text-sm hover:text-blue-800"
				>
					Register
				</a>
			</div>
		);
	}

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100"
			>
				{session.user.image ? (
					<Image
						src={session.user.image}
						alt={session.user.name || "User"}
						width={32}
						height={32}
						className="rounded-full"
					/>
				) : (
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
						{session.user.name?.[0]?.toUpperCase() || "U"}
					</div>
				)}
				<span className="font-medium text-sm">{session.user.name}</span>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
					<button
						type="button"
						onClick={handleSignOut}
						className="block w-full px-4 py-2 text-left text-gray-700 text-sm hover:bg-gray-100"
					>
						Sign out
					</button>

					<a
						href="/setup-passkey"
						className="block w-full px-4 py-2 text-left text-gray-700 text-sm hover:bg-gray-100"
					>
						Manage Passkeys
					</a>
				</div>
			)}
		</div>
	);
}
