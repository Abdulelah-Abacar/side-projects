import BubblesAnimation from "../ui/BubblesAnimation";
import WhyChooseUsCard from "../WhyChooseUsCard";
import { motion } from "framer-motion";
import Chip from "../ui/Chip";
import { WhyChooseUsSection } from "../../types";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function WhyChooseUs({ chip, title, reasons }: WhyChooseUsSection) {
  return (
    <motion.section
      className="relative w-11/12 2xl:w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="relative z-10 flex flex-col gap-12 items-center justify-center">
        <Chip text={chip} />
        <h2 className={`headline !text-3xl md:!text-4xl lg:!text-5xl`}>
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map(({ icon, title, description }, i) => (
            <WhyChooseUsCard
              key={i} // Add key to avoid React warnings
              icon={icon}
              title={title}
              description={description}
              index={i}
            />
          ))}
        </div>
      </div>
      <div className="absolute w-11/12 h-5/6 inset-0">
        <BubblesAnimation speed={1000} />
      </div>
    </motion.section>
  );
}

export default WhyChooseUs;
