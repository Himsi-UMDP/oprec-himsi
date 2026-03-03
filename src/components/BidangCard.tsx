import type { BidangStat } from "@/constans/admin";
import { BIDANG_CONFIG } from "@/constans";

type Props = {
  stat: BidangStat;
};

export default function BidangCard({ stat }: Props) {
  const config = BIDANG_CONFIG.find(b => b.name === stat.name);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-bold text-gray-700">{stat.name}</p>
        <div className={`w-9 h-9 rounded-full ${config?.iconBg ?? "bg-gray-400"} flex items-center justify-center text-white text-base shadow-sm`}>
          {stat.icon}
        </div>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-extrabold text-gray-800">{stat.count}</span>
        <span className="text-xs text-gray-400 font-semibold mb-1">Orang</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${config?.iconBg ?? "bg-gray-400"} transition-all duration-500`}
          style={{ width: stat.count > 0 ? `${Math.min((stat.count / 10) * 100, 100)}%` : "0%" }}
        />
      </div>
    </div>
  );
}