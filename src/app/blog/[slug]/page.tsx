"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Callout } from "@/app/_components/Callout";
import { api } from "@/trpc/react";

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = use(params);
	const { data: post, isLoading } = api.posts.getBySlug.useQuery({
		slug,
	});
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (isLoading) {
		return (
			<main className="relative min-h-screen">
				<div className="mx-auto max-w-3xl px-4 py-12">
					<div className="flex items-center justify-center h-64">
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</div>
			</main>
		);
	}

	if (!post) {
		return (
			<main className="relative min-h-screen">
				<div className="mx-auto max-w-3xl px-4 py-12">
					<div className="flex items-center justify-center h-64">
						<p className="text-muted-foreground">Post not found</p>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="relative min-h-screen">
			<div className="mx-auto max-w-3xl px-4 py-12">
				{/* Navigation */}
				<motion.nav
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mb-8"
				>
					<div className="flex items-center justify-between">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
						>
							<span className="group-hover:-translate-x-1 transition-transform">
								←
							</span>
							<span>All Entries</span>
						</Link>
					</div>
				</motion.nav>

				{/* Article */}
				<motion.article
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{/* Header */}
					<header className="mb-12">
						<div className="prose prose-lg mb-2 flex items-center justify-center gap-3">
							<h1 className="text-center">{post.title}</h1>
						</div>

						{/* Meta information */}
						<div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
							{post.publishedAt && (
								<time dateTime={post.publishedAt.toISOString()}>
									Published{" "}
									{new Date(post.publishedAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
							)}
							{post.updatedAt && (
								<time dateTime={post.updatedAt.toISOString()}>
									Updated{" "}
									{new Date(post.updatedAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
							)}
						</div>
					</header>

					{/* Content */}
					<div className="prose prose-lg max-w-none border-t border-gray-200 pt-12">
						<div dangerouslySetInnerHTML={{ __html: post.content }} />

						{/* Footer */}
						<motion.footer
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
							className="mt-12 border-t border-gray-200 pt-8"
						>
							<div className="flex items-center justify-center">
								<button
									onClick={scrollToTop}
									className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer group"
									aria-label="Back to top"
								>
									<Image
										src="/white-daisy.svg"
										alt="white daisy"
										width={20}
										height={20}
										className="h-5 w-5 opacity-50 group-hover:opacity-70 transition-opacity"
									/>
									<span className="text-base group-hover:underline">
										Thanks for reading, I can take you back to the top
									</span>
								</button>
							</div>
						</motion.footer>
					</div>
				</motion.article>
			</div>
		</main>
	);
}
