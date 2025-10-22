"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import { Switch } from "@/app/_components/ui/switch";
import { Textarea } from "@/app/_components/ui/textarea";
import { useState } from "react";

export default function SettingsPage() {
	const [settings, setSettings] = useState({
		siteName: "My Blog",
		siteDescription: "A blog about web development and technology",
		siteUrl: "https://myblog.com",
		postsPerPage: "10",
		enableComments: true,
		enableNewsletter: false,
	});

	const handleSave = () => {
		// TODO: Implement save logic
		console.log("Settings saved:", settings);
	};

	return (
		<div className="flex max-w-4xl flex-col gap-6">
			<div>
				<h1 className="font-bold text-3xl">Settings</h1>
				<p className="text-muted-foreground">
					Manage your blog settings and preferences
				</p>
			</div>

			{/* General Settings */}
			<Card>
				<CardHeader>
					<CardTitle>General</CardTitle>
					<CardDescription>Basic information about your blog</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="siteName">Site Name</Label>
						<Input
							id="siteName"
							value={settings.siteName}
							onChange={(e) =>
								setSettings({ ...settings, siteName: e.target.value })
							}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="siteDescription">Site Description</Label>
						<Textarea
							id="siteDescription"
							value={settings.siteDescription}
							onChange={(e) =>
								setSettings({ ...settings, siteDescription: e.target.value })
							}
							rows={3}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="siteUrl">Site URL</Label>
						<Input
							id="siteUrl"
							type="url"
							value={settings.siteUrl}
							onChange={(e) =>
								setSettings({ ...settings, siteUrl: e.target.value })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Content Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Content</CardTitle>
					<CardDescription>
						Configure how your content is displayed
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="postsPerPage">Posts Per Page</Label>
						<Input
							id="postsPerPage"
							type="number"
							value={settings.postsPerPage}
							onChange={(e) =>
								setSettings({ ...settings, postsPerPage: e.target.value })
							}
						/>
					</div>

					<Separator />

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="enableComments">Enable Comments</Label>
							<p className="text-muted-foreground text-sm">
								Allow readers to comment on your posts
							</p>
						</div>
						<Switch
							id="enableComments"
							checked={settings.enableComments}
							onCheckedChange={(checked) =>
								setSettings({ ...settings, enableComments: checked })
							}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="enableNewsletter">Enable Newsletter</Label>
							<p className="text-muted-foreground text-sm">
								Show newsletter signup form on your blog
							</p>
						</div>
						<Switch
							id="enableNewsletter"
							checked={settings.enableNewsletter}
							onCheckedChange={(checked) =>
								setSettings({ ...settings, enableNewsletter: checked })
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Save Button */}
			<div className="flex justify-end">
				<Button onClick={handleSave} size="lg">
					Save Changes
				</Button>
			</div>
		</div>
	);
}
