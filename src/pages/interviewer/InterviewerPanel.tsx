import { useState, useMemo, useEffect } from 'react'
import {
  LogOut,
  ClipboardList,
  X,
  Save,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useInterviewerAuth } from '@/hooks/useInterviewerAuth'
import type { PendaftaranRow, NilaiWawancaraRow } from '@/lib/supabase'
import { upsertNilai, getNilaiByInterviewer } from '@/services/nilaiWawancara'
import { getCVSignedUrl } from '@/services/pendaftaran'

const INTERVIEW_QUESTIONS = [
  {
    kategori: 'Pembukaan & Umum',
    warna: 'bg-blue-50 text-blue-700 border-blue-200',
    pertanyaan: [
      'Ceritakan tentang diri kamu!',
      'Kegiatan apa saja yang sedang kamu jalani saat ini?',
      'Ceritakan pengalaman kegiatan yang pernah kamu ikuti di kampus maupun luar kampus!',
      'Menurut kamu, organisasi penting tidak untuk mahasiswa? Mengapa?',
      'Apa yang membuat kamu tertarik untuk bergabung dengan organisasi ini?',
    ],
  },
  {
    kategori: 'Wawasan Organisasi',
    warna: 'bg-purple-50 text-purple-700 border-purple-200',
    pertanyaan: [
      'Apa yang kamu ketahui tentang HIMSI?',
      'Sebutkan bidang apa saja yang ada di HIMSI!',
      'Sebutkan program kerja HIMSI yang kamu ketahui!',
      'Bidang apa yang diminati untuk bergabung ke HIMSI? Dan apa kontribusi yang akan kamu berikan untuk bidang yang dipilih?',
      'Jika kamu tidak ditempatkan pada bidang yang kamu pilih, apa tanggapan kamu? Jelaskan!',
    ],
  },
  {
    kategori: 'Manajemen Waktu',
    warna: 'bg-amber-50 text-amber-700 border-amber-200',
    pertanyaan: [
      'Bagaimana cara kamu mengatur waktu antara kuliah dan organisasi?',
      'Kalau semua kerjaan kelihatan penting dan mepet deadline, bagaimana cara kamu menentukan prioritasnya?',
      'Apa yang kamu lakukan ketika perencanaan waktu yang sudah dibuat tidak berjalan sesuai rencana?',
      'Jika kamu menjadi panitia dan ada anggota tim yang tidak disiplin waktu, bagaimana kamu menyikapinya?',
      'Kamu termasuk orang yang mengerjakan tugas di awal atau mendekati deadline? Kenapa?',
    ],
  },
  {
    kategori: 'Teamwork',
    warna: 'bg-green-50 text-green-700 border-green-200',
    pertanyaan: [
      'Bagaimana pendekatan kamu dalam membangun kerja sama dengan anggota tim yang berbeda karakter?',
      'Jika terjadi perbedaan pendapat yang cukup tajam dalam tim, bagaimana kamu memastikan konflik tetap produktif?',
      'Kamu lebih nyaman jadi orang yang mengatur tim atau yang support di belakang layar? Kenapa?',
      'Bagaimana kamu melakukan pembagian tugas agar semua anggota merasa adil?',
      'Apa yang kamu lakukan jika dalam suatu organisasi terdapat anggota yang pasif?',
    ],
  },
  {
    kategori: 'Leadership',
    warna: 'bg-orange-50 text-orange-700 border-orange-200',
    pertanyaan: [
      'Dalam sebuah kelompok kamu lebih memilih dipimpin atau memimpin? Jelaskan alasannya!',
      'Kalau anggota tim kamu membuat kesalahan cukup fatal, kamu akan marah, diam, atau bagaimana?',
      'Bagaimana kamu menyelesaikan konflik antar anggota tim?',
      'Kalau kamu ditunjuk jadi pemimpin padahal kamu merasa belum paling siap, kamu akan terima atau tolak? Kenapa?',
      'Jika kamu harus memilih antara hasil yang cepat namun berisiko atau proses pembelajaran tim namun aman, mana yang kamu pilih?',
    ],
  },
  {
    kategori: 'Komitmen',
    warna: 'bg-red-50 text-red-700 border-red-200',
    pertanyaan: [
      'Jika suatu saat kamu merasa lelah atau jenuh dalam organisasi, apa yang akan kamu lakukan?',
      'Menurut kamu, apa bentuk ketidakseriusan yang paling merugikan tim?',
      'Apa standar pribadi kamu supaya bisa bilang sudah menjalankan amanah di himpunan dengan baik?',
      'Apa batas minimal yang menurut kamu masih bisa disebut aktif berkontribusi di organisasi?',
      'Feedback seperti apa yang paling kamu butuhkan dari organisasi untuk berkembang?',
      'Seandainya kami tidak menerima kamu, apa yang akan kamu lakukan?',
      'Sampaikan 1 kalimat kenapa kami harus menerima kamu daripada kandidat lain!',
    ],
  },
  {
    kategori: 'Pertanyaan Bidang',
    warna: 'bg-teal-50 text-teal-700 border-teal-200',
    pertanyaan: [
      '[PSDM] Apa langkah konkret untuk menjaga keberlanjutan kualitas anggota di masa depan?',
      '[PSDM] Bagaimana cara kamu mengenali potensi seseorang dalam tim?',
      '[PSDM] Budaya organisasi seperti apa yang harus dibangun agar anggota betah, berkembang, dan loyal?',
      '[Litbang] Apakah kamu lebih memahami teknologi pemrograman atau non-pemrograman?',
      '[Litbang] Bagaimana kamu memanfaatkan AI untuk mendukung kegiatan organisasi dan perkuliahan?',
      '[Litbang] Tools atau teknologi apa yang biasa kamu gunakan dan ingin kamu kembangkan lebih lanjut?',
      '[Sosial] Bagaimana cara kamu mengajak anggota lain untuk peduli terhadap kegiatan sosial?',
      '[Sosial] Apa tantangan terbesar dalam menumbuhkan empati di kalangan mahasiswa?',
      '[Kominfo] Ceritakan pengalaman kamu dalam membuat konten (desain, video, media sosial).',
      '[Kominfo] Bagaimana strategi kamu agar publikasi tetap berjalan konsisten saat tim sibuk?',
      '[Kominfo] Tools desain atau editing apa yang kamu kuasai saat ini?',
    ],
  },
]

