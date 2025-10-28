/**
 * Shared Tiptap Extensions Configuration
 *
 * This file defines the Tiptap extensions used across both:
 * - Admin editor (when writing posts)
 * - Blog display (when rendering posts)
 *
 * IMPORTANT: Any changes here affect both the editor and rendered output.
 * After changing extensions, you may need to re-save existing posts for
 * changes to take effect.
 *
 * @see /app/_components/editor/tiptap-editor.tsx - Admin editor
 * @see /app/blog/[slug]/page.tsx - Blog post rendering
 */

import { Callout } from "@/app/_components/editor/extensions/callout";
import { Code } from "@tiptap/extension-code";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

/**
 * Tiptap extensions array
 *
 * Used by both the editor and blog rendering to ensure consistent behavior.
 *
 * Extensions included:
 * - StarterKit: Basic formatting (headings, lists, bold, italic, etc.)
 * - Code: Inline code with custom styling
 * - TextStyle/Color: Text coloring support
 * - Highlight: Multi-color text highlighting
 * - Underline: Underline formatting
 * - Link: Clickable links with custom styling
 * - Image: Responsive images with rounded corners
 * - TextAlign: Left/center/right alignment
 * - TaskList/TaskItem: Checkbox lists with nesting
 * - Callout: Custom callout boxes (info/warning/success)
 */
export const tiptapExtensions = [
	StarterKit.configure({
		code: false, // Disable default code extension (using custom one below)
	}),
	Code.configure({
		HTMLAttributes: {
			class:
				"bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-base font-mono",
		},
	}),
	TextStyle,
	Color,
	Highlight.configure({
		multicolor: true,
	}),
	Underline,
	Link.configure({
		openOnClick: false,
		HTMLAttributes: {
			class: "text-blue-600 underline cursor-pointer",
		},
	}),
	Image.configure({
		HTMLAttributes: {
			class: "max-w-full h-auto rounded-lg",
		},
	}),
	TextAlign.configure({
		types: ["heading", "paragraph"],
	}),
	TaskList,
	TaskItem.configure({
		nested: true,
	}),
	Callout,
];
