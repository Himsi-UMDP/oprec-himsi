import Countdown from "@/components/Countdown";
import type { TimeParts } from "@/constans/oprec.type";
import { formatWIB } from "@/lib/oprec";

export default function AfterCloseView({
    announceAt,
    remaining,
}: {
    announceAt: Date;
    remaining: TimeParts;
}) {
    return (
        <div className="space-y-5 text-center">
            <p className="text-xl font-semibold">Pendaftaran ditutup</p>
            <p className="font-semibold text-foreground/70">
                Pengumuman pada:{" "}
                <span className="font-semibold">{formatWIB(announceAt)}</span>
            </p>

            <Countdown label="" parts={remaining} />

            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 text-left">
                <p className="font-semibold">Catatan</p>
                <p className="text-sm font-semibold text-foreground/70 mt-1">
                    Informasi hasil seleksi akan diumumkan melalui kanal resmi panitia.
                </p>
            </div>
        </div>
    );
}