const SCORE_CATEGORIES = [
  { key: 'sikap', label: 'Sikap', desc: 'Sopan santun, etika, dan sikap selama wawancara' },
  { key: 'public_speaking', label: 'Public Speaking', desc: 'Kemampuan berbicara, artikulasi, dan kepercayaan diri' },
  { key: 'wawasan_org', label: 'Wawasan Organisasi', desc: 'Pengetahuan tentang HIMSI, bidang, dan proker' },
  { key: 'manajemen', label: 'Manajemen Waktu', desc: 'Kemampuan mengatur dan memprioritaskan waktu' },
  { key: 'teamwork', label: 'Teamwork', desc: 'Kemampuan kerja sama dan kolaborasi dalam tim' },
  { key: 'leadership', label: 'Leadership', desc: 'Jiwa kepemimpinan dan pengambilan keputusan' },
  { key: 'komitmen', label: 'Komitmen', desc: 'Kesungguhan dan kesiapan berorganisasi' },
  { key: 'bidang', label: 'Bidang', desc: 'Kesesuaian dengan bidang yang dipilih' },
] as const

type ScoreKey = (typeof SCORE_CATEGORIES)[number]['key']
type Scores = Record<ScoreKey, number | ''>

type Penilai = { nama: string; ruang: string }

const PENILAI_KEY = 'oprec_penilai_name'

