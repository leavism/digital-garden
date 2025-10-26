"use client";
import CanvasBackground from "@/app/_components/BackgroundEffect";
import { Icons } from "@/app/_components/icons";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface navLinkProps {
	link: string;
	text: string;
	icon: React.ReactNode;
	target?: string;
}

function NavLink({
	link,
	text,
	icon,
	target,
	delay = 0,
}: navLinkProps & { delay?: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: delay }}
			className="group"
		>
			<Link
				href={link}
				target={target}
				className="relative block rounded-lg border-2 border-gray-200 border-dashed bg-white p-3 transition-all duration-300 hover:bg-garden-primary/5 hover:shadow-[0px_0px_8px_2px_#f8f9ea] group-hover:border-garden-primary"
			>
				<div className="relative flex items-start gap-4">
					<motion.div
						whileHover={{ scale: 1.1, rotate: 5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						{icon}
					</motion.div>

					{/* Text content */}
					<div className="min-w-0 flex-1">
						<h3 className="font-semibold transition-colors duration-300 group-hover:text-garden-primary">
							{text}
						</h3>
					</div>

					<motion.div
						className="text-gray-200 transition-colors duration-300 group-hover:text-garden-primary"
						initial={{ x: 0 }}
						whileHover={{ x: 3 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<ArrowUpRight />
					</motion.div>
				</div>
			</Link>
		</motion.div>
	);
}

// Navigation data
const navigationLinks = [
	{
		link: "/blog",
		text: "Blog",
		icon: <Icons.WhiteDaisyCorolla className="h-5 w-auto" />,
		delay: 0.5,
	},
	{
		link: "https://github.com/leavism",
		text: "GitHub",
		icon: <Icons.WhiteDaisyCorolla className="h-5 w-auto" />,
		target: "_blank",
		delay: 0.7,
	},
	{
		link: "https://www.linkedin.com/in/leavism/",
		text: "LinkedIn",
		icon: <Icons.WhiteDaisyCorolla className="h-5 w-auto" />,
		target: "_blank",
		delay: 0.9,
	},
];

export default function Home() {
	return (
		<>
			<CanvasBackground />

			<main className="relative flex min-h-screen flex-col items-center justify-center p-2">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="relative mx-auto max-w-[700px] rounded-xl border-gray-200 bg-white p-4 shadow-gray-100 transition-colors hover:border-gray-300 hover:shadow-[0px_0px_10px_1px] md:border-2 md:border-dashed md:p-10"
				>
					<motion.div className="space-y-6 md:space-y-8">
						{/* Main Content */}
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<h1 className="mt-0 font-bold font-display text-3xl tracking-wide">
									Huy&apos;s Digital Garden
								</h1>
								<Icons.WhiteDaisy className="h-10 w-auto" />
							</div>
							<div>
								<p className="text-xl">
									Welcome to my little garden on the Internet, where I grow my
									passion for software. I'm a new graduate building things,
									learning in public, and figuring it out as I go.
								</p>
							</div>
						</div>

						{/* Link Menu and My Garden */}
						<div className="flex flex-col gap-6 md:flex-row md:gap-10">
							{/* Link menu */}
							<motion.div
								className="flex-1"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.3 }}
							>
								<h2 className="mb-2 font-bold font-display text-2xl tracking-wide">
									Me
								</h2>
								<nav className="space-y-3">
									{navigationLinks.map((navItem) => (
										<NavLink
											key={navItem.text}
											link={navItem.link}
											text={navItem.text}
											icon={navItem.icon}
											target={navItem.target}
											delay={navItem.delay}
										/>
									))}
								</nav>
							</motion.div>

							{/* Vertical Divider - visible on md and up */}
							<motion.div
								className="hidden w-[1px] self-stretch bg-gray-200 md:block"
								initial={{ scaleY: 0 }}
								animate={{ scaleY: 1 }}
								transition={{ delay: 0.4 }}
							/>

							{/* Horizontal Divider - visible on mobile */}
							<motion.div
								className="h-[1px] w-full bg-gray-200 md:hidden"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ delay: 0.4 }}
							/>

							{/* My Garden Section */}
							<motion.div
								className="flex-1"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.3 }}
							>
								<h2 className="mb-2 font-bold font-display text-2xl tracking-wide">
									My Garden
								</h2>
								<div className="rounded-lg border border-gray-300 border-dashed bg-gray-50 py-9 text-center">
									<div className="mb-4 flex justify-center">
										<motion.div
											whileHover={{ scale: 1.2, rotate: -5 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<Icons.Sapling className="h-8 w-auto" />
										</motion.div>
									</div>
									<p className="text-gray-600 text-xl">
										Seeds are being planted
									</p>
									<p className="mt-1 text-base text-gray-500">
										Check back to see what grows
									</p>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</main>
		</>
	);
}
