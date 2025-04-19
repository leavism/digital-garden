import "@/styles/globals.css";

import type { Metadata } from "next";

import CanvasBackground from "@/app/_components/BackgroundEffect";

export const metadata: Metadata = {
	title: "Huy's Digital Garden",
	description:
		"Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="font-serif">
			<body>
				<CanvasBackground />
				{children}
			</body>
		</html>
	);
}
