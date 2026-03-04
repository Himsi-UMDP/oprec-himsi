import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CheckCircle2, LogOut, ClipboardList, BarChart2 } from 'lucide-react'

type ActivePage = 'dashboard' | 'pendaftar' | 'diterima' | 'wawancara' | 'rekap'
type Props = { onLogout: () => void; activePage?: ActivePage }

const NAV_ITEMS = [
    { id: 'dashboard' as ActivePage, label: 'Dashboard', href: '/admin/dashboard' },
    { id: 'pendaftar' as ActivePage, label: 'Pendaftar', href: '/admin/pendaftar' },
    { id: 'diterima'  as ActivePage, label: 'Diterima',  href: '/admin/diterima'  },
    // { id: 'wawancara' as ActivePage, label: 'Wawancara', href: '/admin/wawancara' },
    { id: 'rekap'     as ActivePage, label: 'Rekap',     href: '/admin/rekap'     },
]

const NAV_ICONS: Record<ActivePage, React.ReactNode> = {
    dashboard: <LayoutDashboard className="w-[18px] h-[18px]" />,
    pendaftar: <Users           className="w-[18px] h-[18px]" />,
    diterima:  <CheckCircle2    className="w-[18px] h-[18px]" />,
    wawancara: <ClipboardList   className="w-[18px] h-[18px]" />,
    rekap:     <BarChart2       className="w-[18px] h-[18px]" />,
}

export default function Sidebar({ onLogout, activePage = 'dashboard' }: Props) {
    const navigate = useNavigate()
    return (
        <>
            <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 py-6 px-3 fixed h-full z-10 shadow-sm">
                <div className="flex items-center gap-2.5 px-3 mb-8">
                    <img src="/logo.png" alt="HIMSI" className="w-9 h-9 rounded-xl shadow-sm" />
                    <div>
                        <p className="font-bold text-[#2464a8] text-sm leading-tight">HIMSI UMDP</p>
                        <p className="text-[10px] text-gray-400 font-semibold">Admin Panel</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-1">
                    {NAV_ITEMS.map(item => (
                        <button key={item.id} onClick={() => navigate(item.href)}
                            className={['flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left', activePage === item.id ? 'bg-[#2464a8] text-white shadow-md shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'].join(' ')}>
                            {NAV_ICONS[item.id]}{item.label}
                        </button>
                    ))}
                </nav>
                <div className="mt-auto border-t border-gray-100 pt-3">
                    <button onClick={onLogout} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#2464a8] hover:bg-red-500 transition-colors">
                        <LogOut className="w-4 h-4" />Logout
                    </button>
                </div>
            </aside>

            <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-12 flex items-center justify-between px-3 shadow-sm">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="HIMSI" className="w-7 h-7 rounded-lg" />
                    <span className="font-bold text-[#2464a8] text-sm">HIMSI Admin</span>
                </div>
                <button onClick={onLogout} className="flex items-center gap-1 text-[11px] font-bold text-red-500 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors">
                    <LogOut className="w-3 h-3" />Logout
                </button>
            </header>

            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 h-14 flex items-stretch shadow-[0_-2px_10px_rgba(0,0,0,0.07)]">
                {NAV_ITEMS.map(item => (
                    <button key={item.id} onClick={() => navigate(item.href)}
                        className={['flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors', activePage === item.id ? 'text-[#2464a8]' : 'text-gray-400'].join(' ')}>
                        <span className={['flex items-center justify-center w-7 h-7 rounded-xl transition-all', activePage === item.id ? 'bg-blue-100' : ''].join(' ')}>
                            {NAV_ICONS[item.id]}
                        </span>
                        <span className="text-[9px] font-bold">{item.label}</span>
                    </button>
                ))}
            </nav>
        </>
    )
}