import { BlogPostsTable } from "@/app/_components/blog-posts-table";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

export default function AdminPage() {
	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="mx-auto max-w-6xl space-y-6">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
							Blog Admin Dashboard
						</h1>
						<p className="text-muted-foreground">
							Manage your blog posts and their publication status
						</p>
					</div>
					<div className="flex gap-2">
						<Link href="/admin/new">
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Create New Post
							</Button>
						</Link>
						<Link href="/blog">
							<Button variant="outline">
								<ArrowLeft className="mr-2 h-4 w-4" />
								View Blog
							</Button>
						</Link>
					</div>
				</div>

				<BlogPostsTable />
			</div>
		</div>
	);
}
