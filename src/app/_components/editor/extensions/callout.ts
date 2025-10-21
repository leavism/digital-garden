import { Node, mergeAttributes } from "@tiptap/core";

export interface CalloutOptions {
	HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		callout: {
			/**
			 * Set a callout
			 */
			setCallout: (attributes?: {
				variant?: "info" | "warning" | "success";
				title?: string;
			}) => ReturnType;
			/**
			 * Toggle a callout
			 */
			toggleCallout: (attributes?: {
				variant?: "info" | "warning" | "success";
				title?: string;
			}) => ReturnType;
			/**
			 * Unset a callout
			 */
			unsetCallout: () => ReturnType;
		};
	}
}

export const Callout = Node.create<CalloutOptions>({
	name: "callout",

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	group: "block",

	content: "block+",

	defining: true,

	addAttributes() {
		return {
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

	parseHTML() {
		return [
			{
				tag: "div[data-callout]",
			},
		];
	},

	renderHTML({ HTMLAttributes, node }) {
		const variant = node.attrs.variant || "info";
		const title = node.attrs.title || "Note";

		// Map variants to CSS classes that match your Callout component
		const variantClasses = {
			info: "bg-callout-info-bg border-callout-info-main text-callout-info-main",
			warning:
				"bg-callout-warning-bg border-callout-warning-main text-callout-warning-main",
			success:
				"bg-callout-success-bg border-callout-success-main text-callout-success-main",
		};

		// Correct Lucide icon paths
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

	addKeyboardShortcuts() {
		return {
			"Mod-Shift-c": () => this.editor.commands.toggleCallout(),
		};
	},
});
