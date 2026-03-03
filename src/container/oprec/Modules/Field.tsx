import { Label } from "@/components/ui/label";

export default function Field({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    const errorId = `${id}-error`;

    return (
        <div className="space-y-2 text-left">
            <Label htmlFor={id}>{label}</Label>

            <div aria-describedby={error ? errorId : undefined}>{children}</div>

            {error ? (
                <p id={errorId} className="text-sm font-sm text-destructive">
                    {error}
                </p>
            ) : null}
        </div>
    );
}