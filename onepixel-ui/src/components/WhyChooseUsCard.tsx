import React from "react";
import { WhyChooseUsCardProps } from "../types";

// Define enum for gradient directions
enum GradientDirection {
  TopRight = "140deg",
  BottomLeft = "320deg",
}

const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({
  icon,
  title,
  description,
  index,
  className = "",
  iconAlt,
  onClick,
}) => {
  // Calculate gradient direction based on index
  const gradientDirection =
    index % 2 === 0 ? GradientDirection.TopRight : GradientDirection.BottomLeft;

  return (
    <div
      onClick={onClick}
      className={`group overflow-hidden box h-full flex flex-col transition-transform duration-300 hover:scale-105 ${className}`}
      style={
        {
          "--GradientDirection": gradientDirection,
        } as React.CSSProperties
      }
      role="article"
    >
      <div className="flex flex-col items-center gap-6 py-8 px-4 sm:gap-8 sm:py-10 sm:px-6 flex-1">
        <div
          className="flex w-20 h-20 sm:w-[108px] sm:h-[108px] p-4 sm:p-6 
                     items-center justify-center bg-[#0a0a0a] rounded-full
                     transition-transform duration-300 group-hover:scale-110"
          role="img"
          aria-label={iconAlt || `${title} icon`}
        >
          <img
            src={icon}
            alt={iconAlt || `${title} icon`}
            className="w-full aspect-square object-contain"
            loading="lazy"
          />
        </div>

        <h3
          className="text-2xl sm:text-[30px] font-bold leading-tight 
                       sm:leading-[36px] text-center"
        >
          {title}
        </h3>

        <p
          className="text-base sm:text-[20px] font-normal leading-relaxed 
                      sm:leading-[24px] text-center text-white/80 flex-1"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyChooseUsCard;
