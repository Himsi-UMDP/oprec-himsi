import { supabase } from '@/lib/supabase'
import type { NilaiWawancaraInsert, NilaiWawancaraRow, NilaiWawancaraUpdate } from '@/lib/supabase'

// Upsert aman untuk 2 akun dipakai banyak orang
// conflict = pendaftaran_id + interviewer_id (akun) + interviewer_name (nama orang)
export async function upsertNilai(payload: NilaiWawancaraInsert): Promise<NilaiWawancaraRow> {
  const { data, error } = await supabase
    .from('nilai_wawancara')
    .upsert(payload, {
      onConflict: 'pendaftaran_id,interviewer_id,interviewer_name',
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as NilaiWawancaraRow
}

// Ambil nilai hanya milik 1 penilai (nama orang) pada 1 akun pewawancara
export async function getNilaiByInterviewer(interviewerId: string, interviewerName: string): Promise<NilaiWawancaraRow[]> {
  const { data, error } = await supabase
    .from('nilai_wawancara')
    .select('*')
    .eq('interviewer_id', interviewerId)
    .eq('interviewer_name', interviewerName)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as NilaiWawancaraRow[]
}

export async function getAllNilai(): Promise<NilaiWawancaraRow[]> {
  const { data, error } = await supabase
    .from('nilai_wawancara')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []) as NilaiWawancaraRow[]
}

export async function updateNilaiById(id: string, update: NilaiWawancaraUpdate): Promise<void> {
  const { error } = await supabase
    .from('nilai_wawancara')
    .update({ ...update, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
}