"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const Letter = ({ position }: { position: { x: number; y: number } }) => {
  const [character, setCharacter] = useState("");
  const [color, setColor] = useState("text-gray-700");

  useEffect(() => {
    const letters: string[] = "huydigtalren".split("");
    let iterations = 0;

    const interval = setInterval(() => {
      if (iterations < 10) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        const randomLetter = letters[randomIndex] ?? "h";
        setCharacter(randomLetter);
        iterations++;
      } else {
        const colors = ["text-[#FFC502]", "text-[#A8B331]", "text-[#D9D9D9]"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setCharacter("*");
        setColor(randomColor ?? "text-gray-700");
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`absolute text-sm ${color}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {character}
    </motion.div>
  );
};

export default function Home() {
  const [letters, setLetters] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [_, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const spread = 100;
      const frequency = 0.2;
      const delay = 4000;

      if (Math.random() > frequency) {
        const newLetter = {
          id: Date.now(),
          x: e.clientX + (Math.random() - 0.5) * spread * 2,
          y: e.clientY + (Math.random() - 0.5) * spread * 2,
        };

        setLetters((prev) => [...prev, newLetter]);

        setTimeout(() => {
          setLetters((prev) =>
            prev.filter((letter) => letter.id !== newLetter.id),
          );
        }, delay);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0">
        {letters.map((letter) => (
          <Letter key={letter.id} position={{ x: letter.x, y: letter.y }} />
        ))}
      </div>
      <div className="relative p-20">
        <div className="absolute -inset-8 bg-[radial-gradient(circle,white_40%,rgba(255,255,255,0.8)_60%,transparent_100%)]" />
        <div className="relative text-center">
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
      </div>
    </main>
  );
}
