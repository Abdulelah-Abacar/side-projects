import React from "react";
import { motion } from "framer-motion";

const BenefitCard = ({ iconSrc, title, description, delay }) => (
  <motion.article
    className="flex flex-col items-center text-center p-6 bg-white rounded-sm hover:shadow-md transition-shadow duration-300 max-w-[369px] w-full"
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
  >
    {iconSrc && (
      <img
        src={iconSrc}
        className="object-contain w-16 h-16 mb-6"
        alt={title}
        aria-hidden={!iconSrc}
      />
    )}
    <h3 className="text-3xl md:text-4xl font-semibold text-neutral-800 mb-4">
      {title}
    </h3>
    <p className="text-xl md:text-2xl text-neutral-600">{description}</p>
  </motion.article>
);

function WhyChooseUsSection() {
  const benefits = [
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/655fed96802fe3c96e9a512eba03373726a49c5fb1becb542e1160e4b3743612?placeholderIfAbsent=true",
      title: "Express Delivery",
      description:
        "No long waits! Get your order delivered quickly, so you can start styling right away.",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/2a59f19544f999a718f4ca3d2893b4be471b2476f59f2b2618625bd1ed43f298?placeholderIfAbsent=true",
      title: "Free Returns",
      description:
        "Not the perfect fit? No worries! Enjoy easy, hassle-free returns at no extra cost.",
    },
    {
      iconSrc: "/dollor.png",
      title: "Flexible Payment",
      description:
        "Shop your way with multiple secure and convenient payment options that suit you.",
    },
  ];

  return (
    <section className="flex flex-col items-center py-16 px-4 sm:px-8 w-full">
      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-neutral-800 mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Why Choose Us?
      </motion.h2>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            iconSrc={benefit.iconSrc}
            title={benefit.title}
            description={benefit.description}
            delay={index * 0.2} // Staggered delay for sequential animation
          />
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
