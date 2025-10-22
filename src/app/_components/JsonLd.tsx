interface BlogPostJsonLdProps {
	title: string;
	description: string;
	slug: string;
	content: string;
	publishedAt: Date | null;
	updatedAt: Date | null;
	author: {
		name: string | null;
		image: string | null;
	} | null;
}

interface OrganizationJsonLdProps {
	name: string;
	url: string;
	description: string;
	logo?: string;
}

function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

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
				url: "https://leavism.dev/flower-white.png",
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
			url: "https://leavism.dev/flower-white.png",
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

export function generatePersonJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Huy",
		url: "https://leavism.dev",
		jobTitle: "Software Developer",
		description: "A software developer sharing knowledge through a digital garden",
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