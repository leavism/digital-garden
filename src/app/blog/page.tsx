// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";

// // You could create an interface for blog posts
// interface BlogPost {
//   title: string;
//   description: string;
//   date: string;
//   status: "seedling" | "growing" | "bloomed"; // Plant growth stages
//   category: string;
// }

// // Sample blog posts
// const posts: BlogPost[] = [
//   {
//     title: "Setting Up a Modern React Project",
//     description:
//       "A guide to creating a React project with the latest best practices and tools.",
//     date: "2024-03-10",
//     status: "bloomed",
//     category: "Engineering",
//   },
//   {
//     title: "Thoughts on Human-Centered Design",
//     description: "Exploring the intersection of technology and human needs.",
//     date: "2024-03-05",
//     status: "growing",
//     category: "Design",
//   },
//   {
//     title: "Learning in Public",
//     description:
//       "Initial thoughts on sharing knowledge and growing in the open.",
//     date: "2024-03-01",
//     status: "seedling",
//     category: "Personal",
//   },
// ];

// // Status icon component
// const StatusIcon = ({ status }: { status: BlogPost["status"] }) => {
//   const iconMap = {
//     seedling: "🌱",
//     growing: "🌿",
//     bloomed: "🌸",
//   };
//   return <span className="text-sm">{iconMap[status]}</span>;
// };

// export default function Blog() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center">
//       <div className="bg-radial-at-center from-white via-white/90 to-white/10 p-48">
//         <div>
//           <motion.div
//             className="mb-12 text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <Link
//               href="/"
//               className="mb-2 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
//             >
//               ← Back to garden
//             </Link>
//             <h1 className="mt-6 text-2xl font-semibold">Growing Thoughts</h1>
//             <p className="mt-2 text-sm text-gray-600">
//               Ideas and explorations, at various stages of growth
//             </p>
//           </motion.div>

//           {/* Blog posts grid */}
//           <motion.div
//             className="grid max-w-[720px] gap-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//           >
//             {posts.map((post) => (
//               <article
//                 key={post.title}
//                 className="group relative rounded-lg border border-gray-100 p-6 transition-all hover:border-gray-200"
//               >
//                 <div className="mb-4 flex items-center justify-between">
//                   <span className="text-xs text-gray-500">{post.category}</span>
//                   <StatusIcon status={post.status} />
//                 </div>
//                 <h2 className="mb-2 text-lg font-medium">{post.title}</h2>
//                 <p className="mb-4 text-sm text-gray-600">{post.description}</p>
//                 <div className="flex items-center justify-between">
//                   <time className="text-xs text-gray-500">{post.date}</time>
//                   <motion.span
//                     className="text-sm text-gray-600"
//                     whileHover={{ x: 5 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     Read more →
//                   </motion.span>
//                 </div>
//               </article>
//             ))}
//           </motion.div>

//           {/* Categories or filters (optional) */}
//           <motion.div
//             className="mt-12 flex justify-center gap-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <button className="text-sm text-gray-500 hover:text-gray-900">
//               All Posts
//             </button>
//             <button className="text-sm text-gray-500 hover:text-gray-900">
//               🌱 Seedlings
//             </button>
//             <button className="text-sm text-gray-500 hover:text-gray-900">
//               🌿 Growing
//             </button>
//             <button className="text-sm text-gray-500 hover:text-gray-900">
//               🌸 Bloomed
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  summary: string;
  date: string;
  readTime: string;
  growthStage: "seed" | "sprout" | "garden"; // Different stages of writing/thinking
  slug: string;
}

const posts: BlogPost[] = [
  {
    title: "The Case for Type Safety",
    summary:
      "Exploring how TypeScript's type system can prevent bugs before they happen.",
    date: "Mar 15, 2024",
    readTime: "5 min",
    growthStage: "seed",
    slug: "type-safety",
  },
  {
    title: "Corne Ortholinear Split Keyboard",
    summary: "I took a dive on the deep end and built myself a corne keyboard.",
    date: "Mar 15, 2024",
    readTime: "5 min",
    growthStage: "garden",
    slug: "corne",
  },
  {
    title: "The Sun and Me",
    summary:
      "I know the solution to depression isn't going on a walk, but getting out simply helpful.",
    date: "Mar 15, 2024",
    readTime: "5 min",
    growthStage: "sprout",
    slug: "sun",
  },
];

export default function Blog() {
  return (
    <main className="relative min-h-screen py-16">
      <div className="fixed inset-0">
        <div className="h-full w-full bg-radial-at-center from-white via-white/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        {/* Navigation */}
        <nav className="mb-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            back to garden
          </Link>
        </nav>
        {/* Header */}
        <header className="mb-12 border-b pb-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h1 className="text-2xl font-medium">Growing Notes</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-xs">sorted by growth</span>
              <button className="hover:text-gray-900">↓</button>
            </div>
          </div>
          <p className="text-gray-600">
            Thoughts and explorations on software, design, and learning. Some
            are seeds, others are sprouting, a few have bloomed.
          </p>
        </header>
        {/* Posts */}
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block"
            >
              <article className="flex items-center gap-4 rounded-lg border border-transparent py-3 pl-2 pr-4 transition-all hover:border-gray-100 hover:bg-gray-50">
                {/* Growth stage indicator */}
                <div className="text-sm text-gray-400">
                  {post.growthStage === "seed" && "🌱"}
                  {post.growthStage === "sprout" && "🌿"}
                  {post.growthStage === "garden" && "🌸"}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-baseline justify-between gap-4">
                    <h2 className="truncate text-lg font-medium group-hover:text-gray-900">
                      {post.title}
                    </h2>
                    <time className="shrink-0 text-sm text-gray-400">
                      {post.date}
                    </time>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {post.summary}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        {/* Empty state */}
        {posts.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-gray-500">Planting seeds...</p>
          </div>
        )}
      </div>
    </main>
  );
}
