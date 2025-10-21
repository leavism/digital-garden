import "@/styles/globals.css";

import type { Metadata } from "next";

import { Toaster } from "@/app/_components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { geist, playfairDisplay } from "@/app/fonts";

export const metadata: Metadata = {
	title: "Huy's Digital Garden",
	description:
		"Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
	openGraph: {
		title: "Huy's Digital Garden",
		description:
			"Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
		url: "https://leavism.dev",
		siteName: "Huy's Digital Garden",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary",
		title: "Huy's Digital Garden",
		description:
			"Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	alternates: {
		canonical: "https://leavism.dev",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable} ${playfairDisplay.variable}`}>
			<body className="font-serif">
				<TRPCReactProvider>{children}</TRPCReactProvider>
				<Toaster />
			</body>
		</html>
	);
}
