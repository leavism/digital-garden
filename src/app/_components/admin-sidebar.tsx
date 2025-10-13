"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "@/app/_components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { ChevronUp } from "lucide-react";

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

// Mock user data - replace with actual auth data
const user = {
	name: "John Doe",
	email: "john@example.com",
	avatar: "/placeholder-user.jpg",
	initials: "JD",
};

export function AdminSidebar() {
	const pathname = usePathname();

	const handleLogout = () => {
		// TODO: Implement logout logic
		console.log("Logout clicked");
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
										<AvatarImage
											src={user.avatar || "/placeholder.svg"}
											alt={user.name}
										/>
										<AvatarFallback className="rounded-lg">
											{user.initials}
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
								<DropdownMenuItem onClick={handleLogout}>
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
