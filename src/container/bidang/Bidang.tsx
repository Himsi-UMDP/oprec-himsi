import { motion, AnimatePresence } from "framer-motion";
import { divisions } from "@/constans";
import { useDivisi } from "@/hooks/useDivisi";
import { sectionVariants } from "./divisi.variants";
import DivisionCard from "./Modules/DivisiCard";
import DetailModal from "./Modules/Detail";

const DivisiSection = () => {
    const { selectedDivision, imgIndex, setImgIndex, openDetail, closeDetail } =
        useDivisi();

    return (
        <section className="py-24 px-4">
            <div className="mb-14">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#5a9fd4]">
                    Bidang 
                    <span className="text-foreground"> &</span>
                    <span className="text-[#d3a32d]"> Divisi</span>
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                    Bidang dan divisi di HIMSI yang siap mengembangkan potensi dan bakatmu
                </p>
            </div>
            <div className="container mx-auto flex flex-col items-center">
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-4 gap-10 w-full mx-auto justify-items-center"
                >
                    {divisions.map((d, i) => (
                        <DivisionCard
                            key={`${d.name}-${i}`}
                            d={d}
                            onClick={() => openDetail(i)}
                        />
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedDivision ? (
                    <DetailModal
                        div={selectedDivision}
                        imgIndex={imgIndex}
                        setImgIndex={setImgIndex}
                        onClose={closeDetail}
                    />
                ) : null}
            </AnimatePresence>
        </section>
    );
};

export default DivisiSection;