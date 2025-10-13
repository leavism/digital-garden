"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { ButtonGroup } from "@/app/_components/ui/button-group";
import { ArrowLeft, Save, ChevronDown, Eye, FileEdit } from "lucide-react";

type BlogPost = {
	id: string;
	title: string;
	slug: string;
	status: "published" | "draft";
	lastUpdated: string;
	publishedDate?: string;
	content: string;
};

// Mock data - in a real app, this would come from an API
const mockPosts: BlogPost[] = [
	{
		id: "1",
		title: "Getting Started with Next.js 15",
		slug: "getting-started-with-nextjs-15",
		status: "published",
		lastUpdated: "2024-03-15",
		publishedDate: "2024-03-10",
		content: "Next.js 15 introduces groundbreaking features...",
	},
	{
		id: "2",
		title: "The Future of Web Development",
		slug: "the-future-of-web-development",
		status: "draft",
		lastUpdated: "2024-03-14",
		content: "As we look ahead, web development continues to evolve...",
	},
];

export default function EditPostPage() {
	const params = useParams();
	const router = useRouter();
	const postId = params.id as string;

	const [post, setPost] = useState<BlogPost | null>(null);
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [status, setStatus] = useState<"published" | "draft">("draft");
	const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
	const [isMetadataOpen, setIsMetadataOpen] = useState(false);

	useEffect(() => {
		// In a real app, fetch the post from an API
		const foundPost = mockPosts.find((p) => p.id === postId);
		if (foundPost) {
			setPost(foundPost);
			setTitle(foundPost.title);
			setSlug(foundPost.slug);
			setStatus(foundPost.status);
		}
	}, [postId]);

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

	const handleSaveDraft = () => {
		console.log("Saving draft:", { title, slug, status: "draft" });
		// In a real app, save to API
		router.push("/admin");
	};

	if (!post) {
		return (
			<div className="min-h-screen bg-background p-4 md:p-8">
				<div className="mx-auto max-w-4xl">
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
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
							<h1 className="font-serif text-3xl font-bold tracking-tight">
								Edit Post
							</h1>
							<p className="text-sm text-muted-foreground mt-1">
								Last updated:{" "}
								{new Date(post.lastUpdated).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</p>
						</div>
					</div>
				</div>

				{/* Main Form */}
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
								The URL-friendly version of the title. Auto-generated but can be
								customized.
							</p>
						</div>

						{/* Metadata */}
						<Collapsible open={isMetadataOpen} onOpenChange={setIsMetadataOpen}>
							<CollapsibleTrigger asChild>
								<Button
									variant="ghost"
									className="w-full justify-between p-0 hover:bg-transparent"
								>
									<span className="text-lg font-semibold">Metadata</span>
									<ChevronDown
										className={`h-4 w-4 transition-transform ${isMetadataOpen ? "rotate-180" : ""}`}
									/>
								</Button>
							</CollapsibleTrigger>
							<CollapsibleContent className="pt-4 space-y-2">
								{post.publishedDate && (
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">
											Published Date:
										</span>
										<span className="font-medium">
											{new Date(post.publishedDate).toLocaleDateString(
												"en-US",
												{
													month: "long",
													day: "numeric",
													year: "numeric",
												},
											)}
										</span>
									</div>
								)}
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Last Updated:</span>
									<span className="font-medium">
										{new Date(post.lastUpdated).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</span>
								</div>
							</CollapsibleContent>
						</Collapsible>
					</CardContent>
				</Card>

				{/* Editor */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
						<CardTitle>Content</CardTitle>
						<TooltipProvider>
							<ButtonGroup>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											type="button"
											variant="secondary"
											size="icon"
											onClick={() =>
												setStatus(
													status === "published" ? "draft" : "published",
												)
											}
										>
											{status === "published" ? (
												<Eye className="h-4 w-4" />
											) : (
												<FileEdit className="h-4 w-4" />
											)}
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>{status === "published" ? "Published" : "Draft"}</p>
									</TooltipContent>
								</Tooltip>
								<Button onClick={handleSaveDraft}>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</Button>
							</ButtonGroup>
						</TooltipProvider>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="min-h-[400px] rounded-md border border-dashed border-muted-foreground/25 bg-muted/5 p-8 flex items-center justify-center">
							<div className="text-center space-y-2">
								<p className="text-lg font-medium text-muted-foreground">
									Tiptap Editor Placeholder
								</p>
								<p className="text-sm text-muted-foreground">
									The rich text editor will be integrated here
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