const emptyScores = (): Scores =>
  Object.fromEntries(SCORE_CATEGORIES.map((c) => [c.key, ''])) as Scores

const nilaiToScores = (n: NilaiWawancaraRow): Scores => ({
  sikap: n.sikap ?? '',
  public_speaking: n.public_speaking ?? '',
  wawasan_org: n.wawasan_org ?? '',
  manajemen: n.manajemen ?? '',
  teamwork: n.teamwork ?? '',
  leadership: n.leadership ?? '',
  komitmen: n.komitmen ?? '',
  bidang: n.bidang ?? '',
})

const calcAvg = (scores: Scores): string => {
  const vals = Object.values(scores).filter((v) => v !== '') as number[]
  if (!vals.length) return '—'
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
}

const SCORE_LABELS = ['', 'Sangat Buruk', 'Kurang Baik', 'Cukup Baik', 'Baik', 'Sangat Baik']
const SCORE_COLORS = [
  '',
  'bg-red-100 text-red-700 border-red-300',
  'bg-orange-100 text-orange-700 border-orange-300',
  'bg-yellow-100 text-yellow-700 border-yellow-300',
  'bg-blue-100 text-blue-700 border-blue-300',
  'bg-green-100 text-green-700 border-green-300',
]

function PanduanModal({ onClose }: { onClose: () => void }) {
  const [activeKat, setActiveKat] = useState(0)
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2464a8] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <p className="font-extrabold text-gray-800 flex-1 text-sm">Panduan Pertanyaan Wawancara</p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden min-h-0">
          <div className="w-44 border-r border-gray-100 flex flex-col overflow-y-auto shrink-0">
            {INTERVIEW_QUESTIONS.map((kat, i) => (
              <button
                key={i}
                onClick={() => setActiveKat(i)}
                className={[
                  'text-left px-3 py-3 text-xs font-bold border-b border-gray-50 transition-colors leading-tight',
                  activeKat === i ? 'bg-blue-50 text-[#2464a8]' : 'text-gray-500 hover:bg-gray-50',
                ].join(' ')}
              >
                {kat.kategori}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${INTERVIEW_QUESTIONS[activeKat].warna}`}
            >
              {INTERVIEW_QUESTIONS[activeKat].kategori}
            </span>
            {INTERVIEW_QUESTIONS[activeKat].pertanyaan.map((q, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50/40 transition-colors"
              >
                <span className="w-6 h-6 rounded-lg bg-gray-200 text-gray-600 text-xs font-extrabold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold text-gray-700 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PenilaianModal({
  row,
  scores,
  catatan,
  onClose,
  onSave,
  saving,
  penilaiName,
}: {
  row: PendaftaranRow
  scores: Scores
  catatan: string
  onClose: () => void
  onSave: (s: Scores, c: string) => void
  saving: boolean
  penilaiName: string
}) {
  const [local, setLocal] = useState<Scores>({ ...scores })
  const [localCatatan, setLocalCatatan] = useState(catatan)
  const [showPanduan, setShowPanduan] = useState(false)
  const avg = calcAvg(local)
  const avgNum = avg !== '—' ? parseFloat(avg) : null

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2464a8] flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-gray-800 text-sm truncate">{row.nama}</p>
              <p className="text-xs text-gray-400 font-semibold">
                {row.npm} · {row.bidang1} / {row.bidang2}
              </p>
              <p className="text-[11px] text-[#2464a8] font-extrabold mt-1">
                Penilai: {penilaiName || '—'}
              </p>
            </div>
            <button
              onClick={() => setShowPanduan(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#2464a8] bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors mr-1 shrink-0"
            >
              <BookOpen className="w-3 h-3" /> Panduan
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-5 space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Klik angka untuk memberi nilai · 1 = Sangat Buruk, 5 = Sangat Baik
            </p>

            {SCORE_CATEGORIES.map((cat) => {
              const v = local[cat.key]
              return (
                <div key={cat.key} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-sm font-extrabold text-gray-800">{cat.label}</p>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">{cat.desc}</p>
                    </div>
                    {v !== '' && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                          SCORE_COLORS[v as number]
                        }`}
                      >
                        {SCORE_LABELS[v as number]}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() =>
                          setLocal((p) => ({ ...p, [cat.key]: p[cat.key] === n ? '' : n }))
                        }
                        className={[
                          'flex-1 h-9 rounded-xl text-sm font-extrabold border-2 transition-all',
                          local[cat.key] === n
                            ? 'bg-[#2464a8] text-white border-[#2464a8] shadow-md scale-105'
                            : 'bg-white text-gray-400 border-gray-200 hover:border-[#2464a8]/50',
                        ].join(' ')}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}

            <div
              className={[
                'rounded-xl border-2 px-4 py-3 flex items-center justify-between',
                avgNum !== null
                  ? avgNum >= 4
                    ? 'border-green-200 bg-green-50'
                    : avgNum >= 3
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-orange-200 bg-orange-50'
                  : 'border-gray-100 bg-gray-50',
              ].join(' ')}
            >
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Rata-rata Nilai</p>
                <p className="text-xs text-gray-400 font-semibold">
                  {Object.values(local).filter((v) => v !== '').length} dari {SCORE_CATEGORIES.length}{' '}
                  kategori dinilai
                </p>
              </div>
              <span
                className={[
                  'text-3xl font-extrabold',
                  avgNum !== null
                    ? avgNum >= 4
                      ? 'text-green-600'
                      : avgNum >= 3
                        ? 'text-blue-600'
                        : 'text-orange-600'
                    : 'text-gray-300',
                ].join(' ')}
              >
                {avg}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">
                Catatan Tambahan (opsional)
              </label>
              <textarea
                value={localCatatan}
                onChange={(e) => setLocalCatatan(e.target.value)}
                placeholder="Tambahkan catatan penilaian..."
                className="w-full min-h-[80px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>
          </div>

          <div className="px-5 py-4 border-t border-gray-100 shrink-0">
            <button
              onClick={() => onSave(local, localCatatan)}
              disabled={saving}
              className="w-full h-11 bg-[#2464a8] hover:bg-[#2464a8]/90 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Penilaian
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {showPanduan && <PanduanModal onClose={() => setShowPanduan(false)} />}
    </>
  )
}

