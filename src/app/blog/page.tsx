/**
 * Blog Posts List Page
 *
 * Displays a paginated list of all published blog posts with animations.
 * Features a "digital garden" themed design with flower decorations.
 *
 * Key Features:
 * - Client-side pagination (25 posts per page)
 * - tRPC for type-safe data fetching
 * - Loading state handling
 */

"use client";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "../_components/icons";

// Number of blog posts to display per page
// TODO: Move this to a settings page or environment variable
const POSTS_PER_PAGE = 25;

/**
 * Blog post data structure for the list view
 * Only includes fields needed for the list (not full content)
 */
type BlogPost = {
	id: string;
	title: string;
	slug: string;
	publishedAt: Date | null;
};

/**
 * Individual blog post row component
 *
 * Renders a single post in the list with:
 * - Staggered entrance animation
 * - Hover effects on title and date
 * - Semantic HTML with proper time element
 * - Accessible link wrapping
 *
 * @param post - Blog post data to display
 * @param index - Position in list (used for staggered animation delay)
 */
function BlogPostRow({ post, index }: { post: BlogPost; index: number }) {
	return (
		<motion.li
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, delay: index * 0.02 }}
			className="group"
		>
			<Link href={`/blog/${post.slug}`}>
				<div className="group flex items-center justify-between px-1 py-1 font-medium text-xl transition-all hover:translate-x-1">
					<h3 className="text-gray-500 transition-all group-hover:text-gray-600 group-hover:underline">
						{post.title}
					</h3>
					<time
						dateTime={post.publishedAt?.toISOString()}
						className="group ml-4 flex-shrink-0 text-gray-400 tracking-wide group-hover:text-gray-600"
					>
						{post.publishedAt
							? post.publishedAt.toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})
							: "Not published"}
					</time>
				</div>
			</Link>
		</motion.li>
	);
}

/**
 * Blog List Page Component
 *
 * Main page component that orchestrates the blog list display.
 *
 * Layout Structure:
 * 1. Header: Navigation back home and title
 * 2. Pagination: Page controls (if more than 1 page)
 * 3. Post List: List of blog posts
 * 4. Footer: Total post count
 */
export default function BlogPage() {
	/** Current page number for pagination */
	const [currentPage, setCurrentPage] = useState(1);

	/** Fetch all blog posts using tRPC */
	const { data: allBlogPosts = [], isLoading } = api.posts.getAll.useQuery();

	/** Calculate pagination values */
	const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const currentPosts = allBlogPosts.slice(startIndex, endIndex);

	if (isLoading) {
		return (
			<main className="relative min-h-screen">
				<div className="mx-auto max-w-3xl px-4 py-12">
					<div className="flex items-center justify-center">
						<p className="text-gray-600">Loading ur mom...</p>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="relative min-h-screen">
			<div className="mx-auto max-w-3xl px-4 py-12">
				{/* Header */}
				<motion.header
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-10"
				>
					{/* Navigation */}
					<nav className="group mb-8">
						<Link
							href="/"
							className="inline-flex items-center gap-2 font-display text-gray-600 text-lg"
						>
							<span className="group-hover:-translate-x-1 flex items-center text-2xl transition-transform ">
								←
							</span>
							<span className="group-hover:underline">Back home</span>
						</Link>
					</nav>

					{/* Title section */}
					<div className="space-y-6 text-center">
						<div className="flex items-center justify-center gap-3 ">
							<Icons.WhiteDaisy className="h-7 w-auto opacity-70" />
							<Icons.WhiteDaisy className="h-9 w-auto" />
							<Icons.WhiteDaisy className="h-7 w-auto opacity-70" />
						</div>

						<h1 className="mt-0 mb-4 font-bold font-display text-5xl tracking-wide">
							My Journal
						</h1>
						<p className="mx-auto max-w-xl text-gray-600 text-xl leading-relaxed">
							A collection of my thoughts, discoveries, and reflections. I
							promise the garden puns end here.
						</p>

						{/* Pagination controls */}
						{totalPages > 1 && (
							<div className="flex items-center justify-center gap-4 pt-2 text-lg">
								{/* Previous button */}
								<button
									type="button"
									onClick={() => setCurrentPage(currentPage - 1)}
									disabled={currentPage === 1}
									className="text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-gray-400"
								>
									←
								</button>

								{/* Page indicator */}
								<span className="text-gray-500">
									Page {currentPage} of {totalPages}
								</span>

								{/* Next button */}
								<button
									type="button"
									onClick={() => setCurrentPage(currentPage + 1)}
									disabled={currentPage === totalPages}
									className="text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-gray-400"
								>
									→
								</button>
							</div>
						)}
					</div>
				</motion.header>

				{/* Blog posts list */}
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<ul className="md:px-6">
						{currentPosts.map((post, index) => (
							<BlogPostRow key={post.id} post={post} index={index} />
						))}
					</ul>
				</motion.section>

				{/* Footer */}
				<motion.footer
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="mt-12 space-y-3 text-center"
				>
					<div className="inline-flex items-center gap-3 text-gray-500">
						<div className="h-px w-12 bg-gray-300" />
						<div className="flex items-center gap-2">
							<Icons.WhiteDaisy className="h-5 w-5 opacity-60" />
							<span>{allBlogPosts.length} entries tended with care</span>
						</div>
						<div className="h-px w-12 bg-gray-300" />
					</div>
				</motion.footer>
			</div>
		</main>
	);
}
