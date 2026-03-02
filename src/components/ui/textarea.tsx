import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(
                "w-full min-h-[120px] rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold outline-none",
                "focus:ring-2 focus:ring-black/10 disabled:opacity-60",
                className
            )}
            {...props}
        />
    )
);
Textarea.displayName = "Textarea";

export { Textarea };