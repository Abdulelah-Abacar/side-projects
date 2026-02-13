"use client";
import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="flex flex-col pt-28 pb-5 mt-20 w-full bg-neutral-800 max-md:px-5 max-md:pt-24 max-md:mt-10 max-md:max-w-full">
      {/* Top Section: Newsletter, Navigation, and Social Media */}
      <div className="flex flex-wrap justify-center items-start w-full px-14 max-md:max-w-full">
        {/* Newsletter Section */}
        <motion.div
          className="grow shrink min-w-60 w-[630px] max-md:max-w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
        >
          <h3 className="text-2xl text-white max-md:max-w-full">
            Don't Miss Out! Subscribe for Exclusive News & Offers
          </h3>
          <div className="mt-14 w-full rounded-none max-w-[637px] max-md:mt-10 max-md:max-w-full">
            <form className="flex flex-wrap gap-5 justify-between py-1.5 pr-1.5 pl-5 w-full bg-white rounded-md max-md:pl-5 max-md:max-w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow my-auto text-base text-neutral-600 bg-transparent border-none outline-none"
                aria-label="Enter your email"
              />
              <motion.button
                type="submit"
                className="flex gap-6 px-4 py-4 text-lg text-white uppercase bg-black rounded-md hover:bg-neutral-900 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <span>Subscribe</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/8ac31efba2014db7ba6c56ab84f1a7e76257d8a7b32b63ae9fdaa20fd39d9ca9?placeholderIfAbsent=true"
                  className="object-contain shrink-0 my-auto aspect-[1.15] w-[23px]"
                  alt="Arrow right"
                />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          className="flex gap-10 justify-center items-start text-2xl text-white min-w-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delay to sync with newsletter animation
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex flex-col justify-center w-[134px]">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#" className="mt-8 text-center hover:underline">
              New Arrival
            </a>
            <a href="#" className="mt-8 hover:underline">
              Category
            </a>
          </div>
          <div className="flex flex-col justify-center w-[111px]">
            <a href="#" className="text-center hover:underline">
              Our Story
            </a>
            <a href="#" className="mt-8 hover:underline">
              FAQs
            </a>
          </div>
        </motion.nav>

        {/* Social Media Icons */}
        <motion.div
          className="flex flex-col grow shrink justify-center items-end w-[30px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} // Delay to sync with navigation animation
          viewport={{ once: true, amount: 0.5 }}
        >
          <a href="#" aria-label="Social media">
            <img
              src="/instaIcon.png"
              className="object-contain aspect-[1.03] w-[35px] hover:opacity-80 transition-opacity duration-300"
              alt="Social media icon"
            />
          </a>
          <a href="#" aria-label="Social media">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/229e8430f6fc7273a5eebf2205adca04b5b57dd83865494b7da9fedc7165d36c?placeholderIfAbsent=true"
              className="object-contain mt-8 aspect-[1.03] w-[35px] hover:opacity-80 transition-opacity duration-300"
              alt="Social media icon"
            />
          </a>
          <a href="#" aria-label="Social media">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/d90cfa568d870b4099acae426bb0f1e5905410c5b98288bc62bf289933e1e70f?placeholderIfAbsent=true"
              className="object-contain mt-8 w-7 aspect-[0.87] hover:opacity-80 transition-opacity duration-300"
              alt="Social media icon"
            />
          </a>
        </motion.div>
      </div>

      {/* Bottom Section: Brand Name */}
      <motion.h2
        className="mt-36 text-center font-orienta font-normal text-white uppercase text-[170px] max-md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }} // Delay to sync with social media animation
        viewport={{ once: true, amount: 0.5 }}
      >
        hjfashion-brand
      </motion.h2>
    </footer>
  );
}

export default Footer;
