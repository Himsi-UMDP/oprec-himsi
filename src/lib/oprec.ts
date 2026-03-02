import { MDP_STUDENT_EMAIL_REGEX } from "@/constans/oprec";
import type { OprecErrors, OprecForm, TimeParts } from "@/constans/oprec.type";

export function formatWIB(d: Date) {
    const text = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Asia/Jakarta",
    }).format(d);
    return `${text} WIB`;
}

export function wordCount(s: string) {
    return s.trim().split(/\s+/).filter(Boolean).length;
}

export function msToParts(ms: number): TimeParts {
    const totalSec = Math.floor(ms / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return { days, hours, minutes, seconds };
}

export function validateOprecForm(next: OprecForm): OprecErrors {
    const e: OprecErrors = {};

    if (!next.nama.trim()) e.nama = "Nama wajib diisi.";
    if (!next.npm.trim()) e.npm = "NPM wajib diisi.";
    else if (!/^\d+$/.test(next.npm.trim())) e.npm = "NPM harus angka saja.";

    if (!next.email.trim()) e.email = "Email wajib diisi.";
    else if (!MDP_STUDENT_EMAIL_REGEX.test(next.email.trim()))
        e.email = "Gunakan email mahasiswa: @mhs.mdp.ac.id";

    if (!next.angkatan) e.angkatan = "Pilih angkatan.";
    if (!next.bidang1) e.bidang1 = "Pilih bidang 1.";
    if (!next.bidang2) e.bidang2 = "Pilih bidang 2.";
    if (next.bidang1 && next.bidang2 && next.bidang1 === next.bidang2)
        e.bidang2 = "Bidang 2 harus berbeda dengan Bidang 1.";

    if (!next.cv) e.cv = "Upload CV wajib.";
    if (wordCount(next.alasan) < 5) e.alasan = "Minimal 5 kata alasan.";

    return e;
}