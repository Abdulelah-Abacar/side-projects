import React from "react";
import Spacing from "../Spacing";
import HeroStyle2 from "../Hero/HeroStyle2";
import Brands from "../Brands";
import Marquee from "../Marquee";
import Cta from "../Cta";
import SectionHeading from "../SectionHeading";
import Accordion from "../Accordion";
import PostCarousel from "../Slider/PostCarousel";
import TestimonialSlider from "../Slider/TestimonialSlider";
import Award from "../Award";
import VideoModal from "../VideoModal";
import ServiceSlider from "../Slider/ServiceSlider";
import AboutStyle2 from "../About/AboutStyle2";
import FunFact from "../FunFact";
import Button from "../Button";
import CaseStudy from "../CaseStudy";
import { pageTitle } from "../../helpers/PageTitle";

const servideData = [
  {
    iconSrc: "/images/marketing-agency/service_icon_1.svg",
    title: "Website Development",
    subTitle:
      "Boost your online presence with custom, high-performance websites tailored to your business needs.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_2.svg",
    title: "Mobile Apps",
    subTitle:
      "Transform your business with scalable mobile applications designed for user engagement and growth.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_3.svg",
    title: "Media Production",
    subTitle:
      "Captivate audiences with professional documentaries, ads, and audio branding crafted by our creative team.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_4.svg",
    title: "Agricultural Marketing",
    subTitle:
      "Expand your agribusiness reach with targeted campaigns and export logistics support.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_1.svg",
    title: "Engineering Services",
    subTitle:
      "From architectural designs to construction supervision, we deliver precision and innovation.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
  {
    iconSrc: "/images/marketing-agency/service_icon_2.svg",
    title: "Smart Systems",
    subTitle:
      "Upgrade to automated solutions that streamline operations and reduce costs.",
    btnText: "See More",
    btnUrl: "/service/service-details",
  },
];

const funfactData = [
  { title: "Happy Clients", number: "500+" },
  { title: "Projects Completed", number: "1.2k" },
  { title: "Team Experts", number: "50+" },
  { title: "Industry Awards", number: "15" },
];

const awardData = [
  {
    brand: "Behance",
    title: "Best UI/UX Design (Agriculture Platform)",
    subTitle:
      "Recognized for our innovative interface design for agri-tech solutions.",
    date: "December 12, 2023",
    awardImgUrl: "/images/creative-agency/award_img_1.svg",
  },
  {
    brand: "Awwwards",
    title: "Top Mobile App (Sudan Market)",
    subTitle: "Awarded for our user-centric mobile app for livestock traders.",
    date: "January 05, 2022",
    awardImgUrl: "/images/creative-agency/award_img_2.svg",
  },
];

const testimonialData = [
  {
    text: "Sky Marketing revolutionized our agricultural exports with their digital campaigns. Sales grew by 200% in 6 months!",
    avatarName: "Ahmed Khalid",
    avatarDesignation: "CEO, Green Farms Sudan",
  },
  {
    text: "Their engineering team delivered a flawless warehouse design under tight deadlines. Highly recommended.",
    avatarName: "Mona Eltayeb",
    avatarDesignation: "Director, Nile Constructions",
  },
];

const caseStudyData = [
  {
    thumbnailSrc: "/images/case_study_1.jpg",
    title: "Agri-Export Digital Campaign",
    category: "Agricultural Marketing",
    number: "01",
    href: "/case-study-details",
  },
  {
    thumbnailSrc: "/images/case_study_2.jpg",
    title: "Smart Farm Management System",
    category: "Engineering Solutions",
    number: "02",
    href: "/case-study-details",
  },
];

const faqData = [
  {
    title: "How does Sky Marketing approach agricultural projects?",
    content:
      "We combine market studies, export logistics, and digital campaigns tailored to agribusinesses, ensuring global reach and local impact.",
  },
  {
    title: "What makes your engineering services unique?",
    content:
      "Our end-to-end solutions—from architectural designs to construction supervision—are backed by 10+ years of Sudan market expertise.",
  },
];

const brandList = [
  {
    logoSrc: "/images/brands/agri_sudan.png",
    logoAlt: "Agri Sudan",
  },
  {
    logoSrc: "/images/brands/nile_engineering.png",
    logoAlt: "Nile Engineering",
  },
  {
    logoSrc: "/images/brands/sudan_tech.png",
    logoAlt: "Sudan Tech",
  },
  {
    logoSrc: "/images/brands/khartoum_digital.png",
    logoAlt: "Khartoum Digital",
  },
];

export default function HomePage({ darkMode }) {
  pageTitle("Sky Marketing – Digital & Agricultural Solutions");
  return (
    <>
      <HeroStyle2
        miniTitle="Sudan's Leading Marketing Innovator"
        title="Sky Marketing: Where Strategy Meets Creativity"
        subTitle="From digital platforms to agricultural exports, we deliver tailored solutions that drive growth. Explore our services in web development, media production, and smart systems."
        thumbnailSrc="/images/sky_hero.png"
        mikeIcon={
          darkMode ? "/images/icons/mike_dark.svg" : "/images/icons/mike.svg"
        }
      />

      {/* Services Section */}
      <section className="cs_p76_full_width" id="service">
        <Spacing lg="143" md="75" />
        <SectionHeading title="Our Expertise" subTitle="Sky Services" />
        <Spacing lg="85" md="45" />
        <ServiceSlider data={servideData} />
      </section>

      {/* About Us */}
      <section>
        <div className="cs_height_150 cs_height_lg_75" />
        <AboutStyle2
          thumbnailSrc1="/images/sky_about_1.png"
          thumbnailSrc2="/images/sky_about_2.png"
          uperTitle="Our Story"
          title="Innovating Marketing Since 2015"
          subTitle="Sky Marketing merges technology with creativity to solve complex challenges. Whether it’s a mobile app for livestock traders or a media campaign for architectural firms, we blend local insights with global standards."
          featureList={[
            "Data-driven agricultural marketing",
            "AI-powered engineering designs",
            "24/7 customer support (Call Center)",
          ]}
          btnText="About Sky"
          btnUrl="about"
        />
      </section>

      {/* Case Studies */}
      <section>
        <Spacing lg="118" md="70" />
        <div className="container">
          <SectionHeading
            title="Success Stories: <br />How Sky Transforms Businesses"
            subTitle="Case Studies"
          />
          <Spacing lg="85" md="45" />
        </div>
        <CaseStudy data={caseStudyData} />
        <Spacing lg="100" md="60" />
        <div className="container">
          <div className="text-center">
            <Button btnText="More Case Study" btnUrl="case-study" />
          </div>
        </div>
      </section>

      <div className="container">
        <Spacing lg="126" md="70" />
        <VideoModal
          videoSrc="https://runagency-adv.com/wp-content/uploads/2025/04/Cbab5d8a4a986d16251c8a40b26bb8fbf57e854e.mp4#t=,46"
          bgUrl="/images/sky_hero.png"
          title="Our Design and Technology <br /> Studio is dedicated to making <br />your ideas a reality"
        />
      </div>

      {/* Testimonials */}
      <TestimonialSlider
        layeredImages={["/images/client_1.jpg", "/images/client_2.jpg"]}
        data={testimonialData}
      />

      {/* FAQs */}
      <section>
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading title="Frequently asked question" subTitle="FAQs" />
          <Spacing lg="55" md="30" />
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <Accordion variant="cs_type_1" data={faqData} />
            </div>
          </div>
        </div>
        <Spacing lg="120" md="60" />
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <Cta
            title="Ready to elevate your business with Sky’s expertise?"
            btnText="Get Started"
            btnUrl="/contact"
            bgUrl="/images/sky_cta_bg.jpg"
          />
        </div>
      </section>

      {/* Marquee */}
      <Spacing lg="84" md="50" />
      <Marquee text="Web Development - Mobile Apps - Agricultural Marketing - Engineering Solutions - Media Production" />
      <Spacing lg="84" md="50" />
      <div className="container">
        {/* <Brands data={brandList} /> */}
      </div>
      <Spacing lg="135" md="80" />
    </>
  );
}
