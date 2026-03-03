import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { ANGKATAN_OPTIONS, BIDANG_OPTIONS } from "@/constans/oprec";
import type { OprecForm } from "@/constans/oprec.type";
import Field from "./Field";
import { useOprecForm } from "@/hooks/useOprecForm";
import { uploadCV, submitPendaftaran } from "@/services/pendaftaran";
import { CheckCircle2, Loader2, FileText, X } from "lucide-react";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type SubmitState = "idle" | "uploading" | "saving" | "success" | "error";

export default function OprecForm({ closeAt }: { closeAt: Date }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [cvFileError, setCvFileError] = useState<string | null>(null);

  const { form, errors, alasanCount, onChange, onSubmit, setErrors } =
    useOprecForm(async (payload) => {
      if (!payload.cv) {
        setErrors((p) => ({ ...p, cv: "Upload CV wajib." }));
        return;
      }
      if (payload.cv.type !== "application/pdf") {
        setErrors((p) => ({ ...p, cv: "CV harus berformat PDF." }));
        return;
      }
      if (payload.cv.size > MAX_FILE_SIZE_BYTES) {
        setErrors((p) => ({
          ...p,
          cv: `Ukuran CV maksimal ${MAX_FILE_SIZE_MB}MB.`,
        }));
        return;
      }

      try {
        setSubmitError(null);
        setSubmitState("uploading");

        const cvPath = await uploadCV(payload.cv, payload.npm);

        setSubmitState("saving");

        await submitPendaftaran({
          nama: payload.nama,
          npm: payload.npm,
          email: payload.email,
          angkatan: payload.angkatan as string,
          bidang1: payload.bidang1 as string,
          bidang2: payload.bidang2 as string,
          cv_url: cvPath,
          alasan: payload.alasan,
        });

        setSubmitState("success");
      } catch (err) {
        setSubmitState("error");
        setSubmitError(
          err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi."
        );
      }
    });

  const angkatanItems = ANGKATAN_OPTIONS.map((a) => ({ value: a, label: a }));
  const bidangItems = BIDANG_OPTIONS.map((b) => ({ value: b, label: b }));

  const isLoading =
    submitState === "uploading" || submitState === "saving";

  if (submitState === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-bold text-foreground">
            Pendaftaran Berhasil! 🎉
          </p>
          <p className="text-sm font-semibold text-foreground/60 max-w-sm">
            Data kamu sudah kami terima. Informasi selanjutnya akan dikirimkan
            melalui WAG. Pastikan kamu bergabung di grup WhatsApp berikut.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/60 px-5 py-4 text-left w-full max-w-sm">
          <p className="text-xs font-semibold text-foreground mb-1">
            <a href="https://chat.whatsapp.com/I1XeCV1CF0T4cKAYXz98FJ?mode=gi_t" target="_blank" rel="noopener noreferrer">
              https://chat.whatsapp.com/I1XeCV1CF0T4cKAYXz98FJ?mode=gi_t
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative overflow-visible">
      
      <form onSubmit={onSubmit} className="grid gap-6" noValidate>
        <Field id="nama" label="Nama Lengkap" error={errors.nama}>
          <Input
            id="nama"
            value={form.nama}
            onChange={(e) => onChange("nama", e.target.value)}
            placeholder="Nama lengkap sesuai KTM"
            aria-invalid={!!errors.nama}
            disabled={isLoading}
          />
        </Field>

        <div className="grid md:grid-cols-2 gap-6">
          <Field id="npm" label="NPM" error={errors.npm}>
            <Input
              id="npm"
              value={form.npm}
              onChange={(e) => onChange("npm", e.target.value)}
              placeholder="Contoh: 2323xxxx"
              inputMode="numeric"
              aria-invalid={!!errors.npm}
              disabled={isLoading}
            />
          </Field>
          <Field id="angkatan" label="Angkatan" error={errors.angkatan}>
            <Combobox
              value={form.angkatan || ""}
              onValueChange={(v) =>
                onChange("angkatan", v as OprecForm["angkatan"])
              }
              items={angkatanItems}
              placeholder="Pilih angkatan"
              emptyText="Angkatan tidak ditemukan"
              disabled={isLoading}
            />
          </Field>
        </div>

        <Field
          id="email"
          label="Email Mahasiswa (MDP)"
          error={errors.email}
        >
          <Input
            id="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="nama@mhs.mdp.ac.id"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            disabled={isLoading}
          />
        </Field>

        <div className="grid md:grid-cols-2 gap-6">
          <Field id="bidang1" label="Pilihan Bidang 1" error={errors.bidang1}>
            <Combobox
              value={form.bidang1 || ""}
              onValueChange={(v) =>
                onChange("bidang1", v as OprecForm["bidang1"])
              }
              items={bidangItems}
              placeholder="Pilih bidang"
              emptyText="Bidang tidak ditemukan"
              disabled={isLoading}
            />
          </Field>
          <Field id="bidang2" label="Pilihan Bidang 2" error={errors.bidang2}>
            <Combobox
              value={form.bidang2 || ""}
              onValueChange={(v) =>
                onChange("bidang2", v as OprecForm["bidang2"])
              }
              items={bidangItems}
              placeholder="Pilih bidang"
              emptyText="Bidang tidak ditemukan"
              disabled={isLoading}
            />
          </Field>
        </div>

        <Field
          id="cv"
          label="Upload berkas pendaftaran (PDF, maks. 2MB)"
          error={errors.cv || cvFileError || undefined}
        >
          <p className="text-xs font-semibold text-foreground/60 -mt-1">
            Berisi: CV, Sertifikat KSI, Sertifikat Pendukung, dan Deskripsi Diri
          </p>
          <div className="space-y-2">
            <label
              htmlFor="cv"
              className={[
                "flex items-center gap-3 w-full rounded-xl border px-4 py-3 cursor-pointer transition-colors",
                "border-black/10 bg-white/70 hover:bg-white/90",
                (errors.cv || cvFileError) ? "border-destructive" : "",
                isLoading ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <FileText className="w-5 h-5 text-foreground/50 shrink-0" />
              <span className="text-sm font-semibold text-foreground/60 truncate">
                {form.cv ? form.cv.name : "Klik untuk pilih file PDF..."}
              </span>
              {form.cv && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onChange("cv", null);
                    setCvFileError(null);
                  }}
                  className="ml-auto text-foreground/40 hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </label>

            <input
              id="cv"
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              disabled={isLoading}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setCvFileError(null);
                if (file) {
                  if (file.type !== "application/pdf") {
                    setCvFileError("File harus berformat PDF.");
                    onChange("cv", null);
                    return;
                  }
                  if (file.size > MAX_FILE_SIZE_BYTES) {
                    setCvFileError(`Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB.`);
                    onChange("cv", null);
                    return;
                  }
                }
                onChange("cv", file);
              }}
            />

            {form.cv && !cvFileError && (
              <p className="text-xs font-semibold text-green-600">
                ✓ {form.cv.name} ({(form.cv.size / 1024).toFixed(0)} KB)
              </p>
            )}
          </div>
        </Field>

        <Field
          id="alasan"
          label={`Alasan Masuk HIMSI (min. 5 kata) · ${alasanCount} kata`}
          error={errors.alasan}
        >
          <Textarea
            id="alasan"
            value={form.alasan}
            onChange={(e) => onChange("alasan", e.target.value)}
            placeholder="Contoh: Ingin berkembang, berkontribusi, dan belajar bersama HIMSI..."
            aria-invalid={!!errors.alasan}
            disabled={isLoading}
          />
        </Field>

        {submitState === "error" && submitError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive">
            {submitError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full py-6 text-base font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {submitState === "uploading"
                ? "Mengupload CV..."
                : "Menyimpan data..."}
            </span>
          ) : (
            "Kirim Pendaftaran"
          )}
        </Button>
      </form>
    </div>
  );
}