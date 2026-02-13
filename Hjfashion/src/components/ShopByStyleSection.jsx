import React from "react";
import { motion } from "framer-motion";

const ShopCategory = ({ backgroundImage, title, hasArrow = true }) => (
  <motion.div
    className="relative group overflow-hidden rounded-sm hover:shadow-lg transition-all duration-300 aspect-square will-change-transform"
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.8 }} // Increased threshold to 80%
  >
    <img
      src={backgroundImage}
      className="object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
      alt={`Shop ${title}`}
      loading="lazy" // Lazy load images for better performance
    />
    <div className="absolute inset-0 flex flex-col justify-start p-6 bg-gradient-to-t from-black/50 to-transparent">
      <div className="flex items-center gap-2 text-black text-xl font-medium underline whitespace-pre-line">
        <span>Shop by {title}</span>
        {hasArrow && (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/1d00c0d87aad34f323bd68d4dc051e39708aa7fd97420d439544cee6f9cc6c84?placeholderIfAbsent=true"
            className="w-6 h-6 object-contain"
            alt="Arrow right"
            loading="lazy" // Lazy load images for better performance
          />
        )}
      </div>
    </div>
  </motion.div>
);

function ShopByStyleSection() {
  return (
    <section className="mt-32 w-full max-md:mt-10 max-md:max-w-full">
      {/* Section Title */}
      <motion.h2
        className="text-6xl md:text-8xl font-semibold text-neutral-800 max-md:max-w-full max-md:text-4xl font-rajdhani will-change-transform"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }} // Increased threshold to 80%
      >
        Shop by Style
      </motion.h2>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-8 w-full max-md:max-w-full">
        {/* Left Side: Two Smaller Square Images (Top and Bottom) */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <ShopCategory
            backgroundImage="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/91ce273a2a8897148818d14ee7d5318eab93a7cdefd7b784a4340bbec1f5c5cb?placeholderIfAbsent=true"
            title={`\n Tshirt`}
          />
          <ShopCategory
            backgroundImage="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/ee59eeca4ab1c1c2ddc0d0a1586012b99be22b0444c4a98fa15ae1adc633835b?placeholderIfAbsent=true"
            title={`\n Sweatshirt`}
          />
        </div>

        {/* Right Side: One Larger Square Image */}
        <div className="lg:col-span-2">
          <ShopCategory
            backgroundImage="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/25909718c06dc7dbe02bf78fcf719e98b92e8aadc49248a5206c419032aec0f6?placeholderIfAbsent=true"
            title="Hoodie"
          />
        </div>
      </div>
    </section>
  );
}

export default ShopByStyleSection;
