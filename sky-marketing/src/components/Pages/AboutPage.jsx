import React from "react";
import Spacing from "../Spacing";
import SectionHeadingStyle3 from "../SectionHeading/SectionHeadingStyle3";
import AboutStyle4 from "../About/AboutStyle4";
import FunFact from "../FunFact";
import AboutStyle5 from "../About/AboutStyle5";
import IconBoxStyle6 from "../IconBox/IconBoxStyle6";
import SectionHeadingStyle5 from "../SectionHeading/SectionHeadingStyle5";
import SectionHeading from "../SectionHeading";
import TeamSlider from "../Slider/TeamSlider";
import Marquee from "../Marquee";
import Brands from "../Brands";
import { pageTitle } from "../../helpers/PageTitle";

const funfactData = [
  { title: "Happy Clients", number: "500+" },
  { title: "Projects Completed", number: "1.2k" },
  { title: "Team Experts", number: "50+" },
  { title: "Industry Awards", number: "15" },
];

const teamData = [
  {
    memberImg: "/images/team/mohamed_ahmed.jpg",
    memberName: "Mohamed Ahmed",
    memberDesignation: "Digital Marketing Director",
    href: "/team/mohamed-ahmed",
  },
  {
    memberImg: "/images/team/sara_khalid.jpg",
    memberName: "Sara Khalid",
    memberDesignation: "Agricultural Marketing Specialist",
    href: "/team/sara-khalid",
  },
  {
    memberImg: "/images/team/ali_omar.jpg",
    memberName: "Ali Omar",
    memberDesignation: "Lead Engineer",
    href: "/team/ali-omar",
  },
  {
    memberImg: "/images/team/amira_youssef.jpg",
    memberName: "Amira Youssef",
    memberDesignation: "Media Production Manager",
    href: "/team/amira-youssef",
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

export default function AboutPage({ darkMode }) {
  pageTitle("About Sky Marketing");
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      
      {/* Hero Section */}
      <SectionHeadingStyle3
        title="Driving Growth Through <br>Innovative Marketing Solutions"
        subTitle="About Sky Marketing"
        variant="text-center"
        shape="shape_1"
      />
      <Spacing lg="75" md="60" />
      
      {/* Company Overview */}
      <AboutStyle4
        thumbnailSrc="/images/about/about.png"
        miniTitle="Our Story"
        title="Sudan's Premier Marketing Innovator"
        subTitle="Since 2015, Sky Marketing has been transforming businesses across Sudan with cutting-edge digital solutions. From agricultural exports to engineering projects, we blend local expertise with global standards to deliver measurable results."
        btnText="Explore Our Services"
        btnUrl="/service"
      />
      <Spacing lg="125" md="70" />
      
      {/* Achievements */}
      <div className="container">
        <FunFact data={funfactData} />
      </div>
      <Spacing lg="125" md="70" />
      
      {/* Our Approach */}
      <AboutStyle5
        variant="cs_type_1"
        thumbnailSrc="/images/about/sky_approach.jpg"
        miniTitle="Our Methodology"
        title="Data-Driven Strategies, Tangible Results"
        subTitle="We combine market research with creative execution to develop campaigns that resonate. Our team specializes in turning complex challenges into opportunities for growth."
        progressBarList={[
          { title: "Agricultural Marketing", percentage: "90" },
          { title: "Engineering Solutions", percentage: "85" },
          { title: "Digital Transformation", percentage: "95" },
        ]}
        salesTitle="Client Growth"
        groth="200"
      />
      <Spacing lg="150" md="80" />
      
      {/* Work Process */}
      <section className="cs_primary_bg">
        <Spacing lg="140" md="70" />
        <div className="container">
          <SectionHeadingStyle5 title="Our Process" />
          <Spacing lg="85" md="45" />
          <div className="cs_working_process_wrap cs_center">
            <div className="cs_working_process">
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_1.png"
                  iconSrc="/images/icons/search.svg"
                  title="Market Analysis"
                  subTitle="We conduct thorough research to understand your industry, competitors, and target audience."
                />
              </div>
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_2.png"
                  iconSrc="/images/icons/idea.svg"
                  title="Custom Strategy"
                  subTitle="Tailored solutions designed for your specific business goals and market conditions."
                />
              </div>
              <div className="cs_working_process_col">
                <IconBoxStyle6
                  bgSrc="/images/others/process_3.png"
                  iconSrc="/images/icons/gear.svg"
                  title="Precision Execution"
                  subTitle="From web development to media campaigns, we deliver with technical excellence."
                />
              </div>
            </div>
          </div>
        </div>
        <Spacing lg="150" md="80" />
      </section>
      
      {/* Team Section */}
      {/* <section className="cs_p76_full_width">
        <Spacing lg="143" md="75" />
        <div className="container">
          <SectionHeading
            title="Meet Our Team of <br />Industry Experts"
            subTitle="Sky Leadership"
          />
          <Spacing lg="85" md="45" />
        </div>
        <TeamSlider data={teamData} />
      </section> */}
      
      {/* Marquee & Brands */}
      <Spacing lg="135" md="70" />
      <Marquee text="Website Development - Mobile Apps - Agricultural Marketing - Engineering Solutions - Media Production" />
      <Spacing lg="84" md="50" />
      <div className="container">
        {/* <Brands data={brandList} /> */}
      </div>
      <Spacing lg="135" md="80" />
    </>
  );
}