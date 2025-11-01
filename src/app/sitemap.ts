/**
 * Sitemap Configuration
 *
 * This module generates the XML sitemap for the website, helping search engines
 * discover and index all pages. The sitemap is dynamically generated and includes:
 * - Static pages (homepage, blog index)
 * - Dynamic blog posts (only published ones)
 *
 * The sitemap follows the sitemaps.org protocol and includes metadata for each URL:
 * - Last modification date
 * - Change frequency hints for search engines
 * - Priority values (0.0 to 1.0) indicating relative importance
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * @see https://www.sitemaps.org/protocol.html
 */

import { env } from "@/env";
import { api } from "@/trpc/server";
import type { MetadataRoute } from "next";

/**
 * Generate XML Sitemap
 *
 * Dynamically creates a sitemap by combining static pages with published blog posts.
 * Uses the base URL from environment configuration and fetches blog posts via tRPC.
 *
 * @returns Promise resolving to sitemap entries array
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = env.BETTER_AUTH_URL;

	// Fetch all blog posts from the database
	const posts = await api.posts.getAll();

	/**
	 * Dynamic Blog Post Entries
	 *
	 * Creates sitemap entries for published blog posts only.
	 * Each entry includes:
	 * - URL: /blog/{slug}
	 * - Last modified: Post update date, publish date, or current date as fallback
	 * - Change frequency: Monthly (posts are relatively stable once published)
	 * - Priority: 0.7 (important content, but below main pages)
	 */
	const blogPosts: MetadataRoute.Sitemap = posts
		.filter((post) => post.publishedAt) // Only include published posts
		.map((post) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: post.updateAt || post.publishedAt || new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		}));

	/**
	 * Static Page Entries
	 *
	 * Defines sitemap entries for static pages with their SEO metadata:
	 * - Homepage: Highest priority (1.0), changes yearly
	 * - Blog index: High priority (0.8), changes weekly as new posts are added
	 */
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];

	// Combine static pages and dynamic blog posts
	return [...staticPages, ...blogPosts];
}
