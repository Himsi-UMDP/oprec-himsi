import { AnimatePresence } from "framer-motion";
import { divisions } from "@/constans";
import { useDivisi } from "@/hooks/useDivisi";
import { sectionVariants, cardVariants } from "./divisi.variants";
import DivisionCard from "./Modules/DivisiCard";
import DetailModal from "./Modules/Detail";
import Animated from "@/components/Animated";

const Divisi = () => {
    const { selectedDivision, imgIndex, setImgIndex, openDetail, closeDetail } =
        useDivisi();

    return (
        <section 
            id="bidang"
            className="py-24 px-4"
        >
            <Animated
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                    exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: "easeIn" } },
                }}
                className="mb-14"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                    <span
                        className="bg-clip-text text-transparent "
                        style={{ backgroundImage: "linear-gradient(90deg, #f0c96a 0%, #d3a32d 40%, #5a9fd4 70%)" }}
                    >
                        Bidang
                    </span>
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                    Bidang dan divisi di HIMSI yang siap mengembangkan potensi dan bakatmu
                </p>
            </Animated>

            <div className="container mx-auto flex flex-col items-center">
                <Animated
                    variants={sectionVariants}
                    className="grid grid-cols-1 sm:grid-cols-4 gap-10 w-full mx-auto justify-items-center"
                    amount={0.1}
                >
                    {divisions.map((d, i) => (
                        <Animated
                            key={`${d.name}-${i}`}
                            variants={cardVariants}
                            delay={i * 0.1}
                        >
                            <DivisionCard
                                d={d}
                                onClick={() => openDetail(i)}
                            />
                        </Animated>
                    ))}
                </Animated>
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

export default Divisi;