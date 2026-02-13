import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Divider from "../ui/Divider";
import { RatingItemProps, RatingProps } from "../../types";

// Animation configurations
const ANIMATION_CONFIG = {
  duration: 2000,
  incrementTime: 20,
  threshold: 0.5,
  fadeInDuration: 0.5,
} as const;

// Helper function to extract number from string
const extractNumber = (str: string): number => {
  return parseInt(str.match(/\d+/)?.[0] || "0", 10);
};

// Custom hook for number animation
const useNumberAnimation = (
  targetNumber: number,
  isTriggered: boolean
): number => {
  const [animatedValue, setAnimatedValue] = useState<number>(0);

  useEffect(() => {
    if (!isTriggered) return;

    let start = 0;
    const increment = () => {
      start += 1;
      setAnimatedValue(start);

      if (start < targetNumber) {
        setTimeout(increment, ANIMATION_CONFIG.incrementTime);
      }
    };

    increment();
  }, [isTriggered, targetNumber]);

  return animatedValue;
};

const RatingItem: React.FC<RatingItemProps> = ({ rating, isLast }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: ANIMATION_CONFIG.threshold,
  });

  const controls = useAnimation();
  const targetNumber = extractNumber(rating.status);
  const animatedValue = useNumberAnimation(targetNumber, inView);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { duration: ANIMATION_CONFIG.fadeInDuration },
      });
    }
  }, [inView, controls]);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={controls}
        className="flex flex-col gap-[5px] justify-center items-center"
      >
        <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
          {rating.status.replace(/\d+/, animatedValue.toString())}
        </span>
        <span className="text-lg md:text-xl lg:text-2xl font-medium text-[#afafaf]">
          {rating.label}
        </span>
      </motion.div>
      {!isLast && <Divider />}
    </>
  );
};

const Rating: React.FC<RatingProps> = ({ data }) => {
  if (!data?.length) return null;

  return (
    <section className="w-11/12 2xl:w-full flex flex-col md:flex-row justify-between items-center gap-8">
      {data.map((rating, index) => (
        <RatingItem
          key={index}
          rating={rating}
          isLast={index === data.length - 1}
        />
      ))}
    </section>
  );
};

export default Rating;
