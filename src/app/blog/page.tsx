"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const allBlogPosts = [
	{
		id: 1,
		title: "Building My Digital Garden",
		date: "2024-03-15",
		slug: "building-my-digital-garden",
	},
	{
		id: 2,
		title: "The Art of Small Animations",
		date: "2024-03-10",
		slug: "art-of-small-animations",
	},
	{
		id: 3,
		title: "Learning TypeScript: A Journey",
		date: "2024-03-05",
		slug: "learning-typescript-journey",
	},
	{
		id: 4,
		title: "Why I Choose tRPC",
		date: "2024-02-28",
		slug: "why-i-choose-trpc",
	},
	{
		id: 5,
		title: "The Beauty of Minimalism in Code",
		date: "2024-02-20",
		slug: "beauty-of-minimalism-in-code",
	},
	{
		id: 6,
		title: "Embracing Async/Await",
		date: "2024-02-15",
		slug: "embracing-async-await",
	},
	{
		id: 7,
		title: "CSS Grid vs Flexbox",
		date: "2024-02-10",
		slug: "css-grid-vs-flexbox",
	},
	{
		id: 8,
		title: "The Joy of Side Projects",
		date: "2024-02-05",
		slug: "joy-of-side-projects",
	},
	{
		id: 9,
		title: "Split Keyboards and Productivity",
		date: "2024-01-30",
		slug: "split-keyboards-productivity",
	},
	{
		id: 10,
		title: "Debugging Like a Detective",
		date: "2024-01-25",
		slug: "debugging-like-detective",
	},
	{
		id: 11,
		title: "The Modern Blog Renaissance",
		date: "2024-01-20",
		slug: "modern-blog-renaissance",
	},
	{
		id: 12,
		title: "React Server Components Explained",
		date: "2024-01-15",
		slug: "react-server-components-explained",
	},
	{
		id: 13,
		title: "Building Accessible Interfaces",
		date: "2024-01-10",
		slug: "building-accessible-interfaces",
	},
	{
		id: 14,
		title: "The Evolution of JavaScript",
		date: "2024-01-05",
		slug: "evolution-of-javascript",
	},
	{
		id: 15,
		title: "Dark Mode: More Than Just Aesthetics",
		date: "2023-12-30",
		slug: "dark-mode-more-than-aesthetics",
	},
	{
		id: 16,
		title: "Git Workflows That Actually Work",
		date: "2023-12-25",
		slug: "git-workflows-that-work",
	},
	{
		id: 17,
		title: "Performance Optimization Strategies",
		date: "2023-12-20",
		slug: "performance-optimization-strategies",
	},
	{
		id: 18,
		title: "The Future of Web Development",
		date: "2023-12-15",
		slug: "future-of-web-development",
	},
	{
		id: 19,
		title: "Working with Design Systems",
		date: "2023-12-10",
		slug: "working-with-design-systems",
	},
	{
		id: 20,
		title: "API Design Principles",
		date: "2023-12-05",
		slug: "api-design-principles",
	},
	{
		id: 21,
		title: "Testing Strategies for Modern Apps",
		date: "2023-11-30",
		slug: "testing-strategies-modern-apps",
	},
	{
		id: 22,
		title: "Micro-Frontend Architecture",
		date: "2023-11-25",
		slug: "micro-frontend-architecture",
	},
	{
		id: 23,
		title: "The Art of Code Reviews",
		date: "2023-11-20",
		slug: "art-of-code-reviews",
	},
	{
		id: 24,
		title: "State Management in 2024",
		date: "2023-11-15",
		slug: "state-management-2024",
	},
	{
		id: 25,
		title: "Building Progressive Web Apps",
		date: "2023-11-10",
		slug: "building-progressive-web-apps",
	},
	{
		id: 26,
		title: "Database Design Best Practices",
		date: "2023-11-05",
		slug: "database-design-best-practices",
	},
	{
		id: 27,
		title: "DevOps for Frontend Developers",
		date: "2023-10-30",
		slug: "devops-for-frontend-developers",
	},
	{
		id: 28,
		title: "The Psychology of User Interfaces",
		date: "2023-10-25",
		slug: "psychology-of-user-interfaces",
	},
	{
		id: 29,
		title: "Security in Modern Web Apps",
		date: "2023-10-20",
		slug: "security-in-modern-web-apps",
	},
	{
		id: 30,
		title: "Building Real-time Applications",
		date: "2023-10-15",
		slug: "building-realtime-applications",
	},
	{
		id: 31,
		title: "The Power of Static Site Generation",
		date: "2023-10-10",
		slug: "power-of-static-site-generation",
	},
];
const POSTS_PER_PAGE = 25;

function BlogPostRow({
	post,
	index,
}: { post: (typeof allBlogPosts)[0]; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, delay: index * 0.02 }}
			className="group"
		>
			<Link href={`/blog/${post.slug}`}>
				<div className="flex items-center justify-between py-1 px-1 transition-all hover:translate-x-1 group">
					<h3 className="text-lg text-gray-600 group-hover:text-gray-800 group-hover:underline transition-all">
						{post.title}
					</h3>
					<time
						dateTime={post.date}
						className="text-lg text-gray-400 tracking-wide flex-shrink-0 ml-4 group-hover:text-gray-600 group"
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
					className="mb-10"
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
							<span>Back home</span>
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
							<h1 className="font-bold text-5xl mb-4 mt-0 text-gray-900">
								My Journal
							</h1>
							<p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
								A collection of my thoughts, discoveries, and reflections. I
								promise the garden puns end here.
							</p>
						</div>

						{/* Pagination controls */}
						{totalPages > 1 && (
							<div className="flex items-center justify-center gap-4 pt-2 text-lg">
								{/* Previous button */}
								<button
									onClick={() => setCurrentPage(currentPage - 1)}
									disabled={currentPage === 1}
									className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400"
								>
									←
								</button>

								{/* Page indicator */}
								<span className="text-gray-500">
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
					transition={{ delay: 0.2 }}
				>
					<div className="border-dashed border-gray-200 rounded-xl md:px-6">
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
							<span className="text-sm font-medium">
								{allBlogPosts.length} entries tended with care
							</span>
						</div>
						<div className="h-px w-12 bg-gray-300"></div>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
