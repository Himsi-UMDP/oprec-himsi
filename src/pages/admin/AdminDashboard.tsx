import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { PendaftaranRow } from "@/lib/supabase";
import {
  getAllPendaftar,
  updateStatus,
  getCVSignedUrl,
} from "@/services/pendaftaran";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut,
  Download,
  RefreshCw,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

type StatusFilter = "semua" | PendaftaranRow["status"];
type BidangFilter = "semua" | string;

const STATUS_LABEL: Record<PendaftaranRow["status"], string> = {
  pending: "Pending",
  diterima: "Diterima",
  ditolak: "Ditolak",
};

const STATUS_COLOR: Record<PendaftaranRow["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  diterima: "bg-green-100 text-green-700 border-green-200",
  ditolak: "bg-red-100 text-red-700 border-red-200",
};

const BIDANG_LIST = ["PSDM", "Sosial", "Kominfo", "Litbang"];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<PendaftaranRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");
  const [bidangFilter, setBidangFilter] = useState<BidangFilter>("semua");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
    });
  }, [navigate]);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const rows = await getAllPendaftar();
      setData(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const total = data.length;
    const diterima = data.filter((d) => d.status === "diterima").length;
    const ditolak = data.filter((d) => d.status === "ditolak").length;
    const pending = data.filter((d) => d.status === "pending").length;
    const perBidang = BIDANG_LIST.map((b) => ({
      name: b,
      count: data.filter((d) => d.bidang1 === b || d.bidang2 === b).length,
    }));
    return { total, diterima, ditolak, pending, perBidang };
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((d) => {
      const matchStatus =
        statusFilter === "semua" || d.status === statusFilter;
      const matchBidang =
        bidangFilter === "semua" ||
        d.bidang1 === bidangFilter ||
        d.bidang2 === bidangFilter;
      return matchStatus && matchBidang;
    });
  }, [data, statusFilter, bidangFilter]);

  async function handleStatusChange(
    id: string,
    status: PendaftaranRow["status"]
  ) {
    setUpdatingId(id);
    try {
      await updateStatus(id, status);
      setData((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDownloadCV(row: PendaftaranRow) {
    if (!row.cv_url) return alert("CV tidak tersedia.");
    setDownloadingId(row.id);
    try {
      const url = await getCVSignedUrl(row.cv_url);
      window.open(url, "_blank");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal mengunduh CV.");
    } finally {
      setDownloadingId(null);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 py-6 px-4 gap-2 fixed h-full z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-6">
          <img src="/logo.png" alt="HIMSI" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-[#2464a8] text-sm">HIMSI UMDP</span>
        </div>

        <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-56 p-6 space-y-6">
        {/* Top bar mobile */}
        <div className="flex items-center justify-between md:hidden">
          <span className="font-bold text-[#2464a8]">HIMSI Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm font-semibold text-red-500"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500 font-semibold">
              Open Recruitment HIMSI UMDP 2026
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 text-sm font-semibold text-[#2464a8] hover:underline disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Users className="w-5 h-5 text-[#2464a8]" />}
            label="Total Pendaftar"
            value={stats.total}
            color="bg-blue-50"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
            label="Diterima"
            value={stats.diterima}
            color="bg-green-50"
          />
          <StatCard
            icon={<XCircle className="w-5 h-5 text-red-500" />}
            label="Ditolak"
            value={stats.ditolak}
            color="bg-red-50"
          />
          <StatCard
            icon={<Clock className="w-5 h-5 text-yellow-500" />}
            label="Pending"
            value={stats.pending}
            color="bg-yellow-50"
          />
        </div>

        {/* Per Bidang */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.perBidang.map((b) => (
            <div
              key={b.name}
              className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm"
            >
              <p className="text-2xl font-extrabold text-[#2464a8]">
                {b.count}
              </p>
              <p className="text-xs font-bold text-gray-500 mt-1">{b.name}</p>
              <p className="text-xs text-gray-400">pendaftar</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-3 p-4 border-b border-gray-100">
            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={(v) => setStatusFilter(v as StatusFilter)}
              options={[
                { value: "semua", label: "Semua Status" },
                { value: "pending", label: "Pending" },
                { value: "diterima", label: "Diterima" },
                { value: "ditolak", label: "Ditolak" },
              ]}
            />
            <FilterSelect
              label="Bidang"
              value={bidangFilter}
              onChange={setBidangFilter}
              options={[
                { value: "semua", label: "Semua Bidang" },
                ...BIDANG_LIST.map((b) => ({ value: b, label: b })),
              ]}
            />
            <span className="ml-auto text-xs font-semibold text-gray-400 self-center">
              {filtered.length} data
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 text-sm font-semibold text-red-600 bg-red-50">
              {error}
            </div>
          )}

          {/* Table scroll */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["No", "Nama", "NPM", "Angkatan", "Bidang 1", "Bidang 2", "Status", "CV", "Aksi"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-bold text-gray-500 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-12 text-center text-gray-400 font-semibold"
                    >
                      Memuat data...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-12 text-center text-gray-400 font-semibold"
                    >
                      Belum ada data pendaftar.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 font-semibold">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                        {row.nama}
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-semibold whitespace-nowrap">
                        {row.npm}
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-semibold">
                        {row.angkatan}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block rounded-full bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5">
                          {row.bidang1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block rounded-full bg-purple-50 text-purple-700 text-xs font-bold px-2 py-0.5">
                          {row.bidang2}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full border text-xs font-bold px-2 py-0.5 ${STATUS_COLOR[row.status]}`}
                        >
                          {STATUS_LABEL[row.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {row.cv_url ? (
                          <button
                            onClick={() => handleDownloadCV(row)}
                            disabled={downloadingId === row.id}
                            className="flex items-center gap-1 text-[#2464a8] hover:underline text-xs font-bold disabled:opacity-50"
                          >
                            <Download className="w-3 h-3" />
                            {downloadingId === row.id ? "..." : "Unduh"}
                          </button>
                        ) : (
                          <span className="text-gray-300 text-xs font-semibold">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <StatusButton
                            label="✓"
                            title="Terima"
                            active={row.status === "diterima"}
                            loading={updatingId === row.id}
                            color="green"
                            onClick={() =>
                              handleStatusChange(row.id, "diterima")
                            }
                          />
                          <StatusButton
                            label="✕"
                            title="Tolak"
                            active={row.status === "ditolak"}
                            loading={updatingId === row.id}
                            color="red"
                            onClick={() =>
                              handleStatusChange(row.id, "ditolak")
                            }
                          />
                          <StatusButton
                            label="?"
                            title="Pending"
                            active={row.status === "pending"}
                            loading={updatingId === row.id}
                            color="yellow"
                            onClick={() =>
                              handleStatusChange(row.id, "pending")
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-800">{value}</p>
        <p className="text-xs font-bold text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
        active
          ? "bg-[#2464a8]/10 text-[#2464a8]"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2464a8]/30 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
    </div>
  );
}

function StatusButton({
  label,
  title,
  active,
  loading,
  color,
  onClick,
}: {
  label: string;
  title: string;
  active: boolean;
  loading: boolean;
  color: "green" | "red" | "yellow";
  onClick: () => void;
}) {
  const colorMap = {
    green: active
      ? "bg-green-500 text-white"
      : "bg-green-50 text-green-600 hover:bg-green-100",
    red: active
      ? "bg-red-500 text-white"
      : "bg-red-50 text-red-600 hover:bg-red-100",
    yellow: active
      ? "bg-yellow-400 text-white"
      : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading || active}
      title={title}
      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors disabled:cursor-not-allowed ${colorMap[color]} ${active ? "opacity-100" : ""} ${loading ? "opacity-40" : ""}`}
    >
      {label}
    </button>
  );
}