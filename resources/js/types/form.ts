import { LucideIcon } from "lucide-react";

export interface OptionItem {
    label: string;
    value: string | number;
    className?: string;
}

export interface FormFieldProps {
    icon?: LucideIcon;
    label: string;
    name: string;
    type?: string;
    description?: string;
    value?: any;
    onChange?: (e: any) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    options?: OptionItem[];
    min?: string;
    cols?: number;
    col?: number;
    step?: number | string;
    hidden?: boolean;
    disabled?: boolean;
    setData?: null | any;
    orientation?: string;
    className?: string;
}
