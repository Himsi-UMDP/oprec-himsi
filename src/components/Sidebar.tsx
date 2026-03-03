import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CheckCircle2, LogOut } from "lucide-react";
import { Button } from "./ui/button";

type ActivePage = "dashboard" | "pendaftar" | "diterima";

type Props = {
  onLogout: () => void;
  activePage?: ActivePage;
};

const NAV_ITEMS = [
  { id: "dashboard" as ActivePage, label: "Dashboard", href: "/admin/dashboard" },
  { id: "pendaftar" as ActivePage, label: "Pendaftar", href: "/admin/pendaftar" },
  { id: "diterima"  as ActivePage, label: "Diterima",  href: "/admin/diterima"  },
];

const NAV_ICONS: Record<ActivePage, React.ReactNode> = {
  dashboard: <LayoutDashboard className="w-4 h-4" />,
  pendaftar: <Users className="w-4 h-4" />,
  diterima:  <CheckCircle2 className="w-4 h-4" />,
};

export default function Sidebar({ onLogout, activePage = "dashboard" }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 py-6 px-3 gap-1 fixed h-full z-10 shadow-sm">
        <div className="flex items-center gap-2.5 px-3 mb-8">
          <img src="/logo.png" alt="HIMSI" className="w-9 h-9 rounded-xl shadow-sm" />
          <div>
            <p className="font-bold text-[#2464a8] text-sm leading-tight">HIMSI UMDP</p>
            <p className="text-[10px] text-gray-400 font-semibold">Admin Panel</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.href)}
              className={[
                "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left",
                activePage === item.id
                  ? "bg-[#2464a8] text-white shadow-md shadow-blue-200"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
              ].join(" ")}
            >
              {NAV_ICONS[item.id]}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="border-t border-gray-100 pt-3">
            <Button
              onClick={onLogout}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <header className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="HIMSI" className="w-8 h-8 rounded-lg" />
          <p className="font-bold text-[#2464a8] text-sm">HIMSI Admin</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-50 px-3 py-1.5 rounded-lg"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.href)}
            className={[
              "flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl text-xs font-semibold transition-all",
              activePage === item.id
                ? "text-[#2464a8] bg-blue-50"
                : "text-gray-400 hover:text-gray-600",
            ].join(" ")}
          >
            <span>{NAV_ICONS[item.id]}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}