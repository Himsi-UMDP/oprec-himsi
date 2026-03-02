import { prokers } from "@/constans";
import { fadeUpItem } from "./proker.variants";
import ProgramKerja from "./Modules/ProgramKerja";
import Animated from "@/components/Animated";

const Proker = () => {
    return (
        <section id="proker" className="py-24 px-4">
            <div className="relative container mx-auto">
                <Animated
                    variants={fadeUpItem}
                    className="text-center mb-12 md:mb-14"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#5a9fd4]">
                        Program
                        <span className="text-[#d3a32d]"> Kerja</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Kegiatan seru yang akan kamu ikuti selama menjadi anggota
                    </p>
                </Animated>

                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {prokers.map((item, i) => (
                        <Animated
                            key={item.id}
                            variants={fadeUpItem}
                            delay={i * 0.1}
                            amount={0.1}
                        >
                            <ProgramKerja item={item} index={i} />
                        </Animated>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Proker;