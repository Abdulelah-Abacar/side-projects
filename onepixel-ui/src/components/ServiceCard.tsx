import { FC, memo } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import MainBG from "/assets/MainBG.png";
import { ServiceCardProps } from "../types";

// Define animation variants
const animationVariants: Record<string, Variants> = {
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
};

// Define styled components or reusable classes
const cardStyles = `
  flex flex-col gap-6 md:gap-12 justify-between items-start 
  p-3 md:p-6 bg-cover bg-no-repeat border-[#494747] 
  border rounded-2xl
`;

const titleStyles = `
  headline !text-3xl md:!text-[48px] 
  !leading-8 md:!leading-[52px]
`;

const descriptionStyles = `
  paragraph grow-[0.45] text-base md:text-lg 
  leading-6 md:leading-7
`;

const chipStyles = `
  capitalize rounded-full py-1.5 px-2.5 md:py-2 md:px-3 
  border-2 border-[#494747] text-sm md:text-base lg:text-[20px] 
  font-normal leading-5 md:leading-6 lg:leading-[24px]
  hover:bg-[#494747] transition-colors duration-300
`;

export const ServiceCard: FC<ServiceCardProps> = memo(
  ({ data, index, buttonText = "get started" }) => {
    const { title, description, sub } = data;
    const animationVariant = index % 2 === 0 ? "left" : "right";

    return (
      <motion.div
        className={cardStyles}
        style={{ backgroundImage: `url(${MainBG})` }}
        variants={animationVariants[animationVariant]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className={titleStyles} id={`service-title-${index}`}>
          {title}
        </h2>

        <div
          className="flex flex-col h-full gap-6 md:gap-[45px] justify-start"
          role="region"
          aria-labelledby={`service-title-${index}`}
        >
          <p className={descriptionStyles}>{description}</p>

          <ul
            className="list-none flex flex-wrap gap-2 md:gap-2.5 justify-start items-center"
            role="list"
            aria-label={`Features for ${title}`}
          >
            {sub.map((item, i) => (
              <li key={`${item}-${i}`} className={chipStyles} role="listitem">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Button
          text={buttonText}
          href="#contact-us"
          aria-label={`Get started with ${title}`}
        />
      </motion.div>
    );
  }
);

// Add display name for debugging
ServiceCard.displayName = "ServiceCard";
