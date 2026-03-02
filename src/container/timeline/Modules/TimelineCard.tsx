import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import type { Timeline } from "@/constans/type";
import { fadeUp } from "../timeline.variants";

type Props = {
    item: Timeline;
    index: number;
};

export default function TimelineCard({ item, index }: Props) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            variants={fadeUp}
            className={[
                "relative flex items-start gap-6",
                isEven ? "md:flex-row" : "md:flex-row-reverse",
            ].join(" ")}
        >
            <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[#5a9fd4] -translate-x-1.5 mt-2 z-10 shadow-[0_0_0_6px_rgba(59,130,246,0.12)]" />

            <div
                className={[
                    "ml-14 md:ml-0 md:w-1/2",
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12",
                ].join(" ")}
            >
                <div className="card-gradient rounded-xl p-5 border border-border/50 hover:border-[#5a9fd4] transition-colors">
                    <div
                        className={[
                            "flex items-center gap-2 mb-2 text-[#d3a32d] text-sm font-medium",
                            isEven ? "md:justify-end" : "",
                        ].join(" ")}
                    >
                        <CalendarDays className="w-4 h-4" />
                        {item.date}
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-1">
                        {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
            </div>
        </motion.div>
    );
}