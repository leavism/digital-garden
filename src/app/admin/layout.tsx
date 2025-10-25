import "@/styles/admin.css";
import { AdminSidebar } from "@/app/_components/admin-sidebar";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { env } from "@/env";
import { getServerSession } from "@/server/auth";
import { BookOpen, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type React from "react";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
	}

	// Only allow specific user to access admin dashboard
	if (session.user.id !== env.ADMIN_USER_ID) {
		redirect("/");
	}
	return (
		<SidebarProvider defaultOpen={true}>
			<AdminSidebar user={session!.user} />
			<SidebarInset className="font-sans">
				<header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<SidebarTrigger className="-ml-1" />
							</TooltipTrigger>
							<TooltipContent>
								<p>Toggle sidebar</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<Separator orientation="vertical" className="mr-2 h-4" />
					<div className="flex items-center gap-2">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon" asChild>
										<Link href="/">
											<Home className="size-4" />
										</Link>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Go to landing page</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon" asChild>
										<Link href="/blog">
											<BookOpen className="size-4" />
										</Link>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Go to blog list</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</header>
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
