import { supabase } from "@/lib/supabase";
import type { PendaftaranRow } from "@/lib/supabase";

export type PendaftaranInsert = {
    nama: string;
    npm: string;
    email: string;
    angkatan: string;
    bidang1: string;
    bidang2: string;
    cv_url: string | null;
    alasan: string;
    status?: PendaftaranRow["status"];
};

const BUCKET = "cv-pendaftar";

export async function uploadCV(file: File, npm: string): Promise<string> {
    const ext = file.name.split(".").pop() || "pdf";
    const timestamp = Date.now();
    const filePath = `cv/${npm}-${timestamp}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
        contentType: file.type || "application/pdf",
        upsert: false,
    });

    if (error) throw new Error(`Gagal upload CV: ${error.message}`);
    return filePath;
}

export async function submitPendaftaran(payload: PendaftaranInsert): Promise<void> {
    const { error } = await supabase.from("pendaftaran").insert(payload);
    if (error) throw new Error(`Gagal menyimpan pendaftaran: ${error.message}`);
}

export async function getAllPendaftar(): Promise<PendaftaranRow[]> {
    const { data, error } = await supabase
        .from("pendaftaran")
        .select("id, nama, npm, email, angkatan, bidang1, bidang2, status, alasan, cv_url, created_at")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as PendaftaranRow[];
}

export async function updateStatus(
    id: string,
    status: PendaftaranRow["status"]
): Promise<void> {
    const { error } = await supabase.from("pendaftaran").update({ status }).eq("id", id);
    if (error) throw new Error(`Gagal update status: ${error.message}`);
}

export async function deletePendaftar(id: string): Promise<void> {
    const { error } = await supabase.from("pendaftaran").delete().eq("id", id);
    if (error) throw new Error(`Gagal hapus pendaftar: ${error.message}`);
}

export async function getCVSignedUrl(path: string, expiresIn = 60): Promise<string> {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, expiresIn);
    if (error) throw new Error(`Gagal buat signed url: ${error.message}`);
    if (!data?.signedUrl) throw new Error("Signed URL tidak tersedia.");
    return data.signedUrl;
}