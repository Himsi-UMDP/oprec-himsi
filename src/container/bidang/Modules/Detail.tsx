import { motion } from "framer-motion";
import type { DetailModalProps } from "@/constans/type";
import ImageCarousel from "./ImageCarousel";
import ProkerList from "./ProkerList";
import { modalOverlayVariants, modalContentVariants } from "../divisi.variants";

export default function Detail({
    div,
    imgIndex,
    setImgIndex,
    onClose,
}: DetailModalProps) {
    return (
        <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                variants={modalContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="border border-border/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
                <ImageCarousel
                    div={div}
                    imgIndex={imgIndex}
                    setImgIndex={setImgIndex}
                    onClose={onClose}
                />
                <ProkerList div={div} />
            </motion.div>
        </motion.div>
    );
}