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
							className="group inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
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
					className="prose prose-lg max-w-none"
				>
					{/* Header */}
					<header className="mb-12">
						<div className="mb-2 flex items-center justify-center gap-3">
							<h1 className="text-center">{blogPost.title}</h1>
						</div>

						{/* Meta information */}
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
					<div className="space-y-8 border-gray-200 border-t pt-12">
						<p>
							When I first started thinking about building my own corner of the
							internet, I kept coming back to the metaphor of a garden. Unlike a
							polished portfolio or a formal blog, a digital garden is meant to
							be a living, breathing space where ideas can grow organically.
						</p>

						<h2 className="mt-8 mb-4 font-bold text-2xl text-gray-900">
							The Philosophy Behind Digital Gardens
						</h2>

						<p>
							Traditional blogs follow a chronological structure—newest posts at
							the top, older ones buried beneath. But thoughts don't work that
							way. Ideas evolve, connect, and branch out in unexpected
							directions. A digital garden embraces this organic growth.
						</p>

						{/* Callout Examples */}
						{/* Pro Tip Callout */}
						<div
							className="mt-6 rounded-lg border-2 border-dashed p-6"
							style={{
								backgroundColor: "#e6eef2",
								borderColor: "#445f75",
							}}
						>
							<div className="mb-3 flex items-center gap-3">
								<svg
									className="h-6 w-6"
									style={{ color: "#445f75" }}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"
									/>
								</svg>
								<h3
									className="font-semibold text-lg"
									style={{ color: "#445f75" }}
								>
									Pro Tip
								</h3>
							</div>
							<p className="leading-relaxed" style={{ color: "#445f75" }}>
								Start small with your digital garden. Plant one idea at a time
								and let it grow naturally.
							</p>
						</div>

						{/* Warning Callout */}
						<div
							className="mt-6 rounded-lg border-2 border-dashed p-6"
							style={{
								// backgroundColor: "#fefefe",
								// borderColor: "#b2c9ab",
								backgroundColor: "#fcf2f2",
								borderColor: "#a3766a",
							}}
						>
							<div className="mb-3 flex items-center gap-3">
								<svg
									className="h-6 w-6"
									style={{ color: "#a3766a" }}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
								<h3
									className="font-semibold text-lg"
									style={{ color: "#a3766a" }}
								>
									Important Note
								</h3>
							</div>
							<p className="leading-relaxed" style={{ color: "#916559" }}>
								Don't over-animate! Subtle movements are more effective than
								flashy transitions.
							</p>
						</div>

						{/* Success Callout */}
						<div
							className="mt-6 rounded-lg border-2 border-dashed p-6"
							style={{
								// backgroundColor: "#fcfcf8",
								// borderColor: "#e8ddb5",
								backgroundColor: "#f5fcf2",
								borderColor: "#b2c9ab",
							}}
						>
							<div className="mb-3 flex items-center gap-3">
								<svg
									className="h-6 w-6"
									style={{ color: "#7d8f78" }}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<h3
									className="font-semibold text-lg"
									style={{ color: "#7d8f78" }}
								>
									Success!
								</h3>
							</div>
							<p className="leading-relaxed" style={{ color: "#7d8f78" }}>
								The garden is now live and growing. Each post is a new seed
								planted in this digital soil.
							</p>
						</div>
						<p className="text-gray-700">
							I wanted a space where I could plant seeds of ideas and watch them
							grow over time. Some thoughts might remain as small seedlings,
							while others could bloom into fully formed concepts. The beauty
							lies not in perfection, but in the process of nurturing and
							tending to these digital plants.
						</p>

						<h2 className="mt-8 mb-4 font-bold text-2xl text-gray-900">
							Technical Implementation
						</h2>

						<p className="text-gray-700">
							Building this garden required some thoughtful technical decisions.
							I chose Next.js for its flexibility and used{" "}
							<code className="rounded bg-gray-100 px-1 py-2 font-mono text-base text-gray-800">
								framer-motion
							</code>{" "}
							for subtle animations that bring the interface to life.
						</p>

						{/* Code Block Example */}
						<div className="my-6 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
							<pre className="font-mono text-gray-800 text-sm leading-relaxed">
								{`// Creating smooth page transitions
export default function BlogPost() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Content goes here */}
    </motion.article>
  );
}`}
							</pre>
						</div>

						<p>
							The key was finding the right balance between functionality and
							aesthetics. Every animation serves a purpose—guiding the eye,
							providing feedback, or simply adding a touch of delight to the
							experience
							<sup>
								<a id="footnote-ref-1" href="#footnote-1">
									[1]
								</a>
							</sup>
							.
						</p>

						<h2 className="mt-8 mb-4 font-bold text-2xl text-gray-900">
							Performance Metrics
						</h2>

						<p>
							Here's how the garden performs across different metrics. These
							numbers reflect the importance of keeping things simple and
							focused
							<sup>
								<a id="footnote-ref-2" href="#footnote-2">
									[2]
								</a>
							</sup>
							:
						</p>

						{/* Table Example */}
						<div className="my-6 overflow-x-auto">
							<table className="min-w-full rounded-lg border border-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="border-gray-200 border-b px-4 py-3 text-left font-medium text-gray-600 text-sm">
											Metric
										</th>
										<th className="border-gray-200 border-b px-4 py-3 text-left font-medium text-gray-600 text-sm">
											Desktop
										</th>
										<th className="border-gray-200 border-b px-4 py-3 text-left font-medium text-gray-600 text-sm">
											Mobile
										</th>
										<th className="border-gray-200 border-b px-4 py-3 text-left font-medium text-gray-600 text-sm">
											Status
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									<tr className="hover:bg-gray-50">
										<td className="px-4 py-3 text-gray-700 text-sm">
											First Contentful Paint
										</td>
										<td className="px-4 py-3 text-gray-700 text-sm">1.2s</td>
										<td className="px-4 py-3 text-gray-700 text-sm">1.8s</td>
										<td className="px-4 py-3">
											<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800 text-xs">
												Good
											</span>
										</td>
									</tr>
									<tr className="hover:bg-gray-50">
										<td className="px-4 py-3 text-gray-700 text-sm">
											Largest Contentful Paint
										</td>
										<td className="px-4 py-3 text-gray-700 text-sm">2.1s</td>
										<td className="px-4 py-3 text-gray-700 text-sm">2.7s</td>
										<td className="px-4 py-3">
											<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800 text-xs">
												Good
											</span>
										</td>
									</tr>
									<tr className="hover:bg-gray-50">
										<td className="px-4 py-3 text-gray-700 text-sm">
											Cumulative Layout Shift
										</td>
										<td className="px-4 py-3 text-gray-700 text-sm">0.05</td>
										<td className="px-4 py-3 text-gray-700 text-sm">0.08</td>
										<td className="px-4 py-3">
											<span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 font-medium text-xs text-yellow-800">
												Needs work
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<p>
							As you can see, there's always room for improvement. The mobile
							experience, in particular, could benefit from some optimization
							work.
						</p>

						<h2 className="mt-8 mb-4 font-bold text-2xl text-gray-900">
							Useful Resources
						</h2>

						<p>Here are some resources that helped me along the way:</p>

						<ul className="my-4 space-y-2">
							<li>
								<a href="https://maggieappleton.com/garden-history">
									The History of Digital Gardens
								</a>{" "}
								- A comprehensive look at the concept
							</li>
							<li>
								<a href="https://nextjs.org/docs">Next.js Documentation</a> -
								Everything you need to know about the framework
							</li>
							<li className="text-gray-700">
								<a
									href="https://www.framer.com/motion/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Framer Motion{" "}
									<svg
										className="ml-1 inline h-3 w-3"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
										<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z"></path>
									</svg>
								</a>{" "}
								- Animation library for React
							</li>
						</ul>

						<blockquote className="my-8 border-gray-200 border-l-4 pl-4 text-gray-600 italic">
							"A garden is a grand teacher. It teaches patience and careful
							watchfulness; it teaches industry and thrift; above all it teaches
							entire trust."
							<footer className="mt-2 text-gray-500 text-sm not-italic">
								— Gertrude Jekyll
							</footer>
						</blockquote>

						<h2 className="mt-8 mb-4 font-bold text-2xl text-gray-900">
							What's Next?
						</h2>

						<p>
							The garden is just getting started. I plan to add more interactive
							elements, improve the search functionality, and maybe even add a
							way for visitors to leave their own seeds of thoughts. The key is
							to keep it simple and let it grow organically.
						</p>

						<p>
							If you're thinking about starting your own digital garden, I
							encourage you to begin today. Plant that first seed—it doesn't
							have to be perfect. Gardens are meant to evolve, and so should
							your digital space.
						</p>

						{/* Footnotes */}
						<div id="footnotes" className="mt-12 border-gray-200 border-t pt-6">
							<h3 className="mb-4 font-medium text-lg">Notes</h3>
							<div className="space-y-4 text-base">
								<div id="footnote-1">
									<a href="#footnote-ref-1">
										<span className="min-w-[1.5rem] pr-6 font-medium">1.</span>
										<span>
											Animation should enhance the user experience, not distract
											from it. I learned this the hard way after initially
											over-animating everything.
										</span>
									</a>
								</div>
								<div id="footnote-2">
									<a href="#footnote-ref-2">
										<span className="min-w-[1.5rem] pr-6 font-medium">2.</span>
										<span>
											These metrics were measured using Lighthouse on a M1
											MacBook Pro and iPhone 13. Your mileage may vary depending
											on network conditions and device performance.
										</span>
									</a>
								</div>
							</div>
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
