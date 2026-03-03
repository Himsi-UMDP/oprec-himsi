import { LayoutDashboard, Users, CheckCircle2, LogOut } from "lucide-react";

type Props = {
  onLogout: () => void;
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  icon: <LayoutDashboard className="w-4 h-4" />, active: true  },
  { id: "pendaftar", label: "Pendaftar",  icon: <Users className="w-4 h-4" />,            active: false },
  { id: "diterima",  label: "Diterima",   icon: <CheckCircle2 className="w-4 h-4" />,     active: false },
];

export default function Sidebar({ onLogout }: Props) {
  return (
    <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 py-6 px-3 gap-1 fixed h-full z-10 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <img src="/logo.png" alt="HIMSI" className="w-9 h-9 rounded-xl shadow-sm" />
        <div>
          <p className="font-bold text-[#2464a8] text-sm leading-tight">HIMSI UMDP</p>
          <p className="text-[10px] text-gray-400 font-semibold">Admin Panel</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={[
              "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
              item.active
                ? "bg-[#2464a8] text-white shadow-md shadow-blue-200"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
            ].join(" ")}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <div className="border-t border-gray-100 pt-3">
          <button
            onClick={onLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}