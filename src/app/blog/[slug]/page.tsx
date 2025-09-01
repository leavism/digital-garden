"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Sample blog post data
const blogPost = {
	title: "Building My Digital Garden",
	date: "2024-03-15",
	slug: "building-my-digital-garden",
};

export default function BlogPostPage() {
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
							className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
						>
							<span>←</span>
							<span>All Entries</span>
						</Link>
					</div>
				</motion.nav>

				{/* Article */}
				<motion.article
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="prose prose-lg max-w-none"
				>
					{/* Header */}
					<header className="mb-12">
						<div className="mb-2 flex items-center justify-center gap-3">
							<h1 className="text-center">{blogPost.title}</h1>
						</div>

						{/* Meta information - removed read time */}
						<div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
							<time dateTime={blogPost.date}>
								{new Date(blogPost.date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
						</div>
					</header>
					{/* Content */}
					<div className="border-t border-gray-200 pt-12">
						<p className=" text-gray-700 ">
							When I first started thinking about building my own corner of the
							internet, I kept coming back to the metaphor of a garden. Unlike a
							polished portfolio or a formal blog, a digital garden is meant to
							be a living, breathing space where ideas can grow organically.
						</p>

						<h2>The Philosophy Behind Digital Gardens</h2>

						<p>
							Traditional blogs follow a chronological structure—newest posts at
							the top, older ones buried beneath. But thoughts don't work that
							way. Ideas evolve, connect, and branch out in unexpected
							directions. A digital garden embraces this organic growth.
						</p>

						<p>
							I wanted a space where I could plant seeds of ideas and watch them
							grow over time. Some thoughts might remain as small seedlings,
							while others could bloom into fully formed concepts. The beauty
							lies not in perfection, but in the process of nurturing and
							tending to these digital plants.
						</p>

						<blockquote>
							"A garden is a grand teacher. It teaches patience and careful
							watchfulness; it teaches industry and thrift; above all it teaches
							entire trust."
							<footer>— Gertrude Jekyll</footer>
						</blockquote>

						<h2>Choices</h2>

						<p>
							Building this garden required some thoughtful technology choices.
							I opted for a stack that prioritizes simplicity and growth:
						</p>

						<ul>
							<li>
								<strong>Next.js</strong> for the foundation—reliable and
								familiar
							</li>
							<li>
								<strong>Tailwind CSS</strong> for styling—utility-first and
								flexible
							</li>
							<li>
								<strong>Framer Motion</strong> for subtle animations—bringing
								life to static content
							</li>
							<li>
								<strong>TypeScript</strong> for type safety—because gardens need
								structure
							</li>
						</ul>

						<p>
							The design itself draws inspiration from actual gardens. The white
							daisy motif represents growth, new beginnings, and the simple
							beauty found in everyday moments. The dashed borders suggest the
							organic, hand-drawn quality of a gardener's sketch.
						</p>

						<h2>What Makes This Different</h2>

						<p>
							Unlike traditional blogs focused on polished, final thoughts, this
							garden celebrates the process of thinking itself. You might find:
						</p>

						<ul>
							<li>Half-formed ideas that are still growing</li>
							<li>Connections between seemingly unrelated concepts</li>
							<li>Updates to older thoughts as they evolve</li>
							<li>Experiments and failures alongside successes</li>
						</ul>

						<p>
							This approach removes the pressure of having everything figured
							out before sharing. Instead, it invites readers to join in the
							process of discovery and growth.
						</p>

						<h2>Tending to Growth</h2>

						<p>
							Like any garden, this space requires regular tending. I plan to
							revisit older posts, adding new insights and connections as they
							emerge. Some thoughts might get pruned, others might be
							transplanted to new contexts, and hopefully, many will flourish
							beyond their original form.
						</p>

						<p>
							The goal isn't to build an impressive monument to my thinking, but
							rather to create a nurturing environment where ideas—both mine and
							those sparked by conversation with visitors—can take root and
							grow.
						</p>

						<div className="mt-16 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
							<div className="flex items-center gap-3 mb-3">
								<Image
									src="/white-daisy.svg"
									alt="white daisy"
									width={24}
									height={24}
									className="h-6 w-6"
								/>
								<h3 className="font-semibold text-lg">A growing thought</h3>
							</div>
							<p className="text-gray-700 leading-relaxed">
								This post itself will likely evolve as I learn more about
								maintaining this digital garden. Check back occasionally—you
								might find new insights have bloomed since your last visit.
							</p>
						</div>
					</div>
				</motion.article>

				{/* Footer with back to top button */}
				<motion.footer
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="mt-16 border-t border-gray-200 pt-8"
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
		</main>
	);
}
