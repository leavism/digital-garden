import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { Eye, FileText, MessageSquare, TrendingUp } from "lucide-react";

// Mock stats data
const stats = [
	{
		name: "Total Posts",
		value: "24",
		icon: FileText,
		change: "+3 this month",
	},
	{
		name: "Total Views",
		value: "12,543",
		icon: Eye,
		change: "+18% from last month",
	},
	{
		name: "Comments",
		value: "89",
		icon: MessageSquare,
		change: "+12 this week",
	},
	{
		name: "Engagement",
		value: "64%",
		icon: TrendingUp,
		change: "+5% from last month",
	},
];

// Mock recent posts data
const recentPosts = [
	{
		id: "1",
		title: "Getting Started with Next.js 15",
		status: "published",
		views: 1234,
		date: "2024-01-15",
	},
	{
		id: "2",
		title: "Understanding React Server Components",
		status: "published",
		views: 892,
		date: "2024-01-12",
	},
	{
		id: "3",
		title: "Building Scalable APIs",
		status: "draft",
		views: 0,
		date: "2024-01-10",
	},
];

export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="font-bold text-3xl">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back! Here's an overview of your blog.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.name}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="font-medium text-sm">{stat.name}</CardTitle>
							<stat.icon className="size-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">{stat.value}</div>
							<p className="text-muted-foreground text-xs">{stat.change}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Recent Posts */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Posts</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentPosts.map((post) => (
							<div
								key={post.id}
								className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
							>
								<div className="space-y-1">
									<p className="font-medium">{post.title}</p>
									<div className="flex items-center gap-4 text-muted-foreground text-sm">
										<span className="capitalize">{post.status}</span>
										<span>•</span>
										<span>{post.views} views</span>
										<span>•</span>
										<span>{new Date(post.date).toLocaleDateString()}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
