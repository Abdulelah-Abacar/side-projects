import React from "react";
import { motion } from "framer-motion";

const NavItem = ({ text }) => (
  <motion.button
    className="gap-2.5 self-stretch px-6 py-2.5 my-auto whitespace-nowrap border-2 border-solid border-neutral-600 rounded-[33px] max-md:px-5 uppercase"
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {text}
  </motion.button>
);

function Navbar() {
  return (
    <motion.header
      className="flex flex-col items-center mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center w-full px-10 pt-5">
        {/* Left Side: Burger Icon */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="/burgerIcon.png"
            className="object-contain shrink-0 aspect-square w-8 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            alt="Burger menu icon"
          />
        </motion.div>

        {/* Center: Brand Logo */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/96920f3a549c0137557ef16f7330d3eb2b13c72d0988b33f09a58f8d118a15eb?placeholderIfAbsent=true"
            className="object-contain shrink-0 aspect-[1.17] w-[69px]"
            alt="Brand logo"
          />
        </motion.div>

        {/* Right Side: Search Icon and Card Icon with Separator */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/e2d8b8f8c5a904736afef3ed72f8c15b98f909a0a8b6a4951dadb1452e937642?placeholderIfAbsent=true"
            className="object-contain shrink-0 aspect-square w-6  cursor-pointer hover:opacity-80 transition-opacity duration-300"
            alt="Search icon"
          />
          <div className="shrink-0 border-l border-solid border-neutral-800 h-6" />
          <img
            src="/cardIcon.png"
            className="object-contain shrink-0 aspect-square w-7 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            alt="Card icon"
          />
        </motion.div>
      </div>

      {/* Divider Line */}
      <motion.div
        className="self-stretch mt-9 w-full border border-solid border-neutral-800 min-h-px max-md:max-w-full"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* Navigation Items */}
      <motion.nav
        className="flex flex-wrap gap-8 justify-center items-center mt-9 text-lg uppercase text-neutral-600 max-md:max-w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <NavItem text="Home" />
        <NavItem text="New arrival" />
        <NavItem text="category" />
        <NavItem text="Our story" />
        <NavItem text="FAQS" />
      </motion.nav>
    </motion.header>
  );
}

export default Navbar;
