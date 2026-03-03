import { useState, useMemo, useEffect, useCallback } from 'react'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'
import { getAllNilai, updateNilaiById } from '@/services/nilaiWawancara'
import { supabase } from '@/lib/supabase'
import type { NilaiWawancaraRow, PendaftaranRow, NilaiWawancaraUpdate } from '@/lib/supabase'
import { X, Edit2, Save, ChevronDown } from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'

const SCORE_CATEGORIES = [
    { key: 'sikap',           label: 'Sikap'           },
    { key: 'public_speaking', label: 'Public Speaking' },
    { key: 'wawasan_org',     label: 'Wawasan Org.'    },
    { key: 'manajemen',       label: 'Man. Waktu'      },
    { key: 'teamwork',        label: 'Teamwork'        },
    { key: 'leadership',      label: 'Leadership'      },
    { key: 'komitmen',        label: 'Komitmen'        },
    { key: 'bidang',          label: 'Bidang'          },
] as const

type ScoreKey = (typeof SCORE_CATEGORIES)[number]['key']

function calcAvgRow(n: NilaiWawancaraRow): number | null {
    const vals = [n.sikap, n.public_speaking, n.wawasan_org, n.manajemen, n.teamwork, n.leadership, n.komitmen, n.bidang]
        .filter((v): v is number => v !== null)
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
}

