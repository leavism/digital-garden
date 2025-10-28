/**
 * Blog Section Layout
 *
 * Provides metadata overrides for all pages under the /blog route:
 * - Overrides root layout metadata with blog-specific values
 * - Sets up SEO for the blog section (Open Graph, Twitter Cards)
 * - Provides canonical URLs for proper indexing
 */

import type { Metadata } from "next";

/**
 * Blog section metadata
 *
 * Sets default metadata for all blog routes. Individual blog post pages
 * can override these values with post-specific metadata (title, description, etc.)
 *
 * Includes:
 * - Page title and description
 * - Open Graph tags for social media sharing
 * - Twitter Card configuration
 * - Canonical URL for SEO
 */
export const metadata: Metadata = {
	title: "My Blog | Huy's Digital Garden",
	description:
		"A collection of my thoughts, discoveries, and reflections. Browse through my personal writing and insights.",
	openGraph: {
		title: "My Blog | Huy's Digital Garden",
		description:
			"A collection of my thoughts, discoveries, and reflections. Browse through my personal writing and insights.",
		url: "https://leavism.dev/blog",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "My Blog | Huy's Digital Garden",
		description:
			"A collection of my thoughts, discoveries, and reflections. Browse through my personal writing and insights.",
	},
	alternates: {
		canonical: "https://leavism.dev/blog",
	},
};

/**
 * Blog Layout Component
 *
 * A pass-through layout that only provides metadata without adding UI elements.
 *
 * @param children - Child pages (blog list or individual posts)
 * @returns Children without additional wrapping
 */
export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
