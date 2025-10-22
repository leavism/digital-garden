import "@/styles/globals.css";

import type { Metadata } from "next";

import { Toaster } from "@/app/_components/ui/sonner";
import { geist, lora, playfairDisplay } from "@/app/fonts";
import { TRPCReactProvider } from "@/trpc/react";
import { generateOrganizationJsonLd, generatePersonJsonLd } from "@/app/_components/JsonLd";

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
		images: [
			{
				url: "https://leavism.dev/OGimage.png",
				width: 1200,
				height: 630,
				alt: "Huy's Digital Garden - A personal website about software development",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Huy's Digital Garden",
		description:
			"Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
		images: ["https://leavism.dev/OGimage.png"],
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
	other: {
		"application/ld+json": JSON.stringify([
			generateOrganizationJsonLd({
				name: "Huy's Digital Garden",
				url: "https://leavism.dev",
				description: "Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
				logo: "https://leavism.dev/OGimage.png",
			}),
			generatePersonJsonLd(),
		]),
	},
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className={`${geist.variable} ${lora.variable} ${playfairDisplay.variable}`}
		>
			<body className="font-serif">
				<TRPCReactProvider>{children}</TRPCReactProvider>
				<Toaster />
			</body>
		</html>
	);
}
