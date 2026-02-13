import { Button } from "../ui/Button";
import { PricingCard } from "../PricingCard";
import Chip from "../ui/Chip";
import BubblesAnimation from "../ui/BubblesAnimation";
import { motion } from "framer-motion";
import { SubscriptionSection } from "../../types";

// Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function OurPackages({
  chip,
  title,
  cta,
  plans,
  flexiblePricing,
}: SubscriptionSection) {
  return (
    <motion.section
      id="pricing"
      className="w-11/12 2xl:w-full mx-auto space-y-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
    >
      {/* Chip */}
      <Chip text={chip} className="block mx-auto" />

      {/* Title */}
      <motion.h2
        className="headline !text-3xl md:!text-4xl lg:!text-5xl text-center"
        variants={fadeInVariants}
      >
        {title}
      </motion.h2>

      {/* Pricing Cards */}
      <motion.div className="relative flex flex-col md:flex-row justify-around items-center gap-10 mt-10">
        {plans.map(({ title, price, features, idealText }, i) => (
          <PricingCard
            key={i} // Add key to avoid React warnings
            index={i}
            title={title}
            price={price}
            features={features}
            idealForText={idealText}
          />
        ))}
        {/* Bubbles Animation */}
        <div className="absolute w-11/12 h-5/6 inset-0">
          <BubblesAnimation speed={1000} />
        </div>
      </motion.div>

      {/* Flexible Pricing Section */}
      <motion.div
        className="space-y-10 pt-16"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Chip
          text={flexiblePricing.chip}
          className="!text-sm md:!text-lg lg:!text-xl"
        />
        <h2 className="headline !text-3xl md:!text-4xl lg:!text-5xl">
          {flexiblePricing.title}
        </h2>
        <p className="text-xl md:text-2xl lg:text-4xl">
          {flexiblePricing.description}
        </p>
        <Button
          text={cta}
          href="https://wa.me/96691735346?text=Hello%20there!"
        />
      </motion.div>
    </motion.section>
  );
}

export default OurPackages;
