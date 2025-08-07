"use client";

import type React from "react";

import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Sample hardcoded posts for admin
const sampleAdminPosts = [
	{
		id: "1",
		title: "Building in Public: My First Open Source Contribution",
		slug: "building-in-public-first-open-source",
		excerpt:
			"Reflecting on the journey of making my first meaningful contribution to an open source project and what I learned along the way.",
		published: true,
		publishedAt: "2024-01-15",
		createdAt: "2024-01-14",
		content: "Full content here...",
	},
	{
		id: "2",
		title: "The Art of Digital Minimalism in Web Design",
		slug: "digital-minimalism-web-design",
		excerpt:
			"How embracing simplicity and intentional design choices can create more meaningful user experiences.",
		published: true,
		publishedAt: "2024-01-10",
		createdAt: "2024-01-09",
		content: "Full content here...",
	},
	{
		id: "3",
		title: "Draft: Thoughts on Developer Productivity",
		slug: "thoughts-on-developer-productivity",
		excerpt:
			"Exploring what actually makes developers productive vs what we think makes us productive.",
		published: false,
		publishedAt: null,
		createdAt: "2024-01-12",
		content: "This is still a work in progress...",
	},
	{
		id: "4",
		title: "Learning in the Open: My Developer Journey",
		slug: "learning-in-the-open-developer-journey",
		excerpt:
			"Thoughts on sharing the learning process, embracing vulnerability, and growing alongside a community.",
		published: true,
		publishedAt: "2024-01-05",
		createdAt: "2024-01-04",
		content: "Full content here...",
	},
];

