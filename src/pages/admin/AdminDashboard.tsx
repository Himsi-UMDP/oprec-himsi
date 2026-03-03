import { useDashboard } from "../../hooks/useDashboard";
import { STAT_CARD_CONFIG } from "@/constans";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import BidangCard from "@/components/BidangCard";

export default function AdminDashboard() {
  const { loading, stats, handleLogout, fetchData } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={handleLogout} activePage="dashboard" />

      <main className="flex-1 md:ml-56 p-5 md:p-8 space-y-6">

        <DashboardHeader loading={loading} onRefresh={fetchData} onLogout={handleLogout} />

        <div className="bg-gradient-to-r from-[#2464a8] to-[#5a9fd4] rounded-2xl p-6 text-white">
          <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">Selamat Datang</p>
          <h1 className="text-xl font-extrabold">Admin HIMSI UMDP</h1>
          <p className="text-sm opacity-80 font-semibold mt-1">
            Open Recruitment 2026 · Pantau perkembangan pendaftar dari sini
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ringkasan</p>
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
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pendaftar Per Bidang</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.perBidang.map(b => (
              <BidangCard key={b.name} stat={b} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Akses Cepat</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/admin/pendaftar"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-[#2464a8]/30 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl group-hover:bg-blue-200 transition-colors">👥</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Lihat Semua Pendaftar</p>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">{stats.total} pendaftar terdaftar</p>
              </div>
              <span className="ml-auto text-gray-300 group-hover:text-[#2464a8] transition-colors text-lg">→</span>
            </a>
            <a
              href="/admin/diterima"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-green-300 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl group-hover:bg-green-200 transition-colors">✅</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Pendaftar Diterima</p>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">{stats.diterima} anggota baru</p>
              </div>
              <span className="ml-auto text-gray-300 group-hover:text-green-500 transition-colors text-lg">→</span>
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}