import { useMemo, useState } from "react";
import Animated from "@/components/Animated";
import Countdown from "@/components/Countdown";
import { Button } from "@/components/ui/button";

// kalau kamu belum punya Input/Label/Textarea/Card, pakai className input biasa.
// kalau sudah pakai versi shadcn-copy yang kemarin: import dari "@/components/ui/..."
import { useOprecFlow } from "@/hooks/useOprecFlow";
import { ANGKATAN_OPTIONS, BIDANG_OPTIONS } from "@/constans/oprec";
import type { OprecForm, OprecErrors } from "@/constans/oprec.type";
import { formatWIB, validateOprecForm, wordCount } from "@/lib/oprec";

export default function Oprec() {
  const { phase, remaining, openAt, closeAt, announceAt } = useOprecFlow();

  const [form, setForm] = useState<OprecForm>({
    nama: "",
    npm: "",
    email: "",
    angkatan: "",
    bidang1: "",
    bidang2: "",
    cv: null,
    alasan: "",
  });

  const [errors, setErrors] = useState<OprecErrors>({});
  const alasanCount = useMemo(() => wordCount(form.alasan), [form.alasan]);

  function onChange<K extends keyof OprecForm>(key: K, value: OprecForm[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateOprecForm(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    alert("Pendaftaran berhasil dikirim ✅ (backend belum dihubungkan)");
  }

  return (
    <section id="oprec" className="relative py-24 bg-himsi-hero">
      <div className="container px-4">
        <Animated className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            OPREC HIMSI
          </h2>
        </Animated>

        <div className="mt-10 max-w-3xl mx-auto glass-card p-8">
          {phase === "BEFORE_OPEN" && (
            <div className="space-y-5 text-center">
              <p className="text-xl font-semibold">Pendaftaran belum dibuka</p>
              <p className="font-semibold text-foreground/70">
                Dibuka pada: <span className="font-semibold">{formatWIB(openAt)}</span>
              </p>

              <Countdown label="Menuju pembukaan pendaftaran" parts={remaining} />
            </div>
          )}

          {/* 2) OPEN -> FORM SAJA */}
          {phase === "OPEN" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
                <p className="font-semibold">Pendaftaran sedang dibuka </p>
                <p className="text-sm font-semibold text-foreground/70 mt-1">
                  Ditutup pada <b>{formatWIB(closeAt)}</b>. Gunakan email <b>@mhs.mdp.ac.id</b>.
                </p>
              </div>

              <form onSubmit={onSubmit} className="grid gap-6">
                <Field label="Nama" error={errors.nama}>
                  <input
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                    value={form.nama}
                    onChange={(e) => onChange("nama", e.target.value)}
                    placeholder="Nama lengkap"
                  />
                </Field>

                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="NPM" error={errors.npm}>
                    <input
                      className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                      value={form.npm}
                      onChange={(e) => onChange("npm", e.target.value)}
                      placeholder="Contoh: 2323xxxx"
                      inputMode="numeric"
                    />
                  </Field>

                  <Field label="Angkatan" error={errors.angkatan}>
                    <select
                      className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                      value={form.angkatan}
                      onChange={(e) => onChange("angkatan", e.target.value as OprecForm["angkatan"])}
                    >
                      <option value="">Pilih angkatan</option>
                      {ANGKATAN_OPTIONS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Email Mahasiswa (MDP)" error={errors.email}>
                  <input
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="nama@mhs.mdp.ac.id"
                    type="email"
                  />
                </Field>

                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Pilih Bidang 1" error={errors.bidang1}>
                    <select
                      className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                      value={form.bidang1}
                      onChange={(e) => onChange("bidang1", e.target.value as OprecForm["bidang1"])}
                    >
                      <option value="">Pilih bidang</option>
                      {BIDANG_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Pilih Bidang 2" error={errors.bidang2}>
                    <select
                      className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                      value={form.bidang2}
                      onChange={(e) => onChange("bidang2", e.target.value as OprecForm["bidang2"])}
                    >
                      <option value="">Pilih bidang</option>
                      {BIDANG_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Upload CV" error={errors.cv}>
                  <input
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => onChange("cv", e.target.files?.[0] ?? null)}
                  />
                </Field>

                <Field label={`5 Kata Alasan Masuk HIMSI (min 5 kata) • ${alasanCount}/5`} error={errors.alasan}>
                  <textarea
                    className="w-full min-h-[120px] rounded-xl border border-black/10 bg-white/70 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-black/10"
                    value={form.alasan}
                    onChange={(e) => onChange("alasan", e.target.value)}
                    placeholder="Contoh: Ingin berkembang, berkontribusi, dan belajar bersama HIMSI..."
                  />
                </Field>

                <Button type="submit" className="w-full py-6 text-base font-semibold">
                  Kirim Pendaftaran
                </Button>
              </form>
            </div>
          )}

          {/* 3) DITUTUP -> COUNTDOWN PENGUMUMAN */}
          {phase === "AFTER_CLOSE" && (
            <div className="space-y-5 text-center">
                <p className="text-xl font-semibold">Pendaftaran ditutup</p>
                <p className="font-semibold text-foreground/70">
                    Pengumuman pada: <span className="font-semibold">{formatWIB(announceAt)}</span>
                </p>

                <Countdown label="Menuju waktu pengumuman" parts={remaining} />

                <div className="rounded-2xl border border-black/10 bg-white/70 p-4 text-left">
                <p className="font-semibold">Catatan</p>
                <p className="text-sm font-semibold text-foreground/70 mt-1">
                    Informasi hasil seleksi akan diumumkan melalui kanal resmi panitia.
                </p>
                </div>
            </div>
          )}

            {phase === "ANNOUNCED" && (
                <div className="space-y-4 text-center">
                    <p className="text-xl font-semibold">Pengumuman</p>
                    <p className="font-semibold text-foreground/70">
                        Pengumuman sudah tersedia. (Placeholder — nanti backend/link bisa dimasukkan.)
                    </p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 text-left">
      <label className="text-sm font-semibold">{label}</label>
      {children}
      {error ? <p className="text-sm font-bold text-red-600">{error}</p> : null}
    </div>
  );
}