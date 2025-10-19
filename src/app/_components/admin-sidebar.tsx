"use client";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/app/_components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { authClient } from "@/server/auth/client";
import type { Session, User } from "better-auth";
import { FileText, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
	{
		name: "Dashboard",
		href: "/admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Posts",
		href: "/admin",
		icon: FileText,
	},
	{
		name: "Settings",
		href: "/admin/settings",
		icon: Settings,
	},
];

export function AdminSidebar({ user }: { user: User }) {
	const pathname = usePathname();
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await authClient.signOut();
			router.refresh();
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar className="size-8 rounded-lg">
										<AvatarImage src={user.image || "/"} alt={user.name} />
										<AvatarFallback className="rounded-lg">
											{`${user.name[0]}${user.name[1]}` || "FC"}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">{user.name}</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
									<ChevronUp className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								side="bottom"
								align="end"
								sideOffset={4}
							>
								<DropdownMenuItem onClick={handleSignOut}>
									<LogOut className="mr-2 size-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigation.map((item) => {
								const isActive = pathname === item.href;
								return (
									<SidebarMenuItem key={item.name}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											tooltip={item.name}
										>
											<Link href={item.href}>
												<item.icon />
												<span>{item.name}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				{/* Footer content removed as logout is now in user dropdown */}
			</SidebarFooter>
		</Sidebar>
	);
}
