"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { authClient } from "@/server/auth/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
	const [isHovering, setIsHovering] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const handlePasskeyLogin = async () => {
		setIsPending(true);
		try {
			await authClient.signIn.passkey({
				fetchOptions: {
					onSuccess: () => {
						router.push("/admin");
						router.refresh();
					},
				},
			});
		} catch (error) {
			console.error("Passkey login error", error);
		} finally {
			setIsPending(false);
		}
	};

	const handleDiscordLogin = async () => {
		setIsPending(true);
		try {
			await authClient.signIn.social({
				provider: "discord",
				callbackURL: "/admin", //url to redirect to on success
			});
		} catch (error) {
			console.error("Discord login error", error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="w-full max-w-md px-4">
			<div className="relative">
				<Card className="border-none">
					<CardHeader className="space-y-1 text-center">
						<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
							<Image
								src="/white-daisy.svg"
								alt="white daisy"
								width={32}
								height={32}
								className="h-10 w-10 md:h-10 md:w-10"
							/>
						</div>
						<CardTitle className="font-bold text-3xl">Welcome back</CardTitle>
						<CardDescription className="font-medium text-lg">
							Sign in to tend to your digital garden
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button
							className="w-full font-sans"
							variant="default"
							disabled={isPending}
							onClick={handlePasskeyLogin}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="mr-2 h-4 w-4"
								role="img"
								aria-label="logo"
							>
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0 1 10 0v4" />
							</svg>
							{isPending ? "Authenticating" : "Sign in with Passkey"}
						</Button>

						<Button
							className="w-full bg-[#5865F2] font-sans hover:bg-[#4752c4]"
							variant="default"
							disabled={isPending}
							onClick={handleDiscordLogin}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 127.14 96.36"
								className="mr-2 h-5 w-5"
								fill="#ffffff"
								role="img"
								aria-label="logo"
							>
								<path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
							</svg>
							{isPending ? "Authenticating" : "Sign in with Discord"}
						</Button>
					</CardContent>
					<CardFooter>
						<p
							className="w-full bg-white text-center text-gray-400"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							{isHovering
								? "This garden is private. Only the gardener may enter."
								: "Nurture your thoughts and watch them bloom."}
						</p>
					</CardFooter>
				</Card>

				{/* Decorative daisies */}
				<div className="-bottom-4 -left-4 absolute h-12 w-12 rotate-12">
					<Image
						src="/white-daisy.svg"
						alt="white daisy"
						width={32}
						height={32}
						className="h-10 w-10 md:h-10 md:w-10"
					/>
				</div>
				<div className="-right-2 -top-2 -rotate-12 absolute h-10 w-10">
					<Image
						src="/white-daisy.svg"
						alt="white daisy"
						width={32}
						height={32}
						className="h-10 w-10 md:h-10 md:w-10"
					/>
				</div>
			</div>
		</div>
	);
}
