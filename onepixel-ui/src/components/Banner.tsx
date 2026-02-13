import React from "react";
import { BannerProps } from "../types";

const Banner: React.FC<BannerProps> = ({ children, speed = 10_000 }) => {
  return (
    <div className="relative">
      <div className="flex flex-nowrap gap-5">
        {/* Render the same content three times for a seamless scroll effect */}
        {[...Array(3)].map((_, index) => (
          <section
            key={index} // Use index as key since the content is the same
            className="flex gap-5 flex-nowrap animate-horizontalScroll"
            style={{ "--speed": `${speed}ms` } as React.CSSProperties}
          >
            {children.map(({ id, child }) => (
              <div className="flex flex-nowrap gap-5" key={id}>
                {child}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export { Banner };
