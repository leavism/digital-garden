"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
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
import { TiptapEditor } from "@/app/_components/editor/tiptap-editor";
import { ArrowLeft, Save, Eye, FileEdit } from "lucide-react";

export default function CreatePostPage() {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState<"published" | "draft">("draft");
	const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

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
		console.log("Saving post:", { title, slug, content, status });
		// In a real app, save to API
		router.push("/admin");
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
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
					<h1 className="text-3xl font-bold">
						Create New Post
					</h1>
					<p className="text-muted-foreground">
						Start writing your new blog post
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
								<Label htmlFor="title" className="text-base font-semibold">
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
								<Label htmlFor="slug" className="text-base font-semibold">
									URL Slug
								</Label>
								<div className="flex items-center gap-2">
									<span className="text-sm text-muted-foreground">/blog/</span>
									<Input
										id="slug"
										value={slug}
										onChange={(e) => handleSlugChange(e.target.value)}
										placeholder="url-friendly-slug"
										className="flex-1"
									/>
								</div>
								<p className="text-xs text-muted-foreground">
									The URL-friendly version of the title. Auto-generated but can be customized.
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
							<TiptapEditor
								content={content}
								onChange={setContent}
								placeholder="Start writing your post content..."
							/>
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
								<Label className="text-sm font-semibold">Status</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												type="button"
												variant={status === "published" ? "default" : "outline"}
												className="w-full"
												onClick={() => setStatus(status === "published" ? "draft" : "published")}
											>
												{status === "published" ? (
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
							<Button onClick={handleSavePost} className="w-full" size="lg">
								<Save className="mr-2 h-4 w-4" />
								{status === "published" ? "Publish Post" : "Save Draft"}
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}