"use client";
import CanvasBackground from "@/app/_components/BackgroundEffect";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Plant icon components
const FlowerIcon = ({ className = "" }) => (
	<Image
		src="/flower-white.svg"
		alt="white daisy"
		width={32}
		height={32}
		className="h-5 w-5 md:h-5 md:w-5"
	/>
);

interface navLinkProp {
	link: string;
	text: string;
	icon: React.ReactNode;
}

function NavLink({
	link,
	text,
	icon,
	delay = 0,
}: navLinkProp & { delay?: number }) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 300, delay: delay }}
		>
			<Link
				href={link}
				target="_blank"
				className="group flex items-center gap-3 rounded-lg border-2 border-gray-200 border-dashed bg-white px-4 py-2 duration-200 hover:border-[#A8B331]"
			>
				<div className="text-gray-400 transition-colors duration-200 group-hover:text-[#777E21]">
					{icon}
				</div>
				<span className="font-medium text-base text-gray-800 group-hover:text-[#777E21]">
					{text}
				</span>
			</Link>
		</motion.div>
	);
}
export default function Home() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center p-2">
			<CanvasBackground />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="relative mx-auto max-w-[700px] rounded-xl border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 md:border-2 md:border-dashed md:p-10"
			>
				<motion.div className="space-y-6 md:space-y-8">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<h1 className="mt-0 text-3xl font-bold">
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
						<div>
							<p className="text-xl">
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
							transition={{ duration: 0.4, delay: 0.3 }}
						>
							<h2 className="text-2xl font-bold">Me</h2>
							<nav className="space-y-3">
								<NavLink
									link="https://drive.google.com/file/d/14qQBXFCt9eyaV1efOz1oKi_WFg_Bx6UE/view?usp=drive_link"
									text="Resume"
									delay={1}
									icon={<FlowerIcon />}
								/>
								<NavLink
									link="https://github.com/leavism"
									text="GitHub"
									delay={1.5}
									icon={<FlowerIcon />}
								/>
								<NavLink
									link="https://www.linkedin.com/in/leavism/"
									text="LinkedIn"
									delay={2.0}
									icon={<FlowerIcon />}
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
							transition={{ duration: 0.4, delay: 0.3 }}
						>
							<h2 className="text-2xl font-bold">My Garden</h2>
							<div className="rounded-lg border border-gray-300 border-dashed bg-gray-50 p-6 text-center">
								<div className="mb-4 flex justify-center">
									<Image
										src="/sapling.svg"
										alt="white daisy"
										width={30}
										height={30}
										className="h-8 w-8 opacity-70"
									/>
								</div>
								<p className="text-gray-600 text-xl">
									Seeds are being planted...
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
	);
}
