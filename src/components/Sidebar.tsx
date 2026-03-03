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

const NAV_ICONS = {
  dashboard: <LayoutDashboard className="w-4 h-4" />,
  pendaftar: <Users className="w-4 h-4" />,
  diterima:  <CheckCircle2 className="w-4 h-4" />,
};

export default function Sidebar({ onLogout, activePage = "dashboard" }: Props) {
  const navigate = useNavigate();

  return (
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
  );
}