function DetailModal({ row, onClose }: { row: PendaftaranRow; onClose: () => void }) {
  const [opening, setOpening] = useState(false)

  const openCv = async () => {
    const path = row.cv_url as unknown as string | null | undefined
    if (!path) return

    setOpening(true)
    try {
      // kalau sudah full url
      if (path.startsWith('http://') || path.startsWith('https://')) {
        window.open(path, '_blank', 'noopener,noreferrer')
        return
      }

      // kalau path storage, pakai signed url
      const url = await getCVSignedUrl(path)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (e) {
      console.error(e)
      alert('Gagal membuka CV. Pastikan policy storage & signed url sudah benar.')
    } finally {
      setOpening(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-gray-800 text-sm truncate">Detail Peserta</p>
            <p className="text-xs text-gray-400 font-semibold truncate">
              {row.nama} · {row.npm} · {row.bidang1} / {row.bidang2}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Alasan Mendaftar</p>
            <p className="text-sm font-semibold text-gray-700 whitespace-pre-wrap leading-relaxed">
              {(row.alasan as unknown as string | null | undefined)?.trim()
                ? (row.alasan as unknown as string)
                : '—'}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">CV</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{row.cv_url ? 'Tersedia' : 'Tidak ada file'}</p>
            </div>

            <button
              onClick={openCv}
              disabled={!row.cv_url || opening}
              className="h-10 px-4 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2"
            >
              {opening ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Membuka...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Buka CV
                </>
              )}
            </button>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-bold text-gray-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

export default function InterviewerPanel() {
  const { isLoading, profile, logout } = useInterviewerAuth()

  const [pendaftar, setPendaftar] = useState<PendaftaranRow[]>([])
  const [nilaiMap, setNilaiMap] = useState<Record<string, NilaiWawancaraRow>>({})
  const [loadingData, setLoadingData] = useState(true)

  const [penilaiList, setPenilaiList] = useState<Penilai[]>([])
  const [penilaiName, setPenilaiName] = useState<string>('')

  const [modalRow, setModalRow] = useState<PendaftaranRow | null>(null)
  const [detailRow, setDetailRow] = useState<PendaftaranRow | null>(null)

  const [savingId, setSavingId] = useState<string | null>(null)
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [bidangFilter, setBidangFilter] = useState('semua')
  const [showPanduan, setShowPanduan] = useState(false)

  useEffect(() => {
    if (profile) fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  async function fetchAll() {
    setLoadingData(true)
    try {
      // 1) list penilai (RLS filter by auth.email())
      const { data: people, error: peopleErr } = await supabase
        .from('interviewer_people')
        .select('nama, ruang')
        .order('nama', { ascending: true })

      if (peopleErr) throw peopleErr
      const list = (people ?? []) as Penilai[]
      setPenilaiList(list)

      // default penilai
      const saved = localStorage.getItem(PENILAI_KEY) || ''
      const valid = list.find((p) => p.nama === saved)?.nama
      const chosen = valid ?? list[0]?.nama ?? ''
      setPenilaiName(chosen)
      if (chosen) localStorage.setItem(PENILAI_KEY, chosen)

      // 2) data pendaftaran
      const { data: pData, error: pErr } = await supabase
        .from('pendaftaran')
        .select('*')
        .order('created_at', { ascending: true })

      if (pErr) throw pErr
      setPendaftar((pData ?? []) as PendaftaranRow[])

      // 3) nilai milik penilai yang dipilih
      if (profile && chosen) {
        const nilaiData = await getNilaiByInterviewer(profile.id, chosen)
        const map: Record<string, NilaiWawancaraRow> = {}
        nilaiData.forEach((n) => {
          map[n.pendaftaran_id] = n
        })
        setNilaiMap(map)
      } else {
        setNilaiMap({})
      }
    } finally {
      setLoadingData(false)
    }
  }

  async function handleChangePenilai(name: string) {
    setPenilaiName(name)
    localStorage.setItem(PENILAI_KEY, name)

    if (!profile) return
    setLoadingData(true)
    try {
      const nilaiData = await getNilaiByInterviewer(profile.id, name)
      const map: Record<string, NilaiWawancaraRow> = {}
      nilaiData.forEach((n) => {
        map[n.pendaftaran_id] = n
      })
      setNilaiMap(map)
    } finally {
      setLoadingData(false)
    }
  }

  const filtered = useMemo(
    () =>
      pendaftar.filter((d) => {
        const matchBidang = bidangFilter === 'semua' || d.bidang1 === bidangFilter || d.bidang2 === bidangFilter
        const q = searchQuery.toLowerCase()
        return matchBidang && (!q || d.nama.toLowerCase().includes(q) || d.npm.includes(q))
      }),
    [pendaftar, bidangFilter, searchQuery]
  )

  async function handleSave(row: PendaftaranRow, scores: Scores, catatan: string) {
    if (!profile) return
    if (!penilaiName) {
      alert('Pilih Nama Penilai terlebih dahulu.')
      return
    }

    setSavingId(row.id)
    try {
      const saved = await upsertNilai({
        pendaftaran_id: row.id,
        interviewer_id: profile.id,
        interviewer_name: penilaiName,
        sikap: scores.sikap === '' ? null : (scores.sikap as number),
        public_speaking: scores.public_speaking === '' ? null : (scores.public_speaking as number),
        wawasan_org: scores.wawasan_org === '' ? null : (scores.wawasan_org as number),
        manajemen: scores.manajemen === '' ? null : (scores.manajemen as number),
        teamwork: scores.teamwork === '' ? null : (scores.teamwork as number),
        leadership: scores.leadership === '' ? null : (scores.leadership as number),
        komitmen: scores.komitmen === '' ? null : (scores.komitmen as number),
        bidang: scores.bidang === '' ? null : (scores.bidang as number),
        catatan: catatan || null,
      })

      setNilaiMap((p) => ({ ...p, [row.id]: saved }))
      setModalRow(null)
    } finally {
      setSavingId(null)
    }
  }

  async function handleSetSelesai(row: PendaftaranRow) {
    setUpdatingStatusId(row.id)
    try {
      const { error } = await supabase.rpc('mark_sudah_wawancara', { p_id: row.id })
      if (error) {
        await supabase.from('pendaftaran').update({ status: 'selesai_wawancara' }).eq('id', row.id)
      }
      setPendaftar((p) => p.map((d) => (d.id === row.id ? { ...d, status: 'selesai_wawancara' } : d)))
    } finally {
      setUpdatingStatusId(null)
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-himsi-hero flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#2464a8] border-t-transparent rounded-full animate-spin" />
      </div>
    )

  const BIDANG_LIST = ['PSDM', 'Sosial', 'Kominfo', 'Litbang']

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="HIMSI" className="w-8 h-8 rounded-xl" />
          <div>
            <p className="font-extrabold text-[#2464a8] text-sm">HIMSI UMDP — Pewawancara</p>
            <p className="text-xs text-gray-400 font-semibold">
              {profile?.nama} · {profile?.ruang}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={penilaiName}
              onChange={(e) => handleChangePenilai(e.target.value)}
              className="appearance-none h-9 rounded-xl border border-gray-200 bg-white pl-3 pr-8 text-xs font-extrabold text-gray-700 focus:outline-none cursor-pointer"
              disabled={penilaiList.length === 0}
            >
              {penilaiList.length === 0 ? (
                <option value="">Tidak ada penilai</option>
              ) : (
                penilaiList.map((p) => (
                  <option key={p.nama} value={p.nama}>
                    {p.nama} · {p.ruang}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowPanduan(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#2464a8] bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" /> Panduan
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#2464a8] hover:bg-red-500 px-3 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <main className="p-5 md:p-8 space-y-5 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#2464a8] to-[#5a9fd4] rounded-2xl p-5 text-white">
          <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">Panel Wawancara</p>
          <p className="text-lg font-extrabold">Selamat datang, {penilaiName || profile?.nama}!</p>
          <p className="text-sm opacity-80 mt-1">{profile?.ruang}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Peserta', value: pendaftar.length, emoji: '👥', bg: 'bg-blue-50' },
            { label: 'Sudah Dinilai', value: Object.keys(nilaiMap).length, emoji: '✅', bg: 'bg-green-50' },
            {
              label: 'Selesai Wawancara',
              value: pendaftar.filter((p) => p.status === 'selesai_wawancara').length,
              emoji: '🏁',
              bg: 'bg-indigo-50',
            },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center text-lg shrink-0`}>{s.emoji}</div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{s.label}</p>
                <p className="text-xl font-extrabold text-gray-800">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
          ℹ️ Klik <strong>"Detail"</strong> untuk melihat alasan & CV. Klik <strong>"Nilai"</strong> untuk membuka form penilaian. Klik{' '}
          <strong>"Selesai"</strong> setelah wawancara peserta selesai.
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Cari nama / NPM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 w-52"
          />
          <div className="relative">
            <select
              value={bidangFilter}
              onChange={(e) => setBidangFilter(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="semua">Semua Bidang</option>
              {BIDANG_LIST.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{filtered.length} peserta</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-extrabold text-gray-800">Daftar Peserta Wawancara</h2>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[760px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    {['No', 'Nama', 'NPM', 'Bidang 1', 'Bidang 2', 'Status', 'Nilai Saya', 'Rata-rata', 'Aksi'].map((h) => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-bold text-gray-500 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {loadingData ? (
                    <tr>
                      <td colSpan={9} className="py-16 text-center">
                        <div className="w-8 h-8 border-2 border-[#2464a8] border-t-transparent rounded-full animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row, i) => {
                      const nilai = nilaiMap[row.id]
                      const scores = nilai ? nilaiToScores(nilai) : emptyScores()
                      const avg = calcAvg(scores)
                      const sudahDinilai = !!nilai
                      const sudahSelesai = row.status === 'selesai_wawancara'

                      return (
                        <tr key={row.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors">
                          <td className="px-3 py-3 text-gray-400 font-bold text-xs">{i + 1}</td>

                          <td className="px-3 py-3">
                            <span className="text-xs font-semibold text-gray-800 max-w-[160px] truncate block">{row.nama}</span>
                          </td>

                          <td className="px-3 py-3 text-gray-600 font-mono text-xs">{row.npm}</td>

                          <td className="px-3 py-3">
                            <span className="rounded-full bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5">{row.bidang1}</span>
                          </td>

                          <td className="px-3 py-3">
                            <span className="rounded-full bg-purple-50 text-purple-700 text-xs font-bold px-2 py-0.5">{row.bidang2}</span>
                          </td>

                          <td className="px-3 py-3">
                            {sudahSelesai ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                                Selesai
                              </span>
                            ) : (
                              <span className="inline-block rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5">Pending</span>
                            )}
                          </td>

                          <td className="px-3 py-3">
                            {sudahDinilai ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                                <CheckCircle2 className="w-3 h-3" />
                                Dinilai
                              </span>
                            ) : (
                              <span className="text-xs text-gray-300 font-semibold">Belum</span>
                            )}
                          </td>

                          <td className="px-3 py-3 text-center">
                            <span className={`text-sm font-extrabold ${avg === '—' ? 'text-gray-300' : 'text-[#2464a8]'}`}>{avg}</span>
                          </td>

                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1 flex-wrap">
                              <button
                                onClick={() => setDetailRow(row)}
                                className="flex items-center gap-1 text-indigo-700 hover:bg-indigo-50 text-xs font-bold px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
                              >
                                <FileText className="w-3 h-3" /> Detail
                              </button>

                              <button
                                onClick={() => setModalRow(row)}
                                className="flex items-center gap-1 text-[#2464a8] hover:bg-blue-50 text-xs font-bold px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
                              >
                                <ClipboardList className="w-3 h-3" />
                                {sudahDinilai ? 'Edit' : 'Nilai'}
                              </button>

                              {!sudahSelesai && (
                                <button
                                  onClick={() => handleSetSelesai(row)}
                                  disabled={updatingStatusId === row.id}
                                  className="flex items-center gap-1 text-indigo-600 hover:bg-indigo-50 text-xs font-bold px-2 py-1 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50"
                                >
                                  <ChevronRight className="w-3 h-3" />
                                  {updatingStatusId === row.id ? '...' : 'Selesai'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {modalRow && (
        <PenilaianModal
          row={modalRow}
          scores={nilaiMap[modalRow.id] ? nilaiToScores(nilaiMap[modalRow.id]) : emptyScores()}
          catatan={nilaiMap[modalRow.id]?.catatan ?? ''}
          onClose={() => setModalRow(null)}
          onSave={(s, c) => handleSave(modalRow, s, c)}
          saving={savingId === modalRow.id}
          penilaiName={penilaiName}
        />
      )}

      {detailRow && <DetailModal row={detailRow} onClose={() => setDetailRow(null)} />}

      {showPanduan && <PanduanModal onClose={() => setShowPanduan(false)} />}
    </div>
  )
}