import Container from "../Container";
import Button from "../Button";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <div className="relative bg-mainBG text-white">
      <motion.div
        style={{ opacity }}
        ref={videoContainerRef}
        className="absolute -top-[--header-height] left-0 w-full h-[200vh]"
      >
        <img
          className="sticky top-0 object-cover h-screen w-full"
          src="/posters/napoleon.webp"
          alt="Hero Image"
        />
      </motion.div>
      <Container className="relative z-10 pb-7 h-[--hero-height]">
        <motion.div
          className="h-full flex flex-col justify-end items-start"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          whileInView={"visible"}
          exit={"hidden"}
          animate="hidden"
          viewport={{ amount: 0.98 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-10">
            All Apple Original. <br /> Only On Apple TV+.
          </h1>
          <Button className="mb-16" size="lg">
            Stream now
          </Button>
          <p className="font-semibold">Watch on the 📺 app.</p>
        </motion.div>
      </Container>
    </div>
  );
}

export default Hero;