export default function AdminPage() {
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [posts, setPosts] = useState(sampleAdminPosts);

	return (
		<main className="relative flex min-h-screen flex-col items-center justify-start p-2 pt-20">
			<div className="relative mx-auto w-full max-w-6xl space-y-8">
				{/* Header */}
				<div className="text-center space-y-4">
					<div className="flex items-center justify-center gap-3">
						<h1 className="font-bold text-4xl">Garden Keeper</h1>
						<Image
							src="/white-daisy.svg"
							alt="white daisy"
							width={32}
							height={32}
							className="h-10 w-10"
						/>
					</div>
					<p className="text-gray-600 text-lg max-w-2xl mx-auto">
						Tend to your digital garden. Plant new thoughts, nurture existing
						ones.
					</p>
				</div>

				{/* Navigation */}
				<div className="flex justify-between items-center">
					<Link
						href="/"
						className="group flex items-center gap-2 rounded-sm px-3 py-2 underline decoration-1 decoration-gray-300 underline-offset-4 hover:decoration-gray-500 transition-colors"
					>
						<span>← Back to Garden</span>
					</Link>

					<div className="flex gap-3">
						<Link
							href="/blog"
							className="group flex items-center gap-2 rounded-sm px-3 py-2 underline decoration-1 decoration-gray-300 underline-offset-4 hover:decoration-gray-500 transition-colors"
						>
							<span>View Blog</span>
						</Link>

						<Button
							onClick={() => setShowCreateForm(!showCreateForm)}
							className="font-sans"
						>
							{showCreateForm ? "Cancel" : "Plant New Thought"}
						</Button>
					</div>
				</div>

				{/* Create Form */}
				{showCreateForm && (
					<CreatePostForm
						onSuccess={() => {
							setShowCreateForm(false);
							// In real app, would refetch posts
						}}
						onCancel={() => setShowCreateForm(false)}
					/>
				)}

				{/* Stats Cards */}
				<div className="grid gap-4 md:grid-cols-3">
					<div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-6 transition-colors hover:border-gray-300">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
								<span className="text-green-600 font-bold text-lg">
									{posts.filter((p) => p.published).length}
								</span>
							</div>
							<div>
								<p className="font-medium text-sm text-gray-600">Published</p>
								<p className="text-xs text-gray-500">Live in the garden</p>
							</div>
						</div>
					</div>

					<div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-6 transition-colors hover:border-gray-300">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
								<span className="text-yellow-600 font-bold text-lg">
									{posts.filter((p) => !p.published).length}
								</span>
							</div>
							<div>
								<p className="font-medium text-sm text-gray-600">Drafts</p>
								<p className="text-xs text-gray-500">Growing in private</p>
							</div>
						</div>
					</div>

					<div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-6 transition-colors hover:border-gray-300">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
								<span className="text-blue-600 font-bold text-lg">
									{posts.length}
								</span>
							</div>
							<div>
								<p className="font-medium text-sm text-gray-600">Total</p>
								<p className="text-xs text-gray-500">Seeds planted</p>
							</div>
						</div>
					</div>
				</div>

				{/* Posts List */}
				<div className="space-y-6">
					<div className="space-y-4">
						<h2 className="font-bold text-2xl">Your Thoughts</h2>
						<div className="space-y-4">
							{posts.map((post) => (
								<PostCard key={post.id} post={post} onUpdate={() => {}} />
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

function CreatePostForm({
	onSuccess,
	onCancel,
}: {
	onSuccess: () => void;
	onCancel: () => void;
}) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [excerpt, setExcerpt] = useState("");
	const [published, setPublished] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In real app, would call API
		console.log("Creating post:", { title, content, excerpt, published });
		onSuccess();
	};

	return (
		<div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 transition-colors hover:border-gray-300">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-2xl">Plant a New Thought</h3>
					<div className="flex gap-3">
						<Button type="button" variant="outline" onClick={onCancel}>
							Cancel
						</Button>
						<Button type="submit">Plant Thought</Button>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block font-medium text-sm mb-2">Title</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-gray-500 focus:outline-none"
							placeholder="What's growing in your mind?"
							required
						/>
					</div>

					<div>
						<label className="block font-medium text-sm mb-2">
							Excerpt (optional)
						</label>
						<textarea
							value={excerpt}
							onChange={(e) => setExcerpt(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-gray-500 focus:outline-none"
							rows={2}
							placeholder="A brief summary of your thought..."
						/>
					</div>

					<div>
						<label className="block font-medium text-sm mb-2">Content</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-gray-500 focus:outline-none font-mono text-sm"
							rows={12}
							placeholder="Let your thoughts bloom here..."
							required
						/>
					</div>

					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="published"
							checked={published}
							onChange={(e) => setPublished(e.target.checked)}
							className="rounded"
						/>
						<label htmlFor="published" className="font-medium text-sm">
							Publish immediately
						</label>
					</div>
				</div>
			</form>
		</div>
	);
}

function PostCard({
	post,
	onUpdate,
}: {
	post: any;
	onUpdate: () => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [excerpt, setExcerpt] = useState(post.excerpt || "");
	const [published, setPublished] = useState(post.published);

	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		// In real app, would call API
		console.log("Updating post:", {
			id: post.id,
			title,
			content,
			excerpt,
			published,
		});
		setIsEditing(false);
		onUpdate();
	};

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this post?")) {
			// In real app, would call API
			console.log("Deleting post:", post.id);
			onUpdate();
		}
	};

	if (isEditing) {
		return (
			<div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-6 transition-colors hover:border-gray-300">
				<form onSubmit={handleUpdate} className="space-y-4">
					<div className="flex items-center justify-between">
						<h4 className="font-bold text-lg">Edit Thought</h4>
						<div className="flex gap-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</Button>
							<Button type="submit" size="sm">
								Save
							</Button>
						</div>
					</div>

					<div>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-2 focus:border-gray-500 focus:outline-none"
							required
						/>
					</div>

					<div>
						<textarea
							value={excerpt}
							onChange={(e) => setExcerpt(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-2 focus:border-gray-500 focus:outline-none"
							rows={2}
							placeholder="Excerpt..."
						/>
					</div>

					<div>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full rounded-md border border-gray-300 p-2 focus:border-gray-500 focus:outline-none font-mono text-sm"
							rows={8}
							required
						/>
					</div>

					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id={`published-${post.id}`}
							checked={published}
							onChange={(e) => setPublished(e.target.checked)}
							className="rounded"
						/>
						<label
							htmlFor={`published-${post.id}`}
							className="font-medium text-sm"
						>
							Published
						</label>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-6 transition-colors hover:border-gray-300">
			<div className="flex items-start justify-between">
				<div className="flex-1 space-y-2">
					<div className="flex items-center gap-3">
						<h3 className="font-bold text-xl">{post.title}</h3>
						<span
							className={`px-2 py-1 rounded-full text-xs font-medium ${
								post.published
									? "bg-green-100 text-green-800"
									: "bg-gray-100 text-gray-600"
							}`}
						>
							{post.published ? "Published" : "Draft"}
						</span>
					</div>

					{post.excerpt && (
						<p className="text-gray-600 text-sm">{post.excerpt}</p>
					)}

					<div className="flex items-center gap-4 text-xs text-gray-500">
						<span>
							Created: {new Date(post.createdAt).toLocaleDateString()}
						</span>
						{post.publishedAt && (
							<span>
								Published: {new Date(post.publishedAt).toLocaleDateString()}
							</span>
						)}
					</div>
				</div>

				<div className="flex gap-2">
					{post.published && (
						<Link
							href={`/blog/${post.slug}`}
							className="text-blue-600 hover:text-blue-800 text-sm underline"
						>
							View
						</Link>
					)}
					<Button
						variant="outline"
						size="sm"
						onClick={() => setIsEditing(true)}
					>
						Edit
					</Button>
					<Button variant="destructive" size="sm" onClick={handleDelete}>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
}
