import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "border-primary/30 bg-primary/10 text-primary dark:bg-primary/20 dark:border-primary/40 [a&]:hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                outline:
                    "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                destructive:
                    "border-destructive/30 bg-destructive/10 text-destructive dark:bg-destructive/20 dark:border-destructive/40 [a&]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
                green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20 dark:border-emerald-500/40 [a&]:hover:bg-emerald-500/20 focus-visible:ring-emerald-500/20 dark:focus-visible:ring-emerald-500/40",
                yellow: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20 dark:border-amber-500/40 [a&]:hover:bg-amber-500/20 focus-visible:ring-amber-500/20 dark:focus-visible:ring-amber-500/40",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

function Badge({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
