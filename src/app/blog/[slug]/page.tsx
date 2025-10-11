"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Callout } from "@/app/_components/Callout";

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
					<div className="border-t border-gray-200 pt-12">
						<p>
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

						{/* Callout Examples */}
						<Callout variant="info" title="Pro Tip">
							<p>
								Start small with your digital garden. Plant one idea at a time
								and let it grow naturally.
							</p>
						</Callout>

						<Callout variant="warning" title="Important Note">
							<p>
								Don't over-animate! Subtle movements are more effective than
								flashy transitions.
							</p>
						</Callout>

						<Callout variant="success" title="Success!">
							<p>
								The garden is now live and growing. Each post is a new seed
								planted in this digital soil.
							</p>
						</Callout>
						<p className="text-gray-700">
							I wanted a space where I could plant seeds of ideas and watch them
							grow over time. Some thoughts might remain as small seedlings,
							while others could bloom into fully formed concepts. The beauty
							lies not in perfection, but in the process of nurturing and
							tending to these digital plants.
						</p>

						<h2>Technical Implementation</h2>

						<p className="text-gray-700">
							Building this garden required some thoughtful technical decisions.
							I chose Next.js for its flexibility and used{" "}
							<code className="bg-gray-100 text-gray-800 px-1 py-2 rounded text-base font-mono">
								framer-motion
							</code>{" "}
							for subtle animations that bring the interface to life.
						</p>

						{/* Code Block */}
						<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-6 overflow-x-auto">
							<pre className="text-sm text-gray-800 font-mono leading-relaxed">
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

						<h2>Performance Metrics</h2>

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
						<div className="overflow-x-auto my-6">
							<table className="min-w-full border border-gray-200 rounded-lg">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-4 py-3 text-left font-bold text-gray-600 border-b border-gray-200">
											Metric
										</th>
										<th className="px-4 py-3 text-left font-bold text-gray-600 border-b border-gray-200">
											Desktop
										</th>
										<th className="px-4 py-3 text-left font-bold text-gray-600 border-b border-gray-200">
											Mobile
										</th>
										<th className="px-4 py-3 text-left font-bold text-gray-600 border-b border-gray-200">
											Status
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									<tr className="hover:bg-gray-50">
										<td className="px-4 py-3 text-gray-700">
											First Contentful Paint
										</td>
										<td className="px-4 py-3 text-gray-700">1.2s</td>
										<td className="px-4 py-3 text-gray-700">1.8s</td>
										<td className="px-4 py-3">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-[#f5fcf2] text-[#7d8f78] border-[#7d8f78] border-1 border-dashed">
												Good
											</span>
										</td>
									</tr>
									<tr className="hover:bg-gray-50">
										<td className="px-4 py-3 text-gray-700">
											Largest Contentful Paint
										</td>
										<td className="px-4 py-3 text-gray-700">2.1s</td>
										<td className="px-4 py-3 text-gray-700">2.7s</td>
										<td className="px-4 py-3">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-[#f5fcf2] text-[#7d8f78] border-[#7d8f78] border-1 border-dashed">
												Good
											</span>
										</td>
									</tr>
									<tr className="hover:bg-gray-50">
										<td className="px-4 py-3 text-gray-700">
											Cumulative Layout Shift
										</td>
										<td className="px-4 py-3 text-gray-700">0.05</td>
										<td className="px-4 py-3 text-gray-700">0.08</td>
										<td className="px-4 py-3">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-600 border-yellow-600 border-1 border-dashed">
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

						<h2>Useful Resources</h2>

						<p>Here are some resources that helped me along the way:</p>

						<ul>
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
							<li>
								<a href="https://www.framer.com/motion/">Framer Motion </a> -
								Animation library for React
							</li>
						</ul>

						<blockquote>
							A garden is a grand teacher. It teaches patience and careful
							watchfulness; it teaches industry and thrift; above all it teaches
							entire trust.
							<footer>— Gertrude Jekyll</footer>
						</blockquote>

						<h2>What's Next?</h2>

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
						<div id="footnotes" className="mt-12 pt-6 border-t border-gray-200">
							<h3 className="text-lg font-medium mb-4">Notes</h3>
							<div className="space-y-4 text-base">
								<div id="footnote-1">
									<a href="#footnote-ref-1">
										<span className="font-medium min-w-[1.5rem] pr-6">1.</span>
										<span>
											Animation should enhance the user experience, not distract
											from it. I learned this the hard way after initially
											over-animating everything.
										</span>
									</a>
								</div>
								<div id="footnote-2">
									<a href="#footnote-ref-2">
										<span className="font-medium min-w-[1.5rem] pr-6">2.</span>
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
