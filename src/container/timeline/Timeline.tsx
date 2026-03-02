import { motion } from "framer-motion";
import { timeline } from "@/constans";
import { sectionVariants } from "./timeline.variants";
import { fadeUp } from "./timeline.variants";
import TimelineItemCard from "./Modules/TimelineCard";

const Timeline = () => {
    return (
        <section id="timeline" className="py-24 px-4">
            <div className="relative container mx-auto max-w-5xl">
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#5a9fd4]">
                            Timeline 
                            <span className="text-[#d3a32d]"> Oprec</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Jangan sampai ketinggalan setiap tahapannya!
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <TimelineItemCard key={item.id} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Timeline;