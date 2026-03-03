import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type PendaftaranRow = {
    id: string
    created_at: string
    nama: string
    npm: string
    email: string
    angkatan: string
    bidang1: string
    bidang2: string
    cv_url: string | null
    alasan: string
    status: 'diterima' | 'selesai' | 'pending' | 'selesai_wawancara'
}

export type PendaftaranInsert = Omit<PendaftaranRow, 'id' | 'created_at' | 'status'>

export type NilaiWawancaraRow = {
    id: string
    created_at: string
    updated_at: string
    pendaftaran_id: string
    interviewer_id: string
    interviewer_name: string
    sikap: number | null
    public_speaking: number | null
    wawasan_org: number | null
    manajemen: number | null
    teamwork: number | null
    leadership: number | null
    komitmen: number | null
    bidang: number | null
    catatan: string | null
}

export type NilaiWawancaraInsert = Omit<NilaiWawancaraRow, 'id' | 'created_at' | 'updated_at'>
export type NilaiWawancaraUpdate = Partial<Pick<NilaiWawancaraRow,
    'sikap' | 'public_speaking' | 'wawasan_org' | 'manajemen' |
    'teamwork' | 'leadership' | 'komitmen' | 'bidang' | 'catatan'>>