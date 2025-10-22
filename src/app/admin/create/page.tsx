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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePostPage() {
	const router = useRouter();

	const createMutation = api.posts.create.useMutation({
		onSuccess: () => {
			router.push("/admin");
		},
	});

	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [content, setContent] = useState("");
	const [published, setPublished] = useState(false);
	const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
	const [isEditorExpanded, setIsEditorExpanded] = useState(false);
	const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);

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

	const handleSavePost = () => {
		createMutation.mutate({
			title,
			slug,
			content,
			published,
		});
	};

	const handleExpandChange = (isExpanded: boolean, isFullscreen: boolean) => {
		setIsEditorExpanded(isExpanded);
		setIsEditorFullscreen(isFullscreen);
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Header - Hidden in fullscreen */}
			{!isEditorFullscreen && (
				<div className="flex items-center gap-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href="/admin">
									<Button variant="outline" size="icon">
										<ArrowLeft className="h-4 w-4" />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Back to blog dashboard</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<div>
						<h1 className="font-bold text-3xl">Create New Post</h1>
						<p className="text-muted-foreground">
							Start writing your new blog post
						</p>
					</div>
				</div>
			)}

			<div
				className={`grid gap-6 ${
					isEditorExpanded || isEditorFullscreen
						? "lg:grid-cols-1"
						: "lg:grid-cols-3"
				}`}
			>
				{/* Main Content - Responsive width */}
				<div
					className={`space-y-6 ${
						isEditorExpanded || isEditorFullscreen
							? "lg:col-span-1"
							: "lg:col-span-2"
					}`}
				>
					{/* Post Details - Hidden in fullscreen */}
					{!isEditorFullscreen && (
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
										<span className="text-muted-foreground text-sm">
											/blog/
										</span>
										<Input
											id="slug"
											value={slug}
											onChange={(e) => handleSlugChange(e.target.value)}
											placeholder="url-friendly-slug"
											className="flex-1"
										/>
									</div>
									<p className="text-muted-foreground text-xs">
										The URL-friendly version of the title. Auto-generated but
										can be customized.
									</p>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Editor */}
					<Card className={isEditorFullscreen ? "border-none shadow-none" : ""}>
						{!isEditorFullscreen && (
							<CardHeader>
								<CardTitle>Content</CardTitle>
							</CardHeader>
						)}
						<CardContent className={isEditorFullscreen ? "p-0" : ""}>
							<TiptapEditor
								content={content}
								onChange={setContent}
								placeholder="Start writing your post content..."
								onExpandChange={handleExpandChange}
								onSave={handleSavePost}
								isSaving={createMutation.isPending}
							/>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar - Hidden when expanded/fullscreen */}
				{!isEditorExpanded && !isEditorFullscreen && (
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
													onClick={() => setPublished(!published)}
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
									onClick={handleSavePost}
									className="w-full"
									size="lg"
									disabled={createMutation.isPending}
								>
									<Save className="mr-2 h-4 w-4" />
									{published ? "Publish Post" : "Save Draft"}
								</Button>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
}
