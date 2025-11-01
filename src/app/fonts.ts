/**
 * Font Configuration
 *
 * This module configures and exports the fonts used throughout the website.
 * It defines three main fonts with CSS variables for easy usage in stylesheets:
 * - Lora (serif): Primary font used for main content and body text
 * - Geist (sans-serif): Admin dashboard font from Google Fonts
 * - Playfair Display (display): Decorative font for headings and special text
 *
 * All fonts are configured with:
 * - Font swapping for better loading performance
 * - CSS custom properties for easy theming
 * - Multiple weights and styles where applicable
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */

import { Geist } from "next/font/google";
import localFont from "next/font/local";

/**
 * Geist Sans Font
 *
 * Sans-serif font used specifically for the admin dashboard interface.
 * Loaded from Google Fonts with Latin character subset for clean, modern UI.
 *
 * CSS Variable: --font-sans
 * Usage: Applied in admin routes for dashboard components
 */
export const geist = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

/**
 * Lora Serif Font
 *
 * Primary serif font used for main content and body text throughout the site.
 * Loaded locally from variable font files for optimal performance.
 * Supports weights from 400-700 in both normal and italic styles.
 *
 * CSS Variable: --font-serif
 * Usage: Apply via Tailwind's `font-serif` class or CSS `var(--font-serif)`
 *
 * Font files:
 * - Lora-VariableFont_wght.ttf (normal)
 * - Lora-Italic-VariableFont_wght.ttf (italic)
 */
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

/**
 * Playfair Display Font
 *
 * Decorative display font used for headings and special typography.
 * Loaded locally from variable font files with extensive weight range (400-900).
 * Provides both normal and italic styles for maximum design flexibility.
 *
 * CSS Variable: --font-display
 * Usage: Apply via custom CSS using `var(--font-display)` or extend Tailwind config
 *
 * Font files:
 * - PlayfairDisplay-VariableFont_wght.ttf (normal)
 * - PlayfairDisplay-Italic-VariableFont_wght.ttf (italic)
 */
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
