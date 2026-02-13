import React from "react";

function WhoWeAreSection() {
  return (
    <section className="flex flex-col justify-center mt-40 w-full text-8xl font-semibold text-neutral-800 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
      {/* Top Border */}
      <div className="w-full border border-solid border-neutral-800 min-h-px max-md:max-w-full" />

      {/* Infinite Scroll Text */}
      <div className="relative overflow-hidden w-full py-4">
        <div className="animate-infinite-scroll whitespace-nowrap">
          <h2 className="inline-block font-rajdhani">
            Wear the Culture. Own the Story ★ Wear the Culture. Own the Story ★
            Wear the Culture. Own the Story ★ Wear the Culture. Own the Story ★
          </h2>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="mt-2 w-full border border-solid border-neutral-800 min-h-px max-md:max-w-full" />

      {/* CSS for Infinite Scroll Animation */}
      <style>
        {`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-infinite-scroll {
            display: inline-block;
            animation: infinite-scroll 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
}

export default WhoWeAreSection;
