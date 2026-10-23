import { cn, colSpan, gridCols } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldTitle,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormFieldProps } from "@/types/form";
import { EditorContent, useEditor } from "@tiptap/react";
import { MenuBar } from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Button } from "./ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Plus } from "lucide-react";

export default function FormField({
    icon: Icon,
    label,
    name,
    type = "text",
    description,
    value,
    onChange,
    error,
    required = false,
    placeholder = "",
    options = [],
    max,
    min,
    cols = 2,
    col = 1,
    step = 1,
    hidden = false,
    disabled = false,
    setData = null,
    orientation = "vertical",
    className,
}: FormFieldProps) {
    if (hidden) return null;
    const [open, setOpen] = useState(false);

    const renderInput = () => {
        switch (type) {
            case "text":
            case "time":
            case "datetime-local":
            case "password":
            case "email":
            case "file":
            case "date":
                return (
                    <Input
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        type={type}
                        disabled={disabled}
                        max={max}
                        min={min}
                    />
                );
            case "number":
                return (
                    <Input
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        type={type}
                        step={step}
                        disabled={disabled}
                    />
                );
            case "select":
                return (
                    <NativeSelect
                        aria-invalid={Boolean(error)}
                        id={name}
                        onChange={onChange}
                        value={value}
                        disabled={disabled}
                    >
                        <NativeSelectOption value="" disabled>
                            {placeholder}
                        </NativeSelectOption>
                        {options.map((option, i) => (
                            <NativeSelectOption key={i} value={option.value}>
                                {option.label}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                );
            case "textarea":
                return (
                    <Textarea
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        disabled={disabled}
                        rows={3}
                    />
                );
            case "search":
                return (
                    <>
                        <Button
                            aria-invalid={Boolean(error)}
                            className={cn(className, "!justify-start")}
                            type="button"
                            variant="input"
                            onClick={() => setOpen(true)}
                        >
                            <Plus /> {value?.label ? value?.label : placeholder}
                        </Button>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger />
                            <PopoverContent
                                align="end"
                                className="p-0 bg-transparent border-none"
                            >
                                <Command className="rounded-lg border">
                                    <CommandInput placeholder="Pilih nama atau posisi" />
                                    <CommandList>
                                        <CommandEmpty>
                                            Tidak ada data.
                                        </CommandEmpty>
                                        {options.length > 1 && (
                                            <CommandGroup heading={name}>
                                                {options.map((option) => (
                                                    <CommandItem
                                                        key={option.value}
                                                        value={
                                                            option.label as string
                                                        }
                                                        onSelect={(val) => {
                                                            setOpen(false);
                                                            setData(option);
                                                        }}
                                                    >
                                                        {option.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        )}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </>
                );
            case "radio-group":
                const stringValue =
                    value !== undefined && value !== null ? String(value) : "";

                return (
                    <RadioGroup
                        aria-invalid={Boolean(error)}
                        id={name}
                        onValueChange={(selectedVal) => {
                            const matchedOption = options.find(
                                (opt) => String(opt.value) === selectedVal,
                            );

                            const parsedValue = matchedOption
                                ? matchedOption.value
                                : selectedVal;

                            setData((data: any) => ({
                                ...data,
                                [name]: parsedValue,
                            }));
                        }}
                        value={stringValue}
                        disabled={disabled}
                        className={
                            orientation === "horizontal"
                                ? `grid gap-4 ${gridCols[cols]}`
                                : "flex flex-col gap-2"
                        }
                    >
                        {options.map((option) => {
                            const optionValStr = String(option.value);
                            return (
                                <FieldLabel
                                    htmlFor={optionValStr}
                                    key={optionValStr}
                                    className={cn(
                                        option.className,
                                        "bg-muted/50 bg-background dark:bg-input/30",
                                    )}
                                >
                                    <Field
                                        className="!m-0 !p-2"
                                        orientation="horizontal"
                                    >
                                        <FieldContent>
                                            <FieldTitle className="capitalize">
                                                {option.label}
                                            </FieldTitle>
                                        </FieldContent>
                                        <RadioGroupItem
                                            className="hidden"
                                            value={optionValStr}
                                            id={optionValStr}
                                        />
                                    </Field>
                                </FieldLabel>
                            );
                        })}
                    </RadioGroup>
                );
            case "rich-editor":
                const editor = useEditor({
                    extensions: [
                        StarterKit.configure({
                            bulletList: {
                                HTMLAttributes: {
                                    class: "list-disc ml-4",
                                },
                            },
                            orderedList: {
                                HTMLAttributes: {
                                    class: "list-decimal ml-4",
                                },
                            },
                        }),
                        TextAlign.configure({
                            types: ["heading", "paragraph"],
                        }),
                        Highlight,
                    ],
                    content: value ?? "",
                    editorProps: {
                        attributes: {
                            class: "min-h-34 w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
                        },
                    },
                    onUpdate: ({ editor }) => {
                        setData((prev: {}) => ({
                            ...prev,
                            [name]: editor.getHTML(),
                        }));
                    },
                });

                return (
                    <div className="flex flex-col gap-2">
                        <MenuBar editor={editor} />
                        <EditorContent editor={editor} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Field
            className={cn(
                "flex flex-col gap-2 col-span-1",
                colSpan[col],
                className,
            )}
            data-invalid={Boolean(error)}
        >
            {label && (
                <FieldLabel
                    htmlFor="name"
                    className="flex items-center gap-2 capitalize"
                >
                    {Icon && <Icon className="size-4" />}
                    {label}
                    {required && <span className="text-destructive">*</span>}
                </FieldLabel>
            )}

            {renderInput()}

            {error ? (
                <FieldError>{error}</FieldError>
            ) : (
                description && (
                    <FieldDescription>{description}</FieldDescription>
                )
            )}
        </Field>
    );
}