function ScoreBadge({ value }: { value: number | null }) {
    if (value === null) return <span className="text-gray-300 text-xs font-bold">—</span>
    const colors = ['', 'bg-red-100 text-red-700', 'bg-orange-100 text-orange-700', 'bg-yellow-100 text-yellow-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700']
    return <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold ${colors[value]}`}>{value}</span>
}

function EditModal({ nilai, onClose, onSave }: {
    nilai: NilaiWawancaraRow; onClose: () => void
    onSave: (id: string, u: NilaiWawancaraUpdate & { catatan?: string | null }) => void
}) {
    const [local, setLocal] = useState<Record<ScoreKey, number | null>>({
        sikap: nilai.sikap, public_speaking: nilai.public_speaking, wawasan_org: nilai.wawasan_org,
        manajemen: nilai.manajemen, teamwork: nilai.teamwork, leadership: nilai.leadership,
        komitmen: nilai.komitmen, bidang: nilai.bidang,
    })
    const [catatan, setCatatan] = useState(nilai.catatan ?? '')
    const vals = Object.values(local).filter((v): v is number => v !== null)
    const avgNum = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
    const avg = avgNum !== null ? avgNum.toFixed(1) : '—'

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><Edit2 className="w-4 h-4" /></div>
                    <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-gray-800 text-sm">Edit Nilai Wawancara</p>
                        <p className="text-xs text-gray-400 font-semibold">Pewawancara: {nilai.interviewer_name}</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
                </div>
                <div className="overflow-y-auto flex-1 px-5 py-5 space-y-3">
                    {SCORE_CATEGORIES.map(cat => (
                        <div key={cat.key} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                            <p className="text-sm font-extrabold text-gray-800 mb-2">{cat.label}</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button key={n} onClick={() => setLocal(p => ({ ...p, [cat.key]: p[cat.key as ScoreKey] === n ? null : n }))}
                                        className={['flex-1 h-9 rounded-xl text-sm font-extrabold border-2 transition-all', local[cat.key as ScoreKey] === n ? 'bg-[#2464a8] text-white border-[#2464a8]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2464a8]/50'].join(' ')}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-600">Rata-rata Baru</p>
                        <span className="text-2xl font-extrabold text-[#2464a8]">{avg}</span>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Catatan</label>
                        <textarea value={catatan} onChange={e => setCatatan(e.target.value)}
                            className="w-full min-h-[80px] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                            placeholder="Tambahkan catatan..." />
                    </div>
                </div>
                <div className="px-5 py-4 border-t border-gray-100 shrink-0">
                    <button onClick={() => { onSave(nilai.id, { ...local, catatan: catatan || null }); onClose() }}
                        className="w-full h-11 bg-[#2464a8] hover:bg-[#2464a8]/90 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        <Save className="w-4 h-4" /> Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function AdminRekap() {
    const { handleLogout, fetchData, loading: dashLoading } = useDashboard()
    const [nilaiList, setNilaiList] = useState<NilaiWawancaraRow[]>([])
    const [pendaftarMap, setPendaftarMap] = useState<Record<string, PendaftaranRow>>({})
    const [loading, setLoading] = useState(true)
    const [editNilai, setEditNilai] = useState<NilaiWawancaraRow | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [bidangFilter, setBidangFilter] = useState('semua')
    const [interviewerFilter, setInterviewerFilter] = useState('semua')

    const fetchAll = useCallback(async () => {
        setLoading(true)
        try {
            const nilaiData = await getAllNilai()
            setNilaiList(nilaiData)
            const { data } = await supabase.from('pendaftaran').select('*')
            const map: Record<string, PendaftaranRow> = {}
            ;(data ?? []).forEach((d: PendaftaranRow) => { map[d.id] = d })
            setPendaftarMap(map)
        } finally { setLoading(false) }
    }, [])

    useEffect(() => { fetchAll() }, [fetchAll])

    const interviewerList = useMemo(() => Array.from(new Set(nilaiList.map(n => n.interviewer_name))).sort(), [nilaiList])

    const filtered = useMemo(() => nilaiList.filter(n => {
        const p = pendaftarMap[n.pendaftaran_id]
        const matchBidang = bidangFilter === 'semua' || p?.bidang1 === bidangFilter || p?.bidang2 === bidangFilter
        const matchItv = interviewerFilter === 'semua' || n.interviewer_name === interviewerFilter
        const q = searchQuery.toLowerCase()
        const matchSearch = !q || (p?.nama ?? '').toLowerCase().includes(q) || (p?.npm ?? '').includes(q) || n.interviewer_name.toLowerCase().includes(q)
        return matchBidang && matchItv && matchSearch
    }), [nilaiList, pendaftarMap, bidangFilter, interviewerFilter, searchQuery])

    const rekapPeserta = useMemo(() => {
        const map: Record<string, { peserta: PendaftaranRow; nilaiArr: NilaiWawancaraRow[] }> = {}
        filtered.forEach(n => {
            const peserta = pendaftarMap[n.pendaftaran_id]
            if (!peserta) return
            if (!map[n.pendaftaran_id]) map[n.pendaftaran_id] = { peserta, nilaiArr: [] }
            map[n.pendaftaran_id].nilaiArr.push(n)
        })
        return Object.values(map)
    }, [filtered, pendaftarMap])

    async function handleSave(id: string, updates: NilaiWawancaraUpdate & { catatan?: string | null }) {
        await updateNilaiById(id, updates)
        setNilaiList(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n))
    }

    const BIDANG_LIST = ['PSDM', 'Sosial', 'Kominfo', 'Litbang']
    const totalPesertaDinilai = new Set(nilaiList.map(n => n.pendaftaran_id)).size

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar onLogout={handleLogout} activePage="rekap" />
            <main className="flex-1 md:ml-56 p-5 md:p-8 space-y-6 pt-20 pb-24 md:pt-8 md:pb-8">
                <DashboardHeader loading={loading || dashLoading} onRefresh={() => { fetchAll(); fetchData() }} />

                <div className="bg-gradient-to-r from-[#2464a8] to-[#5a9fd4] rounded-2xl p-6 text-white">
                    <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">Rekap</p>
                    <h1 className="text-xl font-extrabold">Rekap Nilai Wawancara</h1>
                    <p className="text-sm opacity-80 mt-1">Seluruh hasil penilaian dari semua pewawancara</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Penilaian',   value: nilaiList.length,                                      emoji: '📋', bg: 'bg-blue-100'   },
                        { label: 'Peserta Dinilai',   value: totalPesertaDinilai,                                   emoji: '👥', bg: 'bg-green-100'  },
                        { label: 'Pewawancara Aktif', value: interviewerList.length,                                emoji: '🎤', bg: 'bg-purple-100' },
                        { label: 'Belum Dinilai',     value: Math.max(0, Object.keys(pendaftarMap).length - totalPesertaDinilai), emoji: '⏳', bg: 'bg-yellow-100' },
                    ].map(s => (
                        <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-full ${s.bg} flex items-center justify-center text-xl shrink-0`}>{s.emoji}</div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide leading-tight">{s.label}</p>
                                <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                    <input type="text" placeholder="Cari nama / NPM / pewawancara..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 w-60" />
                    <div className="relative">
                        <select value={bidangFilter} onChange={e => setBidangFilter(e.target.value)} className="appearance-none rounded-xl border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer">
                            <option value="semua">Semua Bidang</option>
                            {BIDANG_LIST.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select value={interviewerFilter} onChange={e => setInterviewerFilter(e.target.value)} className="appearance-none rounded-xl border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer">
                            <option value="semua">Semua Pewawancara</option>
                            {interviewerList.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                    <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{filtered.length} penilaian</span>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="bg-white rounded-2xl p-16 text-center">
                            <div className="w-8 h-8 border-2 border-[#2464a8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-sm text-gray-400 font-semibold">Memuat rekap nilai...</p>
                        </div>
                    ) : rekapPeserta.length === 0 ? (
                        <div className="bg-white rounded-2xl p-16 text-center">
                            <span className="text-4xl">📊</span>
                            <p className="text-sm text-gray-400 font-semibold mt-2">Belum ada data penilaian</p>
                        </div>
                    ) : rekapPeserta.map(({ peserta, nilaiArr }) => {
                        const allAvgs = nilaiArr.map(calcAvgRow).filter((v): v is number => v !== null)
                        const totalAvgNum = allAvgs.length ? allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length : null
                        const totalAvg = totalAvgNum !== null ? totalAvgNum.toFixed(2) : '—'
                        const avgColor = totalAvgNum !== null ? totalAvgNum >= 4 ? 'bg-green-500' : totalAvgNum >= 3 ? 'bg-blue-500' : 'bg-orange-500' : 'bg-gray-300'

                        return (
                            <div key={peserta.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#2464a8]/10 flex items-center justify-center text-[#2464a8] font-extrabold text-sm shrink-0">
                                            {peserta.nama.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-gray-800 text-sm">{peserta.nama}</p>
                                            <p className="text-xs text-gray-400 font-semibold">{peserta.npm} · {peserta.bidang1} / {peserta.bidang2}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{nilaiArr.length} pewawancara</span>
                                        <div className={`${avgColor} text-white rounded-xl px-3 py-1.5 text-sm font-extrabold`}>Avg {totalAvg}</div>
                                    </div>
                                </div>
                                <div className="w-full overflow-x-auto">
                                    <div className="min-w-[860px]">
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="border-b border-gray-50 bg-gray-50/60">
                                                    <th className="px-4 py-2.5 text-left font-bold text-gray-500">Pewawancara</th>
                                                    {SCORE_CATEGORIES.map(cat => <th key={cat.key} className="px-2 py-2.5 text-center font-bold text-gray-500 whitespace-nowrap">{cat.label}</th>)}
                                                    <th className="px-3 py-2.5 text-center font-bold text-gray-500">Avg</th>
                                                    <th className="px-3 py-2.5 text-left font-bold text-gray-500 min-w-[120px]">Catatan</th>
                                                    <th className="px-3 py-2.5 text-center font-bold text-gray-500">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {nilaiArr.map(n => {
                                                    const avgN = calcAvgRow(n)
                                                    return (
                                                        <tr key={n.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors">
                                                            <td className="px-4 py-3">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-extrabold shrink-0">{n.interviewer_name.charAt(0).toUpperCase()}</div>
                                                                    <span className="font-bold text-gray-700 whitespace-nowrap">{n.interviewer_name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.sikap} /></td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.public_speaking} /></td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.wawasan_org} /></td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.manajemen} /></td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.teamwork} /></td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.leadership} /></td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.komitmen} /></td>
                                                            <td className="px-2 py-3 text-center"><ScoreBadge value={n.bidang} /></td>
                                                            <td className="px-3 py-3 text-center">
                                                                <span className={`text-sm font-extrabold ${avgN !== null ? avgN >= 4 ? 'text-green-600' : avgN >= 3 ? 'text-blue-600' : 'text-orange-600' : 'text-gray-300'}`}>
                                                                    {avgN !== null ? avgN.toFixed(1) : '—'}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-3 max-w-[160px]"><span className="text-xs text-gray-500 font-semibold line-clamp-2">{n.catatan || '—'}</span></td>
                                                            <td className="px-3 py-3 text-center">
                                                                <button onClick={() => setEditNilai(n)} className="flex items-center gap-1 text-amber-600 hover:bg-amber-50 text-xs font-bold px-2 py-1 rounded-lg transition-colors mx-auto whitespace-nowrap">
                                                                    <Edit2 className="w-3 h-3" /> Edit
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
            {editNilai && <EditModal nilai={editNilai} onClose={() => setEditNilai(null)} onSave={handleSave} />}
        </div>
    )
}