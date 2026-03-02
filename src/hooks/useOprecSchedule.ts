import { useEffect, useMemo, useState } from "react";
import { OPREC_ANNOUNCE_AT, OPREC_CLOSE_AT, OPREC_OPEN_AT } from "@/constans/oprec";

export type OprecPhase = "BEFORE_OPEN" | "OPEN" | "AFTER_CLOSE" | "ANNOUNCED";

export type TimeParts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function msToParts(ms: number): TimeParts {
    const totalSec = Math.floor(ms / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return { days, hours, minutes, seconds };
}

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

export function useOprecSchedule() {
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
        target,
        remainingMs,
        remaining,
        openAt: OPREC_OPEN_AT,
        closeAt: OPREC_CLOSE_AT,
        announceAt: OPREC_ANNOUNCE_AT,
    };
}