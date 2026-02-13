import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Chip from "../ui/Chip";
import { FAQsProps } from "../../types";

// Animation Variants
const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  child: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  answer: {
    hidden: { opacity: 0, y: 10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3 },
    },
  },
};

// Icons as separate components for better reusability
const MinusIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const PlusIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const FAQs: React.FC<FAQsProps> = ({ chip, title, questions }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (questions?.length) return null;

  return (
    <motion.section
      id="faqs"
      className="w-11/12 2xl:w-full mx-auto space-y-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={animations.fadeIn}
    >
      <Chip text={chip} className="block mx-auto" />

      <motion.h2
        className="headline !text-3xl md:!text-4xl lg:!text-5xl text-center"
        variants={animations.fadeIn}
      >
        {title}
      </motion.h2>

      <motion.div
        className="flex flex-col gap-5"
        variants={animations.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        role="list"
      >
        {questions.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-secondary/45 rounded-2xl p-7 pl-10"
            variants={animations.child}
            role="listitem"
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="font-medium">{faq.question}</h3>
              <span className="flex-shrink-0 ml-4">
                {activeIndex === index ? <MinusIcon /> : <PlusIcon />}
              </span>
            </button>

            <motion.div
              id={`faq-answer-${index}`}
              className="mt-4"
              initial="hidden"
              animate={activeIndex === index ? "visible" : "hidden"}
              variants={animations.answer}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FAQs;
