import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Journal | Huy's Digital Garden",
	description:
		"A collection of my thoughts, discoveries, and reflections. Browse through my personal writing and insights.",
	openGraph: {
		title: "My Journal | Huy's Digital Garden",
		description:
			"A collection of my thoughts, discoveries, and reflections. Browse through my personal writing and insights.",
		url: "https://leavism.dev/blog",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "My Journal | Huy's Digital Garden",
		description:
			"A collection of my thoughts, discoveries, and reflections. Browse through my personal writing and insights.",
	},
	alternates: {
		canonical: "https://leavism.dev/blog",
	},
};

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}