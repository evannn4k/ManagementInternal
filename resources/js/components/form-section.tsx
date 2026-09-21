import { cn, colMapping, gapMapping } from "@/lib/utils";
import { FieldGroup } from "@/components/ui/field";
import * as React from "react";

export default function FormSection({
    children,
    col = 1,
    gap = 4,
    className = "",
}: {
    children: React.ReactNode;
    col?: number;
    gap?: number;
    className?: string;
}) {
    return (
        <FieldGroup
            className={cn(
                "grid grid-cols-1 ",
                colMapping[col],
                gapMapping[gap],
                className,
            )}
        >
            {children}
        </FieldGroup>
    );
}
