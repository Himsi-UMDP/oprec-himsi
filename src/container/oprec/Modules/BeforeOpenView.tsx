import Countdown from "@/components/Countdown";
import type { TimeParts } from "@/constans/oprec.type";
import { formatWIB } from "@/lib/oprec";

export default function BeforeOpenView({
    openAt,
    remaining,
}: {
    openAt: Date;
    remaining: TimeParts;
}) {
    return (
        <div className="space-y-5 text-center">
            <p className="text-xl font-semibold">Pendaftaran belum dibuka</p>
            <p className="font-semibold text-foreground/70">
                Dibuka pada: <span className="font-semibold">{formatWIB(openAt)}</span>
            </p>

            <Countdown label="Menuju pembukaan pendaftaran" parts={remaining} />
        </div>
    );
}