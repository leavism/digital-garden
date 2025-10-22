"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	content: string;
	publishedAt: Date | null;
	createdAt: Date;
	updatedAt: Date | null;
	author: { name: string | null; image: string | null } | null;
}

interface BlogPostClientProps {
	post: BlogPost;
	renderedContent: string;
}

export default function BlogPostClient({ post, renderedContent }: BlogPostClientProps) {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

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
							className="group inline-flex items-center gap-2 font-display text-gray-600 text-lg transition-colors hover:text-gray-900"
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
					className="prose prose-stone prose-xl mx-auto"
				>
					{/* Header */}
					<div className="flex items-center justify-center">
						<h1 className="text-center font-display tracking-wide">
							{post.title}
						</h1>
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

					{/* Content */}
					<div className="max-w-none border-gray-200 border-t pt-12">
						<div className="prose prose-stone prose-xl mx-auto font-serif">
							{parse(renderedContent)}
						</div>

						{/* Footer */}
						<motion.footer
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
							className="mt-12 border-gray-200 border-t pt-8"
						>
							<div className="flex items-center justify-center">
								<button
									type="button"
									onClick={scrollToTop}
									className="group flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
									aria-label="Back to top"
								>
									<Image
										src="/white-daisy.svg"
										alt="white daisy"
										width={20}
										height={20}
										className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-70"
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