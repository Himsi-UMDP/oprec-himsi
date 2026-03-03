import { useMemo } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import PendaftarTable from "@/components/PendaftarTable";

export default function AdminDiterima() {
  const {
    loading,
    error,
    stats,
    data,
    updatingId,
    downloadingId,
    deletingId,
    handleStatusChange,
    handleDownloadCV,
    handleDelete,     
    handleLogout,
    fetchData,
  } = useDashboard();

  const rows = data ?? [];
  const diterimaCount = stats?.diterima ?? 0;

  const diterima = useMemo(
    () => rows.filter((d) => d.status === "diterima"),
    [rows]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={handleLogout} activePage="diterima" />

      <main className="flex-1 md:ml-56 p-5 md:p-8 space-y-6 pt-20 pb-24 md:pt-8 md:pb-8">
        <DashboardHeader loading={loading} onRefresh={fetchData} />

        <div className="bg-gradient-to-r from-[#2464a8] to-[#5a9fd4] rounded-2xl p-6 text-white">
          <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">
            Pendaftar Diterima
          </p>
          <h1 className="text-sm font-semibold">
            Anggota baru yang telah diterima di HIMSI UMDP 2026
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 w-fit">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl shrink-0">
            ✅
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">
              Total Diterima
            </p>
            <p className="text-3xl font-extrabold text-gray-800 leading-none">
              {diterimaCount}
              <span className="text-xs font-semibold text-gray-400 ml-1">
                Orang
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-extrabold text-gray-800">
              Daftar Anggota Diterima
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">
              {diterima.length} pendaftar telah diterima
            </p>
          </div>

          {error && (
            <div className="px-5 py-3 bg-red-50 border-b border-red-100">
              <p className="text-sm font-semibold text-red-600">⚠️ {error}</p>
            </div>
          )}

          <PendaftarTable
            rows={diterima}
            loading={loading}
            updatingId={updatingId}
            downloadingId={downloadingId}
            deletingId={deletingId ?? null}
            onStatusChange={handleStatusChange}
            onDownloadCV={handleDownloadCV}
            onDelete={handleDelete}    
          />
        </div>
      </main>
    </div>
  );
}