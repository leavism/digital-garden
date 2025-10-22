"use client";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const POSTS_PER_PAGE = 25;

type BlogPost = {
	id: string;
	title: string;
	slug: string;
	publishedAt: Date | null;
	author: { name: string | null; image: string | null } | null;
};

function BlogPostRow({ post, index }: { post: BlogPost; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, delay: index * 0.02 }}
			className="group"
		>
			<Link href={`/blog/${post.slug}`}>
				<div className="group flex items-center justify-between px-1 py-1 transition-all hover:translate-x-1">
					<h3 className="text-gray-600 text-lg transition-all group-hover:text-gray-800 group-hover:underline">
						{post.title}
					</h3>
					<time
						dateTime={post.publishedAt?.toISOString()}
						className="group ml-4 flex-shrink-0 text-gray-400 text-lg tracking-wide group-hover:text-gray-600"
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
		</motion.div>
	);
}

export default function BlogPage() {
	const [currentPage, setCurrentPage] = useState(1);

	const { data: allBlogPosts = [], isLoading } = api.posts.getAll.useQuery();

	const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const currentPosts = allBlogPosts.slice(startIndex, endIndex);

	if (isLoading) {
		return (
			<main className="relative min-h-screen">
				<div className="mx-auto max-w-3xl px-4 py-12">
					<div className="flex items-center justify-center">
						<p className="text-gray-600">Loading posts...</p>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="relative min-h-screen">
			<div className="mx-auto max-w-3xl px-4 py-12">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-10"
				>
					{/* Navigation */}
					<div className="mb-8">
						<Link
							href="/"
							className="group inline-flex items-center gap-2 font-display text-gray-600 text-lg transition-colors hover:text-gray-900"
						>
							<span className="group-hover:-translate-x-1 transition-transform ">
								←
							</span>
							<span>Back home</span>
						</Link>
					</div>

					{/* Title section */}
					<div className="space-y-6 text-center">
						<div className="inline-flex items-center justify-center gap-4">
							<div className="flex items-center gap-1">
								<Image
									src="/white-daisy.svg"
									alt="white daisy"
									width={24}
									height={24}
									className="h-6 w-6 opacity-70"
								/>
								<Image
									src="/white-daisy.svg"
									alt="white daisy"
									width={32}
									height={32}
									className="h-8 w-8"
								/>
								<Image
									src="/white-daisy.svg"
									alt="white daisy"
									width={24}
									height={24}
									className="h-6 w-6 opacity-70"
								/>
							</div>
						</div>

						<div>
							<h1 className="mt-0 mb-4 font-bold font-display text-5xl tracking-wide">
								My Journal
							</h1>
							<p className="mx-auto max-w-xl text-gray-600 text-xl leading-relaxed">
								A collection of my thoughts, discoveries, and reflections. I
								promise the garden puns end here.
							</p>
						</div>

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
				</motion.div>

				{/* Blog posts list */}
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<div className="rounded-xl border-gray-200 border-dashed md:px-6">
						{currentPosts.map((post, index) => (
							<BlogPostRow key={post.id} post={post} index={index} />
						))}
					</div>
				</motion.section>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="mt-12 space-y-3 text-center"
				>
					<div className="inline-flex items-center gap-3 text-gray-500">
						<div className="h-px w-12 bg-gray-300" />
						<div className="flex items-center gap-2">
							<Image
								src="/white-daisy.svg"
								alt="white daisy"
								width={20}
								height={20}
								className="h-5 w-5 opacity-60"
							/>
							<span className="font-medium text-sm">
								{allBlogPosts.length} entries tended with care
							</span>
						</div>
						<div className="h-px w-12 bg-gray-300" />
					</div>
				</motion.div>
			</div>
		</main>
	);
}
