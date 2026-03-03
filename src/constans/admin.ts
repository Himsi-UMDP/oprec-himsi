import type { PendaftaranRow } from "@/lib/supabase";

export type StatusFilter = "semua" | PendaftaranRow["status"];
export type BidangFilter = "semua" | string;

export type BidangStat = {
    name: string;
    count: number;
    color: string;
    bg: string;
    icon: string;
};

export type DashboardStats = {
    total: number;
    diterima: number;
    ditolak: number;
    pending: number;
    perBidang: BidangStat[];
};