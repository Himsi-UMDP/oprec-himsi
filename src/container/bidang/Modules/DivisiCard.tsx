import { motion } from "framer-motion";
import { cardVariants } from "../divisi.variants";
import type { DivisionCardProps } from "@/constans/type";

const DivisiCard = ({ d, onClick }: DivisionCardProps) => {
    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            className="glass-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center"
        >
            <div className="w-full aspect-square overflow-hidden">
                <img
                    src={d.images?.[0]}
                    alt={d.name}
                    className="w-full h-full object-contain bg-muted group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-6 flex flex-col items-center">
                <div className="flex flex-row items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <d.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{d.name}</h3>
                </div>

                {/* <p className="text-muted-foreground leading-relaxed text-sm">{d.desc}</p> */}

                <p className="text-primary text-sm mt-3 font-medium group-hover:underline">
                    Lihat Bidang →
                </p>
            </div>
        </motion.div>
    );
};

export default DivisiCard;