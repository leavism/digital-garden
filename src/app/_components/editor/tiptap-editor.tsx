"use client";

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
import { Callout } from "./extensions/callout";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Maximize, Minimize, Monitor, Save, X } from "lucide-react";
import React, { useCallback, useState } from "react";

const extensions = [
	StarterKit.configure({
		code: false, // Disable the default code extension
	}),
	Code.configure({
		HTMLAttributes: {
			class: "bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-base font-mono",
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

function MenuBar({
	editor,
	isExpanded,
	isFullscreen,
	onToggleExpand,
	onToggleFullscreen,
	onSave,
	isSaving
}: {
	editor: Editor;
	isExpanded: boolean;
	isFullscreen: boolean;
	onToggleExpand: () => void;
	onToggleFullscreen: () => void;
	onSave?: () => void;
	isSaving?: boolean;
}) {
	const editorState = useEditorState({
		editor,
		selector: (ctx) => {
			return {
				isBold: ctx.editor.isActive("bold") ?? false,
				canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
				isItalic: ctx.editor.isActive("italic") ?? false,
				canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
				isUnderline: ctx.editor.isActive("underline") ?? false,
				canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
				isStrike: ctx.editor.isActive("strike") ?? false,
				canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
				isCode: ctx.editor.isActive("code") ?? false,
				canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
				isHighlight: ctx.editor.isActive("highlight") ?? false,
				canHighlight: ctx.editor.can().chain().toggleHighlight().run() ?? false,
				canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
				isParagraph: ctx.editor.isActive("paragraph") ?? false,
				isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
				isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
				isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
				isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
				isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
				isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
				isBulletList: ctx.editor.isActive("bulletList") ?? false,
				isOrderedList: ctx.editor.isActive("orderedList") ?? false,
				isTaskList: ctx.editor.isActive("taskList") ?? false,
				isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
				isBlockquote: ctx.editor.isActive("blockquote") ?? false,
				isLink: ctx.editor.isActive("link") ?? false,
				isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
				isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
				isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
				isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
				isCallout: ctx.editor.isActive("callout") ?? false,
				isCalloutInfo: ctx.editor.isActive("callout", { variant: "info" }) ?? false,
				isCalloutWarning: ctx.editor.isActive("callout", { variant: "warning" }) ?? false,
				isCalloutSuccess: ctx.editor.isActive("callout", { variant: "success" }) ?? false,
				canUndo: ctx.editor.can().chain().undo().run() ?? false,
				canRedo: ctx.editor.can().chain().redo().run() ?? false,
			};
		},
	});

	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}

		// update link
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	}, [editor]);

	const addImage = useCallback(() => {
		const url = window.prompt("Image URL");

		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}, [editor]);

	const toggleCallout = useCallback((variant: 'info' | 'warning' | 'success') => {
		const title = window.prompt(`${variant.charAt(0).toUpperCase() + variant.slice(1)} callout title:`,
			variant === 'info' ? 'Note' :
			variant === 'warning' ? 'Warning' :
			'Success');

		if (title !== null) {
			editor.chain().focus().toggleCallout({ variant, title }).run();
		}
	}, [editor]);

	return (
		<div className="flex flex-wrap gap-2 border-b p-3 justify-between">
			<div className="flex flex-wrap gap-2">
			{/* Text Formatting */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editorState.canBold}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50 ${
						editorState.isBold
							? "bg-primary text-primary-foreground hover:bg-primary font-bold"
							: ""
					}`}
				>
					Bold
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editorState.canItalic}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50 ${
						editorState.isItalic
							? "bg-primary text-primary-foreground hover:bg-primary italic"
							: ""
					}`}
				>
					Italic
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					disabled={!editorState.canUnderline}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50 ${
						editorState.isUnderline
							? "bg-primary text-primary-foreground hover:bg-primary underline"
							: ""
					}`}
				>
					Underline
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editorState.canStrike}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50 ${
						editorState.isStrike
							? "bg-primary text-primary-foreground hover:bg-primary line-through"
							: ""
					}`}
				>
					Strike
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleCode().run()}
					disabled={!editorState.canCode}
					className={`rounded border px-3 py-1 font-mono text-sm hover:bg-accent disabled:opacity-50 ${
						editorState.isCode
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					Code
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleHighlight().run()}
					disabled={!editorState.canHighlight}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50 ${
						editorState.isHighlight
							? "bg-primary text-primary-foreground hover:bg-primary bg-yellow-200"
							: ""
					}`}
				>
					Highlight
				</button>
			</div>

			<div className="w-px bg-border" />

			{/* Headings */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isParagraph
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					P
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={`rounded border px-3 py-1 font-bold text-sm hover:bg-accent ${
						editorState.isHeading1
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					H1
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={`rounded border px-3 py-1 font-bold text-sm hover:bg-accent ${
						editorState.isHeading2
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					H2
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={`rounded border px-3 py-1 font-semibold text-sm hover:bg-accent ${
						editorState.isHeading3
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					H3
				</button>
			</div>

			<div className="w-px bg-border" />

			{/* Text Alignment */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isAlignLeft
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					Left
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isAlignCenter
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					Center
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isAlignRight
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					Right
				</button>
			</div>

			<div className="w-px bg-border" />

			{/* Lists */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isBulletList
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					• List
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isOrderedList
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					1. List
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleTaskList().run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isTaskList
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					☑ Tasks
				</button>
			</div>

			<div className="w-px bg-border" />

			{/* Media & Links */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={setLink}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isLink
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					Link
				</button>
				<button
					type="button"
					onClick={addImage}
					className="rounded border px-3 py-1 text-sm hover:bg-accent"
				>
					Image
				</button>
			</div>

			<div className="w-px bg-border" />

			{/* Blocks */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={`rounded border px-3 py-1 font-mono text-sm hover:bg-accent ${
						editorState.isCodeBlock
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					Code
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isBlockquote
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					Quote
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
					className="rounded border px-3 py-1 text-sm hover:bg-accent"
				>
					HR
				</button>
			</div>

			<div className="w-px bg-border" />

			{/* Callouts */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => toggleCallout('info')}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isCalloutInfo
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					ℹ️ Info
				</button>
				<button
					type="button"
					onClick={() => toggleCallout('warning')}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isCalloutWarning
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					⚠️ Warning
				</button>
				<button
					type="button"
					onClick={() => toggleCallout('success')}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent ${
						editorState.isCalloutSuccess
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
				>
					✅ Success
				</button>
			</div>

			<div className="w-px bg-border" />

			{/* Actions */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editorState.canUndo}
					className="rounded border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50"
				>
					Undo
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editorState.canRedo}
					className="rounded border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50"
				>
					Redo
				</button>
			</div>
			</div>

			{/* Controls */}
			<div className="flex gap-1">
				{/* Save button - visible in focus/fullscreen modes */}
				{(isExpanded || isFullscreen) && onSave && (
					<button
						type="button"
						onClick={onSave}
						disabled={isSaving}
						className="rounded border px-3 py-1 text-sm hover:bg-accent transition-colors bg-primary text-primary-foreground hover:bg-primary disabled:opacity-50"
						title={isSaving ? "Saving..." : "Save post"}
					>
						<Save className="h-4 w-4" />
					</button>
				)}

				{/* Focus mode button - disabled in fullscreen */}
				<button
					type="button"
					onClick={onToggleExpand}
					disabled={isFullscreen}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
						isExpanded
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
					title={
						isFullscreen
							? "Exit fullscreen to use focus mode"
							: isExpanded
								? "Exit focus mode"
								: "Focus mode (hide sidebar)"
					}
				>
					{isExpanded ? <Minimize className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
				</button>

				{/* Fullscreen button */}
				<button
					type="button"
					onClick={onToggleFullscreen}
					className={`rounded border px-3 py-1 text-sm hover:bg-accent transition-colors ${
						isFullscreen
							? "bg-primary text-primary-foreground hover:bg-primary"
							: ""
					}`}
					title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
				>
					{isFullscreen ? <X className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
				</button>
			</div>
		</div>
	);
}

interface TiptapEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
	onExpandChange?: (isExpanded: boolean, isFullscreen: boolean) => void;
	onSave?: () => void;
	isSaving?: boolean;
}

export function TiptapEditor({
	content,
	onChange,
	placeholder,
	onExpandChange,
	onSave,
	isSaving,
}: TiptapEditorProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const handleToggleExpand = () => {
		const newExpanded = !isExpanded;
		setIsExpanded(newExpanded);
		onExpandChange?.(newExpanded, isFullscreen);
	};

	const handleToggleFullscreen = () => {
		const newFullscreen = !isFullscreen;
		setIsFullscreen(newFullscreen);
		onExpandChange?.(isExpanded, newFullscreen);
	};
	const editor = useEditor({
		extensions,
		content: content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					`prose prose-stone prose-sm sm:prose-base lg:prose-lg xl:prose-xl m-5 focus:outline-none ${
						(isExpanded || isFullscreen) ? "mx-auto" : ""
					}`,
			},
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className={`overflow-hidden rounded-lg border ${
			isFullscreen
				? "fixed inset-0 z-50 bg-background rounded-none"
				: ""
		}`}>
			<MenuBar
				editor={editor}
				isExpanded={isExpanded}
				isFullscreen={isFullscreen}
				onToggleExpand={handleToggleExpand}
				onToggleFullscreen={handleToggleFullscreen}
				onSave={onSave}
				isSaving={isSaving}
			/>
			<div className="relative">
				<EditorContent
					editor={editor}
					className={`overflow-y-auto ${
						isFullscreen
							? "h-[calc(100vh-60px)] min-h-0"
							: "max-h-[600px] min-h-[1000px]"
					}`}
				/>
				{!content && placeholder && (
					<div className="pointer-events-none absolute top-4 left-4 text-muted-foreground">
						{placeholder}
					</div>
				)}
			</div>
		</div>
	);
}
