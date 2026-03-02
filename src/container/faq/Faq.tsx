import { motion } from "framer-motion";
import { faqs } from "@/constans";
import { sectionVariants } from "./faq.variants";
import { fadeUp } from "./faq.variants";
import FaqAccordion from "./Modules/FaqAccordion";

const Faq = () => {
    return (
        <section id="faq" className="py-24 px-4">
            <div className="relative container mx-auto max-w-3xl">
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#5a9fd4]">
                            Pertanyaan 
                            <span className="text-[#d3a32d]"> Umum</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Hal-hal yang sering ditanyakan seputar open recruitment
                        </p>
                    </motion.div>
                    <FaqAccordion items={faqs} />
                </motion.div>
            </div>
        </section>
    );
}

export default Faq;