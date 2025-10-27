/**
 * JSON-LD (JavaScript Object Notation for Linked Data) schema generators
 *
 * This module provides utility functions to generate structured data markup
 * for improved SEO and search engine understanding. JSON-LD helps search engines
 * understand the content, context, and relationships of your web pages.
 *
 * @see https://schema.org - Schema.org vocabulary reference
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 *
 * @example
 * ```tsx
 * import { generateBlogPostJsonLd } from "@/app/_components/JsonLd";
 *
 * const jsonLd = generateBlogPostJsonLd({
 *   title: "My Blog Post",
 *   description: "A great post",
 *   slug: "my-blog-post",
 *   content: "<p>Content here</p>",
 *   publishedAt: new Date(),
 *   updatedAt: new Date(),
 *   author: { name: "Huy", image: "/avatar.jpg" }
 * });
 *
 * // In your page/layout
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 * />
 * ```
 */

import { stripHtml } from "@/lib/utils";

/**
 * Props for generating BlogPosting schema
 * @see https://schema.org/BlogPosting
 */
interface BlogPostJsonLdProps {
	/** The title/headline of the blog post */
	title: string;
	/** Brief description or excerpt of the blog post */
	description: string;
	/** URL slug for the blog post (e.g., "my-first-post") */
	slug: string;
	/** Full HTML content of the blog post */
	content: string;
	/** When the post was first published */
	publishedAt: Date | null;
	/** When the post was last updated */
	updatedAt: Date | null;
	/** Author information */
	author: {
		name: string | null;
		image: string | null;
	} | null;
}

/**
 * Props for generating Organization schema
 * @see https://schema.org/Organization
 */
interface OrganizationJsonLdProps {
	/** Organization/website name */
	name: string;
	/** Full URL of the website */
	url: string;
	/** Description of the organization/website */
	description: string;
	/** Optional URL to the organization's logo image */
	logo?: string;
}

/**
 * Generates JSON-LD structured data for a blog post
 *
 * Creates a BlogPosting schema that helps search engines understand:
 * - Article metadata (title, description, dates)
 * - Author and publisher information
 * - Content structure and word count
 * - Relationships to the parent website
 *
 * @param props - Blog post metadata
 * @returns Schema.org BlogPosting object ready for JSON-LD script tag
 *
 * @see https://schema.org/BlogPosting
 */
export function generateBlogPostJsonLd({
	title,
	description,
	slug,
	content,
	publishedAt,
	updatedAt,
	author,
}: BlogPostJsonLdProps) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: title,
		description: description,
		url: `https://leavism.dev/blog/${slug}`,
		datePublished: publishedAt?.toISOString(),
		dateModified: updatedAt?.toISOString() || publishedAt?.toISOString(),
		author: {
			"@type": "Person",
			name: author?.name || "Huy",
			url: "https://leavism.dev",
			...(author?.image && { image: author.image }),
		},
		publisher: {
			"@type": "Organization",
			name: "Huy's Digital Garden",
			url: "https://leavism.dev",
			logo: {
				"@type": "ImageObject",
				url: "https://leavism.dev/OGimage.png",
				width: 1200,
				height: 630,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://leavism.dev/blog/${slug}`,
		},
		image: {
			"@type": "ImageObject",
			url: "https://leavism.dev/OGimage.png",
			width: 1200,
			height: 630,
		},
		articleBody: stripHtml(content),
		wordCount: stripHtml(content).split(/\s+/).length,
		inLanguage: "en-US",
		isPartOf: {
			"@type": "Website",
			name: "Huy's Digital Garden",
			url: "https://leavism.dev",
		},
	};
}

/**
 * Generates JSON-LD structured data for organization/website
 *
 * Creates an Organization + Website schema that helps search engines understand:
 * - Business/website identity and branding
 * - Social media profiles (sameAs links)
 * - Founder/owner information
 * - Website structure and language
 *
 * @param props - Organization metadata
 * @returns Schema.org Organization/Website object ready for JSON-LD script tag
 *
 * @see https://schema.org/Organization
 * @see https://schema.org/Website
 */
export function generateOrganizationJsonLd({
	name,
	url,
	description,
	logo,
}: OrganizationJsonLdProps) {
	return {
		"@context": "https://schema.org",
		"@type": ["Organization", "Website"],
		name: name,
		url: url,
		description: description,
		sameAs: [
			"https://github.com/leavism",
			"https://www.linkedin.com/in/leavism/",
		],
		...(logo && {
			logo: {
				"@type": "ImageObject",
				url: logo,
			},
		}),
		founder: {
			"@type": "Person",
			name: "Huy",
			url: url,
		},
		mainEntity: {
			"@type": "WebSite",
			"@id": url,
			url: url,
			name: name,
			description: description,
			inLanguage: "en-US",
		},
	};
}

/**
 * Generates JSON-LD structured data for a person/individual
 *
 * Creates a Person schema that helps search engines understand:
 * - Professional identity and role
 * - Social media profiles
 * - Work relationships
 * - Personal website/portfolio
 *
 * This is useful for personal branding and knowledge graph inclusion.
 *
 * @returns Schema.org Person object ready for JSON-LD script tag
 *
 * @see https://schema.org/Person
 */
export function generatePersonJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Huy",
		url: "https://leavism.dev",
		jobTitle: "Software Developer",
		description: "A software developer sharing his experience and knowledge.",
		sameAs: [
			"https://github.com/leavism",
			"https://www.linkedin.com/in/leavism/",
		],
		mainEntityOfPage: "https://leavism.dev",
		worksFor: {
			"@type": "Organization",
			name: "Huy's Digital Garden",
			url: "https://leavism.dev",
		},
	};
}
