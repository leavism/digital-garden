import "@/styles/globals.css";

import type { Metadata } from "next";

import { Toaster } from "@/app/_components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "Huy's Digital Garden",
	description:
		"Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="font-serif">
			<body>
				{/* <header className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-sm"> */}
				{/* 	<div className="container mx-auto flex items-center justify-between p-4"> */}
				{/* 		<a href="/" className="font-bold text-xl"> */}
				{/* 			Digital Garden */}
				{/* 		</a> */}
				{/* 		<UserNav session={session} /> */}
				{/* 	</div> */}
				{/* </header> */}
				<TRPCReactProvider>{children}</TRPCReactProvider>
				<Toaster />
			</body>
		</html>
	);
}
