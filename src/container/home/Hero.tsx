import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { hero } from "@/constans";
import {
    containerVariants,
    itemVariants,
    badgeVariants,
} from "./hero.variants";

const Hero = () => {
    const { badge, headingMain, headingAccent, description, primaryCTA, secondaryCTA } = hero;

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-himsi-hero">
            <motion.div
                ref={ref}
                className="container relative z-10 text-center px-4 space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "exit"}
            >
                <motion.div
                    variants={badgeVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline border-white/20 bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_24px_rgba(0,0,0,0.1)]"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{badge}</span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                >
                    <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: "linear-gradient(90deg, #f0c96a 0%, #d3a32d 40%, #5a9fd4 70%)" }}
                    >
                        {headingMain}
                    </span>
                    <br />
                    <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: "linear-gradient(90deg, #f0c96a 0%, #d3a32d 40%, #5a9fd4 70%)" }}
                    >
                        {headingAccent}
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl font-semibold mx-auto text-lg md:text-xl text-foreground leading-relaxed"
                >
                    {description}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                >
                    <Button size="lg" className="text-lg px-8 py-6 glow animate-pulse-glow" asChild>
                        <a href={primaryCTA.href}>{primaryCTA.label}</a>
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10" asChild>
                        <Link to={secondaryCTA.href}>{secondaryCTA.label}</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;