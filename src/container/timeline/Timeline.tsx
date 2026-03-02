import { timeline } from "@/constans";
import { fadeUp } from "./timeline.variants";
import TimelineItemCard from "./Modules/TimelineCard";
import Animated from "@/components/Animated";

const Timeline = () => {
    return (
        <section id="timeline" className="py-24 px-4">
            <div className="relative container mx-auto max-w-5xl">
                <Animated
                    variants={fadeUp}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#5a9fd4]">
                        Timeline
                        <span className="text-[#d3a32d]"> Oprec</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Jangan sampai ketinggalan setiap tahapannya!
                    </p>
                </Animated>

                <div className="relative">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
                    <div className="space-y-12">
                        {timeline.map((item, i) => (
                            <Animated
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 18 },
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.55, ease: "easeOut", delay: i * 0.08 },
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -18,
                                        transition: { duration: 0.35, ease: "easeIn" },
                                    },
                                }}
                                amount={0.1}
                            >
                                <TimelineItemCard item={item} index={i} />
                            </Animated>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;