import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/constans/type";
import { fadeUp } from "../faq.variants";

type Props = {
    items: Faq[];
};

export default function FaqAccordion({ items }: Props) {
    return (
        <motion.div variants={fadeUp}>
            <Accordion type="single" collapsible className="space-y-3">
                {items.map((faq) => (
                    <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="glass-card rounded-xl border border-border/50 px-6 data-[state=open]:border-[#5a9fd4] transition-colors"
                    >
                        <AccordionTrigger className="text-left text-foreground font-semibold  hover:text-primary hover:no-underline py-5">
                            {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </motion.div>
    );
}