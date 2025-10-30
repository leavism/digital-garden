/**
 * Tiptap Callout Extension
 *
 * Custom block-level node for creating highlighted callout boxes.
 * Useful for emphasizing important information, warnings, or tips within content.
 *
 * Features:
 * - Three variants: info (blue), warning (yellow), success (green)
 * - Customizable title text
 * - Lucide icons rendered inline (no external dependencies)
 * - Dashed border styling with background colors
 * - Keyboard shortcut: Cmd/Ctrl + Shift + C
 *
 * Usage in editor:
 * ```ts
 * editor.commands.setCallout({ variant: "warning", title: "Important" })
 * editor.commands.toggleCallout({ variant: "success" })
 * editor.commands.unsetCallout()
 * ```
 *
 * HTML Structure:
 * ```html
 * <div data-callout data-variant="info" data-title="Note">
 *   <div class="mb-3 flex items-center gap-3">
 *     <svg>...</svg>
 *     <h3>Note</h3>
 *   </div>
 *   <div class="callout-content">
 *     Content goes here...
 *   </div>
 * </div>
 * ```
 *
 * @see https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing
 */

import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Configuration options for the Callout extension
 */
export interface CalloutOptions {
	/** Additional HTML attributes to apply to the callout container */
	HTMLAttributes: Record<string, unknown>;
}

/**
 * Extend Tiptap's command interface with callout commands
 */
declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		callout: {
			/**
			 * Wrap selected content in a callout block
			 *
			 * @param attributes - Optional callout configuration
			 * @param attributes.variant - Style variant (info/warning/success)
			 * @param attributes.title - Custom title text
			 *
			 * @example
			 * editor.commands.setCallout({ variant: "warning", title: "Caution" })
			 */
			setCallout: (attributes?: {
				variant?: "info" | "warning" | "success";
				title?: string;
			}) => ReturnType;

			/**
			 * Toggle callout on/off for selected content
			 *
			 * If content is already in a callout, removes it.
			 * If not, wraps it in a callout.
			 *
			 * @param attributes - Optional callout configuration
			 *
			 * @example
			 * editor.commands.toggleCallout({ variant: "success" })
			 */
			toggleCallout: (attributes?: {
				variant?: "info" | "warning" | "success";
				title?: string;
			}) => ReturnType;

			/**
			 * Remove callout formatting from selected content
			 *
			 * @example
			 * editor.commands.unsetCallout()
			 */
			unsetCallout: () => ReturnType;
		};
	}
}

/**
 * Callout Node Extension
 *
 * Creates a custom Tiptap node for callout boxes with variants and titles.
 */
