import { Geist } from "next/font/google";
import localFont from "next/font/local";

export const geist = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export const lora = localFont({
	src: [
		{
			path: "../assets/fonts/Lora-VariableFont_wght.ttf",
			weight: "400 700",
			style: "normal",
		},
		{
			path: "../assets/fonts/Lora-Italic-VariableFont_wght.ttf",
			weight: "400 700",
			style: "italic",
		},
	],
	variable: "--font-serif",
	display: "swap",
	adjustFontFallback: false,
});

export const playfairDisplay = localFont({
	src: [
		{
			path: "../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf",
			weight: "400 900",
			style: "normal",
		},
		{
			path: "../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf",
			weight: "400 900",
			style: "italic",
		},
	],
	variable: "--font-display",
	display: "swap",
	adjustFontFallback: false,
});
