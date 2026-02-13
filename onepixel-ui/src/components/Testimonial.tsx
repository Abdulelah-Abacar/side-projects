import React from "react";
import { TestimonialProps } from "../types";

const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
  className = "",
  backgroundImage = "/assets/MainBG.png",
}) => {
  return (
    <div
      className={`
        flex flex-col gap-12 justify-center items-center 
        min-w-[320px] sm:min-w-[450px] w-full sm:w-1/3 
        p-6 sm:p-9 
        bg-cover bg-no-repeat rounded-2xl 
        transition-transform duration-300 hover:scale-[1.02]
        ${className}
      `}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      role="article"
    >
      <p
        className="
          font-['Archivo_Black'] text-base sm:text-[20px] 
          font-normal leading-snug sm:leading-[21.76px] 
          text-center uppercase
        "
      >
        {testimonial.quote}
      </p>

      <div className="flex flex-col gap-[5px] justify-center items-center">
        <strong
          className="
            text-lg sm:text-[20px] font-extrabold 
            leading-tight sm:leading-[24px] capitalize
          "
        >
          {testimonial.name}
        </strong>

        <small
          className="
            text-xs sm:text-[14px] font-normal 
            leading-normal sm:leading-[16.8px] 
            text-center capitalize
          "
        >
          {testimonial.position}
        </small>
      </div>
    </div>
  );
};

export default Testimonial;