export const Callout = Node.create<CalloutOptions>({
	/** Node name used in Tiptap schema */
	name: "callout",

	/**
	 * Default options for the extension
	 */
	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	/** Treat as block-level element */
	group: "block",

	/** Can contain one or more block-level elements */
	content: "block+",

	/** Prevents splitting across multiple callouts */
	defining: true,

	/**
	 * Define node attributes
	 * Attributes are stored in the Tiptap document and rendered to HTML
	 */
	addAttributes() {
		return {
			/**
			 * Callout variant - determines color scheme and icon
			 * Stored as data-variant attribute
			 */
			variant: {
				default: "info",
				parseHTML: (element) => element.getAttribute("data-variant"),
				renderHTML: (attributes) => {
					if (!attributes.variant) {
						return {};
					}
					return {
						"data-variant": attributes.variant,
					};
				},
			},
			/**
			 * Callout title - displayed as heading
			 * Stored as data-title attribute
			 */
			title: {
				default: "Note",
				parseHTML: (element) => element.getAttribute("data-title"),
				renderHTML: (attributes) => {
					if (!attributes.title) {
						return {};
					}
					return {
						"data-title": attributes.title,
					};
				},
			},
		};
	},

	/**
	 * Define HTML structure that should be parsed as callout
	 * Looks for div elements with data-callout attribute
	 */
	parseHTML() {
		return [
			{
				tag: "div[data-callout]",
			},
		];
	},

	/**
	 * Render callout node to HTML
	 *
	 * Generates complete HTML structure including:
	 * - Container div with variant styling
	 * - Header with icon and title
	 * - Content area for nested blocks
	 *
	 * Icons are embedded as inline SVG (Lucide icons) to avoid external dependencies.
	 */
	renderHTML({ HTMLAttributes, node }) {
		const variant = node.attrs.variant || "info";
		const title = node.attrs.title || "Note";

		/**
		 * Variant-specific CSS classes
		 * Uses Tailwind CSS custom colors defined in theme config
		 */
		const variantClasses = {
			info: "bg-callout-info-bg border-callout-info-main text-callout-info-main",
			warning:
				"bg-callout-warning-bg border-callout-warning-main text-callout-warning-main",
			success:
				"bg-callout-success-bg border-callout-success-main text-callout-success-main",
		};

		/**
		 * Generate inline SVG icon based on variant
		 *
		 * Returns Tiptap's renderHTML format (array notation) for SVG elements.
		 * Icons are from Lucide icon set, embedded directly to avoid dependencies.
		 *
		 * @param variant - Callout variant (info/warning/success)
		 * @returns Array representation of SVG element
		 */
		const getIconElement = (variant: string) => {
			switch (variant) {
				case "info":
					return [
						"svg",
						{
							xmlns: "http://www.w3.org/2000/svg",
							width: "24",
							height: "24",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							class: "lucide lucide-info h-6 w-6",
						},
						["circle", { cx: "12", cy: "12", r: "10" }],
						["path", { d: "M12 16v-4" }],
						["path", { d: "M12 8h.01" }],
					];
				case "warning":
					return [
						"svg",
						{
							xmlns: "http://www.w3.org/2000/svg",
							width: "24",
							height: "24",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							class: "lucide lucide-triangle-alert h-6 w-6",
						},
						[
							"path",
							{
								d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
							},
						],
						["path", { d: "M12 9v4" }],
						["path", { d: "M12 17h.01" }],
					];
				case "success":
					return [
						"svg",
						{
							xmlns: "http://www.w3.org/2000/svg",
							width: "24",
							height: "24",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							class: "lucide lucide-circle-check-big h-6 w-6",
						},
						["path", { d: "M21.801 10A10 10 0 1 1 17 3.335" }],
						["path", { d: "m9 11 3 3L22 4" }],
					];
				default:
					return getIconElement("info");
			}
		};

		return [
			"div",
			mergeAttributes(
				{
					"data-callout": "",
					"data-variant": variant,
					"data-title": title,
					class: `not-prose my-6 rounded-lg border-2 border-dashed p-6 ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.info}`,
				},
				this.options.HTMLAttributes,
				HTMLAttributes,
			),
			[
				"div",
				{ class: "mb-3 flex items-center gap-3" },
				["div", { class: "flex-shrink-0" }, getIconElement(variant)],
				["h3", { class: "font-semibold text-lg" }, title],
			],
			[
				"div",
				{ class: "leading-relaxed callout-content" },
				0, // This is where the content will be inserted
			],
		];
	},

	/**
	 * Define editor commands for manipulating callouts
	 */
	addCommands() {
		return {
			setCallout:
				(attributes) =>
				({ commands }) => {
					return commands.wrapIn(this.name, attributes);
				},
			toggleCallout:
				(attributes) =>
				({ commands }) => {
					return commands.toggleWrap(this.name, attributes);
				},
			unsetCallout:
				() =>
				({ commands }) => {
					return commands.lift(this.name);
				},
		};
	},

	/**
	 * Keyboard shortcuts for callout commands
	 *
	 * - Cmd/Ctrl + Shift + C: Toggle callout on/off
	 */
	addKeyboardShortcuts() {
		return {
			"Mod-Shift-c": () => this.editor.commands.toggleCallout(),
		};
	},
});
