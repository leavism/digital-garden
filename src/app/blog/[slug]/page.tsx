/**
 * Individual Blog Post Page
 *
 * Server component that handles:
 * - Dynamic metadata generation for SEO
 * - Server-side Tiptap content rendering
 * - JSON-LD structured data for blog posts
 * - Error handling for missing posts
 *
 * Architecture:
 * - Server component fetches post data and generates metadata
 * - Converts Tiptap JSON content to HTML server-side
 * - Passes rendered HTML to client component for display
 */

import { generateBlogPostJsonLd } from "@/app/_components/JsonLd";
import { generateDescription } from "@/lib/utils";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

/**
 * Page props with dynamic route parameter
 */
interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

/**
 * Generate dynamic metadata for blog posts
 *
 * Creates SEO-optimized metadata for each blog post including:
 * - Page title with site branding
 * - Auto-generated description from content (160 char limit)
 * - Open Graph tags for social media (type: article)
 * - Twitter Card configuration
 * - JSON-LD structured data (BlogPosting schema)
 * - Article dates (published/modified)
 * - Author attribution
 * - Canonical URL
 *
 * Fallbacks:
 * - Returns 404-style metadata if post not found
 * - Returns error metadata if fetch fails
 *
 * @param params - Route parameters containing the post slug
 * @returns Metadata object for Next.js
 */
export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;

	try {
		const post = await api.posts.getBySlug({ slug });

		if (!post) {
			return {
				title: "Post Not Found | Huy's Digital Garden",
				description: "The requested blog post could not be found.",
			};
		}

		const description = generateDescription(post.content);
		const title = `${post.title} | Huy's Digital Garden`;

		// Generate JSON-LD structured data for search engines
		const jsonLd = generateBlogPostJsonLd({
			title: post.title,
			description,
			slug: post.slug,
			content: post.content,
			publishedAt: post.publishedAt,
			updatedAt: post.updatedAt,
			author: post.author,
		});

		return {
			title,
			description,
			openGraph: {
				title: post.title,
				description,
				type: "article",
				url: `https://leavism.dev/blog/${post.slug}`,
				siteName: "Huy's Digital Garden",
				locale: "en_US",
				images: [
					{
						url: "https://leavism.dev/OGimage.png",
						width: 1200,
						height: 630,
						alt: `${post.title} - Huy's Digital Garden`,
					},
				],
				...(post.publishedAt && {
					publishedTime: post.publishedAt.toISOString(),
				}),
				...(post.updatedAt && { modifiedTime: post.updatedAt.toISOString() }),
				...(post.author?.name && {
					authors: [post.author.name],
				}),
			},
			twitter: {
				card: "summary_large_image",
				title: post.title,
				description,
				images: ["https://leavism.dev/OGimage.png"],
			},
			alternates: {
				canonical: `https://leavism.dev/blog/${post.slug}`,
			},
			robots: {
				index: true,
				follow: true,
			},
			other: {
				"application/ld+json": JSON.stringify(jsonLd),
			},
		};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "Error | Huy's Digital Garden",
			description: "An error occurred while loading this post.",
		};
	}
}

/**
 * Blog Post Page Component
 *
 * Server component that fetches and prepares blog post data.
 *
 * Responsibilities:
 * - Fetches post data from database via tRPC
 * - Converts Tiptap JSON content to HTML on the server
 * - Handles missing posts (404 state)
 * - Handles errors gracefully
 * - Passes rendered content to client component
 *
 * Content Rendering:
 * - Tries to parse content as Tiptap JSON format
 * - Falls back to treating content as raw HTML if JSON parse fails
 * - Server-side rendering improves initial page load and SEO
 *
 * Error States:
 * - Post not found: Shows "Post not found" message
 * - Fetch error: Shows "Error loading post" message
 *
 * @param params - Route parameters containing the post slug
 * @returns Rendered blog post or error state
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;

	try {
		const post = await api.posts.getBySlug({ slug });

		if (!post) {
			return (
				<main className="relative min-h-screen">
					<div className="mx-auto max-w-3xl px-4 py-12">
						<div className="flex h-64 items-center justify-center">
							<p className="text-muted-foreground">Post not found</p>
						</div>
					</div>
				</main>
			);
		}

		// Content is already rendered as HTML by the editor
		const renderedContent = post.content;

		return <BlogPostClient post={post} renderedContent={renderedContent} />;
	} catch (error) {
		console.error("Error loading post:", error);
		return (
			<main className="relative min-h-screen">
				<div className="mx-auto max-w-3xl px-4 py-12">
					<div className="flex h-64 items-center justify-center">
						<p className="text-muted-foreground">Error loading post</p>
					</div>
				</div>
			</main>
		);
	}
}
