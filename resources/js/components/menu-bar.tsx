import { Editor, useEditorState } from "@tiptap/react";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";

export function MenuBar({ editor }: { editor: Editor }) {
    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                // Text formatting
                isBold: ctx.editor.isActive("bold") ?? false,
                isItalic: ctx.editor.isActive("italic") ?? false,
                isStrike: ctx.editor.isActive("strike") ?? false,
                isHighlight: ctx.editor.isActive("highlight") ?? false,

                // Text alignment
                isAlignLeft:
                    ctx.editor.isActive({ textAlign: "left" }) ?? false,
                isAlignCenter:
                    ctx.editor.isActive({ textAlign: "center" }) ?? false,
                isAlignRight:
                    ctx.editor.isActive({ textAlign: "right" }) ?? false,
                isAlignJustify:
                    ctx.editor.isActive({ textAlign: "justify" }) ?? false,

                // Block types
                isParagraph: ctx.editor.isActive("paragraph") ?? false,
                isHeading1:
                    ctx.editor.isActive("heading", { level: 1 }) ?? false,
                isHeading2:
                    ctx.editor.isActive("heading", { level: 2 }) ?? false,
                isHeading3:
                    ctx.editor.isActive("heading", { level: 3 }) ?? false,
            };
        },
    });

    if (!editor) {
        return null;
    }

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            preesed: editor.isActive("highlight"),
        },
    ];

    return (
        <Card className="p-1 rounded-lg bg-input dark:bg-input/30">
            <CardContent className="p-0">
                {Options.map((option, i) => (
                    <Toggle
                        key={i}
                        pressed={option.preesed}
                        onPressedChange={option.onClick}
                    >
                        {option.icon}
                    </Toggle>
                ))}
            </CardContent>
        </Card>
    );
}
