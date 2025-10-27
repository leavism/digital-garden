/**
 * Root Layout Component
 *
 * This is the root layout for the entire application. It wraps all pages and provides:
 * - Global styles and CSS variables
 * - Site-wide metadata
 * - JSON-LD structured data for Organization and Person schemas
 * - Global providers (tRPC, toast notifications)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */

import "@/styles/globals.css";

import type { Metadata } from "next";

import {
	generateOrganizationJsonLd,
	generatePersonJsonLd,
} from "@/app/_components/JsonLd";
import { Toaster } from "@/app/_components/ui/sonner";
import { geist, lora, playfairDisplay } from "@/app/fonts";
import { TRPCReactProvider } from "@/trpc/react";

/**
 * Site-wide metadata configuration
 *
 * Defines default metadata for all pages including:
 * - Basic metadata (title, description, favicon)
 * - Open Graph tags for social media sharing
 * - Twitter Card configuration
 * - SEO directives (robots, canonical URLs)
 * - JSON-LD structured data for search engines
 *
 * Individual pages can override these defaults in their own metadata exports.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
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
	/**
	 * JSON-LD structured data for search engines
	 * Includes Organization and Person schemas for better SEO and knowledge graph inclusion
	 */
	other: {
		"application/ld+json": JSON.stringify([
			generateOrganizationJsonLd({
				name: "Huy's Digital Garden",
				url: "https://leavism.dev",
				description:
					"Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
				logo: "https://leavism.dev/OGimage.png",
			}),
			generatePersonJsonLd(),
		]),
	},
};

/**
 * Root Layout Component
 *
 * Provides the HTML shell and global providers for the entire application.
 *
 * Features:
 * - Sets up HTML lang attribute for accessibility
 * - Applies custom font CSS variables (Geist, Lora, Playfair Display)
 * - Wraps app in tRPC provider for type-safe API calls
 * - Includes global toast notification system (Sonner)
 *
 * @param children - Child pages and layouts to render
 */
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
