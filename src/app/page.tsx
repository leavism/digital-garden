"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface navLinkProp {
	link: string;
	text: string;
}

function NavLink({ link, text, delay = 0 }: navLinkProp & { delay?: number }) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		// Cleanup
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<motion.div
			whileHover={{ x: 4 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			<Link
				href={link}
				target="_blank"
				className="group flex items-center gap-1 rounded-sm px-1 py-0.5 underline decoration-1 decoration-gray-300 underline-offset-4"
			>
				<motion.span
					animate={isMobile ? "bounce" : "none"}
					variants={{
						bounce: {
							y: [0, -4, 0],
							x: [0, 1, -1, 1, 0],
							rotate: [0, 2, -2, 2, 0],
							transition: {
								repeat: Number.POSITIVE_INFINITY,
								repeatDelay: 4,
								delay: delay,
								duration: 0.4,
							},
						},
						none: {
							y: 0,
							x: 0,
							rotate: 0,
						},
					}}
					className="text-base md:text-medium"
				>
					{text}
				</motion.span>
        <Image
          src="/arrow.svg"
          alt="arrow"
          width={12}
          height={12}
          className="opacity-50"
        />
			</Link>
		</motion.div>
	);
}

export default function Home() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center p-2">
			<div className="relative mx-auto max-w-[600px] rounded-xl md:border-2 md:border-dashed border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 md:p-10">
				<motion.div
					className="space-y-8 md:space-y-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<h1 className="font-bold text-3xl">
								Huy&apos;s Digital Garden
							</h1>
							<Image
								src="/white-daisy.svg"
								alt="white daisy"
								width={32}
								height={32}
								className="h-10 w-10 md:h-10 md:w-10"
							/>
						</div>
						<div className="space-y-3">
							<p className="font-medium text-lg tracking-wide">
								Welcome to my little garden on the Internet, where I grow my
								passion for software. As a new graduate, I&apos;m drawn to
								creating tools that allow us to bloom rather than limit how we
								express ourselves.
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-6 md:flex-row md:gap-10">
						<motion.div
							className="flex-1"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
						>
							<h2 className="mb-2 font-bold text-2xl ">Me</h2>
							<nav className="space-y-1 text-xl font-medium">
								<NavLink
									link="https://drive.google.com/file/d/14qQBXFCt9eyaV1efOz1oKi_WFg_Bx6UE/view?usp=drive_link"
									text="Resume"
									delay={1}
								/>
								<NavLink
									link="https://github.com/leavism"
									text="GitHub"
									delay={1.5}
								/>
								<NavLink
									link="https://www.linkedin.com/in/leavism/"
									text="LinkedIn"
									delay={2.0}
								/>
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

						<motion.div
							className="flex-1"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
						>
							<h2 className="mb-2 font-bold text-2xl ">My Garden</h2>
							<p className="text-base md:text-medium">Coming soon</p>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
