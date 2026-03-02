import type { Variants } from "framer-motion";

export const sectionVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
    exit: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
} satisfies Variants;

export const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        y: -18,
        transition: { duration: 0.35, ease: "easeIn" },
    },
} satisfies Variants;