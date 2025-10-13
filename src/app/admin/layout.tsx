import "@/styles/admin.css";
import type React from "react";
import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { AdminSidebar } from "@/app/_components/admin-sidebar";
import { Separator } from "@/app/_components/ui/separator";
import { Button } from "@/app/_components/ui/button";
import { Home, BookOpen } from "lucide-react";
import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/app/_components/ui/tooltip";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider defaultOpen={true}>
			<AdminSidebar />
			<SidebarInset>
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
