import { motion } from "framer-motion";
import { prokers } from "@/constans";
import { sectionVariants } from "./proker.variants";
import { fadeUpItem } from "./proker.variants";
import ProgramKerja from "./Modules/ProgramKerja";

const Proker = () => {
  return (
    <section id="proker" className="py-24 px-4">
      <div className="relative container mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={fadeUpItem}
            className="text-center mb-12 md:mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#5a9fd4]">
              Program 
              <span className="text-[#d3a32d]"> Kerja</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Kegiatan seru yang akan kamu ikuti selama menjadi anggota
            </p>
          </motion.div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {prokers.map((item, i) => (
              <ProgramKerja key={item.id} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Proker;