export interface OptionItem {
    label: string;
    value: string | number;
}

export interface FormFieldProps {
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
    col?: number;
    step?: number | string;
    hidden?: boolean;
    disabled?: boolean;
    setData?: null | any;
    orientation?: "vertical" | "horizontal";
    className?: string;
}
