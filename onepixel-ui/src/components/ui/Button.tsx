import * as React from "react";
import { Link } from "react-router";

import LeftArrow from "../../assets/LeftArrow.png";
import { ButtonProps } from "../../types";

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "",
  href,
  type = "button",
  disabled = false,
}) => {
  // Render the button content
  const buttonContent = (
    <button
      className={`group flex py-2.5 px-5 gap-2 justify-center items-center flex-nowrap bg-Accent rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-2 border-transparent hover:px-6 hover:border-secondary transition-all duration-700 ${className}`}
      onClick={onClick}
      aria-label={text}
      type={type}
      disabled={disabled}
    >
      <span className="font-['Lato'] font-normal leading-[21.6px] text-[#000] text-left capitalize whitespace-nowrap">
        {text}
      </span>
      <div className="group-hover:scale-x-150 h-3 w-[0.1rem] bg-black/35" />
      <img src={LeftArrow} alt="arrow" className="w-[14px]" />
    </button>
  );

  // Wrap the button in a Link if href is provided
  if (href) {
    return (
      <Link to={href.replace(/ /g, "-")} className="group block w-fit">
        {buttonContent}
      </Link>
    );
  }

  // Return the button without a Link if href is not provided
  return buttonContent;
};
