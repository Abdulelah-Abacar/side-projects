import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ imageSrc, title, price, delay }) => (
  <motion.article
    className="flex flex-col grow shrink justify-center self-stretch my-auto min-w-60 w-80 p-4 rounded-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
  >
    <img
      src={imageSrc}
      className="object-contain w-full rounded-sm aspect-[0.72]"
      alt={title}
    />
    <h3 className="mt-3 text-xl font-medium text-neutral-800">{title}</h3>
    <p className="mt-3 text-lg font-semibold text-neutral-900">{price}</p>
  </motion.article>
);

function NewArrivalSection() {
  const products = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/25d7aff0bb6ac89ef22fcbab81f3744d40d64b99faaf37131d69df77031c47a3?placeholderIfAbsent=true",
      title: "JABANA Tshirt white",
      price: "$34.99",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/2542bc5247247d80a227d63501be7fb43f067e946b6656acb538344877ffe11d?placeholderIfAbsent=true",
      title: "JABANA Tshirt Black",
      price: "$19.99",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/43171f2e3bf2669220e0bcafb1bb87425dd16a84e59d2671b13e4ba51086316f?placeholderIfAbsent=true",
      title: "Masoora Hoodie Black",
      price: "$34.99",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/ee59eeca4ab1c1c2ddc0d0a1586012b99be22b0444c4a98fa15ae1adc633835b?placeholderIfAbsent=true",
      title: "Masoora sweatshirt Blue",
      price: "$34.99",
    },
  ];

  return (
    <section className="flex flex-col justify-center mt-40 w-full">
      {/* Section Header */}
      <motion.div
        className="flex flex-wrap gap-10 justify-between items-center w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is visible
      >
        <h2 className="my-auto text-6xl md:text-8xl font-semibold text-neutral-800 max-md:text-4xl font-rajdhani">
          NEW ARRIVAL
        </h2>
        <a
          href="#"
          className="flex gap-3 justify-center items-center my-auto text-xl text-black underline hover:text-neutral-600 transition-all duration-300"
        >
          <span className="my-auto">VIEW ALL</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1fee33d8194d470aab7e646596e0a8c5/a214dd978b3f761c47d36fcd19dce8281d8f0a09a958cff010387d7175cdf211?placeholderIfAbsent=true"
            className="object-contain shrink-0 my-auto aspect-[1.17] w-[21px]"
            alt="Arrow right"
          />
        </a>
      </motion.div>

      {/* Product Cards Grid */}
      <div className="flex flex-wrap overflow-hidden justify-center items-center mt-16 w-full text-2xl text-black max-md:mt-10 max-md:max-w-full">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            delay={index * 0.2} // Staggered delay for sequential animation
          />
        ))}
      </div>
    </section>
  );
}

export default NewArrivalSection;
