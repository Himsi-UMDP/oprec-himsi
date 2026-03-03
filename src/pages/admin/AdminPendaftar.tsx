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
    updatingId, downloadingId,
    handleStatusChange, handleDownloadCV,
    handleLogout, fetchData,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={handleLogout} activePage="pendaftar" />

      <main className="flex-1 md:ml-56 p-5 md:p-8 space-y-6">

        <DashboardHeader loading={loading} onRefresh={fetchData} onLogout={handleLogout} />

        <div>
          <h1 className="text-xl font-extrabold text-gray-800">Data Pendaftar</h1>
          <p className="text-sm text-gray-400 font-semibold mt-0.5">
            Semua pendaftar Open Recruitment HIMSI UMDP 2026
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARD_CONFIG.map(cfg => (
            <StatCard
              key={cfg.key}
              label={cfg.label}
              value={stats[cfg.key]}
              emoji={cfg.emoji}
              iconBg={cfg.iconBg}
              iconColor={cfg.iconColor}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-gray-800">Daftar Pendaftar</h2>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">
                Kelola dan review setiap pendaftar di sini
              </p>
            </div>
          </div>

          <TableFilter
            statusFilter={statusFilter}
            bidangFilter={bidangFilter}
            sortOrder={sortOrder}
            onStatusChange={setStatusFilter}
            onBidangChange={setBidangFilter}
            onSortChange={setSortOrder}
            total={filtered.length}
          />

          {error && (
            <div className="px-5 py-3 bg-red-50 border-b border-red-100">
              <p className="text-sm font-semibold text-red-600">⚠️ {error}</p>
            </div>
          )}

          <PendaftarTable
            rows={filtered}
            loading={loading}
            updatingId={updatingId}
            downloadingId={downloadingId}
            onStatusChange={handleStatusChange}
            onDownloadCV={handleDownloadCV}
          />

          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-400 font-semibold">
                Menampilkan {filtered.length} dari {stats.total} pendaftar
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}