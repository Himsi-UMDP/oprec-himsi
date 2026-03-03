// export const OPREC_OPEN_AT = new Date("2026-03-03T15:00:00+07:00"); 
// export const OPREC_CLOSE_AT = new Date("2026-03-14T23:59:00+07:00"); 
// export const OPREC_ANNOUNCE_AT = new Date("2026-03-16T19:00:00+07:00");

export const OPREC_OPEN_AT = new Date(Date.now() - 60_000); // sudah lewat 1 menit => OPEN
export const OPREC_CLOSE_AT = new Date(Date.now() + 60 * 60_000); // tutup 1 jam lagi
export const OPREC_ANNOUNCE_AT = new Date(Date.now() + 2 * 60 * 60_000); // pengumuman 2 jam lagi

// export const OPREC_OPEN_AT = new Date(Date.now() - 2 * 60 * 60_000);     // 2 jam lalu (sudah OPEN)
// export const OPREC_CLOSE_AT = new Date(Date.now() - 10 * 60_000);        // 10 menit lalu (sudah CLOSE)
// export const OPREC_ANNOUNCE_AT = new Date(Date.now() + 60 * 60_000);     // 1 jam lagi (belum announce)

export const ANGKATAN_OPTIONS = ["2024", "2025"] as const;

export const BIDANG_OPTIONS = ["PSDM", "Sosial", "Kominfo", "Litbang"] as const;

export const MDP_STUDENT_EMAIL_REGEX = /^[A-Z0-9._%+-]+@mhs\.mdp\.ac\.id$/i;