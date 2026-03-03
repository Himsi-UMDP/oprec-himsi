import { ChevronDown } from "lucide-react";
import type { StatusFilter, BidangFilter } from "@/constans/admin";

const BIDANG_LIST = ["PSDM", "Sosial", "Kominfo", "Litbang"];

type Props = {
  statusFilter: StatusFilter;
  bidangFilter: BidangFilter;
  onStatusChange: (v: StatusFilter) => void;
  onBidangChange: (v: BidangFilter) => void;
  total: number;
};

function SelectBox({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2464a8]/20 cursor-pointer hover:border-gray-300 transition-colors"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
    </div>
  );
}

export default function TableFilter({ statusFilter, bidangFilter, onStatusChange, onBidangChange, total }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
      <SelectBox
        value={statusFilter}
        onChange={v => onStatusChange(v as StatusFilter)}
        options={[
          { value: "semua",    label: "Semua Status" },
          { value: "pending",  label: "⏳ Pending"   },
          { value: "diterima", label: "✅ Diterima"  },
          { value: "ditolak",  label: "❌ Ditolak"   },
        ]}
      />
      <SelectBox
        value={bidangFilter}
        onChange={v => onBidangChange(v as BidangFilter)}
        options={[
          { value: "semua", label: "Semua Bidang" },
          ...BIDANG_LIST.map(b => ({ value: b, label: b })),
        ]}
      />
      <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
        {total} data
      </span>
    </div>
  );
}