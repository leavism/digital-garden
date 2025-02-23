import { motion } from "framer-motion";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: "seedling" | "growing" | "bloomed"; // Plant growth stages
  category: string;
  readingTime: string;
}

const StatusIcon = ({ status }: { status: BlogPost["status"] }) => {
  const icons = {
    seedling: "🌱",
    growing: "🌿",
    evergreen: "🌲",
  };
  return <span>{icons[status]}</span>;
};

export function BlogPost({
  slug,
  title,
  description,
  date,
  status,
  category,
  readingTime,
}: BlogPost) {
  return (
    <article
      key={title}
      className="group relative rounded-lg border border-gray-100 p-5 transition-all hover:border-gray-200"
    >
      <div className="mb-2 flex items-center justify-between">
        <time className="text-xs text-gray-500">{date}</time>
        <StatusIcon status={status} />
      </div>
      <h2 className="mb-3 text-xl font-medium">{title}</h2>
      <p className="mb-3 text-sm text-gray-600">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{category}</span>
        <Link href={`/blog/${slug}`}>
          <motion.span
            className="text-sm text-gray-600"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Read more →
          </motion.span>
        </Link>
      </div>
    </article>
  );
}
