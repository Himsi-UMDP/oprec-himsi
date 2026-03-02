import { faqs } from "@/constans";
import { fadeUp } from "./faq.variants";
import FaqAccordion from "./Modules/FaqAccordion";
import Animated from "@/components/Animated";

const Faq = () => {
    return (
        <section id="faq" className="py-24 px-4">
            <div className="relative container mx-auto max-w-3xl">
                <Animated
                    variants={fadeUp}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#5a9fd4]">
                        Pertanyaan
                        <span className="text-[#d3a32d]"> Umum</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Hal-hal yang sering ditanyakan seputar open recruitment
                    </p>
                </Animated>

                <Animated
                    variants={{
                        hidden: { opacity: 0, y: 18 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut", delay: 0.12 } },
                        exit: { opacity: 0, y: -18, transition: { duration: 0.35, ease: "easeIn" } },
                    }}
                >
                    <FaqAccordion items={faqs} />
                </Animated>
            </div>
        </section>
    );
};

export default Faq;