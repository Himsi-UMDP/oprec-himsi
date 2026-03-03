import { Download } from "lucide-react";
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

function StatusBadge({ status }: { status: PendaftaranRow["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-block rounded-full text-xs font-bold px-2.5 py-0.5 ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function ActionButtons({ row, updatingId, onStatusChange }: {
  row: PendaftaranRow;
  updatingId: string | null;
  onStatusChange: (id: string, status: PendaftaranRow["status"]) => void;
}) {
  const isLoading = updatingId === row.id;

  const buttons: { status: PendaftaranRow["status"]; label: string; activeClass: string; idleClass: string }[] = [
    { status: "diterima", label: "✓", activeClass: "bg-green-500 text-white",  idleClass: "bg-green-50 text-green-600 hover:bg-green-100" },
    { status: "ditolak",  label: "✕", activeClass: "bg-red-500 text-white",    idleClass: "bg-red-50 text-red-600 hover:bg-red-100"       },
    { status: "pending",  label: "?", activeClass: "bg-yellow-400 text-white", idleClass: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100" },
  ];

  return (
    <div className="flex items-center gap-1">
      {buttons.map(btn => (
        <button
          key={btn.status}
          onClick={() => onStatusChange(row.id, btn.status)}
          disabled={isLoading || row.status === btn.status}
          title={btn.status}
          className={[
            "w-7 h-7 rounded-lg text-xs font-bold transition-colors",
            "disabled:cursor-not-allowed",
            row.status === btn.status ? btn.activeClass : btn.idleClass,
            isLoading ? "opacity-40" : "",
          ].join(" ")}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default function PendaftarTable({ rows, loading, updatingId, downloadingId, onStatusChange, onDownloadCV }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/80">
            {TABLE_HEADERS.map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 whitespace-nowrap tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={TABLE_HEADERS.length} className="px-4 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#2464a8] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-400 font-semibold">Memuat data pendaftar...</p>
                </div>
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={TABLE_HEADERS.length} className="px-4 py-16 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">📭</span>
                  <p className="text-sm text-gray-400 font-semibold">Belum ada data pendaftar</p>
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                <td className="px-4 py-3 text-gray-400 font-bold text-xs">{i + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap max-w-[140px] truncate">{row.nama}</td>
                <td className="px-4 py-3 text-gray-600 font-semibold whitespace-nowrap font-mono text-xs">{row.npm}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{row.angkatan}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5">{row.bidang1}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-0.5">{row.bidang2}</span>
                </td>
                <td className="px-4 py-3 max-w-[160px]">
                  <p className="text-xs text-gray-500 font-semibold truncate" title={row.alasan}>{row.alasan}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3">
                  {row.cv_url ? (
                    <button
                      onClick={() => onDownloadCV(row)}
                      disabled={downloadingId === row.id}
                      className="flex items-center gap-1 text-[#2464a8] hover:underline text-xs font-bold disabled:opacity-50 whitespace-nowrap"
                    >
                      <Download className="w-3 h-3" />
                      {downloadingId === row.id ? "..." : "Unduh CV"}
                    </button>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <ActionButtons row={row} updatingId={updatingId} onStatusChange={onStatusChange} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}