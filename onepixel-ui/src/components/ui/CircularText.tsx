import React, { useState, useRef, useEffect } from "react";
import Toolbox from "../ui/Toolbox";
import { CircularTextProps } from "../../types";

const CircularText: React.FC<CircularTextProps> = ({ text, icon: Icon }) => {
  const [isToolboxVisible, setIsToolboxVisible] = useState(false);
  const toolboxRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  // Add a space or a special character to create distance between the first and last word
  const formattedText = `${text}  `; // Add a bullet or space

  // Handle clicks outside the Toolbox or on the black circle
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolboxRef.current &&
        !toolboxRef.current.contains(event.target as Node) &&
        circleRef.current &&
        !circleRef.current.contains(event.target as Node)
      ) {
        setIsToolboxVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle Toolbox visibility when clicking the black circle
  const handleCircleClick = () => {
    setIsToolboxVisible((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-center w-80 h-80">
      {/* Circular Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          className="transform rotate-[-50deg]"
          aria-label="Circular Text"
        >
          <defs>
            <path
              id="circle"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fill="#A5FF15"
            fontFamily="Lato"
            fontSize="7"
            fontWeight="bold"
            letterSpacing={1.5}
          >
            <textPath xlinkHref="#circle" startOffset="5px">
              {formattedText}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Gray Outline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 border-2 border-gray-300/20 rounded-full"></div>
      </div>

      {/* Black Circle with Icon */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={handleCircleClick}
        ref={circleRef}
        role="button"
        aria-label="Toggle Toolbox"
      >
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
          {Icon && <Icon className="w-10 h-10 text-Accent animate-shrink" />}
        </div>
      </div>

      {/* Toolbox */}
      {isToolboxVisible && (
        <div ref={toolboxRef} className="absolute top-full right-28">
          <Toolbox />
        </div>
      )}
    </div>
  );
};

export default CircularText;
