import { BlogPostsTable } from "@/app/_components/blog-posts-table";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";

export default function AdminPage() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Posts</h1>
					<p className="text-muted-foreground">
						Manage your blog posts and their publication status
					</p>
				</div>
				<Link href="/admin/new">
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Create New Post
					</Button>
				</Link>
			</div>

			<BlogPostsTable />
		</div>
	);
}
