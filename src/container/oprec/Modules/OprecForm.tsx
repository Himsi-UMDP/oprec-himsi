import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Combobox } from "@/components/ui/combobox";
import { ANGKATAN_OPTIONS, BIDANG_OPTIONS } from "@/constans/oprec";
import type { OprecForm } from "@/constans/oprec.type";
// import { formatWIB } from "@/lib/oprec";
import Field from "./Field";
import { useOprecForm } from "@/hooks/useOprecForm";

export default function OprecForm({ closeAt }: { closeAt: Date }) {
  const { form, errors, alasanCount, onChange, onSubmit } = useOprecForm(
    (payload) => {
      console.log("FORM PAYLOAD (testing):", {
        ...payload,
        cv: payload.cv?.name,
      });
      alert("Pendaftaran berhasil dikirim (backend belum dihubungkan)");
    }
  );

  const angkatanItems = ANGKATAN_OPTIONS.map((a) => ({ value: a, label: a }));
  const bidangItems = BIDANG_OPTIONS.map((b) => ({ value: b, label: b }));

  return (
    <div className="space-y-6 relative overflow-visible">
      {/* <Alert className="bg-white/70 border-black/10">
        <AlertTitle>Pendaftaran sedang dibuka</AlertTitle>
        <AlertDescription>
          Ditutup pada <b>{formatWIB(closeAt)}</b>. Gunakan email{" "}
          <b>@mhs.mdp.ac.id</b>.
        </AlertDescription>
      </Alert> */}

      <form onSubmit={onSubmit} className="grid gap-6" noValidate>
        <Field id="nama" label="Nama" error={errors.nama}>
          <Input
            id="nama"
            value={form.nama}
            onChange={(e) => onChange("nama", e.target.value)}
            placeholder="Nama lengkap"
            aria-invalid={!!errors.nama}
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
            />
          </Field>
        </div>

        <Field id="email" label="Email Mahasiswa (MDP)" error={errors.email}>
          <Input
            id="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="nama@mhs.mdp.ac.id"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </Field>

        <div className="grid md:grid-cols-2 gap-6">
          <Field id="bidang1" label="Pilih Bidang 1" error={errors.bidang1}>
            <Combobox
              value={form.bidang1 || ""}
              onValueChange={(v) =>
                onChange("bidang1", v as OprecForm["bidang1"])
              }
              items={bidangItems}
              placeholder="Pilih bidang"
              emptyText="Bidang tidak ditemukan"
            />
          </Field>

          <Field id="bidang2" label="Pilih Bidang 2" error={errors.bidang2}>
            <Combobox
              value={form.bidang2 || ""}
              onValueChange={(v) =>
                onChange("bidang2", v as OprecForm["bidang2"])
              }
              items={bidangItems}
              placeholder="Pilih bidang"
              emptyText="Bidang tidak ditemukan"
            />
          </Field>
        </div>

        <Field id="cv" label="Upload CV" error={errors.cv}>
          <Input
            id="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => onChange("cv", e.target.files?.[0] ?? null)}
            aria-invalid={!!errors.cv}
          />
          {form.cv ? (
            <p className="text-xs font-semibold text-foreground/70 mt-2">
              File dipilih: <b>{form.cv.name}</b>
            </p>
          ) : null}
        </Field>

        <Field
          id="alasan"
          label={`5 Kata Alasan Masuk HIMSI (min 5 kata) • ${alasanCount}/5`}
          error={errors.alasan}
        >
          <Textarea
            id="alasan"
            value={form.alasan}
            onChange={(e) => onChange("alasan", e.target.value)}
            placeholder="Contoh: Ingin berkembang, berkontribusi, dan belajar bersama HIMSI..."
            aria-invalid={!!errors.alasan}
          />
        </Field>

        <Button type="submit" className="w-full py-6 text-base font-semibold">
          Kirim Pendaftaran
        </Button>
      </form>
    </div>
  );
}