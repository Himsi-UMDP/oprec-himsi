import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

type Props = {
    children: React.ReactNode;
    variants?: Variants;
    className?: string;
    amount?: number;
    delay?: number;
};

const Animated = ({
    children,
    variants,
    className,
    amount = 0.15,
    delay = 0,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount, once: false });

    const defaultVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: "easeOut", delay },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.35, ease: "easeIn" },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants ?? defaultVariants}
            initial="hidden"
            animate={isInView ? "show" : "exit"}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default Animated;