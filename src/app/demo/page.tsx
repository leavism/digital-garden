"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Sample blog posts data (expanded for pagination demo)
const allBlogPosts = [
	{
		id: 1,
		title: "Building My Digital Garden",
		excerpt:
			"Thoughts on creating a space where ideas can grow organically, much like tending to a garden. This is the story of how I built this little corner of the internet.",
		date: "2024-03-15",
		slug: "building-my-digital-garden",
	},
	{
		id: 2,
		title: "The Art of Small Animations",
		excerpt:
			"How subtle micro-interactions can breathe life into web interfaces. A deep dive into the psychology and implementation of delightful animations.",
		date: "2024-03-10",
		slug: "art-of-small-animations",
	},
	{
		id: 3,
		title: "Learning TypeScript: A Journey",
		excerpt:
			"My experience transitioning from JavaScript to TypeScript and why it changed how I think about code. From confusion to confidence.",
		date: "2024-03-05",
		slug: "learning-typescript-journey",
	},
	{
		id: 4,
		title: "Why I Choose tRPC",
		excerpt:
			"Exploring the benefits of end-to-end type safety and how tRPC has transformed my full-stack development workflow.",
		date: "2024-02-28",
		slug: "why-i-choose-trpc",
	},
	{
		id: 5,
		title: "The Beauty of Minimalism in Code",
		excerpt:
			"Sometimes less is more. Reflections on writing clean, simple code that does exactly what it needs to do—nothing more, nothing less.",
		date: "2024-02-20",
		slug: "beauty-of-minimalism-in-code",
	},
	{
		id: 6,
		title: "Embracing Async/Await",
		excerpt:
			"Moving beyond callback hell and promises to cleaner, more readable asynchronous JavaScript. A practical guide with real-world examples.",
		date: "2024-02-15",
		slug: "embracing-async-await",
	},
	{
		id: 7,
		title: "CSS Grid vs Flexbox",
		excerpt:
			"Understanding when to use Grid and when to use Flexbox. Two powerful layout systems that complement each other perfectly.",
		date: "2024-02-10",
		slug: "css-grid-vs-flexbox",
	},
	{
		id: 8,
		title: "The Joy of Side Projects",
		excerpt:
			"Why building things for fun is essential for growth as a developer. Lessons learned from countless nights of exploratory coding.",
		date: "2024-02-05",
		slug: "joy-of-side-projects",
	},
	{
		id: 9,
		title: "Spit keyboards",
		excerpt:
			"Why building things for fun is essential for growth as a developer. Lessons learned from countless nights of exploratory coding.",
		date: "2024-02-05",
		slug: "joy-of-side-projects",
	},
	{
		id: 10,
		title: "I actually don't like plants",
		excerpt:
			"Why building things for fun is essential for growth as a developer. Lessons learned from countless nights of exploratory coding.",
		date: "2024-02-05",
		slug: "joy-of-side-projects",
	},
	{
		id: 11,
		title: "What's a blog",
		excerpt:
			"Why building things for fun is essential for growth as a developer. Lessons learned from countless nights of exploratory coding.",
		date: "2024-02-05",
		slug: "joy-of-side-projects",
	},
];

const POSTS_PER_PAGE = 10;

function BlogPostRow({
	post,
	index,
}: { post: (typeof allBlogPosts)[0]; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.05 }}
			className="group"
		>
			<Link href={`/blog/${post.slug}`}>
				<div className="flex items-center justify-between py-1 px-1 transition-all hover:translate-x-1 group">
					<h3 className="font-medium text-gray-600 group-hover:text-gray-800 group-hover:underline transition-all">
						{post.title}
					</h3>
					<time
						dateTime={post.date}
						className="text-base text-gray-400 tracking-wide flex-shrink-0 ml-4 hover:text-gray-600"
					>
						{new Date(post.date).toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</time>
				</div>
			</Link>
		</motion.div>
	);
}

export default function BlogPage() {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const currentPosts = allBlogPosts.slice(startIndex, endIndex);

	return (
		<main className="relative min-h-screen">
			<div className="mx-auto max-w-3xl px-4 py-12">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-16"
				>
					{/* Navigation */}
					<div className="mb-8">
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
						>
							<span className="group-hover:-translate-x-1 transition-transform">
								←
							</span>
							<span>Back to garden</span>
						</Link>
					</div>

					{/* Title section */}
					<div className="text-center space-y-6">
						<div className="inline-flex items-center gap-4 justify-center">
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
							<h1 className="font-bold text-5xl mb-4 text-gray-900">
								Garden Journal
							</h1>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
								A living collection of thoughts, discoveries, and reflections.
								Watch ideas grow from seedlings to full bloom.
							</p>
						</div>

						{/* Pagination controls */}
						{totalPages > 1 && (
							<div className="flex items-center justify-center gap-4 pt-2">
								{/* Previous button */}
								<button
									onClick={() => setCurrentPage(currentPage - 1)}
									disabled={currentPage === 1}
									className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400"
								>
									←
								</button>

								{/* Page indicator */}
								<span className="text-sm text-gray-500">
									Page {currentPage} of {totalPages}
								</span>

								{/* Next button */}
								<button
									onClick={() => setCurrentPage(currentPage + 1)}
									disabled={currentPage === totalPages}
									className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400"
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
					transition={{ delay: 0.3 }}
				>
					<div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6 md:p-8">
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
					className="mt-12 text-center space-y-3"
				>
					{/* Total entries */}
					<div className="text-sm text-gray-500">
						{allBlogPosts.length} entries
					</div>

					<div className="inline-flex items-center gap-3 text-gray-500">
						<div className="h-px w-12 bg-gray-300"></div>
						<div className="flex items-center gap-2">
							<Image
								src="/white-daisy.svg"
								alt="white daisy"
								width={20}
								height={20}
								className="h-5 w-5 opacity-60"
							/>
							<span className="text-sm font-medium">Tended with care</span>
						</div>
						<div className="h-px w-12 bg-gray-300"></div>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
