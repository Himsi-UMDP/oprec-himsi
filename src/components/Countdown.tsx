import type { TimeParts } from "@/constans/oprec.type";
import { cn } from "@/lib/utils";

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

export default function Countdown({
    label,
    parts,
    className,
}: {
    label: string;
    parts: TimeParts;
    className?: string;
}) {
    return (
        <div className={cn("space-y-3", className)}>
            <p className="text-sm font-semibold text-foreground/70">{label}</p>

            <div className="grid grid-cols-4 gap-3">
                <Box title="Hari" value={pad2(parts.days)} />
                <Box title="Jam" value={pad2(parts.hours)} />
                <Box title="Menit" value={pad2(parts.minutes)} />
                <Box title="Detik" value={pad2(parts.seconds)} />
            </div>
        </div>
    );
}

function Box({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-md px-3 py-3 text-center">
            <div className="text-2xl font-extrabold tracking-tight">{value}</div>
            <div className="text-xs font-semibold text-foreground/60">{title}</div>
        </div>
    );
}