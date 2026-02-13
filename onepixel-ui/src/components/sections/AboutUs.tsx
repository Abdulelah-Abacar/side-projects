import React from "react";
import { Button } from "../ui/Button";
import Chip from "../ui/Chip";
import { motion } from "framer-motion";
import { AboutUsSection } from "../../types";

interface AboutUsProps {
  data: AboutUsSection;
}

const files = [
  { name: "File1.png", url: "/assets/project1.png" },
  { name: "File2.png", url: "/assets/project2.png" },
  { name: "File3.png", url: "/assets/project3.png" },
];

const downloadAllFiles = () => {
  files.forEach((file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

const AboutUs: React.FC<AboutUsProps> = ({
  data: { chip, title, description, cta },
}) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 }, // Start slightly below and invisible
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="about-us"
      className="w-11/12 mx-auto flex flex-col gap-10 justify-center items-start"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the section is in view
      variants={sectionVariants}
      aria-labelledby="about-us-heading"
    >
      <Chip text={chip} />
      <h2
        id="about-us-heading"
        className="headline !text-3xl md:!text-4xl lg:!text-5xl"
      >
        {title}
      </h2>
      <p className="text-xl md:text-2xl lg:text-4xl">{description}</p>
      <Button text={cta} onClick={downloadAllFiles} />
    </motion.section>
  );
};

export default AboutUs;
