import { FC, memo } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import Checked from "../assets/checked.svg";
import { PricingCardProps } from "../types";

// Define animation variants
const animationVariants: Record<string, Variants> = {
  middle: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  },
  side: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
};

// Define styled components or reusable classes
const baseCardStyles =
  "pricing box flex flex-1 py-11 px-2.5 bg-[#4d4d4d19] z-10 h-full";
const titleStyles =
  "text-[26px] font-bold leading-[31px] uppercase text-center";
const priceStyles =
  "font-['Archivo_Black'] text-[48px] leading-[52px] text-[#a5ff15]";
const subTextStyles =
  "text-[20px] font-bold leading-[24px] text-[#7a7a7a] capitalize";
const featureItemStyles = "text-[14px] font-normal leading-[16.8px] capitalize";

export const PricingCard: FC<PricingCardProps> = memo(
  ({
    title,
    price,
    features,
    index,
    idealForText = "ideal for startups",
    buttonText = "get started",
    startingAtText = "Starting at",
  }) => {
    // Determine which animation variant to use
    const cardVariant = index === 1 ? "middle" : "side";

    return (
      <motion.div
        className={baseCardStyles}
        style={
          {
            "--GradientDirection": index % 2 === 0 ? "140deg" : "320deg",
          } as React.CSSProperties
        }
        variants={animationVariants[cardVariant]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-14 justify-between items-center flex-1">
          <h3 className={titleStyles}>{title}</h3>

          <div className="flex flex-col justify-center items-center">
            <span className={priceStyles}>{price}</span>
            <span className={subTextStyles}>{startingAtText}</span>
          </div>

          <div className="flex flex-col gap-7 w-full" role="list">
            {features.map((feature, idx) => (
              <div
                className="flex gap-6 items-center"
                key={`${feature}-${idx}`}
                role="listitem"
              >
                <img
                  src={Checked}
                  alt=""
                  className="w-6 aspect-square"
                  aria-hidden="true"
                />
                <span className={featureItemStyles}>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5 justify-center items-center w-full">
            <Button text={buttonText} />
            <span className={subTextStyles}>{idealForText}</span>
          </div>
        </div>
      </motion.div>
    );
  }
);

// Add display name for debugging
PricingCard.displayName = "PricingCard";
