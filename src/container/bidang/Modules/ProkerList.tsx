import { motion } from "framer-motion";
import type { ProkerListProps } from "@/constans/type";

export default function ProkerList({ div }: ProkerListProps) {
    const items = div.divisi ?? [];

    return (
        <div className="p-6 md:p-8 glass-card-proker">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-primary inline-block" />
                Divisi
            </h4>

            {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada data divisi.</p>
            ) : (
                <div className="space-y-4">
                    {items.map((p, i) => (
                        <motion.div
                            key={`${p.title}-${i}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-[#5a9fd4] transition-colors"
                        >
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                {i + 1}
                            </div>

                            <div>
                                <h5 className="font-semibold text-foreground">{p.title}</h5>
                                <p className="text-muted-foreground text-sm mt-0.5">{p.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}