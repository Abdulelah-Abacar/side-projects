import { OurServicesSection } from "../../types";
import { ServiceCard } from "../ServiceCard";
import Chip from "../ui/Chip";
import { motion } from "framer-motion";

// Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child's animation
    },
  },
};

function OurServices({ chip, title, services }: OurServicesSection) {
  return (
    <motion.section
      id="our-services"
      className="w-11/12 2xl:w-full mx-auto flex flex-col gap-12 items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
    >
      {/* Chip */}
      <Chip text={chip} />

      {/* Title */}
      <motion.h2
        className="headline !text-3xl md:!text-4xl lg:!text-5xl"
        variants={fadeInVariants}
      >
        {title}
      </motion.h2>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={staggerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map(({ title, description, sub }, i) => (
          <ServiceCard key={i} data={{ title, description, sub }} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default OurServices;
