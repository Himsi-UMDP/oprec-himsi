import { RefreshCw, LogOut } from "lucide-react";

type Props = {
  loading: boolean;
  onRefresh: () => void;
  onLogout: () => void;
};

export default function DashboardHeader({ loading, onRefresh, onLogout }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-extrabold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 font-semibold mt-0.5">
          Open Recruitment HIMSI UMDP 2026
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-semibold text-[#2464a8] hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
        {/* Mobile logout */}
        <button
          onClick={onLogout}
          className="md:hidden flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}