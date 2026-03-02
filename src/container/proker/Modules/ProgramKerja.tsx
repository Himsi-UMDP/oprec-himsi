import { motion } from "framer-motion";
import type { Proker } from "@/constans/type";
import { fadeUpItem } from "../proker.variants";

type Props = {
    item: Proker;
    index: number;
};

export default function ProgramKerja({ item }: Props) {
    const cover = item.images?.[0];

    return (
        <motion.article
            variants={fadeUpItem}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-xl hover:border-[#5a9fd4] transition-all"
        >
            <div className="h-52 w-full overflow-hidden bg-primary/5">
                {cover ? (
                    <img
                        src={cover}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        Tidak ada gambar
                    </div>
                )}
            </div>

            <div className="p-5 md:p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {item.desc}
                </p>
            </div>
        </motion.article>
    );
}