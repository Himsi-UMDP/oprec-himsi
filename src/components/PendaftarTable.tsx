import { useState } from "react";
import { Download, X, User, FileText } from "lucide-react";
import type { PendaftaranRow } from "@/lib/supabase";
import { STATUS_CONFIG, TABLE_HEADERS } from "@/constans";

type Props = {
  rows: PendaftaranRow[];
  loading: boolean;
  updatingId: string | null;
  downloadingId: string | null;
  onStatusChange: (id: string, status: PendaftaranRow["status"]) => void;
  onDownloadCV: (row: PendaftaranRow) => void;
};

function TextModal({
  title, content, icon, onClose,
}: {
  title: string; content: string; icon: React.ReactNode; onClose: () => void;
}) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: "80vh" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-[#2464a8] shrink-0">
            {icon}
          </span>
          <p className="font-extrabold text-gray-800 text-sm flex-1 leading-tight">{title}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 flex-1">
          <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/60 shrink-0 rounded-b-2xl">
          <p className="text-xs text-gray-400 font-semibold">
            {wordCount} kata · {content.length} karakter
          </p>
        </div>
      </div>
    </div>
  );
}

function ClickableCell({ text, onOpen }: { text: string; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="text-left group block max-w-[110px]">
      <span className="block text-xs font-semibold text-gray-800 truncate group-hover:text-[#2464a8] transition-colors">
        {text}
      </span>
      <span className="text-[10px] text-gray-300 group-hover:text-[#2464a8] transition-colors">
        lihat ↗
      </span>
    </button>
  );
}

function StatusBadge({ status }: { status: PendaftaranRow["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-block rounded-full text-xs font-bold px-2.5 py-0.5 ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function ActionButtons({ row, updatingId, onStatusChange }: {
  row: PendaftaranRow; updatingId: string | null;
  onStatusChange: (id: string, status: PendaftaranRow["status"]) => void;
}) {
  const isLoading = updatingId === row.id;
  const buttons = [
    { status: "diterima" as const, label: "✓", activeClass: "bg-green-500 text-white",  idleClass: "bg-green-50 text-green-600 hover:bg-green-100"   },
    { status: "selesai"  as const, label: "✓", activeClass: "bg-blue-500 text-white", idleClass: "bg-blue-50 text-blue-600 hover:bg-blue-100"           },
    { status: "pending"  as const, label: "?", activeClass: "bg-yellow-500 text-white", idleClass: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"  },
  ];
  return (
    <div className="flex items-center gap-1">
      {buttons.map(btn => (
        <button key={btn.status} onClick={() => onStatusChange(row.id, btn.status)}
          disabled={isLoading || row.status === btn.status}
          className={["w-7 h-7 rounded-lg text-xs font-bold transition-colors disabled:cursor-not-allowed",
            row.status === btn.status ? btn.activeClass : btn.idleClass,
            isLoading ? "opacity-40" : ""].join(" ")}>
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default function PendaftarTable({ rows, loading, updatingId, downloadingId, onStatusChange, onDownloadCV }: Props) {
  const [modal, setModal] = useState<{
    title: string; content: string; icon: React.ReactNode;
  } | null>(null);

  return (
    <>
      {modal && (
        <TextModal
          title={modal.title}
          content={modal.content}
          icon={modal.icon}
          onClose={() => setModal(null)}
        />
      )}

      <div className="w-full overflow-x-auto">
        <div className="min-w-[680px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                {TABLE_HEADERS.map(h => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-bold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={TABLE_HEADERS.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#2464a8] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-400 font-semibold">Memuat data pendaftar...</p>
                  </div>
                </td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={TABLE_HEADERS.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📭</span>
                    <p className="text-sm text-gray-400 font-semibold">Belum ada data</p>
                  </div>
                </td></tr>
              ) : rows.map((row, i) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-3 py-3 text-gray-400 font-bold text-xs">{i + 1}</td>

                  <td className="px-3 py-3">
                    <ClickableCell text={row.nama}
                      onOpen={() => setModal({ title: "Nama Lengkap", content: row.nama, icon: <User className="w-4 h-4" /> })} />
                  </td>

                  <td className="px-3 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{row.npm}</td>

                  <td className="px-3 py-3 text-center">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{row.angkatan}</span>
                  </td>

                  <td className="px-3 py-3">
                    <span className="rounded-full bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 whitespace-nowrap">{row.bidang1}</span>
                  </td>

                  <td className="px-3 py-3">
                    <span className="rounded-full bg-purple-50 text-purple-700 text-xs font-bold px-2 py-0.5 whitespace-nowrap">{row.bidang2}</span>
                  </td>

                  <td className="px-3 py-3">
                    <ClickableCell text={row.alasan}
                      onOpen={() => setModal({ title: `Alasan — ${row.nama}`, content: row.alasan, icon: <FileText className="w-4 h-4" /> })} />
                  </td>

                  <td className="px-3 py-3"><StatusBadge status={row.status} /></td>

                  <td className="px-3 py-3">
                    {row.cv_url ? (
                      <button onClick={() => onDownloadCV(row)} disabled={downloadingId === row.id}
                        className="flex items-center gap-1 text-[#2464a8] hover:underline text-xs font-bold disabled:opacity-50 whitespace-nowrap">
                        <Download className="w-3 h-3" />
                        {downloadingId === row.id ? "..." : "Unduh"}
                      </button>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </td>

                  <td className="px-3 py-3">
                    <ActionButtons row={row} updatingId={updatingId} onStatusChange={onStatusChange} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}