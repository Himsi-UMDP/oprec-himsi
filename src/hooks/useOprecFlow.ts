import { useEffect, useMemo, useState } from "react";
import { OPREC_ANNOUNCE_AT, OPREC_CLOSE_AT, OPREC_OPEN_AT } from "@/constans/oprec";
import type { OprecPhase } from "@/constans/oprec.type";
import { msToParts } from "@/lib/oprec";

function getPhase(now: Date): OprecPhase {
    const t = now.getTime();
    const open = OPREC_OPEN_AT.getTime();
    const close = OPREC_CLOSE_AT.getTime();
    const announce = OPREC_ANNOUNCE_AT.getTime();

    if (t < open) return "BEFORE_OPEN";
    if (t >= open && t <= close) return "OPEN";
    if (t > close && t < announce) return "AFTER_CLOSE";
    return "ANNOUNCED";
}

export function useOprecFlow() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 1000);
        return () => window.clearInterval(id);
    }, []);

    const phase = useMemo(() => getPhase(now), [now]);

    const target = useMemo(() => {
        if (phase === "BEFORE_OPEN") return OPREC_OPEN_AT;
        if (phase === "AFTER_CLOSE") return OPREC_ANNOUNCE_AT;
        return null;
    }, [phase]);

    const remainingMs = useMemo(() => {
        if (!target) return 0;
        return Math.max(target.getTime() - now.getTime(), 0);
    }, [now, target]);

    const remaining = useMemo(() => msToParts(remainingMs), [remainingMs]);

    return {
        now,
        phase,
        remaining,
        openAt: OPREC_OPEN_AT,
        closeAt: OPREC_CLOSE_AT,
        announceAt: OPREC_ANNOUNCE_AT,
    };
}