import React, { useState } from "react";
import { motion } from "framer-motion";

const FaqItem = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mt-8 w-full max-md:max-w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
    >
      <button
        className="flex justify-between items-center w-full px-8 py-6 text-left rounded-md border border-neutral-600 hover:bg-neutral-100 transition-colors duration-300 max-md:px-5 max-md:max-w-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
      >
        <span className="text-2xl font-medium text-neutral-800">
          {question}
        </span>
        <span className="text-xl leading-none text-neutral-800 border-2 w-7 aspect-square rounded-full border-neutral-800 flex justify-center items-center pb-1 font-semibold">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <motion.div
          id={`faq-answer-${question}`}
          className="px-8 py-6 text-xl text-neutral-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
};

function FaqSection() {
  const faqs = [
    {
      question: "Do you deliver to my country?",
      answer:
        "Yes, we deliver to most countries worldwide. Please check our shipping policy for more details.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all items. Please ensure the product is in its original condition.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email to track your package.",
    },
  ];

  return (
    <section className="mt-44 w-full max-md:mt-10 max-md:max-w-full">
      {/* Section Title */}
      <motion.h2
        className="text-6xl md:text-8xl font-semibold text-neutral-800 max-md:max-w-full max-md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
      >
        Frequently Asked Questions
      </motion.h2>

      {/* FAQ Items */}
      <div className="flex flex-col justify-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            delay={index * 0.2} // Staggered delay for sequential animation
          />
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
