import { useDashboard } from "../../hooks/useDashboard";
import { STAT_CARD_CONFIG } from "@/constans";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import TableFilter from "@/components/TableFilter";
import PendaftarTable from "@/components/PendaftarTable";

export default function AdminPendaftar() {
  const {
    loading, error, stats, filtered,
    statusFilter, setStatusFilter,
    bidangFilter, setBidangFilter,
    sortOrder, setSortOrder,
    updatingId, downloadingId, deletingId,
    handleStatusChange, handleDownloadCV, handleDelete,
    handleLogout, fetchData,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={handleLogout} activePage="pendaftar" />
      <main className="flex-1 md:ml-56 p-5 md:p-8 space-y-6 pt-20 pb-24 md:pt-8 md:pb-8">
        <DashboardHeader loading={loading} onRefresh={fetchData} />
        
        <div className="bg-gradient-to-r from-[#2464a8] to-[#5a9fd4] rounded-2xl p-6 text-white">
          <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">Data Pendaftar</p>
          <h1 className="text-sm font-semibold">Semua pendaftar Open Recruitment HIMSI UMDP 2026</h1>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARD_CONFIG.map(cfg => (
            <StatCard key={cfg.key} label={cfg.label} value={stats[cfg.key]} emoji={cfg.emoji} iconBg={cfg.iconBg} iconColor={cfg.iconColor} />
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-extrabold text-gray-800">Daftar Pendaftar</h2>
          </div>
          <TableFilter statusFilter={statusFilter} bidangFilter={bidangFilter} sortOrder={sortOrder} onStatusChange={setStatusFilter} onBidangChange={setBidangFilter} onSortChange={setSortOrder} total={filtered.length} />
          {error && <div className="px-5 py-3 bg-red-50 border-b border-red-100"><p className="text-sm font-semibold text-red-600">⚠️ {error}</p></div>}
          <PendaftarTable
            rows={filtered}
            loading={loading}
            updatingId={updatingId}
            downloadingId={downloadingId}
            deletingId={deletingId}
            onStatusChange={handleStatusChange}
            onDownloadCV={handleDownloadCV}
            onDelete={handleDelete}
          />
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-400 font-semibold">Menampilkan {filtered.length} dari {stats.total} pendaftar</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}