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
        <section id="divisi" className="py-24 px-4">
            <div className="container">
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
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