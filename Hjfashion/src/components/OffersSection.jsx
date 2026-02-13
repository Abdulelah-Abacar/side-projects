import React from "react";
import { motion } from "framer-motion";

function OffersSection() {
  return (
    <section className="mt-36 w-full max-md:mt-10 max-md:max-w-full">
      {/* Section Title */}
      <motion.h2
        className="text-6xl md:text-8xl font-semibold text-neutral-800 max-md:max-w-full max-md:text-4xl font-rajdhani"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Exclusive Offers Await
      </motion.h2>

      {/* Offers Container */}
      <motion.div
        className="relative flex flex-col items-start mt-14 w-full rounded-sm overflow-hidden bg-red-300 max-md:mt-10 max-md:max-w-full"
        style={{
          backgroundImage:
            "url('https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/866387112caed9ac8b59a56bf6c7d6a4271a8eaab1ecd97b65d5199c991c2333?placeholderIfAbsent=true')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ height: 0 }}
        whileInView={{ height: 650 }} // Adjust this value to match your desired height
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Featured Product Image (Guy Image) - Positioned Absolutely at Bottom */}
        <motion.img
          src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/683e8024779d4945126fcb14d1357e22302933db429df132bdf74e8face2c790?placeholderIfAbsent=true"
          className="object-contain absolute bottom-0 left-10 w-full max-w-[600px] aspect-square rounded-sm shadow-lg"
          alt="Featured product"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }} // Delay to sync with container animation
          viewport={{ once: true, amount: 0.5 }}
        />

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 py-4 px-16 w-full min-h-full">
          {/* Left Side: Empty (for layout balance) */}
          <div className="flex items-center justify-center"></div>

          {/* Right Side: Text Content and Button */}
          <motion.article
            className="flex flex-col justify-center items-center text-center bg-white min-h-full p-8 rounded-sm shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }} // Delay to sync with container animation
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h3
              className="text-4xl md:text-5xl px-10 font-medium text-neutral-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2 }} // Delay to sync with white box animation
            >
              Limited Offers, Timeless Culture
            </motion.h3>
            <motion.p
              className="mt-6 text-xl md:text-2xl text-neutral-800 max-w-[501px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.2 }} // Delay to sync with title animation
            >
              Enjoy exclusive discounts on uniquely crafted designs by Sudanese
              artists. Culture meets style—at a price you'll love.
            </motion.p>
            <motion.button
              className="flex items-center gap-3 px-8 py-4 mt-14 bg-black text-white text-lg rounded-md hover:bg-opacity-90 transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.4 }} // Delay to sync with description animation
            >
              <span>Explore Collection</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/48bf2b33837db8eb3020e3e82fc11eee07e5ca812298fc286fd71f10c1825003?placeholderIfAbsent=true"
                className="w-6 h-6 object-contain"
                alt="Arrow right"
              />
            </motion.button>
          </motion.article>
        </div>
      </motion.div>
    </section>
  );
}

export default OffersSection;
