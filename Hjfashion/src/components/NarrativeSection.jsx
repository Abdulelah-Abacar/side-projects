import React from "react";
import { motion } from "framer-motion";

const NarrativeCard = ({ backgroundImage, title, isLarge = false }) => (
  <motion.div
    className={`relative group overflow-hidden rounded-sm hover:shadow-lg transition-all duration-300 ${
      isLarge ? "col-span-2 aspect-[2/1]" : "aspect-square"
    }`}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
  >
    <img
      src={backgroundImage}
      className="object-cover absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
      alt={title}
    />
    <div className="absolute inset-0 flex gap-2.5 justify-start p-8 bg-gradient-to-b from-black/50 to-transparent">
      <h3 className="text-4xl text-white underline">{title}</h3>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/f3275d93168fd243d1c9da2e24fad3c00622ebe8d25550b7bafcd2f618ae8161?placeholderIfAbsent=true"
        className="w-6 h-6 object-contain mt-3 hover:translate-x-2 transition-transform duration-300"
        alt="Arrow right"
      />
    </div>
  </motion.div>
);

function NarrativeSection() {
  return (
    <section className="mt-40 w-full max-md:mt-10 max-md:max-w-full">
      {/* Section Title */}
      <motion.h2
        className="text-6xl md:text-8xl font-semibold text-neutral-800 max-md:max-w-full max-md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
      >
        The Faces of Our Narrative
      </motion.h2>

      {/* Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 w-full max-md:mt-10 max-md:max-w-full">
        {/* Top Row: Two Smaller Images */}
        <NarrativeCard
          backgroundImage="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/c089c180c8a2fda091730712e3febf50e6089621edb42a62cc7e68b79847fa34?placeholderIfAbsent=true"
          title="JABANA"
        />
        <NarrativeCard
          backgroundImage="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/98241298dd44b9ce23822d8d9c69dfc91b40d91e5439219a0cb39bf467a4a1c7?placeholderIfAbsent=true"
          title="MASOORA"
        />

        {/* Bottom Row: One Larger Image */}
        <NarrativeCard
          backgroundImage="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/59823eb306c482428f47dd0cc9a0c8830d15381863849f2bf18e987b2bdb1da3?placeholderIfAbsent=true"
          title="MAKANA"
          isLarge
        />
      </div>
    </section>
  );
}

export default NarrativeSection;
