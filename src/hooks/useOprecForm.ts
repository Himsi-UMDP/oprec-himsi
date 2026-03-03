import { useMemo, useState } from "react";
import type { OprecErrors, OprecForm } from "@/constans/oprec.type";
import { validateOprecForm, wordCount } from "@/lib/oprec";

export function useOprecForm(
    onValidSubmit?: (form: OprecForm) => void
) {
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

        if (onValidSubmit) onValidSubmit(form);
        else alert("Pendaftaran berhasil dikirim ✅ (backend belum dihubungkan)");
    }

    return { form, errors, alasanCount, onChange, onSubmit, setForm, setErrors };
}