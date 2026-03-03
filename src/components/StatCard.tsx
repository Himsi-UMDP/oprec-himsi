type Props = {
  label: string;
  value: number;
  emoji: string;
  iconBg: string;
  iconColor: string;
};

export default function StatCard({ label, value, emoji, iconBg }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center text-xl shrink-0 shadow-sm`}>
        {emoji}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-2xl font-extrabold text-gray-800 leading-none">
          {value}
          <span className="text-xs font-semibold text-gray-400 ml-1">Orang</span>
        </p>
      </div>
    </div>
  );
}