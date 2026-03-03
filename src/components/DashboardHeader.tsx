import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    loading: boolean;
    onRefresh: () => void;
};

export default function DashboardHeader({ loading, onRefresh }: Props) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-xl font-extrabold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-400 font-semibold mt-0.5">
                    Open Recruitment HIMSI UMDP 2026
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    onClick={onRefresh}
                    disabled={loading}
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>
        </div>
    );
}