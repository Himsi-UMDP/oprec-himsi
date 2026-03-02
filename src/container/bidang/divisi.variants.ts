import type { Variants } from "framer-motion";

export const sectionVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
} satisfies Variants;

export const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        y: 40,
        transition: { duration: 0.35, ease: "easeIn" },
    },
} satisfies Variants;

export const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
} satisfies Variants;

export const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        scale: 0.92,
        y: 20,
        transition: { duration: 0.25, ease: "easeIn" },
    },
} satisfies Variants;

export const prokerItemVariants = (index: number) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
    transition: { delay: index * 0.1 },
});

export const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
} satisfies Variants;