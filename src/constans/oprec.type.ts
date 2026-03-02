import type { ANGKATAN_OPTIONS, BIDANG_OPTIONS } from "./oprec";

export type OprecPhase = "BEFORE_OPEN" | "OPEN" | "AFTER_CLOSE" | "ANNOUNCED";

export type Bidang = (typeof BIDANG_OPTIONS)[number];
export type Angkatan = (typeof ANGKATAN_OPTIONS)[number];

export type OprecForm = {
    nama: string;
    npm: string;
    email: string;
    angkatan: Angkatan | "";
    bidang1: Bidang | "";
    bidang2: Bidang | "";
    cv: File | null;
    alasan: string;
};

export type OprecErrors = Partial<Record<keyof OprecForm, string>>;

export type TimeParts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};