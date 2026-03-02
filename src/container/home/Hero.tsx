import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { hero } from "@/constans";
import {
    containerVariants,
    itemVariants,
    badgeVariants,
    blobTransition,
} from "./HeroAnimasi";


const AmbientBlob = ({ className, delay = 0 }: { className: string; delay?: number }) => (
    <motion.div
        className={`absolute rounded-full blur-3xl ${className}`}
        animate={{ y: [0, -24, 0], scale: [1, 1.05, 1] }}
        transition={{ ...blobTransition, delay }}
    />
);


const Hero = () => {
    const { badge, headingMain, headingAccent, description, primaryCTA, secondaryCTA } = hero;

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-himsi-hero">

            <AmbientBlob className="top-1/4 left-1/4 w-72 h-72 bg-primary/5" delay={0} />
            <AmbientBlob className="bottom-1/4 right-1/4 w-96 h-96 bg-primary/8" delay={1.5} />
            <AmbientBlob className="top-1/2 left-1/2 w-60 h-60 bg-primary/3" delay={3} />

            <motion.div
                className="container relative z-10 text-center px-4 space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div
                    animate={badgeVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline border-white/20 bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_24px_rgba(0,0,0,0.1)]"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{badge}</span>
                </motion.div>

                <motion.h1
                    animate={itemVariants}
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
                    animate={itemVariants}
                    className="max-w-2xl font-semibold mx-auto text-lg md:text-xl text-foreground leading-relaxed"
                >
                    {description}
                </motion.p>

                <motion.div
                    animate={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                >
                    <Button size="lg" className="text-lg px-8 py-6 glow animate-pulse-glow" asChild>
                        <Link to={primaryCTA.href}>{primaryCTA.label}</Link>
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