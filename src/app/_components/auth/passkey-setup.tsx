// src/app/_components/auth/passkey-setup.tsx
"use client";
import { authClient } from "@/server/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passkeySchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
});

type PasskeyFormValues = z.infer<typeof passkeySchema>;

export function PasskeySetup() {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const form = useForm<PasskeyFormValues>({
		resolver: zodResolver(passkeySchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data: PasskeyFormValues) => {
		setIsPending(true);
		setError(null);

		try {
			void (await authClient.passkey.addPasskey(
				{
					name: data.name,
				},
				{
					onSuccess: () => {
						router.push("/");
					},
				},
			));

			// After successful passkey registration, redirect to home page
		} catch (error) {
			console.error("Passkey registration error:", error);
			setError("Failed to register passkey. Please try again.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="mx-auto max-w-md space-y-6 p-8">
			<div className="space-y-2 text-center">
				<h1 className="font-bold text-3xl">Set Up Passkey</h1>
				<p className="text-gray-500">
					Secure your account with a passkey for easier login
				</p>
			</div>

			{error && (
				<div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>
			)}

			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-2">
					<label className="font-medium text-sm" htmlFor="name">
						Passkey Name
					</label>
					<input
						className="w-full rounded-md border border-gray-300 p-2"
						id="name"
						type="text"
						placeholder="e.g. My Phone, Work Laptop"
						{...form.register("name")}
					/>
					{form.formState.errors.name && (
						<p className="text-red-500 text-sm">
							{form.formState.errors.name.message}
						</p>
					)}
				</div>
				<button
					className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
					type="submit"
					disabled={isPending}
				>
					{isPending ? "Setting up..." : "Set Up Passkey"}
				</button>
			</form>
		</div>
	);
}
