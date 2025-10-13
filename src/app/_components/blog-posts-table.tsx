"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Input } from "@/app/_components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/_components/ui/select";
import { Separator } from "@/app/_components/ui/separator";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/app/_components/ui/hover-card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import {
	Pencil,
	Trash2,
	Search,
	ChevronLeft,
	ChevronRight,
	CheckCircle,
	Circle,
} from "lucide-react";
import { useRouter } from "next/navigation";

type BlogPost = {
	id: string;
	title: string;
	status: "published" | "draft";
	lastUpdated: string;
	publishedDate?: string;
	content: string;
};

const mockPosts: BlogPost[] = [
	{
		id: "1",
		title: "Getting Started with Next.js 15",
		status: "published",
		lastUpdated: "2024-03-15",
		publishedDate: "2024-03-10",
		content:
			"Next.js 15 introduces groundbreaking features that revolutionize how we build web applications. From improved performance to enhanced developer experience, this release sets a new standard for React frameworks.",
	},
	{
		id: "2",
		title: "The Future of Web Development",
		status: "draft",
		lastUpdated: "2024-03-14",
		content:
			"As we look ahead, web development continues to evolve at a rapid pace. New technologies, frameworks, and best practices emerge constantly, shaping how we create digital experiences.",
	},
	{
		id: "3",
		title: "Building Scalable React Applications",
		status: "published",
		lastUpdated: "2024-03-12",
		publishedDate: "2024-03-08",
		content:
			"Scalability is crucial for modern React applications. Learn the patterns and practices that help your application grow from a small project to an enterprise-level solution.",
	},
	{
		id: "5",
		title: "TypeScript Best Practices",
		status: "draft",
		lastUpdated: "2024-03-10",
		content:
			"TypeScript has become the de facto standard for building robust JavaScript applications. Discover the best practices that will make your TypeScript code more maintainable and type-safe.",
	},
	{
		id: "6",
		title: "Optimizing Performance in Modern Web Apps",
		status: "published",
		lastUpdated: "2024-03-08",
		publishedDate: "2024-03-05",
		content:
			"Performance optimization is more important than ever. From code splitting to lazy loading, learn the techniques that will make your web applications lightning fast.",
	},
	{
		id: "7",
		title: "CSS Grid vs Flexbox: When to Use Each",
		status: "published",
		lastUpdated: "2024-03-07",
		publishedDate: "2024-03-03",
		content:
			"Understanding the differences between CSS Grid and Flexbox is essential for modern web layouts. Learn when to use each layout system for optimal results.",
	},
	{
		id: "8",
		title: "Introduction to Server Components",
		status: "draft",
		lastUpdated: "2024-03-06",
		content:
			"React Server Components represent a paradigm shift in how we think about rendering. Explore the benefits and use cases for this powerful new feature.",
	},
	{
		id: "9",
		title: "Mastering Tailwind CSS",
		status: "published",
		lastUpdated: "2024-03-05",
		publishedDate: "2024-03-01",
		content:
			"Tailwind CSS has transformed how developers approach styling. Learn the advanced techniques that will take your Tailwind skills to the next level.",
	},
];

const POSTS_PER_PAGE = 5;

