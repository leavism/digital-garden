import { env } from "@/env";
import { api } from "@/trpc/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = env.BETTER_AUTH_URL;

	const posts = await api.posts.getAll();

	// Create sitemap entries for blog posts
	const blogPosts: MetadataRoute.Sitemap = posts
		.filter((post) => post.publishedAt) // Only include published posts
		.map((post) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: post.updateAt || post.publishedAt || new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		}));

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

	return [...staticPages, ...blogPosts];
}
