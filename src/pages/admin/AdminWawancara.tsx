import { useDashboard } from "../../hooks/useDashboard";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useState, useMemo } from "react";
import type { PendaftaranRow } from "@/lib/supabase";
import { X, ClipboardList, Save, ChevronDown } from "lucide-react";

const SCORE_CATEGORIES = [
    { key: "sikap",         label: "Sikap"             },
    { key: "public_speaking", label: "Public Speaking" },
    { key: "wawasan_org",  label: "Wawasan Organisasi" },
    { key: "manajemen",    label: "Manajemen Waktu"    },
    { key: "teamwork",     label: "Teamwork"           },
    { key: "leadership",   label: "Leadership"         },
    { key: "komitmen",     label: "Komitmen"           },
    { key: "bidang",       label: "Bidang"             },
] as const;

type ScoreKey = (typeof SCORE_CATEGORIES)[number]["key"];
type Scores = Record<ScoreKey, number | "">;

const emptyScores = (): Scores =>
  Object.fromEntries(SCORE_CATEGORIES.map((c) => [c.key, ""])) as Scores;

function ScoreBadge({ value }: { value: number | "" }) {
    if (value === "") return <span className="text-gray-300 text-xs font-bold">—</span>;
    const colors = [
        "", 
        "bg-red-100 text-red-700",
        "bg-orange-100 text-orange-700",
        "bg-yellow-100 text-yellow-700",
        "bg-blue-100 text-blue-700",
        "bg-green-100 text-green-700",
    ];
    return (
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold ${colors[value as number]}`}>
            {value}
        </span>
    );
}

function calcAvg(scores: Scores): string {
    const vals = Object.values(scores).filter((v) => v !== "") as number[];
    if (!vals.length) return "—";
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
}

function PenilaianModal({
  row,
  scores,
  onClose,
  onSave,
}: {
  row: PendaftaranRow;
  scores: Scores;
  onClose: () => void;
  onSave: (scores: Scores) => void;
}) {
  const [local, setLocal] = useState<Scores>({ ...scores });

  const setScore = (key: ScoreKey, val: number | "") =>
    setLocal((p) => ({ ...p, [key]: val }));

  const avg = calcAvg(local);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-[#2464a8] shrink-0">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-gray-800 text-sm truncate">{row.nama}</p>
            <p className="text-xs text-gray-400 font-semibold">{row.npm} · {row.bidang1} / {row.bidang2}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Nilai 1 (Sangat Buruk) — 5 (Sangat Baik)
          </p>
          {SCORE_CATEGORIES.map((cat) => (
            <div key={cat.key} className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-gray-700 w-40 shrink-0">{cat.label}</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setScore(cat.key as ScoreKey, local[cat.key as ScoreKey] === n ? "" : n)}
                    className={[
                      "w-9 h-9 rounded-xl text-sm font-extrabold border-2 transition-all",
                      local[cat.key as ScoreKey] === n
                        ? "bg-[#2464a8] text-white border-[#2464a8] shadow-md"
                        : "bg-gray-50 text-gray-400 border-transparent hover:border-gray-300",
                    ].join(" ")}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-600">Rata-rata</span>
            <span className={`text-lg font-extrabold ${avg === "—" ? "text-gray-300" : "text-[#2464a8]"}`}>
              {avg}
            </span>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={() => { onSave(local); onClose(); }}
            className="w-full h-10 bg-[#2464a8] hover:bg-[#2464a8]/90 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan Penilaian
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminWawancara() {
  const { loading, data, handleLogout, fetchData } = useDashboard();

  const [allScores, setAllScores] = useState<Record<string, Scores>>({});
  const [modalRow, setModalRow] = useState<PendaftaranRow | null>(null);

  const [bidangFilter, setBidangFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return (data ?? []).filter((d) => {
      const matchBidang =
        bidangFilter === "semua" ||
        d.bidang1 === bidangFilter ||
        d.bidang2 === bidangFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        d.nama.toLowerCase().includes(q) ||
        d.npm.includes(q);
      return matchBidang && matchSearch;
    });
  }, [data, bidangFilter, searchQuery]);

  const handleSave = (id: string, scores: Scores) => {
    setAllScores((p) => ({ ...p, [id]: scores }));
  };

  const BIDANG_LIST = ["PSDM", "Sosial", "Kominfo", "Litbang"];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={handleLogout} activePage="wawancara" />

      <main className="flex-1 md:ml-56 p-5 md:p-8 space-y-6 pt-20 pb-24 md:pt-8 md:pb-8">
        <DashboardHeader loading={loading} onRefresh={fetchData} />

        <div className="bg-gradient-to-r from-[#2464a8] to-[#5a9fd4] rounded-2xl p-6 text-white">
          <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">Wawancara</p>
          <h1 className="text-xl font-extrabold">Penilaian Wawancara</h1>
          <p className="text-sm opacity-80 mt-1">Rekrutmen Calon Anggota HIMSI UMDP 2026/2027</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Cari nama / NPM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 w-48"
          />
          <div className="relative">
            <select
              value={bidangFilter}
              onChange={(e) => setBidangFilter(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              <option value="semua">Semua Bidang</option>
              {BIDANG_LIST.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {filtered.length} peserta
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-extrabold text-gray-800">Tabel Penilaian Peserta</h2>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">Klik "Nilai" untuk membuka form penilaian wawancara</p>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[900px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    {["No","Nama","NPM","Bidang 1","Bidang 2",
                      "Sikap","Public Speaking","Wawasan Org","Manajemen Waktu",
                      "Teamwork","Leadership","Komitmen","Bidang","Rata-rata","Aksi"
                    ].map((h) => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-bold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={15} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-[#2464a8] border-t-transparent rounded-full animate-spin" />
                          <p className="text-sm text-gray-400 font-semibold">Memuat data...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={15} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-4xl">📋</span>
                          <p className="text-sm text-gray-400 font-semibold">Belum ada data</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row, i) => {
                      const scores = allScores[row.id] ?? emptyScores();
                      return (
                        <tr key={row.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                          <td className="px-3 py-3 text-gray-400 font-bold text-xs">{i + 1}</td>
                          <td className="px-3 py-3">
                            <span className="text-xs font-semibold text-gray-800 max-w-[120px] truncate block">{row.nama}</span>
                          </td>
                          <td className="px-3 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{row.npm}</td>
                          <td className="px-3 py-3">
                            <span className="rounded-full bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 whitespace-nowrap">{row.bidang1}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className="rounded-full bg-purple-50 text-purple-700 text-xs font-bold px-2 py-0.5 whitespace-nowrap">{row.bidang2}</span>
                          </td>
                          {SCORE_CATEGORIES.map((cat) => (
                            <td key={cat.key} className="px-3 py-3 text-center">
                              <ScoreBadge value={scores[cat.key as ScoreKey]} />
                            </td>
                          ))}
                          <td className="px-3 py-3 text-center">
                            <span className={`text-sm font-extrabold ${calcAvg(scores) === "—" ? "text-gray-300" : "text-[#2464a8]"}`}>
                              {calcAvg(scores)}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <button
                              onClick={() => setModalRow(row)}
                              className="flex items-center gap-1 text-[#2464a8] hover:bg-blue-50 text-xs font-bold px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
                            >
                              <ClipboardList className="w-3 h-3" />
                              Nilai
                            </button>
                          </td>
                        </tr>
                      );
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
          scores={allScores[modalRow.id] ?? emptyScores()}
          onClose={() => setModalRow(null)}
          onSave={(scores) => handleSave(modalRow.id, scores)}
        />
      )}
    </div>
  );
}