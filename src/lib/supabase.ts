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
    status: 'pending' | 'diterima' | 'ditolak'
}

export type PendaftaranInsert = Omit<PendaftaranRow, 'id' | 'created_at' | 'status'>