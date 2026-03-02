import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => (
        <input
            ref={ref}
            type={type}
            className={cn(
                "flex h-11 w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold outline-none",
                "focus:ring-2 focus:ring-black/10 disabled:opacity-60",
                className
            )}
            {...props}
        />
    )
);
Input.displayName = "Input";

export { Input };