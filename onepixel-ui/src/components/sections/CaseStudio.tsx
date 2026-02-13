import { CaseStudioSection } from "../../types";
import { CaseStudioCard } from "../CaseStudioCard";
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

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function CaseStudio({ chip, title, cases }: CaseStudioSection) {
  return (
    <motion.section
      id="case-studies"
      className="w-11/12 mx-auto flex flex-col gap-12 items-center justify-center"
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

      {/* Case Cards */}
      <motion.div
        className="grid grid-cols-1 gap-8"
        variants={staggerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cases.map(({ img, title, description, status, name }, i) => (
          <motion.div key={i} variants={childVariants}>
            <CaseStudioCard
              index={i}
              img={img}
              title={title}
              description={description}
              status={status}
              name={name}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default CaseStudio;