export function BlogPostsTable() {
	const router = useRouter();
	const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<
		"date-desc" | "date-asc" | "title-asc" | "title-desc" | "status"
	>("date-desc");
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [postToDelete, setPostToDelete] = useState<string | null>(null);
	const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
	const [currentPage, setCurrentPage] = useState(1);

	const handleEdit = (postId: string) => {
		router.push(`/admin/edit/${postId}`);
	};

	const handleDelete = (postId: string) => {
		setPostToDelete(postId);
		setDeleteDialogOpen(true);
	};

	const confirmDelete = () => {
		if (postToDelete) {
			setPosts(posts.filter((p) => p.id !== postToDelete));
			setPostToDelete(null);
			setDeleteDialogOpen(false);
		}
	};

	const handleStatusToggle = (postId: string) => {
		setPosts(
			posts.map((post) => {
				if (post.id === postId) {
					const newStatus = post.status === "published" ? "draft" : "published";
					return {
						...post,
						status: newStatus,
						// Update published date when publishing
						publishedDate:
							newStatus === "published" && !post.publishedDate
								? new Date().toISOString().split("T")[0]
								: post.publishedDate,
					};
				}
				return post;
			}),
		);
	};

	const filteredAndSortedPosts = posts
		.filter((post) => {
			if (filter !== "all" && post.status !== filter) return false;
			if (
				searchQuery &&
				!post.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
				return false;
			return true;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case "date-desc":
					return (
						new Date(b.lastUpdated).getTime() -
						new Date(a.lastUpdated).getTime()
					);
				case "date-asc":
					return (
						new Date(a.lastUpdated).getTime() -
						new Date(b.lastUpdated).getTime()
					);
				case "title-asc":
					return a.title.localeCompare(b.title);
				case "title-desc":
					return b.title.localeCompare(a.title);
				case "status":
					return a.status.localeCompare(b.status);
				default:
					return 0;
			}
		});

	const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

	const handleFilterChange = (newFilter: "all" | "published" | "draft") => {
		setFilter(newFilter);
		setCurrentPage(1);
	};

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Blog Posts</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search posts..."
								value={searchQuery}
								onChange={(e) => handleSearchChange(e.target.value)}
								className="pl-9"
							/>
						</div>
					</div>

					<div className="mb-6 flex flex-wrap items-center gap-2">
						<Button
							variant={filter === "all" ? "default" : "outline"}
							onClick={() => handleFilterChange("all")}
							size="sm"
						>
							All ({posts.length})
						</Button>
						<Button
							variant={filter === "published" ? "default" : "outline"}
							onClick={() => handleFilterChange("published")}
							size="sm"
						>
							Published ({posts.filter((p) => p.status === "published").length})
						</Button>
						<Button
							variant={filter === "draft" ? "default" : "outline"}
							onClick={() => handleFilterChange("draft")}
							size="sm"
						>
							Draft ({posts.filter((p) => p.status === "draft").length})
						</Button>

						<Separator orientation="vertical" className="h-8 mx-2" />

						<Select
							value={sortBy}
							onValueChange={(value: typeof sortBy) => setSortBy(value)}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="date-desc">Newest First</SelectItem>
								<SelectItem value="date-asc">Oldest First</SelectItem>
								<SelectItem value="title-asc">Title (A-Z)</SelectItem>
								<SelectItem value="title-desc">Title (Z-A)</SelectItem>
								<SelectItem value="status">Status</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="min-h-[400px] flex flex-col">
						<div className="overflow-x-auto flex-1">
							<table className="w-full table-fixed min-w-[600px]">
								<thead>
									<tr className="border-b">
										<th className="pb-3 text-left font-semibold w-[450px]">
											Title
										</th>
										<th className="pb-3 text-right font-semibold w-[180px]">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{paginatedPosts.map((post) => (
										<tr key={post.id} className="border-b last:border-0">
											<td className="py-4 pr-4 w-[450px]">
												<HoverCard>
													<HoverCardTrigger asChild>
														<span className="font-medium block truncate cursor-pointer hover:text-primary transition-colors">
															{post.title}
														</span>
													</HoverCardTrigger>
													<HoverCardContent className="w-96" side="right">
														<div className="space-y-3">
															<h4 className="font-semibold text-base leading-tight">
																{post.title}
															</h4>
															<p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
																{post.content}
															</p>
															<div className="space-y-1 pt-2 border-t">
																<p className="text-xs text-muted-foreground">
																	<span className="font-semibold">
																		Last Updated:
																	</span>{" "}
																	{new Date(
																		post.lastUpdated,
																	).toLocaleDateString("en-US", {
																		month: "long",
																		day: "numeric",
																		year: "numeric",
																	})}
																</p>
																{post.publishedDate && (
																	<p className="text-xs text-muted-foreground">
																		<span className="font-semibold">
																			Published:
																		</span>{" "}
																		{new Date(
																			post.publishedDate,
																		).toLocaleDateString("en-US", {
																			month: "long",
																			day: "numeric",
																			year: "numeric",
																		})}
																	</p>
																)}
															</div>
														</div>
													</HoverCardContent>
												</HoverCard>
											</td>
											<td className="py-4 text-right w-[180px]">
												<TooltipProvider>
													<div className="flex gap-2 justify-end">
														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	variant="outline"
																	size="icon"
																	onClick={() => handleStatusToggle(post.id)}
																	className={
																		post.status === "published"
																			? "text-green-600 hover:text-green-700 hover:bg-green-50"
																			: "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
																	}
																>
																	{post.status === "published" ? (
																		<CheckCircle className="h-4 w-4" />
																	) : (
																		<Circle className="h-4 w-4" />
																	)}
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>
																	{post.status === "published"
																		? "Published"
																		: "Draft"}{" "}
																	- Click to toggle
																</p>
															</TooltipContent>
														</Tooltip>
														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	variant="outline"
																	size="icon"
																	onClick={() => handleEdit(post.id)}
																>
																	<Pencil className="h-4 w-4" />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Edit</p>
															</TooltipContent>
														</Tooltip>
														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	variant="outline"
																	size="icon"
																	onClick={() => handleDelete(post.id)}
																	className="hover:bg-destructive hover:text-destructive-foreground"
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Delete</p>
															</TooltipContent>
														</Tooltip>
													</div>
												</TooltipProvider>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{totalPages > 1 && (
						<div className="mt-6 flex items-center justify-between">
							<p className="text-sm text-muted-foreground">
								Showing {startIndex + 1} to{" "}
								{Math.min(endIndex, filteredAndSortedPosts.length)} of{" "}
								{filteredAndSortedPosts.length} posts
							</p>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										setCurrentPage((prev) => Math.max(1, prev - 1))
									}
									disabled={currentPage === 1}
								>
									<ChevronLeft className="h-4 w-4" />
									Previous
								</Button>
								<div className="flex gap-1">
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(page) => (
											<Button
												key={page}
												variant={currentPage === page ? "default" : "outline"}
												size="sm"
												onClick={() => setCurrentPage(page)}
												className="w-9"
											>
												{page}
											</Button>
										),
									)}
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										setCurrentPage((prev) => Math.min(totalPages, prev + 1))
									}
									disabled={currentPage === totalPages}
								>
									Next
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the
							blog post.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
