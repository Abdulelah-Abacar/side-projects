import * as React from "react";
import { CaseStudioProps } from "../types";
import { Button } from "./ui/Button";
import Chip from "./ui/Chip";

export const CaseStudioCard: React.FC<CaseStudioProps> = ({
  index,
  img,
  title,
  description,
  status,
  name,
}) => {
  // Determine the gradient direction based on the index
  const gradientDirection = index % 2 === 0 ? "140deg" : "320deg";

  // Shared content for both mobile and desktop layouts
  const renderContent = () => (
    <>
      <div className="space-y-5">
        <Chip text="UIUX case study" />
        <h2 className="headline !text-3xl !leading-9 md:!text-[42px] md:!leading-[45.7px]">
          {title}
        </h2>
        <p className="paragraph">{description}</p>
      </div>
      <div className="w-11/12 flex justify-between items-end gap-6">
        <Button text="learn more" href={`projects/${name}`} />
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-extrabold leading-[48px] md:text-[68px] md:leading-[81.6px] text-[#a5ff15] text-center uppercase">
            {status.score}
          </span>
          <span className="text-base font-medium leading-5 md:text-[20px] md:leading-[24px] text-[#afafaf] text-center uppercase">
            {status.label}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="w-full p-3 box rounded-2xl bg-[#4d4d4d19] backdrop-blur-xl"
      style={
        { "--GradientDirection": gradientDirection } as React.CSSProperties
      }
    >
      {/* Mobile Layout (Stacked) */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* Image at the Top */}
        <div className="w-full aspect-[4/3]">
          <img
            src={img}
            alt="image"
            className="w-full h-full rounded-xl object-cover"
          />
        </div>

        {/* Chip, Title, and Description */}
        {renderContent()}
      </div>

      {/* Desktop Layout (Grid) */}
      <div className="hidden md:grid grid-cols-5 gap-6">
        {index % 2 === 0 ? (
          <>
            {/* Image on the Left */}
            <div className="col-span-2 w-full h-full aspect-[4/3]">
              <img src={img} alt="image" className="w-full h-full rounded-xl" />
            </div>

            {/* Content on the Right */}
            <div className="col-span-3 p-5 flex flex-col justify-between gap-5">
              {renderContent()}
            </div>
          </>
        ) : (
          <>
            {/* Content on the Left */}
            <div className="col-span-3 p-5 flex flex-col justify-between gap-5">
              {renderContent()}
            </div>

            {/* Image on the Right */}
            <div className="col-span-2 w-full h-full aspect-[4/3]">
              <img src={img} alt="image" className="w-full h-full rounded-xl" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
