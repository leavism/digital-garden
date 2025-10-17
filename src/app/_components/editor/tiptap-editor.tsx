"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/app/_components/ui/button";
import {
	Bold,
	Italic,
	Strikethrough,
	List,
	ListOrdered,
	Quote,
	Undo,
	Redo,
	Code,
	Heading1,
	Heading2,
	Heading3,
} from "lucide-react";

interface TiptapEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
}

export function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[300px] p-4",
			},
		},
	});

	if (!editor) {
		return null;
	}

	const ToolbarButton = ({
		onClick,
		isActive,
		children,
		title
	}: {
		onClick: () => void;
		isActive?: boolean;
		children: React.ReactNode;
		title: string;
	}) => (
		<Button
			type="button"
			variant={isActive ? "default" : "ghost"}
			size="sm"
			onClick={onClick}
			title={title}
			className="h-8 w-8 p-0"
		>
			{children}
		</Button>
	);

	return (
		<div className="border rounded-lg overflow-hidden">
			{/* Toolbar */}
			<div className="border-b bg-muted/20 p-2 flex items-center gap-1 flex-wrap">
				{/* Text Formatting */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBold().run()}
						isActive={editor.isActive("bold")}
						title="Bold"
					>
						<Bold className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleItalic().run()}
						isActive={editor.isActive("italic")}
						title="Italic"
					>
						<Italic className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleStrike().run()}
						isActive={editor.isActive("strike")}
						title="Strikethrough"
					>
						<Strikethrough className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleCode().run()}
						isActive={editor.isActive("code")}
						title="Inline Code"
					>
						<Code className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* Headings */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						isActive={editor.isActive("heading", { level: 1 })}
						title="Heading 1"
					>
						<Heading1 className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						isActive={editor.isActive("heading", { level: 2 })}
						title="Heading 2"
					>
						<Heading2 className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						isActive={editor.isActive("heading", { level: 3 })}
						title="Heading 3"
					>
						<Heading3 className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* Lists */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						isActive={editor.isActive("bulletList")}
						title="Bullet List"
					>
						<List className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						isActive={editor.isActive("orderedList")}
						title="Numbered List"
					>
						<ListOrdered className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						isActive={editor.isActive("blockquote")}
						title="Blockquote"
					>
						<Quote className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* History */}
				<div className="flex items-center gap-1">
					<ToolbarButton
						onClick={() => editor.chain().focus().undo().run()}
						title="Undo"
					>
						<Undo className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().redo().run()}
						title="Redo"
					>
						<Redo className="h-4 w-4" />
					</ToolbarButton>
				</div>
			</div>

			{/* Editor Content */}
			<div className="relative">
				<EditorContent
					editor={editor}
					className="min-h-[300px] max-h-[600px] overflow-y-auto"
				/>
				{!content && placeholder && (
					<div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">
						{placeholder}
					</div>
				)}
			</div>
		</div>
	);
}