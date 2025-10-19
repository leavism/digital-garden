"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
}

export function TiptapEditor({
	content,
	onChange,
	placeholder,
}: TiptapEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					"prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
			},
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className="border rounded-lg overflow-hidden">
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
