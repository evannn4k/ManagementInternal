import { cn, colSpan } from "@/lib/utils";
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

export default function FormField({
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
    col = 1,
    step = 1,
    hidden = false,
    disabled = false,
    setData = null,
    orientation = "vertical",
    className,
}: FormFieldProps) {
    if (hidden) return null;

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
                    />
                );
            case "radio-group":
                const stringValue =
                    value === true
                        ? "1"
                        : value === false
                          ? "0"
                          : value !== undefined && value !== null
                            ? String(value)
                            : "";
                return (
                    <RadioGroup
                        aria-invalid={Boolean(error)}
                        id={name}
                        onValueChange={(value) => {
                            const parsedValue = value === "1" ? 1 : 0;
                            setData((data: any) => ({
                                ...data,
                                [name]: parsedValue,
                            }));
                        }}
                        value={stringValue}
                        disabled={disabled}
                        className={
                            orientation === "horizontal"
                                ? "grid grid-cols-2 gap-4"
                                : "flex flex-col gap-2"
                        }
                    >
                        {options.map((option) => {
                            const optionValStr = String(option.value);
                            return (
                                <FieldLabel
                                    htmlFor={optionValStr}
                                    key={optionValStr}
                                >
                                    <Field
                                        className="!m-0 !p-2"
                                        orientation="horizontal"
                                    >
                                        <FieldContent>
                                            <FieldTitle>
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
            <FieldLabel htmlFor="name">
                {label}
                {required && <span className="text-destructive">*</span>}
            </FieldLabel>
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
