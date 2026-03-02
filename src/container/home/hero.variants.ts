import type { Variants, Transition } from "framer-motion";

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { staggerChildren: 0.08, staggerDirection: -1 },
    },
} satisfies Variants;

export const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
} satisfies Variants;

export const badgeVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.3 } },
} satisfies Variants;

export const blobTransition = {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
} satisfies Transition;