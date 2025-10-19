"use client";

import { TiptapEditor } from "@/app/_components/editor/tiptap-editor";
import { Button } from "@/app/_components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { api } from "@/trpc/react";
import { ArrowLeft, Eye, FileEdit, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditPostPage() {
	const params = useParams();
	const router = useRouter();
	const postId = params.id as string;

	const { data: post, isLoading } = api.posts.getById.useQuery({ id: postId });
	const utils = api.useUtils();
	const updateMutation = api.posts.update.useMutation({
		onSuccess: () => {
			setHasUnsavedChanges(false);
			utils.posts.getAllAdmin.invalidate();
			utils.posts.getById.invalidate({ id: postId });
			toast.success("Post saved successfully!", {
				id: "save-post",
				description: "Your changes have been saved and are now live.",
			});
		},
		onError: (error) => {
			toast.error("Failed to save post", {
				id: "save-post",
				description: error.message || "Please try again.",
			});
		},
	});

	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [content, setContent] = useState("");
	const [published, setPublished] = useState(false);
	const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	// Initialize form when post data loads
	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setSlug(post.slug);
			setContent(post.content);
			setPublished(post.published);
			setHasUnsavedChanges(false);
		}
	}, [post]);

	// Track changes to all form fields
	useEffect(() => {
		if (post) {
			const hasChanges =
				title !== post.title ||
				slug !== post.slug ||
				content !== post.content ||
				published !== post.published;

			setHasUnsavedChanges(hasChanges);
		}
	}, [title, slug, content, published, post]);

	// Warn before leaving page with unsaved changes
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (hasUnsavedChanges) {
				e.preventDefault();
				e.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [hasUnsavedChanges]);

	const handleBackClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (hasUnsavedChanges) {
			const confirmed = window.confirm(
				"You have unsaved changes. Are you sure you want to leave this page?",
			);
			if (confirmed) {
				router.push("/admin");
			}
		} else {
			router.push("/admin");
		}
	};

	const generateSlug = (text: string) => {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	};

	const handleTitleChange = (value: string) => {
		setTitle(value);
		if (!isSlugManuallyEdited) {
			setSlug(generateSlug(value));
		}
	};

	const handleSlugChange = (value: string) => {
		setSlug(value);
		setIsSlugManuallyEdited(true);
	};

	const handleSave = () => {
		if (!post) return;

		toast.loading("Saving post...", {
			id: "save-post",
		});

		updateMutation.mutate({
			id: post.id,
			title,
			slug,
			content,
			published,
		});
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6">
				<p className="text-muted-foreground">Loading...</p>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="flex flex-col gap-6">
				<p className="text-muted-foreground">Post not found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" onClick={handleBackClick}>
								<ArrowLeft className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Back to blog dashboard</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<div>
					<h1 className="font-bold text-3xl">Edit Post</h1>
					<p className="text-muted-foreground">
						Last updated:{" "}
						{new Date(post.updatedAt).toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</p>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Main Content - Left Column (2/3 width) */}
				<div className="space-y-6 lg:col-span-2">
					{/* Post Details */}
					<Card>
						<CardHeader>
							<CardTitle>Post Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Title */}
							<div className="space-y-2">
								<Label htmlFor="title" className="font-semibold text-base">
									Title
								</Label>
								<Input
									id="title"
									value={title}
									onChange={(e) => handleTitleChange(e.target.value)}
									placeholder="Enter post title..."
									className="text-lg"
								/>
							</div>

							{/* Slug */}
							<div className="space-y-2">
								<Label htmlFor="slug" className="font-semibold text-base">
									URL Slug
								</Label>
								<div className="flex items-center gap-2">
									<span className="text-muted-foreground text-sm">/blog/</span>
									<Input
										id="slug"
										value={slug}
										onChange={(e) => handleSlugChange(e.target.value)}
										placeholder="url-friendly-slug"
										className="flex-1"
									/>
								</div>
								<p className="text-muted-foreground text-xs">
									The URL-friendly version of the title. Auto-generated but can
									be customized.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Editor */}
					<Card>
						<CardHeader>
							<CardTitle>Content</CardTitle>
						</CardHeader>
						<CardContent>
							{post && (
								<TiptapEditor
									content={post.content}
									onChange={setContent}
									placeholder="Start editing your post content..."
								/>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Sidebar - Right Column (1/3 width) */}
				<div className="space-y-6">
					{/* Actions */}
					<Card>
						<CardHeader>
							<CardTitle>Actions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Status Toggle */}
							<div className="space-y-2">
								<Label className="font-semibold text-sm">Status</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												type="button"
												variant={published ? "default" : "outline"}
												className="w-full"
												onClick={() => {
													const newStatus = !published;
													setPublished(newStatus);
													toast.info(
														newStatus ? "Post marked as published" : "Post marked as draft",
														{
															description: newStatus
																? "Don't forget to save your changes to make it live"
																: "Post will be hidden from public view when saved"
														}
													);
												}}
											>
												{published ? (
													<>
														<Eye className="mr-2 h-4 w-4" />
														Published
													</>
												) : (
													<>
														<FileEdit className="mr-2 h-4 w-4" />
														Draft
													</>
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Click to toggle status</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>

							{/* Save Button */}
							<Button
								onClick={handleSave}
								className="w-full"
								size="lg"
								disabled={updateMutation.isPending || !hasUnsavedChanges}
							>
								<Save className="mr-2 h-4 w-4" />
								Save Changes
							</Button>
						</CardContent>
					</Card>

					{/* Metadata */}
					<Card>
						<CardHeader>
							<CardTitle>Metadata</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{post.publishedAt && (
								<div className="space-y-1">
									<p className="font-medium text-muted-foreground text-sm">
										Published Date
									</p>
									<p className="text-sm">
										{new Date(post.publishedAt).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
							)}
							<div className="space-y-1">
								<p className="font-medium text-muted-foreground text-sm">
									Last Updated
								</p>
								<p className="text-sm">
									{new Date(post.updatedAt).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
