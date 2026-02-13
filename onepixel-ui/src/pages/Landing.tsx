import { FC } from "react";
import { motion, Variants } from "framer-motion";
import { Banner } from "../components/Banner";
import AboutUs from "../components/sections/AboutUs";
import CaseStudio from "../components/sections/CaseStudio";
import ContactUs from "../components/sections/ContactUs";
import FAQs from "../components/sections/FAQs";
import Header from "../components/sections/Header";
import OurPackages from "../components/sections/OurPackages";
import OurServices from "../components/sections/OurServices";
import Rating from "../components/sections/Rating";
import Testimonials from "../components/sections/Testimonials";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { Button } from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import CircularText from "../components/ui/CircularText";
import PointerIcon from "../assets/Pointer";
import { LandingData } from "../types";

interface LandingProps {
  data: LandingData;
}

// Animation variants
const animations: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
};

const devToolsIcons = [
  {
    id: "html5",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    id: "css3",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    id: "javascript",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    id: "typescript",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    id: "react",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    id: "nextjs",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    id: "nodejs",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    id: "express",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    id: "mongodb",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    id: "postgresql",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    id: "mysql",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    id: "firebase",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    id: "tailwind",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    id: "sass",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  {
    id: "bootstrap",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    id: "git",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    id: "github",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    id: "figma",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    id: "photoshop",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  },
  {
    id: "illustrator",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  },
  {
    id: "xd",
    child: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
  },
  {
    id: "vscode",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    id: "docker",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    id: "graphql",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    id: "threejs",
    child:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
];

// Banner images configuration
const bannerImages = devToolsIcons.map(({ id, child }) => ({
  id,
  child: (
    <div key={id} className="w-8 md:w-12 ml-4">
      <img
        src={child}
        alt={id}
        className={`w-full aspect-square ${
          id === "threejs" || id === "express" ? "brightness-0 invert-[1]" : ""
        }`}
      />
    </div>
  ),
}));

const Landing: FC<LandingProps> = ({ data }) => {
  const renderHeroContent = () => (
    <motion.div
      variants={animations.staggerContainer}
      className="flex flex-col lg:flex-row gap-8 items-center justify-center w-11/12 3xl:w-2/3 mx-auto flex-1"
    >
      <motion.div
        variants={animations.staggerContainer}
        className="flex flex-col flex-1 max-w-4xl gap-3 md:gap-5 items-start justify-center w-full lg:w-1/2"
      >
        <motion.div variants={animations.fadeInUp}>
          <Chip
            text={data.heroSection.chip}
            className="!text-sm md:!text-xl mt-10 md:mt-0 block"
          />
        </motion.div>
        <motion.h1
          variants={animations.fadeInUp}
          className="headline !text-2xl/6 md:!text-5xl xl:!text-6xl w-full"
        >
          {data.heroSection.title}
        </motion.h1>
        <motion.p
          variants={animations.fadeInUp}
          className="paragraph text-sm md:text-base w-full"
        >
          {data.heroSection.subtitle}
        </motion.p>
        <motion.div
          variants={animations.fadeInUp}
          className="flex flex-col md:flex-row gap-3 md:gap-5 w-full"
        >
          <Button
            text={data.heroSection.cta.primary}
            href="https://wa.me/96691735346?text=Hello%20there!"
          />
          <button className="py-2 px-4 md:py-2.5 md:px-5 rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border border-[#a4a4a4] text-sm md:text-base">
            <a href="#contact-us">{data.heroSection.cta.secondary}</a>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={animations.fadeInRight}
        className="hidden lg:block relative"
      >
        <CircularText
          text="Refer a client and get 10% off your next project"
          icon={PointerIcon}
        />
      </motion.div>
    </motion.div>
  );

  const renderBanner = () => (
    <motion.div
      variants={animations.fadeInUp}
      className="relative flex bg-black overflow-hidden p-2 md:py-2.5"
    >
      <Banner>{bannerImages}</Banner>
      <div className="bg-gradient-to-r from-black via-transparent via-[percentage:30%_70%] to-black pointer-events-none absolute inset-0" />
    </motion.div>
  );

  return (
    <>
      <Header className="h-[calc(100vh-4px)] md:h-[calc(100vh-10px)]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.staggerContainer}
          className="h-full flex flex-col justify-between pt-4 md:pt-14 lg:pt-20"
        >
          {renderHeroContent()}
          {renderBanner()}
        </motion.div>
      </Header>

      <div className="flex p-2 md:p-2.5 pb-0 flex-col gap-24 items-center overflow-hidden">
        <main className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-24 mt-24">
          <AboutUs data={data.aboutUsSection} />
          <WhyChooseUs {...data.whyChooseUsSection} />
          <OurServices {...data.ourServicesSection} />
          <CaseStudio {...data.caseStudioSection} />
          <OurPackages {...data.subscriptionSection} />
          <Rating data={data.agencyStatusSection} />
          <Testimonials data={data.testimonials} />
          <ContactUs {...data.contactUsSection} />
          <FAQs {...data.fqaSection} />
        </main>
      </div>
    </>
  );
};

export default Landing;
