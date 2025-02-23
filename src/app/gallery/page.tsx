"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

// Interface for photo data
interface Photo {
  src: string;
  alt: string;
  date: string;
  location: string;
  story?: string;
  aspectRatio: number;
}

// Sample photo data
const photos: Photo[] = [
  {
    src: "/photos/1.jpeg",
    alt: "Huy on a rock",
    date: "November 2024",
    location: "San Jose, CA",
    story: "It's me on a rock. I swear it's a rock and not a hill.",
    aspectRatio: 9 / 16,
  },
  {
    src: "/photos/2.jpeg",
    alt: "Huy on a hill",
    date: "August 2024",
    location: "San Jose, CA",
    story: "It's me on a hill. I swear it's a hill and not a giant rock.",
    aspectRatio: 1 / 1,
  },
  {
    src: "/photos/3.jpeg",
    alt: "Huy's face",
    date: "February 2024",
    location: "San Francisco, CA",
    story: "😛",
    aspectRatio: 1 / 1,
  },
  {
    src: "/photos/4.jpeg",
    alt: "Huy's face again",
    date: "January 2024",
    location: "Lake Tahoe, NE",
    story: "Pure ecstasy at the lake.",
    aspectRatio: 4 / 5,
  },
  {
    src: "/photos/5.jpeg",
    alt: "Group graduation photo",
    date: "May 2024",
    location: "San Francisco, CA",
    story: "I did it!.",
    aspectRatio: 16 / 9,
  },
];

// Lightbox component
function Lightbox({
  photo,
  onClose,
}: {
  photo: Photo | null;
  onClose: () => void;
}) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/80 hover:text-white"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div
          className="relative max-h-[90vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1200}
              height={1200 / photo.aspectRatio}
              className="max-h-[90vh] w-auto"
              priority
            />
            <div className="mt-2 text-white/80">
              <div className="flex justify-between text-sm">
                <span>{photo.date}</span>
                <span>{photo.location}</span>
              </div>
              {photo.story && <p className="mt-1 text-sm">{photo.story}</p>}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Add back button above header
function BackButton() {
  return (
    <Link
      href="/"
      className="group mb-8 flex w-fit items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform group-hover:-translate-x-1"
      >
        <path
          d="M7.29289 3.29289C7.68342 2.90237 7.68342 2.26921 7.29289 1.87868C6.90237 1.48816 6.26921 1.48816 5.87868 1.87868L0.585786 7.17157C0.195262 7.5621 0.195262 8.19526 0.585786 8.58579L5.87868 13.8787C6.26921 14.2692 6.90237 14.2692 7.29289 13.8787C7.68342 13.4882 7.68342 12.8551 7.29289 12.4645L3.41421 8.58579C3.02369 8.19526 3.02369 7.5621 3.41421 7.17157L7.29289 3.29289Z"
          fill="currentColor"
        />
      </svg>
      Back to garden
    </Link>
  );
}

export default function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <main className="min-h-screen py-16 md:py-24">
      {/* Content */}
      <div className="mx-auto max-w-[960px] px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton />
        </motion.div>
        {/* Header */}
        <motion.div
          className="mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold md:text-2xl">Photo Garden</h1>
            <Image
              src="/white-daisy.svg"
              alt="white daisy"
              width={32}
              height={32}
              className="h-6 w-6 md:h-8 md:w-8"
            />
          </div>
          <p className="text-sm text-gray-600 md:text-base">
            A collection of moments I've captured, growing like wildflowers in
            my garden.
          </p>
        </motion.div>

        {/* Masonry Layout */}
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>*:not(:first-child)]:mt-4">
          {photos.map((photo, index) => (
            <motion.article
              key={photo.src}
              className="group break-inside-avoid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className="cursor-pointer overflow-hidden rounded-lg bg-gray-50"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={400 / photo.aspectRatio}
                    className="w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1 p-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{photo.date}</span>
                    <span>{photo.location}</span>
                  </div>
                  {photo.story && (
                    <p className="text-sm text-gray-600">{photo.story}</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {photos.length === 0 && (
          <motion.div
            className="flex flex-col items-center space-y-4 py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">No photos planted yet.</p>
            <span className="text-4xl">🌱</span>
          </motion.div>
        )}

        {/* Lightbox */}
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      </div>
    </main>
  );
}
