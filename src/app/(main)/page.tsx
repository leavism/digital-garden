"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface navLinkProp {
  link: string;
  text: string;
}

function NavLink({ link, text }: navLinkProp) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={link}
        target="_blank"
        className="group flex items-center justify-between"
      >
        <span className="md:text-medium text-base">{text}</span>
        <Image
          src="/arrow.svg"
          alt="arrow"
          width={12}
          height={12}
          className="opacity-30 transition-opacity group-hover:opacity-100"
        />
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="relative w-full max-w-[600px] px-6">
        <div className="absolute -inset-48">
          <div className="h-full w-full bg-radial-at-center from-white via-white/90 to-transparent" />
        </div>
        <div className="relative z-10">
          <motion.div
            className="space-y-8 md:space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold md:text-3xl">
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
              <div className="space-y-3 text-base">
                <p className="tracking-wide">
                  Welcome to my little garden on the Internet, where I grow my
                  passion for software. As a new graduate, I&apos;m drawn to
                  creating tools that allow us to bloom rather than limit how we
                  express ourselves.
                </p>
                <p className="font-base tracking-wide text-gray-600">
                  Currently seeking to plant my roots with a team that shares my
                  vision of thoughtful software.
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
                <h2 className="mb-2 text-xl font-bold md:text-2xl">Me</h2>
                <nav className="space-y-1">
                  <NavLink
                    link="https://drive.google.com/file/d/14qQBXFCt9eyaV1efOz1oKi_WFg_Bx6UE/view?usp=drive_link"
                    text="Resume"
                  />
                  <NavLink link="https://github.com/leavism" text="GitHub" />
                  <NavLink
                    link="https://www.linkedin.com/in/leavism/"
                    text="LinkedIn"
                  ></NavLink>
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
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                  My Garden
                </h2>
                <p className="md:text-medium text-base">Coming soon</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
