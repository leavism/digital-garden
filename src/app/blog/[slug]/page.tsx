import { api } from "@/trpc/server";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import { generateBlogPostJsonLd } from "@/app/_components/JsonLd";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { Code } from "@tiptap/extension-code";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { Callout } from "@/app/_components/editor/extensions/callout";

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Tiptap extensions - must match your editor configuration
const extensions = [
	StarterKit.configure({
		code: false,
	}),
	Code.configure({
		HTMLAttributes: {
			class:
				"bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-base font-mono",
		},
	}),
	TextStyle,
	Color,
	Highlight.configure({
		multicolor: true,
	}),
	Underline,
	Link.configure({
		openOnClick: false,
		HTMLAttributes: {
			class: "text-blue-600 underline cursor-pointer",
		},
	}),
	Image.configure({
		HTMLAttributes: {
			class: "max-w-full h-auto rounded-lg",
		},
	}),
	TextAlign.configure({
		types: ["heading", "paragraph"],
	}),
	TaskList,
	TaskItem.configure({
		nested: true,
	}),
	Callout,
];

function extractTextFromHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

function generateDescription(content: string): string {
	const plainText = extractTextFromHtml(content);
	return plainText.length > 160
		? `${plainText.substring(0, 157)}...`
		: plainText;
}

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

		// Generate JSON-LD structured data
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

		// Generate HTML from Tiptap content server-side
		let renderedContent: string;
		try {
			// Try parsing as JSON first (if content is stored as JSON)
			const contentJson = JSON.parse(post.content);
			renderedContent = generateHTML(contentJson, extensions);
		} catch {
			// If parsing fails, assume content is already HTML
			renderedContent = post.content;
		}

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
