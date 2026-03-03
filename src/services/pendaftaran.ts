import { supabase } from '@/lib/supabase'
import type { PendaftaranInsert, PendaftaranRow } from '@/lib/supabase'


export async function uploadCV(file: File, npm: string): Promise<string> {
    const ext = file.name.split('.').pop() ?? 'pdf'
    const timestamp = Date.now()
    const filePath = `cv/${npm}-${timestamp}.${ext}`

    const { error } = await supabase.storage
        .from('cv-pendaftar')
        .upload(filePath, file, {
            contentType: file.type || 'application/pdf',
            upsert: false,
        })

    if (error) throw new Error(`Gagal upload CV: ${error.message}`)

    return filePath 
}


export async function submitPendaftaran(
    payload: PendaftaranInsert
): Promise<PendaftaranRow> {
    const { data, error } = await supabase
        .from('pendaftaran')
        .insert(payload)
        .select()
        .single()

    if (error) throw new Error(`Gagal menyimpan pendaftaran: ${error.message}`)
    return data as PendaftaranRow
}


export async function getAllPendaftar(): Promise<PendaftaranRow[]> {
    const { data, error } = await supabase
        .from('pendaftaran')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return (data ?? []) as PendaftaranRow[]
}


export async function updateStatus(
    id: string,
    status: PendaftaranRow['status']
): Promise<void> {
    const { error } = await supabase
        .from('pendaftaran')
        .update({ status })
        .eq('id', id)

    if (error) throw new Error(error.message)
}


export async function getCVSignedUrl(cvPath: string): Promise<string> {
    const { data, error } = await supabase.storage
        .from('cv-pendaftar')
        .createSignedUrl(cvPath, 60 * 10) 

    if (error) throw new Error(error.message)
    return data.signedUrl
}