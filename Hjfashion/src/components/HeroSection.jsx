import React from "react";
import { motion } from "framer-motion";

// Helper function to split text into letters for animation
const splitText = (text) => {
  return text.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {char}
    </motion.span>
  ));
};

function HeroSection() {
  return (
    <motion.section
      className="relative w-full min-h-[calc(100vh-60px)] uppercase py-6 rounded-md bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/9ef3843b0b829183aa4cbad04bc3631ef83e02e55edf9a7fbfab94ec51230fd9?placeholderIfAbsent=true')",
      }}
      initial={{ width: 0 }} // Start with 0 width
      whileInView={{ width: "100%" }} // Grow to full width
      transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Hero Image (Guy Image) - Positioned Absolutely */}
      <motion.img
        src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/d4b3d0533c686bfe260f45ea96d2857b595b1f9f79b6b73142465e9b05b50a50?placeholderIfAbsent=true"
        className="absolute -bottom-20 object-cover w-full z-10"
        alt="Hero Image"
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 1 }} // Delay to sync with container animation
        viewport={{ once: true, amount: 0.5 }}
      />

      {/* Content Container */}
      <div className="flex flex-col gap-32 items-center w-full font-poppins">
        {/* Full-Width h1 */}
        <h1 className="text-6xl md:text-8xl lg:text-[170px] font-normal text-center text-black w-full font-orienta">
          {splitText("hjfashion-brand")}
        </h1>

        {/* Description Text */}
        <motion.div
          className="flex flex-wrap justify-between gap-10 px-16 text-xl font-medium text-black"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }} // Delay to sync with container animation
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="w-full md:w-[25%] text-center md:text-left">
            Sudanese-inspired phrases, beautifully designed by talented Sudanese
            artists—celebrating culture, resilience, and artistry
          </p>
          <p className="w-full md:w-[25%] text-center md:text-left">
            10% of all proceeds directly support humanitarian aid efforts in
            Sudan
          </p>
        </motion.div>

        {/* Featured Product and Button */}
        <motion.div
          className="relative z-20 flex flex-col md:flex-row justify-between items-center w-full my-16 px-16 gap-8"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }} // Delay to sync with description animation
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Explore Collection Button */}
          <motion.button
            className="flex items-center gap-4 px-8 py-4 bg-black text-white text-lg rounded-md cursor-pointer hover:bg-opacity-90 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span>Explore Collection</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/af8e205afcec162d3561d97a9e2480cfa9895350ae6decc576c7246c68775e93?placeholderIfAbsent=true"
              className="w-6 h-6 object-contain"
              alt="Arrow icon"
            />
          </motion.button>

          {/* Featured Product Image */}
          <motion.img
            src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/e47cf2b047b36eff7f7b461c929da7754d2338eaf3f849881f511e54eb07bf78?placeholderIfAbsent=true"
            className="w-80"
            alt="Featured product"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ delay: 2.5, duration: 1.5, type: "spring" }} // Delay to sync with button animation
            viewport={{ once: true, amount: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
