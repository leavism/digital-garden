"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <motion.div
        className="group"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-radial-at-center from-white via-white/95 to-white/10 p-24">
          <motion.div
            className="mb-6 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-xl font-semibold">Huy&apos;s Digital Garden</h1>
            <Image
              src="/white-daisy.svg"
              width={16}
              height={16}
              alt="A white daisy."
            />
          </motion.div>
          <motion.div
            className="max-w-[380px] space-y-1 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-gray-600">A garden is growing here.</p>
            <p className="text-sm text-gray-500">Please check back soon.</p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
