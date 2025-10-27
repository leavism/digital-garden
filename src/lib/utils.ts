import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Strips HTML tags and normalizes whitespace from an HTML string
 *
 * Removes all HTML tags and collapses multiple whitespace characters
 * into single spaces, then trims leading/trailing whitespace.
 *
 * @param html - HTML string to process
 * @returns Plain text with normalized whitespace
 *
 * @example
 * ```ts
 * stripHtml("<p>Hello <strong>world</strong></p>")
 * // Returns: "Hello world"
 *
 * stripHtml("<div>  Multiple   spaces  </div>")
 * // Returns: "Multiple spaces"
 * ```
 */
export function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

/**
 * Generates a description excerpt from HTML content
 *
 * Extracts plain text from HTML and truncates to a maximum length
 * suitable for meta descriptions (160 characters by default).
 * Adds ellipsis (...) if content is truncated.
 *
 * @param content - HTML content to generate description from
 * @param maxLength - Maximum length of description (default: 160)
 * @returns Truncated plain text description
 *
 * @example
 * ```ts
 * const html = "<p>This is a very long article about web development...</p>"
 * generateDescription(html, 50)
 * // Returns: "This is a very long article about web develop..."
 * ```
 */
export function generateDescription(content: string, maxLength = 160): string {
	const plainText = stripHtml(content);
	return plainText.length > maxLength
		? `${plainText.substring(0, maxLength - 3)}...`
		: plainText;
}
